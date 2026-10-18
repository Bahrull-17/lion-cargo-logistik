"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const languages = [
  { code: "id", short: "ID", label: "Bahasa Indonesia" },
  { code: "en", short: "EN", label: "English" },
] as const;

export function LanguageSwitcher() {
  const [lang, setLang] = useState<string>("id");
  const current = languages.find((l) => l.code === lang) ?? languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-11 gap-1.5 px-3 text-charcoal" aria-label={`Pilih bahasa, saat ini ${current.label}`}>
          <Globe className="size-5" aria-hidden="true" />
          <span className="text-sm font-semibold">{current.short}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={lang} onValueChange={setLang}>
          {languages.map((l) => (
            <DropdownMenuRadioItem key={l.code} value={l.code}>
              {l.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
