/** Wilayah untuk pengelompokan di halaman Kota Tujuan. Harus sama dengan CHECK constraint kolom tarifs.region. */
export const DESTINATION_REGIONS = ["sumatera", "jawa", "kalimantan", "sulawesi", "bali-nusa", "papua-maluku"] as const;
export type DestinationRegion = (typeof DESTINATION_REGIONS)[number];

export interface Destination {
  slug: string;
  name: string;
  code: string | null;
  pricePerKg: number;
  minWeight: number;
  region: DestinationRegion | null;
}
