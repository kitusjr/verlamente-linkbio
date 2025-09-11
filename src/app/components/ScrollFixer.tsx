'use client'
import { useEffect } from 'react'

export default function ScrollFixer() {
  useEffect(() => {
    // Solo en móvil
    if (window.innerWidth <= 768) {
      // Forzar scroll cada 100ms
      const forceScroll = () => {
        document.body.style.overflow = 'auto'
        document.body.style.touchAction = 'pan-y'
        document.documentElement.style.overflow = 'auto'
        
        // Buscar elementos que puedan bloquear
        const overlays = document.querySelectorAll('.fixed')
        overlays.forEach(el => {
          const style = getComputedStyle(el)
          if (style.top === '0px' && style.right === '0px' && 
              style.bottom === '0px' && style.left === '0px') {
            if (style.pointerEvents !== 'none') {
              (el as HTMLElement).style.pointerEvents = 'none'
            }
          }
        })
      }
      
      forceScroll()
      const interval = setInterval(forceScroll, 100)
      return () => clearInterval(interval)
    }
  }, [])
  
  return null
}
