import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Bahasa yang tersedia di website
  locales: ["id", "en"],

  // Bahasa default website
  defaultLocale: "id",

  // Menggunakan prefix URL
  // Contoh:
  // /id/tentang-kami
  // /en/tentang-kami
  localePrefix: "always",
});
