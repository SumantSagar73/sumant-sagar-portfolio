import React from 'react'
import { motion } from 'framer-motion'
import {
  FaDownload, FaEye, FaGithub, FaLinkedin,
  FaEnvelope, FaMapMarkerAlt, FaGraduationCap, FaMedal
} from 'react-icons/fa'
import { SiLeetcode, SiGeeksforgeeks, SiCodingninjas } from 'react-icons/si'
import { personalInfo } from '../data/personal'
import { heroTitles } from '../data/titles'
import { getFeaturedProjects } from '../data/projects'
import { resumeData } from '../data/resume'
import TypewriterTitles from './TypewriterTitles'
import SkillOrbsFallback from './SkillOrbsFallback'
import '../styles/components/BentoDashboard.css'

const SOCIAL = [
  { icon: FaGithub,        url: `https://${resumeData.personalInfo.github}`,          label: 'GitHub' },
  { icon: FaLinkedin,      url: `https://${resumeData.personalInfo.linkedin}`,         label: 'LinkedIn' },
  { icon: SiLeetcode,      url: 'https://leetcode.com/u/6073sumant/',                  label: 'LeetCode' },
  { icon: SiGeeksforgeeks, url: 'https://www.geeksforgeeks.org/user/6073sumant/',      label: 'GFG' },
  { icon: SiCodingninjas,  url: 'https://www.naukri.com/code360/profile/sumant6073',  label: 'CN' },
]

const REAL_CERTS = [
  { id: 1, title: 'DSA Course',           issuer: 'Striver',         year: '2024', icon: '⚡', color: '#f59e0b' },
  { id: 2, title: 'Computer Networking',  issuer: 'Coursera / Google', year: '2024', icon: '🌐', color: '#06b6d4' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: 'easeOut' }
  })
}

const BentoDashboard = () => {
  const featured = getFeaturedProjects()

  return (
    <div className="bento-page">
      <div className="bento-grid">

        {/* ── SIDEBAR / HERO ───────────────────────────── */}
        <motion.div className="bento-tile tile-hero"
          variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <div className="hero-inner">

            <div className="hero-image-wrap">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="hero-profile-img"
                onError={e => { e.target.style.display = 'none' }}
              />
            </div>

            <div className="hero-text-block">
              <p className="hero-greeting">Hey there 👋</p>
              <h1 className="hero-name-big">{personalInfo.name}</h1>
              <h2 className="hero-role">
                I'm a{' '}
                <TypewriterTitles
                  titles={heroTitles}
                  typingSpeed={90}
                  deletingSpeed={50}
                  pause={1500}
                  className="hero-typewriter"
                />
              </h2>
              <p className="hero-bio">
                BTech CSE @ VIT Bhopal · Full-stack dev building apps with React,
                Node.js &amp; cloud infra. Passionate about clean code and cybersecurity.
              </p>

              <div className="hero-btns">
                <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer"
                  className="bento-btn primary">
                  <FaDownload /> Download CV
                </a>
                <a href="#projects" className="bento-btn secondary"
                  onClick={e => {
                    e.preventDefault()
                    document.querySelector('.tile-projects')?.scrollIntoView({ behavior: 'smooth' })
                  }}>
                  <FaEye /> Projects
                </a>
              </div>

              <div className="hero-socials">
                {SOCIAL.map(({ icon: Icon, url, label }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                    className="hero-social-icon" title={label}>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="sidebar-facts">
              <div className="facts-label">Quick Facts</div>
              <div className="facts-row">
                <span className="fact-chip"><FaGraduationCap /> BTech CSE · VIT Bhopal</span>
                <span className="fact-chip">GPA 8.51 / 10</span>
                <span className="fact-chip"><FaMedal /> NCC Cadet</span>
                <span className="fact-chip">Graduating May 2026</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── SKILLS ───────────────────────────────────── */}
        <motion.div className="bento-tile tile-skills"
          variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          <div className="tile-label">Technical Skills</div>
          <div className="skills-orbs-wrap">
            <SkillOrbsFallback />
          </div>
        </motion.div>

        {/* ── PROJECTS ─────────────────────────────────── */}
        <motion.div className="bento-tile tile-projects"
          variants={fadeUp} initial="hidden" animate="visible" custom={2}>
          <div className="tile-label">Featured Projects</div>
          <div className="projects-scroll">
            {featured.map(project => (
              <div key={project.id} className="project-card-bento">
                {project.image && (
                  <div className="project-card-img"
                    style={{ backgroundImage: `url(${project.image})` }} />
                )}
                <div className="project-card-body">
                  <div className="project-card-header">
                    <h3 className="project-card-title">{project.title}</h3>
                    <span className={`project-status ${project.status === 'In Progress' ? 'wip' : ''}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="project-card-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.techStack.slice(0, 4).map(tech => (
                      <span key={tech} className="project-tag">{tech}</span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="project-tag muted">+{project.techStack.length - 4}</span>
                    )}
                  </div>
                  <div className="project-links">
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="project-link">Live ↗</a>
                    )}
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="project-link ghost"><FaGithub /> Code</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CERTS ────────────────────────────────────── */}
        <motion.div className="bento-tile tile-certs"
          variants={fadeUp} initial="hidden" animate="visible" custom={3}>
          <div className="tile-label">Certifications</div>
          <div className="certs-inner">
            {REAL_CERTS.map(cert => (
              <div key={cert.id} className="cert-card">
                <div className="cert-icon" style={{ background: cert.color + '22', color: cert.color }}>
                  {cert.icon}
                </div>
                <div className="cert-info">
                  <p className="cert-title">{cert.title}</p>
                  <p className="cert-issuer">{cert.issuer} · {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CONTACT ──────────────────────────────────── */}
        <motion.div className="bento-tile tile-contact"
          variants={fadeUp} initial="hidden" animate="visible" custom={4}>
          <div className="tile-label">Contact</div>
          <div className="contact-inner">
            <a href={`mailto:${resumeData.personalInfo.email}`} className="contact-chip">
              <FaEnvelope /> {resumeData.personalInfo.email}
            </a>
            <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank"
              rel="noopener noreferrer" className="contact-chip">
              <FaLinkedin /> LinkedIn
            </a>
            <a href={`https://${resumeData.personalInfo.github}`} target="_blank"
              rel="noopener noreferrer" className="contact-chip">
              <FaGithub /> GitHub
            </a>
            <span className="contact-chip no-link">
              <FaMapMarkerAlt /> India
            </span>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default BentoDashboard
