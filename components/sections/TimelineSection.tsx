'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
}

interface Milestone {
  year: number
  title: string
  description: string
  position: { x: number; y: number }
  mobilePosition: { x: number; y: number }
  tooltipPosition: 'top' | 'left'
}

const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const milestonesRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState(false)

  const milestones: Milestone[] = [
    {
      year: 2000,
      title: 'The Beginning',
      description: 'Our journey started with a vision to simplify technology and connect people through digital innovation.',
      position: { x: 690, y: 0 },
      mobilePosition: { x: 120, y: 150 },
      tooltipPosition: 'left'
    },
    {
      year: 2005,
      title: 'Expanding Horizons',
      description: 'Introduced our first generation of software solutions, marking the beginning of our commitment to digital transformation.',
      position: { x: 450, y: 240 },
      mobilePosition: { x: 120, y: 350 },
      tooltipPosition: 'top'
    },
    {
      year: 2010,
      title: 'Embracing Mobility',
      description: 'Ventured into mobile and kiosk solutions, bringing technology closer to everyday users. When global markets struggled in 2008, VAPS stayed focused-adapting, evolving, and empowering its partners',
      position: { x: 890, y: 240 },
      mobilePosition: { x: 120, y: 550 },
      tooltipPosition: 'top'
    },
    {
      year: 2015,
      title: 'Smart Solutions Era',
      description: 'Launched smart card systems, GPS tracking, and IVR solutions - building intelligent networks for businesses.',
      position: { x: 890, y: 650 },
      mobilePosition: { x: 120, y: 750 },
      tooltipPosition: 'top'
    },
    {
      year: 2020,
      title: 'Artificial Intelligence Revolution',
      description: 'Adopted AI, machine learning, and automation across services - from Chat GPT integrations to biometric systems and digital signage. Even in the pandemic, VAPS stood strong by connecting schools, teachers, and students through technology',
      position: { x: 450, y: 650 },
      mobilePosition: { x: 120, y: 950 },
      tooltipPosition: 'top'
    },
    {
      year: 2025,
      title: 'The Future is Now',
      description: 'Celebrating 25 years of excellence with next-generation innovations: AI Document Scanning, 360 degree Virtual Tours, and smart digital ecosystems',
      position: { x: 40, y: 680 },
      mobilePosition: { x: 120, y: 1150 },
      tooltipPosition: 'left'
    },
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const elements = headerRef.current.querySelectorAll('.section-label, .section-title, .section-description')
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Path drawing animation with dashed style
      if (svgRef.current) {
        const animatedPaths = svgRef.current.querySelectorAll('.animated-path')

        animatedPaths.forEach((path) => {
          const pathElement = path as SVGPathElement
          const pathLength = pathElement.getTotalLength()

          // For mobile, paths already have strokeDasharray="15 15"
          // For desktop, set dashed pattern: 10px dash, 5px gap
          if (!isMobile) {
            gsap.set(pathElement, {
              strokeDasharray: '10 5',
            })
          }

          // Animate the path drawing
          gsap.fromTo(
            pathElement,
            {
              strokeDashoffset: pathLength,
            },
            {
              strokeDashoffset: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: svgRef.current,
                start: 'top 60%',
                end: 'bottom 20%',
                scrub: 1.5,
              },
            }
          )
        })
      }

      // Circle moving along path
      if (circleRef.current && pathRef.current) {
        gsap.to(circleRef.current, {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
          },
          ease: 'none',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 60%',
            end: 'bottom 20%',
            scrub: 1.5,
          },
        })
      }

      // Milestone cards - synchronized with circle position
      if (milestonesRef.current) {
        const milestoneItems = milestonesRef.current.querySelectorAll('.milestone-item')

        milestoneItems.forEach((item, index) => {
          // Get all text elements for staggered animation
          const yearBadge = item.querySelector('.year-badge')
          const title = item.querySelector('.milestone-title')
          const description = item.querySelector('.milestone-description')
          const milestoneContent = item.querySelector('.milestone-content')
          const allElements = [yearBadge, title, description, milestoneContent].filter(Boolean)

          // Set initial state for all elements
          gsap.set(allElements, {
            opacity: 0,
            y: 30
          })

          // Create timeline for synchronized reveal
          gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top center',
              toggleActions: 'play reverse play reverse'
            }
          }).to(allElements, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power1.out'
          })
        })
      }
    })

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section ref={sectionRef} className="timeline-section py-5 py-md-8" id="timeline">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3 col-md-12">
            <div ref={headerRef} className="section-header">
              <span className="section-label">Milestones</span>
              <h2 className="section-title">
                25 Years of Leadership. Legacy. Learning.
              </h2>
              <p className="section-description">
                Every milestone represents a partnership, a story, and a step forward in redefining the future of education through technology
              </p>
            </div>
          </div>

          <div className="col-lg-9 col-md-12">
            <div className="timeline-path-container position-relative">
              <div className="svg-wrapper">
                {!isMobile ? (
                  // Desktop SVG
                  <svg
                    ref={svgRef}
                    width="1326"
                    height="788"
                    viewBox="0 0 1326 788"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="timeline-svg-animated timeline-svg-desktop"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path d="M667.841 36V167C678.841 211 710.341 204.336 735.841 204.336C777.273 204.336 1097.98 199.836 1253.31 204.336C1285.34 204.336 1314.65 230.7 1321.85 259.5C1329.05 288.3 1322.85 472.833 1321.85 566.5C1321.85 589 1301.34 635.5 1241.34 635.5C1186.12 635.5 436.174 636.167 64.3406 635.5C41.3406 635.459 21.8405 625 21.8405 674.5C21.8405 701.541 20.3405 761 21.8405 787.5" stroke="black"/>
                    <path d="M646.952 40V174.5C657.948 214.431 689.437 221.768 714.929 221.768C756.347 221.768 1076.95 217.684 1232.23 221.768C1275.67 222.911 1291.15 237 1300.74 271.83C1307.94 297.967 1301.74 465.434 1300.74 550.438C1300.74 586 1280.24 613.057 1220.26 613.057C1165.06 613.057 415.362 613.662 43.6524 613.057C20.66 613.02 1.16621 623.864 1.16649 648.45C1.16653 652 -0.333013 758.451 1.16649 782.5" stroke="black"/>
                    <path
                      ref={pathRef}
                      className="animated-path"
                      d="M656.943 24V164.553C667.922 206.281 699.364 213.949 724.817 213.949C766.173 213.949 1086.29 209.681 1241.34 213.949C1284.72 215.143 1300.17 229.866 1309.75 266.264C1316.93 293.577 1310.74 468.582 1309.75 557.412C1309.75 594.574 1289.28 622.849 1229.39 622.849C1174.27 622.849 425.702 623.481 54.5534 622.849C31.5957 622.81 15.7249 634.419 12.1315 659.835C8.53817 685.251 10.6343 741.868 12.1315 767"
                      stroke="#9810FA"
                      strokeWidth="3"
                    />
                    <circle ref={circleRef} cx="660.674" cy="31.5" r="31.5" fill="#9810FA"/>
                  </svg>
                ) : (
                  // Mobile SVG
                  <svg
                    ref={svgRef}
                    width="524"
                    height="1337"
                    viewBox="0 0 524 1337"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="timeline-svg-animated timeline-svg-mobile"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path d="M39.1602 165.436C41.8946 176.342 46.1373 184.225 51.3379 189.923C56.5463 195.63 62.7373 199.17 69.3916 201.355C82.7374 205.738 97.8795 204.661 110.687 204.661C152.093 204.661 272.174 200.161 427.515 204.661H427.514C443.643 204.665 460.065 210.716 473.357 220.376C486.652 230.037 496.857 243.339 500.492 257.879C502.307 265.139 503.27 277.593 503.686 293.605C504.101 309.633 503.97 329.274 503.582 350.934C502.807 394.267 501.007 445.67 500.507 492.506C500.505 503.88 495.332 521.243 482.63 535.767C469.908 550.312 449.644 562 419.5 562C364.281 562 280.172 562.667 100.998 562C95.25 561.979 89.6307 561.309 84.6348 561.097C79.5858 560.882 75.0942 561.126 71.334 562.859C67.6027 564.58 64.5271 567.8 62.376 573.684C60.218 579.586 59 588.149 59 600.5C59 614.022 58.875 642.398 58.75 667.393C58.6875 679.89 58.625 691.543 58.5781 700.071C58.5547 704.335 58.5352 707.818 58.5215 710.235C58.5146 711.444 58.5085 712.386 58.5049 713.025C58.5031 713.345 58.5019 713.59 58.501 713.754C58.5005 713.836 58.5002 713.899 58.5 713.94V714.002C58.4984 714.002 58.4854 714.001 58.3838 714.001V811.936C61.1193 822.849 65.1141 830.587 69.9385 836.065C74.7679 841.55 80.4507 844.797 86.5938 846.69C92.7449 848.587 99.3612 849.127 106.053 849.189C109.397 849.221 112.754 849.133 116.077 849.037C119.398 848.941 122.687 848.836 125.884 848.836C167.291 848.836 295.371 844.336 450.712 848.836H450.711C482.988 848.843 512.468 875.387 519.716 904.379C521.53 911.637 522.494 923.213 522.909 937.917C523.325 952.633 523.193 970.524 522.806 990.435C522.03 1030.27 520.23 1078.17 519.73 1125C519.728 1147.81 498.969 1184.5 438.724 1184.5C411.118 1184.5 376.064 1185.54 325.496 1186.5C274.933 1187.46 208.875 1188.33 119.284 1188C107.785 1187.96 97.3055 1188.97 89.6963 1194.25C82.1318 1199.51 77.2861 1209.09 77.2861 1226.5C77.2861 1253.56 76.7237 1309.49 78.2227 1335.97L77.2246 1336.03C75.7235 1309.51 76.2861 1253.52 76.2861 1226.5C76.2861 1208.91 81.1905 1198.95 89.126 1193.43C97.0168 1187.95 107.788 1186.96 119.288 1187C208.87 1187.33 274.92 1186.46 325.477 1185.5C376.028 1184.54 411.106 1183.5 438.724 1183.5C498.474 1183.5 518.73 1147.2 518.73 1125V1125C519.23 1078.16 521.031 1030.22 521.806 990.415C522.193 970.509 522.324 952.637 521.909 937.945C521.494 923.241 520.532 911.763 518.746 904.621C511.595 876.017 482.468 849.836 450.697 849.836H450.683C295.357 845.336 167.341 849.836 125.884 849.836C122.705 849.836 119.432 849.94 116.106 850.036C112.783 850.132 109.409 850.221 106.043 850.189C99.3128 850.127 92.585 849.583 86.2988 847.646C80.0045 845.705 74.1559 842.368 69.1885 836.727C64.2245 831.089 60.1625 823.177 57.3984 812.121L57.3838 812.062V681H57.6787C57.7014 676.663 57.7265 672.085 57.75 667.388C57.875 642.393 58 614.019 58 600.5C58 588.102 59.2196 579.404 61.4365 573.34C63.6603 567.257 66.8967 563.804 70.915 561.951C74.9047 560.112 79.602 559.882 84.6777 560.098C89.8065 560.315 95.2504 560.979 101.002 561C280.174 561.667 364.273 561 419.5 561C449.355 561 469.345 549.438 481.877 535.108C494.426 520.76 499.507 503.626 499.507 492.5V492.495C500.007 445.664 501.807 394.215 502.582 350.916C502.97 329.26 503.101 309.637 502.686 293.632C502.27 277.611 501.307 265.261 499.522 258.121C495.957 243.861 485.922 230.743 472.77 221.185C459.619 211.628 443.393 205.661 427.5 205.661H427.493L427.485 205.66C272.16 201.16 152.145 205.661 110.687 205.661C97.9938 205.661 82.6221 206.753 69.0801 202.306C62.2906 200.076 55.9428 196.451 50.5996 190.597C45.2576 184.743 40.9408 176.685 38.1748 165.621L38.1602 165.562V34.5H39.1602V165.436ZM18.2764 187.1C23.7452 206.902 34.2737 218.588 46.5703 225.339C58.899 232.107 73.048 233.938 85.7539 233.938C127.15 233.938 253.694 229.854 408.982 233.938C430.744 234.51 445.601 238.325 456.223 246.438C466.849 254.555 473.156 266.911 477.963 284.367C479.779 290.963 480.742 300.965 481.157 313.546C481.573 326.138 481.442 341.356 481.055 358.403C480.28 392.512 478.48 433.939 477.98 476.441C477.979 494.316 472.823 510.124 460.064 521.454C447.315 532.776 427.055 539.555 397 539.555C341.803 539.555 446.206 540.16 74.499 539.555C63.0727 539.536 52.5681 542.222 44.9336 547.917C37.3189 553.597 32.5136 562.303 32.5137 574.445V708.493C32.5137 708.493 32.5137 708.493 32.5 708.493V819.43C43.4385 859.045 74.6679 872 99.9775 872C141.373 872 267.918 867.916 423.206 872C444.933 872.571 459.786 874.944 470.409 881.608C481.062 888.292 487.377 899.232 492.187 916.697C495.809 929.852 496.053 951.224 495.278 979.854C494.503 1008.52 492.704 1044.51 492.204 1087.01C492.203 1104.88 487.047 1120.69 474.288 1132.02C461.539 1143.34 441.279 1150.12 411.224 1150.12C397.423 1150.12 394.228 1150.28 391.386 1150.53C388.513 1150.77 385.985 1151.1 373.564 1151.43C348.74 1152.08 284.353 1152.74 98.5 1152.74C75.913 1152.74 63.0033 1162 55.7197 1172.7C48.4146 1183.43 46.7373 1195.65 46.7373 1201.56C46.7373 1205.14 45.2381 1295 46.7363 1319.03L45.7383 1319.09C44.2375 1295.02 45.7373 1205.08 45.7373 1201.56C45.7373 1195.52 47.4416 1183.08 54.8926 1172.14C62.3651 1161.16 75.587 1151.74 98.5 1151.74C284.357 1151.74 348.729 1151.08 373.538 1150.43C385.933 1150.1 388.441 1149.78 391.3 1149.53C394.189 1149.28 397.423 1149.12 411.224 1149.12C441.148 1149.12 461.128 1142.37 473.624 1131.27C486.109 1120.18 491.204 1104.68 491.204 1087V1086.99C491.704 1044.49 493.504 1008.46 494.278 979.826C495.054 951.156 494.797 929.945 491.222 916.963C486.44 899.598 480.221 888.945 469.878 882.456C459.504 875.948 444.897 873.571 423.181 873C267.906 868.916 141.419 873 99.9775 873C74.3176 873 42.5874 859.831 31.5176 819.633L31.5 819.567V685H31.5137V574.445C31.5136 562.002 36.456 552.993 44.3359 547.115C52.1963 541.252 62.9351 538.536 74.501 538.555C446.213 539.16 341.788 538.555 397 538.555C426.924 538.555 446.904 531.804 459.4 520.707C471.886 509.62 476.98 494.12 476.98 476.436V476.43C477.48 433.928 479.28 392.454 480.055 358.381C480.442 341.338 480.573 326.143 480.158 313.579C479.743 301.004 478.78 291.105 476.998 284.633C472.213 267.258 465.986 255.154 455.616 247.233C445.242 239.309 430.638 235.508 408.957 234.938C253.682 230.854 127.196 234.938 85.7539 234.938C72.9684 234.938 58.627 233.099 46.0889 226.216C33.5319 219.322 22.8264 207.392 17.2939 187.302L17.2764 187.237V36H18.2764V187.1Z" fill="black"/>
                    {/* Combined path for circle animation (invisible) */}
                    <path
                      ref={pathRef}
                      d="M27.7637 32.2357V172.789C38.7434 214.517 70.1854 222.185 95.6384 222.185C136.994 222.185 262.904 217.917 417.952 222.185C461.33 223.379 476.782 238.102 486.359 274.5C493.546 301.813 487.357 394.588 486.359 483.418C486.359 520.58 465.889 548.855 405.999 548.855C350.878 548.855 266.863 548.855 89.9211 548.855C42.9993 548.855 47.4993 565.006 47.4993 585.841C47.4993 611.51 42.9993 669.506 42.9993 669.506V809.553C52.9671 851.281 84.409 858.949 109.862 858.949C151.218 858.949 277.128 854.681 432.175 858.949C475.553 860.143 491.006 874.866 500.583 911.264C507.77 938.577 501.581 1014.23 500.583 1103.06C499.848 1168.5 420.224 1168.5 420.224 1168.5H104.145C104.145 1168.5 65.317 1180.07 61.7236 1205.49C58.1303 1230.9 60.2264 1287.52 61.7236 1312.65"
                      stroke="transparent"
                      strokeWidth="1"
                      fill="none"
                    />
                    {/* Visible animated paths */}
                    <path
                      className="animated-path"
                      d="M27.7637 32.2357V172.789C38.7434 214.517 70.1854 222.185 95.6384 222.185C136.994 222.185 262.904 217.917 417.952 222.185C461.33 223.379 476.782 238.102 486.359 274.5C493.546 301.813 487.357 394.588 486.359 483.418C486.359 520.58 465.889 548.855 405.999 548.855C350.878 548.855 266.863 548.855 89.9211 548.855C42.9993 548.855 47.4993 565.006 47.4993 585.841C47.4993 611.51 42.9993 669.506 42.9993 669.506"
                      stroke="#9810FA"
                      strokeWidth="3"
                    />
                    <path
                      className="animated-path"
                      d="M41.9873 669V809.553C52.9671 851.281 84.409 858.949 109.862 858.949C151.218 858.949 277.128 854.681 432.175 858.949C475.553 860.143 491.006 874.866 500.583 911.264C507.77 938.577 501.581 1014.23 500.583 1103.06C499.848 1168.5 420.224 1168.5 420.224 1168.5H104.145C104.145 1168.5 65.317 1180.07 61.7236 1205.49C58.1303 1230.9 60.2264 1287.52 61.7236 1312.65"
                      stroke="#9810FA"
                      strokeWidth="3"
                    />
                    <circle ref={circleRef} cx="31.5" cy="31.5" r="31.5" fill="#9810FA"/>
                  </svg>
                )}

                <div ref={milestonesRef} className="year-boxes-container">
                  {milestones.map((milestone, index) => {
                    const pos = isMobile ? milestone.mobilePosition : milestone.position
                    const viewBox = isMobile ? { width: 524, height: 1337 } : { width: 1326, height: 788 }

                    return (
                      <div
                        key={milestone.year}
                        className="milestone-item"
                        style={{
                          position: 'absolute',
                          left: `${(pos.x / viewBox.width) * 100}%`,
                          top: `${(pos.y / viewBox.height) * 100}%`,
                          zIndex: 10,
                          maxWidth: "220px",
                        }}
                      >
                        <div className={`milestone-content tooltip-${milestone.tooltipPosition}`}>
                          <div className="year-badge">
                            {milestone.year}
                          </div>

                          <div className="milestone-content-tail">
                            <h3 className="milestone-title text-center">
                              {milestone.title}
                            </h3>

                            <p className="milestone-description text-center">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TimelineSection

