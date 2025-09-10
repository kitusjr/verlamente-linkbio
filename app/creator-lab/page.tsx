// app/creator-lab/page.tsx
export default function Page() {
    return (
      <main className="min-h-[100svh] w-full">
        <section className="mx-auto max-w-[1160px] lg:max-w-[1240px] xl:max-w-[1320px] px-4 md:px-6 py-8 md:py-10">
          <header className="mb-6 md:mb-8">
            <div className="flex flex-col items-center justify-between gap-3 md:flex-row md:gap-6">
              <img
                src="/assets/logopng.png"
                alt="Creator Lab"
                className="h-auto w-[220px] md:w-[340px]"
              />
              <div className="flex items-center gap-2 md:flex-col md:items-end">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/40 line-through">97€</span>
                  <span className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-bold text-white">
                    47€
                  </span>
                </div>
                <span className="hidden md:inline-block rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-[2px] text-[11px] text-emerald-200">
                  Oferta de lanzamiento
                </span>
              </div>
            </div>
  
            <p className="mt-3 text-center md:text-left text-[15px] leading-6 text-white/70">
              Por solo <strong>47€</strong> accede a mi <strong>método exacto</strong> y a un
              <strong> pack premium de +2000 clips</strong> listos para usar.
            </p>
          </header>
  
          <div className="mb-5 flex flex-wrap gap-2">
            {[
              "Sin experiencia previa",
              "Kit Creator Lab",
              "GPT personalizado",
              "Funciona en cualquier nicho",
              "Acceso de por vida",
              "Chat de soporte incluido",
            ].map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                {t}
              </span>
            ))}
          </div>
  
          <div className="mb-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href="https://whop.com/creatorlaboficial/?utm_source=site&utm_medium=cta_hero"
              target="_blank"
              rel="noopener"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-cyan-400 px-5 text-sm font-semibold text-[#051018] hover:opacity-90"
            >
              Unirme ahora — 47€
            </a>
            <a href="#temario" className="px-4 py-2 rounded-md border border-white/10 hover:bg-white/10">
              Ver temario
            </a>
          </div>
  
          <section id="temario" className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">Temario — Módulos del programa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {["Módulo 0. Bienvenida", "Módulo 1. Identidad de Marca", "Módulo 2. Recursos",
                "Módulo 3. Edición Viral", "Módulo 4. IA en el día a día", "Módulo 5. Monetización"].map((m) => (
                <article key={m} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5 hover:border-white/20 transition">
                  <h3 className="font-semibold">{m}</h3>
                  <p className="mt-2 text-sm text-white/70">Contenido detallado del módulo.</p>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    );
  }
  