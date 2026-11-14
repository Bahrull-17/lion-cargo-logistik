import type { ArticleCategory } from "@/types/artikel";
import type { DestinationRegion } from "@/types/tarif";

export const MAX_PRICE_PER_KG = 1_000_000;

export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
  tips: "Tips Pengiriman",
  regulasi: "Regulasi Kargo",
  bandara: "Info Bandara",
  bisnis: "Bisnis & Logistik",
};

export const DESTINATION_REGION_LABELS: Record<DestinationRegion, string> = {
  sumatera: "Sumatera",
  jawa: "Jawa",
  kalimantan: "Kalimantan",
  sulawesi: "Sulawesi",
  "bali-nusa": "Bali & Nusa Tenggara",
  "papua-maluku": "Papua & Maluku",
};
