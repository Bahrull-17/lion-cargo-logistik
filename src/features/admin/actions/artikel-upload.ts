"use server";

import { getAdmin } from "@/features/admin/lib/get-admin";
import { STORAGE_BUCKET } from "@/features/admin/lib/storage";

export type UploadCoverResult = { ok: true; url: string } | { ok: false; error: string };

const MAX_BYTES = 5 * 1024 * 1024;

/** Jenis gambar ditentukan dari isi file (bukan dari nama/tipe kiriman browser) agar file palsu ditolak. */
function detectImageType(bytes: Uint8Array): { mime: string; ext: string } | null {
  if (bytes.length < 12) return null;

  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { mime: "image/jpeg", ext: "jpg" };
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return { mime: "image/png", ext: "png" };
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return { mime: "image/webp", ext: "webp" };
  if (ascii(4, 8) === "ftyp" && (ascii(8, 12) === "avif" || ascii(8, 12) === "avis")) return { mime: "image/avif", ext: "avif" };

  return null;
}

/** Mengunggah gambar sampul ke Supabase Storage dan mengembalikan URL publiknya. */
export async function uploadCoverImage(formData: FormData): Promise<UploadCoverResult> {
  const admin = await getAdmin();
  if (!admin) return { ok: false, error: "Sesi berakhir atau tidak punya akses. Silakan masuk kembali." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Pilih file gambar terlebih dahulu." };
  if (file.size > MAX_BYTES) return { ok: false, error: "Ukuran gambar maksimal 5 MB." };

  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = detectImageType(bytes);
  if (!type) return { ok: false, error: "Format tidak didukung. Gunakan JPG, PNG, WebP, atau AVIF." };

  const path = `covers/${crypto.randomUUID()}.${type.ext}`;

  const { error } = await admin.supabase.storage.from(STORAGE_BUCKET).upload(path, bytes, {
    contentType: type.mime,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) return { ok: false, error: "Gagal mengunggah gambar. Coba lagi." };

  const { data } = admin.supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}
