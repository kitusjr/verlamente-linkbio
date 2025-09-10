// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VERLAMENTE",
  description:
    "Clips, voces IA y recursos premium para creadores de contenido. Herramientas exclusivas para potenciar tu contenido digital.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body className="min-h-screen bg-[#0A0C10] text-slate-200 antialiased">
        {/* Fondo decorativo: detrás y sin interceptar eventos */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(56,189,248,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_10%_20%,rgba(59,130,246,0.08),transparent_65%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0C10]" />
        </div>

        {children}
      </body>
    </html>
  );
}
