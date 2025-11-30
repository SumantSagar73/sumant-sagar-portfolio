import React from 'react'
import { FaHeart, FaExternalLinkAlt, FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaHackerrank } from 'react-icons/fa'
import { SiLeetcode, SiCodingninjas, SiGeeksforgeeks, SiCodechef } from 'react-icons/si'
import { mainSocialLinks } from '../data/social'
import { contactInfo } from '../data/contact'
import logo from '../assets/logo.png'
import '../styles/components/Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const social = mainSocialLinks.filter(s => s.name !== 'LeetCode')

  return (
    <footer className="footer simple-footer">
      <div className="footer-inner container">
        <div className="footer-left">
          <img src={logo} alt="logo" className="footer-logo" />
          <div className="brand-text">
            <strong>Sumant Sagar</strong>
            <span className="brand-sub">Software Developer</span>
          </div>
        </div>

        {/* Single anchor to top - avoids linking to removed pages */}
        <div className="footer-center">
          <a href="#home" className="footer-link-inline">Back to top</a>
        </div>

        <div className="footer-right">
          <div className="footer-social">
            {social.map(s => {
              // map string icon name to component
              const iconMap = {
                FaGithub: FaGithub,
                FaLinkedin: FaLinkedin,
                SiLeetcode: SiLeetcode,
                SiCodingninjas: SiCodingninjas,
                SiGeeksforgeeks: SiGeeksforgeeks,
                SiCodechef: SiCodechef,
                FaHackerrank: FaHackerrank,
                FaTwitter: FaTwitter,
                FaGlobe: FaGlobe,
              }

              const IconComponent = iconMap[s.icon] || FaExternalLinkAlt

              return (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="social-icon-link" title={s.name}>
                  <IconComponent />
                </a>
              )
            })}
          </div>
          <a className="footer-email" href={`mailto:${contactInfo.primary.email}`}>{contactInfo.primary.email}</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {currentYear} Sumant Sagar. All rights reserved.</span>
          <span className="made-with">Made with <FaHeart className="heart-icon" /> React & Vite</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
