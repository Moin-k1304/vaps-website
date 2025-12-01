'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import './VisionMissionFullScreen.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface VisionMissionFullScreenProps {
  image?: string
  visionStatement?: string
}

const VisionMissionFullScreen: React.FC<VisionMissionFullScreenProps> = ({
  image = '/images/about_us/vaps-about.jpg',
  visionStatement = 'Create technology that matters for businesses of all sizes & varieties',
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const visionRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 1.1,
            x: -50,
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
              toggleActions: 'play none none reverse',
            },
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
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Vision statement animation
      if (visionRef.current) {
        gsap.fromTo(
          visionRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.vm-card')
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  const principles = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M3 8H21" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 12H21" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 16H21" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: 'Accessible To All',
      description: 'Build products that are made for everyone. Offer technology, flexibility, affordability and innovation which is unique and adaptable.',
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
        </svg>
      ),
      title: 'Excellence In Service',
      description: 'Build strong business relationships by providing excellence in service and support for every client regardless of size.',
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
          <path d="M8 12L12 10L16 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      ),
      title: 'Innovate At Every Step',
      description: 'Be dynamic in creating innovation consistently and coherently across all products and service lines.',
    },
  ]

  return (
    <section ref={sectionRef} className="vision-mission-fullscreen">
      <div className="vm-container">
        <div className="vm-row">
          {/* Left Side - Image */}
          <div className="vm-image-col">
            <div ref={imageRef} className="vm-image-wrapper">
              <Image
                src={image}
                alt="VAPS Vision & Mission"
                fill
                className="vm-image"
                sizes="(max-width: 991px) 100vw, 50vw"
                priority
              />
              <div className="vm-image-overlay" />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="vm-content-col">
            <div className="vm-content-wrapper">
              <h2 ref={titleRef} className="vm-title">
                Our Vision & Mission
              </h2>

              <p ref={visionRef} className="vm-vision-statement">
                {visionStatement}
              </p>

              <div ref={cardsRef} className="vm-cards">
                {principles.map((principle, index) => (
                  <div key={index} className="vm-card">
                    <div className="vm-card-icon">
                      {principle.icon}
                    </div>
                    <h3 className="vm-card-title">{principle.title}</h3>
                    <p className="vm-card-description">{principle.description}</p>
                  </div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="vm-decorative-circle" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisionMissionFullScreen

