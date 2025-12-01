'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import leadershipData from '@/data/about-us/leadership'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const TeamMembersSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  // Team members data (using leadership data and adding more)
  const teamMembers = [
    {
      name: leadershipData.name,
      role: leadershipData.role,
      image: leadershipData.image.src,
      alt: leadershipData.image.alt,
    },
    {
      name: 'Team Member 2',
      role: 'Technical Director',
      image: '/images/about_us/vaps-about.jpg',
      alt: 'Team Member',
    },
    {
      name: 'Team Member 3',
      role: 'Operations Manager',
      image: '/images/about_us/vaps-about.jpg',
      alt: 'Team Member',
    },
    {
      name: 'Team Member 4',
      role: 'Product Manager',
      image: '/images/about_us/vaps-about.jpg',
      alt: 'Team Member',
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
        const cards = cardsRef.current.querySelectorAll('.team-member-card')
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
            stagger: 0.1,
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
      className="team-members-section section-container"
    >
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-5">
          <div className="section-badge">• OUR TEAM •</div>
          <h2 className="section-main-title">
            Team Members
          </h2>
          <p className="team-intro-text">
            Meet our dedicated team of professionals who work together to deliver innovative 
            digital solutions and exceptional service to our clients.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div ref={cardsRef} className="row g-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="team-member-card">
                <div className="member-image-wrapper">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="member-overlay">
                    <div className="social-icons">
                      <a href="#" className="social-icon">📘</a>
                      <a href="#" className="social-icon">🐦</a>
                      <a href="#" className="social-icon">📷</a>
                      <a href="#" className="social-icon">✉️</a>
                    </div>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamMembersSection

