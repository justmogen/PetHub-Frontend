import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/Footer";
import { socialImages } from "@/lib/images";
import { ReduxProvider } from "@/lib/redux";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pawhub.com";

export const metadata: Metadata = {
  title: "PawHub - Find Your Perfect Companion",
  description:
    "Discover healthy, vet-certified pets from Kenya's most trusted breeders. Browse pets, read articles, and find your perfect companion.",
  keywords: "pets, adoption, dogs, cats, pet marketplace, Kenya, breeders",
  authors: [{ name: "PawHub Team" }],
  creator: "PawHub",
  publisher: "PawHub",
  applicationName: "PawHub Pet Marketplace",
  openGraph: {
    title: "PawHub - Find Your Perfect Companion",
    description:
      "Discover healthy, vet-certified pets from Kenya's most trusted breeders.",
    url: baseUrl,
    siteName: "PawHub",
    images: [
      {
        url: `${baseUrl}${socialImages.openGraph}`,
        width: 1200,
        height: 630,
        alt: "PawHub - Premium Pet Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PawHub - Find Your Perfect Companion",
    description:
      "Discover healthy, vet-certified pets from Kenya's most trusted breeders.",
    images: [`${baseUrl}${socialImages.twitter}`],
    creator: "@pawhub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png" }],
    shortcut: ["/shortcut-icon.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} font-sans antialiased bg-gray-50 text-gray-900`}
      >
        <ReduxProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
