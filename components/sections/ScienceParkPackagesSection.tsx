'use client'

import { useState, useCallback } from 'react';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import Image from 'next/image';

interface ScienceParkPackagesSectionProps {
  packages: {
    silver: string[];
    gold: string[];
    platinum: string[];
  };
}

// Icon mapping for packages
const getPackageIcon = (packageName: string): string => {
  const iconMap: { [key: string]: string } = {
    'silver': '/images/svgs/silver-package.svg',
    'gold': '/images/svgs/gold-package.svg',
    'platinum': '/images/svgs/platinum-package.svg',
  };
  return iconMap[packageName] || '/images/svgs/silver-package.svg';
};

const ScienceParkPackagesSection: React.FC<ScienceParkPackagesSectionProps> = ({
  packages,
}) => {
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  const togglePackage = useCallback((packageName: string) => {
    setExpandedPackage(prev => prev === packageName ? null : packageName);
  }, []);

  const packageConfig = [
    {
      name: 'silver',
      title: 'Silver Package',
      features: packages.silver,
      count: packages.silver.length,
    },
    {
      name: 'gold',
      title: 'Gold Package',
      features: packages.gold,
      count: packages.gold.length,
    },
    {
      name: 'platinum',
      title: 'Platinum Package',
      features: packages.platinum,
      count: packages.platinum.length,
    },
  ];

  return (
    <section className="section-space relative z-10" style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .packages-container {
            max-width: 900px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          
          .package-card {
            background: #ffffff;
            border-radius: 24px;
            border: 1px solid rgba(152, 16, 250, 0.12);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          
          .package-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(152, 16, 250, 0.15);
            border-color: rgba(152, 16, 250, 0.3);
          }
          
          .package-card.expanded {
            box-shadow: 0 12px 40px rgba(152, 16, 250, 0.2);
            border-color: rgba(152, 16, 250, 0.4);
          }
          
          .package-header {
            padding: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            gap: 20px;
            transition: all 0.3s ease;
          }
          
          .package-icon-wrapper {
            width: 72px;
            height: 72px;
            border-radius: 18px;
            background: linear-gradient(135deg, rgba(152, 16, 250, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 16px rgba(152, 16, 250, 0.1);
            transition: all 0.4s ease;
          }
          
          .package-card:hover .package-icon-wrapper {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 8px 24px rgba(152, 16, 250, 0.2);
          }
          
          .package-icon {
            width: 40px;
            height: 40px;
          }
          
          .package-content {
            flex: 1;
            min-width: 0;
          }
          
          .package-title {
            font-size: clamp(1.25rem, 2.5vw, 1.5rem);
            font-weight: 700;
            color: #03297B;
            margin-bottom: 8px;
            line-height: 1.4;
          }
          
          .package-subtitle {
            font-size: clamp(0.9375rem, 2vw, 1.0625rem);
            color: #666;
            margin: 0;
            line-height: 1.6;
          }
          
          .package-toggle {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: linear-gradient(135deg, rgba(152, 16, 250, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s ease;
            flex-shrink: 0;
            border: 1px solid rgba(152, 16, 250, 0.2);
          }
          
          .package-card:hover .package-toggle {
            background: linear-gradient(135deg, rgba(152, 16, 250, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
            border-color: rgba(152, 16, 250, 0.4);
          }
          
          .package-toggle-icon {
            font-size: 1.25rem;
            color: #9810FA;
            transition: transform 0.4s ease;
          }
          
          .package-card.expanded .package-toggle-icon {
            transform: rotate(180deg);
          }
          
          .package-body {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), padding 0.5s ease;
            padding: 0 32px;
            opacity: 0;
          }
          
          .package-card.expanded .package-body {
            max-height: 2000px;
            padding: 0 32px 32px 32px;
            opacity: 1;
          }
          
          .package-list {
            list-style: none;
            padding: 0;
            margin: 0;
            column-gap: 24px;
            line-height: 1.8;
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
          
          .package-item {
            margin-bottom: 12px;
            font-size: 1rem;
            color: #555;
            break-inside: avoid;
            display: flex;
            align-items: flex-start;
          }
          
          .package-item-bullet {
            color: #9810FA;
            margin-right: 12px;
            font-size: 1.25rem;
            flex-shrink: 0;
            margin-top: 2px;
          }
          
          @media (max-width: 768px) {
            .package-header {
              padding: 24px;
              gap: 16px;
            }
            
            .package-icon-wrapper {
              width: 64px;
              height: 64px;
            }
            
            .package-icon {
              width: 36px;
              height: 36px;
            }
            
            .package-body {
              padding: 0 24px;
            }
            
            .package-card.expanded .package-body {
              padding: 0 24px 24px 24px;
            }
            
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
        `
      }} />
      <div className="container">
        <ScrollAnimationWrapper animation="fadeUp">
          <div className="text-center mb-5" style={{ marginBottom: '80px' }}>
            <h2 className='section-title'>VAPS Science Park Packages</h2>
            <div style={{
              width: '100px',
              height: '4px',
              background: 'linear-gradient(90deg, #9810FA 0%, #03297B 100%)',
              margin: '0 auto',
              borderRadius: '2px'
            }} />
          </div>
        </ScrollAnimationWrapper>

        <div className="packages-container">
          {packageConfig.map((pkg, idx) => {
            const isExpanded = expandedPackage === pkg.name;
            return (
              <ScrollAnimationWrapper key={pkg.name} animation="fadeUp" delay={idx * 0.15}>
                <div
                  className={`package-card ${isExpanded ? 'expanded' : ''}`}
                >
                  <div
                    className="package-header"
                    onClick={() => togglePackage(pkg.name)}
                  >
                    <div className="package-icon-wrapper">
                      <div className="package-icon">
                        <Image
                          src={getPackageIcon(pkg.name)}
                          alt={pkg.title}
                          width={40}
                          height={40}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                    <div className="package-content">
                      <h3 className="package-title">{pkg.title}</h3>
                      <p className="package-subtitle">{pkg.count} Interactive Models</p>
                    </div>
                    <div className="package-toggle">
                      <span className="package-toggle-icon">▼</span>
                    </div>
                  </div>

                  <div className="package-body">
                    <ul
                      className="package-list"
                      data-package={pkg.name}
                    >
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="package-item">
                          <span className="package-item-bullet">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScienceParkPackagesSection;
