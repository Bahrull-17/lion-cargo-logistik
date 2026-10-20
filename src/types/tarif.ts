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
}
