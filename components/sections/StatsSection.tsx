'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface StatCardProps {
  number: string
  label: string
  imageUrl: string
  colorClass: string
  index: number
}

const StatCard = ({ number, label, imageUrl, colorClass, index }: StatCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        // Card entrance animation with 3D flip
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            scale: 0.5,
            rotationY: 180,
            y: 100,
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        )

        // Hover animation
        const card = cardRef.current
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: 'power2.out',
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
      }
    })

    return () => ctx.revert()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`stat-card ${colorClass}`}
    >
      <Image
        src={imageUrl}
        alt={label}
        fill
        className="stat-card-bg"
        style={{ objectFit: 'cover' }}
      />
      <div className="stat-card-overlay"></div>
      <div className="stat-card-content">
        <div className="stat-number">{number}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  )
}

const StatsSection = () => {
  const stats = [
    {
      number: '6000+',
      label: 'Satisfied Clients',
      imageUrl: '/images/stats/more_than_6000_plus_clients.png',
      colorClass: 'blue'
    },
    {
      number: '7+',
      label: 'Million Users',
      imageUrl: '/images/stats/millions_of_users.png',
      colorClass: 'orange'
    },
    {
      number: '25',
      label: 'Years of Experience',
      imageUrl: '/images/stats/more_than_25_years_experience.png',
      colorClass: 'purple'
    },
    {
      number: '1M',
      label: 'Mobile App Downloads',
      imageUrl: '/images/stats/mobile_apps_downloads.png',
      colorClass: 'green'
    },
    {
      number: '6000+',
      label: 'Satisfied Clients',
      imageUrl: '/images/stats/more_than_6000_plus_clients.png',
      colorClass: 'blue'
    },
  ]

  return (
    <section className="stats-section">
      <div className="container">
        <div className="row g-3">
          {stats.map((stat, index) => (
            <div key={index} className="col-6 col-md-4 col-lg">
              <StatCard {...stat} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
