'use client'

import { memo, useCallback, useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import styles from '../../styles/AboutUsPage.module.css';

import 'swiper/css';
import 'swiper/css/pagination';

interface ShowcaseItem {
  label: string;
  image: string;
}

interface ShowcaseSectionProps {
  title: string;
  description: string;
  items: ShowcaseItem[];
  onItemClick: (items: ShowcaseItem[], index: number) => void;
  autoplayDelay?: number;
}

const ShowcaseSection: React.FC<ShowcaseSectionProps> = memo(({
  title,
  description,
  items,
  onItemClick,
  autoplayDelay = 4000,
}) => {
  const swiperRef = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleItemClick = useCallback((index: number) => {
    onItemClick(items, index);
  }, [items, onItemClick]);

  // Intersection Observer for lazy loading - only render Swiper when visible
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Optimize loop - only enable if enough items
  const shouldLoop = items.length > 4;

  return (
    <section 
      ref={sectionRef}
      className={styles.showcaseSection} 
      data-scroll-section 
      style={{
        backgroundImage: 'url(/images/svgs/bg-lines.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container">
        <div className={styles.showcaseContainer}>
          <div className={styles.showcaseLeft}>
            <ScrollAnimationWrapper animation="fadeRight">
              <h2 className={styles.showcaseTitle} style={{ color: 'white' }}>{title}</h2>
              <p className={styles.showcaseDescription} style={{ color: 'rgba(255,255,255,0.8)' }}>
                {description}
              </p>
            </ScrollAnimationWrapper>
          </div>
          <div className={styles.showcaseRight} data-scroll data-scroll-speed="0">
            {isVisible && (
              <Swiper
                ref={swiperRef}
                modules={[Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                centeredSlides={false}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                  dynamicMainBullets: 3,
                }}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  stopOnLastSlide: false,
                }}
                breakpoints={{
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
                className={styles.showcaseSwiper}
                speed={600}
                loop={shouldLoop}
                loopAdditionalSlides={shouldLoop ? 2 : 0}
                loopPreventsSliding={false}
                touchReleaseOnEdges={true}
                resistance={true}
                resistanceRatio={0.85}
                watchSlidesProgress={false}
                watchOverflow={true}
                observer={true}
                observeParents={true}
                updateOnWindowResize={true}
                preventClicks={false}
                preventClicksPropagation={false}
                freeMode={false}
                grabCursor={true}
              >
                {items.map((item, index) => (
                  <SwiperSlide 
                    key={`${item.label}-${index}`}
                    style={{ 
                      transform: 'translateZ(0)',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <div
                      className={styles.showcaseCard}
                      onClick={() => handleItemClick(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleItemClick(index)}
                      aria-label={`View ${item.label} full size`}
                    >
                      <div className={styles.showcaseImageWrapper}>
                        <Image
                          src={item.image}
                          alt={item.label}
                          fill
                          className={styles.showcaseImage}
                          loading={index < 3 ? "eager" : "lazy"}
                          quality={index < 3 ? 90 : 75}
                          sizes="(max-width: 480px) 80vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k="
                          priority={index < 2}
                        />
                        <div className={styles.showcaseOverlay}>
                          <span className={styles.showcaseLabel}>{item.label}</span>
                        </div>
                        <div className={styles.zoomIcon}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                            <path d="M11 8v6M8 11h6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

ShowcaseSection.displayName = 'ShowcaseSection';

export default ShowcaseSection;
