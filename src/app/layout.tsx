import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundAnimation } from './components/BackgroundAnimation';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VERLAMENTE",
  description: "Clips, voces IA y recursos premium para creadores de contenido. Herramientas exclusivas para potenciar tu contenido digital.",
  openGraph: {
    title: "VERLAMENTE",
    description: "Clips, voces IA y recursos premium para creadores de contenido",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "VERLAMENTE",
    description: "Clips, voces IA y recursos premium para creadores de contenido",
  },
  keywords: "clips, voces IA, recursos, creadores de contenido, premium",
  authors: [{ name: "Verlamente" }],
  creator: "Verlamente",
  metadataBase: new URL("https://verlamente.com"),
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="h-full scroll-smooth [color-scheme:dark]">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="min-h-screen bg-[#0A0C10] text-slate-200 antialiased selection:bg-sky-500/20 selection:text-sky-100">
        {/* Fondo global seguro (fijo, no interactivo) */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(56,189,248,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_10%_20%,rgba(59,130,246,0.08),transparent_65%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0C10]" />
        </div>
        <BackgroundAnimation />
        {children}
      </body>
    </html>
  );
}
