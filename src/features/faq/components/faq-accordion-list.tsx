"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FaqItem {
  id: string;
  pertanyaan: string;
  jawaban: string;
  kategori: "Umum & Prosedur" | "Tarif & Pembayaran" | "Dokumen & Syarat" | "Jenis Barang";
}

const daftarKategori = [
  { key: "semua", label: "Semua Pertanyaan" },
  { key: "Umum & Prosedur", label: "Umum & Prosedur" },
  { key: "Dokumen & Syarat", label: "Dokumen & Syarat" },
  { key: "Jenis Barang", label: "Jenis Barang" },
  { key: "Tarif & Pembayaran", label: "Tarif & Pembayaran" },
];

interface FaqAccordionListProps {
  selectedKategori: string;
  onSelectKategori: (key: string) => void;
  filteredFaq: FaqItem[];
  searchQuery: string;
  openIndex: string | null;
  onToggleAccordion: (id: string) => void;
  onResetFilter: () => void;
}

export function FaqAccordionList({ selectedKategori, onSelectKategori, filteredFaq, searchQuery, openIndex, onToggleAccordion, onResetFilter }: FaqAccordionListProps) {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* KATEGORI FILTER */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {daftarKategori.map((kat) => {
          const isActive = selectedKategori === kat.key;
          return (
            <button
              key={kat.key}
              onClick={() => onSelectKategori(kat.key)}
              className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                isActive ? "bg-red-600 text-white shadow-md shadow-red-600/25 scale-[1.02]" : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {kat.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mb-4 text-xs font-mono font-bold text-slate-500">
        <span>MENAMPILKAN {filteredFaq.length} PERTANYAAN</span>
        {searchQuery && <span className="text-red-600">Pencarian: &quot;{searchQuery}&quot;</span>}
      </div>

      {/* ACCORDION LIST */}
      {filteredFaq.length > 0 ? (
        <div className="space-y-3.5">
          {filteredFaq.map((item) => {
            const isOpen = openIndex === item.id;
            return (
              <div key={item.id} className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen ? "border-red-500 shadow-md ring-1 ring-red-500/20" : "border-slate-200/80 hover:border-slate-300 shadow-xs"}`}>
                <button onClick={() => onToggleAccordion(item.id)} className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden">
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-100">{item.kategori}</span>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">{item.pertanyaan}</h3>
                  </div>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? "bg-red-600 text-white rotate-180" : "bg-slate-100 text-slate-600"}`}>
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{item.jawaban}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
          <HelpCircle className="size-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">Pertanyaan Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Maaf, kata kunci yang Anda cari tidak tersedia di daftar bantuan kami. Silakan tanyakan langsung melalui WhatsApp.</p>
          <button onClick={onResetFilter} className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md hover:bg-red-700 transition-all cursor-pointer">
            Reset Pencarian
          </button>
        </div>
      )}
    </section>
  );
}
