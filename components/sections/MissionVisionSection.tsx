'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import './MissionVisionSection.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface MissionVisionCard {
  icon: string
  title: string
  description: string
}

interface MissionVisionSectionProps {
  title: string
  cards: MissionVisionCard[]
}

// SVG Icon Components - Professional
const LegacyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7V20H21V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
    <rect x="6" y="10" width="2" height="8" fill="currentColor" opacity="0.8"/>
    <rect x="11" y="10" width="2" height="8" fill="currentColor" opacity="0.8"/>
    <rect x="16" y="10" width="2" height="8" fill="currentColor" opacity="0.8"/>
    <path d="M3 7L12 3L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
    <rect x="10" y="14" width="4" height="6" rx="1" fill="currentColor" opacity="0.6"/>
  </svg>
)

const MissionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="6" cy="9" r="1.5" fill="currentColor" opacity="0.8"/>
    <circle cx="18" cy="15" r="1.5" fill="currentColor" opacity="0.8"/>
  </svg>
)

const VisionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
    <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
    <ellipse cx="12" cy="12" rx="9" ry="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
    <path d="M3 12L21 12" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    <path d="M12 3L12 21" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.7"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </svg>
)

const getIconComponent = (iconType: string) => {
  switch (iconType) {
    case '🏛️':
      return <LegacyIcon />
    case '⚡':
      return <MissionIcon />
    case '🌐':
      return <VisionIcon />
    default:
      return <LegacyIcon />
  }
}

const getIconColor = (iconType: string) => {
  switch (iconType) {
    case '🏛️':
      return '#8B4513'
    case '⚡':
      return '#FFD700'
    case '🌐':
      return '#3B82F6'
    default:
      return '#9810fa'
  }
}

const MissionVisionSection: React.FC<MissionVisionSectionProps> = ({
  title,
  cards,
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    let pinTrigger: ScrollTrigger | null = null
    let resizeHandler: (() => void) | null = null

    const ctx = gsap.context(() => {
      // Sticky left side with proper pinning (desktop only)
      if (leftContentRef.current && sectionRef.current && typeof window !== 'undefined' && window.innerWidth >= 992) {
        pinTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: leftContentRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        })

        // Handle window resize
        resizeHandler = () => {
          if (typeof window !== 'undefined') {
            if (window.innerWidth < 992 && pinTrigger) {
              pinTrigger.kill()
              pinTrigger = null
              ScrollTrigger.refresh()
            } else if (window.innerWidth >= 992 && !pinTrigger && leftContentRef.current && sectionRef.current) {
              pinTrigger = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                pin: leftContentRef.current,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              })
              ScrollTrigger.refresh()
            }
          }
        }

        if (typeof window !== 'undefined') {
          window.addEventListener('resize', resizeHandler)
        }
      }

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.9,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Continuous floating animation
        gsap.to(imageRef.current, {
          y: -15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.5,
        })
      }

      // Title animation
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.title-word')
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 30,
            rotationX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Cards animation
      cardRefs.current.forEach((card, index) => {
        if (!card) return

        const icon = iconRefs.current[index]
        const titleEl = card.querySelector('h3')
        const descEl = card.querySelector('p')

        gsap.set(card, {
          opacity: 0,
          y: 60,
          scale: 0.95,
        })

        gsap.set(icon, {
          scale: 0,
          rotation: -180,
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })

        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.15,
        })
        .to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, '-=0.5')
        .to(titleEl, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.4')
        .to(descEl, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.3')

        // Floating icon animation
        if (icon) {
          gsap.to(icon, {
            y: '+=10',
            duration: 2.5 + index * 0.3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1.5 + index * 0.2,
          })
        }

        // Hover animations
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
          })
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotation: 5,
              duration: 0.4,
              ease: 'back.out(1.7)',
            })
          }
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          })
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.4,
              ease: 'power2.out',
            })
          }
        })
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      if (pinTrigger) {
        pinTrigger.kill()
      }
      if (resizeHandler && typeof window !== 'undefined') {
        window.removeEventListener('resize', resizeHandler)
      }
    }
  }, [cards])

  const titleWords = title.split(' ')

  return (
    <section ref={sectionRef} className="mission-vision-section-new">
      {/* Background Effects */}
      <div className="mission-vision-bg-overlay" />

      <div className="container">
        <div className="row g-0">
          {/* Left Side - Sticky with Image */}
          <div className="col-12 col-lg-5">
            <div ref={leftContentRef} className="mission-vision-left-sticky">
              {/* Image */}
              <div ref={imageRef} className="mission-vision-image-wrapper">
                <div className="mission-image-glow" />
                <Image
                  src="/images/about_us/vaps-about.jpg"
                  alt="VAPS Mission Vision"
                  fill
                  className="mission-vision-image"
                  sizes="(max-width: 991px) 100vw, 50vw"
                  priority
                />
                <div className="mission-image-overlay" />
              </div>

              {/* Title */}
              <div className="mission-vision-title-wrapper">
                <h2 ref={titleRef} className="mission-vision-title-main">
                  {titleWords.map((word, index) => (
                    <span key={index} className="title-word">
                      {word}
                    </span>
                  ))}
                </h2>
              </div>
            </div>
          </div>

          {/* Right Side - Scrollable Cards */}
          <div className="col-12 col-lg-7">
            <div className="mission-vision-cards-container">
              {cards.map((card, index) => (
                <div
                  key={index}
                  ref={(el) => { cardRefs.current[index] = el }}
                  className="mission-vision-card-new"
                >
                  {/* Card Border Glow */}
                  <div className="card-border-glow" />

                  {/* Icon */}
                  <div className="mission-card-icon-wrapper">
                    <div
                      ref={(el) => { iconRefs.current[index] = el }}
                      className="mission-card-icon"
                      style={{
                        background: `linear-gradient(135deg, ${getIconColor(card.icon)}15 0%, ${getIconColor(card.icon)}25 100%)`,
                        color: getIconColor(card.icon),
                        borderColor: `${getIconColor(card.icon)}30`,
                        boxShadow: `0 4px 20px ${getIconColor(card.icon)}30`,
                      }}
                    >
                      {getIconComponent(card.icon)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mission-card-content">
                    <h3 className="mission-card-title">{card.title}</h3>
                    <p className="mission-card-description">{card.description}</p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="card-decorative-circle" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionVisionSection
