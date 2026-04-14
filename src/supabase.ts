import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

let client = null;
try {
  // Initialize only if keys are present AND valid URL to prevent crashes
  if (supabaseUrl && supabaseAnonKey) {
     client = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (error) {
  console.error("Gagal menginisialisasi Supabase (Cek URL Anda):", error);
}

export const supabase = client;
