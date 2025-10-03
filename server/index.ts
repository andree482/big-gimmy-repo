import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from "http";
import { db } from "./db";
import { PriceWatcher } from "./priceWatcher";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve attached assets statically
app.use('/attached_assets', express.static(path.resolve(process.cwd(), 'attached_assets')));

// Serve product images statically
app.use('/images', express.static(path.resolve(process.cwd(), 'public/images')));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
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

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Serve static files (including images) in both development and production
  app.use('/images', express.static('public/images'));

  // Price Watcher setup (opzionale)
  let priceWatcher: PriceWatcher | null = null;
  const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;

  if (GOOGLE_SHEETS_ID && process.env.NODE_ENV === 'production') {
    priceWatcher = new PriceWatcher(GOOGLE_SHEETS_ID);
    priceWatcher.start(0.25); // Controlla ogni 15 secondi
  }

  // API 404 fallback - catch unmatched API routes before Vite's catch-all
  app.use("/api", (req, res) => {
    res.status(404).json({ success: false, message: "API route not found", path: req.originalUrl });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  const PORT = 5000; // Ensure PORT is defined for the listen call

  // Setup Express server
  app.listen(PORT, "0.0.0.0", async () => {
    console.log(`${new Date().toLocaleTimeString()} [express] serving on port ${PORT}`);

    // Avvia automaticamente Price Watcher se configurato
    try {
      const { startAutomaticPriceWatcher } = await import('./autoStartPriceWatcher');
      await startAutomaticPriceWatcher();
    } catch (error) {
      console.log('ℹ️ Price Watcher non avviato automaticamente:', error.message);
    }
  });
})();