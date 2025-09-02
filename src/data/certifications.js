// Certifications and Achievements Data
export const certificationsData = {
  title: "Certifications & Achievements",
  description: "Professional certifications and achievements that validate my technical expertise",
  categories: {
    technical: {
      title: "Technical Certifications",
      items: [
        // Add your actual certifications here later
        {
          id: 1,
          name: "Example Certification",
          issuer: "Certification Authority",
          date: "2024",
          credentialId: "ABC123",
          status: "Active",
          icon: "FaCertificate",
          url: "#",
          skills: ["Skill 1", "Skill 2"],
          description: "This is a placeholder for future certifications"
        }
      ]
    },
    courses: {
      title: "Online Courses",
      items: [
        // Add your completed courses here later
        {
          id: 2,
          name: "Example Course",
          provider: "Course Platform",
          date: "2024",
          duration: "40 hours",
          status: "Completed",
          icon: "FaGraduationCap",
          url: "#",
          skills: ["React", "JavaScript"],
          description: "Comprehensive course covering modern web development"
        }
      ]
    },
    achievements: {
      title: "Coding Achievements",
      items: [
        // Add your coding platform achievements here later
        {
          id: 3,
          name: "Problem Solving Badge",
          platform: "LeetCode",
          date: "2024",
          rank: "Expert",
          status: "Earned",
          icon: "FaTrophy",
          url: "#",
          description: "Solved 200+ algorithmic problems"
        }
      ]
    }
  }
}

// Helper functions
export const getAllCertifications = () => {
  return Object.values(certificationsData.categories).flatMap(category => category.items)
}

export const getCertificationsByCategory = (categoryKey) => {
  return certificationsData.categories[categoryKey]?.items || []
}

export const getCertificationById = (id) => {
  return getAllCertifications().find(cert => cert.id === id)
}

export default certificationsData
