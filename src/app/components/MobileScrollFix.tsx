'use client'
import { useEffect } from 'react'

export default function MobileScrollFix() {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    
    if (isMobile) {
      const fix = () => {
        document.documentElement.style.overflow = 'auto'
        document.documentElement.style.overflowY = 'auto'
        document.documentElement.style.setProperty('-webkit-overflow-scrolling', 'touch')
        document.body.style.overflow = 'auto'
        document.body.style.overflowY = 'auto' 
        document.body.style.setProperty('-webkit-overflow-scrolling', 'touch')
        document.body.style.height = 'auto'
        document.body.style.position = 'relative'
      }
      
      fix()
      const interval = setInterval(fix, 500)
      window.addEventListener('resize', fix)
      window.addEventListener('orientationchange', () => setTimeout(fix, 100))
      
      return () => {
        clearInterval(interval)
        window.removeEventListener('resize', fix)
      }
    }
  }, [])
  
  return null
}