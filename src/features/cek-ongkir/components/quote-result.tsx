"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, Plane, Send, ShieldCheck } from "lucide-react";
import { CARGO_RULES } from "@/features/cek-ongkir/constants";
import type { Quote } from "@/features/cek-ongkir/lib/calculate-quote";
import { formatRupiah } from "@/features/cek-ongkir/lib/format-rupiah";
import { buildBookingMessage, buildPricingInquiryMessage } from "@/features/cek-ongkir/lib/whatsapp-message";
import { waLink } from "@/lib/wa-link";

function RouteVisual({ destinationCode, destinationName }: { destinationCode: string; destinationName: string }) {
  return (
    <div className="my-4 rounded-xl border border-red-100 bg-white p-3.5 shadow-xs sm:rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <span className="block font-heading text-lg font-black text-slate-900 sm:text-xl">CGK</span>
          <span className="font-mono text-[10px] text-slate-500">Soekarno-Hatta</span>
        </div>

        <div className="flex-1 px-3 text-center">
          <div className="relative flex w-full items-center justify-center">
            <div className="h-0.5 w-full bg-red-200" />
            <div className="absolute rounded-full bg-red-600 p-1 text-white shadow-md sm:p-1.5">
              <Plane className="size-3 rotate-90 sm:size-3.5" aria-hidden="true" />
            </div>
          </div>
          <span className="mt-1 block font-mono text-[9px] font-bold tracking-wider text-red-600">DIRECT FLIGHT</span>
        </div>

        <div className="text-right">
          <span className="block font-heading text-lg font-black text-red-600 sm:text-xl">{destinationCode}</span>
          <span className="font-mono text-[10px] text-slate-500">{destinationName}</span>
        </div>
      </div>
    </div>
  );
}

function BreakdownRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="font-bold text-slate-900">{value}</span>
    </div>
  );
}

function PricedBreakdown({ quote }: { quote: Quote }) {
  const weightWasAdjusted = quote.chargeableWeightKg !== quote.inputWeightKg;

  return (
    <>
      <div className="space-y-2.5 border-b border-red-100 py-3 font-mono text-xs text-slate-700">
        <BreakdownRow label="Tarif per Kg" value={`Rp ${formatRupiah(quote.pricePerKg)}`} />
        {weightWasAdjusted && <BreakdownRow label="Berat Barang" value={`${quote.inputWeightKg} Kg`} />}
        <BreakdownRow label="Berat Tagihan (Chargeable Weight)" value={`${quote.chargeableWeightKg} Kg`} />
        <BreakdownRow label="Subtotal Tarif Barang" value={`Rp ${formatRupiah(quote.subtotal)}`} />

        <div className="flex items-center justify-between rounded-xl border border-red-200 bg-white p-2.5 font-sans text-red-900">
          <span className="flex items-center gap-1.5 text-xs font-bold">
            <ShieldCheck className="size-4 shrink-0 text-red-600" aria-hidden="true" /> Biaya Penanganan Admin
          </span>
          <span className="font-mono text-xs font-bold text-slate-900">Rp {formatRupiah(quote.handlingFee)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pb-2 pt-4">
        <div>
          <span className="block font-mono text-[10px] font-bold uppercase text-slate-500">Total estimasi all-in</span>
          <span className="block text-[11px] text-slate-500">Termasuk penanganan admin CGK</span>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-1.5 font-heading text-lg font-black tracking-tight text-red-600 sm:text-2xl lg:text-3xl">
          <span className="text-xs font-bold sm:text-base">Rp</span>
          <span>{formatRupiah(quote.total)}</span>
        </div>
      </div>
    </>
  );
}

function UnpricedNotice() {
  return <p className="border-b border-red-100 py-4 text-sm font-semibold text-amber-700">Tarif untuk tujuan ini belum tersedia di kalkulator. Hubungi tim kami via WhatsApp untuk mendapatkan harga terbaru.</p>;
}

function WhatsAppButton({ quote }: { quote: Quote }) {
  const message = quote.isPriced ? buildBookingMessage(quote) : buildPricingInquiryMessage(quote);
  const Icon = quote.isPriced ? Send : MessageCircle;

  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 sm:rounded-2xl sm:text-sm"
    >
      <Icon className="size-4" aria-hidden="true" />
      <span>{quote.isPriced ? "Pesan Cargo via WhatsApp" : "Tanya Tarif via WhatsApp"}</span>
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </a>
  );
}

/** Hasil perhitungan. Wrapper aria-live selalu ada agar pembaca layar mengumumkan hasil yang muncul. */
export function QuoteResult({ quote }: { quote: Quote | null }) {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-live="polite">
      <AnimatePresence>
        {quote && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border-2 border-red-200 bg-linear-to-br from-red-50/60 via-white to-amber-50/40 p-5 text-slate-900 shadow-lg sm:rounded-3xl sm:p-7">
              <div className="flex flex-col justify-between gap-2 border-b border-red-100 pb-4 sm:flex-row sm:items-center">
                <div>
                  <span className="rounded-full border border-red-200 bg-red-100 px-2.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-widest text-red-700">Estimasi tarif cargo reguler</span>
                  <h3 className="mt-1.5 font-heading text-xl font-black text-slate-900 sm:text-2xl">{quote.destination.name}</h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="block font-mono text-[10px] text-slate-500">ESTIMASI TIBA</span>
                  <span className="mt-0.5 inline-block rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">{CARGO_RULES.estimatedTransit}</span>
                </div>
              </div>

              <RouteVisual destinationCode={quote.destination.code || "—"} destinationName={quote.destination.name} />

              {quote.isPriced ? <PricedBreakdown quote={quote} /> : <UnpricedNotice />}
              <WhatsAppButton quote={quote} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
