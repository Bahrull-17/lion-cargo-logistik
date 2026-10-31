import { setRequestLocale } from "next-intl/server";
import { KontakContent } from "@/features/kontak/components/kontak-content";

export const metadata = {
  title: "Hubungi Kami & Lokasi Kantor - Lion Cargo Logistik",
  description: "Hubungi tim customer service & operasional Lion Cargo Logistik di Terminal Kargo Bandara Soekarno-Hatta (CGK). Konsultasi pengiriman, cek rute, dan layanan kargo udara.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function KontakPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <KontakContent />;
}
