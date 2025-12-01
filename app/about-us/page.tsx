'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import FloatingBackground from '@/components/sections/FloatingBackground'
import './about-new.css'
import AboutHeroBanner from '@/components/sections/about-new/AboutHeroBanner'
import AwardsSectionNew from '@/components/sections/about-new/AwardsSectionNew'
import ClientsSectionNew from '@/components/sections/about-new/ClientsSectionNew'
import InfrastructureSectionNew from '@/components/sections/about-new/InfrastructureSectionNew'
import LegacySection from '@/components/sections/about-new/LegacySection'
import SliderTimeline from '@/components/sections/SliderTimeline'
import LeadershipSection from '@/components/sections/LeadershipSection'
import leadershipData from '@/data/about-us/leadership';
import WarpSpeedClients from '@/components/sections/WarpSpeedClients'
import clientsData from '@/data/about-us/clients';
import ctaData from '@/data/about-us/cta';
import CTASection from '@/components/sections/CTASection'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutNewPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Refresh ScrollTrigger after page load
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="about-new-page"
      style={{
        position: 'relative',
        overflowX: 'hidden',
        contain: 'layout style paint',
      }}
    >
      <FloatingBackground />
      
      <AboutHeroBanner />
      <SliderTimeline />

      <LeadershipSection
        image={leadershipData.image}
        title={leadershipData.title}
        message={leadershipData.message}
        name={leadershipData.name}
        role={leadershipData.role}
      />
      
      <AwardsSectionNew />

      <WarpSpeedClients
        clients={clientsData}
      />
      
      <InfrastructureSectionNew />

      <LegacySection />
            
      <ClientsSectionNew />

      <CTASection
        title={ctaData.title}
        subtitle={ctaData.subtitle}
        phone={ctaData.phone}
        links={ctaData.links}
        buttonText={ctaData.buttonText}
      />
      
      {/* <TestimonialsSectionNew /> */}
    </div>
  )
}

