import type { Metadata, Viewport } from "next";

import type { ReactNode } from "react";

import { NextIntlClientProvider } from "next-intl";

import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";

import { seoConfig } from "@/config/seo";

import SchemaMarkup from "@/components/seo/schema-markup";

import { OG_LOCALE } from "@/lib/seo/metadata";

import { GOOGLE_FONTS_URL } from "@/config/fonts";

import { routing } from "@/i18n/routing";

import { GoogleAnalytics } from "@next/third-parties/google";

import { WhatsappClickTracker } from "@/components/analytics/whatsapp-click-tracker";

import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  themeColor: "#C8102E",
};

// Locale selain id/en (mis. /careers, /jobs dari bot) langsung 404 tanpa dirender,
// sehingga tidak memicu penulisan ke cache read-only.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

interface LocaleLayoutProps {
  children: ReactNode;

  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  // Catatan: canonical & hreflang sengaja TIDAK diset di layout, karena akan diwarisi halaman yang lupa mengaturnya.
  // Tiap halaman mengaturnya sendiri lewat createPageMetadata().
  return {
    metadataBase: new URL(siteConfig.url),

    title: {
      default: t("title"),

      template: `%s | ${siteConfig.name}`,
    },

    description: t("description"),

    keywords: t("keywords")
      .split(",")
      .map((keyword) => keyword.trim()),

    robots: {
      index: true,

      follow: true,

      googleBot: {
        index: true,

        follow: true,

        "max-image-preview": "large" as const,

        "max-snippet": -1,

        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: seoConfig.openGraph.type,

      locale: OG_LOCALE[locale] ?? OG_LOCALE.id,

      siteName: siteConfig.name,

      images: [...seoConfig.openGraph.images],
    },

    twitter: {
      card: seoConfig.twitter.card,

      images: [...seoConfig.twitter.images],
    },

    verification: {
      google: seoConfig.googleVerification || undefined,
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "id" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({
    locale,
  });

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
      </head>

      <body className="min-h-screen">
        <SchemaMarkup />

        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>

        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}

        <WhatsappClickTracker />
      </body>
    </html>
  );
}
