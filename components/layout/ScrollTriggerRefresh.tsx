'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ScrollTriggerRefresh = () => {
  useEffect(() => {
    // Ensure no horizontal scroll
    const preventHorizontalScroll = () => {
      const html = document.documentElement
      const body = document.body

      // Force overflow-x hidden
      html.style.overflowX = 'hidden'
      // body.style.overflowX = 'hidden'
      html.style.width = '100%'
      body.style.width = '100%'

      // Check if there's any horizontal overflow and fix it
      if (body.scrollWidth > window.innerWidth) {
        console.warn('Horizontal overflow detected, fixing...')
        body.style.maxWidth = '100vw'
        html.style.maxWidth = '100vw'
      }
    }

    // Run on mount
    preventHorizontalScroll()

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      preventHorizontalScroll()
      ScrollTrigger.refresh()
    }

    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 250)
    }

    window.addEventListener('resize', debouncedResize)
    window.addEventListener('orientationchange', handleResize)

    // Initial refresh after a short delay to ensure all components are mounted
    const initialRefresh = setTimeout(() => {
      ScrollTrigger.refresh()
      preventHorizontalScroll()
    }, 100)

    return () => {
      clearTimeout(initialRefresh)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', debouncedResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return null
}

export default ScrollTriggerRefresh

