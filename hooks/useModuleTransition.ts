import { useState, useCallback, useRef, useEffect } from 'react';
import gsap from 'gsap';

export const useModuleTransition = (initialModule: string = 'Smart Cards') => {
  const [activeModule, setActiveModule] = useState(initialModule);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const moduleContentRefs = useRef<{ [key: string]: { text: HTMLDivElement | null, image: HTMLDivElement | null } }>({});

  const handleModuleChange = useCallback((module: string) => {
    if (isTransitioning || activeModule === module) return;

    setIsTransitioning(true);
    const currentModule = activeModule;
    const nextModule = module;

    const currentRefs = moduleContentRefs.current[currentModule];
    const nextRefs = moduleContentRefs.current[nextModule];

    const currentCard = document.querySelector(`.module-content-card[data-module="${currentModule}"]`) as HTMLElement;
    const nextCard = document.querySelector(`.module-content-card[data-module="${nextModule}"]`) as HTMLElement;

    if (!nextCard) {
      setActiveModule(nextModule);
      setIsTransitioning(false);
      return;
    }

    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      nextCard.style.display = 'block';
      nextCard.style.position = 'absolute';
      nextCard.style.top = '0';
      nextCard.style.left = '0';
      nextCard.style.width = '100%';
      nextCard.style.zIndex = '2';
      nextCard.style.opacity = '0';

      if (currentCard) {
        currentCard.style.zIndex = '1';
      }

      // Faster, optimized animations
      if (currentRefs && currentRefs.text && currentRefs.image) {
        const tl = gsap.timeline({
          onComplete: () => {
            if (currentCard) {
              currentCard.style.display = 'none';
            }

            setActiveModule(nextModule);

            if (nextRefs && nextRefs.text && nextRefs.image) {
              // Set initial state for smooth animation
              gsap.set([nextRefs.text, nextRefs.image], {
                opacity: 0,
                y: 20,
                scale: 0.98
              });

              // Get image element for smooth animation
              const nextImage = nextRefs.image.querySelector('img') as HTMLImageElement;
              if (nextImage) {
                gsap.set(nextImage, {
                  opacity: 0,
                  scale: 0.95
                });
              }

              // Fade in next card
              gsap.to(nextCard, {
                opacity: 1,
                duration: 0.25,
                ease: 'power2.out',
                force3D: true
              });

              // Animate text and image container
              gsap.to([nextRefs.text, nextRefs.image], {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.08,
                force3D: true
              });

              // Smooth image animation
              if (nextImage) {
                gsap.to(nextImage, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.6,
                  ease: 'power2.out',
                  delay: 0.1,
                  force3D: true
                });
              }

              // Complete transition
              gsap.delayedCall(0.7, () => {
                if (nextCard) {
                  nextCard.style.position = 'relative';
                  nextCard.style.zIndex = '1';
                }
                setIsTransitioning(false);
              });
            } else {
              setIsTransitioning(false);
            }
          }
        });

        // Faster fade out
        tl.to([currentRefs.text, currentRefs.image], {
          opacity: 0,
          y: -20,
          scale: 0.98,
          duration: 0.25,
          ease: 'power2.in',
          stagger: 0.03,
          force3D: true
        });

        // Fade out current card
        tl.to(currentCard, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
          force3D: true
        }, '-=0.1');
      } else {
        // Direct transition if no current refs
        if (nextRefs && nextRefs.text && nextRefs.image) {
          gsap.set([nextRefs.text, nextRefs.image], {
            opacity: 0,
            y: 20,
            scale: 0.98
          });

          const nextImage = nextRefs.image.querySelector('img') as HTMLImageElement;
          if (nextImage) {
            gsap.set(nextImage, {
              opacity: 0,
              scale: 0.95
            });
          }

          gsap.to(nextCard, {
            opacity: 1,
            duration: 0.25,
            ease: 'power2.out',
            force3D: true
          });

          gsap.to([nextRefs.text, nextRefs.image], {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.08,
            force3D: true
          });

          if (nextImage) {
            gsap.to(nextImage, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
              delay: 0.1,
              force3D: true,
              onComplete: () => {
                if (nextCard) {
                  nextCard.style.position = 'relative';
                  nextCard.style.zIndex = '1';
                }
                setIsTransitioning(false);
              }
            });
          } else {
            gsap.delayedCall(0.7, () => {
              if (nextCard) {
                nextCard.style.position = 'relative';
                nextCard.style.zIndex = '1';
              }
              setIsTransitioning(false);
            });
          }
        } else {
          setActiveModule(nextModule);
          setIsTransitioning(false);
        }
      }
    });
  }, [activeModule, isTransitioning]);

  useEffect(() => {
    // Optimized initial setup
    const activeRefs = moduleContentRefs.current[activeModule];
    if (activeRefs && activeRefs.text && activeRefs.image) {
      gsap.set([activeRefs.text, activeRefs.image], {
        opacity: 1,
        y: 0,
        scale: 1
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      Object.values(moduleContentRefs.current).forEach(refs => {
        if (refs.text) gsap.killTweensOf(refs.text);
        if (refs.image) gsap.killTweensOf(refs.image);
      });
    };
  }, []);

  return {
    activeModule,
    isTransitioning,
    handleModuleChange,
    moduleContentRefs
  };
};
