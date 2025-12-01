'use client'

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Orb from '@/components/products-bg/orb';

interface DigitalCampusHeroProps {
  badge: string;
  title: string;
  description: string;
  ctaText: string;
}

const DigitalCampusHero: React.FC<DigitalCampusHeroProps> = ({
  badge,
  title,
  description,
  ctaText,
}) => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const heroContent = heroRef.current?.querySelectorAll('.hero-content > *');
      heroContent?.forEach((el) => {
        (el as HTMLElement).style.willChange = 'transform, opacity';
      });

      gsap.fromTo('.hero-content > *',
        { opacity: 0, y: 50, force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2,
          force3D: true,
          onComplete: () => {
            heroContent?.forEach((el) => {
              (el as HTMLElement).style.willChange = 'auto';
            });
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: 'clamp(600px, 100vh, 100vh)',
        width: '100%',
        overflow: 'hidden',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'auto'
        }}
      >
        <Orb
          hoverIntensity={2}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>

      <div className="container position-relative" style={{
        zIndex: 2,
        paddingTop: 'clamp(80px, 15vw, 120px)',
        paddingBottom: 'clamp(80px, 15vw, 120px)',
        paddingLeft: '15px',
        paddingRight: '15px'
      }}>
        <div className="row align-items-center">
          <div className="col-lg-12 text-center">
            <div className="hero-content">
              <div style={{
                display: 'inline-block',
                marginBottom: '24px',
                padding: '8px 20px',
                background: 'rgba(255, 123, 0, 0.15)',
                borderLeft: '4px solid #FF7B00',
                borderRadius: '6px',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#FF7B00',
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}>{badge}</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '24px',
                color: '#ffffff',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
              }}>
                {title}
              </h1>

              <div style={{
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #9810FA 0%, #7445DF 100%)',
                borderRadius: '2px',
                margin: '0 auto 32px'
              }} />

              <p style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '40px',
                maxWidth: '800px',
                margin: '0 auto 40px'
              }}>
                {description}
              </p>

              <button 
              className="cta-button">
                <span>{ctaText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalCampusHero;
