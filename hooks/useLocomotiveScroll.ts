import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseLocomotiveScrollOptions {
  smooth?: boolean;
  smoothMobile?: boolean;
  lerp?: number;
  multiplier?: number;
  class?: string;
  scrollbarContainer?: HTMLElement | string;
  scrollbarClass?: string;
  scrollingClass?: string;
  draggingClass?: string;
  smoothClass?: string;
  initPosition?: { x: number; y: number };
  getSpeed?: boolean;
  getDirection?: boolean;
  reloadOnContextChange?: boolean;
  resetNativeScroll?: boolean;
  tablet?: { smooth?: boolean; breakpoint?: number };
  smartphone?: { smooth?: boolean; breakpoint?: number };
}

export const useLocomotiveScroll = (options?: UseLocomotiveScrollOptions) => {
  const scrollRef = useRef<any>(null); // Using any since LocomotiveScroll is dynamically imported
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    let scrollInstance: any = null;

    // Dynamic import to avoid SSR issues
    import('locomotive-scroll').then((LocomotiveScrollModule) => {
      const LocomotiveScroll = LocomotiveScrollModule.default;
      
      scrollInstance = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        smoothMobile: false, // Disable on mobile for better performance
        lerp: 0.1, // Lower = smoother but slower response
        multiplier: 1.2, // Scroll speed multiplier
        class: 'is-inview',
        scrollbarContainer: undefined,
        scrollbarClass: 'c-scrollbar',
        scrollingClass: 'has-scroll-scrolling',
        draggingClass: 'has-scroll-dragging',
        smoothClass: 'has-scroll-smooth',
        initPosition: { x: 0, y: 0 },
        getSpeed: false,
        getDirection: true,
        reloadOnContextChange: true,
        resetNativeScroll: true,
        tablet: {
          smooth: true,
          breakpoint: 1024,
        },
        smartphone: {
          smooth: false,
          breakpoint: 767,
        },
        ...options,
      });

      scrollRef.current = scrollInstance;

      // Update ScrollTrigger when Locomotive Scroll updates
      if (typeof window !== 'undefined' && ScrollTrigger) {
        scrollInstance.on('scroll', ScrollTrigger.update);
        
        ScrollTrigger.scrollerProxy(containerRef.current, {
          scrollTop(value) {
            return arguments.length
              ? scrollInstance.scrollTo(value, { duration: 0, disableLerp: true })
              : scrollInstance.scroll.instance.scroll.y;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: containerRef.current?.style.transform ? 'transform' : 'fixed',
        });

        ScrollTrigger.addEventListener('refresh', () => scrollInstance.update());
        
        // Refresh ScrollTrigger after a short delay to ensure everything is initialized
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    }).catch((error) => {
      console.error('Failed to load LocomotiveScroll:', error);
    });

    return () => {
      if (scrollInstance) {
        scrollInstance.destroy();
        scrollInstance = null;
      }
      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
    };
  }, []);

  return { scrollRef, containerRef };
};

