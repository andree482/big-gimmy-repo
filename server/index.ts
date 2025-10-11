import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite.ts";
import { createServer } from "http";
import { createClient } from '@supabase/supabase-js';
import { PriceWatcher } from "./priceWatcher";

const app = express();
app.use('/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.resolve(process.cwd(), 'client/dist', 'sw.js'));
});
app.use(express.json());

app.use(express.urlencoded({ extended: false }));



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

  // Price Watcher setup (opzionale)
  let priceWatcher: PriceWatcher | null = null;
  const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
  
  if (GOOGLE_SHEETS_ID && process.env.NODE_ENV === 'production') {
    try {
      priceWatcher = new PriceWatcher(GOOGLE_SHEETS_ID);
      priceWatcher.start(0.25); // Controlla ogni 15 secondi
      console.log('✅ Price Watcher avviato');
    } catch (error) {
      console.log('⚠️ Errore avvio Price Watcher:', error);
    }
  }

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
    serveStatic(app);
  }

  // Use PORT from environment or default to 5000
  const PORT = parseInt(process.env.PORT || '5000', 10);

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
    try {
      const { startAutomaticPriceWatcher } = await import('./autoStartPriceWatcher');
      await startAutomaticPriceWatcher();
    } catch (error: any) {
      console.log('ℹ️ Price Watcher non avviato automaticamente:', error?.message || error);
    }
  });
})();