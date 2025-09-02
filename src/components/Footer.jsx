import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa'
import { mainSocialLinks } from '../data/social'
import { contactInfo } from '../data/contact'
import logo from '../assets/logo.png'
import '../styles/components/Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  // Filter out LeetCode to avoid duplicate mail icons in footer
  const footerSocialLinks = mainSocialLinks.filter(social => 
    social.name !== 'LeetCode'
  )

  const socialLinksWithIcons = footerSocialLinks.map(link => ({
    ...link,
    icon: link.name === 'GitHub' ? FaGithub :
          link.name === 'LinkedIn' ? FaLinkedin :
          link.name === 'Twitter' ? FaTwitter :
          FaEnvelope
  }))

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <motion.div
              className="footer-brand"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="footer-logo-section">
                <img src={logo} alt="Sumant Sagar" className="footer-logo" />
                <h3 className="footer-brand-text">Sumant Sagar</h3>
              </div>
              <p className="footer-description">
                Building digital experiences with passion and precision. 
                Let's create something amazing together.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="footer-section-title">Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.path} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="footer-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="footer-section-title">Connect</h4>
              <div className="social-links">
                {socialLinksWithIcons.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ 
                      scale: 1.1,
                      color: social.color
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Visit my ${social.name} profile`}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="footer-section-title">Get in Touch</h4>
              <div className="contact-info">
                <a 
                  href={`mailto:${contactInfo.primary.email}`} 
                  className="contact-link"
                >
                  {contactInfo.primary.email}
                </a>
                <p className="contact-text">
                  {contactInfo.availability.status}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Portfolio. All rights reserved.
            </p>
            <p className="made-with">
              Made with <FaHeart className="heart-icon" /> using React & Vite
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="footer-pattern" aria-hidden="true">
        <div className="pattern-dot"></div>
        <div className="pattern-dot"></div>
        <div className="pattern-dot"></div>
        <div className="pattern-dot"></div>
      </div>
    </footer>
  )
}

export default Footer
