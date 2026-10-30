import Hero from "@/features/home/components/hero";
import { Layanan } from "@/features/home/components/layanan-preview";
import { PhotoMarquee } from "@/features/home/components/photo-marquee";
import { StatsBar } from "@/features/home/components/stats-bar";
import { AirlinePartners } from "@/features/home/components/airline-partners";
import { FeatureGrid } from "@/features/home/components/feature-grid";
import { KeunggulanBar } from "@/features/home/components/keunggulan-bar";
import { Testimoni } from "@/features/home/components/testimoni";

export default function HomePage() {
  return (
    <>
      <Hero />

      <PhotoMarquee />

      <KeunggulanBar />

      <StatsBar />

      <Layanan />

      <AirlinePartners />

      <FeatureGrid />

      <Testimoni />
    </>
  );
}
