'use client'
import { useEffect } from 'react'

export default function TouchUnlocker() {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    
    if (isMobile) {
      // DESTRUIR TODOS los elementos que puedan bloquear touch
      const destroyBlockers = () => {
        // Buscar elementos problemáticos
        const fixedElements = document.querySelectorAll('.fixed')
        const absoluteElements = document.querySelectorAll('[style*="position: fixed"], [style*="position: absolute"]')
        
        Array.from(fixedElements).concat(Array.from(absoluteElements)).forEach(el => {
          const computed = getComputedStyle(el)
          
          // Si es un overlay full-screen sin pointer-events-none
          if (
            (computed.top === '0px' && computed.left === '0px' && 
             computed.right === '0px' && computed.bottom === '0px') &&
            computed.pointerEvents !== 'none'
          ) {
            console.log('🔥 Destruyendo bloqueador:', el)
            // Hacerlo no interactivo
            el.style.pointerEvents = 'none'
            // O moverlo atrás
            el.style.zIndex = '-1'
          }
        })
        
        // FORZAR scroll habilitado
        document.body.style.overflow = 'auto'
        document.body.style.touchAction = 'auto'
        document.documentElement.style.overflow = 'auto'
        document.documentElement.style.touchAction = 'auto'
        
        // Permitir scroll momentum en iOS
        document.body.style.webkitOverflowScrolling = 'touch'
      }
      
      destroyBlockers()
      
      // Repetir cada 200ms por si se regenera
      const interval = setInterval(destroyBlockers, 200)
      
      return () => clearInterval(interval)
    }
  }, [])
  
  return <></>
}
