'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/StickyTabsSection.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// --- History Timeline Data (Updated with 'brief' for inactive cards) ---
const HISTORY_DATA = [
  { 
    year: '1968', 
    title: 'Datatel Inc. Is Established', 
    brief: 'Founded With Purpose', 
    description: 'Datatel Corporation introduces its first student information system, beginning a legacy of institutional support.', 
    image: '/images/testimonial-person.png' 
  },
  { 
    year: '1979', 
    title: 'Higher Ed Platforms Debut', 
    brief: 'Banner and Colleague Are Born',
    description: 'SCT (Systems & Computer Technology Corp.) introduces Banner, pioneering an ERP system that transformed administration for higher ed institutions. Datatel begins development of Colleague ERP.', 
    image: '/images/history-1979.jpg' 
  },
  { 
    year: '1996', 
    title: 'International Expansion', 
    brief: 'Global Growth Accelerates',
    description: 'Datatel and SCT expand their global footprint, delivering student information systems to institutions across North America, Europe, and beyond.', 
    image: '/images/history-1996.jpg' 
  },
  { 
    year: '2004', 
    title: 'Sungard Acquires SCT', 
    brief: 'Cloud Innovation Begins',
    description: 'Cloud innovation begins as Sungard Higher Education acquires SCT and cloud-based solutions are introduced, modernizing operations.', 
    image: '/images/history-2004.jpg' 
  },
  { 
    year: '2012', 
    title: 'Forming Ellucian', 
    brief: 'A Unified Company',
    description: 'Datatel and Sungard Higher Education merge to form Ellucian, a unified company dedicated to serving higher education worldwide.', 
    image: '/images/history-2012.jpg' 
  },
  { 
    year: '2015', 
    title: 'Mobile & Cloud First', 
    brief: 'Strategic Shift',
    description: 'A major strategic shift towards mobile and cloud-first solutions empowers campuses with flexible and accessible technology.', 
    image: '/images/history-2015.jpg' 
  },
  { 
    year: '2020', 
    title: 'AI Integration', 
    brief: 'Transforming Success',
    description: 'Introduced AI-driven tools and advanced data analytics, transforming student success and institutional efficiency.', 
    image: '/images/history-2020.jpg' 
  },
  { 
    year: '2021', 
    title: 'Global Partnerships', 
    brief: 'Extending Reach',
    description: 'Forged key global partnerships to deliver specialized solutions and further extend reach into emerging markets.', 
    image: '/images/history-2021.jpg' 
  },
];

const SECTIONS = [
  { id: 'overview', title: 'Overview' },
  { id: 'history', title: 'History' },
  { id: 'customers', title: 'Customers' },
  { id: 'find-us', title: 'Find us' },
  { id: 'awards', title: 'Awards' },
  { id: 'news', title: 'News' },
];

export default function OverviewScrollTabs() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null); 
  const [active, setActive] = useState<string>('overview');
  const [activeYearIndex, setActiveYearIndex] = useState(2); 

  /* Observe sections (UNCHANGED) */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.45 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  /* Move tab underline (UNCHANGED) */
  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;

    const activeBtn = nav.querySelector(`[data-id="${active}"]`) as HTMLButtonElement;
    if (!activeBtn) return;

    indicator.style.width = `${activeBtn.offsetWidth}px`;
    indicator.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
  }, [active]);

  /* Scroll to section (UNCHANGED) */
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
  };
  
  /* Update active year on Swiper slide change */
  const handleSlideChange = (swiper: any) => {
    setActiveYearIndex(swiper.activeIndex);
  };
  
  /* Handle year navigation click */
  const handleYearClick = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
    setActiveYearIndex(index);
  };


  return (
    <section className={styles.stickyTabsSection}>
      {/* Top sticky nav (UNCHANGED) */}
      <div className={styles.topNavWrap}>
        <div className={styles.topNavContainer}>
          <div ref={navRef} className={styles.stickyNav}>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                data-id={s.id}
                className={`${styles.tabBtn} ${active === s.id ? styles.active : ''}`}
                onClick={() => handleClick(s.id)}
              >
                {s.title}
              </button>
            ))}
            <div ref={indicatorRef} className={styles.navIndicator} />
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className={styles.sectionContentWrap}>
        
        {/* Overview Section (REMAINS UNCHANGED) */}
        <article id="overview" className={styles.contentBlock}>
          <div className={styles.overviewRow}>
            <div className={styles.leftColBlock}>
              <div className={styles.overviewTextContent}>
                <h2 className={styles.blockTitle}>Overview</h2>
                <p className={styles.blockLead}>
                  Driving Change, Delivering Results — from global reach to student-first
                  innovation, we empower institutions to work smarter, operate faster, and create meaningful outcomes for learners
                  everywhere – driving progress across every part of higher education.
                </p>
              </div>
              <div className={styles.mediaRow}>
                <div className={styles.mediaLeftCard}>
                  <div className={styles.mediaNumber}>2,800</div>
                  <div className={styles.mediaLabel}>Higher ed customers</div>
                </div>
                <div className={styles.mediaImage}>
                  <Image
                    src="/images/overview-section.webp" 
                    alt="Overview media"
                    fill
                    className={styles.mediaImg}
                  />
                </div>
              </div>
            </div> 
            <div className={styles.rightColStats}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard} style={{ backgroundColor: '#0f0236', color: '#fff' }}>
                  <div className={styles.statNumber}>4,000</div>
                  <div className={styles.statLabel} style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Employees</div>
                </div>
                <div className={styles.statCardAccent} style={{ backgroundColor: '#6b3cff', color: '#fff' }}>
                  <div className={styles.statNumber}>20M+</div>
                  <div className={styles.statLabel} style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Students served globally</div>
                </div>
                <div className={styles.statCard} style={{ backgroundColor: '#f1ebff', color: '#000' }}>
                  <div className={styles.statNumber} style={{ color: '#6b3cff' }}>$2.3M+</div>
                  <div className={styles.statLabel}>in PATH Scholarship funding for more than 2,600 students</div>
                </div>
                <div className={styles.statSmall} style={{ backgroundColor: '#e6ffec', color: '#000' }}>
                  <div className={styles.statNumber} style={{ color: '#00a35c' }}>79</div>
                  <div className={styles.statLabel}>Socius ERP selections in 2023</div>
                </div>
              </div>
            </div> 
          </div>
        </article>
        
        {/* CTA Cards Section (REMAINS UNCHANGED) */}
        <section className={styles.ctaCardsSection}>
          <div className={styles.ctaCardsHeader}>
            <div className={styles.ctaBuiltFor}>Built for</div>
            <h2 className={styles.ctaWhatMatters}>What Matters Most</h2>
          </div>
          <div className={styles.ctaCardsContainer}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaIcon}>🧭</div>
              <h3 className={styles.ctaCardTitle}>Singular Focus</h3>
              <p className={styles.ctaCardText}>
                Higher ed isn’t one thing we do — it’s all we do. Our deep expertise allows us to 
                meet the unique challenges of institutions and students alike.
              </p>
            </div>
            <div className={styles.ctaCard}>
              <div className={styles.ctaIcon}>💡</div>
              <h3 className={styles.ctaCardTitle}>Purposeful Innovation</h3>
              <p className={styles.ctaCardText}>
                We build technology that solves real problems and evolves with the needs of higher education.
              </p>
            </div>
            <div className={styles.ctaCard}>
              <div className={styles.ctaIcon}>🤝</div>
              <h3 className={styles.ctaCardTitle}>Commitment to Your Success</h3>
              <p className={styles.ctaCardText}>
                Not just another vendor, Ellucian is your technology partner. From implementation to outcomes, 
                we’re with you every step of the way.
              </p>
            </div>
          </div>
        </section>


        {/* ======================== HISTORY SECTION (Timeline Swiper) ======================== */}
        <article id="history" className={styles.contentBlock}>
          <div className={styles.historyTimelineWrapper}>
            <div className={styles.historyHeader}>
              <h2 className={styles.blockTitle}>Our Journey</h2>
              <p className={styles.blockLead}>
                Since 1968, Ellucian's history has been shaped by a commitment to innovation, partnership, and powering the future of higher education.
              </p>
            </div>
            
            {/* --- Year Navigation (Clickable) --- */}
            <div className={styles.timelineYearsNav}>
              {HISTORY_DATA.map((item, index) => (
                <div 
                  key={item.year} 
                  className={`${styles.timelineYearItem} ${index === activeYearIndex ? styles.activeYear : ''}`}
                  onClick={() => handleYearClick(index)} // Trigger slide change on click
                >
                  {item.year}
                </div>
              ))}
            </div>

            {/* --- Timeline Swiper (Content Cards) --- */}
            <Swiper
              ref={swiperRef} 
              modules={[Navigation, Mousewheel]}
              slidesPerView={'auto'} 
              centeredSlides={true} 
              initialSlide={2} 
              spaceBetween={0} 
              navigation={true} 
              mousewheel={true}
              onSlideChange={handleSlideChange}
              className={styles.historySwiper}
            >
              {HISTORY_DATA.map((item) => (
                <SwiperSlide key={item.year} className={styles.swiperSlideCustom}>
                  <div className={styles.timelineCardContent}>
                    
                    {/* Column 1: Text Content */}
                    <div className={styles.timelineTextContainer}>
                      
                      {/* Always visible: Title */}
                      <h3 className={styles.timelineCardTitle}>{item.title}</h3>
                      
                      {/* Always visible: Brief/Subtitle for inactive cards */}
                      <p className={styles.timelineCardBrief}>{item.brief}</p>
                      
                      {/* Visible ONLY on active slide: Full description block */}
                      <div className={styles.timelineFullDescription}>
                        <p className={styles.timelineCardDescription}>{item.description}</p>
                      </div>
                    </div>

                    {/* Column 2: Image */}
                    <div className={styles.timelineImageContainer}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={styles.timelineCardImage}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </article>


        {/* Remaining sections follow same pattern */}
        <article id="customers" className={styles.contentBlock}>
          <div className={styles.contentInnerStack}>
            <h2 className={styles.blockTitle}>Customers</h2>
            <p className={styles.blockLead}>We partner with thousands globally.</p>
            <div className={styles.customerGrid}>
              <div className={styles.customerCard}>Institution A</div>
              <div className={styles.customerCard}>Institution B</div>
              <div className={styles.customerCard}>Institution C</div>
            </div>
          </div>
        </article>

        <article id="find-us" className={styles.contentBlock}>
          <div className={styles.contentInnerStack}>
            <h2 className={styles.blockTitle}>Find us</h2>
            <p className={styles.blockLead}>Locate our offices worldwide.</p>
            <div className={styles.locationGrid}>
              <div className={styles.locCard}>India</div>
              <div className={styles.locCard}>USA</div>
              <div className={styles.locCard}>Europe</div>
            </div>
          </div>
        </article>

        <article id="awards" className={styles.contentBlock}>
          <div className={styles.contentInnerStack}>
            <h2 className={styles.blockTitle}>Awards</h2>
            <p className={styles.blockLead}>Recognized for excellence.</p>
            <div className={styles.awardList}>
              <div className={styles.awardItem}>Best EdTech 2023</div>
              <div className={styles.awardItem}>Innovation in AI 2022</div>
            </div>
          </div>
        </article>

        <article id="news" className={styles.contentBlock}>
          <div className={styles.contentInnerStack}>
            <h2 className={styles.blockTitle}>News</h2>
            <p className={styles.blockLead}>Latest announcements.</p>
            <div className={styles.newsList}>
              <div className={styles.newsItem}>New AI assistant launched</div>
              <div className={styles.newsItem}>Partnership with University X</div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}