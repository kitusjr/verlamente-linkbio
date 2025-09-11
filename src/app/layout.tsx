import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundAnimation } from './components/BackgroundAnimation';
import ScrollUnlocker from "@/components/ScrollUnlocker";
import MobileScrollFix from "./components/MobileScrollFix";
import TouchUnlocker from "./components/TouchUnlocker";

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
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="min-h-screen bg-[#0A0C10] text-slate-200 antialiased">
        {/* FONDO DECORATIVO */}
        <div className="pointer-events-none fixed inset-0 -z-50">
          <BackgroundAnimation />
        </div>
        
        {/* CONTENIDO - OPTIMIZADO PARA MÓVIL */}
        <main className="relative w-full min-h-[100svh]">
          {children}
        </main>
        
        {/* FIXES DE SCROLL */}
        <ScrollUnlocker />
        <MobileScrollFix />
        <TouchUnlocker />
      </body>
    </html>
  );
}
