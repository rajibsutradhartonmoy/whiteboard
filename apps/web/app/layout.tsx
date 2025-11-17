import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Whiteboard - Database Schema Designer",
    template: "%s | Whiteboard",
  },
  description:
    "Professional, production-ready database schema designer with real-time collaboration and offline support.",
  keywords: [
    "database",
    "schema",
    "designer",
    "ERD",
    "entity relationship diagram",
    "SQL",
    "PostgreSQL",
    "MySQL",
    "collaboration",
  ],
  authors: [{ name: "Whiteboard Team" }],
  creator: "Whiteboard",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://whiteboard.app",
    siteName: "Whiteboard",
    title: "Whiteboard - Database Schema Designer",
    description:
      "Professional database schema designer with real-time collaboration",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Whiteboard - Database Schema Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whiteboard - Database Schema Designer",
    description:
      "Professional database schema designer with real-time collaboration",
    images: ["/og-image.png"],
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
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
