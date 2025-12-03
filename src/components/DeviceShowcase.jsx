import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaLaptopCode } from 'react-icons/fa';
import '../styles/components/DeviceShowcase.css';

const DeviceShowcase = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevProject();
      if (e.key === 'ArrowRight') nextProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projects.length]);

  const currentProject = projects[currentIndex];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="device-showcase-container">
      <div className="showcase-layout">
        
        {/* Left Side: Project Info */}
        <div className="project-info-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="info-content"
            >
              <div className="project-header-group">
                <span className="project-category-tag">{currentProject.category}</span>
                <h2 className="project-title-display">{currentProject.title}</h2>
              </div>
              
              <p className="project-description-display">
                {currentProject.longDescription || currentProject.description}
              </p>

              <div className="tech-stack-display">
                {currentProject.techStack.slice(0, 6).map((tech, index) => (
                  <span key={index} className="tech-pill">{tech}</span>
                ))}
              </div>

              <div className="project-actions-display">
                <a 
                  href={currentProject.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
                <a 
                  href={currentProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <FaGithub /> Source Code
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="navigation-controls">
            <button onClick={prevProject} className="nav-btn" aria-label="Previous Project">
              <FaChevronLeft />
            </button>
            <div className="pagination-dots">
              {projects.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                />
              ))}
            </div>
            <button onClick={nextProject} className="nav-btn" aria-label="Next Project">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Right Side: Laptop Device */}
        <div className="device-display-area">
          <div className="laptop-wrapper">
            <div className="laptop-lid">
              <div className="laptop-camera"></div>
              <div className="laptop-screen">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="screen-image-container"
                    style={{
                      backgroundImage: `url(${currentProject.bgImage || currentProject.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center center'
                    }}
                  >
                    {/* Optional foreground screenshot (keeps aspect ratio) */}
                    {currentProject.image && (
                      <img
                        src={currentProject.image}
                        alt={currentProject.title}
                        className="screen-image"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    )}

                    {/* Fallback Icon if image fails or is missing */}
                    <div className="screen-fallback">
                      <FaLaptopCode />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="laptop-base">
              <div className="laptop-trackpad"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DeviceShowcase;
