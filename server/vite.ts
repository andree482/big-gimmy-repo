import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { type Express } from "express";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLIENT_PATH = path.resolve(process.cwd(), "client/dist");
const INDEX_PATH = path.join(CLIENT_PATH, "index.html");

export function serveStatic(app: Express) {
  app.use(express.static(CLIENT_PATH));
  app.get("*", (req, res) => {
    res.sendFile(INDEX_PATH);
  });
}


  // Serve static assets con cache
  app.use(express.static(distPath, {
    maxAge: '1y',
    immutable: true,
    setHeaders: (res, filepath) => {
      if (filepath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    }
  }));

  // Fallback SPA
  app.get("*", (_req, res) => {
    res.sendFile(indexPath);
  });
}

export function log(message: string) {
  console.log(`[vite] ${message}`);
}

export async function setupVite(app: Express, server: any) {
  const vite = await (await import("vite")).createServer({
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);
  return vite;
}