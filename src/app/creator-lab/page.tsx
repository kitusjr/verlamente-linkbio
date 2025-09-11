"use client";

import { useEffect, useRef } from "react";
import styles from "./fade-scroll.module.css";
import RouteScrollFix from "@/components/RouteScrollFix";
import SiteFooter from "@/components/SiteFooter";
import PreviewMedia from "@/components/PreviewMedia";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      el.classList.add(styles.scrolling);
      clearTimeout(t);
      t = setTimeout(() => el.classList.remove(styles.scrolling), 700);
    };
    el.addEventListener("scroll", onScroll);

    // --- anclas internas dentro del contenedor ---
    const onClickAnchor = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute('href')!.slice(1);
      if (!id) return;
      const anchorEl = el.querySelector(`#${CSS.escape(id)}`) as HTMLElement | null;
      if (anchorEl) {
        e.preventDefault();
        anchorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Actualiza la barra de direcciones sin recargar
        history.replaceState(null, '', `#${id}`);
      }
    };
    el.addEventListener('click', onClickAnchor);

    // Si la página ya se abre con #hash, desplázate a ese id
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const anchorEl = el.querySelector(hash) as HTMLElement | null;
        if (anchorEl) {
          requestAnimationFrame(() => {
            anchorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      }
    };
    scrollToHash();

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener('click', onClickAnchor);
    };
  }, []);

  return (
    <>
      <RouteScrollFix />
      {/* Wrapper de ruta: identifica esta página para aplicar estilos locales */}
      <div id="creator-lab-page" className="flex min-h-[100svh] w-full flex-col">
        {/* Área SCROLLEABLE: min-h-0 + flex-1 son CLAVE si hay padres display:flex */}
        <div id="cl-scroll" className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div ref={ref} className={`${styles.fadeScroll} ${styles.viewport} min-h-[100svh] overflow-x-hidden`}>
            <main className="w-full px-4 md:px-6 max-w-[1160px] lg:max-w-[1240px] xl:max-w-[1320px] mx-auto pt-6 md:pt-8 pb-[max(96px,env(safe-area-inset-bottom))] text-foreground">
              <header className="mb-5 md:mb-7">
                <h1 className="sr-only">Creator Lab — Crea vídeos virales en minutos con el mismo sistema que uso cada día.</h1>

                <div className="flex flex-col items-center justify-between gap-3 md:flex-row md:gap-6">
                  <img
                    src="/logopng.png"
                    alt="Creator Lab"
                    className="h-auto w-[220px] md:w-[340px] drop-shadow-[0_6px_30px_rgba(255,255,255,0.08)]"
                  />
                  <div className="flex items-center gap-2 md:flex-col md:items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/40 line-through">97€</span>
                      <span className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-bold text-white">47€</span>
                    </div>
                    <span className="hidden md:inline-block rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-[2px] text-[11px] text-emerald-200">
                      Oferta de lanzamiento
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-center md:text-left text-[15px] leading-6 text-white/70">
                  Por solo <strong>47€</strong> accede a mi <strong>método exacto</strong> y a un <strong>pack premium de +2000 clips</strong> listos para usar.
                </p>
              </header>

              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">Sin experiencia previa</span>
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">Kit Creator Lab</span>
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">GPT personalizado</span>
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">Funciona en cualquier nicho</span>
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">Acceso de por vida</span>
                <a href="#chat" className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70 hover:border-cyan-400/40">
                  Chat de soporte incluido
                </a>
              </div>

              <div className="space-y-6 md:space-y-8 xl:space-y-10">
                <section className="mb-5">
                  <h2 className="sr-only">Vista del curso por dentro</h2>
                  <PreviewMedia />
                </section>

                <div className="mb-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <a href="https://whop.com/creatorlaboficial/?utm_source=site&utm_medium=cta_hero"
                     target="_blank" rel="noopener"
                     className="inline-flex h-11 items-center justify-center rounded-xl bg-cyan-400 px-5 text-sm font-semibold text-[#051018] hover:opacity-90">
                    Unirme ahora — 47€
                  </a>
                  <a href="#temario" className="px-4 py-2 rounded-md border border-white/10 hover:bg-white/10">
                    Ver temario
                  </a>
                </div>

                <section className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7 mb-5 md:mb-6">
                  <h2 className="text-xl font-semibold mb-3">Lo que te llevas hoy</h2>
                  <ul className="space-y-3 text-[15px] leading-6 text-white/80 list-disc list-inside marker:text-white/50">
                    <li><strong>Flujo completo</strong> en Premiere (replicable en CapCut) para pasar de idea a vídeo vídeo viral en 20 min.</li>
                    <li><strong>Kit Creator Lab</strong>: +2000 clips, overlays, transiciones, bordes, canciones virales y SFX.</li>
                    <li><strong>GPT personalizado</strong> para guiones virales: reestructura, humaniza y añade emoción en 1 clic.</li>
                    <li>Tutoriales A→Z: voz con IA, subtítulos + estilo, ritmo de cortes, color, watermark, miniaturas.</li>
                    <li>Acceso de por vida y futuras actualizaciones.</li>
                  </ul>
                </section>

                <section className="mb-6 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="font-semibold">Actualizaciones de por vida</h3>
                    <p className="mt-1 text-sm text-white/70">Cada mejora del kit (clips, overlays y más) se añade a tu acceso sin coste extra.</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                    <h3 className="font-semibold text-emerald-200">Oferta de lanzamiento</h3>
                    <p className="mt-1 text-sm text-emerald-100/80">Hoy 47€ <span className="text-white/60 line-through">97€</span>. El precio subirá.</p>
                  </div>
                </section>

                <section
                  aria-labelledby="temario"
                  className="mx-auto w-full max-w-6xl xl:max-w-7xl px-4 md:px-6 mt-10 md:mt-14"
                >
                  <h2 id="temario" className="text-xl font-semibold mb-6">
                    Temario — Módulos del programa
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {/* Módulo 0 */}
                    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5 hover:border-white/20 transition">
                      <h3 className="text-foreground font-semibold tracking-tight">
                        Módulo 0. Bienvenida – Tu Ruta en Creator Lab
                      </h3>
                      <ul className="mt-3 space-y-1.5 text-[13px] md:text-sm text-white/80 list-disc list-inside marker:text-white/50">
                        <li>Cómo sacar el máximo partido al programa</li>
                        <li>Mentalidad: de consumidor a dueño de una marca rentable</li>
                      </ul>
                    </article>

                    {/* Módulo 1 */}
                    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5 hover:border-white/20 transition">
                      <h3 className="text-foreground font-semibold tracking-tight">
                        Módulo 1. Construye tu Identidad de Marca Viral
                      </h3>
                      <ul className="mt-3 space-y-1.5 text-[13px] md:text-sm text-white/80 list-disc list-inside marker:text-white/50">
                        <li>Tu factor único: cómo destacar frente a todos</li>
                        <li>Tu marca de adentro hacia afuera – Guía para definir tu identidad</li>
                        <li>Diseña tu logo con propósito</li>
                        <li>Construye una marca especial – Guía PDF</li>
                        <li>Pack de tipografías – Encuentra la tipografía ideal de tu marca</li>
                        <li>Locución con IA – Crea una voz profesional para tu marca</li>
                      </ul>
                    </article>

                    {/* Módulo 2 */}
                    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5 hover:border-white/20 transition">
                      <h3 className="text-foreground font-semibold tracking-tight">
                        Módulo 2. Todo lo que Necesitas para Empezar a Editar
                      </h3>
                      <ul className="mt-3 space-y-1.5 text-[13px] md:text-sm text-white/80 list-disc list-inside marker:text-white/50">
                        <li>Cómo encontrar cualquier clip en minutos</li>
                        <li>Kit de recursos Creator Lab</li>
                      </ul>
                    </article>

                    {/* Módulo 3 */}
                    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5 hover:border-white/20 transition">
                      <h3 className="text-foreground font-semibold tracking-tight">
                        Módulo 3. Edición Viral Paso a Paso
                      </h3>
                      <ul className="mt-3 space-y-1.5 text-[13px] md:text-sm text-white/80 list-disc list-inside marker:text-white/50">
                        <li>Edita como un pro – Edición pro con Premiere Pro</li>
                        <li>Cómo crear miniaturas</li>
                      </ul>
                    </article>

                    {/* Módulo 4 */}
                    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5 hover:border-white/20 transition">
                      <h3 className="text-foreground font-semibold tracking-tight">
                        Módulo 4. Cómo Utilizo la Inteligencia Artificial en mi Día a Día
                      </h3>
                      <ul className="mt-3 space-y-1.5 text-[13px] md:text-sm text-white/80 list-disc list-inside marker:text-white/50">
                        <li>Mi flujo de trabajo diario con IA</li>
                        <li>Mis prompts favoritos para IA (PDF)</li>
                        <li>Mi GPT secreto para crear guiones virales</li>
                      </ul>
                    </article>

                    {/* Módulo 5 */}
                    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5 hover:border-white/20 transition">
                      <h3 className="text-foreground font-semibold tracking-tight">
                        Módulo 5. Cómo Monetizar tu Contenido como Creador Digital
                      </h3>
                      <ul className="mt-3 space-y-1.5 text-[13px] md:text-sm text-white/80 list-disc list-inside marker:text-white/50">
                        <li>Guía avanzada de monetización</li>
                      </ul>
                    </article>
                  </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-6">
                  <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Creator Lab — acceso de por vida</h3>
                      <ul className="mt-2 list-disc list-inside text-sm text-white/80 marker:text-white/50">
                        <li>Mi flujo de trabajo completo (Premiere y replicable en CapCut) para pasar de idea a vídeo viral en 20 min.</li>
                        <li>Kit con +2000 clips, overlays y SFX.</li>
                        <li>GPT de guiones virales listo para usar.</li>
                        <li>Actualizaciones futuras del kit incluidas.</li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs text-white/40 line-through">97€</div>
                        <div className="text-xl font-extrabold">47€</div>
                      </div>
                      <a href="https://whop.com/creatorlaboficial/?utm_source=site&utm_medium=cta_mid" target="_blank" rel="noopener"
                         className="h-11 rounded-xl bg-cyan-400 px-5 text-sm font-semibold leading-[44px] text-[#051018] hover:opacity-90">
                         Unirme ahora
                      </a>
                    </div>
                  </div>
                </section>

                <section id="faqs" className="mb-20">
                  <h2 className="mb-3 text-xl font-semibold">Preguntas frecuentes</h2>
                  <div className="space-y-3 text-sm">
                    <details className="rounded-lg border border-white/10 bg-white/5 p-3" open>
                      <summary className="cursor-pointer text-white">¿Necesito experiencia editando?</summary>
                      <p className="mt-2 text-white/70">No. Empiezas desde cero y terminas publicando.</p>
                    </details>
                    <details className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <summary className="cursor-pointer text-white">¿Premiere o CapCut?</summary>
                      <p className="mt-2 text-white/70">Te enseño con Premiere. El mismo flujo se replica en CapCut sin problemas.</p>
                    </details>
                    <details className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <summary className="cursor-pointer text-white">¿Sirve solo para psicología?</summary>
                      <p className="mt-2 text-white/70">Funciona en cualquier nicho. El método es transversal.</p>
                    </details>
                    <details className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <summary className="cursor-pointer text-white">¿Qué pasa tras pagar?</summary>
                      <p className="mt-2 text-white/70">Acceso inmediato en Whop al curso y al Kit Creator Lab.</p>
                    </details>
                  </div>
                </section>

              </div>
              <SiteFooter />
            </main>
          </div>
        </div>
      </div>

      {/* Overrides LOCALES SOLO PARA ESTA RUTA (no tocan global) */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* 1) Neutraliza overlays decorativos que cubren toda la pantalla */
          #creator-lab-page .fixed.inset-0 { pointer-events: none; z-index: -1; }
          /* Si algún overlay viene por estilo inline */
          #creator-lab-page [style*="position: fixed"][style*="inset: 0"] { pointer-events: none; z-index: -1; }

          /* 2) Anula alturas fijas que encajonan (h-screen) dentro de esta ruta */
          #creator-lab-page .h-screen { height: auto; min-height: 100svh; }

          /* 3) Desbloquea contenedores que oculten el scroll por overflow-hidden */
          #creator-lab-page .overflow-hidden { overflow: visible; }

          /* 4) Asegura scroll fluido en móviles */
          html, body { -webkit-overflow-scrolling: touch; touch-action: pan-y; }
          #cl-scroll { overscroll-behavior-y: contain; }
        `
      }} />
    </>
  );
}