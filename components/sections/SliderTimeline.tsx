'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs, Controller, Autoplay, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/effect-fade'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const timelineData = [
  {
    year: '2000',
    title: 'The Beginning',
    description: 'Founded with a vision to transform education through technology, VAPS started its journey in digital innovation.',
    image: '/images/hero-section-robot-img.png',
  },
  {
    year: '2005',
    title: 'Expanding Horizons',
    description: 'Expanded our services across India, bringing digital solutions to educational institutions nationwide.',
    image: '/images/about_us/2005-expanding-horizon.png',
  },
  {
    year: '2010',
    title: 'Embracing Mobility',
    description: 'Launched mobile-first solutions, enabling learning on-the-go and revolutionizing campus management.',
    image: '/images/about_us/2010-mobility-era.png',
  },
  {
    year: '2015',
    title: 'Smart Solutions Era',
    description: 'Introduced IoT-enabled smart campus solutions, automating processes and enhancing operational efficiency.',
    image: '/images/about_us/2015-smart-revolution.png',
  },
  {
    year: '2020',
    title: 'AI Revolution',
    description: 'Pioneered AI-powered educational tools, transforming how students learn and educators teach.',
    image: '/images/about_us/2020-ai-revolution.png',
  },
  {
    year: '2025',
    title: 'The Future is Now',
    description: 'Leading the charge in agentic AI functionality, creating intelligent systems that adapt and evolve.',
    image: '/images/about_us/2025-future.png',
  },
]

const SliderTimeline = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const mainSwiperRef = useRef<SwiperType | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            opacity: 0,
            y: -30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.3,
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Sync thumbs swiper when main swiper changes
  useEffect(() => {
    if (thumbsSwiper && activeIndex !== undefined) {
      thumbsSwiper.slideTo(activeIndex, 500)
    }
  }, [activeIndex, thumbsSwiper])

  const handleYearClick = (index: number) => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(index, 800)
      setActiveIndex(index)
    }
  }

  return (
    <section ref={sectionRef} className="slider-timeline-section">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="timeline-header text-center">
          <div className="">
            <span className="section-label">OUR JOURNEY</span>
          </div>
          <h2 className="section-title">
            The Evolution of VAPS
          </h2>
        </div>

        {/* Years Slider (Thumbs) */}
        <div className="timeline-years-wrapper">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={20}
            slidesPerView={3}
            freeMode={false}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs, Controller]}
            className="years-swiper"
            centeredSlides={true}
            breakpoints={{
              640: { slidesPerView: 4, spaceBetween: 20 },
              768: { slidesPerView: 5, spaceBetween: 25 },
              1024: { slidesPerView: 6, spaceBetween: 30 },
            }}
            onSlideChange={(swiper) => {
              const realIndex = swiper.activeIndex
              if (mainSwiperRef.current && realIndex !== activeIndex) {
                mainSwiperRef.current.slideTo(realIndex, 800)
                setActiveIndex(realIndex)
              }
            }}
          >
            {timelineData.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`year-item ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => handleYearClick(index)}
                >
                  <span className="year-number">{item.year}</span>
                  {activeIndex === index && (
                    <div className="year-indicator" />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Content Slider */}
        <div ref={contentRef} className="timeline-content-wrapper">
          <Swiper
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper
            }}
            spaceBetween={0}
            modules={[FreeMode, Navigation, Thumbs, Controller, Autoplay, EffectFade]}
            className="content-swiper"
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={800}
            onSlideChange={(swiper) => {
              const realIndex = swiper.activeIndex
              setActiveIndex(realIndex)
              // Sync thumbs swiper
              if (thumbsSwiper && !thumbsSwiper.destroyed) {
                thumbsSwiper.slideTo(realIndex, 500)
              }
            }}
            autoplay={{ 
              delay: 5000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={false}
            allowTouchMove={true}
            watchSlidesProgress={true}
          >
            {timelineData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="timeline-slide-content">
                  <div className="row align-items-center g-4 g-lg-5">
                    {/* Image */}
                    <div className="col-12 col-lg-6">
                      <div className="timeline-image-wrapper">
                        <div className="image-glow-effect" />
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="timeline-image"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={index === 0}
                        />
                        <div className="image-overlay" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="col-12 col-lg-6">
                      <div className="timeline-text-content">
                        <div className="timeline-year-badge">
                          <span>{item.year}</span>
                        </div>
                        <h3 className="section-title">
                          {item.title}
                        </h3>
                        <p className="section-description">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default SliderTimeline
