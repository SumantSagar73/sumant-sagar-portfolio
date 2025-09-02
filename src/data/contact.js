// Contact Information and Configuration
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import { resumeData } from './resume';

export const contactInfo = {
  // Primary Contact
  primary: {
    email: resumeData.personalInfo.email,
    phone: resumeData.personalInfo.phone,
    location: resumeData.personalInfo.location,
    timezone: "IST (UTC+5:30)"
  },

  // Alternative Contact Methods
  alternative: {
    linkedIn: `https://${resumeData.personalInfo.linkedin}`,
    github: `https://${resumeData.personalInfo.github}`,
    twitter: "@sumantsagar"
  },

  // Contact Methods with Icons and Actions
  methods: [
    {
      name: "Email",
      value: resumeData.personalInfo.email,
      icon: FaEnvelope,
      color: "#EA4335",
      action: `mailto:${resumeData.personalInfo.email}`,
      description: "Send me an email"
    },
    {
      name: "Phone",
      value: resumeData.personalInfo.phone, 
      icon: FaPhone,
      color: "#25D366",
      action: `tel:${resumeData.personalInfo.phone}`,
      description: "Give me a call"
    },
    {
      name: "LinkedIn",
      value: "Connect on LinkedIn",
      icon: FaLinkedin,
      color: "#0077B5", 
      action: `https://${resumeData.personalInfo.linkedin}`,
      description: "Let's connect professionally"
    },
    {
      name: "GitHub",
      value: "Follow on GitHub",
      icon: FaGithub,
      color: "#333",
      action: `https://${resumeData.personalInfo.github}`,
      description: "Check out my code"
    },
    {
      name: "Location",
      value: resumeData.personalInfo.location,
      icon: FaMapMarkerAlt,
      color: "#FF6B6B",
      action: null,
      description: "Currently based in India"
    },
    {
      name: "Resume",
      value: "Download Resume",
      icon: FaDownload,
      color: "#4ECDC4",
      action: resumeData.resumeUrls.googleDocsPdf,
      description: "Get my latest resume"
    }
  ],

  // Contact Form Configuration
  form: {
    emailService: "EmailJS",
    serviceId: "your_service_id",
    templateId: "your_template_id", 
    publicKey: "your_public_key",
    fields: [
      {
        name: "name",
        type: "text",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
        validation: "text"
      },
      {
        name: "email", 
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email address",
        required: true,
        validation: "email"
      },
      {
        name: "subject",
        type: "text", 
        label: "Subject",
        placeholder: "What's this about?",
        required: true,
        validation: "text"
      },
      {
        name: "message",
        type: "textarea",
        label: "Message",
        placeholder: "Tell me about your project or question...",
        required: true,
        validation: "text",
        rows: 5
      }
    ]
  },

  // Office Hours / Availability
  availability: {
    status: "Available for new projects",
    responseTime: "Within 24 hours",
    workingHours: {
      timezone: "IST",
      days: "Monday - Friday",
      hours: "9:00 AM - 6:00 PM"
    },
    preferredContactMethod: "email"
  },

  // Contact Preferences
  preferences: {
    projectTypes: [
      "Web Development",
      "Frontend Development", 
      "UI/UX Design",
      "React Applications",
      "Portfolio Websites",
      "Landing Pages"
    ],
    minimumBudget: "Negotiable",
    projectDuration: "1 week - 3 months",
    communicationStyle: "Regular updates and transparent communication"
  }
}

// Helper functions
export const getPrimaryEmail = () => contactInfo.primary.email

export const getPrimaryPhone = () => contactInfo.primary.phone

export const getAvailabilityStatus = () => contactInfo.availability.status

export const getContactMethods = () => contactInfo.methods

export const getContactMethodByName = (name) => 
  contactInfo.methods.find(method => method.name.toLowerCase() === name.toLowerCase())

export const getFormFields = () => contactInfo.form.fields

export const getProjectTypes = () => contactInfo.preferences.projectTypes

export default contactInfo
