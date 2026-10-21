import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Headset, MapPinned, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layanan } from "@/components/sections/layanan";
import { PhotoMarquee } from "@/components/sections/photo-marquee";
import { waLink } from "@/utils/wa-link";

const highlights = [
  {
    icon: BadgeCheck,
    title: "Agen cargo profesional",
    text: "Pengiriman diurus langsung dari Bandara Soekarno-Hatta.",
  },
  {
    icon: ShieldCheck,
    title: "Pengiriman aman",
    text: "Barang ditangani dengan hati-hati dari awal sampai tujuan.",
  },
  {
    icon: MapPinned,
    title: "Jangkauan nasional",
    text: "113 bandara tujuan di seluruh Indonesia.",
  },
  {
    icon: Headset,
    title: "Dukungan pelanggan",
    text: "Tanyakan tarif dan kebutuhan kirim lewat WhatsApp.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate flex min-h-136 items-center justify-center overflow-hidden bg-charcoal lg:min-h-168">
        <Image src="/images/hero.jpg" alt="" aria-hidden="true" fill priority sizes="100vw" className="object-cover" />

        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center text-white sm:px-6">
          <h1 className="text-4xl font-extrabold leading-[1.1] drop-shadow-md sm:text-5xl lg:text-6xl">
            Solusi Pengiriman Cargo Udara <span className="text-[#ff1a3c] drop-shadow-md">Cepat dan Terpercaya</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-white drop-shadow">
            Jasa pengiriman cargo udara Jakarta ke seluruh Indonesia lewat Bandara Soekarno-Hatta. Tarif cargo per kg transparan, proses mudah, barang dan dokumen sampai dengan aman.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="group h-14 w-full rounded-lg bg-brand px-8 text-base font-semibold tracking-wide shadow-lg shadow-brand/30 transition-all duration-300 hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/40 active:scale-[0.98] sm:w-auto"
            >
              <Link href="/cek-ongkir">
                Cek Ongkir
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 w-full rounded-lg border-white/50 bg-white/10 px-8 text-base font-semibold tracking-wide text-white transition-all duration-300 hover:bg-white hover:text-charcoal active:scale-[0.98] sm:w-auto"
            >
              <a href={waLink("Halo Lion Cargo Logistik, saya ingin bertanya tentang pengiriman cargo.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5" />
                Hubungi Kami
              </a>
            </Button>
          </div>
        </div>
      </section>
      <PhotoMarquee />
      <Layanan />

      <section aria-label="Keunggulan Lion Cargo Logistik" className="border-b bg-white">
        <ul className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 px-4 py-7 sm:px-6 lg:border-l lg:first:border-l-0">
              <Icon className="mt-0.5 size-7 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <h2 className="text-base font-bold text-charcoal">{title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
