'use client'

import { useEffect, useRef, useCallback, memo } from 'react';
import Image from 'next/image';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import styles from '../../styles/AboutUsPage.module.css';

interface Client {
  src: string;
  alt: string;
}

interface WarpSpeedClientsProps {
  clients: Client[];
  title?: string;
  subtitle?: string;
}

const WarpSpeedClients: React.FC<WarpSpeedClientsProps> = memo(({
  clients,
  title = "Trusted Partners",
  subtitle = "Powering the Next Generation of Institutions"
}) => {
  const warpTrackRef = useRef<HTMLDivElement>(null);
  const warpContainerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const speedRef = useRef(1.5); // Reduced speed for better performance
  const targetSpeedRef = useRef(1.5);
  const scrollPosRef = useRef(0);
  const isVisibleRef = useRef(true);
  const isPausedRef = useRef(false);
  const lastTimeRef = useRef(performance.now());

  const handleMouseEnter = useCallback(() => {
    targetSpeedRef.current = 0.3;
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetSpeedRef.current = 2;
    setTimeout(() => { targetSpeedRef.current = 1.5; }, 800);
  }, []);

  useEffect(() => {
    const track = warpTrackRef.current;
    const container = warpContainerRef.current;
    if (!track || !container) return;

    track.style.transform = 'translateZ(0)';
    track.style.backfaceVisibility = 'hidden';

    // Clone items only once
    const items = Array.from(track.children);
    if (items.length > 0 && items.length === clients.length) {
      // Clone items for seamless loop
      items.forEach(item => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
      items.forEach(item => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          isPausedRef.current = !entry.isIntersecting;
        });
      },
      { threshold: 0.1, rootMargin: '50px' } // Reduced rootMargin
    );

    observer.observe(container);

    const animate = (currentTime: number) => {
      if (!isPausedRef.current && isVisibleRef.current && track) {
        const deltaTime = Math.min((currentTime - lastTimeRef.current) / 16.67, 2);
        lastTimeRef.current = currentTime;

        // Smooth speed interpolation
        speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08;
        scrollPosRef.current -= speedRef.current * deltaTime;

        const trackWidth = track.scrollWidth / 3;
        if (scrollPosRef.current <= -trackWidth) {
          scrollPosRef.current = 0;
        }

        // Reduced skew for better performance
        const skew = speedRef.current * -1;
        track.style.transform = `translate3d(${scrollPosRef.current}px, 0, 0)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [clients.length]);

  return (
    <section className={styles.sectionClients} data-scroll-section>
      <div className="container">
        <ScrollAnimationWrapper animation="fadeUp">
          <h2 className={`${styles.sectionHeader} section-title`}>{title}</h2>
          <p className={`${styles.sectionSubtitle} section-description`}>{subtitle}</p>
        </ScrollAnimationWrapper>

        <div
          className={styles.warpTrackContainer}
          ref={warpContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.warpTrack} ref={warpTrackRef}>
            {clients.map((client, index) => (
              <div
                key={index}
                className={styles.clientCard}
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(0)'
                }}
              >
                <Image
                  src={client.src}
                  alt={client.alt}
                  width={120}
                  height={120}
                  loading="lazy"
                  quality={70}
                  style={{
                    transform: 'translateZ(0)',
                    objectFit: 'contain'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

WarpSpeedClients.displayName = 'WarpSpeedClients';

export default WarpSpeedClients;


