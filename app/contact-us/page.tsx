'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedContactBackground from '@/components/ui/AnimatedContactBackground';
import ContactInfoSection from '@/components/sections/ContactInfoSection';
import styles from '../../styles/ContactUsPage.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const mapSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const q = gsap.utils.selector(containerRef.current);

      // Ensure all content is visible initially (fallback)
      gsap.set(q('.contact-card, .info-item, .business-hour-row'), {
        opacity: 1,
        visibility: 'visible',
      });

      // Hero section animations
      gsap.from(q('.page-header'), {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2,
      });

      // Contact cards animation with enhanced effects
      if (contactSectionRef.current) {
        gsap.from(q('.contact-card'), {
          scrollTrigger: {
            trigger: contactSectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          immediateRender: false,
        });
      }

      // Map container animation
      gsap.from(q('.map-container'), {
        scrollTrigger: {
          trigger: mapSectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        scale: 0.95,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Map title animation
      gsap.from(q('.map-title'), {
        scrollTrigger: {
          trigger: mapSectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Info items animation with stagger - ensure they're visible
      const infoItems = q('.info-item');
      if (infoItems.length > 0) {
        gsap.set(infoItems, { opacity: 1 }); // Ensure initial visibility
        gsap.from(infoItems, {
          scrollTrigger: {
            trigger: q('.contact-info-section'),
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          x: -30,
          duration: 0.6,
          stagger: {
            amount: 0.4,
            from: 'start',
          },
          ease: 'power2.out',
        });
      }

      // Business hours animation - ensure they're visible
      const businessRows = q('.business-hour-row');
      if (businessRows.length > 0) {
        gsap.set(businessRows, { opacity: 1 }); // Ensure initial visibility
        gsap.from(businessRows, {
          scrollTrigger: {
            trigger: q('.business-hours-card'),
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          x: 20,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }

      // Parallax effect for hero section
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          y: 100,
          opacity: 0.8,
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleFormSubmit = async (formData: { name: string; email: string; phone: string; message: string }) => {
    // Simulate API call - replace with actual API endpoint
    await new Promise(resolve => setTimeout(resolve, 1500));
    // You can add your API call here
    // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
  };

  return (
    <div ref={containerRef} className={styles.contactPage}>
      <div className={styles.headerSpacer} />

      {/* Hero Section */}
      <section ref={heroRef} className={styles.heroSection}>
        <AnimatedContactBackground />
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={`${styles.heroTitle} page-header`}>
              Get In Touch With Us
            </h1>
            <p className={`${styles.heroDescription} page-header`}>
              Ready to transform your educational institution? We're here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <ContactInfoSection ref={contactSectionRef} onFormSubmit={handleFormSubmit} isContactForm={true} />

      {/* Map Section */}
      <section ref={mapSectionRef} className={styles.mapSection}>
        <div className="container">
          <h2 className={`${styles.mapTitle} map-title`}>Visit Our Office</h2>
          <div className={`${styles.mapContainer} map-container`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.5642403574!2d77.49085284993146!3d12.953945620508932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VAPS Technosoft Office Location - Bangalore, India"
            />
          </div>
          <div className={styles.mapAddress}>
            <p>Bangalore, Karnataka, India</p>
          </div>
        </div>
      </section>
    </div>
  );
}
