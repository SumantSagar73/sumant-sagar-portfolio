import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
    { name: "Home", path: "/", icon: FaHome },
    { name: "About", path: "/about", icon: FaUser },
    { name: "Projects", path: "/projects", icon: FaProjectDiagram },
    { name: "Contact", path: "/contact", icon: FaEnvelope },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

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
          <Link to="/" className="navbar-brand">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="brand-content"
            >
              <img src={logo} alt="Sumant Sagar" className="brand-logo" />
              <span className="brand-text">Sumant</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav desktop-nav">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  <item.icon className="nav-icon" />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      className="nav-indicator"
                      layoutId="navIndicator"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
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
                  <Link to="/" className="mobile-brand" onClick={toggleMenu}>
                    <span className="brand-text">Portfolio</span>
                    <span className="brand-dot">.</span>
                  </Link>
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
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          className={`mobile-nav-link ${
                            isActive ? "active" : ""
                          }`}
                          onClick={toggleMenu}
                        >
                          <item.icon className="nav-icon" />
                          <span>{item.name}</span>
                        </Link>
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
