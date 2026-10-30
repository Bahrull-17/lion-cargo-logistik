import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
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
  const t = useTranslations("pages.cekOngkir.header");
  const locale = useLocale();

  return (
    <header className="relative px-4 pb-6 pt-8 sm:px-6 sm:pt-12">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-red-50/50 via-slate-50/30 to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-red-600 shadow-xs">
          <Sparkles className="size-3.5 fill-red-100 text-red-600" aria-hidden="true" /> {t("badge")}
        </div>

        <h1 className="font-heading text-3xl font-black leading-[1.15] tracking-tight text-slate-900 sm:text-5xl">
          <span className="block">{t("title.line1")}</span>
          <span className="block font-extrabold text-red-600">{t("title.line2")}</span>
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-sm font-normal leading-relaxed text-slate-600 sm:text-base">{t("description")}</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold text-slate-800 sm:gap-4">
          <Highlight icon={<Zap className="size-4 fill-amber-400 text-amber-500" aria-hidden="true" />}>{t("highlights.flight")}</Highlight>
          <Highlight icon={<PackageCheck className="size-4 text-red-600" aria-hidden="true" />}>{t("highlights.minWeight")}</Highlight>
          <Highlight icon={<ShieldCheck className="size-4 text-emerald-600" aria-hidden="true" />}>{t("highlights.handling", { fee: formatRupiah(CARGO_RULES.handlingFee, locale) })}</Highlight>
        </div>
      </div>
    </header>
  );
}
