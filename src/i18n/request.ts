import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "id" | "en")) {
    locale = routing.defaultLocale;
  }

  const messages = {
    metadata: (await import(`../messages/${locale}/metadata.json`)).default,

    navigation: (await import(`../messages/${locale}/navigation.json`)).default,

    common: (await import(`../messages/${locale}/common.json`)).default,

    footer: (await import(`../messages/${locale}/footer.json`)).default,

    pages: {
      home: (await import(`../messages/${locale}/pages/home.json`)).default,

      about: (await import(`../messages/${locale}/pages/about.json`)).default,

      services: (await import(`../messages/${locale}/pages/services.json`)).default,

      destination: (await import(`../messages/${locale}/pages/destination.json`)).default,

      //article: (await import(`../messages/${locale}/pages/article/index.json`)).default,

      faq: (await import(`../messages/${locale}/pages/faq.json`)).default,

      cekOngkir: (await import(`../messages/${locale}/pages/cek-ongkir.json`)).default,

      //contact: (await import(`../messages/${locale}/pages/contact.json`)).default,
    },
  };

  return {
    locale,
    messages,
  };
});
