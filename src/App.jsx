import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ThemeProvider from "./context/ThemeContext";
import { useTheme } from "./context/useTheme";

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
      {theme === "light" ? "🌙" : "☀️"}
      <span className="sr-only">
        {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      </span>
    </button>
  );
};

// Main App Layout Component
const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="app-layout">
      <Navbar />

      {/* Theme Toggle - Fixed Position */}
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>

      {/* Main Content Area */}
      <main className="main-content">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<ResumePreview />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

// 404 Not Found Component
const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-description">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="not-found-actions">
            <a href="/" className="btn btn-primary">
              Go Home
            </a>
            <button
              onClick={() => window.history.back()}
              className="btn btn-secondary"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Root App Component
const App = () => {
  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
};

export default App;
