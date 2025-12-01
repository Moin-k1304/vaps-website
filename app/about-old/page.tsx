'use client'

import { useEffect, useRef, memo, useMemo } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../../styles/AboutUsPage.module.css';
import PageHero from '@/components/sections/PageHero';
import FloatingBackground from '@/components/sections/FloatingBackground';
import { useLocomotiveScroll } from '@/hooks/useLocomotiveScroll';
import { useLightbox } from '@/hooks/useLightbox';
import { useAboutUsAnimations } from '@/hooks/useAboutUsAnimations';

import 'locomotive-scroll/dist/locomotive-scroll.css';

// Dynamic imports for better code splitting and performance
const SliderTimeline = dynamic(() => import('@/components/sections/SliderTimeline'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '400px' }} />
});

const MissionVisionSection = dynamic(() => import('@/components/sections/MissionVisionSection'), {
  ssr: false
});

const LeadershipSection = dynamic(() => import('@/components/sections/LeadershipSection'), {
  ssr: false
});

const ShowcaseSection = dynamic(() => import('@/components/sections/ShowcaseSection'), {
  ssr: false
});

const WarpSpeedClients = dynamic(() => import('@/components/sections/WarpSpeedClients'), {
  ssr: false
});

const CTASection = dynamic(() => import('@/components/sections/CTASection'), {
  ssr: false
});

const Lightbox = dynamic(() => import('@/components/sections/Lightbox'), {
  ssr: false
});

// Import data
import heroData from '@/data/about-us/hero';
import missionVisionData from '@/data/about-us/mission-vision';
import leadershipData from '@/data/about-us/leadership';
import awardsData from '@/data/about-us/awards';
import infrastructureData from '@/data/about-us/infrastructure';
import clientsData from '@/data/about-us/clients';
import ctaData from '@/data/about-us/cta';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ force3D: false, nullTargetWarn: false }); // Disable force3D for better performance
  ScrollTrigger.config({ 
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  });
}

const AboutUsPage: React.FC = () => {
  const { scrollRef: locomotiveScrollRef, containerRef: locomotiveContainerRef } = useLocomotiveScroll({
    smooth: true,
    smoothMobile: false,
    lerp: 0.1, // Slightly higher for better performance
    multiplier: 1.0, // Reduced for smoother scrolling
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const {
    lightboxOpen,
    lightboxIndex,
    lightboxImages,
    openLightbox,
    closeLightbox,
    navigateLightbox,
    scrollPositionRef,
  } = useLightbox(locomotiveScrollRef, locomotiveContainerRef);

  // Memoize handlers to prevent unnecessary re-renders
  const handleAwardsClick = useMemo(() => (items: any[], index: number) => openLightbox(items, index), [openLightbox]);
  const handleInfrastructureClick = useMemo(() => (items: any[], index: number) => openLightbox(items, index), [openLightbox]);
  const handleImageCarouselClick = useMemo(() => (items: any[], index: number) => openLightbox(items, index), [openLightbox]);

  useAboutUsAnimations(containerRef);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Debounce ScrollTrigger refresh
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.aboutPage}
      style={{
        position: 'relative',
        overflowX: 'hidden',
        contain: 'layout style paint',
        willChange: 'scroll-position'
      }}
    >
      <FloatingBackground />

      <div className={styles.headerSpacer} />

      <PageHero
        title={heroData.title}
        subtitle={heroData.subtitle}
        description={heroData.description}
        image={heroData.image}
        ctaText={heroData.ctaText}
      />

      <SliderTimeline />

      <MissionVisionSection
        title={missionVisionData.title}
        cards={missionVisionData.cards}
      />

      <LeadershipSection
        image={leadershipData.image}
        title={leadershipData.title}
        message={leadershipData.message}
        name={leadershipData.name}
        role={leadershipData.role}
      />

      <ShowcaseSection
        title="Our Awards"
        description="Awards and recognitions that we have received for our work."
        items={awardsData}
        onItemClick={handleAwardsClick}
        autoplayDelay={4000}
      />

      <WarpSpeedClients
        clients={clientsData}
      />

      <ShowcaseSection
        title="Our Infrastructure"
        description="Our infrastructure is designed to provide a secure, reliable, and scalable environment for our clients."
        items={infrastructureData}
        onItemClick={handleInfrastructureClick}
        autoplayDelay={3500}
      />

      <CTASection
        title={ctaData.title}
        subtitle={ctaData.subtitle}
        phone={ctaData.phone}
        links={ctaData.links}
        buttonText={ctaData.buttonText}
      />

      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
          body.lightbox-open {
            overflow: hidden !important;
            position: fixed !important;
            width: 100% !important;
            height: 100% !important;
          }
          
          [data-scroll-container] .lightboxOverlay,
          [data-scroll-section] .lightboxOverlay {
            position: fixed !important;
            transform: none !important;
            -webkit-transform: none !important;
          }
          
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          .aboutPage {
            position: relative;
            z-index: 1;
          }
          
          .floating-element {
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          
          .warpTrack {
            transform: translateZ(0);
            backface-visibility: hidden;
            contain: layout style paint;
          }
          
          .mission-vision-card, .showcaseCard, .clientCard {
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          
          img {
            image-rendering: -webkit-optimize-contrast;
            transform: translateZ(0);
          }
          
          .swiper-wrapper {
            transform: translateZ(0);
          }
          
          .swiper-slide {
            backface-visibility: hidden;
            transform: translateZ(0);
          }
          
          .mission-vision-card, .showcaseCard {
            transition: transform 0.2s ease-out;
          }
          
          /* Performance optimizations */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          @media (max-width: 768px) {
            .floating-element {
              opacity: 0.3;
            }
            
            .warpTrack {
              will-change: auto;
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            .floating-element,
            .warpTrack,
            .mission-vision-card,
            .showcaseCard {
              animation: none !important;
              transform: none !important;
              transition: none !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default memo(AboutUsPage);
