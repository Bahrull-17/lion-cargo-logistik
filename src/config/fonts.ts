import { Inter, Plus_Jakarta_Sans } from "next/font/google";

/** Font di-host sendiri saat build (tanpa request ke fonts.googleapis.com di browser). */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter-nf",
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta-nf",
});

/** Dipasang di <html className=...> pada layout publik & admin. */
export const fontVariables = `${inter.variable} ${plusJakartaSans.variable}`;
