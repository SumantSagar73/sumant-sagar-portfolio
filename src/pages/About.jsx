   import React, { useState } from 'react'
// motion is used in JSX (e.g. <motion.div />). Some linters flag it as unused; allow it here.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { FaCode, FaLaptopCode, FaDatabase, FaTools, FaLayerGroup, FaTrophy } from 'react-icons/fa'
import CertificateCarousel from '../components/CertificateCarousel'
import CertificateWall from '../components/CertificateWall'
import SkillOrbsFallback from '../components/SkillOrbsFallback'
import { getAllSkills } from '../data/skills'

const skillCategories = [
  {
    title: "Core Languages",
    skills: ["JavaScript", "TypeScript", "Python", "C++", "C#", "Kotlin"],
    icon: <FaCode />
  },
  {
    title: "Frontend Development",
    skills: ["React", "HTML5", "CSS3", "Next.js", "Tailwind", "Sass", "Bootstrap"],
    icon: <FaLaptopCode />
  },
  {
    title: "Backend & Database",
    skills: ["Node.js", "Express", "MongoDB", "MySQL", "PostgreSQL", "Firebase", "Redis"],
    icon: <FaDatabase />
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "Docker", "AWS", "Vite", "Webpack", "Babel", "ESLint"],
    icon: <FaTools />
  },
  {
    title: "Other Technologies",
    skills: ["Redux", "GraphQL", "Jest", "UI/UX", "Figma", "Responsive Design"],
    icon: <FaLayerGroup />
  },
  {
    title: "Coding Platforms",
    skills: ["LeetCode", "GeeksforGeeks", "Coding Ninjas"],
    icon: <FaTrophy />
  }
]

const About = () => {
  const [viewMode, setViewMode] = useState('interactive')
  const [certViewMode, setCertViewMode] = useState('carousel')

  // Create a map of skill names to their colors for quick lookup
  const skillColorMap = React.useMemo(() => {
    const allSkills = getAllSkills();
    const map = {};
    
    allSkills.forEach(skill => {
      // Map exact name
      map[skill.name.toLowerCase()] = skill.color;
      
      // Handle variations (e.g., "React" vs "React.js")
      if (skill.name === "React.js") map["react"] = skill.color;
      if (skill.name === "Node.js") map["node"] = skill.color;
    });
    
    return map;
  }, []);

  const getSkillColor = (skillName) => {
    const normalized = skillName.toLowerCase();
    return skillColorMap[normalized] || null;
  };

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="page-content">
          {/* Skills Section - Toggle View */}
          <motion.section 
            className="skills-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="section-header">
              <h2 className="section-title">Technical Skills</h2>
              <p className="section-description">
                Explore my technical expertise through an interactive view or a detailed list
              </p>
            </div>

            <div className="view-toggle-container">
              <button 
                className={`view-toggle-btn ${viewMode === 'interactive' ? 'active' : ''}`}
                onClick={() => setViewMode('interactive')}
              >
                Interactive View
              </button>
              <button 
                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List View
              </button>
            </div>

            <div className="skills-content-wrapper">
              <AnimatePresence mode="wait">
                {viewMode === 'interactive' ? (
                  <motion.div 
                    key="interactive"
                    className="skills-view-interactive"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SkillOrbsFallback />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="list"
                    className="skills-view-list"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="skills-grid-container">
                      {skillCategories.map((category, index) => (
                        <motion.div 
                          className="skill-category-card"
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="category-header">
                            <span className="category-icon">{category.icon}</span>
                            <h3 className="category-title">{category.title}</h3>
                          </div>
                          <div className="skill-tags">
                            {category.skills.map(skill => {
                              const color = getSkillColor(skill);
                              return (
                                <span 
                                  key={skill} 
                                  className="skill-pill"
                                  style={color ? { '--skill-hover-color': color } : {}}
                                >
                                  {skill}
                                </span>
                              );
                            })}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Certifications Section */}
          <motion.section 
            className="certifications-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="section-header">
              <h2 className="section-title">Professional Certifications</h2>
              
              <div className="view-toggle-container">
                <button 
                  className={`view-toggle-btn ${certViewMode === 'carousel' ? 'active' : ''}`}
                  onClick={() => setCertViewMode('carousel')}
                >
                  3D Carousel
                </button>
                <button 
                  className={`view-toggle-btn ${certViewMode === 'wall' ? 'active' : ''}`}
                  onClick={() => setCertViewMode('wall')}
                >
                  Wall Display
                </button>
              </div>
            </div>
            
            <div className="certificate-views-container" style={{ position: 'relative', minHeight: '400px' }}>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: certViewMode === 'carousel' ? 1 : 0,
                  display: certViewMode === 'carousel' ? 'block' : 'none'
                }}
                transition={{ duration: 0.5 }}
              >
                <CertificateCarousel />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: certViewMode === 'wall' ? 1 : 0,
                  display: certViewMode === 'wall' ? 'block' : 'none'
                }}
                transition={{ duration: 0.5 }}
              >
                <CertificateWall />
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  )
}

export default About
