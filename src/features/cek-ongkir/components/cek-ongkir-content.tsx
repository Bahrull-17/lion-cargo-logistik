import { MessageCircle } from "lucide-react";
import { CekOngkirCalculator } from "@/features/cek-ongkir/components/cek-ongkir-calculator";
import { CekOngkirHeader } from "@/features/cek-ongkir/components/cek-ongkir-header";
import { CekOngkirHero } from "@/features/cek-ongkir/components/cek-ongkir-hero";
import { buildGeneralInquiryMessage } from "@/features/cek-ongkir/lib/whatsapp-message";
import { waLink } from "@/lib/wa-link";
import { getDestinations } from "@/services/tarif.service";
import type { Destination } from "@/types/tarif";

/** Kegagalan ambil data diperlakukan sebagai "belum tersedia" agar halaman tidak error total. */
async function loadDestinations(): Promise<Destination[]> {
  try {
    return await getDestinations();
  } catch (error) {
    console.error("[cek-ongkir] Gagal memuat data tarif:", error);
    return [];
  }
}

function TariffUnavailable() {
  return (
    <div className="mx-auto flex min-h-96 max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-extrabold text-charcoal">Tarif sedang diperbarui</h1>
      <p className="text-muted-foreground">Data tarif belum tersedia saat ini. Hubungi tim kami untuk mendapatkan tarif terbaru.</p>
      <a
        href={waLink(buildGeneralInquiryMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-hover"
      >
        <MessageCircle className="size-4" aria-hidden="true" /> Tanya via WhatsApp
      </a>
    </div>
  );
}

/** Server Component: mengambil data tarif lalu menyusun halaman. Hanya kalkulator yang client. */
export async function CekOngkirContent() {
  const destinations = await loadDestinations();

  if (destinations.length === 0) return <TariffUnavailable />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 pb-20 text-slate-800 sm:pb-28">
      <CekOngkirHero />
      <CekOngkirHeader />
      <CekOngkirCalculator destinations={destinations} />
    </div>
  );
}
