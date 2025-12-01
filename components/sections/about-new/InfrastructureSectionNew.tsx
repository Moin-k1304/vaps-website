'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import infrastructureData from '@/data/about-us/infrastructure'
import Lightbox from '@/components/sections/Lightbox'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const InfrastructureSectionNew = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Left content animation
      if (leftContentRef.current) {
        const elements = leftContentRef.current.querySelectorAll('h2, p, .infrastructure-description')
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            x: -50,
            y: 30,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftContentRef.current,
              start: 'top 80%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMounted])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const navigateLightbox = (direction: 'prev' | 'next') => {
    let newIndex = lightboxIndex
    if (direction === 'prev') {
      newIndex = lightboxIndex === 0 ? infrastructureData.length - 1 : lightboxIndex - 1
    } else {
      newIndex = lightboxIndex === infrastructureData.length - 1 ? 0 : lightboxIndex + 1
    }
    setLightboxIndex(newIndex)
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="infrastructure-section-new section-container"
      >
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            {/* Left Side - Swiper Carousel */}
            <div className="col-12 col-lg-8 order-2 order-lg-1">
              <div className="infrastructure-swiper-wrapper">
                {isMounted && (
                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper
                  }}
                  modules={[Pagination, Autoplay]}
                  grabCursor={true}
                  centeredSlides={false}
                  slidesPerView={3}
                  spaceBetween={20}
                  loop={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 15,
                    },
                    480: {
                      slidesPerView: 1.5,
                      spaceBetween: 16,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 18,
                    },
                    768: {
                      slidesPerView: 2.5,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                    },
                    1400: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                  }}
                  className="infrastructure-swiper"
                >
                  {infrastructureData.map((item, index) => (
                    <SwiperSlide key={index} className="infrastructure-slide">
                      <div
                        className="infrastructure-card"
                        onClick={() => openLightbox(index)}
                      >
                        <div className="infrastructure-card-image-wrapper">
                          <Image
                            src={item.image}
                            alt={item.label}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            className="infrastructure-card-image"
                          />
                          <div className="infrastructure-card-overlay">
                            <div className="infrastructure-zoom-icon">
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                                <line x1="11" y1="8" x2="11" y2="14"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="infrastructure-card-content">
                          <h4 className="infrastructure-card-title">{item.label}</h4>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                )}
                {!isMounted && (
                  <div className="infrastructure-swiper-placeholder" style={{ 
                    minHeight: '400px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#f8fafc',
                    borderRadius: '16px'
                  }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Loading...</div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="col-12 col-lg-4 order-1 order-lg-2">
              <div ref={leftContentRef} className="infrastructure-left-content">
                <div className="section-label">Our Facilities</div>
                <h2 className="infrastructure-main-title">
                  <span className="section-title">Infrastructure</span>
                  <br />
                  <p className='section-title' style={{ flex: 1, marginBottom: 0, fontSize: '1.5rem' }}>
                    Modern & Professional
                  </p>
                </h2>
                <div className="section-description">
                  <p>
                    Our state-of-the-art infrastructure provides a world-class working environment 
                    with modern facilities, advanced technology, and comfortable spaces designed to 
                    foster innovation and collaboration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        images={infrastructureData}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </>
  )
}

export default InfrastructureSectionNew
