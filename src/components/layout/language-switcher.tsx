"use client";

import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useLocale } from "next-intl";
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

export function LanguageSwitcher() {
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  const current = languages.find((language) => language.code === locale) ?? languages[0];

  function changeLanguage(nextLocale: "id" | "en") {
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
