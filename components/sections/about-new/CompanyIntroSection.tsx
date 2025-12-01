'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const CompanyIntroSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const legacyBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text content animation
      if (textRef.current) {
        const elements = textRef.current.querySelectorAll('h2, .intro-text, p')
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            x: -80,
            y: 30,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.9,
            x: 50,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
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

      // Legacy box animation
      if (legacyBoxRef.current) {
        gsap.fromTo(
          legacyBoxRef.current,
          {
            opacity: 0,
            scale: 0.8,
            y: 50,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: legacyBoxRef.current,
              start: 'top 85%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.3,
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="company-intro-section section-container"
    >
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          {/* Left - Building Image */}
          <div className="col-12 col-lg-6">
            <div ref={imageRef} className="position-relative" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <Image
                src="/images/about_us/campus architecture.png"
                alt="VAPS Digital Campus Architecture"
                width={600}
                height={700}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
                priority
              />
              
              {/* Legacy Box Overlay */}
              <div
                ref={legacyBoxRef}
                className="position-absolute legacy-box"
                style={{
                  bottom: '30px',
                  left: '30px',
                  zIndex: 2,
                }}
              >
                <div className="legacy-number">22</div>
                <div style={{ fontSize: '1rem', color: '#334155', fontWeight: 600, lineHeight: 1.3 }}>
                  Years Of Legacy
                </div>
              </div>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="col-12 col-lg-6">
            <div ref={textRef} className="intro-content-card">
              <h2
                className="mb-4"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}
              >
                <span style={{ 
                  background: 'linear-gradient(135deg, #03297B 0%, #9810FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'block',
                }}>
                  A Digital Innovation Company
                </span>
                <span style={{ 
                  background: 'linear-gradient(135deg, #9810FA 0%, #03297B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'block',
                }}>
                  Delivering Excellence Evolved
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85em', display: 'block', marginTop: '0.5rem' }}>
                  For Over 2-Decades
                </span>
              </h2>

              <div className="intro-text">
                <p className="mb-4">
                  VAPS Group is a more than 2 decades old Bengaluru based digital innovation company 
                  catering to over 6000 implementations across education, hospitality and healthcare 
                  industry verticals. With a strong footprint in technology and innovative solutions, 
                  VAPS has been a popular brand amongst all major educational institutions (Schools, 
                  College, Universities, Autonomous Colleges) and schools in India & abroad since inception.
                </p>
                
                <p className="mb-4">
                  With a strong foundational base, team, mission and ethics VAPS has been consistently 
                  delivering quality business-essential solutions for the past 2 decades that cater to 
                  the needs of clients, their customers and help businesses/educational institutions 
                  (Schools, College, Universities, Autonomous Colleges) modernise and perpetually change 
                  with the advancements in technology and time.
                </p>
                
                <p className="mb-4">
                  Our mission to create a better, more inclusive and innovative solutions across industries 
                  to help businesses using technology as the power tool has been the backbone and inspiration 
                  to innovate.
                </p>
                
                <p style={{ fontWeight: 700, color: '#03297B', fontSize: '1.15rem', marginBottom: 0 }}>
                  We are proud to be the pioneers in creating legacy of excellence for 2 decades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyIntroSection

