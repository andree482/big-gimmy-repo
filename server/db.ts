import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configurazione WebSocket per connessione serverless
// Questo adapter funziona sia con Neon che con Supabase PostgreSQL
neonConfig.webSocketConstructor = ws;

// Verifica che la connection string sia configurata
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to configure Supabase connection string on Render?"
  );
}

// Crea pool di connessioni PostgreSQL
// La connection string deve essere nel formato:
// postgresql://postgres.[ref]:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// Inizializza Drizzle ORM con lo schema
export const db = drizzle(pool, { schema });

// Log di conferma (utile per debug)
console.log('✅ Database connesso via Drizzle ORM');
console.log(`📊 Connection: ${process.env.DATABASE_URL ? 'Supabase PostgreSQL' : 'Not configured'}`);