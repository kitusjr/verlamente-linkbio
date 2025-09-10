"use client";
import { useEffect } from "react";

export default function RouteScrollFix() {
  useEffect(() => {
    // Desbloquea el documento por si algún modal/menu dejó bloqueos
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";
    document.documentElement.classList.remove("overflow-hidden");
    document.body.classList.remove("overflow-hidden");
    // Asegura desplazamiento natural en móvil
    (document.scrollingElement as HTMLElement | null)?.style?.setProperty("overflow", "auto");
  }, []);
  return null;
}