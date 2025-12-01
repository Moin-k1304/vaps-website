'use client'

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface Module {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  gradient: string;
}

interface ModulesSectionProps {
  title: string;
  description: string;
  modules: Module[];
  defaultActive?: string;
}

const ModulesSection: React.FC<ModulesSectionProps> = ({
  title,
  description,
  modules,
  defaultActive = 'Elite Classroom',
}) => {
  const [activeModule, setActiveModule] = useState(defaultActive);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const moduleContentRefs = useRef<{ [key: string]: { text: HTMLDivElement | null, image: HTMLDivElement | null } }>({});
  const moduleTabs = useMemo(() => modules.map(m => m.id), [modules]);

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

  // Optimized initial setup
  useEffect(() => {
    const activeRefs = moduleContentRefs.current[activeModule];
    if (activeRefs && activeRefs.text && activeRefs.image) {
      gsap.set([activeRefs.text, activeRefs.image], {
        opacity: 1,
        y: 0,
        scale: 1
      });
    }
  }, []);

  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .premium-module-btn {
            will-change: transform, opacity;
            transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-font-smoothing: antialiased;
          }
          
          .module-content-card {
            will-change: opacity, transform;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          
          .module-text-content,
          .module-image-content {
            will-change: opacity, transform;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          
          .premium-module-content {
            will-change: transform;
            transform: translateZ(0);
          }
          
          .premium-module-image {
            will-change: transform, opacity;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          
          .premium-module-image img {
            will-change: transform, opacity;
            transform: translateZ(0);
            backface-visibility: hidden;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `
      }} />
      <div className="container">
        <ScrollAnimationWrapper animation="fadeUp">
          <div className="text-center mb-5" style={{ marginBottom: '48px' }}>
            <h2 className='section-title'>{title}</h2>
            <div style={{
              width: '100px',
              height: '4px',
              background: 'linear-gradient(90deg, #9810FA 0%, #03297B 100%)',
              margin: '0 auto 32px',
              borderRadius: '2px'
            }} />
              <p className='section-description'>
              {description}
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="row g-2 g-md-3 justify-content-center mb-5" style={{ marginBottom: 'clamp(32px, 6vw, 64px)' }}>
          {moduleTabs.map((module, idx) => (
            <div key={module} className="col-6 col-sm-auto">
              <ScrollAnimationWrapper animation="fadeUp" delay={idx * 0.05}>
                <button
                  onClick={() => handleModuleChange(module)}
                  disabled={isTransitioning}
                  className='cta-button'
                  style={{ width: '100%' }}
                  onMouseEnter={(e) => {
                    if (!isTransitioning && activeModule !== module) {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeModule !== module) {
                      e.currentTarget.style.transform = 'none';
                    }
                  }}
                >
                  {activeModule === module && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      animation: 'shimmer 2s infinite',
                      pointerEvents: 'none'
                    }} />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{module}</span>
                </button>
              </ScrollAnimationWrapper>
            </div>
          ))}
        </div>

        <div style={{
          position: 'relative',
          minHeight: 'clamp(500px, 70vh, 700px)',
          overflow: 'hidden'
        }}>
          {modules.map((module) => {
            const isActive = activeModule === module.id;
            return (
              <div
                key={module.id}
                data-module={module.id}
                className="module-content-card"
                style={{
                  position: isActive ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  display: isActive ? 'block' : (isTransitioning ? 'block' : 'none'),
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 1 : (isTransitioning ? 2 : 0),
                  marginBottom: '0',
                  pointerEvents: isActive ? 'auto' : 'none',
                  transition: 'opacity 0.2s ease'
                }}
              >
                <div className="premium-module-content" style={{
                  background: '#ffffff',
                  padding: 'clamp(40px, 6vw, 64px)',
                  borderRadius: '32px',
                  border: 'none',
                  boxShadow: 'none',
                  backdropFilter: 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div className="row align-items-center gx-5" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="col-lg-6 mb-5 mb-lg-0">
                      <div
                        ref={(el) => {
                          if (!moduleContentRefs.current[module.id]) {
                            moduleContentRefs.current[module.id] = { text: null, image: null };
                          }
                          moduleContentRefs.current[module.id].text = el;
                        }}
                        className="module-text-content"
                      >
                        <h2 className='section-title'>{module.title}</h2>
                        <div style={{
                          width: '100px',
                          height: '4px',
                          background: 'linear-gradient(90deg, #9810FA 0%, #03297B 100%)',
                          marginBottom: '32px',
                          borderRadius: '2px'
                        }} />
                        <p className='section-description'>{module.description}</p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div
                        ref={(el) => {
                          if (!moduleContentRefs.current[module.id]) {
                            moduleContentRefs.current[module.id] = { text: null, image: null };
                          }
                          moduleContentRefs.current[module.id].image = el;
                        }}
                        className="module-image-content"
                        data-active={isActive}
                      >
                        <div className="premium-module-image" style={{
                          position: 'relative',
                          height: 'clamp(350px, 50vh, 500px)',
                          borderRadius: '32px',
                          overflow: 'hidden',
                          background: 'transparent',
                          border: 'none',
                          width: '100%',
                          display: 'flex',
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onMouseEnter={(e) => {
                          if (isActive) {
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        >
                          <img
                            src={module.image}
                            alt={module.imageAlt || module.title}
                            loading={isActive ? 'eager' : 'lazy'}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '32px',
                              zIndex: 2,
                              position: 'relative',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
