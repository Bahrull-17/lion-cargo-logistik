/** Wilayah untuk pengelompokan di halaman Kota Tujuan. Harus sama dengan CHECK constraint kolom tarifs.region. */
export const DESTINATION_REGIONS = ["sumatera", "jawa", "kalimantan", "sulawesi", "bali-nusa", "papua-maluku"] as const;
export type DestinationRegion = (typeof DESTINATION_REGIONS)[number];

/** Satu kota tujuan beserta tarif layanan Reguler dari Jakarta. */
export interface Destination {
  /** Kunci unik, berasal dari kolom route_slug (mis. cargo-jakarta-ke-surabaya). */
  slug: string;
  name: string;
  /** Kode bandara tujuan (mis. SUB). Bisa kosong di database. */
  code: string | null;
  /** Tarif per kilogram dalam Rupiah. */
  pricePerKg: number;
  /** Berat minimum yang ditagihkan, dalam kilogram. */
  minWeight: number;
  /** Wilayah yang dipilih admin. null = kota lama, wilayahnya dideteksi otomatis dari nama kota. */
  region: DestinationRegion | null;
}
