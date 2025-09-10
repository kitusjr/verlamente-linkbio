// app/page.tsx
import CourseCard from "@/components/CourseCard";
import BannerLaunch from "@/components/BannerLaunch";

export default function Page() {
  return (
    <main className="min-h-[100svh] w-full">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            VERLAMENTE — recursos y formación para creadores
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Clips, voces IA y un método real para crecer con vídeo.
          </p>
        </header>

        <div className="space-y-4">
          <CourseCard />
          {/* Aquí puedes añadir otras tarjetas/links más adelante */}
        </div>
      </section>

      <BannerLaunch />
    </main>
  );
}
