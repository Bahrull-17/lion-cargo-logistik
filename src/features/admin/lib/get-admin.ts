import { cache } from "react";
import { createServerSupabase } from "@/lib/supabase/server";

/**
 * Mengembalikan klien + user bila sesi valid DAN is_admin() bernilai true, selain itu null.
 * Selalu dipanggil ulang di setiap page/action: layout saja tidak cukup sebagai pengaman.
 * cache() hanya mencegah panggilan ganda dalam satu request.
 */
export const getAdmin = cache(async () => {
  const supabase = await createServerSupabase();

  // getUser() memvalidasi token ke server Auth (bukan sekadar membaca cookie).
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (isAdmin !== true) return null;

  return { supabase, user };
});
