import type { Destination } from "@/types/tarif";
import { CARGO_RULES } from "@/features/cek-ongkir/constants";
import { hasTariff } from "@/features/cek-ongkir/lib/destination";

export type WeightParseResult = { ok: true; weightKg: number } | { ok: false; error: string };

export interface Quote {
  destination: Destination;
  /** Berat yang diketik pengguna. */
  inputWeightKg: number;
  /** Berat yang ditagihkan: dibulatkan ke atas ke kilogram penuh. */
  chargeableWeightKg: number;
  pricePerKg: number;
  subtotal: number;
  handlingFee: number;
  total: number;
  /** false bila tarif tujuan belum tersedia (<= 0) sehingga harus tanya admin. */
  isPriced: boolean;
}

/**
 * Validasi input berat dari form. Mengembalikan pesan error yang siap ditampilkan.
 * Berat di bawah minimum DITOLAK (tidak otomatis dinaikkan): pengguna harus mengetik minimum itu sendiri.
 */
export function parseWeight(input: string, minWeightKg: number): WeightParseResult {
  const trimmed = input.trim();
  if (trimmed === "") return { ok: false, error: "Masukkan berat barang terlebih dahulu." };

  const weightKg = Number(trimmed);
  if (!Number.isFinite(weightKg)) {
    return { ok: false, error: "Berat harus berupa angka yang valid." };
  }
  if (weightKg < minWeightKg) {
    return { ok: false, error: `Berat di bawah ${minWeightKg} Kg tidak dapat diproses. Masukkan minimal ${minWeightKg} Kg.` };
  }
  if (weightKg > CARGO_RULES.maximumWeightKg) {
    return { ok: false, error: "Berat melebihi batas kalkulator. Hubungi tim kami untuk pengiriman partai besar." };
  }
  return { ok: true, weightKg };
}

/** Fungsi murni: tanpa state/DOM sehingga mudah diuji. Berat sudah divalidasi lewat parseWeight. */
export function calculateQuote(destination: Destination, weightKg: number): Quote {
  const chargeableWeightKg = Math.max(Math.ceil(weightKg), CARGO_RULES.minimumWeightKg);
  const pricePerKg = destination.pricePerKg;
  const isPriced = hasTariff(destination);
  const subtotal = isPriced ? Math.round(pricePerKg * chargeableWeightKg) : 0;
  const handlingFee = CARGO_RULES.handlingFee;

  return {
    destination,
    inputWeightKg: weightKg,
    chargeableWeightKg,
    pricePerKg,
    subtotal,
    handlingFee,
    total: isPriced ? subtotal + handlingFee : 0,
    isPriced,
  };
}
