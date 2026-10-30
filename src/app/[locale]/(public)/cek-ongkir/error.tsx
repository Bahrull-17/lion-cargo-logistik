"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function CekOngkirError({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("pages.cekOngkir.error");

  return (
    <div className="mx-auto flex min-h-96 max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-extrabold text-charcoal">{t("title")}</h1>
      <p className="text-muted-foreground">{t("description")}</p>
      <Button onClick={reset}>{t("retry")}</Button>
    </div>
  );
}
