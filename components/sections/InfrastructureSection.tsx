'use client'

import Image from 'next/image';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface InfrastructureSectionProps {
  title: string;
  description1: string;
  description2: string;
  image: {
    src: string;
    alt: string;
  };
}

const InfrastructureSection: React.FC<InfrastructureSectionProps> = ({
  title,
  description1,
  description2,
  image,
}) => {
  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'white' }}>
      <div className="container">
        <div className="row align-items-center gx-5 flex-column-reverse flex-lg-row">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <ScrollAnimationWrapper animation="fadeRight">
              <div style={{
                position: 'relative',
                height: 'clamp(350px, 50vh, 500px)',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(30, 58, 138, 0.05) 100%)',
                width: '100%',
              }}>
                <Image
                  src={image.src}
                  alt={image.alt}
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
                  {description1}
                </p>
                  <p className='section-description' style={{ marginTop: 24 }}>
                  {description2}
                </p>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;


