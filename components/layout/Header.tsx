'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  interface NavLink {
    href?: string;
    label: string;
    side: 'left' | 'right';
    children?: { href: string; label: string }[];
  }

  const navLinks: NavLink[] = [
    {
      label: 'Products',
      side: 'left',
      children: [
        { href: '/vaps-digital-campus', label: 'VAPS Digital Campus' },
        { href: '/advanced-e-learning', label: 'Advanced E-Learning' },
        { href: '/science-park', label: 'Science Park' },
      ]
    },
    { href: '/about-us', label: 'About Us', side: 'left' },
    {
      label: 'Resources',
      side: 'left',
      children: [
        { href: '/blog', label: 'VAPS Blog' },
        { href: '/company-updates', label: 'Company Updates' },
        { href: '/announcements', label: 'Announcements' },
        { href: '/csr-activities', label: 'CSR Activities' },
        { href: '/downloads', label: 'Downloads' },
      ]
    },
    { href: '/contact-us', label: 'Contact Sales', side: 'right' },
    { href: '#careers', label: 'Careers', side: 'right' },
    { href: '#tour', label: '360 Tour', side: 'right' },
  ]

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
      <nav className="navbar">
        {/* Left Navigation */}
        <div className="nav-left">
          {navLinks
            .filter(link => link.side === 'left')
            .map((link) => (
              link.children ? (
                <div key={link.label} className="nav-item dropdown-container">
                  <span className="nav-link dropdown-trigger">{link.label} ▾</span>
                  <div className="dropdown-menu">
                    <div className="dropdown-header">{link.label}</div>
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href} className="dropdown-item">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.href!} href={link.href!} className="nav-link">
                  {link.label}
                </Link>
              )
            ))}
        </div>

        {/* Logo */}
        <Link href="/" className="nav-logo">
          <Image
            src="/images/logo.png"
            alt="VAPS Group Logo"
            width={150}
            height={50}
            style={{ maxWidth: '100%', height: 'auto' }}
            priority
          />
        </Link>

        {/* Right Navigation */}
        <div className="nav-right">
          {navLinks
            .filter(link => link.side === 'right')
            .map((link) => (
              <Link key={link.href!} href={link.href!} className="nav-link">
                {link.label}
              </Link>
            ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          link.children ? (
            <div key={link.label} className="mobile-nav-group">
              <div className="mobile-nav-header">{link.label}</div>
              <div className="mobile-nav-children">
                {link.children.map(child => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mobile-nav-child-link"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={link.href!}
              href={link.href!}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          )
        ))}
      </div>
    </header>
  )
}

export default Header
