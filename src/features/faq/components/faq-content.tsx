"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { waLink } from "@/lib/wa-link";
import { FaqHero } from "./faq-hero";
import { FaqAccordionList, FaqItem, FaqKategori } from "./faq-accordion-list";
import { CtaSection } from "@/components/shared/cta-section";

type FaqRaw = {
  id: string;
  category: FaqKategori;
  question: string;
  answer: string;
};

export function FaqContent() {
  const t = useTranslations("pages.faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("semua");
  const [openIndex, setOpenIndex] = useState<string | null>("1"); // Buka pertanyaan pertama secara default

  // Data FAQ dibaca dari JSON sesuai bahasa aktif
  const dataFaq = useMemo<FaqItem[]>(() => {
    const raw = t.raw("items") as FaqRaw[];
    return raw.map((item) => ({
      id: item.id,
      kategori: item.category,
      pertanyaan: item.question,
      jawaban: item.answer,
    }));
  }, [t]);

  // Auto Scroll ke Atas saat kategori filter diganti
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedKategori]);

  const filteredFaq = useMemo(() => {
    return dataFaq.filter((item) => {
      const matchSearch = item.pertanyaan.toLowerCase().includes(searchQuery.toLowerCase()) || item.jawaban.toLowerCase().includes(searchQuery.toLowerCase());
      const matchKategori = selectedKategori === "semua" || item.kategori === selectedKategori;
      return matchSearch && matchKategori;
    });
  }, [dataFaq, searchQuery, selectedKategori]);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const handleResetFilter = () => {
    setSearchQuery("");
    setSelectedKategori("semua");
  };

  const whatsappUrl = waLink(t("content.whatsappMessage"));

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-12 sm:pb-16 overflow-hidden relative">
      {/* 1. HERO & SEARCH SECTION */}
      <FaqHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* 2. FILTER & ACCORDION LIST */}
      <FaqAccordionList
        selectedKategori={selectedKategori}
        onSelectKategori={setSelectedKategori}
        filteredFaq={filteredFaq}
        searchQuery={searchQuery}
        openIndex={openIndex}
        onToggleAccordion={toggleAccordion}
        onResetFilter={handleResetFilter}
      />

      {/* 3. CALL TO ACTION SECTION (SHARED COMPONENT) */}
      <div className="mt-8 border-t border-slate-100">
        <CtaSection whatsappUrl={whatsappUrl} />
      </div>
    </div>
  );
}
