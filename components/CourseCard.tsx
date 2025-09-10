// components/CourseCard.tsx
import Link from "next/link";
import Image from "next/image";

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
        group relative isolate overflow-hidden rounded-3xl
        border border-white/10 bg-white/[0.035] ring-1 ring-white/[0.06]
        p-5 sm:p-6 md:p-7
        shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.35)]
        transition-all duration-300
        hover:border-sky-400/30 hover:shadow-[0_12px_30px_rgba(2,132,199,0.12)] hover:-translate-y-1
      "
    >
      {/* Logo móvil arriba derecha (no bloquea) */}
      <div aria-hidden className="absolute right-4 top-4 z-10 md:hidden">
        <Image
          src="/assets/logopng.png"
          alt=""
          width={120}
          height={40}
          className="h-6 w-auto object-contain opacity-95"
          priority
        />
      </div>

      {/* Glow sutil */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[22px]
                   bg-[radial-gradient(80%_60%_at_0%_0%,rgba(56,189,248,0.06),transparent_55%),radial-gradient(80%_60%_at_100%_0%,rgba(16,185,129,0.06),transparent_55%)]
                   opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Grid desktop: icono | contenido | (precio+CTA) */}
      <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
        {/* Icono */}
        <div className="flex md:justify-center">
          <div className="h-11 w-11 md:h-12 md:w-12 shrink-0 grid place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <span className="text-sky-400">★</span>
          </div>
        </div>

        {/* Contenido */}
        <div className="min-w-0 md:pr-0 pr-10">
          <Link href="/creator-lab" prefetch={false} className="block">
            <h3 className="text-lg font-bold leading-tight tracking-tight text-slate-100">
              Creator Lab – Crea tu marca viral con el mismo flujo que uso cada día
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Mi flujo exacto y <span className="font-semibold text-slate-200">+2000 recursos virales</span>.
            </p>
          </Link>

          {/* Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            {features.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-slate-300 ring-1 ring-white/[0.04]"
              >
                {label}
              </span>
            ))}
          </div>

          {/* CTA móvil full-width */}
          <div className="mt-4 md:hidden">
            <a
              href="/creator-lab"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white
                         bg-[linear-gradient(90deg,rgba(2,132,199,0.95),rgba(16,185,129,0.95))]
                         ring-1 ring-white/10 shadow-[0_10px_30px_rgba(2,132,199,0.18)]
                         transition active:scale-[0.99] hover:brightness-110"
              aria-label="Unirme ahora a Creator Lab"
            >
              Unirme ahora — 47€
            </a>
          </div>
        </div>

        {/* Precio + CTA desktop */}
        <div className="hidden md:flex flex-col items-end justify-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 line-through">97€</span>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
              47€
            </span>
          </div>

          <a
            href="/creator-lab"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white
                       bg-[linear-gradient(90deg,rgba(2,132,199,0.95),rgba(16,185,129,0.95))]
                       ring-1 ring-white/10 shadow-[0_10px_30px_rgba(2,132,199,0.18)]
                       transition active:scale-[0.99] hover:brightness-110"
            aria-label="Unirme ahora a Creator Lab"
          >
            Unirme ahora
          </a>
        </div>
      </div>
    </article>
  );
}
