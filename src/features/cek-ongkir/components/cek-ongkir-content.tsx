import { CekOngkirHero } from "@/features/cek-ongkir/components/cek-ongkir-hero";
import { CekOngkirHeader } from "@/features/cek-ongkir/components/cek-ongkir-header";
import { CekOngkirTariffLoader } from "@/features/cek-ongkir/components/cek-ongkir-tariff-loader";
export function CekOngkirContent() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 pb-20 text-slate-800 sm:pb-28">
      <CekOngkirHero />
      <CekOngkirHeader />
      <CekOngkirTariffLoader />
    </div>
  );
}
