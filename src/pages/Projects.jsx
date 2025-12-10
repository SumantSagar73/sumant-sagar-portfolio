import React, { useState } from "react";
// motion is used as JSX components (<motion.div />). Silence false-positive unused var warnings.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaEye,
  FaCode,
  FaCalendarAlt,
  FaList,
  FaLaptop,
  FaThLarge,
} from "react-icons/fa";
import { projectsData, getProjectsByCategory } from "../data/projects";
import DeviceShowcase from "../components/DeviceShowcase";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projectsData.all);
  const [viewMode, setViewMode] = useState('showcase'); // 'showcase' or 'list'

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilteredProjects(getProjectsByCategory(category));
  };

  // Get all projects for showcase
  const showcaseProjects = projectsData.all;

  return (
    <motion.div
      className="projects-page"
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
            My Projects
          </motion.h1>

          <motion.p
            className="page-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore my latest work and personal projects that showcase my skills
            and creativity.
          </motion.p>

          {/* View Toggle */}
          <motion.div
            className="view-toggle-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <button
              className={`view-toggle-btn ${viewMode === 'showcase' ? 'active' : ''}`}
              onClick={() => setViewMode('showcase')}
            >
              <FaLaptop /> Showcase
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FaThLarge /> Grid View
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            {viewMode === 'showcase' ? (
              <motion.div
                key="showcase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: '4rem' }}
              >
                <DeviceShowcase projects={showcaseProjects} />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Category Filter */}
                <div className="category-filter">
                  {projectsData.categories.map((category) => (
                    <button
                      key={category}
                      className={`filter-btn ${selectedCategory === category ? "active" : ""
                        }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Projects Stats */}
                <div className="projects-stats">
                  <div className="stat-item">
                    <span className="stat-number">{projectsData.stats.total}+</span>
                    <span className="stat-label">Total Projects</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">
                      {projectsData.stats.completed}
                    </span>
                    <span className="stat-label">Completed</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{projectsData.stats.featured}</span>
                    <span className="stat-label">Featured</span>
                  </div>
                </div>

                {/* Projects Grid View */}
                <div className="projects-grid-container">
                  <AnimatePresence mode="wait">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="project-card-item"
                      >
                        <div className="project-card-image-container">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="project-card-image"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/400x250/1a1a1a/ffffff?text=${encodeURIComponent(project.title)}`;
                            }}
                          />
                          <div className="project-card-overlay">
                            <div className="project-card-links">
                              {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="card-link-btn" title="View Code">
                                  <FaGithub />
                                </a>
                              )}
                              {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="card-link-btn" title="View Live Demo">
                                  <FaExternalLinkAlt />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="project-card-content">
                          <div className="project-card-header">
                            <span className="project-year">{project.year}</span>
                            <span className="project-category">{project.category}</span>
                          </div>

                          <h3 className="project-card-title">
                            {project.title}
                            {project.featured && <span className="card-featured-badge" title="Featured Project">★</span>}
                          </h3>

                          <p className="project-card-description">{project.description}</p>

                          <div className="project-card-tech">
                            {project.techStack.slice(0, 4).map(tech => (
                              <span key={tech} className="card-tech-pill">{tech}</span>
                            ))}
                            {project.techStack.length > 4 && (
                              <span className="card-tech-more">+{project.techStack.length - 4}</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {filteredProjects.length === 0 && (
                  <div className="no-projects">
                    <p>No projects found in this category.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
