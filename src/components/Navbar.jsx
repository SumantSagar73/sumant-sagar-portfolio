import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
// motion/AnimatePresence used as JSX components in this file. Suppress false-positive lint warnings.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import "../styles/components/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", to: "home", icon: FaHome },
    { name: "About", to: "about", icon: FaUser },
    { name: "Projects", to: "projects", icon: FaProjectDiagram },
    { name: "Contact", to: "contact", icon: FaEnvelope },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (to) => {
    if (!isHomePage) {
      navigate("/");
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(to);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="navbar-container">
          {/* Logo/Brand */}
          <RouterLink
            to="/"
            className="navbar-brand"
            onClick={() => {
              if (isHomePage) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="brand-content"
            >
              <img src={logo} alt="Sumant Sagar" className="brand-logo" />
              <span className="brand-text">Sumant</span>
            </motion.div>
          </RouterLink>

          {/* Desktop Navigation */}
          <div className="navbar-nav desktop-nav">
            {navigation.map((item) => {
              if (isHomePage) {
                return (
                  <ScrollLink
                    key={item.name}
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="nav-link"
                    activeClass="active"
                  >
                    <item.icon className="nav-icon" />
                    <span>{item.name}</span>
                    {/* Indicator is handled by activeClass in CSS or could be custom if needed */}
                  </ScrollLink>
                );
              } else {
                return (
                  <div
                    key={item.name}
                    className="nav-link"
                    onClick={() => handleNavClick(item.to)}
                    style={{ cursor: "pointer" }}
                  >
                    <item.icon className="nav-icon" />
                    <span>{item.name}</span>
                  </div>
                );
              }
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </motion.div>
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="mobile-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={toggleMenu}
              />
              <motion.div
                className="mobile-nav"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <div className="mobile-nav-header">
                  <RouterLink
                    to="/"
                    className="mobile-brand"
                    onClick={() => {
                      toggleMenu();
                      if (isHomePage) {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    <span className="brand-text">Portfolio</span>
                    <span className="brand-dot">.</span>
                  </RouterLink>
                  <button
                    className="mobile-close-btn"
                    onClick={toggleMenu}
                    aria-label="Close navigation menu"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="mobile-nav-content">
                  {navigation.map((item, index) => {
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {isHomePage ? (
                          <ScrollLink
                            to={item.to}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="mobile-nav-link"
                            activeClass="active"
                            onClick={toggleMenu}
                          >
                            <item.icon className="nav-icon" />
                            <span>{item.name}</span>
                          </ScrollLink>
                        ) : (
                          <div
                            className="mobile-nav-link"
                            onClick={() => handleNavClick(item.to)}
                          >
                            <item.icon className="nav-icon" />
                            <span>{item.name}</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="navbar-spacer" />
    </>
  );
};

export default Navbar;
