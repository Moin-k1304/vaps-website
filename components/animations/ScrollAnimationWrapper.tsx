'use client'

import { useEffect, useRef, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollAnimationWrapperProps {
  children: ReactNode
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate' | 'parallax'
  delay?: number
  duration?: number
  stagger?: boolean
  className?: string
  threshold?: number // 0-100, percentage from top of viewport where animation triggers
}

export const ScrollAnimationWrapper = ({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 1,
  stagger = false,
  className = '',
  threshold = 85, // Default: triggers when element is 85% from top of viewport
}: ScrollAnimationWrapperProps) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!elementRef.current) return

      const element = elementRef.current
      const targets = stagger ? element.children : element

      let fromVars: gsap.TweenVars = {}
      let toVars: gsap.TweenVars = {
        duration,
        delay,
        ease: 'power3.out',
      }

      switch (animation) {
        case 'fadeUp':
          fromVars = { opacity: 0, y: 50 }
          toVars = { ...toVars, opacity: 1, y: 0, ease: 'power2.out' }
          break
        case 'fadeLeft':
          fromVars = { opacity: 0, x: -50 }
          toVars = { ...toVars, opacity: 1, x: 0, ease: 'power2.out' }
          break
        case 'fadeRight':
          fromVars = { opacity: 0, x: 50 }
          toVars = { ...toVars, opacity: 1, x: 0, ease: 'power2.out' }
          break
        case 'scale':
          fromVars = { opacity: 0, scale: 0.9 }
          toVars = { ...toVars, opacity: 1, scale: 1, ease: 'power2.out' }
          break
        case 'rotate':
          fromVars = { opacity: 0, scale: 0.9 }
          toVars = { ...toVars, opacity: 1, scale: 1, ease: 'power2.out' }
          break
        case 'parallax':
          toVars = {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
          gsap.to(element, toVars)
          return
      }

      if (stagger) {
        toVars.stagger = 0.15
      }

      toVars.scrollTrigger = {
        trigger: element,
        start: `top ${threshold}%`,
        end: 'top 30%',
        toggleActions: 'play none none none', // Don't reverse for better performance
        markers: false,
        refreshPriority: -1, // Lower priority for better performance
        once: true, // Only animate once for better performance
      }

      gsap.fromTo(targets, fromVars, toVars)
    })

    return () => ctx.revert()
  }, [animation, delay, duration, stagger, threshold])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
