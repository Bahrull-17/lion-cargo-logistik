import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GOOGLE_FONTS_URL } from "@/config/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Panel Admin | Lion Cargo Logistik",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#C8102E",
  width: "device-width",
  initialScale: 1,
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
