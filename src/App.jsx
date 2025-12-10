import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ThemeProvider from "./context/ThemeContext";
import { useTheme } from "./context/useTheme";
import { FaMoon, FaSun } from 'react-icons/fa'
import { Analytics } from '@vercel/analytics/react';
import { cacheMultiplePdfs } from './lib/pdfCache';
import { resumeData } from './data/resume';


// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ResumePreview from "./components/ResumePreview";

// Theme Toggle Button Component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle btn btn-ghost"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <FaMoon aria-hidden="true" /> : <FaSun aria-hidden="true" />}
      <span className="sr-only">
        {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      </span>
    </button>
  );
};

// Main App Layout Component
const AppLayout = () => {
  const location = useLocation();
  const isResumePage = location.pathname === "/resume";

  useEffect(() => {
    // Cache Resume PDF on initial load
    // TODO: Replace this URL with your Supabase URL for the resume
    const resumeUrl = resumeData.resumeUrls.googleDocsPdf;

    // Only attempt to cache if it's a valid URL (Google Docs export links might have CORS issues, 
    // but this setup is ready for Supabase URLs)
    if (resumeUrl) {
      cacheMultiplePdfs([{ id: 'resume', url: resumeUrl }])
        .catch(err => console.error("Failed to cache resume PDF:", err));
    }
  }, []);

  if (isResumePage) {
    return (
      <div className="app-layout">
        <Navbar />
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
        <main className="main-content">
          <Routes>
            <Route path="/resume" element={<ResumePreview />} />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Navbar />

      {/* Theme Toggle - Fixed Position */}
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>

      {/* Main Content Area */}
      <main className="main-content">
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

// Root App Component
const App = () => {
  return (
    <ThemeProvider>
      <Analytics />

      {/* @vercel/analytics/next is Next.js-only and causes Vite to try resolving `next/navigation`.
          Removed to avoid runtime errors in this Vite app. If you want analytics, use a
          Vite-compatible analytics integration or initialize the package conditionally. */}

      <AppLayout />
    </ThemeProvider>
  );
};

export default App;
