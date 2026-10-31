import type { ArticleCategory } from "@/types/artikel";
import type { DestinationRegion } from "@/types/tarif";

/** Batas wajar harga per Kg (Rp). Tertinggi saat ini ±139.000; batas ini menangkap salah ketik. */
export const MAX_PRICE_PER_KG = 1_000_000;

/** Label kategori artikel untuk panel admin (berbahasa Indonesia). */
export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
  tips: "Tips Pengiriman",
  regulasi: "Regulasi Kargo",
  bandara: "Info Bandara",
  bisnis: "Bisnis & Logistik",
};

/** Label wilayah kota tujuan untuk panel admin. */
export const DESTINATION_REGION_LABELS: Record<DestinationRegion, string> = {
  sumatera: "Sumatera",
  jawa: "Jawa",
  kalimantan: "Kalimantan",
  sulawesi: "Sulawesi",
  "bali-nusa": "Bali & Nusa Tenggara",
  "papua-maluku": "Papua & Maluku",
};
