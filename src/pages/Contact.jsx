import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaDownload, FaClock, FaCheckCircle, FaPaperPlane } from 'react-icons/fa'
import { contactInfo, getContactMethods } from '../data/contact'
import emailjs from '@emailjs/browser'
import '../styles/pages/Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus('')

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error')
      setIsSubmitting(false)
      console.error('Form validation failed: Missing required fields')
      return
    }

    try {
      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      // Validate environment variables
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing. Please check your environment variables.')
      }

      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_subject: formData.subject || 'Contact from Portfolio',
        user_message: formData.message,
        to_name: 'Sumant Sagar'
      }

      console.log('Sending email with params:', templateParams)
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      setFormStatus('success')
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('EmailJS error:', error)
      console.error('Error details:', error.text || error.message)
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = getContactMethods()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <motion.div 
          className="page-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="page-title" variants={itemVariants}>
            Get In Touch
          </motion.h1>
          
          <motion.p className="page-description" variants={itemVariants}>
            Let's discuss your next project or collaboration. I'm always open to new opportunities.
          </motion.p>

          <div className="contact-content">
            {/* Contact Information */}
            <motion.div className="contact-info-section" variants={itemVariants}>
              <h2 className="section-title">Contact Information</h2>
              
              <div className="contact-methods">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.name}
                    className="contact-method"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="method-icon" style={{ color: method.color }}>
                      <method.icon />
                    </div>
                    <div className="method-info">
                      <h3 className="method-name">{method.name}</h3>
                      <p className="method-value">{method.value}</p>
                      <p className="method-description">{method.description}</p>
                    </div>
                    {method.action && (
                      <a 
                        href={method.action} 
                        target={method.action.startsWith('http') ? '_blank' : '_self'}
                        rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="method-action"
                      >
                        →
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Availability Status */}
              <motion.div 
                className="availability-card"
                variants={itemVariants}
              >
                <div className="availability-header">
                  <FaCheckCircle className="status-icon" />
                  <h3>{contactInfo.availability.status}</h3>
                </div>
                <div className="availability-details">
                  <div className="detail-item">
                    <FaClock />
                    <span>Response time: {contactInfo.availability.responseTime}</span>
                  </div>
                  <div className="detail-item">
                    <FaMapMarkerAlt />
                    <span>Location: {contactInfo.primary.location}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div className="contact-form-section" variants={itemVariants}>
              <h2 className="section-title">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="contact-form">
                {contactInfo.form.fields.map((field) => (
                  <div key={field.name} className="form-group">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                      {field.required && <span className="required">*</span>}
                    </label>
                    
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={field.rows || 4}
                        className="form-textarea"
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="form-input"
                      />
                    )}
                  </div>
                ))}
                
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? <FaClock /> : <FaPaperPlane />}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {formStatus === 'success' && (
                  <div className="form-status success">
                    <FaCheckCircle />
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="form-status error">
                    <FaEnvelope />
                    Failed to send message. Please check the console for details or contact me directly.
                  </div>
                )}
              </form>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div className="additional-info" variants={itemVariants}>
            <h2 className="section-title">What I Can Help With</h2>
            <div className="services-grid">
              {contactInfo.preferences.projectTypes.map((type, index) => (
                <motion.div
                  key={type}
                  className="service-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                >
                  {type}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Contact
