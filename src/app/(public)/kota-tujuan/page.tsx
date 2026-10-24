import { KotaTujuanContent } from "@/features/kota-tujuan/components/kota-tujuan-content";
import { getAllDestinations } from "@/services/tarif.service";
import type { Destination } from "@/types/tarif";

export const metadata = {
  title: "Kota Tujuan Kargo Udara - Lion Cargo Logistik",
  description: "Daftar rute penerbangan dan kota tujuan pengiriman kargo udara terpercaya dari Bandara Soekarno-Hatta (CGK) ke seluruh wilayah Indonesia.",
};

export default async function KotaTujuanPage() {
  let tarifData: Destination[] = [];
  try {
    tarifData = await getAllDestinations();
  } catch (err) {
    console.warn("Gagal mengambil data tujuan dari Supabase:", err);
  }

  return <KotaTujuanContent initialTarifData={tarifData} />;
}
