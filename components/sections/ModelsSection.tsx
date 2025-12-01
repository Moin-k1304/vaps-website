'use client'

import { useEffect } from 'react';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import Image from 'next/image';

interface Model {
  name: string;
  icon: string;
}

interface ModelsSectionProps {
  title: string;
  description: string;
  models: Model[];
}

const ModelsSection: React.FC<ModelsSectionProps> = ({
  title,
  description,
  models,
}) => {
  // Function to get image path - alternate between available images
  const getModelImage = (index: number): string => {
    const images = [
      '/images/science-park/Science-Park-2.jpg',
      '/images/science-park/science-park.jpeg'
    ];
    return images[index % images.length];
  };

  useEffect(() => {
    // Ensure CSS is applied and force reflow
    if (typeof window !== 'undefined') {
      const styleId = 'models-section-styles';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          .model-card-image-container {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            border-radius: 20px 20px 0 0;
          }
          
          .premium-model-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
            display: flex !important;
            flex-direction: column !important;
          }
          
          .premium-model-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 50px rgba(152, 16, 250, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.8) inset;
          }
          
          .premium-model-card:hover .model-card-image-container img {
            transform: scale(1.1);
          }
          
          .premium-model-card:hover .model-shine {
            left: 100%;
          }
          
          .models-section-row {
            display: flex !important;
            flex-wrap: wrap !important;
            margin-left: -0.75rem !important;
            margin-right: -0.75rem !important;
          }
          
          .models-section-row > .col-6 {
            flex: 0 0 auto !important;
            width: 50% !important;
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          
          @media (min-width: 768px) {
            .models-section-row > .col-md-4 {
              width: 33.333333% !important;
            }
          }
          
          @media (min-width: 992px) {
            .models-section-row > .col-lg-3 {
              width: 25% !important;
            }
          }
          
          @media (max-width: 768px) {
            .model-card-image-container {
              height: 160px;
            }
          }
          
          @media (max-width: 480px) {
            .model-card-image-container {
              height: 140px;
            }
          }
        `;
        document.head.appendChild(style);
      }
      
      // Force reflow to ensure layout is calculated
      requestAnimationFrame(() => {
        const cards = document.querySelectorAll('.premium-model-card');
        cards.forEach(card => {
          (card as HTMLElement).offsetHeight; // Force reflow
        });
      });
    }
  }, []);

  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .models-section-row {
            display: flex !important;
            flex-wrap: wrap !important;
            margin-left: -0.75rem !important;
            margin-right: -0.75rem !important;
          }
          
          .models-section-row > .col-6 {
            flex: 0 0 auto !important;
            width: 50% !important;
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          
          @media (min-width: 768px) {
            .models-section-row > .col-md-4 {
              width: 33.333333% !important;
            }
          }
          
          @media (min-width: 992px) {
            .models-section-row > .col-lg-3 {
              width: 25% !important;
            }
          }
          
          .premium-model-card {
            display: flex !important;
            flex-direction: column !important;
            height: 100% !important;
          }
        `
      }} />
      <div className="container" style={{ 
        width: '100%',
        paddingRight: '15px',
        paddingLeft: '15px',
        marginRight: 'auto',
        marginLeft: 'auto'
      }}>
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

        <div className="row g-4 models-section-row">
          {models.map((model, idx) => (
            <div key={idx} className="col-6 col-md-4 col-lg-3">
              <ScrollAnimationWrapper animation="scale" delay={idx * 0.05}>
                <div className="premium-model-card" style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  height: '100%',
                  border: '1px solid rgba(152, 16, 250, 0.15)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '280px'
                }}>
                  {/* Image Container */}
                  <div className="model-card-image-container">
                    <Image
                      src={getModelImage(idx)}
                      alt={model.name}
                      fill
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      sizes="(max-width: 768px) 50vw, (max-width: 992px) 33vw, 25vw"
                      loading={idx < 8 ? 'eager' : 'lazy'}
                    />
                    {/* Gradient Overlay */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '80px',
                      background: 'linear-gradient(to top, rgba(255, 255, 255, 0.95), transparent)',
                      pointerEvents: 'none'
                    }} />
                    {/* Top Gradient Overlay */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '60px',
                      background: 'linear-gradient(to bottom, rgba(152, 16, 250, 0.1), transparent)',
                      pointerEvents: 'none'
                    }} />
                  </div>

                  {/* Content Section */}
                  <div style={{
                    padding: '20px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 249, 250, 0.98) 100%)'
                  }}>
                    <h4 style={{
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      fontWeight: 600,
                      color: '#03297B',
                      marginBottom: 0,
                      lineHeight: 1.4,
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}>{model.name}</h4>
                  </div>

                  {/* Shine Effect */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    transition: 'left 0.8s ease',
                    pointerEvents: 'none'
                  }} className="model-shine" />
                </div>
              </ScrollAnimationWrapper>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;
