"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Plane, MapPin, FileText, HelpCircle, PhoneCall, MessageCircle, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { waLink } from "@/utils/wa-link";

const navLinks = [
  { name: "Beranda", href: "/", icon: Home },
  { name: "Tentang Kami", href: "/tentang-kami", icon: Info },
  { name: "Layanan", href: "/layanan", icon: Plane },
  { name: "Kota Tujuan", href: "/kota-tujuan", icon: MapPin },
  { name: "Artikel", href: "/artikel", icon: FileText },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
  { name: "Kontak", href: "/kontak", icon: PhoneCall },
];

export function MobileMenu() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Tombol Hamburger di Navbar */}
        <button aria-label="Buka Menu Navigasi" className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 transition-all">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </SheetTrigger>

      {/* Kontainer Sheet Menu Mobile (Tinggi Menyesuaikan Konten) */}
      <SheetContent side="top" className="w-full bg-white p-0 rounded-b-3xl border-b border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header Drawer dengan Logo Asli Proyek & Tombol X Merah Polos */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          {/* Logo Utama Asli Proyek */}
          <Logo />

          {/* Tombol Close (X) Merah Polos Tanpa Lingkaran Background */}
          <SheetClose className="p-1 text-brand hover:opacity-70 transition-opacity focus:outline-none">
            <X className="w-6 h-6" />
          </SheetClose>
        </div>

        {/* Daftar Navigasi */}
        <div className="p-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${isActive ? "bg-brand/10 text-brand border-l-4 border-brand" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-brand" : "text-slate-500"}`} />
                  <span>{link.name}</span>
                </Link>
              </SheetClose>
            );
          })}
        </div>

        {/* Tombol Chat WhatsApp (Menempel Dekat di Bawah Navigasi) */}
        <div className="p-4 pt-2 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl">
          <a
            href={waLink("Halo Lion Cargo Logistik, saya ingin bertanya seputar pengiriman kargo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full bg-brand text-white font-bold py-3 px-4 rounded-xl text-sm shadow-sm hover:bg-brand/90 transition-all active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat WhatsApp</span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
