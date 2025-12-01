'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useBasicScrollAnimation } from '@/hooks/useBasicScrollAnimation';

export default function DigitalCampusInfraSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useBasicScrollAnimation(sectionRef, '.section-label, .digital-campus-infra-title, .digital-campus-infra-description, .infra-feature-card, .digital-campus-infra-image');

  return (
    <section ref={sectionRef} className="digital-campus-infra-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="digital-campus-infra-content">
              <span className="section-label">VAPS Technology</span>
              
              <h2 className="digital-campus-infra-title">
                VAPS Digital Campus Infrastructure: Power, Flexibility, And Security
              </h2>
              
              <p className="digital-campus-infra-description">
                The VAPS Digital Campus Solution features a resilient N-tier architecture for high 
                availability, performance, and scalability. We provide flexible hosting options, from 
                shared to dedicated hyperscale cloud environments. Our models include SAAS and the 
                full-service BYOT model.
              </p>
              
              <div className="row g-4 mt-3">
                <div className="col-md-4">
                  <div className="infra-feature-card">
                    <h3 className="infra-feature-title">Public Cloud Server</h3>
                    <p className="infra-feature-text">
                      The VAPS Digital Campus Solution features a resilient N-tier architecture for high 
                      availability, performance, and scalability.
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="infra-feature-card">
                    <h3 className="infra-feature-title">Public Cloud Server</h3>
                    <p className="infra-feature-text">
                      The VAPS Digital Campus Solution features a resilient N-tier architecture for high 
                      availability, performance, and scalability.
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="infra-feature-card">
                    <h3 className="infra-feature-title">Public Cloud Server</h3>
                    <p className="infra-feature-text">
                      The VAPS Digital Campus Solution features a resilient N-tier architecture for high 
                      availability, performance, and scalability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-3" style={{ alignSelf: 'flex-end' }}>
            <div className="digital-campus-infra-image">
              <Image
                src="/images/digital_campus_bottom.png"
                alt="VAPS Digital Campus Infrastructure"
                width={500}
                height={500}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
