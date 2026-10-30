import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LayananContent } from "@/features/layanan/components/layanan-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/layanan`,
      languages: {
        id: "/id/layanan",
        en: "/en/layanan",
        "x-default": "/id/layanan",
      },
    },
  };
}

export default async function LayananPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LayananContent />;
}
