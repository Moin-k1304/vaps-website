'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const AboutHeroSection = () => {
  const heroContentRef = useRef<HTMLDivElement>(null)
  const heroRobotRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content animation - stagger from left
      if (heroContentRef.current) {
        const elements = heroContentRef.current.children
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            x: -100,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'expoScale(0.5,7,none)',
            delay: 0.3,
          }
        )
      }

      // Robot animation - floating entrance from right with rotation
      if (heroRobotRef.current) {
        gsap.fromTo(
          heroRobotRef.current,
          {
            opacity: 0,
            x: 150,
            y: -50,
            rotation: 15,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1.5,
            ease: 'elastic.out(1, 0.5)',
            delay: 0.5,
          }
        )

        // Continuous floating animation
        gsap.to(heroRobotRef.current, {
          y: -20,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        })
      }

      // Animated background pattern
      const dots = sectionRef.current?.querySelectorAll('.tech-dot')
      if (dots) {
        dots.forEach((dot, index) => {
          gsap.to(dot, {
            opacity: 0.3,
            scale: 1.2,
            duration: 2 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.1,
          })
        })
      }

      // Animated lines
      const lines = sectionRef.current?.querySelectorAll('.tech-line')
      if (lines) {
        lines.forEach((line, index) => {
          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 3 + index * 0.5,
            repeat: -1,
            ease: 'none',
            delay: index * 0.3,
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="about-hero-section"
    >
      {/* Animated Background Pattern */}
      <div className="hero-tech-pattern">
        <svg className="tech-pattern-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {[...Array(15)].map((_, i) => (
            <circle
              key={`dot-${i}`}
              className="tech-dot"
              cx={100 + (i % 5) * 250}
              cy={100 + Math.floor(i / 5) * 200}
              r={4}
              fill="rgba(152, 16, 250, 0.6)"
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <path
              key={`line-${i}`}
              className="tech-line"
              d={`M ${100 + i * 150} ${150 + (i % 2) * 100} Q ${300 + i * 100} ${200 + (i % 2) * 100} ${400 + i * 150} ${150 + (i % 2) * 100}`}
              stroke="rgba(152, 16, 250, 0.3)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10 10"
              strokeDashoffset="20"
            />
          ))}
        </svg>
      </div>

      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-6">
            <div ref={heroContentRef} className="hero-content">
              <h2 className="hero-subtitle">Welcome to</h2>
              <h1 className="hero-title">
                About VAPS Group
              </h1>
              <p className="hero-description">
                A digital innovation company delivering excellence evolved for over 2 decades. 
                VAPS Group has been transforming educational institutions, healthcare, and hospitality 
                sectors with cutting-edge technology solutions and innovative digital platforms.
              </p>
              <button className="cta-button">Explore Our Journey</button>
            </div>
          </div>

          {/* Right Robot */}
          <div className="col-lg-6">
            <div ref={heroRobotRef} className="hero-robot">
              <div className="robot-character">
                <Image
                  src="/images/hero-section-robot.png"
                  alt="VAPS Robot"
                  width={500}
                  height={600}
                  style={{ maxWidth: '100%', height: 'auto' }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHeroSection
