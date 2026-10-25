import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lion Cargo Logistik | Cargo Udara Cepat dan Terpercaya",
    template: "%s | Lion Cargo Logistik",
  },
  description: "Jasa pengiriman cargo udara cepat dan terpercaya ke berbagai kota di Indonesia.",
};

export const viewport: Viewport = {
  themeColor: "#C8102E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
