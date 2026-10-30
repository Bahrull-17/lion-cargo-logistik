"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { Logo } from "@/components/shared/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileMenu } from "@/components/layout/mobile-menu";

import { navigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("navigation");

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="flex items-center gap-1 lg:gap-2">
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu utama">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={cn("rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-brand", pathname === item.href ? "text-brand" : "text-charcoal")}>
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <LanguageSwitcher />

          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
