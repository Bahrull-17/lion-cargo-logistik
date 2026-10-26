import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  light?: boolean;
}

export function Logo({ light = false }: LogoProps) {
  // light = true  -> varian untuk footer (latar merah)
  // light = false -> varian standar untuk navbar dan menu mobile (latar terang)
  const logoSrc = light ? "/images/brand/logo-footer.png" : "/images/brand/logo.png";

  return (
    <Link href="/" className="flex items-center" aria-label="Lion Cargo Logistik, ke beranda">
      <div className="relative h-6 w-auto sm:h-9 md:h-10">
        <Image src={logoSrc} alt="Lion Cargo Logistik" width={180} height={50} priority={!light} className="h-full w-auto object-contain" />
      </div>
    </Link>
  );
}
