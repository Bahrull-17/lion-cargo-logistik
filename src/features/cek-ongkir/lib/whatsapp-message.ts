import { COMPANY_NAME } from "@/features/cek-ongkir/constants";
import { formatDestinationLabel } from "@/features/cek-ongkir/lib/destination";
import { formatRupiah } from "@/features/cek-ongkir/lib/format-rupiah";
import type { Quote } from "@/features/cek-ongkir/lib/calculate-quote";

/** Fungsi terjemahan yang sudah di-scope ke "pages.cekOngkir.whatsapp". */
export type Translator = (key: string, values?: Record<string, string | number>) => string;

export function buildGeneralInquiryMessage(t: Translator): string {
  return t("general", { company: COMPANY_NAME });
}

/** Dipakai saat tarif tujuan belum tersedia di data. */
export function buildPricingInquiryMessage(quote: Quote, t: Translator): string {
  return [t("pricing.intro", { company: COMPANY_NAME }), t("pricing.route", { destination: formatDestinationLabel(quote.destination) }), t("pricing.weight", { weight: quote.chargeableWeightKg })].join("\n");
}

export function buildBookingMessage(quote: Quote, t: Translator, locale: string): string {
  return [
    t("booking.intro", { company: COMPANY_NAME }),
    t("booking.route", { destination: formatDestinationLabel(quote.destination) }),
    t("booking.weight", { weight: quote.chargeableWeightKg }),
    t("booking.subtotal", { amount: formatRupiah(quote.subtotal, locale) }),
    t("booking.handling", { amount: formatRupiah(quote.handlingFee, locale) }),
    t("booking.total", { amount: formatRupiah(quote.total, locale) }),
    t("booking.closing"),
  ].join("\n");
}
