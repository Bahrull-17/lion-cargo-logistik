"use client";

import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useLocale } from "next-intl";
import { resolveArticleAlternatePath } from "@/features/artikel/actions/alternate-path";
import { usePathname, useRouter } from "@/i18n/navigation";

const languages = [
  {
    code: "id",
    short: "ID",
    label: "Bahasa Indonesia",
  },
  {
    code: "en",
    short: "EN",
    label: "English",
  },
] as const;

// Halaman detail artikel: /artikel/<slug> (pathname dari next-intl sudah tanpa prefix bahasa)
const ARTICLE_DETAIL_PATH = /^\/artikel\/([a-z0-9-]+)$/;

export function LanguageSwitcher() {
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  const current = languages.find((language) => language.code === locale) ?? languages[0];

  async function changeLanguage(nextLocale: "id" | "en") {
    const articleSlug = pathname.match(ARTICLE_DETAIL_PATH)?.[1];

    // Artikel punya slug berbeda per bahasa, jadi cari halaman pasangannya.
    if (articleSlug) {
      try {
        const target = await resolveArticleAlternatePath(locale, articleSlug, nextLocale);
        router.replace(target, { locale: nextLocale });
      } catch {
        router.replace("/artikel", { locale: nextLocale });
      }
      return;
    }

    router.replace(pathname, {
      locale: nextLocale,
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-11 gap-1.5 px-3 text-charcoal" aria-label={`Pilih bahasa, saat ini ${current.label}`}>
          <Globe className="size-5" aria-hidden="true" />

          <span className="text-sm font-semibold">{current.short}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={locale} onValueChange={(value) => changeLanguage(value as "id" | "en")}>
          {languages.map((language) => (
            <DropdownMenuRadioItem key={language.code} value={language.code}>
              {language.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
