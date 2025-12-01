'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import awardsData from '@/data/about-us/awards'
import Lightbox from '@/components/sections/Lightbox'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const AwardsSectionNew = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content animation
      if (leftContentRef.current) {
        const elements = leftContentRef.current.querySelectorAll('h2, p, .awards-description')
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
  }, [])

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
      newIndex = lightboxIndex === 0 ? awardsData.length - 1 : lightboxIndex - 1
    } else {
      newIndex = lightboxIndex === awardsData.length - 1 ? 0 : lightboxIndex + 1
    }
    setLightboxIndex(newIndex)
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="awards-section-new section-container"
      >
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            {/* Left Side - Text Content */}
            <div className="col-12 col-lg-4">
              <div ref={leftContentRef} className="awards-left-content">
                <div className="section-label">Our Achievements</div>
                <h2 className="awards-main-title">
                  <span className="section-title">Our Awards</span>
                  <br />
                  {/* <span className="section-description">Recognition & Excellence</span> */}
                  <p className='section-title' style={{ flex: 1, marginBottom: 0, fontSize: '1.5rem' }}>
                    Recognition & Excellence
                  </p>
                </h2>
                <div className="section-description">
                  <p>
                    Over the past 2 decades, VAPS Group has been honored with numerous prestigious 
                    awards and recognitions that reflect our commitment to innovation, excellence, 
                    and transformative digital solutions in the education sector.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Swiper Carousel */}
            <div className="col-12 col-lg-8">
              <div className="awards-swiper-wrapper">
                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper
                  }}
                  modules={[Pagination, Autoplay, EffectCoverflow]}
                  effect="coverflow"
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={3}
                  spaceBetween={24}
                  loop={true}
                  speed={600}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  coverflowEffect={{
                    rotate: 8,
                    stretch: 0,
                    depth: 200,
                    modifier: 1.5,
                    slideShadows: true,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 5,
                  }}
                  touchRatio={1}
                  touchAngle={45}
                  threshold={10}
                  longSwipesRatio={0.5}
                  longSwipesMs={300}
                  watchOverflow={true}
                  observer={true}
                  observeParents={true}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 12,
                      coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 30,
                        modifier: 1,
                      },
                    },
                    480: {
                      slidesPerView: 1.2,
                      spaceBetween: 14,
                      coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 40,
                        modifier: 1,
                      },
                    },
                    640: {
                      slidesPerView: 1.5,
                      spaceBetween: 16,
                      coverflowEffect: {
                        rotate: 3,
                        stretch: 0,
                        depth: 60,
                        modifier: 1.1,
                      },
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 18,
                      coverflowEffect: {
                        rotate: 5,
                        stretch: 0,
                        depth: 100,
                        modifier: 1.2,
                      },
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                      coverflowEffect: {
                        rotate: 8,
                        stretch: 0,
                        depth: 200,
                        modifier: 1.5,
                      },
                    },
                    1400: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                      coverflowEffect: {
                        rotate: 6,
                        stretch: 0,
                        depth: 250,
                        modifier: 1.6,
                      },
                    },
                  }}
                  className="awards-swiper"
                >
                  {awardsData.map((award, index) => (
                    <SwiperSlide key={index} className="award-slide">
                      <div
                        className="award-card"
                        onClick={() => openLightbox(index)}
                      >
                        <div className="award-card-image-wrapper">
                          <Image
                            src={award.image}
                            alt={award.label}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            className="award-card-image"
                          />
                          <div className="award-card-overlay">
                            <div className="award-zoom-icon">
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
                        <div className="award-card-content">
                          <h4 className="award-card-title">{award.label}</h4>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        images={awardsData}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </>
  )
}

export default AwardsSectionNew
