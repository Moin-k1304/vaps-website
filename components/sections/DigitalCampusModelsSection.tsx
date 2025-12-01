'use client'

import Image from 'next/image';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface Model {
  icon: string;
  title: string;
  description: string;
}

interface DigitalCampusModelsSectionProps {
  boot: Model;
  saas: Model;
}

const DigitalCampusModelsSection: React.FC<DigitalCampusModelsSectionProps> = ({
  boot,
  saas,
}) => {
  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: '#f8f9fa' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .model-icon {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .model-icon img {
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
            position: relative !important;
            object-fit: contain !important;
            width: 48px !important;
            height: 48px !important;
            max-width: 48px !important;
            max-height: 48px !important;
          }
          .models-row {
            display: flex;
            flex-wrap: wrap;
          }
          .models-row > div {
            display: flex;
          }
          .premium-model-card {
            display: flex !important;
            flex-direction: column !important;
            height: 100% !important;
            width: 100% !important;
          }
          .premium-model-card > div[style*="position: relative"][style*="zIndex: 2"] {
            display: flex !important;
            flex-direction: column !important;
            flex: 1 !important;
            height: 100% !important;
          }
          .premium-model-card h3 {
            min-height: 3rem;
            margin-bottom: 24px !important;
          }
          .premium-model-card p {
            flex: 1;
            margin-bottom: 0 !important;
          }
        `
      }} />
      <div className="container">
        <div className="row g-5 models-row">
          <div className="col-md-6" style={{ display: 'flex' }}>
            <ScrollAnimationWrapper animation="fadeUp">
              <div className="premium-model-card" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                padding: '56px',
                borderRadius: '32px',
                height: '100%',
                border: '1px solid rgba(152, 16, 250, 0.15)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                  transition: 'left 0.6s ease'
                }} className="card-shine" />

                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(152, 16, 250, 0.15) 0%, transparent 70%)',
                  borderRadius: '50%',
                  transform: 'translate(30%, -30%)',
                  opacity: 0,
                  transition: 'opacity 0.5s ease'
                }} className="card-gradient-overlay" />

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, rgba(152, 16, 250, 0.2) 0%, rgba(152, 16, 250, 0.1) 100%)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '32px',
                    border: '2px solid rgba(152, 16, 250, 0.2)',
                    boxShadow: '0 10px 30px rgba(152, 16, 250, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
                    transition: 'all 0.5s ease',
                    position: 'relative',
                    flexShrink: 0
                  }} className="model-icon">
                    <Image 
                      src={boot.icon} 
                      alt="BOOT Model Icon" 
                      width={48} 
                      height={48}
                      style={{ 
                        objectFit: 'contain',
                        margin: '0',
                        padding: '0',
                        display: 'block',
                        position: 'relative',
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  </div>
                  <h3 className='section-title' style={{ minHeight: '3rem', marginBottom: '24px' }}>{boot.title}</h3>
                  <p className='section-description' style={{ flex: 1, marginBottom: 0 }}>
                    {boot.description}
                  </p>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
          <div className="col-md-6" style={{ display: 'flex' }}>
            <ScrollAnimationWrapper animation="fadeUp" delay={0.2}>
              <div className="premium-model-card" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                padding: '56px',
                borderRadius: '32px',
                height: '100%',
                border: '1px solid rgba(59, 130, 246, 0.15)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                  transition: 'left 0.6s ease'
                }} className="card-shine" />

                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                  borderRadius: '50%',
                  transform: 'translate(30%, -30%)',
                  opacity: 0,
                  transition: 'opacity 0.5s ease'
                }} className="card-gradient-overlay" />

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '32px',
                    border: '2px solid rgba(59, 130, 246, 0.2)',
                    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
                    transition: 'all 0.5s ease',
                    position: 'relative',
                    flexShrink: 0
                  }} className="model-icon">
                    <Image 
                      src={saas.icon} 
                      alt="SAAS Model Icon" 
                      width={48} 
                      height={48}
                      style={{ 
                        objectFit: 'contain',
                        margin: '0',
                        padding: '0',
                        display: 'block',
                        position: 'relative',
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  </div>
                  <h3 className='section-title' style={{ minHeight: '3rem', marginBottom: '24px' }}>{saas.title}</h3>
                  <p className='section-description' style={{ flex: 1, marginBottom: 0 }}>
                    {saas.description}
                  </p>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalCampusModelsSection;

