import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TentangKamiContent } from "@/features/tentang-kami/components/tentang-kami-content";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata(locale, "tentangKami");
}

export default async function TentangKamiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbJsonLd locale={locale} page="about" />
      <TentangKamiContent />
    </>
  );
}
