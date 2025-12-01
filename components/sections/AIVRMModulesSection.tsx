'use client'

import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import Image from 'next/image';

interface Module {
  title: string;
  desc: string;
}

interface AIVRMModulesSectionProps {
  modules: Module[];
}

// Icon mapping for each module
const getModuleIcon = (title: string): string => {
  const iconMap: { [key: string]: string } = {
    'Report Cards': '/images/svgs/report-card.svg',
    'Parent Communication': '/images/svgs/parent-communication.svg',
    'Student Management': '/images/svgs/student-management.svg',
    'Examinations': '/images/svgs/examinations.svg',
    'Timetable Management': '/images/svgs/timetable-management.svg',
    'Analytics & OBE': '/images/svgs/analytics-obe.svg',
    'Placement Management': '/images/svgs/placement-management.svg',
    'Faculty Evaluation': '/images/svgs/faculty-evaluation.svg',
  };
  return iconMap[title] || '/images/svgs/report-card.svg';
};

const AIVRMModulesSection: React.FC<AIVRMModulesSectionProps> = ({
  modules,
}) => {
  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .aivrm-modules-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 28px;
            max-width: 1400px;
            margin: 0 auto;
            align-items: stretch;
            padding: 0 16px;
            width: 100%;
            box-sizing: border-box;
          }
          
          .aivrm-module-card {
            position: relative;
            background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
            border-radius: 24px;
            padding: 36px;
            height: 100%;
            min-height: 280px;
            display: flex;
            flex-direction: column;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1.5px solid rgba(152, 16, 250, 0.12);
            box-shadow: 
              0 4px 24px rgba(0, 0, 0, 0.06),
              0 1px 3px rgba(0, 0, 0, 0.04),
              inset 0 1px 0 rgba(255, 255, 255, 0.8);
            overflow: hidden;
            cursor: pointer;
          }
          
          .aivrm-module-card::before {
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
          
          .aivrm-module-card::after {
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
          
          .aivrm-module-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 
              0 20px 60px rgba(152, 16, 250, 0.2),
              0 8px 24px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.9);
            border-color: rgba(152, 16, 250, 0.4);
            background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
          }
          
          .aivrm-module-card:hover::before {
            transform: scaleX(1);
          }
          
          .aivrm-module-card:hover::after {
            opacity: 1;
          }
          
          .aivrm-module-card:hover .module-icon-wrapper {
            transform: scale(1.15) rotate(8deg) translateY(-4px);
            box-shadow: 
              0 12px 32px rgba(152, 16, 250, 0.25),
              0 4px 12px rgba(59, 130, 246, 0.15);
            background: linear-gradient(135deg, rgba(152, 16, 250, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
          }
          
          .module-icon-wrapper {
            width: 80px;
            height: 80px;
            border-radius: 20px;
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
          
          .module-icon-wrapper::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%);
            opacity: 0;
            transition: opacity 0.5s ease;
          }
          
          .module-icon-wrapper::after {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, rgba(152, 16, 250, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
            border-radius: 22px;
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: -1;
          }
          
          .aivrm-module-card:hover .module-icon-wrapper::before {
            opacity: 1;
          }
          
          .aivrm-module-card:hover .module-icon-wrapper::after {
            opacity: 1;
          }
          
          .module-icon {
            width: 48px;
            height: 48px;
            position: relative;
            z-index: 1;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
            transition: filter 0.3s ease;
          }
          
          .aivrm-module-card:hover .module-icon {
            filter: drop-shadow(0 4px 8px rgba(152, 16, 250, 0.3));
          }
          
          .module-title {
            font-size: clamp(1.125rem, 2.5vw, 1.5rem);
            font-weight: 700;
            margin-bottom: 14px;
            color: #03297B;
            line-height: 1.3;
            transition: all 0.4s ease;
            letter-spacing: -0.01em;
            word-break: break-word;
            hyphens: auto;
            overflow-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            min-height: 2.6em;
          }
          
          .aivrm-module-card:hover .module-title {
            color: #9810FA;
            transform: translateX(2px);
          }
          
          .module-description {
            font-size: clamp(0.9375rem, 2vw, 1.0625rem);
            color: #555;
            line-height: 1.75;
            flex: 1;
            margin: 0;
            transition: color 0.3s ease;
          }
          
          .aivrm-module-card:hover .module-description {
            color: #444;
          }
          
          @media (max-width: 1200px) {
            .aivrm-modules-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
            }
          }
          
          @media (max-width: 992px) {
            .aivrm-modules-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
              padding: 0 12px;
            }
          }
          
          @media (max-width: 768px) {
            .aivrm-modules-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
              padding: 0 12px;
            }
            
            .aivrm-module-card {
              padding: clamp(20px, 4vw, 28px);
              min-height: auto;
              border-radius: 20px;
            }
            
            .module-icon-wrapper {
              width: 64px;
              height: 64px;
              margin-bottom: 16px;
              border-radius: 16px;
            }
            
            .module-icon {
              width: 36px;
              height: 36px;
            }
            
            .module-title {
              font-size: clamp(1rem, 3vw, 1.25rem);
              margin-bottom: 12px;
              line-height: 1.3;
            }
            
            .module-description {
              font-size: clamp(0.875rem, 2vw, 0.9375rem);
              line-height: 1.6;
            }
          }
          
          @media (max-width: 480px) {
            .aivrm-modules-grid {
              grid-template-columns: 1fr;
              gap: 16px;
              padding: 0 16px;
            }
            
            .aivrm-module-card {
              padding: 24px;
              min-height: auto;
              border-radius: 16px;
            }
            
            .module-icon-wrapper {
              width: 56px;
              height: 56px;
              margin-bottom: 16px;
              border-radius: 14px;
            }
            
            .module-icon {
              width: 32px;
              height: 32px;
            }
            
            .module-title {
              font-size: 1.125rem;
              margin-bottom: 10px;
            }
            
            .module-description {
              font-size: 0.875rem;
            }
          }
          
          @media (max-width: 360px) {
            .aivrm-modules-grid {
              padding: 0 12px;
            }
            
            .aivrm-module-card {
              padding: 20px;
            }
          }
        `
      }} />
      <div className="container">
        <ScrollAnimationWrapper animation="fadeUp">
          <div className="text-center mb-5" style={{ marginBottom: 'clamp(40px, 8vw, 80px)', padding: '0 16px' }}>
            <div className="mb-4">
              <span style={{
                display: 'inline-block',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                padding: 'clamp(6px, 1.5vw, 8px) clamp(16px, 4vw, 20px)',
                borderRadius: '6px'
              }} className='section-label'>Modules</span>
            </div>
            <h2 style={{
                marginBottom: 0,
              lineHeight: '1.3',
            }} className='section-title'>AI-VRM School & College Modules</h2>
          </div>
        </ScrollAnimationWrapper>

        <div className="aivrm-modules-grid">
          {modules.map((mod, idx) => (
            <ScrollAnimationWrapper key={idx} animation="scale" delay={idx * 0.1}>
              <div className="aivrm-module-card">
                <div className="module-icon-wrapper">
                  <div className="module-icon">
                    <Image
                      src={getModuleIcon(mod.title)}
                      alt={mod.title}
                      width={48}
                      height={48}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      priority={idx < 4}
                    />
                  </div>
                </div>
                <h4 className="module-title">{mod.title}</h4>
                <p className="section-description">{mod.desc}</p>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIVRMModulesSection;
