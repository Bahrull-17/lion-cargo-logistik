import { Link } from "@/i18n/navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { AirportIllustration } from "@/components/illustrations/airport-illustration";

import { siteConfig } from "@/config/site";
import { navigation } from "@/config/navigation";

import { getTranslations } from "next-intl/server";

export async function Footer() {
  const { contact } = siteConfig;

  const t = await getTranslations("footer");
  const nav = await getTranslations("navigation");

  return (
    <footer className="relative overflow-hidden bg-[#DC143C] text-white border-t border-red-700">
      <div
        className="
        pointer-events-none
        absolute
        -top-24
        right-1/4
        size-72
        rounded-full
        bg-white/10
        blur-3xl
        "
      />

      <div
        className="
        relative
        z-10
        mx-auto
        grid
        max-w-7xl
        grid-cols-1
        gap-5
        px-4
        pt-6
        pb-4
        sm:px-6
        md:grid-cols-3
        md:gap-10
        lg:px-8
        "
      >
        {/* BRAND */}
        <div className="space-y-4">
          <div className="inline-block origin-left scale-[1.8]">
            <Logo light />
          </div>

          <p className="max-w-sm pt-1 text-xs leading-relaxed text-white/90">{t("description")}</p>
        </div>

        {/* NAVIGATION */}
        <nav aria-label="Footer Navigation">
          <h2
            className="
            mb-2
            border-l-2
            border-white
            pl-3
            text-sm
            font-bold
            uppercase
            tracking-wide
            "
          >
            {t("navigation")}
          </h2>

          <ul className="space-y-2.5">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="
                    group
                    flex
                    items-center
                    gap-3
                    text-sm
                    font-medium
                    text-white/90
                    transition-colors
                    hover:text-white
                    "
                  >
                    <Icon
                      className="
                      size-4
                      shrink-0
                      transition-transform
                      group-hover:scale-110
                      "
                    />

                    <span>{nav(item.key)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CONTACT */}
        <div>
          <h2
            className="
            mb-2
            border-l-2
            border-white
            pl-3
            text-sm
            font-bold
            uppercase
            tracking-wide
            "
          >
            {t("contact")}
          </h2>

          <ul className="space-y-1 text-sm text-white/90">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 size-4 shrink-0" />

              <a href={contact.maps} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-white">
                {t("address")}
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0" />

              <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="font-semibold hover:text-white">
                {contact.phone}
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0" />

              <a
                href={`mailto:${contact.email}`}
                className="
                break-all
                font-semibold
                hover:text-white
                "
              >
                {contact.email}
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Clock className="size-4 shrink-0" />

              <span className="font-semibold">{contact.openingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* AIRPORT ILLUSTRATION */}
      <div
        aria-hidden="true"
        className="
        relative
        z-10
        mt-2
        overflow-hidden
        px-2
        sm:px-4
        "
      >
        <AirportIllustration />
      </div>

      {/* COPYRIGHT */}
      <div
        className="
        relative
        z-10
        border-t
        border-white/10
        bg-[#DC143C]
        py-4
        text-center
        text-xs
        font-semibold
        tracking-wide
        text-white/90
        "
      >
        © 2026 {t("company")}. {t("copyright")}
      </div>
    </footer>
  );
}
