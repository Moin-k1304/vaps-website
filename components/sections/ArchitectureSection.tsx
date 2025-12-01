'use client'

import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface ArchitectureSectionProps {
  label: string;
  title: string;
  description: string;
}

const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({
  label,
  title,
  description,
}) => {
  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)' }}>
      <div className="container">
        <div className="row align-items-center gx-5">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <ScrollAnimationWrapper animation="fadeRight">
              <div className="mb-4">
                <span className='section-label'>{label}</span>
              </div>
              <h2 className='section-title'>
                {title}
              </h2>
              <p className='section-description'>
                {description}
              </p>
            </ScrollAnimationWrapper>
          </div>
          <div className="col-lg-6">
            <ScrollAnimationWrapper animation="scale" delay={0.2}>
              <div className="premium-card" style={{
                position: 'relative',
                height: 'clamp(350px, 50vh, 500px)',
                width: '100%',
                borderRadius: '32px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(152, 16, 250, 0.05) 0%, rgba(3, 41, 123, 0.05) 100%)',
                border: '1px solid rgba(152, 16, 250, 0.1)',
                boxShadow: '0 20px 60px rgba(152, 16, 250, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                backdropFilter: 'blur(20px)'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '32px',
                  padding: '40px'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    background: 'linear-gradient(135deg, #9810FA 0%, #03297B 100%)',
                    borderRadius: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 20px 60px rgba(152, 16, 250, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                    transform: 'rotate(-5deg)',
                    transition: 'transform 0.4s ease'
                  }} className="arch-icon">
                    <svg style={{ width: '70px', height: '70px', color: 'white', transform: 'rotate(5deg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '1.5rem',
                    color: '#333',
                    fontWeight: 700,
                    textAlign: 'center'
                  }}>Architecture Diagram</span>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;


