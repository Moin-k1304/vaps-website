'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ProductFeaturesSection = () => {
  const features = [
    'Digital Campus',
    'Vaps Tech',
    'Smart Document AI',
    'AI Attendance Ecosystem',
    'AI-Driven HR & Recruitment',
    'Tech Market',
    'Science Park',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const robotRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (features.length === 0) return

    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % features.length)
    }, 2500) // Change item every 2.5 seconds

    return () => clearInterval(intervalId)
  }, [features.length])

  useEffect(() => {
    // Helper function to check if element is partially visible
    const isPartiallyVisible = (element: Element | null) => {
      if (!element) return false
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      return rect.top < windowHeight * 0.9 && rect.bottom > -100
    }

    let ctx: gsap.Context | null = null

    const checkAndAnimate = () => {
      ctx = gsap.context(() => {
        // Header animation
        if (headerRef.current) {
          const elements = headerRef.current.querySelectorAll('.section-label, .section-title')
          const isVisible = isPartiallyVisible(headerRef.current)

          if (!isVisible) {
            gsap.set(elements, { opacity: 0, y: 50, x: -50 })
          }

          const animation = gsap.fromTo(
            elements,
            !isVisible ? { opacity: 0, y: 50, x: -50 } : { opacity: 1, y: 0, x: 0 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: isVisible ? 0.3 : 1,
              stagger: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 85%',
                end: 'top 30%',
                toggleActions: 'play none none reverse',
                once: true,
              },
            }
          )

          if (isVisible) {
            setTimeout(() => animation.play(), 100)
          }
        }

        // Features list animation
        if (featuresRef.current) {
          const isVisible = isPartiallyVisible(featuresRef.current)

          if (!isVisible) {
            gsap.set(featuresRef.current, { opacity: 0, x: 100, scale: 0.9 })
          }

          const animation = gsap.fromTo(
            featuresRef.current,
            !isVisible ? { opacity: 0, x: 100, scale: 0.9 } : { opacity: 1, x: 0, scale: 1 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: isVisible ? 0.4 : 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: featuresRef.current,
                start: 'top 85%',
                end: 'top 30%',
                toggleActions: 'play none none reverse',
                once: true,
              },
            }
          )

          if (isVisible) {
            setTimeout(() => animation.play(), 150)
          }
        }
      })
    }

    const rafId = requestAnimationFrame(() => {
      setTimeout(checkAndAnimate, 50)
    })

    return () => {
      cancelAnimationFrame(rafId)
      if (ctx) {
        ctx.revert()
      }
    }
  }, [])

  // Item height in pixels (responsive)
  const [itemHeight, setItemHeight] = useState(52)
  const [visibleItems, setVisibleItems] = useState(7)

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth
        if (width <= 400) {
          setItemHeight(45)
          setVisibleItems(5)
        } else if (width <= 575) {
          setItemHeight(48)
          setVisibleItems(6)
        } else if (width <= 767) {
          setItemHeight(50)
          setVisibleItems(6)
        } else {
          setItemHeight(52)
          setVisibleItems(7)
        }
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Calculate the Y-transform to center the current item
  const centerPosition = Math.floor(visibleItems / 2)
  const yTransform = (centerPosition * itemHeight) - (currentIndex * itemHeight)

  return (
    <section ref={sectionRef} className="product-features-section">
      {/* Robot Hand Image - Desktop Only (Outside Container) */}
      <div ref={robotRef} className="robot-hand-container desktop-robot">
        <Image
          src="/images/robot-hand-silver.webp"
          alt="Robot Hand Animation"
          width={800}
          height={600}
          className="product-robot-image"
          priority
        />
      </div>

      <div className="container-fluid px-3 px-md-4 px-lg-5" style={{ width: '100%', maxWidth: '100%' }}>
        <div className="row g-4 g-lg-5" style={{ marginLeft: 0, marginRight: 0 }}>
          {/* Left Side - Section Header */}
          <div className="col-12 col-lg-6">
            <div ref={headerRef} className="section-header">
              <span className="section-label">Features</span>
              <h2 className="section-title">Product Features</h2>
            </div>

            {/* Mobile Robot Hand - Below header on mobile, hidden on desktop */}
            <div className="mobile-robot-hand-container">
              <Image
                src="/images/robot-hand-silver.webp"
                alt="Robot Hand Animation"
                width={400}
                height={300}
                className="mobile-robot-image"
                priority
              />
            </div>
          </div>

          {/* Right Side - Animated Features */}
          <div className="col-12 col-lg-6">
            <div ref={featuresRef} className="product-content">
              <div
                className="features-animation-container"
                style={{ height: `${itemHeight * visibleItems}px` }}
              >
                {/* Purple Selection Highlight - Fixed in the middle */}
                <div
                  className="feature-selector-highlight"
                  style={{
                    top: `${centerPosition * itemHeight}px`,
                    height: `${itemHeight}px`,
                  }}
                />

                {/* Animated Scrolling List */}
                <div
                  className="features-list-animated"
                  style={{ transform: `translateY(${yTransform}px)` }}
                >
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="feature-item"
                      style={{ height: `${itemHeight}px` }}
                    >
                      <span className={currentIndex === index ? 'active' : ''}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductFeaturesSection
