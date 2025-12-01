'use client'

import { forwardRef } from 'react';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

interface MobileApp {
  title: string;
  subtitle: string;
  features: string[];
}

interface ContactFormSectionProps {
  title: string;
  formFields: FormField[];
  submitText: string;
  mobileApp: MobileApp;
}

const ContactFormSection = forwardRef<HTMLFormElement, ContactFormSectionProps>(({
  title,
  formFields,
  submitText,
  mobileApp,
}, contactFormRef) => {

  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)' }}>
      <div className="container">
        <div className="row align-items-center gx-5">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <ScrollAnimationWrapper animation="fadeRight">
              <h2 style={{
                fontSize: '2.25rem',
                fontWeight: 600,
                color: '#03297B',
                marginBottom: '1rem',
                lineHeight: '2.625rem'
              }}>{title}</h2>
              <form ref={contactFormRef} style={{ position: 'relative', zIndex: 2 }}>
                <div className="row g-4 mb-4">
                  {formFields.slice(0, 2).map((field) => (
                    <div key={field.id} className="col-md-6">
                      <div className="form-floating">
                        <input
                          type={field.type}
                          className="form-control premium-input"
                          id={field.id}
                          placeholder={field.placeholder}
                          style={{
                            width: '100%',
                            padding: '16px 24px',
                            borderRadius: '12px',
                            border: '2px solid rgba(152, 16, 250, 0.2)',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'white',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                          }}
                        />
                        <label htmlFor={field.id}>{field.label}</label>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row g-4 mb-5">
                  {formFields.slice(2).map((field) => (
                    <div key={field.id} className="col-md-6">
                      <div className="form-floating">
                        <input
                          type={field.type}
                          className="form-control premium-input"
                          id={field.id}
                          placeholder={field.placeholder}
                          style={{
                            width: '100%',
                            padding: '16px 24px',
                            borderRadius: '12px',
                            border: '2px solid rgba(152, 16, 250, 0.2)',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'white',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                          }}
                        />
                        <label htmlFor={field.id}>{field.label}</label>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="premium-submit-btn"
                  style={{
                    padding: '16px 48px',
                    background: 'linear-gradient(135deg, #9810FA 0%, #03297B 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(152, 16, 250, 0.4)',
                    transition: 'all 0.4s ease'
                  }}
                >
                  {submitText}
                </button>
              </form>
            </ScrollAnimationWrapper>
          </div>
          <div className="col-lg-6">
            <ScrollAnimationWrapper animation="fadeLeft">
              <div className="contact-mobile-mockup" style={{
                position: 'relative',
                height: 'clamp(400px, 60vh, 500px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px',
                marginTop: '40px'
              }}>
                <div style={{
                  width: 'clamp(240px, 50vw, 320px)',
                  height: 'clamp(480px, 80vh, 640px)',
                  background: 'linear-gradient(135deg, rgba(152, 16, 250, 0.1) 0%, rgba(3, 41, 123, 0.1) 100%)',
                  borderRadius: '48px',
                  border: '10px solid #03297B',
                  padding: '24px',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(152, 16, 250, 0.05) 0%, rgba(3, 41, 123, 0.05) 100%)',
                    opacity: 0.3,
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(152, 16, 250, 0.1) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                    animation: 'float 20s ease-in-out infinite'
                  }} />
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    borderRadius: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    fontSize: '1.125rem',
                    color: '#666',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <div className="app-icon" style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, #9810FA 0%, #03297B 100%)',
                      borderRadius: '25%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '50px',
                      color: 'white',
                      boxShadow: '0 15px 40px rgba(152, 16, 250, 0.4)',
                      marginBottom: '20px',
                      transition: 'transform 0.4s ease'
                    }}>
                      📱
                    </div>
                    <h4 style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: '#03297B',
                      marginBottom: '10px'
                    }}>{mobileApp.title}</h4>
                    <p style={{ fontSize: '1rem', color: '#555', marginBottom: '30px' }}>{mobileApp.subtitle}</p>
                    <div className="app-features" style={{ display: 'flex', gap: '15px' }}>
                      {mobileApp.features.map((feature, idx) => (
                        <span key={idx} style={{ fontSize: '30px', transition: 'transform 0.3s ease' }}>{feature}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactFormSection.displayName = 'ContactFormSection';

export default ContactFormSection;

