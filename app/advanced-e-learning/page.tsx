'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import AdvancedELearningHero from '@/components/sections/AdvancedELearningHero';
import FloatingBackgroundAdvanced from '@/components/sections/FloatingBackgroundAdvanced';
import InfrastructureSection from '@/components/sections/InfrastructureSection';
import ModulesSection from '@/components/sections/ModulesSection';
import WhyVapsSection from '@/components/sections/WhyVapsSection';
import AccreditationsSection from '@/components/sections/AccreditationsSection';
import ContactFormSection from '@/components/sections/ContactFormSection';
import { useAdvancedELearningAnimations } from '@/hooks/useAdvancedELearningAnimations';

import heroData from '@/data/advanced-e-learning/hero';
import infrastructureData from '@/data/advanced-e-learning/infrastructure';
import modulesData from '@/data/advanced-e-learning/modules';
import featuresData from '@/data/advanced-e-learning/features';
import accreditationsData from '@/data/advanced-e-learning/accreditations';
import contactData from '@/data/advanced-e-learning/contact';
import AnimatedContactBackground from '@/components/ui/AnimatedContactBackground';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import ContactInfoSection from '@/components/sections/ContactInfoSection';
import ClientsSectionNew from '@/components/sections/about-new/ClientsSectionNew';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ force3D: true, nullTargetWarn: false });
}

const AdvancedELearningPage = () => {
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);

  useAdvancedELearningAnimations(floatingElementsRef, contactFormRef);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });

      // Optimize ScrollTrigger refresh
      ScrollTrigger.config({
        limitCallbacks: true,
        syncInterval: 0.1
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleDownload = () => {
    // Handle download logic here
  };

  const handleFormSubmit = async (formData: { name: string; email: string; phone: string; message: string }) => {
    // Simulate API call - replace with actual API endpoint
    await new Promise(resolve => setTimeout(resolve, 1500));
    // You can add your API call here
    // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
  };


  return (
    <div className="advanced-elearning-page relative overflow-hidden" style={{
      contain: 'layout style paint',
      contentVisibility: 'auto'
    }}>
      <FloatingBackgroundAdvanced ref={floatingElementsRef} />

      <div style={{ height: '80px' }} />

      <AdvancedELearningHero
        badge={heroData.badge}
        title={heroData.title}
        description={heroData.description}
        ctaText={heroData.ctaText}
      />

      <InfrastructureSection
        title={infrastructureData.title}
        description1={infrastructureData.description1}
        description2={infrastructureData.description2}
        image={infrastructureData.image}
      />

      <ModulesSection
        title={modulesData.title}
        description={modulesData.description}
        modules={modulesData.modules}
        defaultActive="Elite Classroom"
      />

      <WhyVapsSection
        title={featuresData.title}
        features={featuresData.features}
      />

      <AccreditationsSection
        accreditations={accreditationsData}
        downloadButtonText="Download NEP Leaflet"
        onDownload={handleDownload}
      />

      <ClientsSectionNew />

      <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)' }}>
        <AnimatedContactBackground />
        <div className="">

          <ScrollAnimationWrapper animation="fadeUp">
            <div className="text-center mb-5" style={{ marginBottom: '80px' }}>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                fontWeight: 600,
                color: '#03297B',
                marginBottom: '16px'
              }}>Ready to Digitalize With VAPS?</h2>
              <div style={{
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #9810FA 0%, #03297B 100%)',
                margin: '0 auto',
                borderRadius: '2px'
              }} />
            </div>
          </ScrollAnimationWrapper>

          <div className="">
            <ContactInfoSection onFormSubmit={handleFormSubmit} />

          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .premium-module-content, .premium-why-card, .premium-module-btn,
          .premium-module-image, .module-content-card, .module-icon-wrapper,
          .premium-accordion-wrapper, .premium-input, .premium-submit-btn {
            transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Only set will-change during animations */
          .premium-module-content.animating,
          .premium-module-btn.animating,
          .module-content-card.animating {
            will-change: transform, opacity;
          }
          
          .advanced-elearning-page section {
            transform-style: preserve-3d;
            perspective: 1000px;
          }
          
          .premium-why-card, .premium-module-content, .premium-accordion-wrapper {
            transform-style: preserve-3d;
            backface-visibility: hidden;
          }
          .floating-element {
            transform: translateZ(0);
            will-change: transform;
          }
          @keyframes float {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(15px, -15px, 0); }
          }
          .premium-cta-btn {
            transform: translateZ(0);
          }
          .premium-cta-btn:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 12px 32px rgba(59, 130, 246, 0.5), 0 6px 16px rgba(59, 130, 246, 0.3);
          }
          .premium-cta-btn::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #1e3a8a 0%, #3B82F6 100%);
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: -1;
          }
          .premium-cta-btn:hover::before {
            opacity: 1;
          }
          .premium-why-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 30px 80px rgba(152, 16, 250, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8) inset;
            border-color: rgba(152, 16, 250, 0.4);
          }
          .premium-why-card:hover .why-overlay {
            opacity: 1;
          }
          .premium-why-card:hover .why-icon {
            transform: scale(1.15) rotate(-8deg);
          }
          .premium-accordion-wrapper {
            transition: box-shadow 0.3s ease;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }
          .premium-accordion-item {
            box-sizing: border-box;
            width: 100%;
          }
          .premium-accordion-item * {
            box-sizing: border-box;
          }
          .premium-accordion-item {
            transition: background 0.3s ease, transform 0.2s ease;
          }
          .premium-accordion-item:hover {
            transform: translateY(-2px);
          }
          .premium-accordion-wrapper:hover .accordion-shine {
            left: 100%;
          }
          .premium-accordion-wrapper:hover {
            box-shadow: 0 20px 60px rgba(3, 41, 123, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.25) inset !important;
          }
          .premium-module-btn:hover {
            transform: translateY(-2px) scale(1.05);
          }
          .premium-input:focus {
            outline: none;
            border-color: rgba(152, 16, 250, 0.5);
            box-shadow: 0 8px 25px rgba(152, 16, 250, 0.15);
          }
          .premium-submit-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 32px rgba(152, 16, 250, 0.5), 0 6px 16px rgba(152, 16, 250, 0.3);
          }
          .contact-mobile-mockup {
            animation: float 6s ease-in-out infinite;
          }
          .module-content-card {
            will-change: transform, opacity;
            transform: translateZ(0);
          }
          .premium-module-content {
            transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .premium-module-image {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .premium-module-image:hover {
            transform: scale3d(1.02, 1.02, 1);
          }
          .module-icon-wrapper {
            transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .module-icon-wrapper:hover {
            transform: rotate(5deg) scale3d(1.1, 1.1, 1) !important;
          }
          .module-icon-wrapper:hover .icon-glow {
            opacity: 1;
          }
          .module-content-card {
            will-change: transform, opacity;
            transform: translateZ(0);
          }
          
          @media (max-width: 768px) {
            section[style*="minHeight"] {
              min-height: clamp(500px, 90vh, 100vh) !important;
            }
            .section-space {
              padding: 60px 0 !important;
            }
            .hero-content h1 {
              font-size: clamp(1.75rem, 8vw, 2.5rem) !important;
              line-height: 1.2 !important;
            }
            .hero-content p {
              font-size: clamp(0.9375rem, 4vw, 1.125rem) !important;
              padding: 0 15px !important;
            }
            .hero-content > div:first-child {
              padding: 6px 16px !important;
            }
            .hero-content > div:first-child span {
              font-size: 0.75rem !important;
              letter-spacing: 1px !important;
            }
            .premium-module-content {
              padding: 32px 24px !important;
            }
            .premium-why-card {
              padding: 32px 24px !important;
            }
            .premium-accordion-item {
              padding: 20px 20px !important;
              flex-wrap: wrap !important;
            }
            .premium-accordion-wrapper {
              margin-bottom: 16px !important;
              width: 100% !important;
              max-width: 100% !important;
            }
            .premium-accordion-wrapper .premium-accordion-item > div:first-child {
              gap: 12px !important;
              width: 100% !important;
              flex-wrap: wrap !important;
            }
            .premium-accordion-wrapper .premium-accordion-item > div:first-child > div:first-child {
              width: 48px !important;
              height: 48px !important;
              font-size: 24px !important;
              flex-shrink: 0 !important;
            }
            .premium-accordion-wrapper .premium-accordion-item > div:first-child > div:last-child {
              flex: 1 !important;
              min-width: 0 !important;
              width: auto !important;
            }
            .premium-accordion-wrapper .premium-accordion-item h3 {
              font-size: 1.125rem !important;
              word-wrap: break-word !important;
              overflow-wrap: break-word !important;
            }
            .premium-accordion-wrapper .premium-accordion-item p {
              font-size: 0.8125rem !important;
              word-wrap: break-word !important;
              overflow-wrap: break-word !important;
            }
            .premium-accordion-wrapper div[style*="maxHeight"] {
              padding: 0 20px 20px 20px !important;
            }
            .premium-accordion-wrapper div[style*="maxHeight"] > div {
              padding-top: 16px !important;
              margin-top: 16px !important;
            }
            .premium-accordion-wrapper div[style*="maxHeight"] p {
              font-size: 0.875rem !important;
              line-height: 1.6 !important;
            }
            .premium-accordion-wrapper div[style*="maxHeight"] h4 {
              font-size: 1rem !important;
              margin-bottom: 10px !important;
            }
            .premium-accordion-wrapper div[style*="maxHeight"] h4 + p {
              font-size: 0.8125rem !important;
            }
            .premium-why-card h4 {
              font-size: 1.375rem !important;
              margin-bottom: 12px !important;
            }
            .premium-why-card p {
              font-size: 0.875rem !important;
              line-height: 1.6 !important;
            }
            .premium-why-icon {
              width: 70px !important;
              height: 70px !important;
              font-size: 36px !important;
              margin-bottom: 20px !important;
            }
            .premium-module-content {
              padding: 40px 32px !important;
            }
            .module-text-content h2 {
              font-size: clamp(1.375rem, 5vw, 2rem) !important;
              margin-bottom: 12px !important;
            }
            .module-text-content p {
              font-size: 0.9375rem !important;
              line-height: 1.6 !important;
            }
            .premium-module-btn {
              padding: 12px 20px !important;
              font-size: 0.875rem !important;
              width: 100% !important;
              margin-bottom: 8px !important;
            }
            .module-content-card .premium-module-image {
              height: clamp(300px, 40vh, 400px) !important;
            }
            .premium-module-content .row {
              flex-direction: column-reverse !important;
            }
            .premium-module-content .col-lg-6 {
              margin-bottom: 24px !important;
            }
            .premium-cta-btn {
              padding: 14px 28px !important;
              font-size: 0.9375rem !important;
            }
          }
          @media (max-width: 480px) {
            .premium-module-content {
              padding: 24px 16px !important;
            }
            .premium-why-card {
              padding: 24px 16px !important;
            }
            .premium-accordion-item {
              padding: 16px 16px !important;
              flex-direction: column !important;
              align-items: flex-start !important;
            }
            .premium-accordion-wrapper {
              margin-bottom: 12px !important;
              border-radius: 16px !important;
            }
            .premium-accordion-wrapper .premium-accordion-item > div:first-child {
              width: 100% !important;
              margin-bottom: 12px !important;
              gap: 12px !important;
            }
            .premium-accordion-wrapper .premium-accordion-item > div:first-child > div:first-child {
              width: 40px !important;
              height: 40px !important;
              font-size: 20px !important;
              flex-shrink: 0 !important;
            }
            .premium-accordion-wrapper .premium-accordion-item > div:first-child > div:last-child {
              flex: 1 !important;
              min-width: 0 !important;
            }
            .premium-accordion-wrapper .premium-accordion-item > div:last-child {
              align-self: flex-end !important;
              margin-top: 8px !important;
            }
            .premium-accordion-wrapper .premium-accordion-item h3 {
              font-size: 1rem !important;
              word-wrap: break-word !important;
              overflow-wrap: break-word !important;
            }
            .premium-accordion-wrapper .premium-accordion-item p {
              font-size: 0.75rem !important;
              word-wrap: break-word !important;
              overflow-wrap: break-word !important;
              line-height: 1.4 !important;
            }
            .premium-accordion-wrapper div[style*="maxHeight"] {
              padding: 0 16px 16px 16px !important;
            }
            .premium-accordion-wrapper div[style*="maxHeight"] > div {
              padding-top: 12px !important;
              margin-top: 12px !important;
            }
            .premium-accordion-wrapper div[style*="maxHeight"] p {
              font-size: 0.8125rem !important;
              line-height: 1.5 !important;
            }
            .premium-accordion-wrapper div[style*="maxHeight"] h4 {
              font-size: 0.9375rem !important;
              margin-bottom: 8px !important;
              line-height: 1.3 !important;
            }
            .premium-accordion-wrapper div[style*="maxHeight"] h4 + p {
              font-size: 0.75rem !important;
              line-height: 1.5 !important;
            }
            .premium-why-icon {
              width: 60px !important;
              height: 60px !important;
              font-size: 32px !important;
              margin-bottom: 16px !important;
            }
            .premium-why-card h4 {
              font-size: 1.125rem !important;
              margin-bottom: 10px !important;
            }
            .premium-why-card p {
              font-size: 0.8125rem !important;
              line-height: 1.5 !important;
            }
            .module-text-content h2 {
              font-size: clamp(1.25rem, 5vw, 1.75rem) !important;
              margin-bottom: 10px !important;
            }
            .module-text-content p {
              font-size: 0.875rem !important;
              line-height: 1.6 !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default AdvancedELearningPage;
