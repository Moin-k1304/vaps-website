'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const VisionMissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            x: -50,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Content animation
      if (contentRef.current) {
        const title = contentRef.current.querySelector('.section-title')
        const intro = contentRef.current.querySelector('.intro-text')
        
        if (title) {
          gsap.fromTo(
            title,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }

        if (intro) {
          gsap.fromTo(
            intro,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
              },
              delay: 0.2,
            }
          )
        }
      }

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.vision-card')
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="vision-mission-section section-container"
    >
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Left - Image */}
          <div className="col-12 col-lg-5">
            <div ref={imageRef} className="position-relative" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <Image
                src="/images/about_us/vaps-about.jpg"
                alt="Team Meeting"
                width={500}
                height={600}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="col-12 col-lg-7">
            <div ref={contentRef}>
              <h2
                className="text-white mb-5"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Our Vision & Mission
              </h2>

              <p
                className="intro-text text-white mb-5"
                style={{
                  fontSize: '1.2rem',
                  lineHeight: 1.8,
                  fontWeight: 400,
                }}
              >
                Create technology that matters for businesses of all sizes & varieties
              </p>

              {/* Cards */}
              <div ref={cardsRef} className="row g-4">
                <div className="col-12">
                  <div className="vision-card">
                    <div className="d-flex align-items-start gap-3">
                      <div className="vision-icon flex-shrink-0">
                        📄
                      </div>
                      <div>
                        <h3 className="text-white mb-2" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                          Accessible To All
                        </h3>
                        <p className="text-white mb-0" style={{ fontSize: '1rem', lineHeight: 1.7, opacity: 0.9 }}>
                          Build products that are made for everyone. Offer technology, flexibility, 
                          affordability and innovation which is unique and adaptable.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="vision-card">
                    <div className="d-flex align-items-start gap-3">
                      <div className="vision-icon flex-shrink-0">
                        ⭐
                      </div>
                      <div>
                        <h3 className="text-white mb-2" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                          Excellence In Service
                        </h3>
                        <p className="text-white mb-0" style={{ fontSize: '1rem', lineHeight: 1.7, opacity: 0.9 }}>
                          Build strong business relationships by providing excellence in service and 
                          support for every client.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisionMissionSection

