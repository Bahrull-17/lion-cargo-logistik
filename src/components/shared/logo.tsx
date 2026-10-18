import Link from "next/link";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Lion Cargo Logistik, ke beranda">
      <span className="flex size-9 items-center justify-center rounded-lg bg-brand text-white">
        <Plane className="size-5" aria-hidden="true" />
      </span>
      <span className={cn("font-heading text-lg font-extrabold leading-none tracking-tight", light ? "text-white" : "text-charcoal")}>
        Lion Cargo
        <span className={cn("mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.22em]", light ? "text-white/60" : "text-muted-foreground")}>Logistik</span>
      </span>
    </Link>
  );
}
