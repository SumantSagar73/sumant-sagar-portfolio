import React, { useEffect, Suspense, useState } from "react";
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
// Lazy load pages and heavy components so initial bundle is small
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Contact = React.lazy(() => import('./pages/Contact'));
const ResumePreview = React.lazy(() => import('./components/ResumePreview'));
const BentoDashboard = React.lazy(() => import('./components/BentoDashboard'));
const HorizontalLayout = React.lazy(() => import('./components/HorizontalLayout'));

import Loader from './components/Loader';
import Preloader from './components/Preloader';
import { useAssetLoader } from './hooks/useAssetLoader';

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
            <Route path="/resume" element={<Suspense fallback={<Loader message="Loading resume..." />}><ResumePreview /></Suspense>} />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Main Content — Horizontal Layout (has its own topbar) */}
      <main className="main-content" style={{ overflow: 'hidden' }}>
        <Suspense fallback={<Loader message="Loading..." />}>
          <HorizontalLayout />
        </Suspense>
      </main>
    </div>
  );
};

// Root App Component
const App = () => {
  const { progress, isReady } = useAssetLoader();
  const [showContent, setShowContent] = useState(false);

  return (
    <ThemeProvider>
      <Analytics />

      <Preloader
        progress={progress}
        isReady={isReady}
        onComplete={() => setShowContent(true)}
      />

      <div style={{
        opacity: showContent ? 1 : 0,
        visibility: showContent ? 'visible' : 'hidden',
        transition: 'opacity 0.8s ease'
      }}>
        <AppLayout />
      </div>
    </ThemeProvider>
  );
};

export default App;
