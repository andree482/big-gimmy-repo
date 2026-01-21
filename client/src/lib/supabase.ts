// lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Usa valori placeholder se le variabili d'ambiente non sono definite
// Questo permette al sito di caricarsi anche senza Supabase configurato
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// Flag per verificare se Supabase è configurato correttamente
export const isSupabaseConfigured =
  !!import.meta.env.VITE_SUPABASE_URL &&
  !!import.meta.env.VITE_SUPABASE_ANON_KEY;
