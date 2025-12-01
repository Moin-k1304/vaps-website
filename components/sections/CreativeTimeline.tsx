'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const timelineData = [
    {
        year: '2000',
        title: 'The Beginning',
        description: 'Founded with a vision to transform education through technology, VAPS started its journey in digital innovation.',
        image: '/images/hero-section-robot-img.png',
    },
    {
        year: '2005',
        title: 'Expanding Horizons',
        description: 'Expanded our services across India, bringing digital solutions to educational institutions nationwide.',
        image: '/images/about_us/2005-expanding-horizon.png',
    },
    {
        year: '2010',
        title: 'Embracing Mobility',
        description: 'Launched mobile-first solutions, enabling learning on-the-go and revolutionizing campus management.',
        image: '/images/about_us/2010-mobility-era.png',
    },
    {
        year: '2015',
        title: 'Smart Solutions Era',
        description: 'Introduced IoT-enabled smart campus solutions, automating processes and enhancing operational efficiency.',
        image: '/images/about_us/2015-smart-revolution.png',
    },
    {
        year: '2020',
        title: 'AI Revolution',
        description: 'Pioneered AI-powered educational tools, transforming how students learn and educators teach.',
        image: '/images/about_us/2020-ai-revolution.png',
    },
    {
        year: '2025',
        title: 'The Future is Now',
        description: 'Leading the charge in agentic AI functionality, creating intelligent systems that adapt and evolve.',
        image: '/images/about_us/2025-future.png',
    },
]

const CreativeTimeline = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current || !lineRef.current || !cardsRef.current) return

            const cards = gsap.utils.toArray<HTMLElement>('.timeline-card')

            // Animate the central line
            gsap.fromTo(lineRef.current,
                { height: 0 },
                {
                    height: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 1,
                    }
                }
            )

            // Animate cards
            cards.forEach((card, i) => {
                const direction = i % 2 === 0 ? -100 : 100

                gsap.fromTo(card,
                    {
                        opacity: 0,
                        x: direction,
                        scale: 0.8
                    },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            end: 'top 50%',
                            scrub: 1,
                        }
                    }
                )
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="creative-timeline-section" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h4 style={{ color: '#9810fa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Our Journey</h4>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>The Evolution of VAPS</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#666' }}>
                        From humble beginnings to a global leader in educational technology, explore our history of innovation.
                    </p>
                </div>

                <div className="timeline-container" style={{ position: 'relative', padding: '40px 0' }}>
                    {/* Central Line */}
                    <div
                        ref={lineRef}
                        className="timeline-line"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            bottom: 0,
                            width: '4px',
                            background: 'linear-gradient(to bottom, #9810fa, #3b82f6)',
                            transform: 'translateX(-50%)',
                            borderRadius: '2px',
                            zIndex: 0
                        }}
                    />

                    <div ref={cardsRef} className="timeline-cards">
                        {timelineData.map((item, index) => (
                            <div
                                key={index}
                                className="timeline-card-wrapper"
                                style={{
                                    display: 'flex',
                                    justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                                    paddingBottom: '80px',
                                    position: 'relative',
                                    width: '50%',
                                    marginLeft: index % 2 === 0 ? 0 : '50%',
                                    paddingRight: index % 2 === 0 ? '40px' : 0,
                                    paddingLeft: index % 2 === 0 ? 0 : '40px',
                                }}
                            >
                                {/* Dot on the line */}
                                <div
                                    className="timeline-dot"
                                    style={{
                                        position: 'absolute',
                                        [index % 2 === 0 ? 'right' : 'left']: '-10px',
                                        top: '20px',
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        background: '#fff',
                                        border: '4px solid #9810fa',
                                        zIndex: 1,
                                        boxShadow: '0 0 0 4px rgba(152, 16, 250, 0.2)'
                                    }}
                                />

                                <div
                                    className="timeline-card"
                                    style={{
                                        background: '#fff',
                                        borderRadius: '20px',
                                        padding: '30px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                        maxWidth: '500px',
                                        width: '100%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <div className="row align-items-center">
                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <div style={{
                                                position: 'relative',
                                                width: '100%',
                                                height: '100px',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                background: '#f5f5f5'
                                            }}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '4px 12px',
                                                background: 'rgba(152, 16, 250, 0.1)',
                                                color: '#9810fa',
                                                borderRadius: '20px',
                                                fontSize: '0.9rem',
                                                fontWeight: 600,
                                                marginBottom: '10px'
                                            }}>
                                                {item.year}
                                            </span>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>{item.title}</h3>
                                            <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, marginBottom: 0 }}>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreativeTimeline
