import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaStar } from 'react-icons/fa'
import '../styles/components/ProjectCarousel.css'

const ProjectCarousel = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCarouselFocused, setIsCarouselFocused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextProject = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setTimeout(() => setIsTransitioning(false), 600) // Match CSS transition duration
  }

  const prevProject = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setTimeout(() => setIsTransitioning(false), 600) // Match CSS transition duration
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isCarouselFocused) return
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setIsTransitioning(true)
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
        setTimeout(() => setIsTransitioning(false), 600)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setIsTransitioning(true)
        setCurrentIndex((prev) => (prev + 1) % projects.length)
        setTimeout(() => setIsTransitioning(false), 600)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isCarouselFocused, projects.length])

  // Handle mouse enter/leave for focus
  const handleMouseEnter = () => {
    setIsCarouselFocused(true)
  }

  const handleMouseLeave = () => {
    setIsCarouselFocused(false)
  }

  return (
    <div className="project-carousel">
      <div 
        className={`carousel-container ${isTransitioning ? 'transitioning' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ outline: isCarouselFocused ? '2px solid rgba(var(--accent-color-rgb), 0.3)' : 'none' }}
      >
        {/* Keyboard Navigation Hint */}
        {isCarouselFocused && (
          <motion.div 
            className="keyboard-hint"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            Use ← → arrow keys to navigate
          </motion.div>
        )}

        {/* Project Counter */}
        <div className="project-counter">
          <span>{currentIndex + 1} / {projects.length}</span>
        </div>

        {/* Navigation Buttons */}
        <button 
          className="carousel-nav carousel-nav-left"
          onClick={prevProject}
          aria-label="Previous project"
        >
          <FaChevronLeft />
        </button>

        <button 
          className="carousel-nav carousel-nav-right"
          onClick={nextProject}
          aria-label="Next project"
        >
          <FaChevronRight />
        </button>

        {/* Carousel Items */}
        <div className="carousel-track">
          {projects.map((project, index) => {
            // Calculate position relative to current center
            let position = index - currentIndex
            
            // Handle circular positioning
            if (position > projects.length / 2) {
              position = position - projects.length
            } else if (position < -projects.length / 2) {
              position = position + projects.length
            }
            
            const isCenter = position === 0
            const isFirstLayer = Math.abs(position) === 1
            const isSecondLayer = Math.abs(position) === 2
            const isThirdLayer = Math.abs(position) === 3
            
            return (
              <div
                key={project.id}
                className={`carousel-item ${
                  isCenter ? 'carousel-item-center' :
                  isFirstLayer ? 'carousel-item-first' :
                  isSecondLayer ? 'carousel-item-second' :
                  isThirdLayer ? 'carousel-item-third' :
                  'carousel-item-hidden'
                } ${position < 0 ? 'left' : position > 0 ? 'right' : ''}`}
                style={{
                  zIndex: isCenter ? 50 : isFirstLayer ? 40 : isSecondLayer ? 30 : isThirdLayer ? 20 : 10,
                }}
                onClick={() => {
                  if (!isCenter) {
                    setCurrentIndex(index)
                  }
                }}
              >
                {isCenter ? (
                  // Center card - featured design
                  <div className="project-card-featured">
                    <div className="project-image-featured">
                        {/* Use bgImage as background for a richer backdrop */}
                        <div
                          className="project-image-bg"
                          style={{
                            backgroundImage: `url(${project.bgImage || project.image || `https://picsum.photos/600/400?random=${project.id}`})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center'
                          }}
                        >
                          <img 
                            src={project.image || `https://picsum.photos/600/400?random=${project.id}`} 
                            alt={project.title}
                            onError={(e) => {
                              e.target.src = `https://picsum.photos/600/400?random=${project.id}`;
                            }}
                          />
                        </div>
                      <div className="project-overlay-featured">
                        <div className="project-badges">
                          <span className="project-category">{project.category}</span>
                          {project.featured && <span className="featured-badge"><FaStar /> Featured</span>}
                        </div>
                        <div className="project-actions">
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="action-btn"
                          >
                            <FaExternalLinkAlt />
                          </a>
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="action-btn"
                          >
                            <FaGithub />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="project-info-featured">
                      <h3 className="project-title-featured">{project.title}</h3>
                      <p className="project-year">
                        <FaCalendarAlt /> {project.year}
                      </p>
                      <p className="project-description-featured">{project.description}</p>
                      <div className="project-tech-featured">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="tech-tag-featured">{tech}</span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="tech-more">+{project.techStack.length - 4} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Side cards - compact design
                  <div className={`project-card-compact ${
                    isThirdLayer ? 'micro' : 
                    isSecondLayer ? 'mini' : ''
                  }`}>
                    <div className="project-image-compact">
                      <img 
                        src={project.image || `https://picsum.photos/400/300?random=${project.id}`} 
                        alt={project.title}
                        onError={(e) => {
                          e.target.src = `https://picsum.photos/400/300?random=${project.id}`;
                        }}
                      />
                      <div className="project-overlay-compact">
                        <span className="project-category-compact">{project.category}</span>
                        {!isSecondLayer && !isThirdLayer && (
                          <div className="project-actions-compact">
                            <span className="select-project">Click to Select</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="project-info-compact">
                      <h4 className="project-title-compact">{project.title}</h4>
                      {!isSecondLayer && !isThirdLayer && (
                        <p className="project-year-compact">{project.year}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Detailed Project View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={projects[currentIndex].id}
          className="project-details"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.4, 0.0, 0.2, 1],
            delay: 0.2
          }}
        >
          <div className="project-details-content">
            <motion.div 
              className="details-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2>{projects[currentIndex].title}</h2>
              <div className="details-meta">
                <span className={`status-badge status-${projects[currentIndex].status.toLowerCase().replace(' ', '-')}`}>
                  {projects[currentIndex].status}
                </span>
                <span className="year-badge">{projects[currentIndex].year}</span>
              </div>
            </motion.div>

            <motion.div 
              className="details-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div 
                className="details-description"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h4>About This Project</h4>
                <p>{projects[currentIndex].longDescription}</p>
              </motion.div>

              <motion.div 
                className="details-tech"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h4>Technologies Used</h4>
                <div className="tech-stack-detailed">
                  {projects[currentIndex].techStack.map((tech, index) => (
                    <motion.span 
                      key={tech} 
                      className="tech-item-detailed"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.7 + (index * 0.05),
                        ease: "easeOut"
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {projects[currentIndex].highlights && (
                <motion.div 
                  className="details-highlights"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <h4>Key Features</h4>
                  <ul className="highlights-list">
                    {projects[currentIndex].highlights.map((highlight, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.8 + (index * 0.1),
                          ease: "easeOut"
                        }}
                      >
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <motion.div 
                className="details-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <a 
                  href={projects[currentIndex].liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <FaExternalLinkAlt /> View Live Demo
                </a>
                <a 
                  href={projects[currentIndex].githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FaGithub /> View Source Code
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default ProjectCarousel
