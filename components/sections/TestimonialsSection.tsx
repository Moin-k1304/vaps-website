'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useBasicScrollAnimation } from '@/hooks/useBasicScrollAnimation'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  useBasicScrollAnimation(sectionRef, '.section-label, .section-title, .swiper-slide')
  const testimonials = [
    {
      id: 1,
      quote: "We are pleased to acknowledge that VAPS Technosoft Pvt Ltd has been providing digitization services related to our education and administration services at Baldwin Girls High School from 2017 onwards. We appreciate their expertise and support in helping us streamline our processes and enhance our digital capabilities.",
      company: "Baldwin Girls High School",
      location: "Bangalore",
      universityLogo: "/images/BGHS-logo.png"
    },
    {
      id: 2,
      quote: "We are delighted to confirm that M/S Unnathi Marketing has successfully delivered, installed, commissioned and implemented robotics in the STEM MODEL for Baldwin Boys High School. The Roboguru licensed version has been integrated into the school's system, further enhancing our STEM education initiatives. We appreciate their professionalism and dedication in providing these valuable services.",
      company: "Baldwin Boys High School",
      location: "Bangalore",
      universityLogo: "/images/BBHS-logo.png"
    },
    {
      id: 3,
      quote: "Vaps team has been very supportive and have extending their full cooperation to develop module to suit our requirements. This is very special project, wherein enthusiastic children from economically weaker section of society, irrespective of Merit/Religion/Caste would be identified for scholarship. We appreciate the team's commitment to this noble cause.",
      company: "Prashanthi Balamandira Trust (PBT)",
      location: "Muddenahalli",
  universityLogo: "/images/PBT-logo-2.png"
    },
    {
      id: 4,
      quote: "With 15 years of partnership, VAPS has consistently brought innovative EdTech solutions to Tunbridge, engaging students and connecting families. The re-invigoration of this relationship through the introduction of the VAPS app is a clear sign of the app's potential to inspire and enhance the school community.",
      company: "Tunbridge High School",
      location: "Bangalore",
      universityLogo: "/images/THS-logo.png"
    },
    {
      id: 5,
      quote: "VAPS has truly been our educational savior during tough times. Traditional methods of communication and education fell short during the pandemic, but VAPS stepped in to connect teachers, students and parents seamlessly. Its features empowered teachers with attendance tracking, real-time updates and interactive schedules, transforming the way we educate and communicate.",
      company: "St. James School",
      location: "Kolkata",
      universityLogo: "/images/st-james-logo.png"
    },
    {
      id: 6,
      quote: "The transition from click to touch in the mobile app from VAPS Digital Campus at Nagarjuna Education Society demonstrates a forward-thinking approach to digital innovation. This transition ensures that the platform remains at the cutting edge of technology and user experience, providing a seamless and user-friendly interface for the institute's stakeholders. We appreciate VAPS' commitment to enhancing the digital experience for our institution.",
      company: "Nagarjuna Education Society",
      location: "Chikkaballapur",
      universityLogo: "/images/nagarjuna-logo.png"
    },
    {
      id: 7,
      quote: "St. Thomas Church High School has implemented world-class student authentication with smart cards, thanks to VAPS Digital Campus. This innovative solution enhances security and efficiency, providing a modern and reliable method for student authentication within the school premises. We appreciate VAPS Digital Campus for their contribution to our school's technological advancement.",
      company: "St. Thomas Church High School",
      location: "Howrah",
      universityLogo: "/images/st-thomas-church-logo.jpg"
    },
    {
      id: 8,
      quote: "The versatility and adaptability of the VAPS Integrated Virtual Resource Management (IVRM) system are evident in the various modules that have been customized to meet our unique needs. Throughout the project, the VAPS team has been exceptionally supportive, promptly addressing our queries and requirements from inception to completion. We are grateful for their partnership and commend the efforts of VAPS Managing Director and their team, for their outstanding contributions. We wholeheartedly endorse VAPS Digital Campus for their excellent services in providing digital campus solutions. The successful implementation of our online portal and mobile app is a testament to their commitment to quality and client satisfaction.",
      company: "Ebenezer Bible College",
      location: "Kerala",
      universityLogo: "/images/EBENEZER-BIBLE-logo.png"
    },
    {
      id: 9,
      quote: "We appreciate your dedication and team effort in implementing VAPS Digital Campus Project for our college. You have fully understood the requirement and ensured to our institution's requirement and implemented the software in time. You have captured our specific needs and your team has effectively coordinated with us during both implementation and maintenance phases. You have provided required training to our staff and end-users which highlights the importance of a reliable and seamless operation. We recommend VAPS Digital Campus as an ideal solution for any institution.",
      company: "Universal Group",
      location: "Bangalore",
      universityLogo: "/images/Universal-Group-Of-Institutions-logo.png"
    },
    {
      id: 10,
      quote: "We would like to place on record our sincere thanks and appreciation to you for having visited our school and introduced VAPS Digital Campus on 20-September-2024. Your session has been very beneficial to our teacher and staff. Thank you for your precious time and training session.",
      company: "G M Vidyaniketan Public School",
      location: "Bramavara",
      universityLogo: "/images/gmvps-logo.png"
    },
    {
      id: 11,
      quote: "We are delighted that we have successfully digitized our Campus through implementation of VAPS digital Campus project in collaboration with VAPS Technosoft specialized in providing software solution for education domain with legacy of more than 2 decades. Dedicated and efficient Software Development Team and Testing Team of VAPS have diligently coordinated with us and supported from inception to implementation of the project, which has helped us to realize our dream of converting our campus into a paperless campus. Many of the features in the ERP system, viz,. Mobile App, Dash Board for Principal, Online payment option, etc, have enabled us to manage the school administration efficiently and it is now possible for us to monitor and manage the school administration remotely from any part of the world.",
      company: "Sri Viveka Vidyalaya Pre University College",
      location: "Mysore",
      universityLogo: "/images/shri-viveka-vidyalaya-pu-logo.jpg"
    }
  ]

  return (
    <section ref={sectionRef} className="testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What does our client say?</h2>
        </div>

        {/* Testimonials Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonial-card">
                <div className="row" style={{alignItems:"flex-start"}}>
                  {/* Left Side - Quote */}
                  <div className="col-lg-8">
                    <div className="testimonial-content">
                      <p className="testimonial-quote">{testimonial.quote}</p>
                      <div className="testimonial-author">
                        <h4 className="author-name">{testimonial.company}</h4>
                        <p className="author-position">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Logo */}
                  <div className="col-lg-4">
                    <div className="testimonial-logo-wrapper">
                      <Image
                        src={testimonial.universityLogo}
                        alt={testimonial.company}
                        width={300}
                        height={300}
                        className="testimonial-logo"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom - Person Images */}
                {/* <div className="testimonial-persons">
                  <div className="person-image-wrapper">
                    <Image
                      src={testimonial.personImage}
                      alt={testimonial.name}
                      width={100}
                      height={100}
                      className="person-image"
                    />
                  </div>
                </div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default TestimonialsSection
