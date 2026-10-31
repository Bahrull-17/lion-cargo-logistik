import { Suspense, type ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default async function PublicLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<header className="sticky top-0 z-50 h-16 border-b bg-white/90" />}>
        <Suspense fallback={<header className="sticky top-0 z-50 h-16 border-b bg-white/90" />}>
        <Navbar />
      </Suspense>
      </Suspense>
      <main>{children}</main>
      <Footer />
    </>
  );
}
