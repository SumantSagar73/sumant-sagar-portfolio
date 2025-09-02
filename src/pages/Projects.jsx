import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaEye, FaCode, FaCalendarAlt } from 'react-icons/fa'
import { projectsData, getProjectsByCategory } from '../data/projects'

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(projectsData.all)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setFilteredProjects(getProjectsByCategory(category))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <motion.div
      className="projects-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <motion.div 
          className="page-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="page-title" variants={itemVariants}>
            My Projects
          </motion.h1>
          
          <motion.p className="page-description" variants={itemVariants}>
            Explore my latest work and personal projects that showcase my skills and creativity.
          </motion.p>

          {/* Category Filter */}
          <motion.div className="category-filter" variants={itemVariants}>
            {projectsData.categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Projects Stats */}
          <motion.div className="projects-stats" variants={itemVariants}>
            <div className="stat-item">
              <span className="stat-number">{projectsData.stats.total}+</span>
              <span className="stat-label">Total Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{projectsData.stats.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{projectsData.stats.featured}</span>
              <span className="stat-label">Featured</span>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div className="projects-grid" variants={itemVariants}>
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`project-card ${project.featured ? 'featured' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  layout
                >
                  {project.featured && (
                    <div className="featured-badge">
                      <span>⭐ Featured</span>
                    </div>
                  )}
                  
                  <div className="project-image">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    <div className="image-placeholder">
                      <FaCode />
                    </div>
                    
                    <div className="project-overlay">
                      <div className="project-actions">
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="action-btn"
                          title="View Live Demo"
                        >
                          <FaEye />
                        </a>
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="action-btn"
                          title="View Source Code"
                        >
                          <FaGithub />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-meta">
                        <span className="project-year">
                          <FaCalendarAlt /> {project.year}
                        </span>
                        <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-tech">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    
                    <div className="project-footer">
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm"
                      >
                        <FaGithub /> Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div 
              className="no-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>No projects found in this category.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Projects
