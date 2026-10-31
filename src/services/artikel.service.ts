import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";
import { createPublicClient } from "@/lib/supabase/public-client";
import { ARTICLE_CATEGORIES, ARTICLE_LOCALES, type ArticleDetail, type ArticleLocale, type ArticleSummary } from "@/types/artikel";

const ParentSchema = z.object({
  category: z.enum(ARTICLE_CATEGORIES),
  cover_image_url: z.string().nullable(),
  is_featured: z.boolean(),
});

const ListRowSchema = z.object({
  article_id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string(),
  author_name: z.string(),
  reading_minutes: z.coerce.number().int().positive(),
  published_at: z.string().min(1),
  articles: ParentSchema,
});

const DetailRowSchema = ListRowSchema.extend({
  content_html: z.string(),
  meta_title: z.string().nullable(),
  meta_description: z.string().nullable(),
  updated_at: z.string().min(1),
});

const AlternateRowSchema = z.object({
  locale: z.enum(ARTICLE_LOCALES),
  slug: z.string().min(1),
});

const LIST_COLUMNS = "article_id, slug, title, excerpt, author_name, reading_minutes, published_at, articles!inner(category, cover_image_url, is_featured)";
const DETAIL_COLUMNS = `${LIST_COLUMNS}, content_html, meta_title, meta_description, updated_at`;

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Slug dari URL tidak dipercaya: format dicek dulu agar tidak membuat entri cache/query sembarangan. */
export function isValidArticleSlug(slug: string): boolean {
  return slug.length <= 120 && SLUG_PATTERN.test(slug);
}

function toSummary(item: z.infer<typeof ListRowSchema>): ArticleSummary {
  return {
    id: item.article_id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    category: item.articles.category,
    coverImageUrl: item.articles.cover_image_url,
    isFeatured: item.articles.is_featured,
    publishedAt: item.published_at,
    readingMinutes: item.reading_minutes,
    authorName: item.author_name,
  };
}

/** Artikel yang sudah terbit di satu bahasa, terbaru dulu. Di-cache; dibersihkan lewat tag "articles". */
export async function getPublishedArticles(locale: ArticleLocale): Promise<ArticleSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  const { data, error } = await createPublicClient().from("article_translations").select(LIST_COLUMNS).eq("locale", locale).eq("status", "published").order("published_at", { ascending: false });

  if (error) throw new Error(`Gagal memuat artikel: ${error.message}`);

  return (data ?? []).flatMap((raw) => {
    const row = ListRowSchema.safeParse(raw);
    if (!row.success) {
      console.warn("[artikel] Baris tidak valid dilewati:", row.error.message);
      return [];
    }
    return [toSummary(row.data)];
  });
}

async function fetchArticleBySlug(locale: ArticleLocale, slug: string): Promise<ArticleDetail | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  const client = createPublicClient();

  const { data, error } = await client.from("article_translations").select(DETAIL_COLUMNS).eq("locale", locale).eq("slug", slug).eq("status", "published").maybeSingle();

  if (error) throw new Error(`Gagal memuat artikel: ${error.message}`);
  if (!data) return null;

  const row = DetailRowSchema.safeParse(data);
  if (!row.success) {
    console.warn("[artikel] Detail tidak valid:", row.error.message);
    return null;
  }

  const item = row.data;

  // Slug pasangan di semua bahasa yang sudah terbit (termasuk bahasa ini).
  const alternates: ArticleDetail["alternates"] = {};
  const { data: altData, error: altError } = await client.from("article_translations").select("locale, slug").eq("article_id", item.article_id).eq("status", "published");

  if (altError) {
    console.warn("[artikel] Gagal memuat pasangan bahasa:", altError.message);
  } else {
    for (const altRow of altData ?? []) {
      const parsed = AlternateRowSchema.safeParse(altRow);
      if (parsed.success) alternates[parsed.data.locale] = parsed.data.slug;
    }
  }

  return {
    ...toSummary(item),
    contentHtml: item.content_html,
    metaTitle: item.meta_title,
    metaDescription: item.meta_description,
    updatedAt: item.updated_at,
    alternates,
  };
}

/** Satu artikel terbit berdasarkan bahasa + slug. Mengembalikan null bila tidak ada / belum terbit. */
export async function getArticleBySlug(locale: ArticleLocale, slug: string): Promise<ArticleDetail | null> {
  if (!isValidArticleSlug(slug)) return null;
  return fetchArticleBySlug(locale, slug);
}

/** Path (tanpa prefix bahasa) tujuan saat pengunjung mengganti bahasa di halaman artikel. */
export async function getAlternateArticlePath(fromLocale: ArticleLocale, slug: string, toLocale: ArticleLocale): Promise<string> {
  const article = await getArticleBySlug(fromLocale, slug);
  const targetSlug = article?.alternates[toLocale];
  return targetSlug ? `/artikel/${targetSlug}` : "/artikel";
}
