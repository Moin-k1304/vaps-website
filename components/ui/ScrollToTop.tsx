'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

const ScrollToTop = () => {
    const [showButton, setShowButton] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Scroll detection - Show button after scrolling down 400px
    useEffect(() => {
        let ticking = false; // Throttle scroll events for performance
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    ticking = false;
                    const scrollY = window.scrollY || document.documentElement.scrollTop;
                    // Show button after scrolling down 400px
                    setShowButton(scrollY > 400);
                });
                ticking = true;
            }
        };

        // Check initial scroll position after DOM is ready
        const timeoutId = setTimeout(() => {
            handleScroll();
        }, 300);

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // Fade animation effect
    useEffect(() => {
        const btn = buttonRef.current;
        if (!btn) return;

        if (showButton) {
            // Show button with smooth fade-in effect
            gsap.killTweensOf(btn);
            gsap.set(btn, { display: 'flex' });
            gsap.to(btn, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out',
                force3D: true,
                pointerEvents: 'auto'
            });
        } else {
            // Hide button with smooth fade-out effect
            gsap.killTweensOf(btn);
            gsap.to(btn, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                force3D: true,
                pointerEvents: 'none',
                onComplete: () => {
                    if (!showButton) {
                        gsap.set(btn, { display: 'none' });
                    }
                }
            });
        }
    }, [showButton]);

    // Scroll to Top Function - Hide button while scrolling
    const scrollToTop = useCallback(() => {
        // Hide button immediately when clicked
        setShowButton(false);
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <>
            <button
                ref={buttonRef}
                onClick={scrollToTop}
                className="scroll-to-top-btn"
                style={{
                    position: 'fixed',
                    bottom: 'clamp(20px, 4vw, 40px)',
                    right: 'clamp(20px, 4vw, 40px)',
                    width: 'clamp(50px, 8vw, 64px)',
                    height: 'clamp(50px, 8vw, 64px)',
                    background: 'linear-gradient(135deg, #9810FA 0%, #03297B 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    boxShadow: '0 12px 40px rgba(152, 16, 250, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2) inset',
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    opacity: 0,
                    willChange: 'opacity',
                    pointerEvents: 'none',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    transition: 'box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                        scale: 1.1,
                        boxShadow: '0 16px 50px rgba(152, 16, 250, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.3) inset',
                        duration: 0.3,
                        ease: 'power2.out',
                        force3D: true
                    });
                }}
                onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                        scale: 1,
                        boxShadow: '0 12px 40px rgba(152, 16, 250, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2) inset',
                        duration: 0.3,
                        ease: 'power2.out',
                        force3D: true
                    });
                }}
                aria-label="Scroll to top"
            >
                <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{
                        transition: 'transform 0.3s ease'
                    }}
                >
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </button>

            <style dangerouslySetInnerHTML={{
                __html: `
                    .scroll-to-top-btn {
                        will-change: opacity;
                        transform: translateZ(0);
                        backface-visibility: hidden;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    .scroll-to-top-btn:hover svg {
                        transform: translateY(-2px) translateZ(0);
                    }
                    .scroll-to-top-btn:active {
                        transform: scale(0.95) translateZ(0) !important;
                    }
                    @media (max-width: 768px) {
                        .scroll-to-top-btn {
                            width: 56px !important;
                            height: 56px !important;
                            bottom: 24px !important;
                            right: 24px !important;
                        }
                        .scroll-to-top-btn svg {
                            width: 20px !important;
                            height: 20px !important;
                        }
                    }
                    @media (max-width: 480px) {
                        .scroll-to-top-btn {
                            width: 50px !important;
                            height: 50px !important;
                            bottom: 20px !important;
                            right: 20px !important;
                        }
                        .scroll-to-top-btn svg {
                            width: 18px !important;
                            height: 18px !important;
                        }
                    }
                `
            }} />
        </>
    );
};

export default ScrollToTop;

