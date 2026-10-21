import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { navItems, siteConfig } from "@/lib/constants/site";

export function Footer() {
  const { contact } = siteConfig;

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          {/* Mengirimkan prop light agar menggunakan logo versi dark mode di background gelap */}
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed">{siteConfig.description}</p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Menu</h2>
          <ul className="space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Kontak</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-accent" aria-hidden="true" />
              {contact.address}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand-accent" aria-hidden="true" />
              {contact.phone}
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-accent" aria-hidden="true" />
              {contact.email}
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-accent" aria-hidden="true" />
              {contact.openingHours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">© 2026 {siteConfig.name}. Hak cipta dilindungi.</div>
    </footer>
  );
}
