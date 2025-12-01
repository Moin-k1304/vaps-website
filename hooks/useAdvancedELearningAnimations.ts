import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export const useAdvancedELearningAnimations = (
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
        scale: 'random(0.98, 1.02)',
        duration: 'random(5, 7)',
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
    // Optimized: Only apply parallax to visible images, reduce movement
    const images = document.querySelectorAll('.advanced-elearning-page .premium-module-image img');
    images.forEach((img) => {
      const image = img as HTMLElement;
      // Only apply parallax if image is in viewport
      ScrollTrigger.create({
        trigger: image,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (self.isActive) {
            const progress = self.progress;
            gsap.set(image, {
              y: progress * -15, // Reduced from -30 for better performance
              force3D: true
            });
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    const infrastructureSection = document.querySelector('.section-space');
    if (!infrastructureSection) return;

    const ctx = gsap.context(() => {
      const infrastructureImage = infrastructureSection.querySelector('.col-lg-6:first-child > div');
      if (infrastructureImage) {
        (infrastructureImage as HTMLElement).style.willChange = 'transform, opacity';
        gsap.fromTo(infrastructureImage,
          {
            opacity: 0,
            x: -100,
            y: 50,
            scale: 0.7,
            rotationY: -30,
            z: -200,
            force3D: true
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 1.2,
            ease: 'back.out(1.7)',
            force3D: true,
            scrollTrigger: {
              trigger: infrastructureImage,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            onComplete: () => {
              (infrastructureImage as HTMLElement).style.willChange = 'auto';
            }
          }
        );
      }

      const infrastructureText = infrastructureSection.querySelector('.col-lg-6:last-child > div');
      if (infrastructureText) {
        const elements = infrastructureText.querySelectorAll('h2, div[style*="width: 100px"], p');
        elements.forEach((el, idx) => {
          const element = el as HTMLElement;
          element.style.willChange = 'transform, opacity';
          gsap.fromTo(element,
            {
              opacity: 0,
              x: 100,
              y: 30,
              scale: 0.9,
              rotationX: 15,
              force3D: true
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay: idx * 0.15,
              force3D: true,
              scrollTrigger: {
                trigger: infrastructureText,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              },
              onComplete: () => {
                element.style.willChange = 'auto';
              }
            }
          );
        });
      }
    }, infrastructureSection);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const modulesSection = document.querySelector('.section-space:nth-of-type(3)');
    if (!modulesSection) return;

    const ctx = gsap.context(() => {
      const header = modulesSection.querySelector('.text-center');
      if (header) {
        const headerElements = header.querySelectorAll('h2, div[style*="width: 100px"], p');
        headerElements.forEach((el, idx) => {
          const element = el as HTMLElement;
          element.style.willChange = 'transform, opacity';
          gsap.fromTo(element,
            {
              opacity: 0,
              y: 30,
              scale: 0.95,
              force3D: true
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
              delay: idx * 0.08,
              force3D: true,
              scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                once: true
              },
              onComplete: () => {
                element.style.willChange = 'auto';
              }
            }
          );
        });
      }

      const moduleButtons = modulesSection.querySelectorAll('.premium-module-btn');
      moduleButtons.forEach((btn, idx) => {
        const button = btn as HTMLElement;
        button.style.willChange = 'transform, opacity';
        gsap.fromTo(button,
          {
            opacity: 0,
            scale: 0.9,
            y: 20,
            force3D: true
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            delay: idx * 0.06,
            force3D: true,
            scrollTrigger: {
              trigger: button,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
              once: true
            },
            onComplete: () => {
              button.style.willChange = 'auto';
            }
          }
        );
      });
    }, modulesSection);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const whyVapsSection = document.querySelector('.section-space:nth-of-type(4)');
    if (!whyVapsSection) return;

    const ctx = gsap.context(() => {
      const header = whyVapsSection.querySelector('.text-center');
      if (header) {
        const headerElements = header.querySelectorAll('h2, div[style*="width: 100px"]');
        headerElements.forEach((el, idx) => {
          const element = el as HTMLElement;
          element.style.willChange = 'transform, opacity';
          gsap.fromTo(element,
            {
              opacity: 0,
              y: 50,
              scale: 0.9,
              force3D: true
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              delay: idx * 0.15,
              force3D: true,
              scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              },
              onComplete: () => {
                element.style.willChange = 'auto';
              }
            }
          );
        });
      }

      const whyCards = whyVapsSection.querySelectorAll('.premium-why-card');
      whyCards.forEach((card, idx) => {
        const cardElement = card as HTMLElement;
        cardElement.style.willChange = 'transform, opacity';

        gsap.fromTo(cardElement,
          {
            opacity: 0,
            scale: 0.6,
            rotationY: 25,
            rotationX: -15,
            y: 80,
            z: -200,
            force3D: true
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            y: 0,
            z: 0,
            duration: 0.9,
            ease: 'back.out(1.3)',
            delay: idx * 0.12,
            force3D: true,
            scrollTrigger: {
              trigger: cardElement,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            },
            onComplete: () => {
              cardElement.style.willChange = 'auto';
            }
          }
        );

        const icon = cardElement.querySelector('.why-icon');
        if (icon) {
          const iconElement = icon as HTMLElement;
          iconElement.style.willChange = 'transform';
          gsap.fromTo(iconElement,
            {
              scale: 0,
              rotation: -180,
              force3D: true
            },
            {
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: 'elastic.out(1, 0.8)',
              delay: idx * 0.12 + 0.3,
              force3D: true,
              scrollTrigger: {
                trigger: cardElement,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        cardElement.addEventListener('mouseenter', () => {
          gsap.to(cardElement, {
            scale: 1.05,
            rotationY: 5,
            rotationX: -2,
            z: 30,
            duration: 0.4,
            ease: 'power2.out',
            force3D: true
          });
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(cardElement, {
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            duration: 0.4,
            ease: 'power2.out',
            force3D: true
          });
        });
      });
    }, whyVapsSection);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const accreditationsSection = document.querySelector('.section-space:nth-of-type(5)');
    if (!accreditationsSection) return;

    const ctx = gsap.context(() => {
      const header = accreditationsSection.querySelector('.text-center');
      if (header) {
        const headerElements = header.querySelectorAll('h2, div[style*="width"]');
        headerElements.forEach((el, idx) => {
          const element = el as HTMLElement;
          element.style.willChange = 'transform, opacity';
          gsap.fromTo(element,
            {
              opacity: 0,
              y: 50,
              clipPath: 'inset(0 0 100% 0)',
              force3D: true
            },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.9,
              ease: 'power3.out',
              delay: idx * 0.2,
              force3D: true,
              scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              },
              onComplete: () => {
                element.style.willChange = 'auto';
              }
            }
          );
        });
      }

      const accordions = accreditationsSection.querySelectorAll('.premium-accordion-wrapper');
      accordions.forEach((accordion, idx) => {
        const accordionElement = accordion as HTMLElement;
        accordionElement.style.willChange = 'transform, opacity';

        gsap.fromTo(accordionElement,
          {
            opacity: 0,
            scale: 0.85,
            rotationX: -10,
            y: 60,
            force3D: true
          },
          {
            opacity: 1,
            scale: 1,
            rotationX: 0,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.2)',
            delay: idx * 0.15,
            force3D: true,
            scrollTrigger: {
              trigger: accordionElement,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            },
            onComplete: () => {
              accordionElement.style.willChange = 'auto';
            }
          }
        );
      });
    }, accreditationsSection);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const form = contactFormRef.current;
    if (!form) return;

    const inputs = form.querySelectorAll('.premium-input');
    const submitBtn = form.querySelector('.premium-submit-btn');
    const mobileMockup = document.querySelector('.contact-mobile-mockup');

    const ctx = gsap.context(() => {
      inputs.forEach((input, idx) => {
        const inputElement = input as HTMLElement;
        inputElement.style.willChange = 'transform, opacity';
        gsap.fromTo(inputElement,
          {
            opacity: 0,
            x: -50,
            y: 30,
            scale: 0.9,
            rotationY: -15,
            force3D: true
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.7,
            ease: 'back.out(1.2)',
            delay: idx * 0.1,
            force3D: true,
            scrollTrigger: {
              trigger: form,
              start: 'top 80%',
              toggleActions: 'play none none none'
            },
            onComplete: () => {
              inputElement.style.willChange = 'auto';
            }
          }
        );
      });

      if (submitBtn) {
        const btnElement = submitBtn as HTMLElement;
        btnElement.style.willChange = 'transform, opacity';
        gsap.fromTo(btnElement,
          {
            opacity: 0,
            scale: 0.5,
            rotation: -180,
            y: 50,
            force3D: true
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            y: 0,
            duration: 0.9,
            ease: 'elastic.out(1, 0.8)',
            delay: 0.5,
            force3D: true,
            scrollTrigger: {
              trigger: form,
              start: 'top 80%',
              toggleActions: 'play none none none'
            },
            onComplete: () => {
              btnElement.style.willChange = 'auto';
            }
          }
        );
      }

      if (mobileMockup) {
        const mockupElement = mobileMockup as HTMLElement;
        mockupElement.style.willChange = 'transform, opacity';
        gsap.fromTo(mockupElement,
          {
            opacity: 0,
            x: 100,
            y: 50,
            scale: 0.6,
            rotationY: 45,
            rotationX: -20,
            z: -300,
            force3D: true
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            duration: 1.2,
            ease: 'back.out(1.4)',
            force3D: true,
            scrollTrigger: {
              trigger: mockupElement,
              start: 'top 80%',
              toggleActions: 'play none none none'
            },
            onComplete: () => {
              mockupElement.style.willChange = 'auto';
            }
          }
        );

        gsap.to(mockupElement, {
          y: '+=20',
          rotation: '+=2',
          duration: 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          force3D: true
        });
      }
    }, form);

    return () => ctx.revert();
  }, [contactFormRef]);
};

