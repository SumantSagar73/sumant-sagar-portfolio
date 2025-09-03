import React from 'react'
import { motion } from 'framer-motion'
import { FaCertificate, FaGraduationCap, FaTrophy, FaExternalLinkAlt } from 'react-icons/fa'
import { personalInfo } from '../data/personal'
import { skillsData, skillCategories } from '../data/skills'
import CertificateCarousel from '../components/CertificateCarousel'
import profilePic from '../assets/profile-pic.png'

const About = () => {
  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="page-content">
          <motion.h1 
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            About Me
          </motion.h1>
          
          <motion.p 
            className="page-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Personal Info Section */}
          <motion.section 
            className="about-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="about-content">
              <div className="about-text">
                <h2 className="section-title">Who I Am</h2>
                <p className="about-description">
                  {personalInfo.detailedBio}
                </p>
                
                <div className="stats-grid">
                  {Object.entries(personalInfo.stats).map(([key, value]) => (
                    <div key={key}>
                      <div className="stat-card">
                        <span className="stat-value">{value}</span>
                        <span className="stat-label">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="about-image">
                <motion.div
                  className="profile-container"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={profilePic} 
                    alt={personalInfo.name}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="placeholder-avatar">
                    <span>{personalInfo.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </motion.div>
                
                {/* Profile Highlight */}
                <motion.div 
                  className="profile-highlight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h3>Quick Facts</h3>
                  <p>Based in {personalInfo.location}</p>
                  <p>Passionate about {personalInfo.interests[0].toLowerCase()}</p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section 
            className="skills-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="section-title">Technical Skills</h2>
            
            {Object.entries(skillCategories).map(([category, title]) => (
              <div key={category} className="skill-category">
                <h3 className="category-title">{title}</h3>
                <div className="skills-grid">
                  {skillsData[category]?.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="skill-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      viewport={{ once: true }}
                    >
                      <div className="skill-info">
                        <h4 className="skill-name">{skill.name}</h4>
                        <p className="skill-description">{skill.description}</p>
                        <span className="skill-experience">{skill.experience}</span>
                      </div>
                      <div className="skill-level">
                        <div 
                          className="skill-progress"
                          style={{ width: skill.level, backgroundColor: skill.color }}
                        />
                        <span className="skill-percentage">{skill.level}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.section>

          {/* Certifications Section */}
          <motion.section 
            className="certifications-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="section-header">
              <h2 className="section-title">Professional Certifications</h2>
              <p className="section-description">
                Scroll through my 3D certificate carousel to explore my professional achievements and technical expertise
              </p>
            </div>
            
            <CertificateCarousel />
          </motion.section>

          {/* Interests */}
          <motion.section 
            className="interests-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h2 className="section-title">Interests & Passion</h2>
            <div className="interests-grid">
              {personalInfo.interests.map((interest, index) => (
                <motion.div
                  key={interest}
                  className="interest-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                >
                  {interest}
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  )
}

export default About
