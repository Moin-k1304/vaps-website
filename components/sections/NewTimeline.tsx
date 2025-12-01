"use client"

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '@/app/newtimeline.css';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: number;
  title: string;
  description: string;
  position: number;
}

export default function Timeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [pathPoints, setPathPoints] = useState<{ x: number; y: number }[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const milestones: Milestone[] = [
    {
      year: 2000,
      title: 'The Beginning',
      description: 'Our journey started with a vision to simplify technology and connect people through digital innovation.',
      position: 0.05
    },
    {
      year: 2005,
      title: 'Expanding Horizons',
      description: 'Introduced our first generation of software solutions, marking the beginning of our commitment to digital transformation.',
      position: 0.20
    },
    {
      year: 2010,
      title: 'Embracing Mobility',
      description: 'Ventured into mobile and kiosk solutions, bringing technology closer to everyday users. When global markets struggled in 2008, VAPS stayed focused-adapting, evolving, and empowering its partners',
      position: 0.48
    },
    {
      year: 2015,
      title: 'Smart Solutions Era',
      description: 'Launched smart card systems, GPS tracking, and IVR solutions - building intelligent networks for businesses.',
      position: 0.72
    },
    {
      year: 2020,
      title: 'Artificial Intelligence Revolution',
      description: 'Adopted AI, machine learning, and automation across services - from Chat GPT integrations to biometric systems and digital signage. Even in the pandemic, VAPS stood strong by connecting schools, teachers, and students through technology',
      position: 0.92
    },
    {
      year: 2025,
      title: 'The Future is Now',
      description: 'Celebrating 25 years of excellence with next-generation innovations: AI Document Scanning, 360 degree Virtual Tours, and smart digital ecosystems',
      position: 0.98
    },
  ];

  useEffect(() => {
    setIsMounted(true);

    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width >= 768 && width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);

    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !isMounted) return;

    const updateCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      console.log(rect.width, rect.height);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;
      const isMobile = deviceType === 'mobile';
      const isTablet = deviceType === 'tablet';

      const points: { x: number; y: number }[] = [];

      if (isMobile) {
        const startX = width * 0.5;
        const startY = height * 0.15;
        const endY = height * 0.85;

        for (let t = 0; t <= 1; t += 0.01) {
          const y = startY + (endY - startY) * t;
          const x = startX + Math.sin(t * Math.PI * 2.5) * (width * 0.15);
          points.push({ x, y });
        }
      } else if (isTablet) {
        const startX = width * 0.3;
        const startY = height * 0.15;
        const endY = height * 0.85;

        for (let t = 0; t <= 1; t += 0.01) {
          const y = startY + (endY - startY) * t;
          const curveOffset = Math.sin(t * Math.PI * 1.5) * (width * 0.2);
          const x = startX + curveOffset;
          points.push({ x, y });
        }
      } else {
        const startX = width * 0.8;
        const startY = height * 0.1;
        const cp1X = width * 0.8;
        const cp1Y = height * 0.2;
        const cp2X = width * 0.2;
        const cp2Y = height * 0.35;
        const midX = width * 0.2;
        const midY = height * 0.5;
        const cp3X = width * 0.2;
        const cp3Y = height * 0.65;
        const cp4X = width * 0.8;
        const cp4Y = height * 0.8;
        const endX = width * 0.8;
        const endY = height * 0.9;

        for (let t = 0; t <= 1; t += 0.01) {
          let x, y;
          if (t <= 0.5) {
            const localT = t * 2;
            const t2 = localT * localT;
            const t3 = t2 * localT;
            const mt = 1 - localT;
            const mt2 = mt * mt;
            const mt3 = mt2 * mt;

            x = mt3 * startX + 3 * mt2 * localT * cp1X + 3 * mt * t2 * cp2X + t3 * midX;
            y = mt3 * startY + 3 * mt2 * localT * cp1Y + 3 * mt * t2 * cp2Y + t3 * midY;
          } else {
            const localT = (t - 0.5) * 2;
            const t2 = localT * localT;
            const t3 = t2 * localT;
            const mt = 1 - localT;
            const mt2 = mt * mt;
            const mt3 = mt2 * mt;

            x = mt3 * midX + 3 * mt2 * localT * cp3X + 3 * mt * t2 * cp4X + t3 * endX;
            y = mt3 * midY + 3 * mt2 * localT * cp3Y + 3 * mt * t2 * cp4Y + t3 * endY;
          }
          points.push({ x, y });
        }
      }

      setPathPoints(points);

      const pathWidth = isMobile ? 30 : isTablet ? 40 : 50;
      const dashLength = isMobile ? 10 : 14;
      const dashGap = isMobile ? 7 : 9;

      ctx.strokeStyle = "hsl(291, 84%, 58%)";
      ctx.lineWidth = 2;
      ctx.setLineDash([dashLength, dashGap]);

      ctx.beginPath();
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const angle = Math.atan2(dy, dx);

        const offsetX = Math.sin(angle) * (pathWidth / 2);
        const offsetY = -Math.cos(angle) * (pathWidth / 2);

        if (i === 0) {
          ctx.moveTo(p1.x + offsetX, p1.y + offsetY);
        }
        ctx.lineTo(p2.x + offsetX, p2.y + offsetY);
      }
      ctx.stroke();

      ctx.beginPath();
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const angle = Math.atan2(dy, dx);

        const offsetX = Math.sin(angle) * (-pathWidth / 2);
        const offsetY = -Math.cos(angle) * (-pathWidth / 2);

        if (i === 0) {
          ctx.moveTo(p1.x + offsetX, p1.y + offsetY);
        }
        ctx.lineTo(p2.x + offsetX, p2.y + offsetY);
      }
      ctx.stroke();
    };

    updateCanvas();
    window.addEventListener("resize", updateCanvas);
    return () => window.removeEventListener("resize", updateCanvas);
  }, [isMounted, deviceType]);

  useEffect(() => {
    if (pathPoints.length === 0 || !ballRef.current || !containerRef.current) return;

    const ball = ballRef.current;
    const container = containerRef.current;

    const getPointOnPath = (progress: number) => {
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const index = Math.floor(clampedProgress * (pathPoints.length - 1));
      const nextIndex = Math.min(index + 1, pathPoints.length - 1);
      const localProgress = (clampedProgress * (pathPoints.length - 1)) - index;

      const p1 = pathPoints[index];
      const p2 = pathPoints[nextIndex];

      return {
        x: p1.x + (p2.x - p1.x) * localProgress,
        y: p1.y + (p2.y - p1.y) * localProgress,
      };
    };

    const initialPoint = getPointOnPath(0);
    gsap.set(ball, {
      x: initialPoint.x,
      y: initialPoint.y,
      xPercent: -50,
      yPercent: -50,
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 0.5,
      onUpdate: (self) => {
        const point = getPointOnPath(self.progress);
        gsap.set(ball, {
          x: point.x,
          y: point.y,
          xPercent: -50,
          yPercent: -50,
        });

        milestonesRef.current.forEach((milestone, index) => {
          if (milestone) {
            const milestoneProgress = milestones[index].position;
            if (self.progress >= milestoneProgress - 0.1) {
              gsap.to(milestone, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              });
            } else {
              gsap.to(milestone, {
                opacity: 0,
                y: 30,
                duration: 0.4,
              });
            }
          }
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [pathPoints, milestones]);

  return (
    <section className="new-timeline-section">
      <div className="new-timeline-container">
        <div className="new-timeline-header">
          <span className="new-timeline-label" data-testid="text-section-label">
            Milestones
          </span>
          <h1 className="new-timeline-heading" data-testid="text-main-heading">
            25 Years of
            <br />
            <span className="new-timeline-heading-accent">Leadership.</span>
            <br />
            <span className="new-timeline-heading-accent">Legacy.</span>
            <br />
            <span className="new-timeline-heading-accent">Learning.</span>
          </h1>
          <p className="new-timeline-description" data-testid="text-intro-description">
            Every milestone represents a partnership, a story, and a step forward in redefining the future of education through technology
          </p>
        </div>

        <div ref={containerRef} className="new-timeline-path-container">
          <canvas
            ref={canvasRef}
            className="new-timeline-canvas"
            data-testid="canvas-timeline-path"
          />

          <div
            ref={ballRef}
            className="new-timeline-ball"
            data-testid="marker-ball"
          />

          {isMounted && milestones.map((milestone, index) => {
            const isMobile = deviceType === 'mobile';
            const isTablet = deviceType === 'tablet';

            let topPosition = "0%";
            let leftPosition = "50%";
            let alignRight = false;

            if (isMobile) {
              topPosition = `${milestone.position * 100}%`;
              leftPosition = "50%";
            } else if (isTablet) {
              topPosition = `${milestone.position * 100}%`;
              leftPosition = index % 2 === 0 ? "60%" : "5%";
              alignRight = index % 2 === 0;
            } else {
              const positions = [
                { top: "12%", left: "60%", alignRight: false },
                { top: "25%", left: "40%", alignRight: false },
                { top: "45%", left: "10%", alignRight: true },
                { top: "62%", left: "20%", alignRight: true },
                { top: "78%", left: "40%", alignRight: true },
                { top: "90%", left: "60%", alignRight: false },
              ];
              topPosition = positions[index].top;
              leftPosition = positions[index].left;
              alignRight = positions[index].alignRight;
            }

            return (
              <div
                key={milestone.year}
                ref={(el) => { milestonesRef.current[index] = el }}
                className={`new-timeline-milestone ${isMobile ? "new-timeline-milestone-mobile" : ""}`}
                style={{
                  top: topPosition,
                  left: leftPosition,
                  opacity: 0,
                  maxWidth: isMobile ? "280px" : isTablet ? "320px" : "350px",
                  textAlign: alignRight ? "right" : "left",
                }}
                data-testid={`milestone-${milestone.year}`}
              >
                <div className={`new-timeline-milestone-card ${alignRight ? "new-timeline-milestone-card-right" : ""}`}>
                  <h2 className="new-timeline-milestone-year" data-testid={`text-year-${milestone.year}`}>
                    {milestone.year}
                  </h2>
                  <h3 className="new-timeline-milestone-title" data-testid={`text-title-${milestone.year}`}>
                    {milestone.title}
                  </h3>
                  <p className="new-timeline-milestone-description" data-testid={`text-description-${milestone.year}`}>
                    {milestone.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
