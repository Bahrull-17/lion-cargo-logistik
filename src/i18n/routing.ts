import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],

  defaultLocale: "id",

  localePrefix: "always",

  // Semua pengunjung masuk ke /id; pindah bahasa hanya lewat pengalih bahasa.
  localeDetection: false,

  // Tidak memasang cookie NEXT_LOCALE di halaman publik (tidak dibutuhkan, menghambat cache).
  localeCookie: false,

  // Header Link hreflang dimatikan karena bertabrakan dengan hreflang di <head> (metadata).
  alternateLinks: false,
});
