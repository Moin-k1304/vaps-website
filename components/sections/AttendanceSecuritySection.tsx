'use client'

import Image from 'next/image';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface Feature {
  title: string;
  desc: string;
  icon: string;
  gradient: string;
}

interface AttendanceSecuritySectionProps {
  badge: string;
  title: string;
  subtitle: string;
  features: Feature[];
}

const AttendanceSecuritySection: React.FC<AttendanceSecuritySectionProps> = ({
  badge,
  title,
  subtitle,
  features,
}) => {
  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'white' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .attendance-cards-row {
            display: flex;
            flex-wrap: wrap;
          }
          .attendance-cards-row > div {
            display: flex;
          }
          .premium-attendance-card {
            display: flex !important;
            flex-direction: column !important;
            height: 100% !important;
            width: 100% !important;
          }
          @media (max-width: 991px) {
            .attendance-cards-row > div {
              margin-bottom: 1.5rem;
            }
            .attendance-cards-row > div:last-child {
              margin-bottom: 0;
            }
          }
        `
      }} />
      <div className="container">
        <div className="text-center mb-5" style={{ marginBottom: '80px' }}>
          <ScrollAnimationWrapper animation="fadeUp">
            <div className="mb-4">
              <span className='section-label'>{badge}</span>
            </div>
              <h2 className='section-title'>{title}</h2>
            <p className='section-description'>{subtitle}</p>
          </ScrollAnimationWrapper>
        </div>

        <div className="row g-5 attendance-cards-row">
          {features.map((item, idx) => (
            <div key={idx} className="col-lg-4" style={{ display: 'flex' }}>
              <ScrollAnimationWrapper animation="fadeUp" delay={idx * 0.2}>
                <div className="premium-attendance-card" style={{
                  padding: '48px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                  borderRadius: '32px',
                  border: '1px solid rgba(152, 16, 250, 0.15)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
                  backdropFilter: 'blur(20px)',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '5px',
                    background: item.gradient,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.5s ease',
                    borderRadius: '32px 32px 0 0'
                  }} className="attendance-bar" />

                  <div style={{
                    width: '100px',
                    height: '100px',
                    background: item.gradient,
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '32px',
                    boxShadow: '0 15px 40px rgba(152, 16, 250, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.3) inset',
                    transition: 'transform 0.5s ease',
                    padding: '16px'
                  }} className="attendance-icon">
                    <Image 
                      src={item.icon} 
                      alt={item.title} 
                      width={64} 
                      height={64}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#9810FA',
                    marginBottom: '20px',
                    lineHeight: '1.3',
                    minHeight: '3.9rem'
                  }}>{item.title}</h3>
                  <p className='section-description' style={{ 
                    flex: 1,
                    marginBottom: 0
                  }}>{item.desc}</p>
                </div>
              </ScrollAnimationWrapper>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AttendanceSecuritySection;

