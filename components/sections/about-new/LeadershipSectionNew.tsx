'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import leadershipData from '@/data/about-us/leadership'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const LeadershipSectionNew = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
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

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.9,
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
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Content animation
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('h3, .name, .role, p')
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            x: 50,
            y: 30,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            stagger: 0.1,
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="leadership-section-new section-container"
    >
      <div className="container">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-5 section-header">
          <h2
            className="mb-3"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              color: '#03297B',
            }}
          >
            Meet Our Leadership
          </h2>
        </div>

        <div className="row align-items-center g-4">
          {/* Left - Image */}
          <div className="col-12 col-lg-4">
            <div ref={imageRef} className="position-relative">
              <div className="leadership-image-wrapper">
                <Image
                  src={leadershipData.image.src}
                  alt={leadershipData.image.alt}
                  width={400}
                  height={500}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="col-12 col-lg-8">
            <div ref={contentRef}>
              <h3
                className="mb-2"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#03297B',
                }}
              >
                {leadershipData.title}
              </h3>
              
              <div
                className="name mb-2"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#333',
                }}
              >
                {leadershipData.name}
              </div>
              
              <div
                className="role mb-4"
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: '#666',
                }}
              >
                {leadershipData.role}
              </div>

              <div className="message-content">
                <p
                  className="mb-3"
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: '#333',
                  }}
                >
                  {leadershipData.message.split('. ').slice(0, 2).join('. ')}.
                </p>
                <p
                  className="mb-0"
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: '#333',
                  }}
                >
                  {leadershipData.message.split('. ').slice(2).join('. ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeadershipSectionNew

