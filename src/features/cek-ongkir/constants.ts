export const COMPANY_NAME = "Lion Cargo Logistik";

/**
 * Aturan operasional cargo udara reguler yang berlaku sama untuk semua rute.
 * minimumWeightKg berlaku seragam; kolom min_weight di database sengaja tidak dipakai.
 */
export const CARGO_RULES = {
  minimumWeightKg: 10,
  /** Batas atas wajar untuk mencegah input tak masuk akal (mis. 999999999). */
  maximumWeightKg: 100_000,
  handlingFee: 30_000,
  estimatedTransit: "1 - 2 Hari Kerja",
} as const;

export const DESTINATIONS_PER_PAGE = 15;
