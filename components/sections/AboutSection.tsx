'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const AboutSection = () => {
  const textRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Helper function to check if element is partially visible
    const isPartiallyVisible = (element: Element | null) => {
      if (!element) return false
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      // Check if element is visible in viewport (even partially)
      return rect.top < windowHeight * 0.9 && rect.bottom > -100
    }

    let ctx: gsap.Context | null = null

    // Wait for next frame to ensure DOM is fully rendered
    const checkAndAnimate = () => {
      ctx = gsap.context(() => {
        // Text content animation - slide from left with stagger
        if (textRef.current) {
          const elements = textRef.current.querySelectorAll('.section-label, .section-title, p, .cta-button')
          const isVisible = isPartiallyVisible(textRef.current)
          
          // Set initial state only if element is not already visible
          if (!isVisible) {
            gsap.set(elements, { opacity: 0, x: -80, y: 30 })
          }

          const animation = gsap.fromTo(
            elements,
            !isVisible ? { opacity: 0, x: -80, y: 30 } : { opacity: 1, x: 0, y: 0 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: isVisible ? 0.3 : 1, // Faster if already visible
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: textRef.current,
                start: 'top 85%',
                end: 'top 30%',
                toggleActions: 'play none none reverse',
                once: true,
              },
            }
          )

          // If already in viewport, play immediately after a small delay
          if (isVisible) {
            setTimeout(() => animation.play(), 100)
          }
        }

        // Visual elements animation - scale and rotate
        if (visualRef.current) {
          const infographic = visualRef.current.querySelector('.infographic-container')
          const robot = visualRef.current.querySelector('.about-robot')
          const isVisible = isPartiallyVisible(visualRef.current)

          // Set initial state only if element is not already visible
          if (!isVisible) {
            if (infographic) {
              gsap.set(infographic, { opacity: 0, scale: 0.5, rotation: -180 })
            }
            if (robot) {
              gsap.set(robot, { opacity: 0, x: 100, y: 50 })
            }
          }

          // Infographic animation - rotate and scale
          if (infographic) {
            const infographicAnimation = gsap.fromTo(
              infographic,
              !isVisible ? { opacity: 0, scale: 0.5, rotation: -180 } : { opacity: 1, scale: 1, rotation: 0 },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: isVisible ? 0.5 : 1.5,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                  trigger: visualRef.current,
                  start: 'top 80%',
                  end: 'top 30%',
                  toggleActions: 'play none none reverse',
                  once: true,
                },
              }
            )

            if (isVisible) {
              setTimeout(() => infographicAnimation.play(), 150)
            }
          }

          // Robot animation - slide from right with bounce
          if (robot) {
            const robotAnimation = gsap.fromTo(
              robot,
              !isVisible ? { opacity: 0, x: 100, y: 50 } : { opacity: 1, x: 0, y: 0 },
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: isVisible ? 0.4 : 1.2,
                ease: 'elastic.out(1, 0.6)',
                scrollTrigger: {
                  trigger: visualRef.current,
                  start: 'top 80%',
                  end: 'top 30%',
                  toggleActions: 'play none none reverse',
                  once: true,
                },
                delay: isVisible ? 0 : 0.3,
              }
            )

            if (isVisible) {
              setTimeout(() => robotAnimation.play(), 200)
            }
          }
        }
      })
    }

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      setTimeout(checkAndAnimate, 50) // Small delay to ensure everything is rendered
    })

    return () => {
      cancelAnimationFrame(rafId)
      if (ctx) {
        ctx.revert()
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="container">
        <div className="row align-items-center">
          {/* About Text */}
          <div className="col-lg-6">
            <div ref={textRef} className="about-text">
              <div className="section-header">
                <span className="section-label">From classrooms to cloud campuses</span>
                <h2 className="section-title">
                  VAPS empowers institutions with AI-driven ERP, automation & intelligence.
                </h2>
              </div>
              <p>
                VAPS Technosoft is a pioneer in education ERP solutions, transforming the way schools, colleges,
                and universities operate. With 25 years of proven expertise, VAPS delivers AI-powered automation,
                seamless administration, and integrated analytics — helping institutions achieve efficiency,
                transparency, and academic excellence.
              </p>
              <p>
                With innovation as our foundation, we continue to redefine how schools and universities operate,
                communicate, and grow.
              </p>
            </div>
              <button className="cta-button">Learn more</button>
          </div>

          {/* About Visual */}
          <div className="col-lg-6">
            <div ref={visualRef} className="about-visual">
              <div className="infographic-container">
                <Image
                  src="/images/25_years.gif"
                  alt="25 Years of Excellence"
                  width={400}
                  height={400}
                  unoptimized
                />
              </div>
              <div className="about-robot">
                <Image
                  src="/images/about-vaps-robot-img.png"
                  alt="VAPS Robot"
                  width={400}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
