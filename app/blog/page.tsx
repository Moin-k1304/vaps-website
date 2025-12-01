'use client'

import PageHero from '@/components/sections/PageHero';
import ScrollWidthAnimation from '@/components/animations/ScrollWidthAnimation';
import { ScrollAnimationWrapper } from '@/components/animations/ScrollAnimationWrapper';
import Link from 'next/link';

const blogPosts = [
    {
        id: 1,
        title: "The Future of AI in Education",
        excerpt: "How artificial intelligence is reshaping the way we learn and teach in the 21st century.",
        date: "Nov 25, 2025",
        category: "Technology",
        image: "🤖"
    },
    {
        id: 2,
        title: "Implementing Digital Campus Solutions",
        excerpt: "A step-by-step guide to transforming your institution into a smart digital campus.",
        date: "Nov 20, 2025",
        category: "Guide",
        image: "🏫"
    },
    {
        id: 3,
        title: "Benefits of Outcome-Based Education",
        excerpt: "Understanding the impact of OBE on student performance and institutional accreditation.",
        date: "Nov 15, 2025",
        category: "Education",
        image: "📊"
    },
    {
        id: 4,
        title: "Cybersecurity in Schools",
        excerpt: "Why protecting student data is more important than ever and how to do it effectively.",
        date: "Nov 10, 2025",
        category: "Security",
        image: "🔒"
    }
];

const BlogPage = () => {
    return (
        <div className="blog-page">
            <div style={{ height: '80px' }} />

            <ScrollWidthAnimation startWidth="100%" endWidth="95%" borderRadius="0">
                <PageHero
                    title="VAPS Insights"
                    subtitle="BLOG & NEWS"
                    description="Latest updates, trends, and insights from the world of educational technology."
                    backgroundImage="/images/svgs/bg-lines.svg"
                />
            </ScrollWidthAnimation>

            <section className="section-space" style={{ padding: '100px 0', background: '#f9f9f9' }}>
                <div className="container">
                    <div className="row g-4">
                        {blogPosts.map((post, idx) => (
                            <div key={post.id} className="col-md-6 col-lg-4">
                                <ScrollAnimationWrapper animation="fadeUp" delay={idx * 0.1}>
                                    <div className="blog-card" style={{
                                        background: 'white',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <div style={{
                                            height: '200px',
                                            background: 'linear-gradient(45deg, #9810fa, #3b82f6)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '4rem'
                                        }}>
                                            {post.image}
                                        </div>
                                        <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.9rem', color: '#888' }}>
                                                <span style={{ color: '#9810fa', fontWeight: 600 }}>{post.category}</span>
                                                <span>{post.date}</span>
                                            </div>
                                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '15px' }}>{post.title}</h3>
                                            <p style={{ color: '#666', marginBottom: '20px', flex: 1 }}>{post.excerpt}</p>
                                            <Link href={`/blog/${post.id}`} style={{
                                                color: '#9810fa',
                                                fontWeight: 600,
                                                textDecoration: 'none',
                                                display: 'inline-flex',
                                                alignItems: 'center'
                                            }}>
                                                Read More →
                                            </Link>
                                        </div>
                                    </div>
                                </ScrollAnimationWrapper>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BlogPage
