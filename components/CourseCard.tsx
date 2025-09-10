// components/CourseCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";

export default function CourseCard() {
  const features = [
    "Sin experiencia previa",
    "Kit Creator Lab",
    "+2000 Clips",
    "GPT personalizado",
    "Acceso de por vida",
    "Chat de soporte incluido",
  ];

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('/creator-lab', '_self');
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <article
        className="
          group relative isolate overflow-hidden rounded-2xl
          border border-white/10 bg-gray-900/80 backdrop-blur-sm
          p-6
          shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.35)]
          transition-all duration-300
          hover:border-sky-400/30 hover:shadow-[0_12px_30px_rgba(2,132,199,0.12)] hover:-translate-y-1
        "
      >
        {/* Logo arriba derecha */}
        <div aria-hidden className="absolute right-4 top-4 z-10">
          <Image
            src="/assets/logopng.png"
            alt=""
            width={80}
            height={30}
            className="h-5 w-auto object-contain opacity-95"
            priority
          />
        </div>

        {/* Glow sutil */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-[18px]
                     bg-[radial-gradient(80%_60%_at_0%_0%,rgba(56,189,248,0.06),transparent_55%),radial-gradient(80%_60%_at_100%_0%,rgba(16,185,129,0.06),transparent_55%)]
                     opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Contenido principal */}
        <div className="space-y-4">
          {/* Icono */}
          <div className="flex justify-center">
            <div className="h-10 w-10 shrink-0 grid place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <span className="text-sky-400 text-lg">★</span>
            </div>
          </div>

          {/* Título y descripción */}
          <div className="text-center">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-white mb-2">
              Creator Lab
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Crea tu marca viral con el mismo flujo que uso cada día. 
              <span className="font-semibold text-slate-200"> +2000 recursos virales</span>.
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 justify-center">
            {features.slice(0, 4).map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-xs text-slate-300 ring-1 ring-white/[0.04]"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Precio */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-slate-500 line-through">97€</span>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-lg font-bold text-emerald-300 ring-1 ring-emerald-400/30">
                47€
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">precio de lanzamiento</p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleButtonClick}
            className="w-full py-3 px-4 text-base font-semibold text-white rounded-xl
                       bg-[linear-gradient(90deg,rgba(2,132,199,0.95),rgba(16,185,129,0.95))]
                       ring-1 ring-white/10 shadow-[0_10px_30px_rgba(2,132,199,0.18)]
                       transition-all duration-300 active:scale-[0.98] hover:brightness-110 hover:shadow-[0_15px_40px_rgba(2,132,199,0.25)]"
            aria-label="Unirme ahora a Creator Lab"
          >
            Unirme ahora
          </button>

          {/* Enlaces sociales */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <a 
              href="https://instagram.com/verlamente" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors duration-200"
            >
              <Instagram className="w-4 h-4" />
              <span className="text-sm">Instagram</span>
            </a>
            
            <a 
              href="https://tiktok.com/@verlamente"
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26"/>
              </svg>
              <span className="text-sm">TikTok</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
