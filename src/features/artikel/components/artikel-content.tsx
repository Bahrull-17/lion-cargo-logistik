"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useFormatter, useTranslations } from "next-intl";
import { Search, ChevronRight, ArrowUpRight, Clock, Calendar, Sparkles, BookOpen } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { waLink } from "@/lib/wa-link";
import { ARTICLE_CATEGORIES, type ArticleSummary } from "@/types/artikel";

const daftarKategori = ["semua", ...ARTICLE_CATEGORIES] as const;

interface ArtikelContentProps {
  articles: ArticleSummary[];
}

export function ArtikelContent({ articles }: ArtikelContentProps) {
  const t = useTranslations("pages.article");
  const format = useFormatter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState<string>("semua");

  const formatDate = (iso: string) => format.dateTime(new Date(iso), { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" });

  const filteredArtikel = useMemo(() => {
    const keyword = searchQuery.toLowerCase();
    return articles.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(keyword) || item.excerpt.toLowerCase().includes(keyword);
      const matchKategori = selectedKategori === "semua" || item.category === selectedKategori;
      return matchSearch && matchKategori;
    });
  }, [articles, searchQuery, selectedKategori]);

  // Unggulan = yang ditandai admin di bahasa ini; bila tidak ada, artikel terbaru.
  const featuredArtikel = articles.find((item) => item.isFeatured) ?? articles[0];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-12 sm:pb-16 overflow-hidden relative">
      {/* 1. HEADER & HERO SECTION */}
      <section className="w-full bg-white border-b border-slate-200/60 pt-6 pb-10 sm:pb-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1 text-slate-600">
              {t("hero.breadcrumb.home")}
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-red-600 font-bold">{t("hero.breadcrumb.current")}</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t("hero.title.line1")} <br className="hidden sm:inline" />
              <span className="inline-block mt-1 px-4 py-1 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-600/20 transform -rotate-1">{t("hero.title.highlight")}</span>
            </h1>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto pt-1">
              {t.rich("hero.description", {
                strong: (chunks) => <strong className="text-slate-900">{chunks}</strong>,
              })}
            </p>

            <div className="pt-3 max-w-xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 size-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("hero.searchPlaceholder")}
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-white rounded-2xl border-2 border-slate-200 text-xs sm:text-sm text-slate-900 font-semibold shadow-xs focus:border-red-600 focus:outline-hidden transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-4 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer">
                    {t("hero.clear")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {articles.length === 0 ? (
        /* BELUM ADA ARTIKEL */
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
            <BookOpen className="size-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">{t("list.noArticles.title")}</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">{t("list.noArticles.description")}</p>
          </div>
        </section>
      ) : (
        <>
          {/* 2. FEATURED ARTICLE BANNER */}
          {!searchQuery && selectedKategori === "semua" && featuredArtikel && (
            <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
              <div className="mb-3 flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase font-mono">
                <Sparkles className="size-4 text-red-600" />
                <span>{t("list.featuredLabel")}</span>
              </div>

              <Link
                href={`/artikel/${featuredArtikel.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-300"
              >
                <div className="lg:col-span-6 relative min-h-60 sm:min-h-75 overflow-hidden bg-slate-100">
                  {featuredArtikel.coverImageUrl ? (
                    <Image src={featuredArtikel.coverImageUrl} alt={featuredArtikel.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <BookOpen className="size-12 text-slate-300" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-lg tracking-wider shadow-md">{t(`list.filters.${featuredArtikel.category}`)}</div>
                </div>

                <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3.5 text-red-600" />
                        {formatDate(featuredArtikel.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5 text-red-600" />
                        {t("list.readingTime", { minutes: featuredArtikel.readingMinutes })}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-red-600 transition-colors leading-tight">{featuredArtikel.title}</h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">{featuredArtikel.excerpt}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      {t("list.readMore")} <ChevronRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* 3. FILTER KATEGORI & GRID ARTIKEL */}
          <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              {daftarKategori.map((key) => {
                const isActive = selectedKategori === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedKategori(key)}
                    className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      isActive ? "bg-red-600 text-white shadow-md shadow-red-600/25 scale-[1.02]" : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80"
                    }`}
                  >
                    {t(`list.filters.${key}`)}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mb-4 text-xs font-mono font-bold text-slate-500">
              <span>{t("list.showing", { count: filteredArtikel.length })}</span>
              {searchQuery && <span className="text-red-600">{t("list.search", { query: searchQuery })}</span>}
            </div>

            {filteredArtikel.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredArtikel.map((item) => (
                    <motion.article
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="group flex flex-col justify-between bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-red-300 transition-all duration-300"
                    >
                      <div>
                        <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                          {item.coverImageUrl ? (
                            <Image src={item.coverImageUrl} alt={item.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="absolute inset-0 grid place-items-center">
                              <BookOpen className="size-10 text-slate-300" />
                            </div>
                          )}
                          <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-lg tracking-wider shadow-xs">{t(`list.filters.${item.category}`)}</div>
                        </div>

                        <div className="p-5 sm:p-6 space-y-3">
                          <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3 text-red-600" />
                              {formatDate(item.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="size-3 text-red-600" />
                              {t("list.readingTime", { minutes: item.readingMinutes })}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">{item.title}</h3>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">{item.excerpt}</p>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 pt-0">
                        <Link
                          href={`/artikel/${item.slug}`}
                          className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50 group-hover:bg-red-600 border border-slate-200 group-hover:border-red-600 text-xs font-bold text-slate-800 group-hover:text-white transition-all shadow-xs"
                        >
                          <span>{t("list.readArticle")}</span>
                          <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
                <BookOpen className="size-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900">{t("list.empty.title")}</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">{t("list.empty.description")}</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedKategori("semua");
                  }}
                  className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md hover:bg-red-700 transition-all cursor-pointer"
                >
                  {t("list.empty.reset")}
                </button>
              </div>
            )}
          </section>
        </>
      )}

      {/* 4. CALL TO ACTION */}
      <section className="mt-8 pb-4 pt-6 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-4">
              {t.rich("cta.title", {
                highlight: (chunks) => <span className="text-red-600">{chunks}</span>,
              })}
            </motion.h2>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="flex items-center justify-center gap-3 mb-4">
              <a
                href={waLink(t("cta.whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-red-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {t("cta.button")}
              </a>

              <a
                href={waLink(t("cta.whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("cta.ariaLabel")}
                className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 text-white shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-110 hover:rotate-12 active:scale-95 transition-all duration-300"
              >
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
              {t.rich("cta.tagline", {
                brand: (chunks) => <span className="font-bold text-slate-900">{chunks}</span>,
                tag: (chunks) => <span className="text-red-600 font-semibold">{chunks}</span>,
              })}
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}
