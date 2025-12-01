'use client'

import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import Image from 'next/image';

interface SolutionSectionProps {
  title: string;
  description: string;
  benefits: string[];
  image: any;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({
  title,
  description,
  benefits,
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
                background: 'linear-gradient(135deg, rgba(152, 16, 250, 0.05) 0%, rgba(3, 41, 123, 0.05) 100%)',
                width: '100%'
              }}>
                <Image 
                  src={image} 
                  alt="Science Park Image" 
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
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  marginTop: 20
                }}>
                  {benefits.map((item, idx) => (
                    <li key={idx} style={{
                      fontSize: '1rem',
                      color: '#555',
                      lineHeight: 1.6,
                      marginBottom: '12px',
                      paddingLeft: '24px',
                      position: 'relative',
                    }} className='section-description'>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '4px',
                        width: '8px',
                        height: '8px',
                        background: 'linear-gradient(135deg, #9810FA 0%, #03297B 100%)',
                        borderRadius: '50%'
                      }} />
                      {item}
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

export default SolutionSection;


