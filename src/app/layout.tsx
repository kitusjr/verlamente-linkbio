import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundAnimation } from './components/BackgroundAnimation';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Verlamente | Recursos para Creadores",
  description: "Clips, voces IA y recursos premium para creadores de contenido. Herramientas exclusivas para potenciar tu contenido digital.",
  openGraph: {
    title: "Verlamente | Recursos para Creadores",
    description: "Clips, voces IA y recursos premium para creadores de contenido",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verlamente | Recursos para Creadores",
    description: "Clips, voces IA y recursos premium para creadores de contenido",
  },
  keywords: "clips, voces IA, recursos, creadores de contenido, premium",
  authors: [{ name: "Verlamente" }],
  creator: "Verlamente",
  metadataBase: new URL("https://verlamente.com")
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} text-gray-100 antialiased overflow-hidden bg-black`}>
        <BackgroundAnimation />
        <main className="min-h-screen flex flex-col items-center justify-center relative">
        {children}
        </main>
      </body>
    </html>
  );
}
