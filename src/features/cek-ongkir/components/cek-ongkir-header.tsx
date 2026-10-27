import type { ReactNode } from "react";
import { PackageCheck, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { CARGO_RULES } from "@/features/cek-ongkir/constants";
import { formatRupiah } from "@/features/cek-ongkir/lib/format-rupiah";

function Highlight({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-slate-200/90 bg-white px-3.5 py-2 shadow-xs">
      {icon}
      <span>{children}</span>
    </div>
  );
}

export function CekOngkirHeader() {
  return (
    <header className="relative px-4 pb-6 pt-8 sm:px-6 sm:pt-12">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-red-50/50 via-slate-50/30 to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-red-600 shadow-xs">
          <Sparkles className="size-3.5 fill-red-100 text-red-600" aria-hidden="true" /> Direct Flight Hub Soekarno-Hatta (CGK)
        </div>

        <h1 className="font-heading text-3xl font-black leading-[1.15] tracking-tight text-slate-900 sm:text-5xl">
          <span className="block">Cek Ongkir Cargo Udara</span>
          <span className="block font-extrabold text-red-600">Pengiriman Cepat Port to Port</span>
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-sm font-normal leading-relaxed text-slate-600 sm:text-base">
          Hitung estimasi ongkos kirim kargo udara secara akurat dan transparan bersama Lion Cargo. Dapatkan simulasi biaya pengiriman general cargo cepat via pesawat udara langsung dari Terminal Cargo Bandara
          Soekarno-Hatta (CGK) ke seluruh kota dan bandara destinasi di Indonesia, lengkap dengan rincian biaya penanganan admin bandara secara terperinci.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold text-slate-800 sm:gap-4">
          <Highlight icon={<Zap className="size-4 fill-amber-400 text-amber-500" aria-hidden="true" />}>Prioritas Flight Langsung</Highlight>
          <Highlight icon={<PackageCheck className="size-4 text-red-600" aria-hidden="true" />}>Berat Minimum Sesuai Tujuan</Highlight>
          <Highlight icon={<ShieldCheck className="size-4 text-emerald-600" aria-hidden="true" />}>Penanganan Admin Rp {formatRupiah(CARGO_RULES.handlingFee)}</Highlight>
        </div>
      </div>
    </header>
  );
}
