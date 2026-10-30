"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CalculatorForm } from "@/features/cek-ongkir/components/calculator-form";
import { DestinationTable } from "@/features/cek-ongkir/components/destination-table";
import { QuoteResult } from "@/features/cek-ongkir/components/quote-result";
import { CARGO_RULES } from "@/features/cek-ongkir/constants";
import { calculateQuote, parseWeight, type Quote, type WeightError } from "@/features/cek-ongkir/lib/calculate-quote";
import type { Destination } from "@/types/tarif";

interface CekOngkirCalculatorProps {
  destinations: Destination[];
}

/** Pemilik state kalkulator: kota terpilih, berat (string), dan hasil hitungan. */
export function CekOngkirCalculator({ destinations }: CekOngkirCalculatorProps) {
  const t = useTranslations("pages.cekOngkir");
  const reduceMotion = useReducedMotion();
  const calculatorRef = useRef<HTMLElement>(null);

  const [selectedSlug, setSelectedSlug] = useState(destinations[0]?.slug ?? "");
  // String agar kolom bisa dikosongkan & diketik ulang (terutama di HP).
  const [weightInput, setWeightInput] = useState(String(CARGO_RULES.minimumWeightKg));
  // Disimpan sebagai kode error, diterjemahkan saat render sehingga ikut berganti bahasa.
  const [weightError, setWeightError] = useState<WeightError | null>(null);
  // Hasil disimpan sebagai snapshot saat submit, sehingga tidak bisa "basi" atau berubah diam-diam.
  const [quote, setQuote] = useState<Quote | null>(null);

  const selectedDestination = destinations.find((item) => item.slug === selectedSlug) ?? destinations[0];
  if (!selectedDestination) return null;

  const weightErrorMessage = weightError ? t(`form.errors.${weightError.code}`, { min: weightError.minWeightKg }) : null;

  const handleDestinationChange = (slug: string) => {
    setSelectedSlug(slug);
    setWeightError(null);
    setQuote(null);
  };

  const handleWeightChange = (value: string) => {
    setWeightInput(value);
    setWeightError(null);
    setQuote(null);
  };

  const handleSubmit = () => {
    const parsed = parseWeight(weightInput, CARGO_RULES.minimumWeightKg);
    if (!parsed.ok) {
      setWeightError(parsed.error);
      setQuote(null);
      return;
    }
    setWeightError(null);
    setQuote(calculateQuote(selectedDestination, parsed.weightKg));
  };

  const handlePickFromTable = (slug: string) => {
    handleDestinationChange(slug);
    calculatorRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      <section ref={calculatorRef} aria-label={t("calculator.ariaLabel")} className="relative z-10 mx-auto mb-16 max-w-4xl scroll-mt-4 px-4 sm:mb-20 sm:px-6">
        <div className="rounded-2xl border-x border-b border-t-4 border-slate-200 border-t-red-600 bg-white p-5 shadow-xl sm:rounded-3xl sm:p-8">
          <CalculatorForm
            destinations={destinations}
            selectedSlug={selectedDestination.slug}
            minWeightKg={CARGO_RULES.minimumWeightKg}
            weightInput={weightInput}
            weightError={weightErrorMessage}
            onDestinationChange={handleDestinationChange}
            onWeightChange={handleWeightChange}
            onSubmit={handleSubmit}
          />
          <QuoteResult quote={quote} />
        </div>
      </section>

      <DestinationTable destinations={destinations} onSelect={handlePickFromTable} />
    </>
  );
}
