import { COMPANY_NAME } from "@/features/cek-ongkir/constants";
import { formatDestinationLabel } from "@/features/cek-ongkir/lib/destination";
import { formatRupiah } from "@/features/cek-ongkir/lib/format-rupiah";
import type { Quote } from "@/features/cek-ongkir/lib/calculate-quote";

export function buildGeneralInquiryMessage(): string {
  return `Halo ${COMPANY_NAME}, saya ingin menanyakan tarif cargo udara.`;
}

/** Dipakai saat tarif tujuan belum tersedia di data. */
export function buildPricingInquiryMessage(quote: Quote): string {
  return [
    `Halo ${COMPANY_NAME}, saya ingin menanyakan tarif Cargo Reguler Udara:`,
    `- Rute: Jakarta (CGK) ke ${formatDestinationLabel(quote.destination)}`,
    `- Berat Tagihan: ${quote.chargeableWeightKg} Kg`,
  ].join("\n");
}

export function buildBookingMessage(quote: Quote): string {
  return [
    `Halo ${COMPANY_NAME}, saya berminat memesan Cargo Reguler Udara:`,
    `- Rute: Jakarta (CGK) ke ${formatDestinationLabel(quote.destination)}`,
    `- Berat Tagihan: ${quote.chargeableWeightKg} Kg`,
    `- Subtotal Tarif: Rp ${formatRupiah(quote.subtotal)}`,
    `- Biaya Penanganan Admin Bandara: Rp ${formatRupiah(quote.handlingFee)}`,
    `- Total Estimasi All-In: Rp ${formatRupiah(quote.total)}`,
    "Mohon info ketersediaan slot penerbangan.",
  ].join("\n");
}
