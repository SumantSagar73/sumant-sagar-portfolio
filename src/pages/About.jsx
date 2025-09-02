import React from 'react'
import { motion } from 'framer-motion'
import { FaCertificate, FaGraduationCap, FaTrophy, FaExternalLinkAlt } from 'react-icons/fa'
import { personalInfo } from '../data/personal'
import { skillsData, skillCategories } from '../data/skills'
import { experienceData } from '../data/experience'
import { certificationsData } from '../data/certifications'
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
                    <div key={key} className="stat-card">
                      <span className="stat-value">{value}</span>
                      <span className="stat-label">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
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
                  <p>{personalInfo.experience}+ years of experience</p>
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

          {/* Experience Preview */}
                    {/* Experience Section */}
          <motion.section 
            className="experience-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="section-title">Professional Journey</h2>
            <div className="experience-timeline">
              {experienceData.work.concat(experienceData.internships).map((exp) => (
                <motion.div
                  key={exp.id}
                  className="timeline-item"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="timeline-content">
                    <h3 className="job-title">{exp.position}</h3>
                    <h4 className="company-name">{exp.company}</h4>
                    <span className="job-duration">{exp.startDate} - {exp.endDate}</span>
                    <p className="job-description">{exp.description}</p>
                    <div className="job-skills">
                      {exp.skills.map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Certifications Section */}
          <motion.section 
            className="certifications-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="section-title">Certifications & Achievements</h2>
            <p className="section-description">
              Professional certifications and achievements that validate my technical expertise
            </p>
            
            <div className="certifications-container">
              {Object.entries(certificationsData.categories).map(([key, category]) => (
                <motion.div 
                  key={key}
                  className="certification-category"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="category-title">
                    {key === 'technical' && <FaCertificate />}
                    {key === 'courses' && <FaGraduationCap />}
                    {key === 'achievements' && <FaTrophy />}
                    {category.title}
                  </h3>
                  
                  <div className="certifications-grid">
                    {category.items.map((cert, index) => (
                      <motion.div
                        key={cert.id}
                        className="certification-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        viewport={{ once: true }}
                      >
                        <div className="cert-header">
                          <div className="cert-icon">
                            {key === 'technical' && <FaCertificate />}
                            {key === 'courses' && <FaGraduationCap />}
                            {key === 'achievements' && <FaTrophy />}
                          </div>
                          <div className="cert-status">{cert.status}</div>
                        </div>
                        
                        <div className="cert-content">
                          <h4 className="cert-name">{cert.name}</h4>
                          <p className="cert-issuer">
                            {cert.issuer || cert.provider || cert.platform}
                          </p>
                          <p className="cert-description">{cert.description}</p>
                          
                          <div className="cert-details">
                            <span className="cert-date">{cert.date}</span>
                            {cert.duration && <span className="cert-duration">{cert.duration}</span>}
                            {cert.rank && <span className="cert-rank">Rank: {cert.rank}</span>}
                          </div>
                          
                          {cert.skills && (
                            <div className="cert-skills">
                              {cert.skills.map((skill, idx) => (
                                <span key={idx} className="skill-tag">{skill}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {cert.url && cert.url !== '#' && (
                          <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-link">
                            <FaExternalLinkAlt /> View Certificate
                          </a>
                        )}
                        
                        {cert.url === '#' && (
                          <div className="cert-placeholder">
                            <span>Certificate will be added soon</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {category.items.length === 0 && (
                    <div className="empty-category">
                      <p>Certifications will be added to this section soon.</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
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
