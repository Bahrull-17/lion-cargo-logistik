import { Phone, Mail, MapPin, Clock, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/wa-link";

export function KontakInfoCard() {
  const t = useTranslations("pages.contact.info");
  const { contact } = siteConfig;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <Building2 className="size-5 text-red-600" />
          {t("title")}
        </h2>
        <p className="text-xs text-slate-500 mt-1">{t("subtitle")}</p>
      </div>

      <div className="space-y-5 text-xs sm:text-sm">
        {/* ALAMAT */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-red-50 text-red-600 shrink-0 mt-0.5">
            <MapPin className="size-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900">{t("address.label")}</h3>
            <p className="text-slate-600 mt-0.5 leading-relaxed">{t("address.value")}</p>
          </div>
        </div>

        {/* TELEPON & WHATSAPP */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-red-50 text-red-600 shrink-0 mt-0.5">
            <Phone className="size-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900">{t("phone.label")}</h3>
            <p className="text-slate-600 mt-0.5">
              <a href={waLink(t("phone.message"))} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 font-semibold underline">
                {contact.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        {/* EMAIL */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-red-50 text-red-600 shrink-0 mt-0.5">
            <Mail className="size-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900">{t("email.label")}</h3>
            <p className="text-slate-600 mt-0.5 font-mono">
              <a href={`mailto:${contact.email}`} className="hover:text-red-600">
                {contact.email}
              </a>
            </p>
          </div>
        </div>

        {/* JAM OPERASIONAL */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-red-50 text-red-600 shrink-0 mt-0.5">
            <Clock className="size-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900">{t("hours.label")}</h3>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              {t("hours.days")} <strong className="text-slate-900">{t("hours.strong")}</strong> <br />
              {t("hours.note")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
