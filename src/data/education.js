// Education and Certifications
export const educationData = {
  // Formal Education
  degrees: [
    {
      id: 1,
      institution: "Lovely Professional University",
      degree: "Bachelor of Technology",
      field: "Computer Science Engineering",
      startDate: "2020",
      endDate: "2024",
      grade: "8.5 CGPA",
      location: "Punjab, India",
      description: "Focused on software development, data structures, algorithms, and web technologies with specialization in full-stack development.",
      relevantCourses: [
        "Data Structures and Algorithms",
        "Web Development",
        "Database Management Systems",
        "Software Engineering",
        "Computer Networks",
        "Operating Systems",
        "Object-Oriented Programming",
        "Machine Learning Basics"
      ],
      achievements: [
        "Dean's List for 4 consecutive semesters",
        "Best Final Year Project Award in Web Development",
        "Active member of Coding Club and Technical Society",
        "Led team of 5 in Inter-College Programming Competition",
        "Mentored 10+ junior students in programming"
      ],
      logo: "/assets/education/lpu.png"
    }
  ],

  // Certifications
  certifications: [
    {
      id: 2,
      name: "React Developer Certification",
      issuer: "freeCodeCamp",
      issueDate: "2023-08",
      expiryDate: null,
      credentialId: "ABC123XYZ",
      url: "https://freecodecamp.org/certification/sumantsagar/react",
      skills: ["React", "JavaScript", "Frontend Development"],
      logo: "/assets/certifications/freecodecamp.png"
    },
    {
      id: 3,
      name: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp", 
      issueDate: "2023-06",
      expiryDate: null,
      credentialId: "DEF456UVW",
      url: "https://freecodecamp.org/certification/sumantsagar/javascript-algorithms-and-data-structures",
      skills: ["JavaScript", "Algorithms", "Data Structures"],
      logo: "/assets/certifications/freecodecamp.png"
    },
    {
      id: 4,
      name: "Responsive Web Design",
      issuer: "freeCodeCamp",
      issueDate: "2023-04",
      expiryDate: null,
      credentialId: "GHI789RST",
      url: "https://freecodecamp.org/certification/sumantsagar/responsive-web-design",
      skills: ["HTML5", "CSS3", "Responsive Design"],
      logo: "/assets/certifications/freecodecamp.png"
    },
    {
      id: 5,
      name: "Frontend Development Bootcamp",
      issuer: "Coding Ninjas",
      issueDate: "2023-03",
      expiryDate: null,
      credentialId: "CN2023FD789",
      url: "https://certificate.codingninjas.com/sumantsagar",
      skills: ["React", "JavaScript", "CSS3", "Git"],
      logo: "/assets/certifications/coding-ninjas.png"
    }
  ],

  // Online Courses
  courses: [
    {
      id: 6,
      name: "Complete React Developer Course",
      platform: "Udemy",
      instructor: "Andrew Mead",
      completionDate: "2023-02",
      duration: "40 hours",
      skills: ["React", "Redux", "Node.js", "MongoDB"]
    },
    {
      id: 8,
      name: "Advanced CSS and Sass",
      platform: "Udemy", 
      instructor: "Jonas Schmedtmann",
      completionDate: "2022-12",
      duration: "28 hours",
      skills: ["CSS3", "Sass", "Animation", "Flexbox", "Grid"]
    },
    {
      id: 9,
      name: "JavaScript: The Complete Guide",
      platform: "Udemy",
      instructor: "Maximilian Schwarzmüller", 
      completionDate: "2022-10",
      duration: "52 hours",
      skills: ["JavaScript", "ES6+", "DOM", "Async Programming"]
    }
  ],

  // Academic Projects
  academicProjects: [
    {
      id: 10,
      title: "Student Management System",
      description: "Full-stack web application for managing student records with CRUD operations",
      techStack: ["React", "Node.js", "MongoDB", "Express"],
      year: "2024",
      grade: "A+",
      teamSize: 4
    },
    {
      id: 11, 
      title: "Library Management System",
      description: "Database-driven application for library book management",
      techStack: ["PHP", "MySQL", "HTML5", "CSS3"],
      year: "2023",
      grade: "A",
      teamSize: 3
    }
  ]
}

// Helper functions
export const getDegrees = () => educationData.degrees

export const getCertifications = () => educationData.certifications

export const getOnlineCourses = () => educationData.courses

export const getAcademicProjects = () => educationData.academicProjects

export const getLatestDegree = () => 
  educationData.degrees.sort((a, b) => b.endDate - a.endDate)[0]

export const getCertificationsByIssuer = (issuer) =>
  educationData.certifications.filter(cert => cert.issuer === issuer)

export const getTotalCertifications = () => educationData.certifications.length

export const getEducationTimeline = () => [
  ...educationData.degrees.map(deg => ({...deg, type: 'degree'})),
  ...educationData.certifications.map(cert => ({...cert, type: 'certification'}))
].sort((a, b) => new Date(b.endDate || b.issueDate) - new Date(a.endDate || a.issueDate))

export default educationData
