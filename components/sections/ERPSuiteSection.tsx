'use client'

import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import Image from 'next/image';

interface Module {
  title: string;
  icon: string;
}

interface ERPSuiteSectionProps {
  title: string;
  description: string;
  modules: Module[];
}

// Icon mapping for ERP modules
const getERPModuleIcon = (title: string): string => {
  const iconMap: { [key: string]: string } = {
    'Pre-admission': '/images/svgs/pre-admission.svg',
    'Admission': '/images/svgs/admission.svg',
    'Fees Management': '/images/svgs/fees-management.svg',
    'Student Attendance': '/images/svgs/student-attendance.svg',
    'Exam Management': '/images/svgs/exam-management.svg',
    'Library Management': '/images/svgs/library-management.svg',
    'Inventory Management': '/images/svgs/inventory-management.svg',
    'Transport Management': '/images/svgs/transport-management.svg',
    'LMS': '/images/svgs/lms.svg',
  };
  return iconMap[title] || '/images/svgs/pre-admission.svg';
};

const ERPSuiteSection: React.FC<ERPSuiteSectionProps> = ({
  title,
  description,
  modules,
}) => {
  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .erp-modules-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
            max-width: 1200px;
            margin: 0 auto;
            align-items: stretch;
          }
          
          .erp-module-card {
            position: relative;
            background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
            border-radius: 24px;
            padding: 40px 32px;
            height: 100%;
            min-height: 260px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1.5px solid rgba(152, 16, 250, 0.12);
            box-shadow: 
              0 4px 24px rgba(0, 0, 0, 0.06),
              0 1px 3px rgba(0, 0, 0, 0.04),
              inset 0 1px 0 rgba(255, 255, 255, 0.8);
            overflow: hidden;
            cursor: pointer;
          }
          
          .erp-module-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #9810FA 0%, #7C3AED 40%, #3B82F6 80%, #10B981 100%);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1;
          }
          
          .erp-module-card::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(152, 16, 250, 0.08) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.5s ease;
            pointer-events: none;
          }
          
          .erp-module-card:hover {
            transform: translateY(-12px) scale(1.03);
            box-shadow: 
              0 20px 60px rgba(152, 16, 250, 0.2),
              0 8px 24px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.9);
            border-color: rgba(152, 16, 250, 0.4);
            background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
          }
          
          .erp-module-card:hover::before {
            transform: scaleX(1);
          }
          
          .erp-module-card:hover::after {
            opacity: 1;
          }
          
          .erp-module-card:hover .erp-icon-wrapper {
            transform: scale(1.15) rotate(8deg) translateY(-4px);
            box-shadow: 
              0 12px 32px rgba(152, 16, 250, 0.25),
              0 4px 12px rgba(59, 130, 246, 0.15);
            background: linear-gradient(135deg, rgba(152, 16, 250, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
          }
          
          .erp-module-card:hover .erp-title {
            color: #9810FA;
            transform: translateY(-2px);
          }
          
          .erp-icon-wrapper {
            width: 88px;
            height: 88px;
            border-radius: 22px;
            background: linear-gradient(135deg, rgba(152, 16, 250, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            box-shadow: 
              0 4px 16px rgba(152, 16, 250, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.6);
          }
          
          .erp-icon-wrapper::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%);
            opacity: 0;
            transition: opacity 0.5s ease;
          }
          
          .erp-icon-wrapper::after {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, rgba(152, 16, 250, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
            border-radius: 24px;
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: -1;
          }
          
          .erp-module-card:hover .erp-icon-wrapper::before {
            opacity: 1;
          }
          
          .erp-module-card:hover .erp-icon-wrapper::after {
            opacity: 1;
          }
          
          .erp-icon {
            width: 52px;
            height: 52px;
            position: relative;
            z-index: 1;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
            transition: filter 0.3s ease;
          }
          
          .erp-module-card:hover .erp-icon {
            filter: drop-shadow(0 4px 8px rgba(152, 16, 250, 0.3));
          }
          
          .erp-title {
            font-size: clamp(1.125rem, 2vw, 1.375rem);
            font-weight: 700;
            color: #03297B;
            margin: 0;
            transition: all 0.4s ease;
            letter-spacing: -0.01em;
            line-height: 1.4;
          }
          
          @media (max-width: 992px) {
            .erp-modules-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 24px;
            }
          }
          
          @media (max-width: 768px) {
            .erp-modules-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
            }
            
            .erp-module-card {
              padding: 32px 24px;
              min-height: 240px;
            }
            
            .erp-icon-wrapper {
              width: 76px;
              height: 76px;
              margin-bottom: 20px;
            }
            
            .erp-icon {
              width: 46px;
              height: 46px;
            }
          }
          
          @media (max-width: 480px) {
            .erp-modules-grid {
              grid-template-columns: 1fr;
              gap: 18px;
            }
            
            .erp-module-card {
              padding: 28px 20px;
              min-height: 220px;
            }
          }
        `
      }} />
      <div className="container">
        <ScrollAnimationWrapper animation="fadeUp">
          <div className="text-center mb-5" style={{ marginBottom: '80px' }}>
            <h2 className='section-title'>{title}</h2>
            <div style={{
              width: '100px',
              height: '5px',
              background: 'linear-gradient(90deg, #9810FA 0%, #7C3AED 50%, #3B82F6 100%)',
              margin: '0 auto 32px',
              borderRadius: '3px'
            }} />
            <p className='section-description'>
              {description}
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="erp-modules-grid">
          {modules.map((module, idx) => (
            <ScrollAnimationWrapper key={idx} animation="scale" delay={idx * 0.1}>
              <div className="erp-module-card">
                <div className="erp-icon-wrapper">
                  <div className="erp-icon">
                    <Image
                      src={getERPModuleIcon(module.title)}
                      alt={module.title}
                      width={52}
                      height={52}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      priority={idx < 6}
                    />
                  </div>
                </div>
                <h4 className="erp-title">{module.title}</h4>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ERPSuiteSection;
