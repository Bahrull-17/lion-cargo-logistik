export const ARTICLE_LOCALES = ["id", "en"] as const;
export type ArticleLocale = (typeof ARTICLE_LOCALES)[number];

export function toArticleLocale(locale: string): ArticleLocale {
  return locale === "en" ? "en" : "id";
}

/** Harus sama dengan CHECK constraint kolom articles.category di database. */
export const ARTICLE_CATEGORIES = ["tips", "regulasi", "bandara", "bisnis"] as const;
export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

/** Satu artikel di daftar (tanpa isi lengkap). */
export interface ArticleSummary {
  /** id artikel (sama untuk semua bahasa). */
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  coverImageUrl: string | null;
  isFeatured: boolean;
  /** ISO timestamp. */
  publishedAt: string;
  readingMinutes: number;
  authorName: string;
}

export interface ArticleDetail extends ArticleSummary {
  contentHtml: string;
  metaTitle: string | null;
  metaDescription: string | null;
  updatedAt: string;
  /** Slug pasangan di bahasa lain yang sudah terbit, mis. { id: "...", en: "..." }. */
  alternates: Partial<Record<ArticleLocale, string>>;
}
