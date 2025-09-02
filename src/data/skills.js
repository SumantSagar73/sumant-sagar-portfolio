// Skills and Technologies
export const skillsData = {
  // Programming Languages
  programming: [
    { 
      name: "JavaScript", 
      level: "90%", 
      icon: "SiJavascript",
      experience: "2+ years",
      description: "ES6+, Async/Await, DOM Manipulation",
      color: "#F7DF1E"
    },
    { 
      name: "C++", 
      level: "90%", 
      icon: "SiCplusplus",
      experience: "2+ years",
      description: "DSA, Competitive Programming, STL",
      color: "#00599C"
    },
    { 
      name: "Python", 
      level: "85%", 
      icon: "SiPython",
      experience: "2+ years", 
      description: "Data Structures, Algorithms, Automation",
      color: "#3776AB"
    },
    { 
      name: "C#", 
      level: "80%", 
      icon: "DiDotnet",
      experience: "1+ years",
      description: ".NET Framework, OOP Concepts",
      color: "#239120"
    },
    { 
      name: "Kotlin", 
      level: "60%", 
      icon: "SiKotlin",
      experience: "6 months",
      description: "Android Development, JVM Language",
      color: "#7F52FF"
    }
  ],

  // Web Development
  webDev: [
    { 
      name: "React.js", 
      level: "90%", 
      icon: "FaReact",
      experience: "2+ years",
      description: "Hooks, Context API, Component Architecture",
      color: "#61DAFB"
    },
    { 
      name: "HTML5", 
      level: "95%", 
      icon: "FaHtml5",
      experience: "2+ years",
      description: "Semantic HTML, Accessibility, SEO",
      color: "#E34F26"
    },
    { 
      name: "CSS3", 
      level: "90%", 
      icon: "FaCss3Alt",
      experience: "2+ years",
      description: "Flexbox, Grid, Animations, Responsive Design",
      color: "#1572B6"
    },
    { 
      name: "Node.js", 
      level: "60%", 
      icon: "FaNodeJs",
      experience: "6 months",
      description: "Express.js, RESTful APIs, NPM",
      color: "#339933"
    }
  ],

  // Tools & Technologies
  tools: [
    { 
      name: "UI/UX Design", 
      level: "95%", 
      icon: "FaPalette",
      experience: "2+ years",
      description: "Figma, User Research, Prototyping",
      color: "#FF6B6B"
    },
    { 
      name: "Data Structures & Algorithms", 
      level: "90%", 
      icon: "FaCode",
      experience: "2+ years",
      description: "200+ Problems Solved, Optimization",
      color: "#4ECDC4"
    },
    { 
      name: "Git", 
      level: "85%", 
      icon: "FaGitAlt",
      experience: "2+ years",
      description: "Version Control, Branching, Collaboration",
      color: "#F05032"
    },
    { 
      name: "Responsive Design", 
      level: "92%", 
      icon: "FaMobile",
      experience: "2+ years",
      description: "Mobile-First, Cross-Browser Compatibility",
      color: "#764ABC"
    }
  ],

  // Additional Skills
  additional: [
    { 
      name: "TypeScript", 
      level: "70%", 
      icon: "SiTypescript",
      experience: "6 months",
      description: "Type Safety, Interfaces, Generics",
      color: "#3178C6"
    },
    { 
      name: "Sass/SCSS", 
      level: "80%", 
      icon: "FaSass",
      experience: "1+ years",
      description: "Variables, Mixins, Nesting",
      color: "#CC6699"
    },
    { 
      name: "Bootstrap", 
      level: "85%", 
      icon: "FaBootstrap",
      experience: "1+ years",
      description: "Responsive Grid, Components",
      color: "#7952B3"
    },
    { 
      name: "MySQL", 
      level: "65%", 
      icon: "SiMysql",
      experience: "6 months",
      description: "Queries, Joins, Database Design",
      color: "#4479A1"
    }
  ],

  // Soft Skills
  softSkills: [
    "Problem Solving",
    "Team Collaboration", 
    "Project Management",
    "Communication",
    "Adaptability",
    "Creative Thinking",
    "Attention to Detail",
    "Time Management"
  ]
}

// Category titles for display
export const skillCategories = {
  programming: "Programming Languages",
  webDev: "Web Development",
  tools: "Design & Tools",
  additional: "Additional Technologies"
}

// Helper functions
export const getAllSkills = () => [
  ...skillsData.programming,
  ...skillsData.webDev,
  ...skillsData.tools,
  ...skillsData.additional
]

export const getSkillsByCategory = (category) => skillsData[category] || []

export const getFeaturedSkills = () => [
  ...skillsData.programming.slice(0, 3),
  ...skillsData.webDev.slice(0, 3),
  ...skillsData.tools.slice(0, 2)
]

export default skillsData
