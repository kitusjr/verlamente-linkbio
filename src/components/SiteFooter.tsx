// components/SiteFooter.tsx
export default function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-8 text-center text-[12px] text-white/50">
      <div className="border-t border-white/10 pt-4">
        © {new Date().getFullYear()} VERLAMENTE — todos los derechos reservados
      </div>
    </footer>
  );
}
