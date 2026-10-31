import type { ArticleCategory, ArticleLocale } from "@/types/artikel";

export type TranslationStatus = "draft" | "published";

export interface TranslationFormValues {
  title: string;
  slug: string;
  excerpt: string;
  authorName: string;
  contentHtml: string;
  metaTitle: string;
  metaDescription: string;
  status: TranslationStatus;
}

export interface ArticleFormValues {
  category: ArticleCategory;
  coverImageUrl: string | null;
  translations: Record<ArticleLocale, TranslationFormValues>;
}

export function emptyTranslation(): TranslationFormValues {
  return { title: "", slug: "", excerpt: "", authorName: "", contentHtml: "", metaTitle: "", metaDescription: "", status: "draft" };
}

export function emptyArticleFormValues(): ArticleFormValues {
  return { category: "tips", coverImageUrl: null, translations: { id: emptyTranslation(), en: emptyTranslation() } };
}
