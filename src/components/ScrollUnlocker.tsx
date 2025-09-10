// components/ScrollUnlocker.tsx
"use client";
import { useEffect } from "react";

export default function ScrollUnlocker() {
  useEffect(() => {
    // Quita bloqueos accidentales a nivel documento
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";
    document.documentElement.classList.remove("overflow-hidden");
    document.body.classList.remove("overflow-hidden");
    // Previene bloqueos por smooth-scroll libs
    (document.scrollingElement as HTMLElement | null)?.style?.setProperty("overflow", "auto");
  }, []);
  return null;
}
