"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Search, ChevronRight } from "lucide-react";

interface KotaTujuanHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function KotaTujuanHero({ searchQuery, setSearchQuery }: KotaTujuanHeroProps) {
  const t = useTranslations("pages.destination.hero");

  return (
    <>
      {/* 1. BANNER HERO */}
      <section className="w-full bg-white border-b border-slate-200/80 overflow-hidden">
        <div className="w-full relative">
          <Image src="/images/kota-tujuan/peta-rute.jpg" alt={t("bannerAlt")} width={1920} height={600} priority className="w-full h-auto object-cover block" />
        </div>
      </section>

      {/* 2. BREADCRUMB & HEADER */}
      <section className="w-full bg-white border-b border-slate-200/60 pt-4 pb-8 sm:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1 text-slate-600">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-red-600 font-bold">{t("breadcrumb.current")}</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t("title.line1")} <br className="hidden sm:inline" />
              <span className="inline-block mt-1 px-4 py-1 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-600/20 transform -rotate-1">{t("title.highlight")}</span>
            </h1>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto pt-1">
              {t.rich("description", {
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
                  placeholder={t("searchPlaceholder")}
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-white rounded-2xl border-2 border-slate-200 text-xs sm:text-sm text-slate-900 font-semibold shadow-xs focus:border-red-600 focus:outline-hidden transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-4 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer">
                    {t("clear")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
