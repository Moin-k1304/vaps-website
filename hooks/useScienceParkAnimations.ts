import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export const useScienceParkAnimations = (
  floatingElementsRef: React.RefObject<HTMLDivElement | null>,
  contactFormRef: React.RefObject<HTMLFormElement | null>
) => {
  const animationRefs = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const floatingElements = floatingElementsRef.current?.querySelectorAll('.floating-element');
    if (!floatingElements || floatingElements.length === 0) return;

    floatingElements.forEach((el) => {
      (el as HTMLElement).style.willChange = 'transform';
    });

    const animations: gsap.core.Tween[] = [];
    floatingElements.forEach((el, index) => {
      const anim = gsap.to(el, {
        y: 'random(-30, 30)',
        x: 'random(-20, 20)',
        rotation: 'random(-10, 10)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
        force3D: true
      });
      animations.push(anim);
    });

    animationRefs.current = animations;

    return () => {
      animations.forEach(anim => anim.kill());
    };
  }, [floatingElementsRef]);

  useEffect(() => {
    const form = contactFormRef.current;
    if (!form) return;

    const inputs = form.querySelectorAll('.premium-input');
    const submitBtn = form.querySelector('.premium-submit-btn');

    const ctx = gsap.context(() => {
      gsap.fromTo(inputs,
        { opacity: 0, y: 20, force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          force3D: true
        }
      );

      if (submitBtn) {
        gsap.fromTo(submitBtn,
          { opacity: 0, scale: 0.9, force3D: true },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            delay: 0.4,
            scrollTrigger: {
              trigger: form,
              start: 'top 80%',
              toggleActions: 'play none none none'
            },
            force3D: true
          }
        );
      }
    }, form);

    return () => ctx.revert();
  }, [contactFormRef]);
};


