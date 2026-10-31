import { setRequestLocale } from "next-intl/server";
import { TentangKamiContent } from "@/features/tentang-kami/components/tentang-kami-content";

export const metadata = {
  title: "Tentang Kami - Lion Cargo Logistik",
  description: "Profil resmi Lion Cargo Logistik, agen pengiriman kargo udara terpercaya langsung dari Terminal Cargo Bandara Soekarno-Hatta (CGK) ke seluruh Indonesia.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TentangKamiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TentangKamiContent />;
}
