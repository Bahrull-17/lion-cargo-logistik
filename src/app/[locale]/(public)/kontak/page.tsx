import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { KontakContent } from "@/features/kontak/components/kontak-content";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata(locale, "kontak");
}

export default async function KontakPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbJsonLd locale={locale} page="contact" />
      <KontakContent />
    </>
  );
}
