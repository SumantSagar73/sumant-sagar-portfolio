// Social Media and Professional Links
import { resumeData } from './resume';

export const socialLinks = {
  // Professional Profiles
  professional: [
    {
      name: "GitHub",
      username: resumeData.personalInfo.github.split('/').pop(), 
      url: `https://${resumeData.personalInfo.github}`,
      icon: "FaGithub",
      color: "#333",
      description: "Code repositories and open source contributions",
      stats: "15+ repositories"
    },
    {
      name: "LinkedIn", 
      username: resumeData.personalInfo.linkedin.split('/').pop(),
      url: `https://${resumeData.personalInfo.linkedin}`,
      icon: "FaLinkedin", 
      color: "#0077B5",
      description: "Professional network and career updates",
      stats: "Professional connections"
    }
  ],

  // Coding Platforms
  coding: [
    {
      name: "LeetCode",
      username: "6073sumant", 
      url: "https://leetcode.com/u/6073sumant/",
      icon: "SiLeetcode",
      color: "#FFA116", 
      description: "Algorithm and data structure problems",
      stats: "200+ problems solved"
    },
    {
      name: "Coding Ninjas",
      username: "sumant6073",
      url: "https://www.naukri.com/code360/profile/sumant6073", 
      icon: "SiCodingninjas",
      color: "#DD6620",
      description: "Competitive programming and courses",
      stats: "Active learner"
    },
    {
      name: "GeeksforGeeks",
      username: "6073sumant",
      url: "https://www.geeksforgeeks.org/user/6073sumant/",
      icon: "SiGeeksforgeeks",
      color: "#0F9D58",
      description: "Programming tutorials and practice",
      stats: "Regular contributor"
    },
    {
      name: "CodeChef",
      username: "sumantsagar",
      url: "https://www.codechef.com/users/sumantsagar",
      icon: "SiCodechef",
      color: "#5B4638",
      description: "Competitive programming platform",
      stats: "Regular participant"
    },
    {
      name: "HackerRank",
      username: "sumantsagar",
      url: "https://www.hackerrank.com/sumantsagar",
      icon: "FaHackerrank",
      color: "#2EC866",
      description: "Programming challenges and assessments",
      stats: "Problem solver"
    }
  ],

  // Social Media (Optional)
  social: [
    {
      name: "Twitter",
      username: "sumantsagar",
      url: "https://twitter.com/sumantsagar",
      icon: "FaTwitter",
      color: "#1DA1F2",
      description: "Tech thoughts and updates",
      stats: "Tech enthusiast"
    }
  ],

  // Portfolio & Personal
  portfolio: [
    {
      name: "Portfolio",
      url: "#",
      icon: "FaGlobe",
      color: "#667eea",
      description: "Personal portfolio website"
    }
  ]
}

// Combined list for easy iteration
export const allSocialLinks = [
  ...socialLinks.professional,
  ...socialLinks.coding,
  ...socialLinks.social,
  ...socialLinks.portfolio
]

// Quick access to main platforms
export const mainSocialLinks = [
  ...socialLinks.professional,
  ...socialLinks.coding.slice(0, 2) // First 2 coding platforms
]

// Helper functions
export const getSocialLinksByCategory = (category) => socialLinks[category] || []

export const getSocialLinkByName = (name) => 
  allSocialLinks.find(link => link.name.toLowerCase() === name.toLowerCase())

export const getProfessionalLinks = () => socialLinks.professional

export const getCodingPlatforms = () => socialLinks.coding

export default socialLinks
