'use client'

import { useState, useCallback } from 'react';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import Image from 'next/image';

interface DetailedContent {
  title: string;
  desc: string;
}

interface Accreditation {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  detailedContent?: DetailedContent[];
}

interface AccreditationsSectionProps {
  accreditations: Accreditation[];
  downloadButtonText?: string;
  onDownload?: () => void;
}

// Icon mapping for accreditations
const getAccreditationIcon = (title: string): string => {
  const iconMap: { [key: string]: string } = {
    'NABET': '/images/svgs/nabet.svg',
    'NAAC': '/images/svgs/naac.svg',
    'NEP 2020': '/images/svgs/nep2020.svg',
  };
  return iconMap[title] || '/images/svgs/nabet.svg';
};

const AccreditationsSection: React.FC<AccreditationsSectionProps> = ({
  accreditations,
  downloadButtonText = "Download NEP Leaflet",
  onDownload,
}) => {
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null);

  const toggleAccordion = useCallback((idx: number) => {
    setExpandedAccordion(prev => prev === idx ? null : idx);
  }, []);

  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .accreditations-container {
            max-width: 900px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 24px;
            width: 100%;
            box-sizing: border-box;
          }
          
          .accreditation-card {
            background: #ffffff;
            border-radius: 24px;
            border: 1px solid rgba(152, 16, 250, 0.12);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          
          .accreditation-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(152, 16, 250, 0.15);
            border-color: rgba(152, 16, 250, 0.3);
          }
          
          .accreditation-card.expanded {
            box-shadow: 0 12px 40px rgba(152, 16, 250, 0.2);
            border-color: rgba(152, 16, 250, 0.4);
          }
          
          .accreditation-header {
            padding: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            gap: 20px;
            transition: all 0.3s ease;
          }
          
          .accreditation-icon-wrapper {
            width: 72px;
            height: 72px;
            border-radius: 18px;
            background: linear-gradient(135deg, rgba(152, 16, 250, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 16px rgba(152, 16, 250, 0.1);
            transition: all 0.4s ease;
          }
          
          .accreditation-card:hover .accreditation-icon-wrapper {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 8px 24px rgba(152, 16, 250, 0.2);
          }
          
          .accreditation-icon {
            width: 40px;
            height: 40px;
          }
          
          .accreditation-content {
            flex: 1;
            min-width: 0;
          }
          
          .accreditation-title {
            font-size: clamp(1.25rem, 2.5vw, 1.5rem);
            font-weight: 700;
            color: #03297B;
            margin-bottom: 8px;
            line-height: 1.4;
          }
          
          .accreditation-subtitle {
            font-size: clamp(0.9375rem, 2vw, 1.0625rem);
            color: #666;
            margin: 0;
            line-height: 1.6;
          }
          
          .accreditation-toggle {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: linear-gradient(135deg, rgba(152, 16, 250, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s ease;
            flex-shrink: 0;
            border: 1px solid rgba(152, 16, 250, 0.2);
          }
          
          .accreditation-card:hover .accreditation-toggle {
            background: linear-gradient(135deg, rgba(152, 16, 250, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
            border-color: rgba(152, 16, 250, 0.4);
          }
          
          .accreditation-toggle-icon {
            font-size: 1.25rem;
            color: #9810FA;
            transition: transform 0.4s ease;
          }
          
          .accreditation-card.expanded .accreditation-toggle-icon {
            transform: rotate(180deg);
          }
          
          .accreditation-body {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), padding 0.5s ease;
            padding: 0 32px;
            opacity: 0;
          }
          
          .accreditation-card.expanded .accreditation-body {
            max-height: 2000px;
            padding: 0 32px 32px 32px;
            opacity: 1;
          }
          
          .accreditation-description {
            font-size: 1rem;
            color: #555;
            line-height: 1.7;
            margin-bottom: 24px;
            padding-top: 24px;
            border-top: 1px solid rgba(152, 16, 250, 0.1);
          }
          
          @media (max-width: 768px) {
            .accreditations-container {
              gap: 16px;
              padding: 0 16px;
            }
            
            .accreditation-header {
              padding: 20px;
              gap: 12px;
              flex-wrap: wrap;
            }
            
            .accreditation-icon-wrapper {
              width: 56px;
              height: 56px;
              border-radius: 14px;
            }
            
            .accreditation-icon {
              width: 32px;
              height: 32px;
            }
            
            .accreditation-title {
              font-size: 1.125rem;
              margin-bottom: 6px;
            }
            
            .accreditation-subtitle {
              font-size: 0.875rem;
            }
            
            .accreditation-toggle {
              width: 36px;
              height: 36px;
              border-radius: 10px;
            }
            
            .accreditation-toggle-icon {
              font-size: 1rem;
            }
            
            .accreditation-body {
              padding: 0 20px;
            }
            
            .accreditation-card.expanded .accreditation-body {
              padding: 0 20px 20px 20px;
            }
            
            .accreditation-description {
              font-size: 0.9375rem;
              line-height: 1.6;
              margin-bottom: 20px;
              padding-top: 20px;
            }
          }
          
          @media (max-width: 480px) {
            .accreditations-container {
              gap: 12px;
              padding: 0 12px;
            }
            
            .accreditation-header {
              padding: 16px;
              gap: 10px;
            }
            
            .accreditation-icon-wrapper {
              width: 48px;
              height: 48px;
              border-radius: 12px;
            }
            
            .accreditation-icon {
              width: 28px;
              height: 28px;
            }
            
            .accreditation-title {
              font-size: 1rem;
              margin-bottom: 4px;
            }
            
            .accreditation-subtitle {
              font-size: 0.8125rem;
            }
            
            .accreditation-toggle {
              width: 32px;
              height: 32px;
              border-radius: 8px;
            }
            
            .accreditation-toggle-icon {
              font-size: 0.875rem;
            }
            
            .accreditation-body {
              padding: 0 16px;
            }
            
            .accreditation-card.expanded .accreditation-body {
              padding: 0 16px 16px 16px;
            }
            
            .accreditation-description {
              font-size: 0.875rem;
              line-height: 1.6;
              margin-bottom: 16px;
              padding-top: 16px;
            }
          }
        `
      }} />
      <div className="container">
        <ScrollAnimationWrapper animation="fadeUp">
          <div className="text-center mb-5" style={{ marginBottom: 'clamp(40px, 8vw, 80px)', padding: '0 16px' }}>
            <h2 className='section-title'>Accreditations</h2>
            <div style={{
              width: 'clamp(60px, 15vw, 100px)',
              height: '4px',
              background: 'linear-gradient(90deg, #9810FA 0%, #03297B 100%)',
              margin: '0 auto',
              borderRadius: '2px'
            }} />
          </div>
        </ScrollAnimationWrapper>

        <div className="accreditations-container">
          {accreditations.map((item, idx) => (
            <ScrollAnimationWrapper key={idx} animation="fadeUp" delay={idx * 0.15}>
              <div
                className={`accreditation-card ${expandedAccordion === idx ? 'expanded' : ''}`}
              >
                <div
                  className="accreditation-header"
                  onClick={() => toggleAccordion(idx)}
                >
                  <div className="accreditation-icon-wrapper">
                    <div className="accreditation-icon">
                      <Image
                        src={getAccreditationIcon(item.title)}
                        alt={item.title}
                        width={40}
                        height={40}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                  <div className="accreditation-content">
                    <h3 className="accreditation-title">{item.title}</h3>
                    <p className="accreditation-subtitle">{item.subtitle}</p>
                  </div>
                  <div className="accreditation-toggle">
                    <span className="accreditation-toggle-icon">▼</span>
                  </div>
                </div>

                <div className="accreditation-body">
                  <p className="accreditation-description">{item.description}</p>

                  {item.detailedContent && expandedAccordion === idx && (
                    <div>
                      {item.detailedContent.map((detail, detailIdx) => (
                        <div key={detailIdx} style={{ marginBottom: 'clamp(16px, 4vw, 24px)' }}>
                          <h4 style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                            fontWeight: 700,
                            color: '#03297B',
                            marginBottom: 'clamp(8px, 2vw, 12px)',
                            lineHeight: '1.4'
                          }}>{detail.title}</h4>
                          <p className='section-description'>{detail.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}

          <ScrollAnimationWrapper animation="fadeUp" delay={0.5}>
            <div className="text-center" style={{ marginTop: 'clamp(32px, 6vw, 48px)', padding: '0 16px' }}>
              <button
                onClick={onDownload}
               className='cta-button'
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 16px 50px rgba(152, 16, 250, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(152, 16, 250, 0.4)';
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>{downloadButtonText}</span>
              </button>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
};

export default AccreditationsSection;
