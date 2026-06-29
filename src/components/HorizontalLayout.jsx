import React, { useState, useEffect } from 'react'
import {
  FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt,
  FaGraduationCap, FaMedal, FaExternalLinkAlt, FaPhone
} from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { personalInfo } from '../data/personal'
import { heroTitles } from '../data/titles'
import { getAllProjects } from '../data/projects'
import { resumeData } from '../data/resume'
import TypewriterTitles from './TypewriterTitles'
import { useCertificates } from '../context/CertificateContext'
import '../styles/components/HorizontalLayout.css'

/* ── Themes ─────────────────────────────────────────── */
const THEMES = [
  { id: 'dark',  label: 'Dark',    dot: '#222' },
  { id: 'light', label: 'Light',   dot: '#f5f5f7' },
  { id: 'navy',  label: 'Navy',    dot: '#0d1b2a' },
  { id: 'warm',  label: 'Warm',    dot: '#18100a' },
]

/* ── Skills ──────────────────────────────────────────── */
const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    skills: [
      { name: 'JavaScript', color: '#f7df1e' },
      { name: 'TypeScript', color: '#3178c6' },
      { name: 'Python',     color: '#3572a5' },
      { name: 'C++',        color: '#f34b7d' },
    ]
  },
  {
    label: 'Frontend',
    skills: [
      { name: 'React',    color: '#61dafb' },
      { name: 'Next.js',  color: '#aaa' },
      { name: 'Tailwind', color: '#38bdf8' },
      { name: 'Redux',    color: '#764abc' },
      { name: 'HTML5',    color: '#e34f26' },
      { name: 'CSS3',     color: '#1572b6' },
    ]
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js',   color: '#68a063' },
      { name: 'Express',   color: '#999' },
      { name: 'Socket.io', color: '#888' },
      { name: 'GraphQL',   color: '#e10098' },
      { name: 'Redis',     color: '#dc382d' },
    ]
  },
  {
    label: 'Database',
    skills: [
      { name: 'MongoDB',    color: '#4db33d' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'MySQL',      color: '#4479a1' },
      { name: 'Supabase',   color: '#3ecf8e' },
    ]
  },
  {
    label: 'DevOps & Tools',
    skills: [
      { name: 'AWS',            color: '#ff9900' },
      { name: 'Docker',         color: '#2496ed' },
      { name: 'Git',            color: '#f05032' },
      { name: 'GitHub Actions', color: '#2088ff' },
      { name: 'Figma',          color: '#f24e1e' },
      { name: 'Linux',          color: '#fcc624' },
      { name: 'Vite',           color: '#bd34fe' },
    ]
  },
]

const NAV_ITEMS = [
  { label: 'Skills',      id: 'sp-skills' },
  { label: 'Experience',  id: 'sp-experience' },
  { label: 'Projects',    id: 'sp-projects' },
  { label: 'Certs',       id: 'sp-certs' },
  { label: 'Contact',     id: 'sp-contact' },
]

const HorizontalLayout = () => {
  const { certificates } = useCertificates()
  const allProjects = getAllProjects()
  const [activeNav, setActiveNav] = useState('sp-skills')
  const [theme, setTheme] = useState('dark')

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="sp-root" data-theme={theme}>

      {/* ── Navbar ── */}
      <nav className="sp-navbar">
        <div className="sp-nav-links">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              className={`sp-nav-link ${activeNav === id ? 'active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="sp-nav-right">
          {/* Theme switcher */}
          <div className="theme-switcher">
            {THEMES.map(t => (
              <button
                key={t.id}
                className={`theme-dot ${theme === t.id ? 'active' : ''}`}
                style={{ background: t.dot }}
                onClick={() => setTheme(t.id)}
                title={t.label}
              />
            ))}
          </div>
          <a href={`https://${resumeData.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="sp-nav-icon" title="GitHub">
            <FaGithub />
          </a>
          <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="sp-nav-icon" title="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </nav>

      {/* ── Main layout ── */}
      <div className="sp-layout">

        {/* ── Left Sidebar (sticky) ── */}
        <aside className="sp-sidebar">
          <div className="hero-photo-wrap">
            <img src="/assets/profile-pic.png" alt={personalInfo.name} className="hero-photo" />
          </div>
          <div className="hero-name-block">
            <h1 className="hero-name">
              {personalInfo.name.split(' ')[0]}<br />
              <span className="hero-name-dim">{personalInfo.name.split(' ')[1]}.</span>
            </h1>
            <p className="hero-left-typewriter">
              I'm a{' '}
              <TypewriterTitles
                titles={heroTitles}
                typingSpeed={90}
                deletingSpeed={50}
                pause={1500}
                className="hero-typewriter"
              />
            </p>
            <p className="hero-left-bio">
              CSE undergrad at VIT Bhopal who ships clean, fast full-stack apps.
              Into React, real-time systems, and AI integrations.
            </p>

            <div className="hero-stats">
              <div className="hstat">
                <span className="hstat-val">8.58</span>
                <span className="hstat-lbl">GPA</span>
              </div>
              <div className="hstat-div" />
              <div className="hstat">
                <span className="hstat-val">200+</span>
                <span className="hstat-lbl">DSA</span>
              </div>
              <div className="hstat-div" />
              <div className="hstat">
                <span className="hstat-val">15+</span>
                <span className="hstat-lbl">Projects</span>
              </div>
            </div>

            <div className="hero-left-footer">
              <div className="hero-avail">
                <div className="eyebrow-dot" />
                <span>Open to work</span>
              </div>
              <div className="hero-left-social">
                <a href={`https://${resumeData.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="sp-nav-icon" title="GitHub"><FaGithub /></a>
                <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="sp-nav-icon" title="LinkedIn"><FaLinkedin /></a>
                <a href={`mailto:${resumeData.personalInfo.email}`} className="sp-nav-icon" title="Email"><FaEnvelope /></a>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Right Content (scrollable) ── */}
        <main className="sp-content">

          {/* 01 Skills */}
          <section id="sp-skills" className="sp-section">
            <p className="sp-eyebrow">01 — Skills</p>
            <h2 className="sp-heading">Tools of the trade</h2>
            <div className="sp-skill-categories">
              {SKILL_CATEGORIES.map(({ label, skills }) => (
                <div key={label} className="skill-category">
                  <p className="skill-cat-label">{label}</p>
                  <div className="skills-pills">
                    {skills.map(({ name, color }) => (
                      <span
                        key={name}
                        className="skill-pill"
                        style={{ '--pill-color': color }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 02 Experience */}
          <section id="sp-experience" className="sp-section">
            <p className="sp-eyebrow">02 — Experience</p>
            <h2 className="sp-heading">Where I've worked</h2>
            <div className="exp-timeline-h">
              <div className="exp-rail">
                <div className="exp-rail-dot" />
                <div className="exp-rail-line" />
              </div>
              <div className="exp-h-card">
                <div className="exp-h-top">
                  <div>
                    <span className="exp-company">Wyreflow Technologies</span>
                    <span className="exp-role">Full-Stack Developer Intern</span>
                  </div>
                  <span className="exp-date">Jan – May 2026</span>
                </div>
                <ul className="exp-bullets">
                  <li>Built production full-stack job platform with React, Node.js and Express</li>
                  <li>Restructured into MVC architecture — React views, Express controllers, MongoDB models</li>
                  <li>Refactored for responsiveness; created reusable UI and backend utility modules</li>
                </ul>
                <div className="exp-stack">
                  {['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'].map(t => (
                    <span key={t} className="hpc-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 03 Projects */}
          <section id="sp-projects" className="sp-section">
            <div className="sp-section-header">
              <div>
                <p className="sp-eyebrow">03 — Projects</p>
                <h2 className="sp-heading">Things I've built</h2>
              </div>
              <a href="https://github.com/SumantSagar73" target="_blank" rel="noopener noreferrer" className="sp-ghost-btn">
                <FaGithub /> All on GitHub
              </a>
            </div>
            <div className="sp-projects-grid">
              {allProjects.map(project => (
                <div key={project.id} className={`proj-card${project.featured ? ' proj-card-featured' : ''}`}>
                  <div className="proj-img" style={{ backgroundImage: project.image ? `url(${project.image})` : 'none' }} />
                  <div className="proj-body">
                    <div className="proj-top">
                      <h3 className="proj-title">{project.title}</h3>
                      {project.status === 'In Progress' && (
                        <span className="proj-badge wip">WIP</span>
                      )}
                    </div>
                    <p className="proj-desc">{project.description}</p>
                    <div className="proj-stack">
                      {project.techStack.slice(0, 3).map(t => (
                        <span key={t} className="proj-tech">{t}</span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="proj-tech muted">+{project.techStack.length - 3}</span>
                      )}
                    </div>
                    <div className="proj-links">
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-link live">Live ↗</a>
                      )}
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-link">
                          <FaGithub /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 04 Certifications */}
          <section id="sp-certs" className="sp-section">
            <p className="sp-eyebrow">04 — Certifications</p>
            <h2 className="sp-heading">What I've earned</h2>
            <div className="sp-certs-grid">
              {certificates.map(cert => (
                <div key={cert.id} className="sp-cert-card">
                  <div className="sp-cert-top">
                    <div>
                      <p className="sp-cert-title">{cert.title}</p>
                      <p className="sp-cert-issuer">{cert.issuer}</p>
                    </div>
                    <span className="sp-cert-date">{cert.date}</span>
                  </div>
                  {cert.verifyUrl && cert.verifyUrl !== '#' && (
                    <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="sp-cert-link">
                      Verify <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 05 Contact */}
          <section id="sp-contact" className="sp-section sp-contact-section">
            <p className="sp-eyebrow">05 — Contact</p>
            <h2 className="contact-heading">Let's build<br />something.</h2>
            <p className="contact-sub">Open to internships, collaborations and interesting projects.</p>
            <div className="contact-links">
              <a href={`mailto:${resumeData.personalInfo.email}`} className="contact-chip">
                <FaEnvelope /> {resumeData.personalInfo.email}
              </a>
              <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-chip">
                <FaLinkedin /> LinkedIn
              </a>
              <a href={`https://${resumeData.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="contact-chip">
                <FaGithub /> GitHub
              </a>
              <span className="contact-chip no-link"><FaMapMarkerAlt /> India · IST</span>
            </div>
            <div className="contact-quick-facts">
              <span className="qf"><FaGraduationCap /> VIT Bhopal · BTech CSE</span>
              <span className="qf"><FaMedal /> NCC Cadet</span>
              <span className="qf">GPA 8.58 / 10</span>
              <span className="qf">Graduating May 2026</span>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}

export default HorizontalLayout
