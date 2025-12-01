'use client'

import styles from '@/styles/StickyTabsSection.module.css';

export default function TestStickyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.spacer}>Scroll down to see the sticky effect</div>
      
      {/* Mission & Vision Section */}
      <section className={styles.missionSection}>
        <div className={styles.background} />
        
        <div className="container">
          <div className="row">
            {/* Left Side - Sticky Title (40%) */}
            <div className="col-lg-5">
              <div className={styles.stickyTitle}>
                <h2>Driving Innovation Through Technology</h2>
                <p>This title should stick as you scroll</p>
              </div>
            </div>

            {/* Right Side - Scrolling Cards (60%) */}
            <div className="col-lg-7">
              <div className={styles.cardsWrapper}>
                {/* Legacy Card */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.icon}>🏛️</span>
                    <h3>Legacy</h3>
                  </div>
                  <p>
                    VAPS Technosoft, based in Bangalore, has been a leader in digital transformation for over 25 years. 
                    As pioneers in delivering comprehensive digital solutions for the education sector, VAPS Technosoft 
                    is now embracing the power of AI to further enhance the learning experience. The company is committed 
                    to transforming traditional campuses into futuristic, technology-driven hubs that pave the way for 
                    the future of education.
                  </p>
                </div>

                {/* Mission Card */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.icon}>⚡</span>
                    <h3>Mission</h3>
                  </div>
                  <p>
                    At VAPS Technosoft, we are committed to building and customizing software that addresses real-world 
                    challenges. Our mission is to deeply understand and provide comprehensive IT solutions, leveraging AI 
                    to deliver meaningful digital outcomes that empower institutions across various sectors. We believe 
                    in fostering an open and collaborative culture that drives innovation, accelerates the creation of 
                    cutting-edge AI-driven solutions, and transforms how technology serves institutions.
                  </p>
                </div>

                {/* Vision Card */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.icon}>🌐</span>
                    <h3>Vision</h3>
                  </div>
                  <p>
                    VAPS Technosoft aims to be a leader in the tech industry, empowering institutions with innovative 
                    digital solutions. We focus on continuous improvement, adopting the latest technologies to deliver 
                    exceptional service. Our goal is to build advanced IT ecosystems and enhance our core competencies 
                    to provide the best results. With a skilled workforce and a client-centric, research-driven approach, 
                    we lead the way in tech innovation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.spacer}>End of page</div>
    </div>
  );
}
