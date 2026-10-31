import type { Metadata, Viewport } from "next";

import type { ReactNode } from "react";

import { NextIntlClientProvider } from "next-intl";

import { getMessages, setRequestLocale } from "next-intl/server";

import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";

import { seoConfig } from "@/config/seo";

import SchemaMarkup from "@/components/seo/schema-markup";

import { routing } from "@/i18n/routing";

import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  themeColor: "#C8102E",
};

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

  return {
    metadataBase: new URL(siteConfig.url),

    title: {
      default: siteConfig.name,

      template: `%s | ${siteConfig.name}`,
    },

    description: siteConfig.description,

    keywords: [...siteConfig.keywords],

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

    alternates: {
      canonical: `${siteConfig.url}/${locale}`,

      languages: {
        id: `${siteConfig.url}/id`,

        en: `${siteConfig.url}/en`,
      },
    },

    openGraph: {
      type: seoConfig.openGraph.type,

      locale: seoConfig.openGraph.locale,

      alternateLocale: [...seoConfig.openGraph.alternateLocale],

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
      <body className="min-h-screen">
        <SchemaMarkup />

        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
