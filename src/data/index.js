// Main data exports
export { personalInfo } from './personal.js'
export { resumeData } from './resume.js'
export { default as skillsData, skillCategories, getAllSkills, getSkillsByCategory, getFeaturedSkills } from './skills.js'
export { default as projectsData, getFeaturedProjects, getAllProjects, getProjectsByCategory, getProjectById, getLatestProjects } from './projects.js'
export { default as socialLinks, allSocialLinks, mainSocialLinks, getSocialLinksByCategory, getProfessionalLinks, getCodingPlatforms } from './social.js'
export { contactInfo, getPrimaryEmail, getContactMethods, getAvailabilityStatus } from './contact.js'
export { default as experienceData, getAllExperience, getCurrentJob, getTotalExperience, getWorkExperience } from './experience.js'
export { default as educationData, getDegrees, getCertifications, getEducationTimeline } from './education.js'
export { certificates } from './certificates.js'

// Configuration and settings
export const config = {
  siteName: "Sumant Sagar Portfolio",
  siteDescription: "Frontend Developer & Problem Solver - Crafting beautiful, functional web experiences",
  siteUrl: "https://sumantsagar.dev",
  author: "Sumant Sagar",
  version: "2.0.0",
  lastUpdated: "2024"
}

// Theme configuration
export const themeConfig = {
  defaultTheme: "light",
  themes: ["light", "dark"],
  colors: {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#06b6d4"
  }
}

// SEO and Meta data
export const seoData = {
  title: "Sumant Sagar - Frontend Developer & Problem Solver",
  description: "Passionate Frontend Developer with expertise in React, JavaScript, and modern web technologies. 200+ DSA problems solved, 15+ projects completed.",
  keywords: [
    "Frontend Developer",
    "React Developer", 
    "JavaScript Developer",
    "Web Developer",
    "UI/UX Designer",
    "Problem Solver",
    "Portfolio",
    "Sumant Sagar"
  ],
  ogImage: "/assets/og-image.png",
  twitterHandle: "@sumantsagar"
}

// Animation configuration
export const animationConfig = {
  pageTransition: {
    duration: 0.5,
    ease: "easeInOut"
  },
  elementAnimation: {
    duration: 0.8,
    stagger: 0.1
  }
}

// Remove default export to avoid import issues
