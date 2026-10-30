"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { navigation } from "@/config/navigation";
import { Sheet, SheetContent, SheetClose, SheetTrigger } from "@/components/ui/sheet";

import { Logo } from "@/components/shared/logo";
import { waLink } from "@/lib/wa-link";

export function MobileMenu() {
  const pathname = usePathname();

  const t = useTranslations("navigation");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button aria-label="Buka Menu Navigasi" className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 transition-all">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="
          w-full
          bg-white
          p-0
          rounded-b-3xl
          border-b
          border-slate-200
          shadow-xl
          max-h-[90vh]
          overflow-y-auto
          [&>button]:text-brand
          [&>button]:hover:opacity-70
          [&>button]:top-4
          [&>button]:right-4
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 pr-12">
          <Logo />
        </div>

        {/* MENU */}
        <div className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.href;

            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex
                    items-center
                    gap-3
                    px-3.5
                    py-2.5
                    rounded-xl
                    text-sm
                    font-bold
                    transition-all
                    ${isActive ? "bg-brand/10 text-brand border-l-4 border-brand" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"}
                  `}
                >
                  <Icon
                    className={`
                      w-4
                      h-4
                      ${isActive ? "text-brand" : "text-slate-500"}
                    `}
                  />

                  <span>{t(item.key)}</span>
                </Link>
              </SheetClose>
            );
          })}
        </div>

        {/* WHATSAPP */}
        <div
          className="
            p-4
            pt-2
            border-t
            border-slate-100
            bg-slate-50/50
            rounded-b-3xl
          "
        >
          <a
            href={waLink("Halo Lion Cargo Logistik, saya ingin bertanya seputar pengiriman kargo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              justify-center
              gap-2.5
              w-full
              bg-brand
              text-white
              font-bold
              py-3
              px-4
              rounded-xl
              text-sm
              shadow-sm
              hover:bg-brand/90
              transition-all
              active:scale-[0.98]
            "
          >
            <MessageCircle className="w-4 h-4" />

            <span>{t("contact")}</span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
