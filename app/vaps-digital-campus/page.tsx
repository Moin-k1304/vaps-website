'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import './digital-campus.css';
import DigitalCampusHero from '@/components/sections/DigitalCampusHero';
import FloatingBackgroundAdvanced from '@/components/sections/FloatingBackgroundAdvanced';
import ArchitectureSection from '@/components/sections/ArchitectureSection';
import DigitalCampusModelsSection from '@/components/sections/DigitalCampusModelsSection';
import AIFeaturesGridSection from '@/components/sections/AIFeaturesGridSection';
import AutomationSection from '@/components/sections/AutomationSection';
import AttendanceSecuritySection from '@/components/sections/AttendanceSecuritySection';
import AIVRMModulesSection from '@/components/sections/AIVRMModulesSection';
import SustainableSection from '@/components/sections/SustainableSection';
import ERPSuiteSection from '@/components/sections/ERPSuiteSection';
import ExploreModulesSection from '@/components/sections/ExploreModulesSection';
import CommunicationSection from '@/components/sections/CommunicationSection';
import SecuritySection from '@/components/sections/SecuritySection';
import VirtualTourSection from '@/components/sections/VirtualTourSection';
import PackagesSection from '@/components/sections/PackagesSection';
import WhyVapsSection from '@/components/sections/WhyVapsSection';
import AccreditationsSection from '@/components/sections/AccreditationsSection';
import ClientsSection from '@/components/sections/ClientsSection';
import { useDigitalCampusAnimations } from '@/hooks/useDigitalCampusAnimations';
import { useModuleTransition } from '@/hooks/useModuleTransition';

import heroData from '@/data/vaps-digital-campus/hero';
import architectureData from '@/data/vaps-digital-campus/architecture';
import modelsData from '@/data/vaps-digital-campus/models';
import aiFeaturesData from '@/data/vaps-digital-campus/ai-features';
import automationData from '@/data/vaps-digital-campus/automation';
import attendanceSecurityData from '@/data/vaps-digital-campus/attendance-security';
import modulesData from '@/data/vaps-digital-campus/modules';
import communicationData from '@/data/vaps-digital-campus/communication';
import securityData from '@/data/vaps-digital-campus/security';
import virtualTourData from '@/data/vaps-digital-campus/virtual-tour';
import packagesData from '@/data/vaps-digital-campus/packages';
import whyVapsData from '@/data/vaps-digital-campus/why-vaps';
import accreditationsData from '@/data/vaps-digital-campus/accreditations';
import sustainableData from '@/data/vaps-digital-campus/sustainable';
import ContactInfoSection from '@/components/sections/ContactInfoSection';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import AnimatedContactBackground from '@/components/ui/AnimatedContactBackground';
import ClientsSectionNew from '@/components/sections/about-new/ClientsSectionNew';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ force3D: true, nullTargetWarn: false });
}

const DigitalCampusPage = () => {
    const floatingElementsRef = useRef<HTMLDivElement>(null);
    const contactFormRef = useRef<HTMLFormElement>(null);
    const { activeModule, isTransitioning, handleModuleChange, moduleContentRefs } = useModuleTransition('Smart Cards');

    useDigitalCampusAnimations(floatingElementsRef, contactFormRef);

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
        <div className="digital-campus-page relative overflow-hidden" style={{
            contain: 'layout style paint',
            willChange: 'scroll-position'
        }}>
            <FloatingBackgroundAdvanced ref={floatingElementsRef} />

            <div style={{ height: '80px' }} />

            <DigitalCampusHero
                badge={heroData.badge}
                title={heroData.title}
                description={heroData.description}
                ctaText={heroData.ctaText}
            />

            <ArchitectureSection
                label={architectureData.label}
                title={architectureData.title}
                description={architectureData.description}
            />

            <DigitalCampusModelsSection
                boot={modelsData.boot}
                saas={modelsData.saas}
            />

            <AIFeaturesGridSection
                subtitle={aiFeaturesData.subtitle}
                title={aiFeaturesData.title}
                description={aiFeaturesData.description}
                features={aiFeaturesData.features}
            />

            <AutomationSection
                badge={automationData.badge}
                title={automationData.title}
                features={automationData.features}
                decisionMaking={automationData.decisionMaking}
            />

            <AttendanceSecuritySection
                badge={attendanceSecurityData.badge}
                title={attendanceSecurityData.title}
                subtitle={attendanceSecurityData.subtitle}
                features={attendanceSecurityData.features}
            />

            <AIVRMModulesSection
                modules={modulesData.aiVrmModules}
            />

            <SustainableSection
                title={sustainableData.title}
                description1={sustainableData.description1}
                description2={sustainableData.description2}
                image={sustainableData.image}
            />

            <ERPSuiteSection
                title={modulesData.erpSuite.title}
                description={modulesData.erpSuite.description}
                modules={modulesData.erpSuite.modules}
            />

            <ExploreModulesSection
                description={modulesData.exploreModules.description}
                title={modulesData.exploreModules.title}
                modules={modulesData.exploreModules.modules}
                activeModule={activeModule}
                isTransitioning={isTransitioning}
                onModuleChange={handleModuleChange}
                moduleContentRefs={moduleContentRefs}
            />

            <CommunicationSection
                title={communicationData.title}
                modes={communicationData.modes}
            />

            <SecuritySection
                title={securityData.title}
                description={securityData.description}
                features={securityData.features}
                image="/images/vaps-digital-campus/security.jpg"
            />

            <VirtualTourSection
                title={virtualTourData.title}
                description1={virtualTourData.description1}
                description2={virtualTourData.description2}
                features={virtualTourData.features}
                buttonText={virtualTourData.buttonText}
                image="/images/vaps-digital-campus/360-virtual-tour.jpg"
            />

            <PackagesSection
                title={packagesData.title}
                saas={packagesData.saas}
                boot={packagesData.boot}
            />

            <WhyVapsSection
                title={whyVapsData.title}
                features={whyVapsData.features}
            />

            <AccreditationsSection
                accreditations={accreditationsData.items}
                downloadButtonText={accreditationsData.downloadButtonText}
            />

            {/* <ClientsSection
                title={clientsData.title}
                description={clientsData.description}
                buttonText={clientsData.buttonText}
            /> */}

            <ClientsSectionNew />

            <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)' }}>
                <AnimatedContactBackground />
                <div className="">

                    <ScrollAnimationWrapper animation="fadeUp">
                        <div className="text-center mb-5" style={{ marginBottom: '80px' }}>
                            <h2 className='section-title'>Ready to Digitalize With VAPS?</h2>
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

        </div>
    )
}

export default DigitalCampusPage
