import type { ArticleCategory } from "@/types/artikel";

/** Batas wajar harga per Kg (Rp). Tertinggi saat ini ±139.000; batas ini menangkap salah ketik. */
export const MAX_PRICE_PER_KG = 1_000_000;

/** Label kategori artikel untuk panel admin (berbahasa Indonesia). */
export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
  tips: "Tips Pengiriman",
  regulasi: "Regulasi Kargo",
  bandara: "Info Bandara",
  bisnis: "Bisnis & Logistik",
};
