'use client'

import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import Image from 'next/image';

interface Feature {
  title: string;
  desc: string;
  icon: string;
}

interface WhyVapsSectionProps {
  title: string;
  features: Feature[];
  subtitle?: string;
}

// Icon mapping for features
const getFeatureIcon = (title: string): string => {
  const iconMap: { [key: string]: string } = {
    // Digital Campus / ERP features
    'SAAS / BOOT Models': '/images/svgs/saas-boot-models.svg',
    'Exceptional Support': '/images/svgs/exceptional-support.svg',
    'Easily Scalable': '/images/svgs/easily-scalable.svg',
    'Responsive Layout': '/images/svgs/responsive-layout.svg',
    'Smart Automation': '/images/svgs/smart-automation.svg',
    'Prominent Integrations': '/images/svgs/prominent-integrations.svg',
    // Advanced E-Learning features
    'Assured Quality': '/images/svgs/assured-quality.svg',
    'Cost-effective Solutions': '/images/svgs/cost-effective.svg',
    'Faculty Training': '/images/svgs/faculty-training.svg',
    'Easy Implementation': '/images/svgs/easy-implementation.svg',
    'Updates & Upgrades': '/images/svgs/updates-upgrades.svg',
    'Dedicated Support': '/images/svgs/dedicated-support.svg',
  };
  return iconMap[title] || '/images/svgs/assured-quality.svg';
};

const WhyVapsSection: React.FC<WhyVapsSectionProps> = ({
  title,
  features,
  subtitle,
}) => {
  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .why-vaps-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
            max-width: 1200px;
            margin: 0 auto;
            align-items: stretch;
          }
          
          .why-vaps-card {
            background: #ffffff;
            padding: 40px;
            border-radius: 24px;
            height: 100%;
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(152, 16, 250, 0.1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          
          .why-vaps-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 40px rgba(152, 16, 250, 0.15);
            border-color: rgba(152, 16, 250, 0.3);
          }
          
          .why-vaps-card:hover .why-icon-wrapper {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 8px 24px rgba(152, 16, 250, 0.2);
          }
          
          .why-icon-wrapper {
            width: 80px;
            height: 80px;
            border-radius: 20px;
            background: linear-gradient(135deg, rgba(152, 16, 250, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(152, 16, 250, 0.1);
          }
          
          .why-icon {
            width: 48px;
            height: 48px;
            position: relative;
            z-index: 1;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
          }
          
          .why-vaps-card:hover .why-icon {
            filter: drop-shadow(0 4px 8px rgba(152, 16, 250, 0.3));
          }
          
          @media (max-width: 992px) {
            .why-vaps-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 24px;
            }
          }
          
          @media (max-width: 768px) {
            .why-vaps-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
            
            .why-vaps-card {
              padding: 32px;
            }
            
            .why-icon-wrapper {
              width: 72px;
              height: 72px;
              margin-bottom: 20px;
            }
            
            .why-icon {
              width: 42px;
              height: 42px;
            }
          }
        `
      }} />
      <div className="container">
        <ScrollAnimationWrapper animation="fadeUp">
          <div className="text-center mb-5" style={{ marginBottom: '80px' }}>
            {subtitle && (
              <span style={{
                fontSize: '1rem',
                fontWeight: 500,
                color: '#9810FA',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>{subtitle}</span>
            )}
            <h2 className='section-title'>{title}</h2>
            <div style={{
              width: '100px',
              height: '4px',
              background: 'linear-gradient(90deg, #9810FA 0%, #03297B 100%)',
              margin: '0 auto',
              borderRadius: '2px'
            }} />
          </div>
        </ScrollAnimationWrapper>

        <div className="why-vaps-grid">
          {features.map((feature, idx) => {
            const iconPath = getFeatureIcon(feature.title);
            return (
              <ScrollAnimationWrapper key={idx} animation="fadeUp" delay={idx * 0.1}>
                <div className="why-vaps-card">
                  <div className="why-icon-wrapper">
                    <div className="why-icon">
                      <Image
                        src={iconPath}
                        alt={feature.title}
                        width={48}
                        height={48}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        priority={idx < 3}
                      />
                    </div>
                  </div>

                <h4 style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#03297B',
                  marginBottom: '16px',
                  lineHeight: 1.4
                }}>{feature.title}</h4>

                <p className='section-description'>{feature.desc}</p>
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyVapsSection;
