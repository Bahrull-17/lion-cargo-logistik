"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { CekOngkirCalculator } from "@/features/cek-ongkir/components/cek-ongkir-calculator";
import { buildGeneralInquiryMessage } from "@/features/cek-ongkir/lib/whatsapp-message";
import { waLink } from "@/lib/wa-link";
import { getDestinations } from "@/services/tarif.service";
import type { Destination } from "@/types/tarif";

const BLOCK = "animate-pulse rounded-2xl bg-slate-200/70 sm:rounded-3xl";

// Disimpan di memori browser agar pindah halaman lalu kembali tidak memanggil Supabase lagi.
let cachedDestinations: Destination[] | null = null;

type LoadState = { status: "loading" } | { status: "ready"; destinations: Destination[] } | { status: "unavailable" };

/** Placeholder untuk bagian yang bergantung pada data tarif (kalkulator dan tabel). */
function TariffSkeleton() {
  const t = useTranslations("pages.cekOngkir.skeleton");

  return (
    <div aria-busy="true" aria-label={t("loading")}>
      <div className="mx-auto mb-16 max-w-4xl px-4 sm:mb-20 sm:px-6">
        <div className={`h-112 ${BLOCK}`} />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className={`h-160 ${BLOCK}`} />
      </div>
    </div>
  );
}

function TariffUnavailable() {
  const t = useTranslations("pages.cekOngkir.unavailable");
  const tWhatsapp = useTranslations("pages.cekOngkir.whatsapp");

  return (
    <div className="mx-auto flex min-h-96 max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-extrabold text-charcoal">{t("title")}</h2>
      <p className="text-muted-foreground">{t("description")}</p>
      <a href={waLink(buildGeneralInquiryMessage(tWhatsapp))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-hover">
        <MessageCircle className="size-4" aria-hidden="true" /> {t("button")}
      </a>
    </div>
  );
}

/**
 * Mengambil data tarif di browser (klien Supabase publik, read-only, dilindungi RLS).
 * Dengan begitu halaman cek-ongkir bisa statis dan Worker Cloudflare tidak ikut bekerja.
 * Kegagalan ambil data diperlakukan sebagai "belum tersedia" agar halaman tidak error total.
 */
export function CekOngkirTariffLoader() {
  const [state, setState] = useState<LoadState>(() => (cachedDestinations ? { status: "ready", destinations: cachedDestinations } : { status: "loading" }));

  useEffect(() => {
    if (cachedDestinations) return;

    let cancelled = false;

    getDestinations()
      .then((destinations) => {
        if (cancelled) return;
        if (destinations.length === 0) {
          setState({ status: "unavailable" });
          return;
        }
        cachedDestinations = destinations;
        setState({ status: "ready", destinations });
      })
      .catch((error: unknown) => {
        console.error("[cek-ongkir] Gagal memuat data tarif:", error);
        if (!cancelled) setState({ status: "unavailable" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") return <TariffSkeleton />;
  if (state.status === "unavailable") return <TariffUnavailable />;

  return <CekOngkirCalculator destinations={state.destinations} />;
}
