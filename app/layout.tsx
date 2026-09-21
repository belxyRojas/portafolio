import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistPixel = localFont({
  src: [
    { path: "./fonts/GeistPixel-Square.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeistPixel-Square.woff2", weight: "600", style: "normal" },
    { path: "./fonts/GeistPixel-Square.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-geist-pixel",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bkrojas.dev"),
  title: {
    default: "Belxy Rojas — Systems Engineer",
    template: "%s · bkrojas.dev",
  },
  description:
    "Systems Engineer with a Master’s in Computer Science focused on cybersecurity. 8+ years full-stack: Next.js, React, Node.js, Python. Colombia · remote · clients.",
  keywords: [
    "Belxy Rojas",
    "Systems Engineer",
    "Full Stack",
    "Next.js",
    "Cybersecurity",
    "bkrojas.dev",
  ],
  authors: [{ name: site.name, url: `https://${site.domain}` }],
  openGraph: {
    title: "Belxy Rojas — Intertwined Systems",
    description:
      "Frontend, backend, infrastructure, and security connected as one system.",
    url: "https://bkrojas.dev",
    siteName: site.domain,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Belxy Rojas — Systems Engineer",
    description:
      "Full-stack platforms where frontend, backend, infrastructure, and security stay connected.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${geistPixel.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bg font-sans text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
