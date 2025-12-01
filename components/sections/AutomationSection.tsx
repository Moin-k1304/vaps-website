'use client'

import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface Feature {
  title: string;
  desc: string;
  icon: string;
}

interface DecisionMaking {
  title: string;
  items: string[];
}

interface AutomationSectionProps {
  badge: string;
  title: string;
  features: Feature[];
  decisionMaking: DecisionMaking;
}

const AutomationSection: React.FC<AutomationSectionProps> = ({
  badge,
  title,
  features,
  decisionMaking,
}) => {
  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: '#1a1a1a', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
        backgroundSize: '50px 50px',
        opacity: 0.3
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row align-items-center gx-5">
          <div className="col-lg-5 mb-5 mb-lg-0">
            <ScrollAnimationWrapper animation="fadeRight">
              <div className="mb-4">
                <span className='section-label'>{badge}</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900,
                marginBottom: '48px',
                color: 'white',
                lineHeight: '1.2'
              }}>{title}</h2>
              <div className="feature-list">
                {features.map((item, i) => (
                  <div key={i} className="premium-admin-card" style={{
                    marginBottom: '32px',
                    padding: '32px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
                    transition: 'all 0.4s ease'
                  }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                      <div style={{
                        flexShrink: 0,
                        width: '56px',
                        height: '56px',
                        background: 'linear-gradient(135deg, #9810FA 0%, #03297B 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: 'white',
                        boxShadow: '0 8px 20px rgba(152, 16, 250, 0.4)',
                        transition: 'transform 0.4s ease'
                      }} className="admin-icon">{item.icon}</div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          color: '#9810FA',
                          marginBottom: '12px',
                          fontSize: '1.375rem',
                          fontWeight: 800
                        }}>{item.title}</h4>
                        <p style={{
                          color: 'rgba(255,255,255,0.8)',
                          marginBottom: 0,
                          lineHeight: 1.7,
                          fontSize: '1rem'
                        }}>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimationWrapper>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <ScrollAnimationWrapper animation="fadeLeft">
              <div className="premium-decision-card" style={{
                background: 'linear-gradient(135deg, rgba(42, 42, 42, 0.9) 0%, rgba(51, 51, 51, 0.9) 100%)',
                padding: '56px',
                borderRadius: '32px',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                backdropFilter: 'blur(20px)'
              }}>
                <h3 style={{
                  marginBottom: '40px',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'white'
                }}>{decisionMaking.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {decisionMaking.items.map((item, i) => (
                    <li key={i} className="premium-decision-item" style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '24px',
                      color: 'rgba(255,255,255,0.95)',
                      fontSize: '1.0625rem',
                      lineHeight: 1.6,
                      transition: 'all 0.3s ease'
                    }}>
                      <span style={{
                        color: '#9810FA',
                        marginRight: '20px',
                        fontSize: '1.75rem',
                        fontWeight: 'bold',
                        flexShrink: 0,
                        width: '40px',
                        height: '40px',
                        background: 'rgba(152, 16, 250, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(152, 16, 250, 0.3)',
                        transition: 'all 0.3s ease'
                      }} className="decision-check">✓</span>
                      <span>{item}</span>
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

export default AutomationSection;


