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
} from "react-icons/fa";
import { projectsData, getProjectsByCategory } from "../data/projects";
import ProjectCarousel from "../components/ProjectCarousel";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projectsData.all);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilteredProjects(getProjectsByCategory(category));
  };

  // Get all projects for carousel
  const carouselProjects = projectsData.all;

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

          {/* Project Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ProjectCarousel projects={carouselProjects} />
          </motion.div>

          {/* All Projects Section */}
          <motion.div
            className="section-divider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="section-title">All Projects</h2>
            <p className="section-description">
              Browse through all my projects by category
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="category-filter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {projectsData.categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Projects Stats */}
          <motion.div
            className="projects-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
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
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="projects-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <div
                    className={`project-card ${
                      project.featured ? "featured" : ""
                    }`}
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
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
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
                          <span
                            className={`project-status ${project.status
                              .toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            {project.status}
                          </span>
                        </div>
                      </div>

                      <p className="project-description">
                        {project.description}
                      </p>

                      <div className="project-tech">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="tech-tag">
                            {tech}
                          </span>
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
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
