'use client'

import Image from 'next/image';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import styles from '../../styles/AboutUsPage.module.css';

interface LeadershipSectionProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  message: string;
  name: string;
  role: string;
}

const LeadershipSection: React.FC<LeadershipSectionProps> = ({
  image,
  title,
  message,
  name,
  role,
}) => {
  return (
    <section className={styles.leadershipSection} data-scroll-section>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-4">
            <ScrollAnimationWrapper animation="scale">
              <div className={`${styles.leadershipImageWrapper} leadershipImageWrapper`}>
                <div className={styles.imageGlowEffect} />
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={600}
                  className={styles.leadershipImage}
                  loading="eager"
                  quality={85}
                  priority
                  sizes="(max-width: 991px) 100vw, 33vw"
                />
                <div className={styles.imageOverlay} />
              </div>
            </ScrollAnimationWrapper>
          </div>
          <div className="col-12 col-lg-8">
            <ScrollAnimationWrapper animation="fadeLeft">
              <div className={styles.leadershipContent}>
                <h2 className="section-title">{title}</h2>
                <p className="section-description">
                  {message}
                </p>
                <div className={styles.leadershipQuote}>
                  <div className={styles.leadershipName}>{name}</div>
                  <div className={styles.leadershipRole}>{role}</div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;


