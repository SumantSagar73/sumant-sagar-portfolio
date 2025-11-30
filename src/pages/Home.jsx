import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import {
  FaDownload,
  FaEye,
  FaGithub,
  FaLinkedin,
  FaCode,
  FaPalette,
  FaMobile,
  FaHackerrank,
} from "react-icons/fa";
import {
  SiLeetcode,
  SiCodingninjas,
  SiGeeksforgeeks,
  SiCodechef,
} from "react-icons/si";
import { personalInfo } from "../data/personal";
import RotatingTitles from "../components/RotatingTitles";
import { heroTitles } from "../data/titles";
import { mainSocialLinks, getCodingPlatforms } from "../data/social";
import profilePic from "../assets/profile-pic.png";
import "../styles/pages/Home.css";

const Home = () => {
  // Web Development roles instead of programming languages
  // ...existing web development role metadata removed (not displayed)

  // Combine professional and coding platforms for social display
  const socialPlatforms = [
    ...mainSocialLinks.slice(0, 2), // GitHub and LinkedIn
    ...getCodingPlatforms().slice(0, 3), // First 3 coding platforms
  ];

  // Function to get the correct icon for each platform
  const getIcon = (iconName) => {
    const iconMap = {
      FaGithub: FaGithub,
      FaLinkedin: FaLinkedin,
      SiLeetcode: SiLeetcode,
      SiCodingninjas: SiCodingninjas,
      SiGeeksforgeeks: SiGeeksforgeeks,
      SiCodechef: SiCodechef,
      FaHackerrank: FaHackerrank,
    };

    return iconMap[iconName] || FaCode;
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Text */}
            <div className="hero-text">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="hero-title">
                  Hi, I'm <span className="hero-name">{personalInfo.name}</span>
                  <motion.span
                    className="wave"
                    animate={{
                      rotate: [0, 14, -8, 14, -4, 10, 0, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    style={{ 
                      display: 'inline-block',
                      transformOrigin: '70% 70%'
                    }}
                  >
                    👋
                  </motion.span>
                </h1>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="hero-subtitle">
                  I'm a{" "}
                  <RotatingTitles titles={heroTitles} interval={2200} className="gradient-text" />
                </h2>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="hero-description">{personalInfo.bio}</p>
              </motion.div>

              {/* Call to Action Buttons */}
              <motion.div 
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <ScrollLink 
                  to="projects" 
                  smooth={true} 
                  offset={-70} 
                  duration={500} 
                  className="btn btn-primary"
                  style={{ cursor: 'pointer' }}
                >
                  <FaEye />
                  View My Work
                </ScrollLink>
                <a
                  href={personalInfo.resumeUrl}
                  className="btn btn-secondary"
                  style={{ marginLeft: "1rem" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload />
                  Preview & Download Resume
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="hero-social"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                {socialPlatforms.map((social) => {
                  const IconComponent = getIcon(social.icon, social.name);
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      whileHover={{ scale: 1.1, color: social.color }}
                      whileTap={{ scale: 0.95 }}
                      title={social.name}
                    >
                      <IconComponent />
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>

            {/* Hero Image/Avatar */}
            <motion.div 
              className="hero-image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="image-container">
                <motion.div
                  className="profile-image"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={profilePic}
                    alt={`${personalInfo.name} - ${personalInfo.title}`}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* image placeholder */}

                  <div className="placeholder-avatar">
                    <span>
                      {personalInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </motion.div>
                
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll to Explore Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ↓
          </motion.div>
          <span>Scroll to explore</span>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
