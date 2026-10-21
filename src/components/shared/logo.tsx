import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  light?: boolean;
}

export function Logo({ light = false }: LogoProps) {
  // Jika light = true (untuk di Footer / latar gelap), gunakan logo dark mode
  // Jika light = false (untuk di Navbar / latar terang), gunakan hero-1.png
  const logoSrc = light ? "/images/hero-13.png" : "/images/hero-1.png";

  return (
    <Link href="/" className="flex items-center" aria-label="Lion Cargo Logistik, ke beranda">
      <div className="relative h-6 w-auto sm:h-9 md:h-10">
        <Image src={logoSrc} alt="Lion Cargo Logistik" width={180} height={50} priority={!light} className="h-full w-auto object-contain" />
      </div>
    </Link>
  );
}
