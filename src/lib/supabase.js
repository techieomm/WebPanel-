import { createClient } from '@supabase/supabase-js';

// Safe environment accessor for both Vite browser runtime and Node testing tools
const env =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env
    : typeof process !== 'undefined' && process.env
    ? process.env
    : {};

const supabaseUrl = env.VITE_SUPABASE_URL || 'https://pasfzcgxvycrosasbthu.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

/**
 * Checks whether Supabase has been properly configured with the project URL and client-safe anon key.
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseAnonKey.trim() !== '' &&
    supabaseAnonKey !== 'your_supabase_anon_key_here'
);

if (!isSupabaseConfigured) {
  console.warn(
    '[RoadRider Supabase] Notice: VITE_SUPABASE_ANON_KEY is not configured yet.\n' +
      'Please set VITE_SUPABASE_ANON_KEY in your .env or .env.local file to connect live database tables and auth.'
  );
}

/**
 * Single reusable Supabase client for RoadRider Vendor Portal.
 * Uses client-safe publishable anon key. Never use the service-role key in frontend code.
 */
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || 'placeholder-anon-key-awaiting-configuration',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
