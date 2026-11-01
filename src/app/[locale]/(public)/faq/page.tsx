import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaqContent } from "@/features/faq/components/faq-content";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createFAQSchema } from "@/lib/schema/faq";

type Props = {
  params: Promise<{ locale: string }>;
};

type FaqRaw = { question: string; answer: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata(locale, "faq");
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pages.faq" });
  const items = t.raw("items") as FaqRaw[];

  return (
    <>
      <JsonLd data={createFAQSchema(items, locale === "en" ? "en-US" : "id-ID")} />
      <BreadcrumbJsonLd locale={locale} page="faq" />
      <FaqContent />
    </>
  );
}
