'use client'

import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface ClientsSectionProps {
  title: string;
  description: string;
  buttonText: string;
}

const ClientsSection: React.FC<ClientsSectionProps> = ({
  title,
  description,
  buttonText,
}) => {
  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(135deg, #03297B 0%, #1a3d7a 100%)', color: 'white' }}>
      <div className="container">
        <div className="row align-items-center gx-5">
          <div className="col-lg-4 mb-5 mb-lg-0">
            <ScrollAnimationWrapper animation="fadeRight">
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900,
                marginBottom: '20px'
              }}>{title}</h2>
              <div style={{
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #9810FA 0%, rgba(255,255,255,0.3) 100%)',
                marginBottom: '32px',
                borderRadius: '2px'
              }} />
              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.95)',
                lineHeight: 1.6,
                fontWeight: 500,
                marginBottom: '40px'
              }}>
                {description}
              </p>
              <button style={{
                padding: '16px 40px',
                background: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                backdropFilter: 'blur(10px)'
              }} className="premium-btn">{buttonText}</button>
            </ScrollAnimationWrapper>
          </div>
          <div className="col-lg-8">
            <ScrollAnimationWrapper animation="fadeLeft">
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '48px',
                borderRadius: '32px',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem' }}>Client Logos Grid</p>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;


