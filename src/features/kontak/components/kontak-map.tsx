import { MapPin, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

export function KontakMap() {
  const t = useTranslations("pages.contact.map");

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <MapPin className="size-5 text-red-600" />
              {t("title")}
            </h2>
            <p className="text-xs text-slate-500">{t("subtitle")}</p>
          </div>
          <a href={siteConfig.contact.maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-red-600 hover:text-red-700 hover:underline shrink-0">
            <span>{t("open")}</span>
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="w-full h-100 sm:h-125 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative shadow-inner">
          <iframe title={t("iframeTitle")} src={siteConfig.contact.mapsEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full" />
        </div>
      </div>
    </section>
  );
}
