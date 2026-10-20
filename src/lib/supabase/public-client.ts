import { createClient } from "@supabase/supabase-js";

/**
 * Klien Supabase untuk data publik (read-only, dilindungi RLS).
 * Tanpa cookie/sesi, sehingga aman dipakai di dalam scope "use cache".
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Variabel NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY belum diset.");
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
