import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaClock, FaCheckCircle, FaPaperPlane, FaMapMarkerAlt } from 'react-icons/fa'
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

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error')
      setIsSubmitting(false)
      return
    }

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing')
      }

      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_subject: formData.subject || 'Contact from Portfolio',
        user_message: formData.message,
        to_name: 'Sumant Sagar'
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      setFormStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = getContactMethods()

  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="page-content">
          <motion.h1 
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get In Touch
          </motion.h1>
          
          <motion.p 
            className="page-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let's discuss your next project or collaboration. I'm always open to new opportunities.
          </motion.p>

          <div className="contact-content">
            {/* Contact Information */}
            <motion.div 
              className="contact-info-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="contact-methods" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
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

              {/* Availability Status - Kept subtle, no explicit text */}
              <motion.div 
                className="availability-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ marginTop: '1rem', padding: '0.75rem 1rem' }}
              >
                <div className="availability-header" style={{ marginBottom: 0 }}>
                  <FaCheckCircle className="status-icon" />
                  <h3 style={{ fontSize: '0.95rem', margin: 0 }}>Open to collaboration</h3>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="contact-form-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="section-title" style={{ fontSize: '1.5rem' }}>Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="contact-form" style={{ gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      className="form-input"
                      style={{ padding: '0.8rem' }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="form-input"
                      style={{ padding: '0.8rem' }}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="form-input"
                    style={{ padding: '0.8rem' }}
                  />
                </div>
                
                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    required
                    rows={4}
                    className="form-textarea"
                    style={{ padding: '0.8rem', minHeight: '100px' }}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%' }}>
                  {isSubmitting ? <FaClock /> : <FaPaperPlane />}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {formStatus === 'success' && (
                  <div className="form-status success">
                    <FaCheckCircle /> Message sent!
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="form-status error">
                    <FaEnvelope /> Failed to send.
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Contact
