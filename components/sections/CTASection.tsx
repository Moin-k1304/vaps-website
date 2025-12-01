'use client'

import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import styles from '../../styles/AboutUsPage.module.css';

interface CTALink {
  url: string;
  text: string;
}

interface CTASectionProps {
  title: string;
  subtitle: string;
  phone: string;
  links: CTALink[];
  buttonText: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  phone,
  links,
  buttonText,
}) => {
  return (
    <section className={`${styles.ctaSection} cta-section`} data-scroll-section>
      <div className="container">
        <ScrollAnimationWrapper animation="scale">
          <div className={styles.ctaContent}>
            <h2 className='section-title'>{title}</h2>
            <p className={styles.description}>{subtitle}</p>

            <div className={styles.ctaInfo} style={{marginTop: '2rem'}}>
              <div className={styles.ctaPhone}>
                <div className={styles.ctaDot} />
                <span>Toll-Free: <strong>{phone}</strong></span>
              </div>
              <div className={styles.ctaDivider} />
              <div className={styles.ctaLinks}>
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaLink}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>

            <button className='cta-button primary'>
              {buttonText}
            </button>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default CTASection;




