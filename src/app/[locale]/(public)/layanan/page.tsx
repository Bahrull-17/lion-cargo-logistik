import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LayananContent } from "@/features/layanan/components/layanan-content";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata, absoluteUrl, localizedPath } from "@/lib/seo/metadata";
import { createServiceSchema } from "@/lib/schema/service";

type Props = {
  params: Promise<{ locale: string }>;
};

const SERVICE_KEYS = ["reguler", "express", "sameday"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata(locale, "layanan");
}

export default async function LayananPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pages.services" });

  const services = SERVICE_KEYS.map((key) => ({
    name: t(`serviceList.items.${key}.name`),
    description: t(`serviceList.items.${key}.tagline`),
  }));

  return (
    <>
      <JsonLd
        data={createServiceSchema({
          url: absoluteUrl(localizedPath(locale, "/layanan")),
          name: t("meta.title"),
          description: t("meta.description"),
          catalogName: t("meta.title"),
          language: locale === "en" ? "en-US" : "id-ID",
          services,
        })}
      />
      <BreadcrumbJsonLd locale={locale} page="services" />
      <LayananContent />
    </>
  );
}
