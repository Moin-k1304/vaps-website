'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import styles from './PageHero.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  description,
  image,
  backgroundImage = '/images/svgs/bg-lines.svg',
  ctaText = 'Request a Demo',
  ctaLink,
  onCtaClick
}) => {
  const heroContentRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const wavyBgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content animation - stagger from left
      if (heroContentRef.current) {
        const elements = heroContentRef.current.children
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            x: -80,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3,
          }
        )
      }

      // Image animation - fade in from right with scale
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          {
            opacity: 0,
            x: 80,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            delay: 0.5,
          }
        )
      }

      // Animated wavy background
      if (wavyBgRef.current) {
        gsap.to(wavyBgRef.current, {
          x: '100%',
          duration: 20,
          repeat: -1,
          ease: 'none',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick()
    } else if (ctaLink) {
      window.location.href = ctaLink
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className={styles.heroSection}
      style={backgroundImage ? {
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      } : undefined}
    >
      {/* Background Image Overlay */}
      {backgroundImage && <div className={styles.backgroundImageOverlay} />}
      
      {/* Animated Wavy Background */}
      <div className={styles.wavyBackground}>
        <svg
          className={styles.wave1}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          ref={wavyBgRef}
        >
          <path
            fill="rgba(152, 16, 250, 0.15)"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg
          className={styles.wave2}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(116, 69, 223, 0.12)"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg
          className={styles.wave3}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(3, 41, 123, 0.1)"
            d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,181.3C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Gradient Overlay */}
      <div className={styles.gradientOverlay} />

      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className={`col-12 ${image ? 'col-lg-6' : 'col-lg-8 offset-lg-2 text-center'}`}>
            <div ref={heroContentRef} className={styles.heroContent}>
              {subtitle && (
                <div className={styles.subtitle}>
                  <span className={styles.subtitleText}>{subtitle}</span>
                </div>
              )}
              
              <h1 className={styles.title}>
                {title}
              </h1>
              
              {description && (
                <p className={styles.description}>
                  {description}
                </p>
              )}

              {ctaText && (
                <button
                  className={styles.ctaButton}
                  onClick={handleCtaClick}
                >
                  <span className={styles.ctaText}>{ctaText}</span>
                  <svg
                    className={styles.ctaArrow}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 15L12.5 10L7.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Right Image */}
          {image && (
            <div className="col-12 col-lg-6">
              <div ref={heroImageRef} className={styles.imageWrapper}>
                <div className={styles.imageGlow} />
                <Image
                  src={image}
                  alt={title}
                  fill
                  className={styles.heroImage}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorativeCircle1} />
      <div className={styles.decorativeCircle2} />
      <div className={styles.decorativeCircle3} />
    </section>
  )
}

export default PageHero
