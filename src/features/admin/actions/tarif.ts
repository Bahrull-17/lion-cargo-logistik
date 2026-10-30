"use server";

import { updateTag } from "next/cache";
import { z } from "zod";
import { MAX_PRICE_PER_KG } from "@/features/admin/constants";
import { getAdmin } from "@/features/admin/lib/get-admin";

const SERVICE_REGULER = "Reguler";

const UpdatePriceSchema = z.object({
  id: z.uuid(),
  price: z.number().int().min(1).max(MAX_PRICE_PER_KG),
});

export type UpdatePriceResult = { ok: true; price: number; updatedAt: string } | { ok: false; error: string };

export async function updatePrice(input: { id: string; price: number }): Promise<UpdatePriceResult> {
  const parsed = UpdatePriceSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: `Harga harus bilangan bulat 1 - ${MAX_PRICE_PER_KG.toLocaleString("id-ID")}.` };
  }

  const admin = await getAdmin();
  if (!admin) return { ok: false, error: "Sesi berakhir atau tidak punya akses. Silakan masuk kembali." };

  const updatedAt = new Date().toISOString();

  // Hanya kolom price, hanya baris layanan Reguler. RLS di database tetap jadi pengaman terakhir.
  const { data, error } = await admin.supabase
    .from("tarifs")
    .update({ price: parsed.data.price, updated_at: updatedAt })
    .eq("id", parsed.data.id)
    .eq("service", SERVICE_REGULER)
    .select("id");

  if (error) return { ok: false, error: "Gagal menyimpan. Coba lagi." };
  if (!data || data.length === 0) return { ok: false, error: "Tarif tidak ditemukan atau tidak punya izin." };

  // Harga di website publik langsung terbarui (cache di tarif.service.ts memakai kedua tag ini).
  updateTag("tarifs");
  updateTag("tarifs-all");

  return { ok: true, price: parsed.data.price, updatedAt };
}
