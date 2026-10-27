import Image from "next/image";
import { Plane } from "lucide-react";

/**
 * Banner atas halaman. Sengaja tanpa animasi masuk: gambar ini adalah LCP,
 * jadi harus langsung terlihat tanpa menunggu hidrasi JavaScript.
 */
export function CekOngkirHero() {
  return (
    <div className="w-full border-b border-slate-200/80 bg-white px-3 pb-4 pt-2 sm:px-6 sm:pb-8 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-lg sm:rounded-3xl">
        <Image
          src="/images/cek-ongkir/banner-tarif.png"
          alt="Tarif Pengiriman Cargo Udara Bandara Soekarno Hatta - Lion Cargo Logistik"
          width={1400}
          height={650}
          sizes="(min-width: 1152px) 1152px, 100vw"
          priority
          className="h-auto w-full object-contain"
        />

        <div className="absolute bottom-4 left-4 hidden items-center gap-2.5 rounded-2xl border border-white/60 bg-white/95 px-3.5 py-2 shadow-md backdrop-blur-md sm:flex">
          <Plane className="size-4 shrink-0 text-red-600" aria-hidden="true" />
          <div className="text-[11px] leading-tight">
            <span className="block font-extrabold text-slate-900">Layanan Cargo Udara</span>
            <span className="text-[10px] text-slate-600">Terminal Cargo CGK Soekarno-Hatta</span>
          </div>
        </div>
      </div>
    </div>
  );
}
