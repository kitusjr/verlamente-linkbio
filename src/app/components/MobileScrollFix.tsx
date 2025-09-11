'use client'

import { useEffect } from 'react'

export default function MobileScrollFix() {
  useEffect(() => {
    // DETECTAR SI ES MÓVIL
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768

    if (isMobile) {
      console.log('🔧 Aplicando fixes de scroll móvil...')
      
      // FIX 1: Forzar overflow en móvil
      const enableMobileScroll = () => {
        document.documentElement.style.overflow = 'auto'
        document.documentElement.style.overflowY = 'auto'
        document.documentElement.style.webkitOverflowScrolling = 'touch'
        
        document.body.style.overflow = 'auto'
        document.body.style.overflowY = 'auto'
        document.body.style.webkitOverflowScrolling = 'touch'
        document.body.style.height = 'auto'
        document.body.style.minHeight = '100vh'
        
        // REMOVER position fixed del body si existe
        if (document.body.style.position === 'fixed') {
          document.body.style.position = 'relative'
        }
      }
      
      enableMobileScroll()
      
      // FIX 2: Eliminar event listeners que bloqueen touch
      const removeBlockingListeners = () => {
        // Remover cualquier preventDefault en touchmove
        document.removeEventListener('touchmove', (e) => e.preventDefault())
        document.removeEventListener('touchstart', (e) => e.preventDefault())
        
        // Permitir comportamiento natural del scroll
        document.addEventListener('touchmove', () => {}, { passive: true })
      }
      
      removeBlockingListeners()
      
      // FIX 3: Forzar cada 500ms en caso de que algo lo sobrescriba
      const interval = setInterval(enableMobileScroll, 500)
      
      // FIX 4: Al cambiar orientación (común en móvil)
      const handleOrientationChange = () => {
        setTimeout(enableMobileScroll, 100)
      }
      
      window.addEventListener('orientationchange', handleOrientationChange)
      window.addEventListener('resize', enableMobileScroll)
      
      return () => {
        clearInterval(interval)
        window.removeEventListener('orientationchange', handleOrientationChange)
        window.removeEventListener('resize', enableMobileScroll)
      }
    }
  }, [])

  return null
}
