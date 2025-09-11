'use client';
import { useState } from 'react';

export default function PreviewMedia() {
  const [fallbackStage, setFallbackStage] = useState<0 | 1 | 2 | 3>(0);

  if (fallbackStage === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <video
          className="block w-full aspect-[16/9] object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/creator-lab/preview.jpg"
          onError={() => setFallbackStage(1)}
        >
          <source src="/assets/creator-lab/preview.webm" type="video/webm" />
          <source src="/assets/creator-lab/preview.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

  if (fallbackStage === 1) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <img
          src="/assets/creator-lab/preview.gif"
          alt="Vista del curso por dentro"
          className="block w-full h-auto"
          onError={() => setFallbackStage(2)}
        />
      </div>
    );
  }

  if (fallbackStage === 2) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <img
          src="/assets/creator-lab/preview.jpg"
          alt="Vista del curso por dentro"
          className="block w-full h-auto"
          onError={() => setFallbackStage(3)}
        />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 aspect-[16/9] grid place-items-center">
      <p className="text-sm text-white/60">Preview no disponible</p>
    </div>
  );
}
