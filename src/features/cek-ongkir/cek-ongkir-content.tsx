import { MessageCircle } from "lucide-react";
import { CekOngkirSection } from "@/components/sections/cek-ongkir";
import { getDestinations } from "@/services/tarif.service";
import { waLink } from "@/utils/wa-link";

/** Server Component: mengambil data tarif lalu meneruskannya ke kalkulator (client). */
export async function CekOngkirContent() {
  const destinations = await getDestinations();

  if (destinations.length === 0) {
    return (
      <div className="mx-auto flex min-h-96 max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-extrabold text-charcoal">Tarif sedang diperbarui</h1>
        <p className="text-muted-foreground">Data tarif belum tersedia saat ini. Hubungi tim kami untuk mendapatkan tarif terbaru.</p>
        <a
          href={waLink("Halo Lion Cargo Logistik, saya ingin menanyakan tarif cargo udara.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-hover"
        >
          <MessageCircle className="size-4" aria-hidden="true" /> Tanya via WhatsApp
        </a>
      </div>
    );
  }

  return <CekOngkirSection destinations={destinations} />;
}
