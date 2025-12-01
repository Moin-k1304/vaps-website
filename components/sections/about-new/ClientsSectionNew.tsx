'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import clientsData from '@/data/about-us/clients'
import '@/app/about-us/about-new.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const   ClientsSectionNew = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

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
            scrollTrigger: {
              trigger: badgeRef.current,
              start: 'top 85%',
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
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.2,
          }
        )
      }

      // Description animation
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.4,
          }
        )
      }

      // Stats animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.5,
          }
        )
      }

      // Button animation
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: buttonRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.6,
          }
        )
      }

      // Grid animation
      if (gridRef.current) {
        const logos = gridRef.current.querySelectorAll('.client-logo-card')
        gsap.fromTo(
          logos,
          {
            opacity: 0,
            scale: 0.9,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.7,
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="clients-section-new">
      {/* Gradient Overlay */}
      <div className="clients-gradient-overlay" />

      {/* Content */}
      <div className="container-fluid px-3 px-md-4 px-lg-5 position-relative clients-content-wrapper">
        <div className="row align-items-center g-4 g-lg-5">
          {/* Left - Header Content */}
          <div className="col-12 col-lg-4">
            <div className="clients-left-content">
              {/* Badge */}
              <div ref={badgeRef} className="">
                <div className="" />
                <span className=" section-label">Our Clients</span>
              </div>

              {/* Title */}
              <h2 ref={titleRef} className="section-title" style={{ color: '#FFF' }}>
                Our Clients
              </h2>

              {/* Description */}
              <p ref={descriptionRef} className="clients-description">
                VAPS facilitates 6000+ implementations, 6 million+ active students.
              </p>

              {/* Stats */}
              <div ref={statsRef} className="clients-stats">
                <div className="client-stat-item">
                  <div className="stat-number">6000+</div>
                  <div className="section-label" style={{ fontSize: '0.8rem' }}>Implementations</div>
                </div>
                <div className="client-stat-item">
                  <div className="stat-number">6M+</div>
                  <div className="section-label" style={{ fontSize: '0.8rem' }}>Active Students</div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                ref={buttonRef}
                className="cta-button"
                style={{ minWidth: 'unset', width: 'fit-content', paddingLeft: 18, paddingRight: 18 }}
              >
                <span>View All Clients</span>
              </button>
            </div>
          </div>

          {/* Right - Client Logos Grid */}
          <div className="col-12 col-lg-8">
            <div ref={gridRef} className="clients-grid-wrapper">
              <div className="clients-grid">
                {clientsData.slice(0, 9).map((client, index) => (
                  <div key={index} className="client-logo-card">
                    <div className="logo-card-inner">
                      <div className="logo-image-wrapper">
                        <Image
                          src={client.src}
                          alt={client.alt}
                          fill
                          className="logo-image"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                      </div>
                      <div className="logo-title">
                        <span className="logo-title-text">{client.alt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="clients-more-text">and many more...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientsSectionNew
