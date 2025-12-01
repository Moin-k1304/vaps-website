'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const HeroSection = () => {
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
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        backgroundImage: `url('/images/hero-section-background-img.png')`,
        backgroundSize: 'cover',
        backgroundPosition: '100% 100%'
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div ref={heroContentRef} className="hero-content">
              <h2>Pioneering the Future of Education with</h2>
              <h1 className="hero-title">
                India's First AI-Integrated School System
              </h1>
              <p className="hero-description">
                VAPS advanced e-learning enables educational institutions (Schools, College, Universities, Autonomous Colleges)
                teach smarter, better and deliver quality classes to their students.
              </p>
              <button className="cta-button">Learn more</button>
            </div>
          </div>

          <div className="col-lg-6">
            <div ref={heroRobotRef} className="hero-robot">
              <div className="robot-character">
                <Image
                  src="/images/hero-section-robot.png"
                  alt="Robotic Assistant"
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

export default HeroSection
