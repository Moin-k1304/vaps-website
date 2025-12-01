'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const LegacySection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [yearsCount, setYearsCount] = useState(0)
  const [implementationsCount, setImplementationsCount] = useState(0)
  const [decadesCount, setDecadesCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const animateCounter = useCallback(() => {
    // Animate Years
    const targetYears = 22
    const duration = 2000
    const steps = 60
    const increment = targetYears / steps
    let currentYears = 0

    const yearsTimer = setInterval(() => {
      currentYears += increment
      if (currentYears >= targetYears) {
        setYearsCount(targetYears)
        clearInterval(yearsTimer)
      } else {
        setYearsCount(Math.floor(currentYears))
      }
    }, duration / steps)

    // Animate Implementations
    const targetImpl = 6000
    let currentImpl = 0
    const implIncrement = targetImpl / steps

    const implTimer = setInterval(() => {
      currentImpl += implIncrement
      if (currentImpl >= targetImpl) {
        setImplementationsCount(targetImpl)
        clearInterval(implTimer)
      } else {
        setImplementationsCount(Math.floor(currentImpl))
      }
    }, duration / steps)

    // Animate Decades (starts at 2)
    setTimeout(() => {
      setDecadesCount(2)
    }, duration)
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return

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

      // Text animation
      if (textRef.current) {
        const elements = textRef.current.querySelectorAll('h2, p, .legacy-stats')
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
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

      // Counter animation trigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          if (!isVisible) {
            setIsVisible(true)
            animateCounter()
          }
        },
        once: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isVisible, isMounted, animateCounter])

  return (
    <section
      ref={sectionRef}
      className="legacy-section section-container"
    >
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          {/* Left Side - Image */}
          <div className="col-12 col-lg-6">
            <div ref={imageRef} className="legacy-image-wrapper">
              <div className="legacy-image-container">
                <Image
                  src="/images/about_us/vaps-about.jpg"
                  alt="VAPS Building - 22 Years of Legacy"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  className="legacy-image"
                  priority
                  onError={(e) => {
                    // Fallback to a placeholder if image doesn't exist
                    const target = e.target as HTMLImageElement
                    target.src = '/images/about_us/vaps-about.jpg'
                  }}
                />
                <div className="legacy-badge-overlay">
                  <div className="legacy-badge-content">
                    <span className="legacy-number">{yearsCount}</span>
                    <span className="legacy-label">Years Of Legacy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="col-12 col-lg-6">
            <div ref={textRef} className="legacy-text-content">
              <h2 className="section-title">
                A Digital Innovation Company Delivering Excellence Evolved For Over 2-Decades
              </h2>
              
              <div className="legacy-description">
                <p>
                  VAPS Group is a more than 2 decades old Bengaluru based digital innovation company 
                  catering to over 6000 implementations across education, hospitality and healthcare 
                  industry verticals. With a strong footprint in technology and innovative solutions, 
                  VAPS has been a popular brand amongst all major educational institutions (Schools, 
                  College, Universities, Autonomous Colleges) and schools in India & abroad since inception.
                </p>
                
                <p>
                  With a strong foundational base, team, mission and ethics VAPS has been consistently 
                  delivering quality business-essential solutions for the past 2 decades that cater to 
                  the needs of clients, their customers and help businesses/educational institutions 
                  (Schools, College, Universities, Autonomous Colleges) modernise and perpetually change 
                  with the advancements in technology and time.
                </p>
                
                <p>
                  Our mission to create a better, more inclusive and innovative solutions across industries 
                  to help businesses using technology as the power tool has been the backbone and inspiration 
                  to innovate.
                </p>
                
                <p>
                  We are proud to be the pioneers in creating legacy of excellence for 2 decades.
                </p>
              </div>

              {/* Stats */}
              <div className="legacy-stats">
                <div className="legacy-stat-item">
                  <div className="stat-number">{implementationsCount > 0 ? `${implementationsCount.toLocaleString()}+` : '0+'}</div>
                  <div className="section-label" style={{ fontSize: '0.8rem' }}>Implementations</div>
                </div>
                <div className="legacy-stat-item">
                  <div className="stat-number">{decadesCount > 0 ? `${decadesCount}+` : '0+'}</div>
                  <div  className="section-label" style={{ fontSize: '0.8rem' }}>Decades</div>
                </div>
                <div className="legacy-stat-item">
                  <div className="stat-number">3</div>
                  <div  className="section-label" style={{ fontSize: '0.8rem' }}>Industries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LegacySection

