import { cache } from "react";
import { createServerSupabase } from "@/lib/supabase/server";

export const getAdmin = cache(async () => {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (isAdmin !== true) return null;

  return { supabase, user };
});
