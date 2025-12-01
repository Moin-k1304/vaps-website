import { useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useBasicScrollAnimation = (
  sectionRef: RefObject<HTMLElement | null>,
  contentSelector: string = '.section-header, .section-label, .section-title, .section-description'
) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        // Animate all content elements
        const elements = sectionRef.current.querySelectorAll(contentSelector)
        
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
              duration: 1,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'top 30%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }

        // Section parallax
        gsap.to(sectionRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [sectionRef, contentSelector])
}
