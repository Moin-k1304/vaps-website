'use client'

import { useEffect, useRef, ReactNode, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface ScrollWidthAnimationProps {
    children: ReactNode;
    className?: string;
    startWidth?: string;
    endWidth?: string;
    borderRadius?: string;
}

const ScrollWidthAnimation: React.FC<ScrollWidthAnimationProps> = ({
    children,
    className = '',
    startWidth = '100%',
    endWidth = '90%',
    borderRadius = '0',
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Check if mobile on client side
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        // Disable animation on mobile to prevent conflicts with Swiper
        if (isMobile) return;

        const ctx = gsap.context(() => {
            if (!containerRef.current || !contentRef.current) return

            gsap.fromTo(
                contentRef.current,
                {
                    width: startWidth,
                    borderRadius: '0px',
                },
                {
                    width: endWidth,
                    borderRadius: borderRadius,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%', // Start slightly earlier
                        end: 'center center',
                        scrub: 1.5, // Increase scrub for smoother catch-up
                        markers: false,
                        refreshPriority: -1, // Lower priority for better performance
                    },
                    ease: 'none', // Linear ease is better for scrubbed animations
                }
            )
        })

        return () => ctx.revert()
    }, [startWidth, endWidth, borderRadius, isMobile])

    // Use endWidth on mobile to prevent animation conflicts
    const initialWidth = isMobile ? endWidth : startWidth;

    return (
        <div ref={containerRef} className={`width-animation-container ${className}`} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div ref={contentRef} style={{ width: initialWidth, overflow: 'hidden' }}>
                {children}
            </div>
        </div>
    )
}

export default ScrollWidthAnimation
