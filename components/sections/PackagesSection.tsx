'use client'

import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface Package {
  title: string;
  features: string[];
}

interface PackagesSectionProps {
  title: string;
  saas: Package;
  boot: Package;
}

const PackagesSection: React.FC<PackagesSectionProps> = ({
  title,
  saas,
  boot,
}) => {
  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .packages-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
            max-width: 1200px;
            margin: 0 auto;
            align-items: stretch;
            padding: 0 16px;
          }
          
          @media (max-width: 992px) {
            .packages-grid {
              grid-template-columns: 1fr;
              gap: 24px;
              padding: 0 12px;
            }
          }
          
          @media (max-width: 768px) {
            .packages-grid {
              gap: 20px;
              padding: 0 16px;
            }
          }
          
          @media (max-width: 480px) {
            .packages-grid {
              gap: 16px;
              padding: 0 12px;
            }
          }
          
          .boot-features-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          
          @media (max-width: 768px) {
            .boot-features-grid {
              grid-template-columns: 1fr;
              gap: 16px;
            }
          }
        `
      }} />
      <div className="container">
        <ScrollAnimationWrapper animation="fadeUp">
          <div className="text-center mb-5" style={{ marginBottom: 'clamp(40px, 8vw, 80px)', padding: '0 16px' }}>
            <h2 className='section-title'>{title}</h2>
            <div style={{
              width: 'clamp(60px, 15vw, 100px)',
              height: '4px',
              background: 'linear-gradient(90deg, #9810FA 0%, #03297B 100%)',
              margin: '0 auto',
              borderRadius: '2px'
            }} />
          </div>
        </ScrollAnimationWrapper>

        <div className="packages-grid">
          <ScrollAnimationWrapper animation="fadeRight">
            <div className="premium-package-card" style={{
              background: 'linear-gradient(135deg, #03297B 0%, #1a3d7a 100%)',
              padding: 'clamp(24px, 5vw, 56px)',
              borderRadius: 'clamp(20px, 4vw, 32px)',
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 30px 80px rgba(3, 41, 123, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              transition: 'all 0.5s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 'clamp(200px, 40vw, 300px)',
                  height: 'clamp(200px, 40vw, 300px)',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                  borderRadius: '50%',
                  transform: 'translate(30%, -30%)'
                }} />
                <h3 style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                  fontWeight: 600,
                  marginBottom: 'clamp(24px, 4vw, 40px)',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 2,
                  flexShrink: 0,
                  lineHeight: '1.3'
                }}>{saas?.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'relative', zIndex: 2, flex: 1 }}>
                  {saas?.features.map((item, i) => (
                    <li key={i} style={{
                      marginBottom: 'clamp(12px, 2vw, 16px)',
                      fontSize: 'clamp(0.9375rem, 2.5vw, 1.0625rem)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      lineHeight: '1.6'
                    }}>
                      <span style={{ marginRight: 'clamp(8px, 2vw, 12px)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
            </div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper animation="fadeLeft">
            <div className="premium-package-card" style={{
              background: 'linear-gradient(135deg, #03297B 0%, #1a3d7a 100%)',
              padding: 'clamp(24px, 5vw, 56px)',
              borderRadius: 'clamp(20px, 4vw, 32px)',
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 30px 80px rgba(3, 41, 123, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              transition: 'all 0.5s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 'clamp(200px, 40vw, 300px)',
                  height: 'clamp(200px, 40vw, 300px)',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                  borderRadius: '50%',
                  transform: 'translate(30%, -30%)'
                }} />
                <h3 style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                  fontWeight: 600,
                  marginBottom: 'clamp(24px, 4vw, 40px)',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 2,
                  flexShrink: 0,
                  lineHeight: '1.3'
                }}>{boot?.title}</h3>
                <div className="boot-features-grid" style={{ 
                  position: 'relative', 
                  zIndex: 2,
                  flex: 1
                }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {boot?.features.slice(0, 10).map((item, i) => (
                      <li key={i} style={{
                        marginBottom: 'clamp(10px, 2vw, 14px)',
                        fontSize: 'clamp(0.875rem, 2vw, 0.95rem)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        lineHeight: '1.6'
                      }}>
                        <span style={{ marginRight: 'clamp(8px, 2vw, 10px)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {boot?.features.slice(10).map((item, i) => (
                      <li key={i} style={{
                        marginBottom: 'clamp(10px, 2vw, 14px)',
                        fontSize: 'clamp(0.875rem, 2vw, 0.95rem)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        lineHeight: '1.6'
                      }}>
                        <span style={{ marginRight: 'clamp(8px, 2vw, 10px)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
