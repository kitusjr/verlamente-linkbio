// app/page.tsx
import CourseCard from "@/components/CourseCard";
import BannerLaunch from "@/components/BannerLaunch";

export default function Page() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-xl md:text-2xl font-bold mb-2 text-white">
            VERLAMENTE
          </h1>
          <p className="text-sm text-white/70">
            Recursos y formación para creadores
          </p>
        </header>

        <CourseCard />
      </div>

      <BannerLaunch />
    </main>
  );
}
