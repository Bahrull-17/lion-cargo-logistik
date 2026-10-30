"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase/server";

/** email dikembalikan agar kolom email tidak kosong lagi setelah gagal masuk. */
export type LoginState = { error?: string; email?: string };

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1).max(200),
});

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();

  const parsed = LoginSchema.safeParse({
    email,
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Periksa kembali email dan kata sandi Anda.", email };

  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: "Email atau kata sandi salah.", email };

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (isAdmin !== true) {
    await supabase.auth.signOut();
    return { error: "Akun ini tidak memiliki akses admin.", email };
  }

  redirect("/admin/tarif");
}

export async function logout() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
