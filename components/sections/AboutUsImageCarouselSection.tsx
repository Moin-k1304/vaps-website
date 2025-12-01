'use client'

import { useEffect, useRef, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './AboutUsImageCarouselSection.module.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageItem {
  image: string;
  label: string;
}

interface AboutUsImageCarouselSectionProps {
  title: string;
  description: string;
  images: ImageItem[];
  onImageClick?: (images: ImageItem[], index: number) => void;
}

const AboutUsImageCarouselSection: React.FC<AboutUsImageCarouselSectionProps> = ({
  title,
  description,
  images,
  onImageClick,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Debug: Log images
  useEffect(() => {
    if (images && images.length > 0) {
      console.log('AboutUsImageCarouselSection - Images loaded:', images.length);
    } else {
      console.warn('AboutUsImageCarouselSection - No images provided');
    }
  }, [images]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const particles: Array<{
      element: HTMLDivElement;
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      
      const size = Math.random() * 5 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const vx = (Math.random() - 0.5) * 0.4;
      const vy = (Math.random() - 0.5) * 0.4;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;
      particle.style.animationDelay = `${Math.random() * 2}s`;

      container.appendChild(particle);

      particles.push({
        element: particle,
        x,
        y,
        vx,
        vy,
        size,
      });
    }

    // Animate particles
    let animationId: number;
    const animate = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x > 100) particle.x = 0;
        if (particle.x < 0) particle.x = 100;
        if (particle.y > 100) particle.y = 0;
        if (particle.y < 0) particle.y = 100;

        particle.element.style.left = `${particle.x}%`;
        particle.element.style.top = `${particle.y}%`;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      particles.forEach((particle) => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const leftContent = section.querySelector(`.${styles.leftContent}`) as HTMLElement;
    const carouselContainer = section.querySelector(`.${styles.carouselContainer}`) as HTMLElement;
    
    // Ensure content is visible by default
    if (leftContent) {
      leftContent.style.opacity = '1';
      leftContent.style.transform = 'translateX(0)';
    }
    if (carouselContainer) {
      carouselContainer.style.opacity = '1';
      carouselContainer.style.transform = 'translateX(0)';
    }

    // Only animate if scroll trigger is available
    if (typeof window !== 'undefined' && ScrollTrigger) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          once: true,
        },
      });

      tl.from(`.${styles.leftContent}`, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .from(`.${styles.carouselContainer}`, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4');

      return () => {
        tl.kill();
      };
    }
  }, []);

  const handleImageClick = useCallback((index: number) => {
    setSelectedIndex(index);
    if (onImageClick) {
      onImageClick(images, index);
    }
  }, [images, onImageClick]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={containerRef} className={styles.animatedBackground}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Left Side - Title and Description */}
          <div className={styles.leftContent}>
            <div>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.titleUnderline}></div>
            </div>
            <div>
              <p className={styles.description}>{description}</p>
            </div>
          </div>

          {/* Right Side - Image Carousel */}
          <div className={styles.rightContent}>
            <div className={styles.carouselContainer}>
              {images && images.length > 0 ? (
              <Swiper
                modules={[Pagination, Autoplay, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2.5}
                spaceBetween={40}
                coverflowEffect={{
                  rotate: 15,
                  stretch: 0,
                  depth: 150,
                  modifier: 1.2,
                  slideShadows: true,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                  dynamicMainBullets: 5,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={images.length > 3}
                speed={800}
                watchSlidesProgress={true}
                observer={true}
                observeParents={true}
                breakpoints={{
                  320: {
                    slidesPerView: 1.2,
                    spaceBetween: 20,
                    coverflowEffect: {
                      rotate: 5,
                      depth: 80,
                      stretch: 0,
                      modifier: 1,
                    },
                  },
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 24,
                    coverflowEffect: {
                      rotate: 10,
                      depth: 120,
                      stretch: 0,
                      modifier: 1,
                    },
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    coverflowEffect: {
                      rotate: 15,
                      depth: 150,
                      stretch: 0,
                      modifier: 1,
                    },
                  },
                  1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 40,
                    coverflowEffect: {
                      rotate: 20,
                      depth: 200,
                      stretch: 0,
                      modifier: 1,
                    },
                  },
                }}
                className={styles.swiper}
              >
                {images.map((item, index) => (
                  <SwiperSlide key={`${item.label}-${index}`} className={styles.slide}>
                    <div
                      className={styles.imageCard}
                      onClick={() => handleImageClick(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleImageClick(index)}
                      aria-label={`View ${item.label} full size`}
                    >
                      <div className={styles.imageWrapper}>
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.label || `Image ${index + 1}`}
                            className={styles.image}
                            loading={index < 3 ? "eager" : "lazy"}
                            onLoad={() => {
                              console.log('Image loaded successfully:', item.image);
                            }}
                            onError={(e) => {
                              console.error('Image failed to load:', item.image);
                              const target = e.target as HTMLImageElement;
                              if (target) {
                                target.style.display = 'none';
                                const wrapper = target.parentElement;
                                if (wrapper) {
                                  const placeholder = wrapper.querySelector(`.${styles.imagePlaceholder}`) as HTMLElement;
                                  if (placeholder) {
                                    placeholder.style.display = 'flex';
                                  }
                                }
                              }
                            }}
                          />
                        ) : null}
                        <div className={styles.imagePlaceholder} style={{ display: item.image ? 'none' : 'flex' }}>
                          <span>Loading...</span>
                        </div>
                        <div className={styles.overlay}>
                          <div className={styles.overlayContent}>
                            <span className={styles.label}>{item.label}</span>
                            <div className={styles.zoomIcon}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                                <path d="M11 8v6M8 11h6" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className={styles.cardShine}></div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              ) : (
                <div className={styles.noImages}>No images available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsImageCarouselSection;

