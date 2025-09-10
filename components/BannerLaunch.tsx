// components/BannerLaunch.tsx
export default function BannerLaunch() {
    return (
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-3xl pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 line-through">97€</span>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                47€
              </span>
            </div>
            <span className="text-slate-400">precio de lanzamiento · subirá pronto</span>
          </div>
          <a
            href="/creator-lab"
            className="shrink-0 rounded-xl bg-[linear-gradient(90deg,rgba(2,132,199,0.95),rgba(16,185,129,0.95))] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(2,132,199,0.18)] transition active:scale-[0.99] hover:brightness-110"
          >
            Unirme ahora
          </a>
        </div>
      </div>
    );
  }
  