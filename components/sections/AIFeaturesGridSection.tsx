'use client'

import Image from 'next/image';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface Feature {
  title: string;
  icon: string;
  desc: string;
  gradient: string;
}

interface AIFeaturesGridSectionProps {
  subtitle: string;
  title: string;
  description: string;
  features: Feature[];
}

const AIFeaturesGridSection: React.FC<AIFeaturesGridSectionProps> = ({
  subtitle,
  title,
  description,
  features,
}) => {
  return (
    <section className="section-space relative z-10" style={{
        padding: 'clamp(40px, 8vw, 140px) clamp(15px, 4vw, 0px)',
        backgroundImage: `url('/images/hero-section-background-img.png')`,
        backgroundSize: 'cover',
        backgroundPosition: '100% 100%',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(26, 11, 46, 0.9) 0%, rgba(45, 27, 78, 0.85) 50%, rgba(15, 52, 96, 0.9) 100%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="text-center mb-5" style={{ marginBottom: 'clamp(40px, 8vw, 80px)' }}>
            <ScrollAnimationWrapper animation="fadeUp">
              <div className="mb-4">
                <span className='section-label'>{subtitle}</span>
              </div>
              <h2 style={{
                color: 'white',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }} className='section-title'>{title}</h2>
              <p style={{
                color: 'rgba(255,255,255,0.95)',
              }} className='section-description'>
                {description}
              </p>
            </ScrollAnimationWrapper>
          </div>

          <div className="row g-4 g-md-5">
            {features.map((feature, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-6">
                <ScrollAnimationWrapper animation="fadeUp" delay={idx * 0.1}>
                  <div className="premium-feature-card" style={{
                    padding: 'clamp(24px, 5vw, 48px)',
                    borderRadius: 'clamp(20px, 4vw, 32px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    height: '100%',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(30px)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: feature.gradient,
                      opacity: 0,
                      transition: 'opacity 0.5s ease'
                    }} className="feature-overlay" />

                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                      transition: 'left 0.6s ease'
                    }} className="feature-shine" />

                    <div style={{ position: 'relative', zIndex: 2 }}>
                      <div style={{
                        marginBottom: 'clamp(20px, 4vw, 32px)',
                        display: 'inline-block',
                        transition: 'transform 0.5s ease',
                        filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))'
                      }} className="feature-icon">
                        <Image 
                          src={feature.icon} 
                          alt={feature.title} 
                          width={80} 
                          height={80}
                          style={{ 
                            objectFit: 'contain',
                            width: 'clamp(60px, 12vw, 80px)',
                            height: 'clamp(60px, 12vw, 80px)'
                          }}
                        />
                      </div>
                      <h3 style={{
                        marginBottom: 'clamp(12px, 2.5vw, 20px)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        lineHeight: 1.3,
                      }} className='section-subtitle'>
                        {(() => {
                          if (feature.title.includes(' & ')) {
                            const parts = feature.title.split(' & ');
                            const beforeAmp = parts[0];
                            const afterAmp = parts[1];
                            const words = beforeAmp.split(' ');
                            const lastWord = words.pop();
                            return (
                              <>
                                {words.join(' ')}
                                {words.length > 0 && ' '}
                                <span style={{ whiteSpace: 'nowrap' }}>
                                  {lastWord} & {afterAmp}
                                </span>
                              </>
                            );
                          }
                          return feature.title;
                        })()}
                      </h3>
                      <p style={{
                        color: 'rgba(255,255,255,0.95)',
                        marginBottom: 0,
                        lineHeight: 1.6,
                      }} className='section-description'>{feature.desc}</p>
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default AIFeaturesGridSection;

