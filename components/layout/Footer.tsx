'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Raleway } from 'next/font/google'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'
import { FaXTwitter, FaFacebookF, FaYoutube, FaLinkedinIn, FaInstagram, FaPinterest } from 'react-icons/fa6'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  const socialLinks = [
    { icon: FaXTwitter, href: '#', label: 'X', color: '#1DA1F2' },
    { icon: FaFacebookF, href: '#', label: 'Facebook', color: '#1877f2' },
    { icon: FaYoutube, href: '#', label: 'YouTube', color: '#FF0000' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn', color: '#0A66C2' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: '#E1306C' },
    { icon: FaPinterest, href: '#', label: 'Pinterest', color: '#E60023' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="row footer-content">
          {/* Footer Left */}
          <div className="col-lg-5">
            <div className="footer-left">
              <div className="footer-logo">VAPS</div>
              <p className="footer-description">
                We are always open and we welcome and questions you have for our team. If you wish to get in touch, please fill out the form below. Someone from our team will get back to you shortly.
              </p>
              <p className='email-input-label' style={{ fontFamily: "Raleway, san-serif", fontSize: "0.875rem", fontStyle: "Bold", fontWeight: "700", marginBottom: "0.5rem", letterSpacing: "10%" }}>EMAIL ADDRESS</p>
              {/* Newsletter */}
              <form onSubmit={handleSubmit} className="newsletter">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="email-input"
                  required
                />
                <button type="submit" className="cta-button">
                  SIGN UP
                </button>
              </form>
            </div>
          </div>

          {/* Footer Right */}
          <div className="col-lg-4">
            <div className="footer-right">
              {/* Contact Info */}
              <div className="contact-info">
                <h6 className="contact-title">Contact</h6>
                <div className="contact-item">
                  <HiOutlineMail className="contact-icon" />
                  <span>mktgcoord@vapstech.com</span>
                </div>
                <div className="contact-item">
                  <HiOutlinePhone className="contact-icon" />
                  <span>01206901888</span>
                </div>
                <div className="contact-item">
                  <HiOutlineLocationMarker className="contact-icon" />
                  <span>123 Education Street, Tech City, India</span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="social-icons">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="social-icon"
                      aria-label={social.label}
                      target="_blank"
                    >
                      <IconComponent />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="row">
          <div className="col-12">
            <div className="footer-bottom">
              <p>All RIGHTS RESERVED.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
