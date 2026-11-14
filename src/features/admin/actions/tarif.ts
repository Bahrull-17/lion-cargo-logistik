"use server";

import { z } from "zod";
import { MAX_PRICE_PER_KG } from "@/features/admin/constants";
import { getAdmin } from "@/features/admin/lib/get-admin";
import { slugify } from "@/lib/slugify";
import { DESTINATION_REGIONS, type DestinationRegion } from "@/types/tarif";

const SERVICE_REGULER = "Reguler";
const ORIGIN = "Jakarta";
const ORIGIN_CODE = "CGK";

const DEFAULT_ESTIMATE = "Hubungi kami";

const NO_ACCESS = "Sesi berakhir atau tidak punya akses. Silakan masuk kembali.";
const SAVE_FAILED = "Gagal menyimpan. Coba lagi.";
const NOT_FOUND = "Tarif tidak ditemukan atau tidak punya izin.";

type DbError = { code?: string; message?: string; details?: string | null; hint?: string | null };

function logDbError(action: string, error: DbError) {
  console.error(`[tarif] ${action} gagal:`, { code: error.code, message: error.message, details: error.details, hint: error.hint });
}

function saveFailed(error?: DbError): string {
  if (process.env.NODE_ENV === "development" && error) {
    return `${SAVE_FAILED} [dev] kode=${error.code ?? "-"} pesan=${error.message ?? "-"}${error.details ? ` detail=${error.details}` : ""}${error.hint ? ` petunjuk=${error.hint}` : ""}`;
  }
  return SAVE_FAILED;
}

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
  if (!admin) return { ok: false, error: NO_ACCESS };

  const updatedAt = new Date().toISOString();

  const { data, error } = await admin.supabase.from("tarifs").update({ price: parsed.data.price, updated_at: updatedAt }).eq("id", parsed.data.id).eq("service", SERVICE_REGULER).select("id");

  if (error) {
    logDbError("updatePrice", error);
    return { ok: false, error: saveFailed(error) };
  }
  if (!data || data.length === 0) return { ok: false, error: NOT_FOUND };

  return { ok: true, price: parsed.data.price, updatedAt };
}

const CITY_PATTERN = /^[\p{L}\p{N}][\p{L}\p{N} .'()-]*$/u;

const CreateTarifSchema = z.object({
  destination: z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, " "))
    .pipe(z.string().min(2).max(80).regex(CITY_PATTERN)),
  code: z
    .string()
    .transform((value) => value.trim().toUpperCase())
    .pipe(z.string().regex(/^([A-Z]{3})?$/)),
  region: z.enum(DESTINATION_REGIONS),
  price: z.number().int().min(1).max(MAX_PRICE_PER_KG),
});

export interface CreatedTarif {
  id: string;
  name: string;
  code: string | null;
  region: DestinationRegion;
  price: number;
  status: string;
  updatedAt: string;
}

export type CreateTarifResult = { ok: true; item: CreatedTarif } | { ok: false; error: string };

const CREATE_ERRORS: Record<string, string> = {
  destination: "Nama kota 2 - 80 karakter, hanya huruf, angka, spasi, titik, tanda hubung, atau kurung.",
  code: "Kode bandara harus 3 huruf (contoh: SUB), atau kosongkan.",
  region: "Pilih wilayah kota tujuan.",
  price: `Harga harus bilangan bulat 1 - ${MAX_PRICE_PER_KG.toLocaleString("id-ID")}.`,
};

export async function createTarif(input: { destination: string; code: string; region: DestinationRegion; price: number }): Promise<CreateTarifResult> {
  const parsed = CreateTarifSchema.safeParse(input);
  if (!parsed.success) {
    const field = String(parsed.error.issues[0]?.path[0] ?? "");
    return { ok: false, error: CREATE_ERRORS[field] ?? "Data tidak valid." };
  }

  const admin = await getAdmin();
  if (!admin) return { ok: false, error: NO_ACCESS };

  const { destination, code, region, price } = parsed.data;

  if (slugify(destination) === "") return { ok: false, error: CREATE_ERRORS.destination ?? "Nama kota tidak valid." };

  const { data: sameName, error: nameError } = await admin.supabase.from("tarifs").select("id").eq("service", SERVICE_REGULER).eq("origin", ORIGIN).ilike("destination", destination).limit(1);
  if (nameError) {
    logDbError("createTarif (cek nama kota)", nameError);
    return { ok: false, error: saveFailed(nameError) };
  }
  if (sameName && sameName.length > 0) return { ok: false, error: `Kota "${destination}" sudah ada di daftar tarif.` };

  const { data: reference } = await admin.supabase.from("tarifs").select("estimate").eq("service", SERVICE_REGULER).eq("origin", ORIGIN).limit(1).maybeSingle();
  const estimate = typeof reference?.estimate === "string" && reference.estimate.trim() !== "" ? reference.estimate : DEFAULT_ESTIMATE;

  const { data, error } = await admin.supabase
    .from("tarifs")
    .insert({
      origin: ORIGIN,
      origin_code: ORIGIN_CODE,
      destination,
      dest_code: code === "" ? null : code,
      service: SERVICE_REGULER,
      price,
      estimate,
      status: "active",
      region,
    })
    .select("id, destination, dest_code, price, status, updated_at, route_slug")
    .single();

  if (error) logDbError("createTarif (insert)", error);

  if (error || !data) {
    return { ok: false, error: error?.code === "23505" ? `Kota "${destination}" sudah ada di daftar tarif.` : saveFailed(error ?? undefined) };
  }

  if (data.route_slug) {
    const { data: sameSlug } = await admin.supabase.from("tarifs").select("id").eq("route_slug", String(data.route_slug)).neq("id", data.id).limit(1);
    if (sameSlug && sameSlug.length > 0) {
      await admin.supabase.from("tarifs").delete().eq("id", data.id);
      return { ok: false, error: "Sudah ada kota dengan alamat rute yang sama. Gunakan nama yang berbeda." };
    }
  }

  return {
    ok: true,
    item: {
      id: String(data.id),
      name: String(data.destination),
      code: data.dest_code ? String(data.dest_code) : null,
      region,
      price: Number(data.price),
      status: String(data.status ?? "active"),
      updatedAt: String(data.updated_at),
    },
  };
}

const SetStatusSchema = z.object({
  id: z.uuid(),
  status: z.enum(["active", "inactive"]),
});

export type SetTarifStatusResult = { ok: true; status: "active" | "inactive"; updatedAt: string } | { ok: false; error: string };

export async function setTarifStatus(input: { id: string; status: "active" | "inactive" }): Promise<SetTarifStatusResult> {
  const parsed = SetStatusSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Data tidak valid." };

  const admin = await getAdmin();
  if (!admin) return { ok: false, error: NO_ACCESS };

  const updatedAt = new Date().toISOString();

  const { data, error } = await admin.supabase.from("tarifs").update({ status: parsed.data.status, updated_at: updatedAt }).eq("id", parsed.data.id).eq("service", SERVICE_REGULER).select("id");

  if (error) {
    logDbError("setTarifStatus", error);
    return { ok: false, error: saveFailed(error) };
  }
  if (!data || data.length === 0) return { ok: false, error: NOT_FOUND };

  return { ok: true, status: parsed.data.status, updatedAt };
}

const DeleteSchema = z.object({ id: z.uuid() });

export type DeleteTarifResult = { ok: true } | { ok: false; error: string };

export async function deleteTarif(input: { id: string }): Promise<DeleteTarifResult> {
  const parsed = DeleteSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Data tidak valid." };

  const admin = await getAdmin();
  if (!admin) return { ok: false, error: NO_ACCESS };

  const { data, error } = await admin.supabase.from("tarifs").delete().eq("id", parsed.data.id).eq("service", SERVICE_REGULER).select("id");

  if (error) {
    logDbError("deleteTarif", error);
    return { ok: false, error: saveFailed(error) };
  }
  if (!data || data.length === 0) return { ok: false, error: NOT_FOUND };

  return { ok: true };
}
