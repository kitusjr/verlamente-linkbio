'use client'
import { useEffect } from 'react'

export default function MobileScrollFix() {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    
    if (isMobile) {
      const fix = () => {
        // FORCE HTML ELEMENT
        document.documentElement.style.overflow = 'auto'
        document.documentElement.style.overflowY = 'auto'
        document.documentElement.style.setProperty('-webkit-overflow-scrolling', 'touch')
        document.documentElement.style.height = 'auto'
        document.documentElement.style.position = 'relative'
        
        // FORCE BODY ELEMENT
        document.body.style.overflow = 'auto'
        document.body.style.overflowY = 'auto' 
        document.body.style.setProperty('-webkit-overflow-scrolling', 'touch')
        document.body.style.height = 'auto'
        document.body.style.position = 'relative'
        document.body.style.maxHeight = 'none'
        
        // FORCE MAIN CONTAINERS
        const main = document.querySelector('main')
        if (main) {
          main.style.overflow = 'auto'
          main.style.overflowY = 'auto'
          main.style.setProperty('-webkit-overflow-scrolling', 'touch')
          main.style.height = 'auto'
          main.style.position = 'relative'
        }
        
        // FORCE SCROLL CONTAINERS
        const homeScroll = document.getElementById('home-scroll')
        if (homeScroll) {
          homeScroll.style.overflow = 'auto'
          homeScroll.style.overflowY = 'auto'
          homeScroll.style.setProperty('-webkit-overflow-scrolling', 'touch')
          homeScroll.style.height = 'auto'
        }
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