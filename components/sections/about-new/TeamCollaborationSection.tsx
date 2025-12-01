'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const TeamCollaborationSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const mainImageRef = useRef<HTMLDivElement>(null)
  const videoCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main image animation
      if (mainImageRef.current) {
        gsap.fromTo(
          mainImageRef.current,
          {
            opacity: 0,
            scale: 0.95,
            x: -50,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mainImageRef.current,
              start: 'top 85%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Video card animation
      if (videoCardRef.current) {
        gsap.fromTo(
          videoCardRef.current,
          {
            opacity: 0,
            scale: 0.9,
            x: 50,
            y: 50,
            rotation: -5,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: videoCardRef.current,
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
      className="team-collaboration-section section-container"
    >
      <div className="container-fluid px-0">
        <div className="row g-0 position-relative">
          {/* Main Team Image */}
          <div className="col-12 col-lg-8 position-relative">
            <div ref={mainImageRef} className="team-main-image">
              <Image
                src="/images/about_us/vaps-about.jpg"
                alt="Team Collaboration"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
            
            {/* Video Card Overlay - Positioned absolutely */}
            <div ref={videoCardRef} className="video-card-overlay">
              <div className="video-card-image">
                <Image
                  src="/images/about_us/managing-director.png"
                  alt="Video Thumbnail"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 90vw, 350px"
                />
                <div className="play-button">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)" />
                    <path
                      d="M24 20L24 40L38 30L24 20Z"
                      fill="#9810FA"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamCollaborationSection

