import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CekOngkirContent } from "@/features/cek-ongkir/components/cek-ongkir-content";
import { CekOngkirSkeleton } from "@/features/cek-ongkir/components/cek-ongkir-skeleton";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.cekOngkir.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/cek-ongkir`,
      languages: {
        id: "/id/cek-ongkir",
        en: "/en/cek-ongkir",
        "x-default": "/id/cek-ongkir",
      },
    },
  };
}

export default async function CekOngkirPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<CekOngkirSkeleton />}>
      <CekOngkirContent />
    </Suspense>
  );
}
