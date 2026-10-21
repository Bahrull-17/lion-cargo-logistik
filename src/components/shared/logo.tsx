import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="Lion Cargo Logistik, ke beranda">
      {/* Diperkecil lagi ke ukuran medium h-9 di HP, h-10 di tablet, dan h-11 di laptop/desktop */}
      <div className="relative h-15 w-auto sm:h-12 md:h-17">
        <Image src="/images/hero-1.png" alt="Lion Cargo Logistik" width={180} height={50} priority className="h-full w-auto object-contain" />
      </div>
    </Link>
  );
}
