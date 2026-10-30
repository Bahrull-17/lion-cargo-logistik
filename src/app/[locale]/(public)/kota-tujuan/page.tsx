import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { KotaTujuanContent } from "@/features/kota-tujuan/components/kota-tujuan-content";
import { getAllDestinations } from "@/services/tarif.service";
import type { Destination } from "@/types/tarif";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.destination.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/kota-tujuan`,
      languages: {
        id: "/id/kota-tujuan",
        en: "/en/kota-tujuan",
        "x-default": "/id/kota-tujuan",
      },
    },
  };
}

async function KotaTujuanData() {
  let tarifData: Destination[] = [];
  try {
    tarifData = await getAllDestinations();
  } catch (err) {
    console.warn("Gagal mengambil data tujuan dari Supabase:", err);
  }

  return <KotaTujuanContent initialTarifData={tarifData} />;
}

export default async function KotaTujuanPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<KotaTujuanContent initialTarifData={[]} />}>
      <KotaTujuanData />
    </Suspense>
  );
}
