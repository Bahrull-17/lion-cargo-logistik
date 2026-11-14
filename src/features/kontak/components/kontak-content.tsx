import { useTranslations } from "next-intl";
import { waLink } from "@/lib/wa-link";
import { KontakHero } from "./kontak-hero";
import { KontakInfoCard } from "./kontak-info-card";
import { KontakForm } from "./kontak-form";
import { KontakMap } from "./kontak-map";
import { CtaSection } from "@/components/shared/cta-section";

export function KontakContent() {
  const t = useTranslations("pages.contact");

  const whatsappUrl = waLink(t("cta.whatsappMessage"));

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-12 sm:pb-16 overflow-hidden relative">
      <KontakHero />

      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <KontakInfoCard />
          </div>

          <div className="lg:col-span-7">
            <KontakForm />
          </div>
        </div>
      </section>

      <KontakMap />

      <div className="mt-8 border-t border-slate-100">
        <CtaSection whatsappUrl={whatsappUrl} />
      </div>
    </div>
  );
}
