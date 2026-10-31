"use server";

import { getAlternateArticlePath } from "@/services/artikel.service";
import { ARTICLE_LOCALES, type ArticleLocale } from "@/types/artikel";

function isArticleLocale(value: string): value is ArticleLocale {
  return (ARTICLE_LOCALES as readonly string[]).includes(value);
}

/** Mencari halaman artikel pasangan di bahasa tujuan. Bila belum ada terjemahan terbit, kembali ke daftar artikel. */
export async function resolveArticleAlternatePath(fromLocale: string, slug: string, toLocale: string): Promise<string> {
  if (!isArticleLocale(fromLocale) || !isArticleLocale(toLocale)) return "/artikel";
  return getAlternateArticlePath(fromLocale, slug, toLocale);
}
