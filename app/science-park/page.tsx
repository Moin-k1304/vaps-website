'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScienceParkHero from '@/components/sections/ScienceParkHero';
import FloatingBackgroundAdvanced from '@/components/sections/FloatingBackgroundAdvanced';
import SolutionSection from '@/components/sections/SolutionSection';
import ModelsSection from '@/components/sections/ModelsSection';
import ScienceParkPackagesSection from '@/components/sections/ScienceParkPackagesSection';
import WhyVapsSection from '@/components/sections/WhyVapsSection';
import ContactFormSection from '@/components/sections/ContactFormSection';
import { useScienceParkAnimations } from '@/hooks/useScienceParkAnimations';

import heroData from '@/data/science-park/hero';
import solutionData from '@/data/science-park/solution';
import modelsData from '@/data/science-park/models';
import packagesData from '@/data/science-park/packages';
import featuresData from '@/data/science-park/features';
import contactData from '@/data/science-park/contact';
import AnimatedContactBackground from '@/components/ui/AnimatedContactBackground';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import ContactInfoSection from '@/components/sections/ContactInfoSection';
import ClientsSectionNew from '@/components/sections/about-new/ClientsSectionNew';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ force3D: true, nullTargetWarn: false });
}

const ScienceParkPage = () => {
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);

  useScienceParkAnimations(floatingElementsRef, contactFormRef);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleFormSubmit = async (formData: { name: string; email: string; phone: string; message: string }) => {
    // Simulate API call - replace with actual API endpoint
    await new Promise(resolve => setTimeout(resolve, 1500));
    // You can add your API call here
    // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
  };


  return (
    <div className="science-park-page relative overflow-hidden" style={{
      contain: 'layout style paint',
      willChange: 'scroll-position'
    }}>
      <FloatingBackgroundAdvanced ref={floatingElementsRef} />

      <div style={{ height: '80px' }} />

      <ScienceParkHero
        badge={heroData.badge}
        title={heroData.title}
        description={heroData.description}
        ctaText={heroData.ctaText}
      />

      <SolutionSection
        title={solutionData.title}
        description={solutionData.description}
        benefits={solutionData.benefits}
        image={solutionData.image}
      />

      <ModelsSection
        title={modelsData.title}
        description={modelsData.description}
        models={modelsData.models}
      />

      <ScienceParkPackagesSection
        packages={packagesData}
      />

      <WhyVapsSection
        title={featuresData.title}
        features={featuresData.features}
        subtitle={featuresData.subtitle}
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
          .premium-model-card, .premium-why-card, .premium-package-card,
          .premium-cta-btn, .premium-input, .premium-submit-btn {
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
          }
          .floating-element {
            will-change: transform;
            transform: translateZ(0);
          }
          @keyframes float {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(20px, -20px, 0); }
          }
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          .premium-cta-btn {
            will-change: transform;
            transform: translateZ(0);
          }
          .premium-cta-btn:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 12px 32px rgba(152, 16, 250, 0.5), 0 6px 16px rgba(152, 16, 250, 0.3);
          }
          .premium-cta-btn::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #03297B 0%, #9810FA 100%);
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: -1;
          }
          .premium-cta-btn:hover::before {
            opacity: 1;
          }
          .premium-model-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 50px rgba(152, 16, 250, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.8) inset;
          }
          .premium-model-card:hover .model-icon {
            transform: scale(1.15) rotate(-8deg);
          }
          .premium-model-card:hover .model-shine {
            left: 100%;
          }
          .premium-package-accordion:hover {
            box-shadow: 0 20px 60px rgba(3, 41, 123, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.25) inset !important;
          }
          .premium-package-accordion:hover .package-shine {
            left: 100%;
          }
          .premium-package-header:hover {
            background: linear-gradient(135deg, rgba(152, 16, 250, 0.15) 0%, rgba(3, 41, 123, 0.25) 100%) !important;
          }
          .package-list[data-package="silver"] {
            columns: 2;
          }
          .package-list[data-package="gold"] {
            columns: 2;
          }
          .package-list[data-package="platinum"] {
            columns: 3;
          }
          @media (max-width: 768px) {
            .package-list[data-package="silver"],
            .package-list[data-package="gold"],
            .package-list[data-package="platinum"] {
              columns: 2;
            }
          }
          @media (max-width: 480px) {
            .package-list[data-package="silver"],
            .package-list[data-package="gold"],
            .package-list[data-package="platinum"] {
              columns: 1;
            }
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
            .premium-model-card {
              min-height: 240px !important;
            }
            .premium-model-card > div:first-child {
              height: 140px !important;
            }
            .premium-model-card .model-icon {
              width: 70px !important;
              height: 70px !important;
              font-size: 36px !important;
            }
            .premium-model-card h4 {
              font-size: 0.875rem !important;
            }
            .premium-package-header {
              padding: 20px 20px !important;
            }
            .premium-package-header h3 {
              font-size: 1.25rem !important;
            }
            .premium-package-accordion div[style*="maxHeight"] ul {
              columns: 1 !important;
            }
            .premium-why-card {
              padding: 32px 24px !important;
            }
            .premium-why-card h4 {
              font-size: 1.25rem !important;
            }
            .premium-why-card p {
              font-size: 0.9375rem !important;
            }
          }
          @media (max-width: 480px) {
            .premium-model-card {
              min-height: 220px !important;
            }
            .premium-model-card > div:first-child {
              height: 120px !important;
            }
            .premium-model-card .model-icon {
              width: 60px !important;
              height: 60px !important;
              font-size: 32px !important;
            }
            .premium-model-card h4 {
              font-size: 0.8125rem !important;
              padding: 0 12px !important;
            }
            .premium-package-header {
              padding: 16px 16px !important;
              flex-direction: column !important;
              align-items: flex-start !important;
            }
            .premium-package-header > div:first-child {
              width: 100% !important;
              margin-bottom: 12px !important;
            }
            .premium-package-header h3 {
              font-size: 1.125rem !important;
            }
            .premium-package-accordion div[style*="maxHeight"] ul {
              columns: 1 !important;
            }
            .premium-why-card {
              padding: 24px 16px !important;
            }
            .premium-why-card .why-icon {
              width: 60px !important;
              height: 60px !important;
              font-size: 32px !important;
            }
            .premium-why-card h4 {
              font-size: 1.125rem !important;
            }
            .premium-why-card p {
              font-size: 0.875rem !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default ScienceParkPage;
