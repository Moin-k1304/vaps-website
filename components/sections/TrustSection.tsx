'use client'

import React from 'react'
import Image from 'next/image'

const TrustSection = () => {

  return (
    <section className="trust-section">
      <div className="trust-background">
        {/* Image positioned outside container */}
        <div className="trust-image-wrapper">
          <Image
            src="/images/robot-hand-gif.gif"
            alt="Trust Illustration"
            width={600}
            height={400}
            className="trust-image"
            priority
          />
        </div>

        <div className="container">
          <div className="row align-items-center">
            {/* Left Side - Empty space for image */}
            <div className="col-lg-6">
            </div>

            {/* Right Side - Content */}
            <div className="col-lg-6">
              <div className="trust-content">
                <h2 className="trust-title">
                  Powering the Next Generation of Smart Institutions
                </h2>
                <p className="trust-description">
                  Partner with VAPS, India's most trusted education technology company with 25 years of proven expertise. Experience AI-driven automation, intelligent analytics, and seamless ERP integration built for schools, colleges, and universities.
                </p>
                <div className="trust-buttons">
                  <button className="cta-button">
                    Learn more
                  </button>
                  <button className="cta-button secondary">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
