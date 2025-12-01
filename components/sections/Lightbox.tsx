'use client'

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../../styles/AboutUsPage.module.css';

interface LightboxImage {
  image: string;
  label: string;
}

interface LightboxProps {
  isOpen: boolean;
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const currentImage = images[currentIndex];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onNavigate('prev');
    if (e.key === 'ArrowRight') onNavigate('next');
  }, [isOpen, onClose, onNavigate]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentImage || typeof window === 'undefined') return null;

  return createPortal(
    <div
      className={styles.lightboxOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.lightboxClose}
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <button
          className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
          onClick={() => onNavigate('prev')}
          aria-label="Previous image"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
          onClick={() => onNavigate('next')}
          aria-label="Next image"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className={styles.lightboxImageContainer}>
          <Image
            src={currentImage.image}
            alt={currentImage.label}
            width={900}
            height={600}
            className={styles.lightboxImage}
            quality={95}
            sizes="(max-width: 768px) 100vw, 900px"
            priority
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '85vh',
              objectFit: 'contain'
            }}
          />
        </div>

        <div className={styles.lightboxCaption}>
          <p className={styles.lightboxLabel}>{currentImage.label}</p>
          <p className={styles.lightboxCounter}>
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Lightbox;

