import { shippingConfig } from "@/config/shipping";

export const COMPANY_NAME = "Lion Cargo Logistik";

/**
 * Aturan operasional cargo udara reguler yang berlaku sama untuk semua rute.
 * Nilainya diturunkan dari shippingConfig agar tidak ada angka ganda.
 * minimumWeightKg berlaku seragam; kolom min_weight di database sengaja tidak dipakai.
 */
export const CARGO_RULES = {
  minimumWeightKg: shippingConfig.minWeightKg,
  /** Batas atas wajar untuk mencegah input tak masuk akal (mis. 999999999). */
  maximumWeightKg: 100_000,
  handlingFee: shippingConfig.adminFee,
  estimatedTransit: shippingConfig.estimasiReguler,
} as const;

export const DESTINATIONS_PER_PAGE = 15;
