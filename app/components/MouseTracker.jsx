'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function MouseTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Only track mouse and apply styles if on the Homepage
    const isHome = pathname === '/'
    
    if (isHome) {
      document.body.classList.add('has-home-bg')
    } else {
      document.body.classList.remove('has-home-bg')
      return // Don't add event listener
    }

    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.classList.remove('has-home-bg')
    }
  }, [pathname])

  return null
}
