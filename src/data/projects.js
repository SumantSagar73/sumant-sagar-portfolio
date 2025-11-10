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
    // Replaced 3 dummy projects with real projects from resume
    {
      id: 4,
      title: "SecureVPN",
      description: "Virtual Private Network (VPN) application focused on online security and privacy.",
      longDescription: "Developed a VPN application implementing encryption protocols, a user-friendly interface, server selection, and privacy protections like DNS leak prevention and a kill-switch. Deployed on AWS for scalability and reliability.",
      techStack: ["OpenVPN", "IPSec", "AWS", "Security Protocols"],
      liveUrl: "#",
      githubUrl: "#",
      image: "/assets/projects/securevpn.png",
      category: "Security",
      status: "Completed",
      featured: false,
      year: "2024",
      highlights: [
        "Implemented encryption protocols (OpenVPN/IPSec)",
        "Integrated kill-switch and DNS leak protection",
        "Deployed to AWS for scalability"
      ]
    },
    {
      id: 5,
      title: "Event Management System",
      description: "Full-stack MERN event management platform for discovering, booking, and managing events.",
      longDescription: "Built a full-stack event management platform with responsive frontend, secure authentication, role-based access, RESTful APIs, and admin dashboards. Implemented file uploads and deployed to cloud platforms for live access.",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
      liveUrl: "#",
      githubUrl: "#",
      image: "/assets/projects/event-management.png",
      category: "Full Stack",
      status: "Completed",
      featured: false,
      year: "2025",
      highlights: [
        "Responsive frontend with React and Bootstrap",
        "Role-based authentication with JWT",
        "Organizer/admin dashboards and file uploads"
      ]
    },
    {
      id: 22,
      title: "Dharma Desk – Browser Extension",
      description: "A productivity-focused browser extension turning the new tab into a personal dashboard with task management, goals, and daily quotes.",
      longDescription: "Built a lightweight browser extension that replaces the new tab with a personal dashboard. Features include persistent task tracking using LocalStorage, daily Bhagavad Gita quotes, quick links, and goal tracking. Designed for instant load and cross-browser compatibility.",
      techStack: ["JavaScript", "HTML", "CSS", "LocalStorage", "Browser APIs"],
      liveUrl: "#",
      githubUrl: "#",
      image: "/assets/projects/dharma-desk.png",
      category: "Browser Extension",
      status: "Completed",
      featured: false,
      year: "2025",
      highlights: [
        "Persistent task tracking using LocalStorage",
        "Integrated Bhagavad Gita daily quotes",
        "Responsive, optimized UI for instant load across browsers"
      ]
    },
    {
      id: 23,
      title: "Certify",
      description: "A secure full-stack certificate management app for uploading, indexing, and searching PDFs/images with user isolation.",
      longDescription: "Engineered a secure full-stack application for managing certificates with advanced metadata, search, and bulk operations. Integrated Supabase Authentication (Magic Link & Google Sign-In), storage with Row Level Security, and optimized UI with Tailwind CSS and a HelpTour to guide new users.",
      techStack: ["React", "Vite", "Supabase", "PostgreSQL", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
      image: "/assets/projects/certify.png",
      category: "Full Stack",
      status: "In Progress",
      featured: false,
      year: "2025",
      highlights: [
        "Supabase Authentication and Storage with RLS",
        "Advanced metadata, search, and bulk certificate operations",
        "Improved onboarding with HelpTour and theming"
      ]
    },
    {
      id: 7,
      title: "Cryptocurrency Tracker",
      description: "Real-time cryptocurrency price tracking with portfolio management features.",
      longDescription: "Crypto portfolio tracker with real-time price updates, profit/loss calculations, news integration, and market analysis tools.",
      techStack: ["React", "TypeScript", "Crypto API", "Redux", "Recharts"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/crypto-tracker",
      image: "/assets/projects/crypto-tracker.png",
      category: "Web Development",
      status: "Completed",
      featured: false,
      year: "2024"
    },
    {
      id: 8,
      title: "Learning Management System",
      description: "A complete LMS platform for online education with course management and progress tracking.",
      longDescription: "Full-featured learning platform with video streaming, quiz system, progress tracking, certificates, and instructor dashboard.",
      techStack: ["React", "Node.js", "MongoDB", "AWS S3", "Stripe"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/lms-platform",
      image: "/assets/projects/lms.png",
      category: "Full Stack",
      status: "In Progress",
      featured: false,
      year: "2024"
    },
    {
      id: 9,
      title: "AI Chat Application",
      description: "Intelligent chatbot application with natural language processing capabilities.",
      longDescription: "AI-powered chat application with OpenAI integration, conversation history, and customizable AI personalities.",
      techStack: ["React", "Python", "FastAPI", "OpenAI API", "WebSockets"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/ai-chat-app",
      image: "/assets/projects/ai-chat.png",
      category: "Data Science",
      status: "Completed",
      featured: false,
      year: "2024"
    },
    {
      id: 10,
      title: "Real Estate Platform",
      description: "Property listing and management platform with advanced search and virtual tours.",
      longDescription: "Comprehensive real estate platform with property listings, virtual tours, mortgage calculator, and agent dashboard.",
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Mapbox", "Cloudinary"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/real-estate",
      image: "/assets/projects/real-estate.png",
      category: "Full Stack",
      status: "Completed",
      featured: false,
      year: "2023"
    },
    {
      id: 11,
      title: "Music Streaming App",
      description: "Spotify-like music streaming application with playlists and recommendations.",
      longDescription: "Full-featured music streaming platform with playlist creation, music discovery, social features, and offline listening.",
      techStack: ["React Native", "Node.js", "MongoDB", "Audio API", "Redux"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/music-app",
      image: "/assets/projects/music-app.png",
      category: "Mobile App",
      status: "In Progress",
      featured: false,
      year: "2024"
    },
    {
      id: 12,
      title: "Fitness Tracker Dashboard",
      description: "Health and fitness tracking application with workout plans and progress analytics.",
      longDescription: "Comprehensive fitness platform with workout tracking, nutrition monitoring, goal setting, and progress visualization.",
      techStack: ["React", "Node.js", "MySQL", "Chart.js", "PWA"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/fitness-tracker",
      image: "/assets/projects/fitness-tracker.png",
      category: "Web Development",
      status: "Completed",
      featured: false,
      year: "2023"
    },
    {
      id: 13,
      title: "Event Management System",
      description: "Complete event planning and management platform with booking and payment features.",
      longDescription: "Event management solution with venue booking, ticket sales, attendee management, and event analytics.",
      techStack: ["Vue.js", "Laravel", "MySQL", "Stripe", "Calendar API"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/event-manager",
      image: "/assets/projects/event-manager.png",
      category: "Full Stack",
      status: "Completed",
      featured: false,
      year: "2023"
    },
    {
      id: 14,
      title: "Blog CMS Platform",
      description: "Content management system for bloggers with SEO optimization and analytics.",
      longDescription: "Modern blogging platform with rich text editor, SEO tools, analytics dashboard, and multi-author support.",
      techStack: ["Next.js", "Sanity CMS", "Vercel", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/blog-cms",
      image: "/assets/projects/blog-cms.png",
      category: "Web Development",
      status: "Completed",
      featured: false,
      year: "2024"
    },
    {
      id: 15,
      title: "Inventory Management App",
      description: "Business inventory tracking system with barcode scanning and analytics.",
      longDescription: "Enterprise inventory solution with barcode scanning, stock alerts, supplier management, and detailed reporting.",
      techStack: ["React", "Node.js", "PostgreSQL", "Barcode API", "PDF.js"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/inventory-app",
      image: "/assets/projects/inventory.png",
      category: "Full Stack",
      status: "Completed",
      featured: false,
      year: "2023"
    },
    {
      id: 16,
      title: "Food Delivery App",
      description: "Mobile food delivery application with real-time tracking and payment integration.",
      longDescription: "Complete food delivery solution with restaurant management, order tracking, delivery optimization, and customer reviews.",
      techStack: ["React Native", "Node.js", "MongoDB", "Socket.io", "Google Maps"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/food-delivery",
      image: "/assets/projects/food-delivery.png",
      category: "Mobile App",
      status: "In Progress",
      featured: false,
      year: "2024"
    },
    {
      id: 17,
      title: "Video Conference Platform",
      description: "Zoom-like video conferencing application with screen sharing and recording.",
      longDescription: "Professional video conferencing solution with HD video/audio, screen sharing, recording, and collaboration tools.",
      techStack: ["React", "WebRTC", "Socket.io", "Node.js", "MongoDB"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/video-conference",
      image: "/assets/projects/video-conference.png",
      category: "Web Development",
      status: "Completed",
      featured: false,
      year: "2024"
    },
    {
      id: 18,
      title: "Stock Market Analyzer",
      description: "Financial data analysis tool with stock predictions and portfolio optimization.",
      longDescription: "Advanced stock market analysis platform with ML predictions, portfolio optimization, risk assessment, and trading signals.",
      techStack: ["Python", "React", "TensorFlow", "Alpha Vantage API", "Pandas"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/stock-analyzer",
      image: "/assets/projects/stock-analyzer.png",
      category: "Data Science",
      status: "Completed",
      featured: false,
      year: "2024"
    },
    {
      id: 19,
      title: "Smart Home Dashboard",
      description: "IoT dashboard for controlling and monitoring smart home devices.",
      longDescription: "Comprehensive smart home control center with device automation, energy monitoring, security alerts, and voice control.",
      techStack: ["React", "Python", "Raspberry Pi", "MQTT", "InfluxDB"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/smart-home",
      image: "/assets/projects/smart-home.png",
      category: "Full Stack",
      status: "In Progress",
      featured: false,
      year: "2024"
    },
    {
      id: 20,
      title: "Travel Booking Platform",
      description: "Complete travel booking system with flights, hotels, and itinerary planning.",
      longDescription: "All-in-one travel platform with flight/hotel booking, itinerary planning, expense tracking, and travel recommendations.",
      techStack: ["Angular", "Spring Boot", "PostgreSQL", "Payment Gateway", "Maps API"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/travel-booking",
      image: "/assets/projects/travel-booking.png",
      category: "Full Stack",
      status: "Completed",
      featured: false,
      year: "2023"
    },
    {
      id: 21,
      title: "Design System Library",
      description: "Comprehensive UI component library with design tokens and documentation.",
      longDescription: "Modern design system with reusable components, design tokens, accessibility features, and interactive documentation.",
      techStack: ["React", "Storybook", "Styled Components", "TypeScript", "Figma"],
      liveUrl: "#",
      githubUrl: "https://github.com/SumantSagar73/design-system",
      image: "/assets/projects/design-system.png",
      category: "UI/UX Design",
      status: "Completed",
      featured: false,
      year: "2024"
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
    total: 23,
    completed: 18,
    inProgress: 5,
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
