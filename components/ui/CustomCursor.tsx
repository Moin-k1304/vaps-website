'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null)
    const followerRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const cursor = cursorRef.current
        const follower = followerRef.current

        if (!cursor || !follower) return

        // Initial setup
        gsap.set(cursor, { xPercent: -50, yPercent: -50 })
        gsap.set(follower, { xPercent: -50, yPercent: -50 })

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            })
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: 'power2.out'
            })
        }

        const handleHoverStart = () => {
            setIsHovering(true)
            gsap.to(cursor, { scale: 0.5, duration: 0.3 })
            gsap.to(follower, {
                scale: 2,
                backgroundColor: 'rgba(152, 16, 250, 0.1)',
                borderColor: 'transparent',
                duration: 0.3
            })
        }

        const handleHoverEnd = () => {
            setIsHovering(false)
            gsap.to(cursor, { scale: 1, duration: 0.3 })
            gsap.to(follower, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: '#9810fa',
                duration: 0.3
            })
        }

        window.addEventListener('mousemove', moveCursor)

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .swiper-button-next, .swiper-button-prev, input, select, textarea')
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleHoverStart)
            el.addEventListener('mouseleave', handleHoverEnd)
        })

        // Observer for dynamic content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    const newElements = document.querySelectorAll('a, button, .swiper-button-next, .swiper-button-prev')
                    newElements.forEach(el => {
                        el.removeEventListener('mouseenter', handleHoverStart) // Prevent duplicates
                        el.removeEventListener('mouseleave', handleHoverEnd)
                        el.addEventListener('mouseenter', handleHoverStart)
                        el.addEventListener('mouseleave', handleHoverEnd)
                    })
                }
            })
        })

        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverStart)
                el.removeEventListener('mouseleave', handleHoverEnd)
            })
            observer.disconnect()
        }
    }, [])

    return (
        <>
            <div
                ref={cursorRef}
                className="custom-cursor"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#9810fa',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference'
                }}
            />
            <div
                ref={followerRef}
                className="custom-cursor-follower"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '40px',
                    height: '40px',
                    border: '1px solid #9810fa',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    transition: 'transform 0.1s ease',
                    mixBlendMode: 'difference'
                }}
            />
            <style jsx global>{`
        @media (min-width: 992px) {
          body, a, button {
            cursor: none !important;
          }
        }
        @media (max-width: 991px) {
          .custom-cursor, .custom-cursor-follower {
            display: none !important;
          }
        }
      `}</style>
        </>
    )
}

export default CustomCursor
