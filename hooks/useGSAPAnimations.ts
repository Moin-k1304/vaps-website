import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useGSAPAnimations = () => {
  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh()
    
    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
}

// Fade in from bottom animation
export const useFadeInUp = (selector: string, delay = 0) => {
  useEffect(() => {
    const elements = gsap.utils.toArray(selector)
    
    elements.forEach((element: any, index: number) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: delay + index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && typeof trigger.vars.trigger === 'object') {
          const triggerEl = trigger.vars.trigger as Element
          if (triggerEl.matches && triggerEl.matches(selector)) {
            trigger.kill()
          }
        }
      })
    }
  }, [selector, delay])
}

// Fade in from left animation
export const useFadeInLeft = (selector: string, delay = 0) => {
  useEffect(() => {
    const elements = gsap.utils.toArray(selector)
    
    elements.forEach((element: any, index: number) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          delay: delay + index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && typeof trigger.vars.trigger === 'object') {
          const triggerEl = trigger.vars.trigger as Element
          if (triggerEl.matches && triggerEl.matches(selector)) {
            trigger.kill()
          }
        }
      })
    }
  }, [selector, delay])
}

// Fade in from right animation
export const useFadeInRight = (selector: string, delay = 0) => {
  useEffect(() => {
    const elements = gsap.utils.toArray(selector)
    
    elements.forEach((element: any, index: number) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: 100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          delay: delay + index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && typeof trigger.vars.trigger === 'object') {
          const triggerEl = trigger.vars.trigger as Element
          if (triggerEl.matches && triggerEl.matches(selector)) {
            trigger.kill()
          }
        }
      })
    }
  }, [selector, delay])
}

// Scale up animation
export const useScaleIn = (selector: string, delay = 0) => {
  useEffect(() => {
    const elements = gsap.utils.toArray(selector)
    
    elements.forEach((element: any, index: number) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: delay + index * 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && typeof trigger.vars.trigger === 'object') {
          const triggerEl = trigger.vars.trigger as Element
          if (triggerEl.matches && triggerEl.matches(selector)) {
            trigger.kill()
          }
        }
      })
    }
  }, [selector, delay])
}

// Rotate in animation
export const useRotateIn = (selector: string, delay = 0) => {
  useEffect(() => {
    const elements = gsap.utils.toArray(selector)
    
    elements.forEach((element: any, index: number) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          rotation: -180,
          scale: 0,
        },
        {
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 1.5,
          delay: delay + index * 0.2,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && typeof trigger.vars.trigger === 'object') {
          const triggerEl = trigger.vars.trigger as Element
          if (triggerEl.matches && triggerEl.matches(selector)) {
            trigger.kill()
          }
        }
      })
    }
  }, [selector, delay])
}

// Parallax effect
export const useParallax = (selector: string, speed = 0.5) => {
  useEffect(() => {
    const elements = gsap.utils.toArray(selector)
    
    elements.forEach((element: any) => {
      gsap.to(element, {
        y: () => -window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && typeof trigger.vars.trigger === 'object') {
          const triggerEl = trigger.vars.trigger as Element
          if (triggerEl.matches && triggerEl.matches(selector)) {
            trigger.kill()
          }
        }
      })
    }
  }, [selector, speed])
}

// Stagger animation for multiple elements
export const useStaggerAnimation = (selector: string, delay = 0) => {
  useEffect(() => {
    const elements = gsap.utils.toArray<HTMLElement>(selector)
    
    if (elements.length > 0) {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elements[0] as gsap.DOMTarget,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && typeof trigger.vars.trigger === 'object') {
          const triggerEl = trigger.vars.trigger as Element
          if (triggerEl.matches && triggerEl.matches(selector)) {
            trigger.kill()
          }
        }
      })
    }
  }, [selector, delay])
}

// Pin section animation
export const usePinSection = (selector: string) => {
  useEffect(() => {
    const element = document.querySelector(selector)
    
    if (element) {
      ScrollTrigger.create({
        trigger: element,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [selector])
}

// Text reveal animation
export const useTextReveal = (selector: string, delay = 0) => {
  useEffect(() => {
    const elements = gsap.utils.toArray<HTMLElement>(selector)
    
    elements.forEach((element, index: number) => {
      const text = element.textContent || ''
      element.innerHTML = text
        .split('')
        .map((char: string) => `<span style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('')
      
      const chars = element.querySelectorAll('span')
      
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.02,
          delay: delay + index * 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element as gsap.DOMTarget,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && typeof trigger.vars.trigger === 'object') {
          const triggerEl = trigger.vars.trigger as Element
          if (triggerEl.matches && triggerEl.matches(selector)) {
            trigger.kill()
          }
        }
      })
    }
  }, [selector, delay])
}
