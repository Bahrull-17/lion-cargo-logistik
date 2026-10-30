import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/features/admin/components/login-form";

export const metadata: Metadata = {
  title: "Masuk Admin",
  robots: { index: false, follow: false },
};

/** [kiri %, atas %, ukuran px, durasi detik, jeda detik] - hanya di langit atas, menghindari badan pesawat. */
const STARS: [number, number, number, number, number][] = [
  [5, 18, 3, 4.2, 0],
  [10, 60, 2, 3.4, 1.1],
  [16, 34, 3, 5.0, 2.3],
  [22, 82, 2, 3.8, 0.6],
  [28, 10, 2, 4.6, 1.8],
  [33, 48, 3, 3.2, 2.9],
  [40, 8, 2, 4.4, 0.3],
  [46, 5, 3, 5.2, 1.5],
  [54, 10, 2, 3.6, 2.1],
  [60, 6, 3, 4.8, 0.9],
  [68, 12, 2, 3.3, 3.2],
  [74, 8, 3, 4.1, 1.4],
  [80, 28, 2, 5.1, 0.2],
  [85, 64, 3, 3.7, 2.6],
  [90, 16, 2, 4.5, 1.0],
  [94, 72, 3, 3.9, 2.0],
  [97, 38, 2, 4.9, 0.5],
];

const CSS = `
@keyframes adm-drift { from { transform: scale(1); } to { transform: scale(1.09); } }
@keyframes adm-twinkle { 0%, 100% { opacity: .12; transform: scale(.7); } 50% { opacity: 1; transform: scale(1.25); } }
@keyframes adm-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
.adm-scene { transform-origin: 60% 36%; animation: adm-drift 38s ease-in-out infinite alternate; }
.adm-star { animation: adm-twinkle 4s ease-in-out infinite; }
.adm-rise { animation: adm-rise .8s cubic-bezier(.2,.7,.2,1) both; }
@media (prefers-reduced-motion: reduce) {
  .adm-scene, .adm-star, .adm-rise { animation: none; }
  .adm-star { opacity: .6; }
}
`;

export default function AdminLoginPage() {
  return (
    <main className="relative isolate min-h-dvh overflow-x-clip bg-[#0d0508] text-white">
      <style>{CSS}</style>

      {/* Adegan: setinggi layar dan menempel di atas (HP), memenuhi seluruh halaman (laptop) */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-dvh overflow-hidden lg:inset-0 lg:h-auto">
        {/* Ilustrasi yang pelan-pelan mendekat ke pesawat */}
        <div className="adm-scene absolute inset-0 bg-[url('/images/admin/login-cargo.svg')] bg-cover bg-[position:62%_center] lg:bg-[position:center_35%]" />

        {/* Gelapkan sisi tempat form berada (bawah di HP, kiri di laptop) agar mudah dibaca */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,5,8,0.6),transparent_55%)] lg:bg-[linear-gradient(to_right,rgba(13,5,8,0.55),transparent_55%)]" />

        {/* Bintang berkedip */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[22%]">
          {STARS.map(([left, top, size, duration, delay]) => (
            <span key={`${left}-${top}`} className="adm-star absolute rounded-full bg-white" style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, animationDuration: `${duration}s`, animationDelay: `${delay}s` }} />
          ))}
        </div>
      </div>

      {/* HP: ruang atas (42% layar) disisakan untuk pesawat, kartu mengalir di bawahnya dan halaman bisa di-scroll.
          Laptop: kartu melayang di kiri. */}
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[1400px] flex-col items-center justify-end pt-[42dvh] lg:flex-row lg:items-center lg:justify-start lg:px-16 lg:pt-0">
        <section className="adm-rise w-full rounded-t-[28px] border border-b-0 border-white/15 bg-[#12060a]/85 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] [color-scheme:dark] supports-[backdrop-filter]:bg-black/45 supports-[backdrop-filter]:backdrop-blur-2xl sm:max-w-md sm:px-8 sm:pt-8 lg:w-[26rem] lg:rounded-3xl lg:border-b lg:px-9 lg:pb-10 lg:pt-10 lg:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_40px_90px_-30px_rgba(225,29,42,0.5)]">
          <h1 className="text-balance text-[1.4rem] font-semibold leading-tight tracking-tight sm:text-[1.7rem]">Masuk ke panel admin</h1>
          <p className="mb-5 mt-1.5 text-sm leading-relaxed text-white/65 sm:mb-7 sm:mt-2">Gunakan akun admin untuk mengubah tarif ongkir.</p>

          <LoginForm />

          <Link href="/" className="mt-5 inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:mt-7">
            <ArrowLeft className="size-4" aria-hidden />
            Kembali ke website
          </Link>
        </section>
      </div>

      {/* Kalimat inti, hanya di layar lebar */}
      <div className="adm-rise absolute bottom-12 right-16 hidden max-w-xs text-right lg:block" style={{ animationDelay: "0.25s" }}>
        <p className="text-balance text-2xl font-semibold leading-snug">Atur tarif ongkir dari satu tempat.</p>
        <p className="mt-2 text-sm leading-relaxed text-white/65">Harga Cargo Reguler yang Anda simpan langsung tampil di website.</p>
      </div>
    </main>
  );
}
