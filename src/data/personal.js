// Personal Information
import { resumeData } from './resume';

export const personalInfo = {
  // Basic Information
  name: resumeData.personalInfo.name,
  title: "Frontend Developer & Problem Solver",
  tagline: "Crafting beautiful, functional web experiences",
  
  // About Me
  bio: `Passionate Frontend Developer with a keen eye for UI/UX design and a strong foundation in modern web technologies. 
        I specialize in creating responsive, user-friendly applications using React and modern JavaScript frameworks.`,
  
  detailedBio: `I'm a dedicated Frontend Developer who loves turning complex problems into simple, beautiful designs. 
                I bring both technical expertise and creative problem-solving to every project.
                
                My journey in web development started with curiosity and has evolved into a passion for creating 
                seamless user experiences. I believe in writing clean, maintainable code and staying updated 
                with the latest industry trends.`,
  
  // Media
  profileImage: "/assets/profile-pic.png",
  // Use the GitHub viewer (blob) so clicking "Preview & Download Resume" opens an in-browser viewer
  resumeUrl: 'https://github.com/SumantSagar73/Resume/blob/main/SumantSagarResume%20(1).pdf',
  
  // Status
  availableForWork: true,
  location: resumeData.personalInfo.location,
  timezone: "IST (UTC+5:30)",
  
  // Quick Stats
  stats: {
    projectsCompleted: "15+",
    dsaProblemseSolved: "200+",
    technologiesUsed: "10+"
  },
  
  // Personal Interests
  interests: [
    "Web Development",
    "UI/UX Design", 
    "Problem Solving",
    "Open Source",
    "Technology Innovation"
  ]
}

export default personalInfo
