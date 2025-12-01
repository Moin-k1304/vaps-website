'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { useBasicScrollAnimation } from '@/hooks/useBasicScrollAnimation'

// Import Swiper styles
import 'swiper/css'

interface SlideData {
  id: number
  title: string
  subtitle: string
  description: string
  imageUrl: string
  buttonText: string
}

// Data for the slides
const slideData: SlideData[] = [
  {
    id: 1,
    title: 'Digital Campus',
    subtitle: 'VAPS Digital Campus NEP Platform',
    description: 'Enable schools to function effectively, be more productive and deliver seamless experiences using a web based management platform made to fit your goals and requirements.',
    imageUrl: '/images/vaps-tech-digital-campus.png',
    buttonText: 'Learn more',
  },
  {
    id: 2,
    title: 'Advanced E-Lab',
    subtitle: 'VAPS Advanced E-Lab',
    description: 'Facilitating advanced e-learning solutions for every academic level from kinder garden till university by introducing innovation to existing teaching methods and delivering a practical, more inclusive educational content.',
    imageUrl: '/images/vaps-tech-advanced-e-lab.png',
    buttonText: 'Learn more',
  },
  {
    id: 3,
    title: 'Science Park',
    subtitle: 'VAPS Smart Science Park',
    description: 'Enable learning through play in your school by building interactive, highly-engaging and state-of-the-art science parks that facilitates practical illustrations of theoretical lessons taught in classrooms.',
    imageUrl: '/images/vaps-tech-smart-science-park.png',
    buttonText: 'Learn more',
  },
]

const DigitalCampusSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  
  useBasicScrollAnimation(sectionRef, '.section-label, .section-title, .section-description, .digital-campus-tab, .swiper-slide')

  const handleTitleClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index)
    }
  }

  return (
    <section ref={sectionRef} className="digital-campus-section">
      <div className="container">
        {/* Top Section: Header and Tabs */}
        <div className="digital-campus-header">
          <div className="section-header text-center">
            <span className="section-label">VAPS Technology</span>
            <h2 className="section-title">Architects of Intelligent Digital Campus</h2>
            <p className="section-description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="digital-campus-tabs">
            {slideData.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => handleTitleClick(index)}
                className={`digital-campus-tab ${activeIndex === index ? 'active' : ''}`}
              >
                {slide.title}
              </button>
            ))}
          </div>
        </div>

        {/* Full Width Slider */}
        <div className="digital-campus-swiper-container">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            grabCursor={true}
            slidesPerView={1}
            spaceBetween={0}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex)
            }}
            className="digital-campus-swiper"
          >
            {slideData.map((slide) => (
              <SwiperSlide key={slide.id} className="digital-campus-slide">
                <div className="digital-campus-slide-inner">
                  <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-lg-6">
                      <div className="digital-campus-content">
                        <h3 className="section-title-secondary">{slide.subtitle}</h3>
                        <p className="section-description white" style={{marginBottom:"1rem", textAlign:"justify"}}>
                          {slide.description}
                        </p>
                        <button className="cta-button">
                          {slide.buttonText}
                        </button>
                      </div>
                    </div>

                    {/* Right Image */}
                    <div className="col-lg-6">
                      <div className="digital-campus-image-wrapper">
                        <Image
                          src={slide.imageUrl}
                          alt={slide.subtitle}
                          width={1200}
                          height={800}
                          className="digital-campus-slide-image"
                          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                        />
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

export default DigitalCampusSection
