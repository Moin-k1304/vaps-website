import { useState, useCallback, useRef } from 'react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface LightboxImage {
  image: string;
  label: string;
}

export const useLightbox = (
  locomotiveScrollRef: React.RefObject<any>,
  locomotiveContainerRef: React.RefObject<HTMLDivElement | null>
) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const scrollPositionRef = useRef<number>(0);

  const openLightbox = useCallback((images: LightboxImage[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);

    if (typeof window !== 'undefined') {
      const locomotiveScroll = locomotiveScrollRef.current;
      const container = locomotiveContainerRef.current;
      
      // Get scroll position - prioritize container scrollTop as it's most reliable
      let currentScrollY = 0;
      
      // Method 1: Container scrollTop (most reliable)
      if (container) {
        currentScrollY = container.scrollTop || 0;
      }
      
      // Method 2: Try Locomotive Scroll position
      if (currentScrollY === 0 && locomotiveScroll) {
        try {
          if (locomotiveScroll.scroll?.instance?.scroll?.y !== undefined) {
            currentScrollY = locomotiveScroll.scroll.instance.scroll.y;
          } else if (locomotiveScroll.scroll?.instance?.y !== undefined) {
            currentScrollY = locomotiveScroll.scroll.instance.y;
          } else if (locomotiveScroll.scroll?.y !== undefined) {
            currentScrollY = locomotiveScroll.scroll.y;
          }
        } catch (e) {
          console.warn('Could not get Locomotive Scroll position:', e);
        }
      }
      
      // Method 3: Window scroll (last resort)
      if (currentScrollY === 0) {
        currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      }

      // Save scroll position
      scrollPositionRef.current = currentScrollY;

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.width = '100%';
      document.body.classList.add('lightbox-open');

      // Stop Locomotive Scroll
      if (locomotiveScroll && locomotiveScroll.stop) {
        locomotiveScroll.stop();
      }
    }
  }, [locomotiveScrollRef, locomotiveContainerRef]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);

    if (typeof window !== 'undefined') {
      const locomotiveScroll = locomotiveScrollRef.current;
      const container = locomotiveContainerRef.current;
      const savedScrollPosition = scrollPositionRef.current;

      // Restore body styles immediately
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('lightbox-open');

      // Restore scroll position - use multiple approaches
      const restoreScroll = () => {
        // Method 1: Direct container scrollTop (most reliable)
        if (container) {
          container.scrollTop = savedScrollPosition;
        }

        // Method 2: Locomotive Scroll scrollTo
        if (locomotiveScroll && locomotiveScroll.scrollTo) {
          try {
            locomotiveScroll.scrollTo(savedScrollPosition, { 
              duration: 0, 
              disableLerp: true 
            });
          } catch (e) {
            console.warn('scrollTo failed:', e);
          }
        }

        // Method 3: Direct Locomotive Scroll property
        if (locomotiveScroll && locomotiveScroll.scroll?.instance?.scroll) {
          try {
            locomotiveScroll.scroll.instance.scroll.y = savedScrollPosition;
          } catch (e) {
            // Silent fail
          }
        }

        // Method 4: Window scroll (fallback)
        window.scrollTo({
          top: savedScrollPosition,
          behavior: 'auto'
        });

        // Update Locomotive Scroll
        if (locomotiveScroll && locomotiveScroll.update) {
          locomotiveScroll.update();
        }
      };

      // Start Locomotive Scroll if available
      if (locomotiveScroll && locomotiveScroll.start) {
        locomotiveScroll.start();
      }

      // Restore immediately
      restoreScroll();

      // Use requestAnimationFrame for smooth restoration
      requestAnimationFrame(() => {
        restoreScroll();
        
        // Restore again after short delay
        setTimeout(() => {
          restoreScroll();
          ScrollTrigger.refresh();
          
          // Final restore with verification
          setTimeout(() => {
            restoreScroll();
            if (locomotiveScroll && locomotiveScroll.update) {
              locomotiveScroll.update();
            }
            ScrollTrigger.refresh();
            
            // Verify position was restored
            if (container) {
              const currentPos = container.scrollTop;
              if (Math.abs(currentPos - savedScrollPosition) > 10) {
                // Position mismatch - force restore
                container.scrollTop = savedScrollPosition;
                if (locomotiveScroll && locomotiveScroll.scrollTo) {
                  locomotiveScroll.scrollTo(savedScrollPosition, { duration: 0, disableLerp: true });
                }
                if (locomotiveScroll && locomotiveScroll.update) {
                  locomotiveScroll.update();
                }
              }
            }
          }, 100);
        }, 50);
      });
    }
  }, [locomotiveScrollRef, locomotiveContainerRef]);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    let newIndex = lightboxIndex;
    if (direction === 'prev') {
      newIndex = lightboxIndex === 0 ? lightboxImages.length - 1 : lightboxIndex - 1;
    } else {
      newIndex = lightboxIndex === lightboxImages.length - 1 ? 0 : lightboxIndex + 1;
    }
    setLightboxIndex(newIndex);
  }, [lightboxIndex, lightboxImages.length]);

  return {
    lightboxOpen,
    lightboxIndex,
    lightboxImages,
    openLightbox,
    closeLightbox,
    navigateLightbox,
    scrollPositionRef,
  };
};

