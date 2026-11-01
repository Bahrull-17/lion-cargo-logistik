import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function KontakHero() {
  const t = useTranslations("pages.contact.hero");

  return (
    <section className="w-full bg-white border-b border-slate-200/60 pt-6 pb-10 sm:pb-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4 sm:mb-6">
          <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1 text-slate-600">
            {t("home")}
          </Link>
          <ChevronRight className="size-3.5 text-slate-400" />
          <span className="text-red-600 font-bold">{t("current")}</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {t("titleLine1")} <br className="hidden sm:inline" />
            <span className="inline-block mt-1 px-4 py-1 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-600/20 transform -rotate-1">{t("titleHighlight")}</span>
          </h1>

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto pt-1">
            {t("description.before")}
            <strong className="text-slate-900">{t("description.strong")}</strong>
            {t("description.after")}
          </p>
        </div>
      </div>
    </section>
  );
}
