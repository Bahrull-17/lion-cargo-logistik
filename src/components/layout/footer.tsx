import Link from "next/link";
import { BookOpen, Clock, HelpCircle, Home, Info, Mail, Map, MapPin, Package, Phone, PhoneCall, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { navItems, siteConfig } from "@/lib/constants/site";

const menuIcons: Record<string, LucideIcon> = {
  "/": Home,
  "/beranda": Home,
  "/tentang-kami": Info,
  "/layanan": Package,
  "/kota-tujuan": Map,
  "/artikel": BookOpen,
  "/faq": HelpCircle,
  "/kontak": PhoneCall,
};

// Skema Warna Crimson Penuh (#DC143C)
const BG = "#DC143C";
const ACCENT = "#A10E2B";

/* ---------- Elemen ilustrasi bandara ---------- */

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M 0 20 Q -2 10 10 10 Q 14 0 28 2 Q 38 -8 52 2 Q 62 0 66 10 Q 80 10 80 20 Z" fill={BG} />;
}

function JetFlying({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <path d="M 50 14 L 28 36 L 42 36 L 72 14" fill={BG} />
      <path d="M 0 0 L 80 0 Q 98 2 102 8 Q 98 14 80 16 L 14 16 Q 4 10 0 0 Z" fill={BG} />
      <path d="M 6 2 L -6 -22 L 8 -22 L 28 2" fill={ACCENT} />
      <rect x="52" y="17" width="18" height="7" rx="3.5" fill={BG} />
    </g>
  );
}

function AirportIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      viewBox={compact ? "290 0 930 210" : "0 0 1440 210"}
      preserveAspectRatio="xMidYMax meet"
      className={`${compact ? "block sm:hidden" : "hidden sm:block"} h-auto w-full [&_*]:[vector-effect:non-scaling-stroke]`}
      fill="none"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Cloud x={650} y={24} s={1.1} />
      <Cloud x={880} y={50} s={0.9} />
      {!compact && (
        <>
          <Cloud x={30} y={50} />
          <Cloud x={1320} y={64} />
        </>
      )}
      <JetFlying transform="translate(430 40) rotate(-10) scale(0.95)" />
      {!compact && <JetFlying transform="translate(1190 28) rotate(-10) scale(0.7)" />}
      {!compact && (
        <g>
          <path d="M 50 190 L 50 136" />
          <path d="M 50 138 L 92 143 L 92 157 L 50 154 Z" fill={ACCENT} />
          <path d="M 66 140 L 66 156 M 80 142 L 80 156" />
        </g>
      )}
      {!compact && (
        <g>
          <path d="M 130 190 L 130 170 L 250 170 L 250 190" fill={BG} />
          <path d="M 170 170 L 176 96 L 204 96 L 210 170" fill={BG} />
          <path d="M 183 96 L 181 170 M 197 96 L 199 170" opacity={0.5} />
          <path d="M 168 96 L 158 72 L 222 72 L 212 96 Z" fill={ACCENT} fillOpacity={0.8} />
          <path d="M 164 72 L 169 58 L 211 58 L 216 72" fill={BG} />
          <path d="M 174 72 L 178 96 M 190 72 L 190 96 M 206 72 L 202 96" />
          <path d="M 190 58 L 190 26 M 183 36 L 197 36" />
        </g>
      )}
      <g>
        <path d="M 320 190 L 320 150 Q 560 90 800 150 L 800 190" fill={BG} />
        <path d="M 320 162 Q 560 104 800 162" />
        <path d="M 320 168 L 800 168" />
        {Array.from({ length: 16 }, (_, i) => {
          const x = 350 + i * 28;
          return <line key={x} x1={x} y1={168} x2={x} y2={190} />;
        })}
        <path d="M 540 190 L 540 174 L 580 174 L 580 190 M 560 174 L 560 190" fill={BG} />
      </g>
      <g>
        <path d="M 800 152 L 960 150 L 960 166 L 800 168 Z" fill={BG} />
        <path d="M 870 167 L 870 190" />
      </g>
      <g>
        <path d="M 1020 162 L 1075 186 L 1100 186 L 1090 162 Z" fill={BG} />
        <rect x="1030" y="168" width="32" height="14" rx="7" fill={BG} />
        <path d="M 1135 138 L 1178 92 L 1198 92 L 1190 138 Z" fill={ACCENT} />
        <path d="M 1000 138 Q 945 140 932 156 Q 945 172 1000 172 L 1140 172 Q 1170 160 1185 138 Z" fill={BG} />
        <path d="M 944 148 L 958 148" />
        {Array.from({ length: 13 }, (_, i) => (
          <circle key={i} cx={972 + i * 14} cy={150} r={2} />
        ))}
        <path d="M 962 172 L 962 186 M 1110 172 L 1110 186" />
        <circle cx={962} cy={186} r={4} fill={BG} />
        <circle cx={1110} cy={186} r={4} fill={BG} />
      </g>
      {!compact && (
        <g>
          <path d="M 1250 190 L 1250 150 Q 1250 118 1325 118 Q 1400 118 1400 150 L 1400 190" fill={BG} />
          <path d="M 1285 190 L 1285 150 L 1365 150 L 1365 190 M 1305 150 L 1305 190 M 1325 150 L 1325 190 M 1345 150 L 1345 190" />
        </g>
      )}
      <path d="M -50 190 L 1500 190" />
      <path d="M -50 202 L 1500 202" strokeDasharray="28 18" />
    </svg>
  );
}

/* ---------- Footer ---------- */

export function Footer() {
  const { contact } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-[#DC143C] text-white border-t border-red-700">
      <div className="pointer-events-none absolute -top-24 right-1/4 size-96 rounded-full bg-white/10 blur-3xl" />

      {/* 1. KONTEN UTAMA */}
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-12 sm:px-6 md:grid-cols-3 lg:px-8">
        {/* Kolom 1: Logo & deskripsi (Rata Kiri) */}
        <div className="space-y-4">
          <div className="inline-block transform scale-250 origin-left my-2">
            <Logo light />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/90 pt-2">{siteConfig.description}</p>
        </div>

        {/* Kolom 2: Navigasi Menu (Rata Kiri) */}
        <nav aria-label="Navigasi footer">
          <h2 className="mb-4 border-l-2 border-white pl-2.5 text-sm font-bold tracking-wide text-white">Navigasi Menu</h2>
          <ul className="space-y-2.5 text-sm">
            {navItems.map((item) => {
              const Icon = menuIcons[item.href] ?? Package;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2.5 rounded py-0.5 font-medium text-white/90 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Icon className="size-4 shrink-0 text-white transition-transform group-hover:scale-110" aria-hidden="true" />
                    <span className="underline-offset-4 group-hover:underline">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Kolom 3: Kontak & operasional (Rata Kiri) */}
        <div>
          <h2 className="mb-4 border-l-2 border-white pl-2.5 text-sm font-bold tracking-wide text-white">Pusat Kontak &amp; Operasional</h2>
          <ul className="space-y-3 text-sm text-white/90">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-white" aria-hidden="true" />
              <span>{contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-white" aria-hidden="true" />
              <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="underline-offset-4 hover:text-white hover:underline">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-white" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="break-all underline-offset-4 hover:text-white hover:underline">
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-4 shrink-0 text-white" aria-hidden="true" />
              <span className="font-semibold text-white">Senin - Minggu: 24 Jam</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 2. ILUSTRASI BANDARA */}
      <div aria-hidden="true" className="pointer-events-none relative z-10 select-none px-2 pt-4 sm:px-0">
        <AirportIllustration compact />
        <AirportIllustration />
      </div>

      {/* 3. COPYRIGHT BARIS BAWAH */}
      <div className="relative z-10 bg-[#DC143C] py-4 text-center text-xs font-semibold tracking-wider text-white">© 2026 {siteConfig.name}. Hak cipta dilindungi.</div>
    </footer>
  );
}
