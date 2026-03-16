import pkg from 'pg';
const { Pool } = pkg;
import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';

import dotenv from 'dotenv';

dotenv.config();

// ✅ Prende direttamente la stringa dal file .env
const connectionString = process.env.DATABASE_URL_PRIVATO;

if (!connectionString) {
  throw new Error('DATABASE_URL_PRIVATO is not defined in environment variables');
}

// ✅ Crea un pool PostgreSQL
export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 15000,  // 15 secondi timeout
  max: 10,                          // Ridotto per evitare saturazione Supabase
  idleTimeoutMillis: 30000,
  allowExitOnIdle: true             // Permette al pool di chiudere connessioni inutilizzate
});

// ✅ Gestisce errori del pool
// NOTA: NON usare process.exit() qui! Supabase chiude le connessioni idle
// periodicamente e questo causerebbe il crash del server con conseguente 502.
pool.on('error', (err) => {
  console.error('Unexpected error on idle client (ignorato, il pool si riconnetterà):', err.message);
});

// ✅ Inizializza Drizzle ORM
export const db = drizzle(pool, { schema });

console.log('✅ Database configuration loaded');
console.log(`📊 Connected to: ${connectionString.split('@')[1]}`);
