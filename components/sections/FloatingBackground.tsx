'use client'

import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';

const FloatingBackground: React.FC = memo(() => {
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const animationRefs = useRef<gsap.core.Tween[]>([]);
  const isReducedMotion = useRef(false);

  useEffect(() => {
    let mediaQuery: MediaQueryList | null = null;
    let handleChange: ((e: MediaQueryListEvent) => void) | null = null;

    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      isReducedMotion.current = mediaQuery.matches;
      
      if (isReducedMotion.current) {
        return; // Don't animate if reduced motion is preferred
      }
      
      handleChange = (e: MediaQueryListEvent) => {
        isReducedMotion.current = e.matches;
        if (e.matches) {
          animationRefs.current.forEach(anim => anim.kill());
          animationRefs.current = [];
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
    }

    const floatingElements = floatingElementsRef.current?.querySelectorAll('.floating-element');
    if (!floatingElements || floatingElements.length === 0) {
      return () => {
        if (mediaQuery && handleChange) {
          mediaQuery.removeEventListener('change', handleChange);
        }
      };
    }

    floatingElements.forEach((el) => {
      (el as HTMLElement).style.transform = 'translateZ(0)';
    });

    const animations: gsap.core.Tween[] = [];
    floatingElements.forEach((el, index) => {
      // Reduced animation intensity for better performance
      const anim = gsap.to(el, {
        y: `random(-20, 20)`,
        x: `random(-15, 15)`,
        scale: `random(0.98, 1.02)`,
        duration: `random(6, 10)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5,
      });
      animations.push(anim);
    });

    animationRefs.current = animations;

    return () => {
      animations.forEach(anim => anim.kill());
      if (mediaQuery && handleChange) {
        mediaQuery.removeEventListener('change', handleChange);
      }
    };
  }, []);

  return (
    <div
      ref={floatingElementsRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        transform: 'translateZ(0)'
      }}
    >
      <div
        className="floating-element absolute top-20 left-10 w-96 h-96 bg-purple-primary/5 rounded-full blur-3xl"
      />
      <div
        className="floating-element absolute top-40 right-20 w-[500px] h-[500px] bg-blue-primary/5 rounded-full blur-3xl"
      />
      <div
        className="floating-element absolute bottom-20 left-1/4 w-80 h-80 bg-purple-primary/5 rounded-full blur-3xl"
      />
      <div
        className="floating-element absolute bottom-40 right-1/3 w-72 h-72 bg-blue-primary/5 rounded-full blur-3xl"
      />
    </div>
  );
});

FloatingBackground.displayName = 'FloatingBackground';

export default FloatingBackground;


