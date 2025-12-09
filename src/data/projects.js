// Projects Data
export const projectsData = {
  all: [
    // ⭐ Featured Main Projects
    {
      id: 1,
      title: "Certify – Certificate Management Platform",
      description: "A secure digital certificate management platform with public verification, metadata, and embeddable widgets.",
      longDescription: "Certify is a secure certificate management platform enabling users to upload certificates with metadata and visibility controls, verify certificates publicly via signed URLs, and share public profiles with customizable layouts.",
      techStack: ["React", "Vite", "Tailwind CSS", "Zustand", "Node.js", "Express.js", "MongoDB", "Passport.js", "JWT", "Supabase Storage", "Axios", "Vercel", "Render"],
      liveUrl: "https://certify-app-beta.vercel.app/",
      githubUrl: "https://certify-app-beta.vercel.app/",
      image: "/assets/projects/certify.png",
      bgImage: "https://source.unsplash.com/1200x800/?certificate,documents",
      category: "Full Stack",
      status: "Completed",
      featured: true,
      year: "2025"
    },
    {
      id: 2,
      title: "Margadarshak – Career Guidance Platform",
      description: "personalized career roadmap platform using visual drag-and-drop nodes.",
      longDescription: "Margadarshak helps users design personalized learning journeys via a drag-and-drop roadmap editor powered by React Flow. Includes curated resources, admin dashboards, analytics, and optional AI using Gemini.",
      techStack: ["React", "Vite", "Tailwind CSS", "React Flow", "MongoDB", "Node.js", "Express.js", "Recharts", "React-Quill", "Zustand"],
      liveUrl: "#",
      githubUrl: "#",
      
      image: "/assets/projects/margdarshak.png",
      bgImage: "https://source.unsplash.com/1200x800/?career,growth",
      category: "Full Stack",
      status: "In Progress",
      featured: true,
      year: "2025"
    },
    {
      id: 3,
      title: "FunCertificatesProj – Interactive Certificates Board",
      description: "Interactive draggable board for playful certificate display with counters and reactions.",
      longDescription: "Displays certificates as draggable sticky notes on a full-screen animated board with visitor counter and reaction system.",
      techStack: ["React", "Vite", "Drag-and-Drop API", "CSS Animations", "Serverless Functions"],
      liveUrl: "https://fun-certificates-proj.vercel.app/",
      githubUrl: "https://github.com/SumantSagar73/fun-certificates-proj",
      image: "/assets/projects/fun-certificates.png",
      bgImage: "https://source.unsplash.com/1200x800/?sticky-notes,board",
      category: "Web Development",
      status: "Completed",
      featured: false,
      year: "2025"
    },

    // 🔹 Main Existing Project
    {
      id: 4,
      title: "Modern Portfolio Website",
      description: "Responsive glassmorphism portfolio built with React and Vite.",
      longDescription: "Modern portfolio website with animations, dark/light theme and aesthetic UI.",
      techStack: ["React", "Vite", "CSS3", "JavaScript", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      image: "/assets/projects/portfolio.png",
      category: "Web Development",
      status: "Completed",
      featured: true,
      year: "2024"
    },

    // 🎮 Vanilla JavaScript Projects (2024)
    {
      id: 5,
      title: "Tic Tac Toe",
      description: "Classic Tic Tac Toe game with win tracking and restart.",
      longDescription: "Interactive Tic Tac Toe browser game with win/draw logic and responsive layout.",
      techStack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://sumantsagar73.github.io/Odin-TicTacToe/",
      githubUrl: "https://github.com/SumantSagar73/Odin-TicTacToe",
      image: "/assets/projects/tictactoe.png",
      category: "Game",
      status: "Completed",
      year: "2024"
    },
    {
      id: 6,
      title: "Basketball Scoreboard",
      description: "Digital basketball scoreboard with score control buttons and reset.",
      longDescription: "Simple scoring system with score increment buttons and reset functionality.",
      techStack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://sumantsagar73.github.io/BasketBall-ScoreCard/",
      githubUrl: "https://github.com/SumantSagar73/BasketBall-ScoreCard",
      image: "/assets/projects/scoreboard.png",
      category: "JavaScript",
      status: "Completed",
      year: "2024"
    },
    {
      id: 7,
      title: "Random Password Generator",
      description: "Generate secure random passwords with copy functionality.",
      longDescription: "Random password generator with length control and clipboard copy support.",
      techStack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://sumantsagar73.github.io/Random-Password-Generator/",
      githubUrl: "https://github.com/SumantSagar73/Random-Password-Generator/settings/pages",
      image: "/assets/projects/passwordgen.png",
      category: "Tools",
      status: "Completed",
      year: "2024"
    },
    {
      id: 8,
      title: "My Library",
      description: "Personal library storage app using LocalStorage.",
      longDescription: "CRUD-based app to store books, author info, read status, and data persistence.",
      techStack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://sumantsagar73.github.io/Odin-library-app/",
      githubUrl: "https://github.com/SumantSagar73/Odin-library-app",
      image: "/assets/projects/library.png",
      category: "Web Development",
      status: "Completed",
      year: "2024"
    },
    {
      id: 9,
      title: "Calculator",
      description: "Functional calculator with basic arithmetic operations.",
      longDescription: "Responsive calculator supporting addition, subtraction, multiplication, division and keyboard input.",
      techStack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://sumantsagar73.github.io/odin-Project-Calculator/",
      githubUrl: "https://github.com/SumantSagar73/odin-Project-Calculator",
      image: "/assets/projects/calculator.png",
      category: "JavaScript",
      status: "Completed",
      year: "2024"
    },
    {
      id: 10,
      title: "Etch-a-Sketch",
      description: "Interactive sketch board with grid and color modes.",
      longDescription: "Drawing app with adjustable grid & rainbow color effect built using vanilla JS.",
      techStack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://sumantsagar73.github.io/odin-Etch-a-Sketch/",
      githubUrl: "https://github.com/SumantSagar73/odin-Etch-a-Sketch",
      image: "/assets/projects/etchasketch.png",
      category: "Interaction",
      status: "Completed",
      year: "2024"
    },
    {
      id: 11,
      title: "Rock Paper Scissors",
      description: "Classic Rock Paper Scissors game with score tracking.",
      longDescription: "Interactive RPS game with animated UI feedback and live scoring.",
      techStack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://sumantsagar73.github.io/odin-rock-paper-scissiors/",
      githubUrl: "https://github.com/SumantSagar73/odin-rock-paper-scissiors",
      image: "/assets/projects/rps.png",
      category: "Game",
      status: "Completed",
      year: "2024"
    }
  ],

  categories: ["All", "Full Stack", "Web Development", "JavaScript", "Game", "Tools", "Interaction"],

  stats: {}
}

// Auto Stats Calculation
projectsData.stats = {
  total: projectsData.all.length,
  completed: projectsData.all.filter(p => p.status === "Completed").length,
  inProgress: projectsData.all.filter(p => p.status === "In Progress").length,
  featured: projectsData.all.filter(p => p.featured).length
}

// Helper Functions
export const getFeaturedProjects = () =>
  projectsData.all.filter(p => p.featured)

export const getAllProjects = () => projectsData.all

export const getProjectsByCategory = (category) =>
  category === "All" ? projectsData.all :
  projectsData.all.filter(project => project.category === category)

export const getProjectById = (id) =>
  projectsData.all.find(project => project.id === id)

export const getLatestProjects = (count = 3) =>
  [...projectsData.all].sort((a, b) => Number(b.year) - Number(a.year)).slice(0, count)

export default projectsData
