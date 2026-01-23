import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite.ts";
import { createServer } from "http";
import { createClient } from '@supabase/supabase-js';
import compression from "compression";
import cors from "cors";
import Stripe from "stripe";

const app = express();
app.set('trust proxy', 1);
// Abilita compressione gzip/brotli per risposte dinamiche (JSON/HTML/CSS/JS)
app.use(compression());
app.use('/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.resolve(process.cwd(), 'client/dist', 'sw.js'));
});

// ================================
// STRIPE WEBHOOK (deve essere PRIMA di express.json())
// ================================
const supabaseAdminForWebhook = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;

app.post("/api/webhook/stripe",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const secret = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!secret) {
      console.error("[STRIPE WEBHOOK] STRIPE_SECRET_KEY mancante");
      return res.status(500).send("Stripe non configurato");
    }

    const stripe = new Stripe(secret);
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      // Se abbiamo il webhook secret, verifichiamo la firma
      if (webhookSecret && webhookSecret !== "whsec_XXXXXXXX") {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } else {
        // In sviluppo senza webhook secret, parsiamo direttamente
        console.warn("[STRIPE WEBHOOK] Webhook secret non configurato - parsing diretto (solo per sviluppo!)");
        event = JSON.parse(req.body.toString());
      }
    } catch (err: any) {
      console.error("[STRIPE WEBHOOK] Errore verifica firma:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`[STRIPE WEBHOOK] Evento ricevuto: ${event.type}`);

    // Gestisci l'evento
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleSuccessfulPayment(session);
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error("[STRIPE WEBHOOK] Pagamento fallito:", paymentIntent.id);
        break;
      }
      default:
        console.log(`[STRIPE WEBHOOK] Evento non gestito: ${event.type}`);
    }

    res.json({ received: true });
  }
);

// Funzione per gestire il pagamento riuscito
async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.user_id;
  const shippingAddressId = session.metadata?.shipping_address_id;

  console.log(`[STRIPE WEBHOOK] Pagamento completato per user: ${userId}`);

  if (!userId) {
    console.error("[STRIPE WEBHOOK] user_id mancante nei metadata");
    return;
  }

  if (!supabaseAdminForWebhook) {
    console.error("[STRIPE WEBHOOK] Supabase admin client non disponibile");
    return;
  }

  try {
    // Prima recupera il carrello dell'utente dal database (prima di svuotarlo!)
    const { data: cartItems, error: cartError } = await supabaseAdminForWebhook
      .from("cart_items")
      .select(`
        id,
        quantity,
        product_option_id,
        product_options (
          id,
          price_cents
        )
      `)
      .eq("user_id", userId);

    if (cartError) {
      console.error("[STRIPE WEBHOOK] Errore recupero carrello:", cartError);
    }

    console.log(`[STRIPE WEBHOOK] Carrello recuperato: ${cartItems?.length || 0} items`);
    console.log(`[STRIPE WEBHOOK] Cart items:`, JSON.stringify(cartItems, null, 2));

    // Crea l'ordine nel database (l'ID UUID viene generato automaticamente)
    const { data: order, error: orderError } = await supabaseAdminForWebhook
      .from("orders")
      .insert({
        user_id: userId,
        shipping_address_id: shippingAddressId ? parseInt(shippingAddressId) : null,
        status: "paid",
        currency: session.currency?.toUpperCase() || "EUR",
        total_cents: session.amount_total || 0,
        stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      })
      .select()
      .single();

    if (orderError) {
      console.error("[STRIPE WEBHOOK] Errore creazione ordine:", orderError);
      return;
    }

    console.log(`[STRIPE WEBHOOK] Ordine creato: ${order.id}`);

    // Crea le righe dell'ordine (order_items) dal carrello
    if (cartItems && cartItems.length > 0) {
      const orderItems = cartItems.map((item: any) => {
        const priceCents = item.product_options?.price_cents || 0;
        return {
          order_id: order.id,
          product_option_id: item.product_option_id,
          quantity: item.quantity,
          unit_price_cents: priceCents,
          line_total_cents: item.quantity * priceCents,
        };
      });

      console.log(`[STRIPE WEBHOOK] Inserimento order_items:`, JSON.stringify(orderItems, null, 2));

      // Inserisci in order_items
      const { error: itemsError } = await supabaseAdminForWebhook
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        console.error("[STRIPE WEBHOOK] Errore inserimento order_items:", itemsError.message, itemsError);
      } else {
        console.log(`[STRIPE WEBHOOK] Inseriti ${orderItems.length} order_items`);
      }
    } else {
      console.warn("[STRIPE WEBHOOK] Carrello vuoto o non trovato per user:", userId);
    }

    // Svuota il carrello dell'utente (DOPO aver salvato gli order_items)
    const { error: clearError } = await supabaseAdminForWebhook
      .from("cart_items")
      .delete()
      .eq("user_id", userId);

    if (clearError) {
      console.warn("[STRIPE WEBHOOK] Errore svuotamento carrello:", clearError.message);
    } else {
      console.log(`[STRIPE WEBHOOK] Carrello svuotato per user: ${userId}`);
    }

  } catch (error) {
    console.error("[STRIPE WEBHOOK] Errore handleSuccessfulPayment:", error);
  }
}

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const PORT = parseInt(process.env.PORT || '8080', 10);
const allowedHosts = [
  process.env.ORIGIN || "",
  process.env.APP_URL || "",
  `http://localhost:${PORT}`,
  `http://127.0.0.1:${PORT}`
].filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    try {
      const ok = allowedHosts.some(h => origin.startsWith(h)) || /^http:\/\/localhost(:\d+)?$/i.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/i.test(origin);
      cb(null, ok);
    } catch {
      cb(null, false);
    }
  },
  credentials: true
}));

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

// Conditional Supabase initialization
let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client inizializzato');
  } catch (error) {
    console.error('❌ Errore inizializzazione Supabase:', error);
  }
} else {
  console.warn('⚠️ ATTENZIONE: SUPABASE_URL e/o SUPABASE_ANON_KEY non configurate!');
  console.warn('   L\'applicazione continuerà senza database Supabase.');
}

export { supabase };

// Serve attached assets statically
app.use('/attached_assets', express.static(path.resolve(process.cwd(), 'attached_assets')));

// Serve product images statically
app.use('/images', express.static(path.resolve(process.cwd(), 'public/images')));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: supabase ? 'configured' : 'not configured'
    });
  });

  // Test Supabase connection endpoint
  app.get('/api/test-db', async (req: Request, res: Response) => {
    try {
      if (!supabase) {
        return res.status(500).json({
          success: false,
          error: 'Supabase non configurato',
          hint: 'Configura SUPABASE_URL e SUPABASE_ANON_KEY su Render'
        });
      }

      const { data, error } = await supabase
        .from('products')
        .select('id')
        .limit(1);

      if (error) throw error;

      res.json({
        success: true,
        message: '✅ Database Supabase connesso!',
        supabaseUrl: supabaseUrl
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
        hint: 'Verifica che SUPABASE_URL e SUPABASE_ANON_KEY siano configurate correttamente'
      });
    }
  });

  // (Rimosso) Endpoints di fallback duplicati per /api/auth/me e /api/auth/profile
  // Le route ufficiali sono definite in server/routes.ts e gestiscono sia Bearer token che cookie

  // Global error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    console.error('❌ Error:', {
      status,
      message,
      path: req.path,
      method: req.method
    });

    res.status(status).json({ 
      success: false,
      message,
      path: req.path
    });
  });

  // Serve static files (including images) in both development and production
  app.use('/images', express.static('public/images'));


  // Endpoint per verificare l'autenticazione con credenziali specifiche
app.get("/api/auth/check", (req, res) => {
  const session = req.session as any;
  const user = session?.user;
  
  // Verifica se l'utente è biggimmy con la password specificata
  if (user && user.authenticated && user.username === 'biggimmy') {
    res.json({ 
      success: true, 
      authenticated: true,
      user: { username: user.username, loginTime: user.loginTime }
    });
  } else {
    res.json({ 
      success: true, 
      authenticated: false 
    });
  }
});

// API 404 fallback - catch unmatched API routes before Vite's catch-all
app.use("/api", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});


  // Setup Vite in development, serve static in production
if (app.get("env") === "development") {
  await setupVite(app, server);
} else {
  const distPath = path.resolve(process.cwd(), "client/dist");
  const assetsPath = path.join(distPath, "assets");

  // Serve tutto il contenuto della build Vite (JS, CSS, immagini, ecc.)
  app.use(express.static(distPath));
  app.use("/assets", express.static(assetsPath));

  // Fallback per le rotte client-side (React Router)
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) {
      return res.status(404).json({
        success: false,
        message: "API route not found",
      });
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}



  // Use PORT from environment or default to 5000
  

  // Setup Express server
  app.listen(PORT, "0.0.0.0", async () => {
    console.log('=================================');
    console.log(`✅ Server avviato`);
    console.log(`🕐 ${new Date().toLocaleTimeString()}`);
    console.log(`🌍 Porta: ${PORT}`);
    console.log(`🔧 Environment: ${app.get("env")}`);
    console.log(`🗄️  Database: ${supabase ? '✅ Supabase configurato' : '⚠️ Non configurato'}`);
    console.log('=================================');
    console.log(`📍 Endpoints disponibili:`);
    console.log(`   GET  /health - Health check`);
    console.log(`   GET  /api/test-db - Test database`);
    console.log(`   GET  /images/* - Static images`);
    console.log(`   GET  /attached_assets/* - Static assets`);
    console.log('=================================');

    // Avvia automaticamente Price Watcher se configurato

  });
})();
