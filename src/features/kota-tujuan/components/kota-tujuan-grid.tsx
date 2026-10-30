"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Plane, MessageCircle, Sparkles, Clock, ChevronDown } from "lucide-react";
import { waLink } from "@/lib/wa-link";

export interface KotaTujuanItem {
  id: string;
  nama: string;
  kodeBandara: string;
  namaBandara?: string;
  pulau: "sumatera" | "jawa" | "kalimantan" | "sulawesi" | "bali-nusa" | "papua-maluku";
  labelPulau: string;
  estimasi: string;
  isPopular?: boolean;
}

// Hanya key; label diambil dari JSON (grid.filters.*)
const daftarPulauFilter = ["semua", "sumatera", "jawa", "kalimantan", "sulawesi", "bali-nusa", "papua-maluku"] as const;

interface KotaTujuanGridProps {
  selectedPulau: string;
  onSelectPulau: (key: string) => void;
  displayedKota: KotaTujuanItem[];
  filteredKotaTotalLength: number;
  searchQuery: string;
  displayLimit: number;
  onLoadMore: () => void;
  onResetFilter: () => void;
}

export function KotaTujuanGrid({ selectedPulau, onSelectPulau, displayedKota, filteredKotaTotalLength, searchQuery, displayLimit, onLoadMore, onResetFilter }: KotaTujuanGridProps) {
  const t = useTranslations("pages.destination.grid");
  const whatsappBaseUrl = (namaKota: string, kode: string) => waLink(t("whatsappRoute", { city: namaKota, code: kode }));

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Filter Tab Pulau */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {daftarPulauFilter.map((key) => {
          const isActive = selectedPulau === key;
          return (
            <button
              key={key}
              onClick={() => onSelectPulau(key)}
              className={`shrink-0 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                isActive ? "bg-red-600 text-white shadow-md shadow-red-600/25 scale-[1.02]" : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {t(`filters.${key}`)}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mb-4 text-xs font-mono font-bold text-slate-500">
        <span>{t("showing", { shown: displayedKota.length, total: filteredKotaTotalLength })}</span>
        {searchQuery && <span className="text-red-600">{t("result", { query: searchQuery })}</span>}
      </div>

      {displayedKota.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {displayedKota.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col justify-between p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-red-300 transition-all duration-300 overflow-hidden"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-xl font-black font-mono text-red-600 bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-lg">{item.kodeBandara}</span>
                      {item.isPopular && (
                        <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                          <Sparkles className="size-2.5 fill-amber-500 text-amber-500" />
                          <span>{t("popular")}</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-lg font-black text-slate-900 tracking-tight group-hover:text-red-600 transition-colors">{item.nama}</h3>
                      <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">{item.namaBandara}</p>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 mt-3 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-600">
                      <Clock className="size-3 sm:size-3.5 text-red-600 shrink-0" />
                      <span>{item.estimasi}</span>
                    </div>

                    <a
                      href={whatsappBaseUrl(item.nama, item.kodeBandara)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 group-hover:bg-red-600 border border-slate-200 group-hover:border-red-600 py-2 px-3 text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-white transition-all shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="size-3.5 shrink-0 text-emerald-600 group-hover:text-white transition-colors" />
                      <span>{t("askRoute")}</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {!searchQuery && selectedPulau === "semua" && displayLimit < filteredKotaTotalLength && (
            <div className="text-center pt-8 sm:pt-10">
              <button
                onClick={onLoadMore}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border-2 border-slate-200 hover:border-red-600 rounded-2xl text-slate-800 hover:text-red-600 font-extrabold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <span>{t("loadMore", { remaining: filteredKotaTotalLength - displayLimit })}</span>
                <ChevronDown className="size-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
          <Plane className="size-12 text-slate-300 mx-auto mb-3 -rotate-45" />
          <h3 className="text-base font-bold text-slate-900">{t("empty.title")}</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">{t("empty.description")}</p>
          <button onClick={onResetFilter} className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md hover:bg-red-700 transition-all cursor-pointer">
            {t("empty.reset")}
          </button>
        </div>
      )}
    </section>
  );
}
