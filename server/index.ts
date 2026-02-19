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
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from "./services/email";

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

    // Rispondi SUBITO a Stripe (entro pochi ms) per evitare timeout e retry
    res.json({ received: true });

    // Gestisci l'evento in background (non blocca la risposta HTTP)
    setImmediate(async () => {
      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            await handleSuccessfulPayment(session);
            break;
          }
          case "checkout.session.expired": {
            const session = event.data.object as Stripe.Checkout.Session;
            await handleFailedPayment(session, "cancellato");
            break;
          }
          case "checkout.session.async_payment_failed": {
            const session = event.data.object as Stripe.Checkout.Session;
            await handleFailedPayment(session, "fallito");
            break;
          }
          case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.error("[STRIPE WEBHOOK] Pagamento fallito:", paymentIntent.id);
            if (paymentIntent.metadata?.order_id && supabaseAdminForWebhook) {
              await supabaseAdminForWebhook
                .from("orders")
                .update({ status: "fallito", updated_at: new Date().toISOString() })
                .eq("id", paymentIntent.metadata.order_id);
            }
            break;
          }
          default:
            console.log(`[STRIPE WEBHOOK] Evento non gestito: ${event.type}`);
        }
      } catch (err) {
        console.error("[STRIPE WEBHOOK] Errore elaborazione evento in background:", err);
      }
    });
  }
);

// Funzione per gestire pagamenti falliti/annullati
async function handleFailedPayment(session: Stripe.Checkout.Session, status: "cancellato" | "fallito") {
  const orderId = session.metadata?.order_id;

  console.log(`[STRIPE WEBHOOK] Pagamento ${status} - Session: ${session.id}, OrderId: ${orderId}`);

  if (!orderId) {
    console.warn("[STRIPE WEBHOOK] order_id mancante nei metadata per sessione fallita");
    return;
  }

  if (!supabaseAdminForWebhook) {
    console.error("[STRIPE WEBHOOK] Supabase admin client non disponibile");
    return;
  }

  try {
    const { error } = await supabaseAdminForWebhook
      .from("orders")
      .update({
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq("id", orderId);

    if (error) {
      console.error(`[STRIPE WEBHOOK] Errore aggiornamento ordine ${status}:`, error);
    } else {
      console.log(`[STRIPE WEBHOOK] Ordine ${orderId} aggiornato a ${status}`);
    }
  } catch (error) {
    console.error("[STRIPE WEBHOOK] Errore handleFailedPayment:", error);
  }
}

// Funzione per gestire il pagamento riuscito
async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.user_id;
  const orderId = session.metadata?.order_id;
  const shippingAddressId = session.metadata?.shipping_address_id;
  const notes = session.metadata?.notes;
  const fulfillmentType = session.metadata?.fulfillment_type || 'spedizione';
  const pickupStore = session.metadata?.pickup_store || null;
  const stripeSessionId = session.id;
  // Recupera l'ID fattura dalla sessione (disponibile se invoice_creation.enabled: true)
  const stripeInvoiceId = typeof session.invoice === 'string' ? session.invoice : null;
  const stripeCustomerId = typeof session.customer === 'string' ? session.customer : null;

  console.log(`[STRIPE WEBHOOK] Pagamento completato per user: ${userId}, orderId: ${orderId}, invoiceId: ${stripeInvoiceId}`);

  if (!userId) {
    console.error("[STRIPE WEBHOOK] user_id mancante nei metadata");
    return;
  }

  if (!supabaseAdminForWebhook) {
    console.error("[STRIPE WEBHOOK] Supabase admin client non disponibile");
    return;
  }

  try {
    let order: any = null;

    // Se esiste già un ordine (creato durante il checkout), aggiornalo a "pagato"
    if (orderId) {
      const { data: existingOrder, error: updateError } = await supabaseAdminForWebhook
        .from("orders")
        .update({
          status: "pagato",
          stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
          stripe_session_id: stripeSessionId,
          stripe_invoice_id: stripeInvoiceId,
          stripe_customer_id: stripeCustomerId,
          total_cents: session.amount_total || 0,
          currency: session.currency?.toUpperCase() || "EUR",
          updated_at: new Date().toISOString()
        })
        .eq("id", orderId)
        .select()
        .single();

      if (updateError) {
        console.error("[STRIPE WEBHOOK] Errore aggiornamento ordine esistente:", updateError);
      } else {
        order = existingOrder;
        console.log(`[STRIPE WEBHOOK] Ordine ${orderId} aggiornato a 'pagato'`);

        // Verifica se esistono già order_items per questo ordine
        const { data: existingItems } = await supabaseAdminForWebhook
          .from("order_items")
          .select("id")
          .eq("order_id", orderId)
          .limit(1);

        // Se non ci sono order_items, creali dal carrello
        if (!existingItems || existingItems.length === 0) {
          console.log(`[STRIPE WEBHOOK] Nessun order_item trovato per ordine ${orderId}, creo dal carrello`);

          // Recupera il carrello dell'utente
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
            console.error("[STRIPE WEBHOOK] Errore recupero carrello per ordine esistente:", cartError);
          } else if (cartItems && cartItems.length > 0) {
            const orderItemsToInsert = cartItems.map((item: any) => {
              const priceCents = item.product_options?.price_cents || 0;
              return {
                order_id: orderId,
                product_option_id: item.product_option_id,
                quantity: item.quantity,
                unit_price_cents: priceCents,
                line_total_cents: item.quantity * priceCents,
              };
            });

            const { error: itemsError } = await supabaseAdminForWebhook
              .from("order_items")
              .insert(orderItemsToInsert);

            if (itemsError) {
              console.error("[STRIPE WEBHOOK] Errore inserimento order_items per ordine esistente:", itemsError);
            } else {
              console.log(`[STRIPE WEBHOOK] Creati ${orderItemsToInsert.length} order_items per ordine ${orderId}`);
            }
          } else {
            console.warn(`[STRIPE WEBHOOK] Carrello vuoto per user ${userId}, impossibile creare order_items`);
          }
        }
      }
    }

    // Fallback: se non c'era un ordine esistente, creane uno nuovo
    if (!order) {
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

      // Crea l'ordine nel database (fallback per sessioni senza order_id)
      const { data: newOrder, error: orderError } = await supabaseAdminForWebhook
        .from("orders")
        .insert({
          user_id: userId,
          shipping_address_id: fulfillmentType === 'spedizione' && shippingAddressId ? parseInt(shippingAddressId) : null,
          status: "pagato",
          currency: session.currency?.toUpperCase() || "EUR",
          total_cents: session.amount_total || 0,
          stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
          stripe_session_id: stripeSessionId,
          stripe_invoice_id: stripeInvoiceId,
          stripe_customer_id: stripeCustomerId,
          notes: notes || null,
          fulfillment_type: fulfillmentType,
          pickup_store: pickupStore || null,
        })
        .select()
        .single();

      if (orderError) {
        console.error("[STRIPE WEBHOOK] Errore creazione ordine:", orderError);
        return;
      }

      order = newOrder;
      console.log(`[STRIPE WEBHOOK] Nuovo ordine creato: ${order.id}`);

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

        const { error: itemsError } = await supabaseAdminForWebhook
          .from("order_items")
          .insert(orderItems);

        if (itemsError) {
          console.error("[STRIPE WEBHOOK] Errore inserimento order_items:", itemsError);
        }
      }
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

    // Invia email di conferma ordine
    if (order) {
      console.log(`[STRIPE WEBHOOK] Preparazione email conferma per ordine ${order.id}...`);
      try {
        // Recupera i dati dell'utente
        const { data: userData, error: userError } = await supabaseAdminForWebhook
          .from("users")
          .select("email, first_name, last_name")
          .eq("id", userId)
          .single();

        console.log(`[STRIPE WEBHOOK] userData:`, userData ? `email=${userData.email}` : 'NULL', userError ? `errore: ${userError.message}` : '');

        // Recupera gli order_items con i dettagli del prodotto
        const { data: orderItems, error: itemsError } = await supabaseAdminForWebhook
          .from("order_items")
          .select(`
            quantity,
            unit_price_cents,
            product_option_id,
            product_options (
              label,
              product_id
            )
          `)
          .eq("order_id", order.id);

        console.log(`[STRIPE WEBHOOK] orderItems: ${orderItems?.length || 0} items`, itemsError ? `errore: ${itemsError.message}` : '');
        console.log(`[STRIPE WEBHOOK] orderItems dettaglio:`, JSON.stringify(orderItems, null, 2));

        // Recupera i nomi dei prodotti separatamente per affidabilità
        let productNames: Record<number, string> = {};
        if (orderItems && orderItems.length > 0) {
          const productIds = orderItems
            .map((item: any) => item.product_options?.product_id)
            .filter((id: any) => id != null);

          if (productIds.length > 0) {
            const { data: products } = await supabaseAdminForWebhook
              .from("products")
              .select("id, name")
              .in("id", productIds);

            if (products) {
              productNames = products.reduce((acc: Record<number, string>, p: any) => {
                acc[p.id] = p.name;
                return acc;
              }, {});
            }
            console.log(`[STRIPE WEBHOOK] productNames:`, productNames);
          }
        }

        // Recupera indirizzo di spedizione se presente
        let shippingAddr = null;
        if (order.shipping_address_id) {
          const { data: addrData } = await supabaseAdminForWebhook
            .from("user_addresses")
            .select("street, city, cap, province")
            .eq("id", order.shipping_address_id)
            .single();
          if (addrData) {
            shippingAddr = {
              street: addrData.street,
              city: addrData.city,
              postalCode: addrData.cap,
              province: addrData.province
            };
          }
        }

        // Usa email da DB o fallback da sessione Stripe
        const customerEmail = userData?.email || session.customer_email;
        const customerName = userData?.first_name || (customerEmail ? customerEmail.split('@')[0] : 'Cliente');

        if (customerEmail) {
          const emailItems = (orderItems || []).map((item: any) => {
            const productId = item.product_options?.product_id;
            const productName = productId ? productNames[productId] : null;
            const optionLabel = item.product_options?.label || '';
            return {
              name: `${productName || 'Prodotto'}${optionLabel ? ` - ${optionLabel}` : ''}`,
              quantity: item.quantity,
              price: item.unit_price_cents
            };
          });
          console.log(`[STRIPE WEBHOOK] emailItems per email:`, JSON.stringify(emailItems, null, 2));

          // Determina il fulfillment type dell'ordine (dal metadata o dall'ordine stesso)
          const orderFulfillmentType = fulfillmentType || order.fulfillment_type || 'spedizione';
          const orderPickupStore = pickupStore || order.pickup_store || null;

          await sendOrderConfirmationEmail({
            orderId: order.id,
            userEmail: customerEmail,
            userName: customerName,
            total: order.total_cents,
            items: emailItems,
            shippingAddress: shippingAddr || undefined,
            fulfillmentType: orderFulfillmentType,
            pickupStore: orderPickupStore,
          });
          console.log(`[STRIPE WEBHOOK] Email conferma ordine inviata a ${customerEmail}`);

          // Notifica all'admin del nuovo ordine (in try-catch separato)
          try {
            console.log(`[STRIPE WEBHOOK] Tentativo invio email admin...`);
            const adminEmailResult = await sendAdminOrderNotification({
              orderId: order.id,
              userEmail: customerEmail,
              userName: customerName,
              total: order.total_cents,
              items: emailItems,
              shippingAddress: shippingAddr || undefined,
              fulfillmentType: orderFulfillmentType,
              pickupStore: orderPickupStore,
            });
            console.log(`[STRIPE WEBHOOK] Email notifica admin inviata, risultato: ${adminEmailResult}`);
          } catch (adminEmailError) {
            console.error(`[STRIPE WEBHOOK] ❌ ERRORE specifico invio email admin:`, adminEmailError);
          }
        } else {
          console.warn(`[STRIPE WEBHOOK] Nessuna email disponibile per ordine ${order.id}`);
        }
      } catch (emailError) {
        console.error("[STRIPE WEBHOOK] Errore invio email conferma ordine:", emailError);
        // Non blocchiamo il flusso se l'email fallisce
      }
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

    if (res.headersSent) {
      return next(err);
    }

    res.status(status).json({
      success: false,
      message,
      path: req.path
    });
  });


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

    // ================================
    // SCHEDULER: Reminder automatici ritiro in negozio
    // Controlla ogni ora se ci sono ordini in "pronto_per_ritiro" che necessitano reminder
    // ================================
    if (supabaseAdminForWebhook) {
      const PICKUP_REMINDER_INTERVAL_MS = 60 * 60 * 1000; // 1 ora

      async function checkPickupReminders() {
        try {
          const { data: orders, error } = await supabaseAdminForWebhook!
            .from("orders")
            .select("id, user_id, pickup_store, pickup_ready_at, pickup_reminder_4d_sent_at, pickup_reminder_6d_sent_at")
            .eq("status", "pronto_per_ritiro")
            .eq("fulfillment_type", "ritiro")
            .not("pickup_ready_at", "is", null);

          if (error) {
            console.error("[PICKUP REMINDER] Errore query ordini:", error);
            return;
          }

          if (!orders || orders.length === 0) return;

          const now = new Date();
          const { sendPickupReminderEmail } = await import("./services/email");

          for (const order of orders) {
            const readyAt = new Date(order.pickup_ready_at);
            const hoursSinceReady = (now.getTime() - readyAt.getTime()) / (1000 * 60 * 60);

            // Reminder a 4 giorni (96 ore)
            if (hoursSinceReady >= 96 && !order.pickup_reminder_4d_sent_at) {
              try {
                const { data: userData } = await supabaseAdminForWebhook!
                  .from("users")
                  .select("email, first_name")
                  .eq("id", order.user_id)
                  .single();

                if (userData?.email) {
                  await sendPickupReminderEmail({
                    orderId: order.id,
                    userEmail: userData.email,
                    userName: userData.first_name || userData.email.split('@')[0],
                    pickupStore: order.pickup_store,
                    type: '4days',
                  });

                  await supabaseAdminForWebhook!
                    .from("orders")
                    .update({ pickup_reminder_4d_sent_at: now.toISOString() })
                    .eq("id", order.id);

                  console.log(`[PICKUP REMINDER] Reminder 4 giorni inviato per ordine ${order.id}`);
                }
              } catch (err) {
                console.error(`[PICKUP REMINDER] Errore reminder 4gg ordine ${order.id}:`, err);
              }
            }

            // Reminder a 6 giorni (144 ore) - ultimo avviso, 24h rimanenti
            if (hoursSinceReady >= 144 && !order.pickup_reminder_6d_sent_at) {
              try {
                const { data: userData } = await supabaseAdminForWebhook!
                  .from("users")
                  .select("email, first_name")
                  .eq("id", order.user_id)
                  .single();

                if (userData?.email) {
                  await sendPickupReminderEmail({
                    orderId: order.id,
                    userEmail: userData.email,
                    userName: userData.first_name || userData.email.split('@')[0],
                    pickupStore: order.pickup_store,
                    type: '6days',
                  });

                  await supabaseAdminForWebhook!
                    .from("orders")
                    .update({ pickup_reminder_6d_sent_at: now.toISOString() })
                    .eq("id", order.id);

                  console.log(`[PICKUP REMINDER] Avviso finale 6 giorni inviato per ordine ${order.id}`);
                }
              } catch (err) {
                console.error(`[PICKUP REMINDER] Errore reminder 6gg ordine ${order.id}:`, err);
              }
            }
          }
        } catch (err) {
          console.error("[PICKUP REMINDER] Errore scheduler:", err);
        }
      }

      // Esegui il primo check dopo 5 minuti dall'avvio
      setTimeout(() => {
        checkPickupReminders();
        // Poi ripeti ogni ora
        setInterval(checkPickupReminders, PICKUP_REMINDER_INTERVAL_MS);
      }, 5 * 60 * 1000);

      console.log("📦 Pickup reminder scheduler attivato (check ogni ora)");
    }

  });
})();
