import React from "react";
import { FaDownload, FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaGraduationCap, FaCode, FaCertificate, FaUsers, FaBook, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { resumeData } from "../data/resume";
import "../styles/resume-preview.css";

const ResumePreview = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      y: 10, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="resume-page">
      <div className="container">
        <motion.div 
          className="resume-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Navigation Header */}
          <motion.div className="resume-nav" variants={itemVariants}>
            <Link to="/" className="btn btn-outline">
              <FaArrowLeft /> Back to Portfolio
            </Link>
            <a
              href={resumeData.resumeUrls.googleDocsPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <FaDownload /> Download PDF
            </a>
          </motion.div>

          {/* Header */}
          <motion.div className="resume-header" variants={itemVariants}>
            <div className="header-content">
              <h1 className="resume-name">{resumeData.personalInfo.name}</h1>
              <h2 className="resume-title">{resumeData.personalInfo.title}</h2>
              <div className="contact-grid">
                <div className="contact-item">
                  <FaPhone className="contact-icon" /> {resumeData.personalInfo.phone}
                </div>
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" /> {resumeData.personalInfo.email}
                </div>
                <div className="contact-item">
                  <FaLinkedin className="contact-icon" /> {resumeData.personalInfo.linkedin}
                </div>
                <div className="contact-item">
                  <FaGithub className="contact-icon" /> {resumeData.personalInfo.github}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.section className="resume-section" variants={itemVariants}>
            <h3 className="section-title">
              <FaGraduationCap className="section-icon" />
              Education
            </h3>
            <div className="education-list">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="education-card">
                  <div className="card-header">
                    <h4 className="card-title">
                      {edu.degree ? `${edu.institution}` : `${edu.level} - ${edu.institution}`}
                    </h4>
                    <span className="card-location">{edu.location}</span>
                  </div>
                  <div className="card-content">
                    {edu.degree && (
                      <>
                        <p className="card-subtitle">{edu.degree} - {edu.expectedGraduation}</p>
                        <p className="card-description">Major in {edu.major}; Minors in {edu.minor}</p>
                        <p className="card-highlight"><strong>Cumulative GPA:</strong> {edu.cgpa}/{edu.maxCgpa}</p>
                      </>
                    )}
                    {edu.board && (
                      <p className="card-highlight"><strong>{edu.board} percentage:</strong> {edu.percentage} - {edu.year}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section className="resume-section" variants={itemVariants}>
            <h3 className="section-title">
              <FaCode className="section-icon" />
              Projects
            </h3>
            <div className="projects-list">
              {resumeData.projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="card-header">
                    <h4 className="card-title">{project.title}</h4>
                    <span className="card-duration">{project.duration}</span>
                  </div>
                  <div className="card-content">
                    <p className="card-description">{project.description}</p>
                    <div className="contributions">
                      <h5 className="contributions-title">Key Contributions:</h5>
                      <ul className="contributions-list">
                        {project.keyContributions.map((contribution, index) => (
                          <li key={index}>{contribution}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Technical Skills Section */}
          <motion.section className="resume-section" variants={itemVariants}>
            <h3 className="section-title">
              <FaCode className="section-icon" />
              Technical Skills
            </h3>
            <div className="skills-grid">
              <div className="skill-card">
                <h5 className="skill-category">Programming Languages:</h5>
                <p className="skill-list">{resumeData.technicalSkills.programmingLanguages.join(", ")}</p>
              </div>
              <div className="skill-card">
                <h5 className="skill-category">Software Development:</h5>
                <p className="skill-list">{resumeData.technicalSkills.softwareDevelopment.join(", ")}</p>
              </div>
              <div className="skill-card">
                <h5 className="skill-category">Other Tools:</h5>
                <p className="skill-list">{resumeData.technicalSkills.tools.join(", ")}</p>
              </div>
              <div className="skill-card">
                <h5 className="skill-category">Languages:</h5>
                <p className="skill-list">Fluent in {resumeData.technicalSkills.spokenLanguages.join(", ")}</p>
              </div>
            </div>
          </motion.section>

          {/* Certifications Section */}
          <motion.section className="resume-section" variants={itemVariants}>
            <h3 className="section-title">
              <FaCertificate className="section-icon" />
              Certifications & Training
            </h3>
            <div className="certifications-list">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="certification-card">
                  <h4 className="card-title">{cert.title}</h4>
                  <p className="card-description">{cert.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Extracurricular Section */}
          <motion.section className="resume-section" variants={itemVariants}>
            <h3 className="section-title">
              <FaUsers className="section-icon" />
              Extracurricular
            </h3>
            {resumeData.extracurricular.map((activity) => (
              <div key={activity.id} className="activity-card">
                <div className="card-header">
                  <h4 className="card-title">{activity.activity}</h4>
                  <span className="card-duration">{activity.duration}</span>
                </div>
                <div className="card-content">
                  <p className="card-description">{activity.description}</p>
                </div>
              </div>
            ))}
          </motion.section>

          {/* Hobbies Section */}
          <motion.section className="resume-section" variants={itemVariants}>
            <h3 className="section-title">
              <FaBook className="section-icon" />
              Hobbies
            </h3>
            {resumeData.hobbies.map((hobby) => (
              <div key={hobby.id} className="hobby-card">
                <h4 className="card-title">{hobby.title}</h4>
                <p className="card-description">{hobby.description}</p>
              </div>
            ))}
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumePreview;
