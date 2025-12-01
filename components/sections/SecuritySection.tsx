'use client'

import Image from 'next/image';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface SecuritySectionProps {
  title: string;
  description: string;
  features: string[];
  image: string;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({
  title,
  description,
  features,
  image,
}) => {
  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)' }}>
      <div className="container">
        <div className="row align-items-center gx-5">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <ScrollAnimationWrapper animation="fadeRight">
              <div style={{
                position: 'relative',
                height: '500px',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                background: 'linear-gradient(135deg, rgba(152, 16, 250, 0.05) 0%, rgba(3, 41, 123, 0.05) 100%)',
                width: '100%',
              }}>
                <Image
                  src={image}
                  alt="Security & Access Management"
                  fill
                  style={{ 
                    objectFit: 'cover',
                    borderRadius: '32px'
                  }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </ScrollAnimationWrapper>
          </div>
          <div className="col-lg-6">
            <ScrollAnimationWrapper animation="fadeLeft">
              <div>
                <h2 className='section-title'>{title}</h2>
                <div style={{
                  width: '100px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #9810FA 0%, #03297B 100%)',
                  marginBottom: '32px',
                  borderRadius: '2px'
                }} />
                <p className='section-description'>
                  {description}
                </p>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
                  {features.map((item, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '20px',
                      fontSize: '1.0625rem',
                      color: '#555',
                      lineHeight: 1.7
                    }}>
                      <span style={{
                        color: '#9810FA',
                        marginRight: '16px',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>✓</span>
                      <span className='section-description'>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;


