'use client'

import Image from 'next/image';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface VirtualTourSectionProps {
  title: string;
  description1: string;
  description2: string;
  features: string[];
  buttonText: string;
  image: string;
}

const VirtualTourSection: React.FC<VirtualTourSectionProps> = ({
  title,
  description1,
  description2,
  features,
  buttonText,
  image,
}) => {
  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'white' }}>
      <div className="container">
        <div className="row align-items-center gx-5">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <ScrollAnimationWrapper animation="fadeRight">
              <h2 className='section-title'>{title}</h2>
              <div style={{
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #9810FA 0%, #03297B 100%)',
                marginBottom: '32px',
                borderRadius: '2px'
              }} />
              <p className='section-description'>
                {description1}
              </p>
              <p className='section-description'>
                {description2}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: 20, marginBottom: 40 }}>
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
                    }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button   
              className="cta-button">{buttonText}</button>
            </ScrollAnimationWrapper>
          </div>
          <div className="col-lg-6">
            <ScrollAnimationWrapper animation="fadeLeft">
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
                  alt={title}
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
        </div>
      </div>
    </section>
  );
};

export default VirtualTourSection;


