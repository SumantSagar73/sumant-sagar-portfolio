// Experience and Work History
export const experienceData = {
  // Work Experience
  work: [
    {
      id: 1,
      company: "Tech Solutions Pvt Ltd",
      position: "Frontend Developer",
      type: "Full-time",
      startDate: "2023-06",
      endDate: "Present",
      location: "Remote",
      description: "Developing responsive web applications using React and modern JavaScript frameworks. Leading frontend initiatives and collaborating with cross-functional teams.",
      achievements: [
        "Built 5+ responsive web applications with 99% uptime",
        "Improved website performance by 40% through optimization",
        "Led a team of 3 junior developers",
        "Implemented modern UI/UX designs increasing user engagement by 60%",
        "Reduced load times by 50% using code splitting and lazy loading"
      ],
      skills: ["React", "JavaScript", "TypeScript", "CSS3", "Git", "Agile"],
      logo: "/assets/companies/tech-solutions.png"
    }
  ],

  // Internships
  internships: [
    {
      id: 1,
      company: "Web Innovations Inc",
      position: "Frontend Developer Intern",
      type: "Internship",
      startDate: "2023-01",
      endDate: "2023-05",
      location: "Hybrid",
      description: "Learned and applied modern web development practices while working on real client projects. Gained hands-on experience with React ecosystem and agile methodologies.",
      achievements: [
        "Completed 3 client projects successfully with 5-star ratings",
        "Mastered React and modern JavaScript ES6+ features",
        "Gained experience in responsive design and mobile-first approach",
        "Collaborated with senior developers using Git workflow",
        "Received 'Best Intern' award for outstanding performance"
      ],
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Git", "Figma"],
      logo: "/assets/companies/web-innovations.png"
    }
  ],

  // Freelance/Projects
  freelance: [
    {
      id: 1,
      client: "Local Restaurant Chain",
      project: "Restaurant Website & Online Ordering",
      type: "Freelance",
      startDate: "2022-09",
      endDate: "2022-11",
      description: "Created a modern, responsive website with online ordering system for a local restaurant chain.",
      achievements: [
        "Increased online orders by 150% within first month",
        "Implemented SEO best practices resulting in 200% increase in organic traffic",
        "Mobile-first responsive design with 98% mobile compatibility",
        "Client satisfaction: 5/5 stars with bonus payment",
        "Ongoing maintenance contract secured"
      ],
      skills: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      payment: "Completed",
      testimonial: "Sumant delivered exactly what we needed and more. Professional, timely, and excellent quality work."
    },
    {
      id: 2,
      client: "Digital Marketing Agency",
      project: "Portfolio Websites for Clients",
      type: "Freelance",
      startDate: "2022-12",
      endDate: "2023-02",
      description: "Developed multiple portfolio websites for the agency's clients across different industries.",
      achievements: [
        "Created 8 unique portfolio designs",
        "100% client approval rate",
        "Established reusable component library",
        "Reduced development time by 40% through optimization"
      ],
      skills: ["React", "CSS3", "JavaScript", "Figma"],
      payment: "Completed"
    }
  ],

  // Volunteer Work
  volunteer: [
    {
      id: 1,
      organization: "Code for Good Foundation",
      role: "Web Developer Volunteer",
      startDate: "2022-06",
      endDate: "2022-12",
      description: "Volunteered to build websites for non-profit organizations and social causes.",
      impact: "Helped 3 NGOs establish their online presence, reaching 5000+ beneficiaries",
      skills: ["HTML5", "CSS3", "JavaScript", "WordPress"],
      achievements: [
        "Built websites for 3 NGOs completely free of cost",
        "Trained 5 volunteers in basic web development",
        "Organized 2 coding workshops for underprivileged students"
      ]
    }
  ]
}

// Helper functions
export const getAllExperience = () => [
  ...experienceData.work,
  ...experienceData.internships,
  ...experienceData.freelance
]

export const getCurrentJob = () => 
  experienceData.work.find(job => job.endDate === "Present")

export const getTotalExperience = () => {
  // Calculate total years of experience
  const allExp = getAllExperience()
  return "2+ years"
}

export const getWorkExperience = () => experienceData.work

export const getInternships = () => experienceData.internships

export const getFreelanceWork = () => experienceData.freelance

export const getVolunteerWork = () => experienceData.volunteer

export const getExperienceByType = (type) => {
  switch(type) {
    case 'work': return experienceData.work
    case 'internship': return experienceData.internships
    case 'freelance': return experienceData.freelance
    case 'volunteer': return experienceData.volunteer
    default: return getAllExperience()
  }
}

export default experienceData
