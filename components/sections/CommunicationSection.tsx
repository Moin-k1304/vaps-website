'use client'

import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface Mode {
  name: string;
  icon: string;
  color: string;
}

interface CommunicationSectionProps {
  title: string;
  modes: Mode[];
}

const CommunicationSection: React.FC<CommunicationSectionProps> = ({
  title,
  modes,
}) => {
  return (
    <section className="section-space relative z-10" style={{ 
      padding: 'clamp(30px, 6vw, 80px) clamp(12px, 3vw, 24px)', 
      background: 'white',
      width: '100%',
      overflow: 'hidden'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .communication-cards-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            justify-content: center;
            align-items: stretch;
            gap: clamp(12px, 2.5vw, 20px);
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 clamp(16px, 4vw, 24px);
            width: 100%;
          }
          
          .premium-comm-card {
            margin: 0;
            width: 100%;
            min-height: 180px;
          }
          
          /* Large Desktop - 5 cards in a row */
          @media (min-width: 1200px) {
            .communication-cards-container {
              grid-template-columns: repeat(5, 1fr);
            }
          }
          
          /* Desktop - 4-5 cards */
          @media (min-width: 992px) and (max-width: 1199px) {
            .communication-cards-container {
              grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            }
          }
          
          /* Tablet - 3 cards per row */
          @media (min-width: 768px) and (max-width: 991px) {
            .communication-cards-container {
              grid-template-columns: repeat(3, 1fr);
              gap: clamp(12px, 2vw, 16px);
              padding: 0 clamp(20px, 3vw, 24px);
            }
            
            .premium-comm-card {
              min-height: 200px;
            }
          }
          
          /* Mobile - 2 cards per row */
          @media (min-width: 576px) and (max-width: 767px) {
            .communication-cards-container {
              grid-template-columns: repeat(2, 1fr);
              gap: 12px;
              padding: 0 16px;
            }
            
            .premium-comm-card {
              min-height: 180px;
            }
          }
          
          /* Small mobile - 2 cards per row with smaller gaps */
          @media (min-width: 480px) and (max-width: 575px) {
            .communication-cards-container {
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
              padding: 0 12px;
            }
            
            .premium-comm-card {
              min-height: 160px;
            }
          }
          
          /* Extra small mobile - 2 cards per row */
          @media (min-width: 360px) and (max-width: 479px) {
            .communication-cards-container {
              grid-template-columns: repeat(2, 1fr);
              gap: 8px;
              padding: 0 10px;
            }
            
            .premium-comm-card {
              min-height: 150px;
            }
          }
          
          /* Very small screens - 1 card per row */
          @media (max-width: 359px) {
            .communication-cards-container {
              grid-template-columns: 1fr;
              gap: 12px;
              padding: 0 16px;
            }
            
            .premium-comm-card {
              min-height: 140px;
            }
          }
          
          /* Hover effects for desktop */
          @media (hover: hover) and (pointer: fine) {
            .premium-comm-card:hover {
              transform: translateY(-8px);
              box-shadow: 0 20px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(255, 255, 255, 0.5) inset;
            }
            
            .premium-comm-card:hover .comm-icon {
              transform: scale(1.1) rotate(5deg);
            }
          }
          
          /* Touch feedback for mobile */
          @media (hover: none) and (pointer: coarse) {
            .premium-comm-card:active {
              transform: scale(0.98);
              opacity: 0.9;
            }
          }
        `
      }} />
      <div className="container" style={{ width: '100%', maxWidth: '100%', padding: 0 }}>
        <ScrollAnimationWrapper animation="fadeUp">
          <div className="text-center mb-5" style={{ 
            marginBottom: 'clamp(30px, 6vw, 80px)',
            padding: '0 clamp(12px, 3vw, 24px)'
          }}>
            <h2 className='section-title'>{title}</h2>
            <div style={{
              width: 'clamp(80px, 15vw, 100px)',
              height: 'clamp(3px, 0.5vw, 4px)',
              background: 'linear-gradient(90deg, #9810FA 0%, #03297B 100%)',
              margin: '0 auto',
              borderRadius: '2px'
            }} />
          </div>
        </ScrollAnimationWrapper>

        <div className="communication-cards-container">
          {modes.map((mode, idx) => (
            // @ts-ignore
            <ScrollAnimationWrapper key={idx} animation="scale" delay={idx * 0.1} style={{ margin: 0 }}>
              <div className="premium-comm-card" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                padding: 'clamp(16px, 3vw, 32px) clamp(12px, 2vw, 24px)',
                borderRadius: 'clamp(16px, 2.5vw, 24px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
                border: '2px solid transparent',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                textAlign: 'center',
                width: '100%',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}>
                  <div style={{
                    width: 'clamp(48px, 7vw, 72px)',
                    height: 'clamp(48px, 7vw, 72px)',
                    background: `linear-gradient(135deg, ${mode.color}20 0%, ${mode.color}10 100%)`,
                    borderRadius: 'clamp(12px, 2vw, 18px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(24px, 4vw, 36px)',
                    margin: '0 auto clamp(10px, 2vw, 16px)',
                    border: `2px solid ${mode.color}30`,
                    boxShadow: `0 10px 30px ${mode.color}20, 0 0 0 1px rgba(255, 255, 255, 0.5) inset`,
                    transition: 'all 0.5s ease',
                    flexShrink: 0
                  }} className="comm-icon">{mode.icon}</div>
                  <h4 style={{
                    fontSize: 'clamp(0.75rem, 2vw, 1.125rem)',
                    fontWeight: 800,
                    color: '#03297B',
                    marginBottom: 0,
                    lineHeight: 1.2,
                    wordBreak: 'break-word',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%'
                  }}>{mode.name}</h4>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunicationSection;


