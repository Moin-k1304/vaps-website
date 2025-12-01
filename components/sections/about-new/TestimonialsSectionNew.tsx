'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const TestimonialsSectionNew = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      id: 1,
      quote: "We are pleased to acknowledge that VAPS Technosoft Pvt Ltd has been providing digitization services related to our education and administration services at Baldwin Girls High School from 2017 onwards. We appreciate their expertise and support in helping us streamline our processes and enhance our digital capabilities.",
      company: "Baldwin Girls High School",
      location: "Bangalore",
      logo: "/images/BGHS-logo.png"
    },
    {
      id: 2,
      quote: "VAPS has truly been our educational savior during tough times. Traditional methods of communication and education fell short during the pandemic, but VAPS stepped in to connect teachers, students and parents seamlessly.",
      company: "St. James School",
      location: "Kolkata",
      logo: "/images/st-james-logo.png"
    },
    {
      id: 3,
      quote: "With 15 years of partnership, VAPS has consistently brought innovative EdTech solutions to Tunbridge, engaging students and connecting families.",
      company: "Tunbridge High School",
      location: "Bangalore",
      logo: "/images/THS-logo.png"
    },
    {
      id: 4,
      quote: "The versatility and adaptability of the VAPS Integrated Virtual Resource Management (IVRM) system are evident in the various modules that have been customized to meet our unique needs.",
      company: "Ebenezer Bible College",
      location: "Kerala",
      logo: "/images/EBENEZER-BIBLE-logo.png"
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="testimonials-section-new section-container"
    >
      <div className="container">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-5 section-header">
          <h2
            className="mb-3"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              color: '#03297B',
            }}
          >
            Testimonials
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper"
          style={{
            paddingBottom: '50px',
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonial-card">
                <div className="testimonial-logo">
                  <Image
                    src={testimonial.logo}
                    alt={testimonial.company}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="80px"
                  />
                </div>
                <p className="testimonial-quote">
                  {testimonial.quote}
                </p>
                <div className="text-center">
                  <h4 className="testimonial-company">
                    {testimonial.company}
                  </h4>
                  <p className="testimonial-location">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default TestimonialsSectionNew

