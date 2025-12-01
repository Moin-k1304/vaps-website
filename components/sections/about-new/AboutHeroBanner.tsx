'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import {
  AITechnologyIcon,
  DigitalSolutionsIcon,
  EnterpriseAutomationIcon,
  CloudMobileIcon,
} from '@/components/icons/FeatureIcons'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const AboutHeroBanner = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const leftBubblesRef = useRef<HTMLDivElement>(null)
  const rightContentRef = useRef<HTMLDivElement>(null)
  const robotWaveRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      icon: AITechnologyIcon,
      text: 'Advanced AI Technology',
    },
    {
      icon: DigitalSolutionsIcon,
      text: 'Custom Digital Solutions',
    },
    {
      icon: EnterpriseAutomationIcon,
      text: 'Enterprise Automation',
    },
    {
      icon: CloudMobileIcon,
      text: 'Cloud & Mobile Solutions',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          {
            opacity: 0,
            y: -20,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2,
          }
        )
      }

      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.4,
          }
        )
      }

      // Robot image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.85,
            y: 40,
            rotation: -5,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.6,
          }
        )

        // Continuous floating animation
        gsap.to(imageRef.current, {
          y: -12,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        })
      }

      // Robot wave effect animation
      if (robotWaveRef.current) {
        gsap.to(robotWaveRef.current, {
          scale: 1.15,
          opacity: 0.5,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      // Left bubbles animation
      if (leftBubblesRef.current) {
        const bubbles = leftBubblesRef.current.querySelectorAll('.feature-bubble')
        gsap.fromTo(
          bubbles,
          {
            opacity: 0,
            x: -60,
            scale: 0.85,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            delay: 0.8,
          }
        )
      }

      // Right content animation
      if (rightContentRef.current) {
        const elements = rightContentRef.current.children
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            x: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 1,
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="about-hero-banner"
    >
      {/* Gradient Overlay */}
      <div className="banner-gradient-overlay" />

      {/* Content */}
      <div className="container-fluid px-3 px-md-4 px-lg-5 position-relative about-hero-content-wrapper">
        {/* Top Center Title */}
        <div className="row">
          <div className="col-12 text-center mb-4 mb-md-5">
            <div ref={badgeRef} className="about-us-badge" style={{marginTop: 40}}>
              <div className="badge-accent-line" />
              <span className="badge-text">ABOUT US</span>
            </div>
            {/* <h1 ref={titleRef} className="hero-main-title">
              Who We Are
            </h1> */}
          </div>
        </div>

        <div className="row align-items-center g-4 g-lg-5">
          {/* Left - Feature Bubbles */}
          <div className="col-12 col-lg-3">
            <div ref={leftBubblesRef} className="feature-bubbles-container">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="feature-bubble">
                    <div className="bubble-icon">
                      <IconComponent className="feature-svg-icon" />
                    </div>
                    <span className="bubble-text">{feature.text}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Center - Robot Image with Wave Effect */}
          <div className="col-12 col-lg-6">
            <div className="robot-container">
              {/* Wave Effect Behind Robot */}
              <div ref={robotWaveRef} className="robot-wave-effect" />
              
              {/* Robot Image */}
              <div ref={imageRef} className="hero-banner-image-wrapper">
                <Image
                  src="/images/about-new/about-robo.png"
                  alt="VAPS Technology Robot"
                  width={600}
                  height={700}
                  className="hero-banner-image"
                  priority
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="col-12 col-lg-3">
            <div ref={rightContentRef} className="hero-right-content">
            <h1 ref={titleRef}>
              Who Are we ?
            </h1>
              <p className="hero-description-text">
                We are a future-driven technology company delivering custom digital solutions 
                across web, mobile, AI, cloud, and enterprise automation.
              </p>

              <div className="hero-cta-buttons">
                <button className="cta-button">
                  <span>Request a Demo</span>
                </button>
                <button className="cta-button secondary" >
                  <span>How it works?</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHeroBanner
