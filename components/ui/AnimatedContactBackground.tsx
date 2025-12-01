'use client'

import { useEffect, useRef } from 'react';
import styles from './AnimatedContactBackground.module.css';

interface AnimatedContactBackgroundProps {
  className?: string;
}

export default function AnimatedContactBackground({
  className = '',
}: AnimatedContactBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const particles: Array<{
      element: HTMLDivElement;
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      
      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const vx = (Math.random() - 0.5) * 0.5;
      const vy = (Math.random() - 0.5) * 0.5;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;
      particle.style.animationDelay = `${Math.random() * 2}s`;

      container.appendChild(particle);

      particles.push({
        element: particle,
        x,
        y,
        vx,
        vy,
        size,
      });
    }

    // Animate particles
    let animationId: number;
    const animate = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x > 100) particle.x = 0;
        if (particle.x < 0) particle.x = 100;
        if (particle.y > 100) particle.y = 0;
        if (particle.y < 0) particle.y = 100;

        particle.element.style.left = `${particle.x}%`;
        particle.element.style.top = `${particle.y}%`;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      particles.forEach((particle) => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className={`${styles.animatedBackground} ${className}`}>
      <div className={styles.gradientOrb1}></div>
      <div className={styles.gradientOrb2}></div>
      <div className={styles.gradientOrb3}></div>
      <div className={styles.gridPattern}></div>
    </div>
  );
}

