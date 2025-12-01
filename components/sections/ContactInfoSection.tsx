'use client'

import { forwardRef } from 'react';
import ContactForm from '@/components/ui/ContactForm';
import AnimatedContactBackground from '@/components/ui/AnimatedContactBackground';
import styles from '../../styles/ContactUsPage.module.css';

interface ContactInfoSectionProps {
  onFormSubmit?: (formData: { name: string; email: string; phone: string; message: string }) => Promise<void> | void;
  isContactForm?: boolean;
}

const ContactInfoSection = forwardRef<HTMLElement, ContactInfoSectionProps>(
  ({ onFormSubmit , isContactForm}, ref) => {
    const handleFormSubmit = async (formData: { name: string; email: string; phone: string; message: string }) => {
      if (onFormSubmit) {
        await onFormSubmit(formData);
      } else {
        // Default behavior - simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    };

    return (
      <section ref={ref} className={`${isContactForm && styles.contactSection} contact-section`}>
        {isContactForm && <AnimatedContactBackground />}
        <div className="container" style={{ padding: '0 clamp(12px, 3vw, 24px)' }}>
          <div className="row g-4" style={{ margin: 0 }}>
            {/* Contact Form */}
            <div className="col-12 col-lg-6 d-flex" style={{ marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
              <div className={`${styles.contactCard} contact-card w-100`}>
                <h2 className={styles.cardSubtitle}>Send Us a Message</h2>
                <ContactForm onSubmit={handleFormSubmit} />
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-12 col-lg-6 d-flex" style={{ marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
              <div className={`${styles.contactInfoSection} contact-info-section w-100`}>
                <div className={`${styles.contactCard} contact-card`}>
                  <h2 className={styles.cardSubtitle}>Contact Information</h2>
                  <div className={styles.infoList}>
                    <div className={`${styles.infoItem} info-item`}>
                      <div className={styles.infoIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div className={styles.infoContent}>
                        <div className={styles.infoTitle}>Toll-Free Number</div>
                        <a href="tel:01206901888" className={styles.infoText} style={{ textDecoration: 'none', color: '#666666', display: 'block' }}>
                          01206901888
                        </a>
                      </div>
                    </div>

                    <div className={`${styles.infoItem} info-item`}>
                      <div className={styles.infoIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <div className={styles.infoContent}>
                        <div className={styles.infoTitle}>Email</div>
                        <a href="mailto:info@vapstech.com" className={styles.infoText} style={{ textDecoration: 'none', color: '#666666', display: 'block' }}>
                          info@vapstech.com
                        </a>
                      </div>
                    </div>

                    <div className={`${styles.infoItem} info-item`}>
                      <div className={styles.infoIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                      </div>
                      <div className={styles.infoContent}>
                        <div className={styles.infoTitle}>Websites</div>
                        <div className={styles.websiteLinks}>
                          <a
                            href="https://www.vapstech.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.websiteLink}
                          >
                            www.vapstech.com
                          </a>
                          <a
                            href="https://www.vapstech.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.websiteLink}
                          >
                            www.vapstech.ai
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className={`${styles.infoItem} info-item`}>
                      <div className={styles.infoIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div className={styles.infoContent}>
                        <div className={styles.infoTitle}>Location</div>
                        <div className={styles.infoText}>Bangalore, India</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${styles.contactCard} ${styles.businessHoursCard} contact-card business-hours-card`}>
                  <h3 className={styles.cardSubtitle}>Business Hours</h3>
                  <div className={styles.businessHours}>
                    <div className={`${styles.businessHourRow} business-hour-row`}>
                      <span>Monday - Friday</span>
                      <span className={styles.businessHourTime}>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className={`${styles.businessHourRow} business-hour-row`}>
                      <span>Saturday</span>
                      <span className={styles.businessHourTime}>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className={`${styles.businessHourRow} business-hour-row`}>
                      <span>Sunday</span>
                      <span className={styles.businessHourTime}>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ContactInfoSection.displayName = 'ContactInfoSection';

export default ContactInfoSection;

