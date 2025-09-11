// components/CourseCard.tsx
import Link from "next/link";

export default function CourseCard() {
  const features = [
    "Sin experiencia previa",
    "Kit Creator Lab",
    "+2000 Clips",
    "GPT personalizado",
    "Acceso de por vida",
    "Chat de soporte incluido",
  ];

  return (
    <article
      className="
        relative isolate overflow-hidden rounded-3xl
        border border-white/10 bg-white/[0.035] ring-1 ring-white/[0.06]
        p-4 sm:p-6 md:p-7
        shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.35)]
        transition-all duration-300
        hover:border-sky-400/30 hover:shadow-[0_12px_30px_rgba(2,132,199,0.12)] hover:-translate-y-1
      "
    >
      {/* Overlay accesible: hace clicable TODA la tarjeta sin tap-highlight ni bordes cuadrados */}
      <Link
        href="/creator-lab"
        aria-label="Abrir Creator Lab"
        className="absolute inset-0 z-40 rounded-3xl focus:outline-none [-webkit-tap-highlight-color:transparent]"
        prefetch={false}
      />

      {/* Contenido visible (z-20 para quedar por debajo del overlay clicable) */}
      <div className="relative z-20 grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
        {/* Icono compacto */}
        <div className="flex md:justify-center">
          <div className="h-10 w-10 md:h-12 md:w-12 shrink-0 grid place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <span className="text-sky-400">★</span>
          </div>
        </div>

        {/* Texto + badges + CTA móvil */}
        <div className="min-w-0">
          <h3 className="text-[18px] leading-6 sm:text-lg sm:leading-7 font-bold tracking-tight text-slate-100">
            Creator Lab – Crea tu marca viral con el mismo flujo que uso cada día
          </h3>
          <p className="mt-1.5 text-[13px] sm:text-sm text-slate-400">
            Mi flujo exacto y <span className="font-semibold text-slate-200">+2000 recursos virales</span>.
          </p>

          {/* Badges más compactas y en fila */}
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2">
            {features.map((label) => (
              <span
                key={label}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] sm:text-xs text-slate-300 ring-1 ring-white/[0.04]"
              >
                {label}
              </span>
            ))}
          </div>

          {/* CTA móvil: centrado y a todo el ancho */}
          <div className="mt-4 md:hidden">
            <div
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white
                         bg-[linear-gradient(90deg,rgba(2,132,199,0.95),rgba(16,185,129,0.95))]
                         ring-1 ring-white/10 shadow-[0_10px_30px_rgba(2,132,199,0.18)]
                         select-none"
            >
              Ver detalles del curso
            </div>
          </div>
        </div>

        {/* Precio + CTA desktop (no cambia navegación; el overlay ya captura el click) */}
        <div className="hidden md:flex flex-col items-end justify-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 line-through">97€</span>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
              47€
            </span>
          </div>
          <div
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white
                       bg-[linear-gradient(90deg,rgba(2,132,199,0.95),rgba(16,185,129,0.95))]
                       ring-1 ring-white/10 shadow-[0_10px_30px_rgba(2,132,199,0.18)]"
          >
            Ver detalles
          </div>
        </div>
      </div>
    </article>
  );
}