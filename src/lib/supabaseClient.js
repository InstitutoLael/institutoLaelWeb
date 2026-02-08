import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// DIAGNOSTIC LOGS (Visible in console now that drop_console is off)
console.log("🛠️ Supabase URL:", supabaseUrl);
console.log("🛠️ Supabase Key Length:", supabaseAnonKey ? supabaseAnonKey.length : 0);
console.log("🛠️ Is Key Publishable Format?", supabaseAnonKey?.startsWith('sb_publishable'));

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMsg = 'CRÍTICO: Faltan las variables de entorno de Supabase (.env).';
  console.error(errorMsg);
  // No usar placeholders, mejor lanzar error para que no haya timeouts silenciosos
}

export const supabase = createClient(
  supabaseUrl || 'https://missing-url.supabase.co',
  supabaseAnonKey || 'missing-key'
);
