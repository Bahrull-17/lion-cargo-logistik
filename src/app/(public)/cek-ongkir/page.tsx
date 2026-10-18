import { Metadata } from "next";
import { CekOngkirSection } from "@/components/sections/cek-ongkir";

export const metadata: Metadata = {
  title: "Cek Tarif Ongkir Kargo Udara | Lion Cargo Logistik Bandara Soetta",
  description: "Hitung perkiraan biaya pengiriman kargo udara dari Terminal Kargo Bandara Soekarno-Hatta (CGK) ke seluruh bandara Indonesia secara real-time.",
};

export default function CekOngkirPage() {
  return (
    <main>
      <CekOngkirSection />
    </main>
  );
}
