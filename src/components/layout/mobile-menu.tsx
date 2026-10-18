"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleHelp, House, Info, MapPinned, Menu, MessageCircle, Newspaper, Phone, Plane, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { navItems } from "@/lib/constants/site";
import { cn } from "@/lib/utils";
import { waLink } from "@/utils/wa-link";

const icons: Record<string, LucideIcon> = {
  "/": House,
  "/tentang-kami": Info,
  "/layanan": Plane,
  "/kota-tujuan": MapPinned,
  "/artikel": Newspaper,
  "/faq": CircleHelp,
  "/kontak": Phone,
};

export function MobileMenu() {
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="size-11 lg:hidden" aria-label="Buka menu">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex w-[85%] max-w-xs flex-col gap-0 bg-white p-0">
        <SheetHeader className="h-16 shrink-0 justify-center border-b px-4 py-0 text-left">
          <SheetTitle className="sr-only">Menu navigasi</SheetTitle>
          <SheetDescription className="sr-only">Daftar halaman Lion Cargo Logistik</SheetDescription>
          <SheetClose asChild>
            <span className="inline-flex w-fit">
              <Logo />
            </span>
          </SheetClose>
        </SheetHeader>

        <nav aria-label="Menu seluler" className="flex-1 overflow-y-auto px-3 py-3 scrollbar-none [&::-webkit-scrollbar]:hidden">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = icons[item.href] ?? House;
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn("relative flex h-12 items-center gap-4 rounded-lg px-4 text-[15px] font-medium transition-colors", active ? "bg-accent text-brand" : "text-charcoal active:bg-secondary")}
                    >
                      {active && <span aria-hidden="true" className="absolute inset-y-2.5 left-0 w-1 rounded-r-full bg-brand" />}
                      <Icon className={cn("size-5 shrink-0", active ? "text-brand" : "text-muted-foreground")} aria-hidden="true" />
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 border-t p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Button asChild size="lg" className="h-12 w-full text-[15px]">
            <a href={waLink("Halo Lion Cargo Logistik, saya ingin bertanya tentang pengiriman cargo.")} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-5" />
              Chat WhatsApp
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
