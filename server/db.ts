import pkg from 'pg';
const { Pool } = pkg;
import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';

import dotenv from 'dotenv';

dotenv.config();

// ✅ Prende direttamente la stringa dal file .env
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// ✅ Crea un pool PostgreSQL
export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000,
  max: 20,
  idleTimeoutMillis: 30000
});

// ✅ Gestisce errori del pool
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// ✅ Inizializza Drizzle ORM
export const db = drizzle(pool, { schema });

console.log('✅ Database configuration loaded');
console.log(`📊 Connected to: ${connectionString.split('@')[1]}`);
