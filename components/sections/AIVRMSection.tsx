'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const AIVRMSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const robotRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Robot animation - scale entrance only (no rotation since it's a gif)
      if (robotRef.current) {
        gsap.fromTo(
          robotRef.current,
          {
            opacity: 0,
            scale: 0.3,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: robotRef.current,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Content animation - stagger from right
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.section-title, .section-description, .cta-button')
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            x: 100,
            y: 50,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="aivrm-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div ref={robotRef} className="orbital-system">
              <div className="central-robot">
                <Image
                  src="/images/robot with circled icon.gif"
                  alt="Central Robot with Orbital Icons"
                  width={800}
                  height={800}
                  style={{ width: '100%', maxWidth: '100%' }}
                  unoptimized
                />
                <Image
                  src="/images/robot-top.png"
                  alt="Overlay Robot"
                  width={200}
                  height={200}
                  className="robot-top"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div ref={contentRef}>
              <div className="section-header">
                <h2 className="section-title white">
                  Ready to Build Your AI Smart Campus?
                </h2>
              </div>
              <p className="section-description white">Experience the future of education management with AIVRM</p>
              <button className="cta-button secondary">Get a Free Demo</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIVRMSection
