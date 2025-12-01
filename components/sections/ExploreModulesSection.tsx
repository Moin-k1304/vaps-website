'use client'

import { useRef, useCallback, useEffect, useMemo } from 'react';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface Module {
  id: string;
  title: string;
  description: string;
  image: string;
  gradient: string;
}

interface ExploreModulesSectionProps {
  description: string;
  title: string;
  modules: Module[];
  activeModule: string;
  isTransitioning: boolean;
  onModuleChange: (module: string) => void;
  moduleContentRefs: React.MutableRefObject<{ [key: string]: { text: HTMLDivElement | null, image: HTMLDivElement | null } }>;
}

const ExploreModulesSection: React.FC<ExploreModulesSectionProps> = ({
  description,
  title,
  modules,
  activeModule,
  isTransitioning,
  onModuleChange,
  moduleContentRefs,
}) => {
  const moduleTabs = useMemo(() => modules.map(m => m.id), [modules]);

  // Optimized click handler
  const handleTabClick = useCallback((module: string) => {
    if (!isTransitioning && activeModule !== module) {
      onModuleChange(module);
    }
  }, [activeModule, isTransitioning, onModuleChange]);

  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'white' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes imageFadeIn {
            0% {
              opacity: 0;
              transform: scale(0.95) translateY(20px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes imageSlideIn {
            0% {
              opacity: 0;
              transform: translateX(30px) scale(0.98);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
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
          
          .module-image-content[data-active="true"] .premium-module-image img {
            animation: imageFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          
          /* Mobile responsive styles for module buttons */
          .explore-module-btn {
            word-break: break-word;
            overflow-wrap: break-word;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            hyphens: auto;
          }
          
          .explore-module-btn span {
            width: 100%;
            line-height: 1.3;
            word-break: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          }
          
          @media (max-width: 575px) {
            .explore-module-btn {
              padding: 0.625rem 0.5rem !important;
              font-size: 0.7rem !important;
              line-height: 1.3;
              min-height: 42px;
              width: 100% !important;
              white-space: normal !important;
            }
            
            .explore-module-btn span {
              font-size: 0.7rem !important;
              line-height: 1.3;
              white-space: normal;
              word-break: break-word;
              overflow-wrap: break-word;
            }
            
            .row.g-2 > [class*="col-"] {
              padding-left: 4px;
              padding-right: 4px;
              margin-bottom: 8px;
            }
          }
          
          @media (min-width: 576px) and (max-width: 767px) {
            .explore-module-btn {
              padding: 0.75rem 0.875rem !important;
              font-size: 0.8rem !important;
              min-height: 44px;
              white-space: normal !important;
            }
            
            .explore-module-btn span {
              font-size: 0.8rem !important;
              line-height: 1.3;
              white-space: normal;
            }
          }
          
          @media (min-width: 576px) and (max-width: 767px) {
            .explore-module-btn {
              padding: 0.75rem 1rem !important;
              font-size: 0.875rem !important;
              min-height: 44px;
            }
          }
          
          @media (min-width: 768px) and (max-width: 991px) {
            .explore-module-btn {
              padding: 0.875rem 1.5rem !important;
              font-size: 0.938rem !important;
              min-height: 48px;
            }
          }
        `
      }} />
      <div className="container" style={{ paddingLeft: 'clamp(12px, 3vw, 15px)', paddingRight: 'clamp(12px, 3vw, 15px)' }}>
        <ScrollAnimationWrapper animation="fadeUp">
          <div className="text-center mb-5" style={{ marginBottom: 'clamp(32px, 6vw, 48px)', padding: '0 16px' }}>
          <h2 className='section-title'>{title}</h2>
             <div style={{
              width: 'clamp(60px, 15vw, 100px)',
              height: '4px',
              background: 'linear-gradient(90deg, #9810FA 0%, #03297B 100%)',
              margin: '0 auto',
              borderRadius: '2px'
            }} />
            <p className='section-description' style={{ marginTop: 10 }} >
              {description}
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="row g-2 g-md-3 justify-content-center mb-5" style={{ marginBottom: 'clamp(32px, 6vw, 64px)', padding: '0 8px', marginLeft: '-4px', marginRight: '-4px' }}>
          {moduleTabs.map((module, idx) => (
            <div key={module} className="col-6 col-sm-6 col-md-auto" style={{ marginBottom: '8px', padding: '0 4px' }}>
              <ScrollAnimationWrapper animation="fadeUp" delay={idx * 0.05}>
                <button
                  onClick={() => handleTabClick(module)}
                  disabled={isTransitioning}
                  className='cta-button explore-module-btn'
                  style={{ 
                    width: '100%',
                    minWidth: 'fit-content',
                    whiteSpace: 'normal',
                    padding: 'clamp(0.75rem, 2vw, 1.125rem) clamp(1rem, 3vw, 2rem)',
                    fontSize: 'clamp(0.75rem, 2.5vw, 1rem)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
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
                  <span style={{ 
                    position: 'relative', 
                    zIndex: 1, 
                    display: 'block',
                    width: '100%',
                    lineHeight: '1.3',
                    wordBreak: 'break-word',
                    hyphens: 'auto'
                  }}>{module}</span>
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
                  transition: 'opacity 0.2s ease',
                  background: 'transparent',
                  boxShadow: 'none',
                  border: 'none'
                }}
              >
                <div className="premium-module-content" style={{
                  background: '#ffffff',
                  padding: 'clamp(24px, 5vw, 64px)',
                  borderRadius: 'clamp(20px, 4vw, 32px)',
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
                            alt={module.title}
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

export default ExploreModulesSection;
