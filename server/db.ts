import pkg from 'pg';
const { Pool } = pkg;
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Verifica che la connection string sia configurata
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to configure Supabase connection string on Render?"
  );
}

// Crea pool di connessioni PostgreSQL con SSL per Supabase
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Inizializza Drizzle ORM con lo schema
export const db = drizzle(pool, { schema });

// Log di conferma (utile per debug)
console.log('✅ Database connesso via Drizzle ORM');
console.log(`📊 Connection: ${process.env.DATABASE_URL ? 'Supabase PostgreSQL' : 'Not configured'}`);