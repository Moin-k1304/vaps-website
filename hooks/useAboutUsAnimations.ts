import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export const useAboutUsAnimations = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const missionCards = containerRef.current?.querySelectorAll('.mission-vision-card');
      missionCards?.forEach((card, idx) => {
        const cardElement = card as HTMLElement;

        gsap.fromTo(cardElement,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: idx * 0.15,
            scrollTrigger: {
              trigger: cardElement,
              start: 'top 85%',
              toggleActions: 'play none none none', // Don't reverse for better performance
              once: true, // Only animate once
              refreshPriority: -1,
            },
          }
        );
      });

      const leadershipImage = containerRef.current?.querySelector('.leadershipImageWrapper');
      if (leadershipImage) {
        const imgElement = leadershipImage as HTMLElement;
        gsap.fromTo(imgElement,
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imgElement,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
              refreshPriority: -1,
            },
          }
        );
      }

      // Optimize showcase cards - use Intersection Observer for better performance
      const showcaseCards = containerRef.current?.querySelectorAll('.showcaseCard');
      if (showcaseCards && showcaseCards.length > 0) {
        // Use Intersection Observer to only animate visible cards
        const cardObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry, idx) => {
              if (entry.isIntersecting) {
                const cardElement = entry.target as HTMLElement;
                
                gsap.fromTo(cardElement,
                  {
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                  },
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    delay: idx * 0.03,
                  }
                );

                cardObserver.unobserve(cardElement);
              }
            });
          },
          { threshold: 0.1, rootMargin: '50px' }
        );

        showcaseCards.forEach((card) => {
          const cardElement = card as HTMLElement;
          cardObserver.observe(cardElement);

          // Use CSS for hover instead of GSAP for better performance
          // Hover effects are handled by CSS in AboutUsPage.module.css
          // No need for JavaScript hover handlers
        });

        // Store observer for cleanup
        (containerRef.current as any).__showcaseObserver = cardObserver;
      }

      const ctaSection = containerRef.current?.querySelector('.cta-section');
      if (ctaSection) {
        const ctaElements = ctaSection.querySelectorAll('.ctaTitle, .ctaSubtitle, .ctaInfo, .ctaButton');
        ctaElements.forEach((el, idx) => {
          const element = el as HTMLElement;
          gsap.fromTo(element,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: idx * 0.08,
              scrollTrigger: {
                trigger: ctaSection,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
                refreshPriority: -1,
              },
            }
          );
        });
      }
    }, containerRef);

    return () => {
      // Cleanup Intersection Observer
      if ((containerRef.current as any)?.__showcaseObserver) {
        (containerRef.current as any).__showcaseObserver.disconnect();
      }
      ctx.revert();
    };
  }, [containerRef]);
};

