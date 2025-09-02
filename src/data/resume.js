// Resume Data - Centralized data source for resume information
export const resumeData = {
  // Personal Information
  personalInfo: {
    name: "Sumant Sagar",
    title: "Software Developer",
    phone: "+918969910507",
    email: "6073sumant@gmail.com",
    linkedin: "linkedin.com/in/sumantsagar73",
    github: "github.com/SumantSagar73",
    location: "India"
  },

  // Education
  education: [
    {
      id: 1,
      institution: "VIT Bhopal University",
      location: "Bhopal, Madhya Pradesh",
      degree: "BTech",
      expectedGraduation: "Expected May 2026",
      major: "Computer Science",
      minor: "Cyber Security and Digital Forensics",
      cgpa: "8.51",
      maxCgpa: "10"
    },
    {
      id: 2,
      institution: "Sainik School Bhubaneswar",
      location: "Bhubaneswar, Odisha",
      level: "12th Standard",
      board: "CBSE",
      percentage: "73%",
      year: "Jul 2022"
    },
    {
      id: 3,
      institution: "Sainik School Bhubaneswar",
      location: "Bhubaneswar, Odisha",
      level: "10th Standard",
      board: "CBSE",
      percentage: "89%",
      year: "Jul 2020"
    }
  ],

  // Projects
  projects: [
    {
      id: 1,
      title: "SecureVPN",
      duration: "August 2023 – November 2024",
      description: "Developed a Virtual Private Network (VPN) application aimed at enhancing online security and privacy for users.",
      keyContributions: [
        "Implemented encryption protocols (e.g., OpenVPN, IPSec) to secure data transmission.",
        "Developed a user-friendly interface with options for server selection and connection status monitoring.",
        "Integrated features like kill-switch and DNS leak protection to ensure robust security.",
        "Deployed on AWS to provide scalable and reliable VPN services."
      ],
      technologies: ["OpenVPN", "IPSec", "AWS", "Security Protocols"]
    },
    {
      id: 2,
      title: "Event Management System",
      duration: "January 2025 – April 2025",
      description: "Built a full-stack event management platform using the MERN stack, enabling users to discover, book, and manage events.",
      keyContributions: [
        "Developed a responsive and dynamic frontend with React.js, Bootstrap 5, and Context API.",
        "Implemented secure user authentication and role-based access control using JWT and bcrypt.",
        "Designed RESTful APIs with Express.js and Node.js for events, tickets, and user operations.",
        "Integrated MongoDB with Mongoose to store and manage user, event, and ticket data efficiently.",
        "Built organizer and admin dashboards for analytics, content moderation, and system configuration.",
        "Implemented file uploads for event media using Multer and Axios.",
        "Conducted end-to-end testing and deployed on Netlify and Render for live access."
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Bootstrap 5", "Netlify", "Render"]
    }
  ],

  // Technical Skills
  technicalSkills: {
    programmingLanguages: ["Java", "C++", "C#", "Python", "Kotlin", "Javascript", "HTML", "CSS"],
    softwareDevelopment: ["Object-Oriented Programming", "Data Structures & Algorithms", "Git/GitHub", "React"],
    tools: ["Git for version control"],
    spokenLanguages: ["Hindi", "English"]
  },

  // Certifications
  certifications: [
    {
      id: 1,
      title: "DSA Course by Striver",
      description: "Completed a comprehensive course on Data Structures and Algorithms.",
      issuer: "Striver",
      year: "2024"
    },
    {
      id: 2,
      title: "The Bits and Bytes of Computer Networking",
      description: "Gained a solid understanding of networking fundamentals.",
      issuer: "Coursera",
      year: "2024"
    }
  ],

  // Extracurricular Activities
  extracurricular: [
    {
      id: 1,
      activity: "National Cadet Corps",
      duration: "Feb 2020 - July 2022",
      description: "NCC instilled teamwork, fostering strong bonds and shared goals among members."
    }
  ],

  // Hobbies
  hobbies: [
    {
      id: 1,
      title: "Reading Fiction novels and self help books",
      description: "Actively engaged in self-help literature, gaining insights into personal development, motivation, and mental well-being."
    }
  ],

  // Resume URLs
  resumeUrls: {
    googleDocsView: "https://docs.google.com/document/d/1TLLRqbqCgAVSA_OLNBiMEcco46smNx47wWk6zhzTjak/edit?usp=sharing",
    googleDocsPdf: "https://docs.google.com/document/d/1TLLRqbqCgAVSA_OLNBiMEcco46smNx47wWk6zhzTjak/export?format=pdf"
  }
};
