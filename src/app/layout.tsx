import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = Space_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE = "https://www.getlongiv.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "LONGIVLIFE — India's First Daily Longevity System",
    template: "%s · LONGIVLIFE",
  },
  description:
    "One bottle. One daily system. Three perfect moments. LONGIVLIFE organises your nutrition around the body's natural rhythm — morning energy, midday strength, overnight recovery.",
  keywords: [
    "LONGIVLIFE",
    "GetLongiv",
    "daily longevity system",
    "AM noon PM capsules",
    "creatine daily wellness",
    "magnesium ashwagandha sleep",
    "longevity supplement India",
  ],
  authors: [{ name: "GetLongiv" }],
  openGraph: {
    type: "website",
    url: SITE,
    title: "LONGIVLIFE — India's First Daily Longevity System",
    description:
      "One bottle. One daily system. Three perfect moments. Nutrition organised around the body's natural rhythm.",
    siteName: "LONGIVLIFE",
  },
  twitter: {
    card: "summary_large_image",
    title: "LONGIVLIFE — India's First Daily Longevity System",
    description:
      "One bottle. One daily system. Three perfect moments.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf8",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LONGIVLIFE",
  alternateName: "GetLongiv",
  url: SITE,
  slogan: "India's First Daily Longevity System",
  areaServed: ["India", "United States", "Canada", "GCC", "Australia"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScroll />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-green focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <div id="main-content">{children}</div>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
