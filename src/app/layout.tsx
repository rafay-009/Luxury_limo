import type { Metadata } from "next";
import Script from "next/script";
import { fontVariables } from "@/lib/fonts";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PhoneFAB } from "@/components/ui/PhoneFAB";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { SITE_CONFIG } from "@/constants";
import { generateJsonLd } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.meta.siteUrl),
  title: {
    default: SITE_CONFIG.meta.defaultTitle,
    template: `%s | ${SITE_CONFIG.meta.siteName}`,
  },
  description: SITE_CONFIG.meta.defaultDescription,
  openGraph: {
    title: SITE_CONFIG.meta.defaultTitle,
    description: SITE_CONFIG.meta.defaultDescription,
    siteName: SITE_CONFIG.meta.siteName,
    url: SITE_CONFIG.meta.siteUrl,
    locale: SITE_CONFIG.meta.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.meta.twitterHandle,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = generateJsonLd({
    "@type": SITE_CONFIG.meta.structuredData.type,
    name: SITE_CONFIG.company.name,
    url: SITE_CONFIG.meta.siteUrl,
    telephone: SITE_CONFIG.company.phone,
    email: SITE_CONFIG.company.email,
    priceRange: SITE_CONFIG.meta.structuredData.priceRange,
    areaServed: SITE_CONFIG.company.location,
  });

  return (
    <html lang="en" className={fontVariables}>
      <body className="app-shell antialiased">
        <Script id="local-business-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        <ScrollProgressBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <PhoneFAB />
        <CookieBanner />
      </body>
    </html>
  );
}
