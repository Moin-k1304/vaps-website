'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const IntroductionFeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      icon: '💰',
      title: 'Best Price Guaranteed',
      description: 'We offer competitive pricing with guaranteed best rates for all our digital solutions and services.',
      gradient: 'linear-gradient(135deg, #9810FA 0%, #7445DF 100%)',
    },
    {
      icon: '📊',
      title: 'Finance Analysis',
      description: 'Comprehensive financial analysis and reporting tools to help institutions make informed decisions.',
      gradient: 'linear-gradient(135deg, #03297B 0%, #1a4ba3 100%)',
    },
    {
      icon: '👥',
      title: 'Professional Team',
      description: 'Our experienced team of experts is dedicated to delivering excellence in every project we undertake.',
      gradient: 'linear-gradient(135deg, #9810FA 0%, #03297B 100%)',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const elements = headerRef.current.querySelectorAll('.section-badge, h2, p')
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.intro-feature-card')
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              end: 'top 40%',
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
      className="introduction-features-section section-container"
    >
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-5">
          <div className="section-badge">• ABOUT US •</div>
          <h2 className="section-main-title">
            <span className="title-highlight">Introduction To</span>
            <br />
            Best Digital Innovation Company!
          </h2>
        </div>

        <div className="row g-5 align-items-center">
          {/* Left - Text Content */}
          <div className="col-12 col-lg-5">
            <div className="intro-text-content">
              <p className="intro-paragraph">
                VAPS Group is a more than 2 decades old Bengaluru based digital innovation company 
                catering to over 6000 implementations across education, hospitality and healthcare 
                industry verticals.
              </p>
              <p className="intro-paragraph">
                With a strong footprint in technology and innovative solutions, VAPS has been a 
                popular brand amongst all major educational institutions (Schools, College, 
                Universities, Autonomous Colleges) and schools in India & abroad since inception.
              </p>
            </div>
          </div>

          {/* Right - Feature Cards */}
          <div className="col-12 col-lg-7">
            <div ref={cardsRef} className="row g-4">
              {features.map((feature, index) => (
                <div key={index} className="col-12 col-md-6">
                  <div
                    className="intro-feature-card"
                    style={{
                      background: feature.gradient,
                    }}
                  >
                    <div className="feature-icon-box">
                      <span className="feature-icon">{feature.icon}</span>
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroductionFeaturesSection

