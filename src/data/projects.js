// Projects Data
export const projectsData = {
  // Featured Projects (to be displayed prominently)
  featured: [
    {
      id: 1,
      title: "Modern Portfolio Website",
      description: "A modern, responsive portfolio website built with React and Vite featuring glassmorphism design elements.",
      longDescription: "This portfolio showcases my skills and projects with a focus on modern UI/UX design. Features include responsive design, smooth animations, dark/light mode, and a clean, professional layout built with the latest web technologies.",
      techStack: ["React", "Vite", "CSS3", "JavaScript", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/portfolio",
      image: "/assets/projects/portfolio.png",
      category: "Web Development",
      status: "Completed",
      featured: true,
      year: "2024",
      highlights: [
        "Modern glassmorphism design",
        "Dark/Light theme toggle",
        "Smooth animations with Framer Motion",
        "Fully responsive layout",
        "Optimized performance with Vite"
      ]
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application with user authentication, shopping cart, and payment integration.",
      longDescription: "Complete online shopping platform with modern UI, cart functionality, user profiles, order tracking, and secure payment processing. Built with React frontend and Node.js backend.",
      techStack: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/ecommerce",
      image: "/assets/projects/ecommerce.png", 
      category: "Full Stack",
      status: "In Progress",
      featured: true,
      year: "2024",
      highlights: [
        "Secure user authentication",
        "Shopping cart functionality",
        "Payment gateway integration",
        "Admin dashboard",
        "Order tracking system"
      ]
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather application with location-based forecasts and interactive maps.",
      longDescription: "Real-time weather information with 7-day forecasts, interactive maps, and location search functionality using OpenWeather API. Features beautiful data visualizations and mobile-first design.",
      techStack: ["JavaScript", "HTML5", "CSS3", "API Integration", "Chart.js"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/weather-app",
      image: "/assets/projects/weather.png",
      category: "Web Development", 
      status: "Completed",
      featured: true,
      year: "2023",
      highlights: [
        "Real-time weather data",
        "7-day forecast",
        "Interactive maps",
        "Location search",
        "Beautiful data visualization"
      ]
    }
  ],

  // All Projects
  all: [
    {
      id: 1,
      title: "Modern Portfolio Website",
      description: "A modern, responsive portfolio website built with React and Vite featuring glassmorphism design elements.",
      longDescription: "This portfolio showcases my skills and projects with a focus on modern UI/UX design. Features include responsive design, smooth animations, dark/light mode, and a clean, professional layout built with the latest web technologies.",
      techStack: ["React", "Vite", "CSS3", "JavaScript", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/portfolio",
      image: "/assets/projects/portfolio.png",
      category: "Web Development",
      status: "Completed",
      featured: true,
      year: "2024"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application with user authentication, shopping cart, and payment integration.",
      longDescription: "Complete online shopping platform with modern UI, cart functionality, user profiles, order tracking, and secure payment processing. Built with React frontend and Node.js backend.",
      techStack: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/ecommerce",
      image: "/assets/projects/ecommerce.png", 
      category: "Full Stack",
      status: "In Progress",
      featured: true,
      year: "2024"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather application with location-based forecasts and interactive maps.",
      longDescription: "Real-time weather information with 7-day forecasts, interactive maps, and location search functionality using OpenWeather API. Features beautiful data visualizations and mobile-first design.",
      techStack: ["JavaScript", "HTML5", "CSS3", "API Integration", "Chart.js"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/weather-app",
      image: "/assets/projects/weather.png",
      category: "Web Development", 
      status: "Completed",
      featured: true,
      year: "2023"
    },
    {
      id: 4,
      title: "Task Management App",
      description: "A productivity app for managing tasks with drag-and-drop functionality and team collaboration.",
      longDescription: "Full-featured task management application with Kanban boards, real-time collaboration, file attachments, and progress tracking.",
      techStack: ["React", "TypeScript", "Firebase", "Material-UI"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/task-manager",
      image: "/assets/projects/task-manager.png",
      category: "Web Development",
      status: "Completed",
      featured: false,
      year: "2023"
    },
    {
      id: 5,
      title: "Recipe Finder App",
      description: "A mobile-responsive app to discover and save recipes with nutritional information.",
      longDescription: "Recipe discovery platform with advanced search, nutritional analysis, meal planning, and social sharing features.",
      techStack: ["React", "CSS3", "Recipe API", "Local Storage"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/recipe-finder",
      image: "/assets/projects/recipe-app.png",
      category: "Web Development",
      status: "Completed",
      featured: false,
      year: "2023"
    }
  ],

  // Project Categories
  categories: [
    "All",
    "Web Development", 
    "Full Stack",
    "Mobile App",
    "UI/UX Design",
    "Data Science"
  ],

  // Project Statistics
  stats: {
    total: 15,
    completed: 12,
    inProgress: 3,
    featured: 3
  }
}

// Helper functions
export const getFeaturedProjects = () => projectsData.featured

export const getAllProjects = () => projectsData.all

export const getProjectsByCategory = (category) => {
  if (category === "All") return projectsData.all
  return projectsData.all.filter(project => project.category === category)
}

export const getProjectById = (id) => projectsData.all.find(project => project.id === id)

export const getLatestProjects = (count = 3) => 
  projectsData.all
    .sort((a, b) => b.year - a.year)
    .slice(0, count)

export default projectsData
