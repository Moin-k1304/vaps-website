'use client'

import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Import Swiper styles
import 'swiper/css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SlideData {
  id: number
  title: string
  videoUrl: string
}

// Data for the slides - Replace with your actual videos
const slideData: SlideData[] = [
  {
    id: 1,
    title: 'Smart Document AI',
    videoUrl: '/images/Unmatched Expertise.mp4',
  },
  {
    id: 2,
    title: 'AI Attendance Ecosystem',
    videoUrl: '/images/Student-First Innovation.mp4',
  },
  {
    id: 3,
    title: 'AI-Driven HR & Recruitment',
    videoUrl: '/images/Lifelong Learning.mp4',
  },
  // {
  //   id: 4,
  //   title: 'AI-Powered Analytics',
  //   imageUrl: '/images/vaps-tech-4th-section-img.png',
  // },
  // {
  //   id: 5,
  //   title: 'Mobile Learning Solutions',
  //   imageUrl: '/images/vap-tech-3rd-section-digital-campus-nep-img.png',
  // },
]

const AIFeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const titlesRef = useRef<HTMLDivElement>(null)
  const swiperContainerRef = useRef<HTMLDivElement>(null)

  const handleTitleClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate titles section from left
      if (titlesRef.current) {
        const elements = titlesRef.current.querySelectorAll('.section-label, .section-title, .ai-features-description, .ai-feature-btn')
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            x: -100,
            y: 20,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titlesRef.current,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Animate swiper container from right with 3D effect
      if (swiperContainerRef.current) {
        gsap.fromTo(
          swiperContainerRef.current,
          {
            opacity: 0,
            x: 150,
            rotationY: -45,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: swiperContainerRef.current,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="ai-features-section">
      <div className="container">
        <div className="row align-items-center gx-5">
          {/* Left Panel: AI Features List */}
          <div className="col-lg-4">
            <div ref={titlesRef} className="ai-features-titles">
              <div className="section-header">
                <span className="section-label">AIVRM AI features</span>
                <h2 className="section-title">Empowering Institutions with Next-Gen AI Automation</h2>
              </div>
              <p className="ai-features-description">
                From Insight to Action — Powered by AI.
              </p>
              <div className="ai-features-list">
                {slideData.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => handleTitleClick(index)}
                    className={`ai-feature-btn ${activeIndex === index ? 'active' : ''}`}
                  >
                    <span className="ai-feature-text">{slide.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: AI Features Showcase */}
          <div className="col-lg-8">
            <div ref={swiperContainerRef} className="ai-features-swiper-container">
              <Swiper
                modules={[Autoplay]}
                loop={true}
                grabCursor={true}
                slidesPerView="auto"
                // spaceBetween={10}
                speed={800}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex)
                }}
                className="ai-features-swiper"
              >
                {slideData.map((slide) => (
                  <SwiperSlide key={slide.id} className="ai-feature-slide">
                    <div className="ai-feature-slide-inner">
                      {/* <Image
                        src={slide.imageUrl}
                        alt={slide.title}
                        width={1200}
                        height={800}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      /> */}
                      <video
                        src={slide.videoUrl}
                        className="ai-feature-slide-image"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <p>VAPS digital campus NEP platform for educational institutions ( Schools, College, Universities, Autonomous Colleges) of any size</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIFeaturesSection
