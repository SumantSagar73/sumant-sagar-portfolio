import React, { useState, useEffect, useRef } from 'react';
import { certificates } from '../data/certificates';
import { FaExpand, FaCompress } from 'react-icons/fa';
import '../styles/components/CertificateCarousel.css';

const CertificateCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);

  // Calculate total scrollable height
  const totalCertificates = certificates.length;
  const scrollableHeight = 3000; // Virtual scroll height for smooth rotation

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId;
    let scrollTimeout;
    let hasScrolled = false;

    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const scrollTop = container.scrollTop;
        const maxScroll = container.scrollHeight - container.clientHeight;
        const scrollPercent = maxScroll > 0 ? scrollTop / maxScroll : 0;
        setScrollPosition(scrollPercent);
        rafId = null;

        // On first scroll within the container, center the section
        if (!hasScrolled && scrollTop > 0) {
          hasScrolled = true;
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            const wrapper = wrapperRef.current;
            if (wrapper) {
              wrapper.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });
            }
          }, 150);
        }
      });
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(scrollTimeout);
    };
  }, [isFullscreen]);

  // Intersection Observer to detect when section comes into view
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
        
        // When section comes into view, scroll it to center
        if (entry.isIntersecting && !isFullscreen) {
          setTimeout(() => {
            wrapper.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }, 100);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '-10% 0px -10% 0px' // Add some margin for better detection
      }
    );

    observer.observe(wrapper);
    return () => observer.unobserve(wrapper);
  }, [isFullscreen]);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Calculate rotation for each certificate - arranged like spokes facing center
  const getCardTransform = (index) => {
    const baseAngle = (360 / totalCertificates) * index;
    const rotationOffset = scrollPosition * 360 * 2; // 2 full rotations
    const finalAngle = baseAngle + rotationOffset;
    
    const radius = isFullscreen ? 500 : 400; // Increased radius in fullscreen
    
    // Calculate position on the circle
    const angleInRadians = (finalAngle * Math.PI) / 180;
    const x = Math.sin(angleInRadians) * radius;
    const z = Math.cos(angleInRadians) * radius;
    
    // Calculate Y position for slight vertical variation (optional)
    const y = Math.sin(angleInRadians * 2) * 20; // Slight wave effect
    
    // Card rotation: rotate so LEFT edge faces the center (like spokes on a wheel)
    // Each card should be rotated so that its LEFT (or RIGHT) edge faces the center of the circle.
    // The cards should be evenly spaced around the circle like spokes on a wheel.
    const cardRotationY = finalAngle + 90; // Rotate 90° so left edge faces center
    
    // Add hover effect - move outward from center
    const hoverMultiplier = hoveredCard === index ? 1.2 : 1;
    const hoverX = x * hoverMultiplier;
    const hoverZ = z * hoverMultiplier;
    const hoverY = y + (hoveredCard === index ? 30 : 0);
    
    return {
      transform: `
        translate3d(${hoverX}px, ${hoverY}px, ${hoverZ}px) 
        rotateY(${cardRotationY}deg) 
        rotateX(0deg)
      `,
      opacity: 1, // Keep all cards fully visible
      zIndex: Math.round(z + 500) // Ensure proper layering
    };
  };

  return (
    <div 
      className={`certificate-carousel-wrapper ${isFullscreen ? 'fullscreen' : ''}`} 
      ref={wrapperRef}
    >
      <button 
        className="fullscreen-toggle-btn"
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        title={isFullscreen ? "Exit Fullscreen (Esc)" : "View Fullscreen"}
      >
        {isFullscreen ? <FaCompress /> : <FaExpand />}
        <span className="fullscreen-hint">
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
        </span>
      </button>
      
      <div 
        ref={containerRef}
        className="certificate-carousel-container"
      >
        <div 
          ref={contentRef}
          className="certificate-carousel-content"
          style={{ height: `${scrollableHeight}px` }}
        >
          <div className="certificate-carousel-scene">
            <div className="certificate-carousel-circle">
              {certificates.map((certificate, index) => {
                const style = getCardTransform(index);
                
                return (
                  <div
                    key={certificate.id}
                    className={`certificate-card ${hoveredCard === index ? 'hovered' : ''}`}
                    style={style}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setSelectedCertificate(certificate)}
                  >
                    <div className="certificate-card-inner">
                      <div className="certificate-front">
                        <div className="certificate-header">
                          <div className="certificate-logo">
                            <span className="cert-icon">🏆</span>
                          </div>
                          <div className="certificate-issuer">
                            {certificate.issuer}
                          </div>
                        </div>
                        
                        <div className="certificate-body">
                          <h3 className="certificate-title">
                            {certificate.title}
                          </h3>
                          <div className="certificate-credential">
                            Credential ID: {certificate.credential}
                          </div>
                          <div className="certificate-date">
                            Issued: {certificate.date}
                          </div>
                        </div>
                        
                        <div className="certificate-skills">
                          {certificate.skills.slice(0, 3).map((skill, skillIndex) => (
                            <span key={skillIndex} className="skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Add back side with same content for visibility from all angles */}
                      <div className="certificate-back">
                        <div className="certificate-header">
                          <div className="certificate-logo">
                            <span className="cert-icon">🏆</span>
                          </div>
                          <div className="certificate-issuer">
                            {certificate.issuer}
                          </div>
                        </div>
                        
                        <div className="certificate-body">
                          <h3 className="certificate-title">
                            {certificate.title}
                          </h3>
                          <div className="certificate-credential">
                            Credential ID: {certificate.credential}
                          </div>
                          <div className="certificate-date">
                            Issued: {certificate.date}
                          </div>
                        </div>
                        
                        <div className="certificate-skills">
                          {certificate.skills.slice(0, 3).map((skill, skillIndex) => (
                            <span key={skillIndex} className="skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <div className="certificate-modal-overlay" onClick={() => setSelectedCertificate(null)}>
          <div className="certificate-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedCertificate(null)}
              aria-label="Close modal"
            >
              ×
            </button>
            
            <div className="modal-header">
              <div className="modal-logo">
                <span className="modal-cert-icon">🏆</span>
              </div>
              <div className="modal-issuer">
                {selectedCertificate.issuer}
              </div>
            </div>
            
            <div className="modal-body">
              <h2 className="modal-title">
                {selectedCertificate.title}
              </h2>
              
              <div className="modal-details">
                <div className="detail-item">
                  <span className="detail-label">Credential ID:</span>
                  <span className="detail-value">{selectedCertificate.credential}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Issued:</span>
                  <span className="detail-value">{selectedCertificate.date}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Skills Covered:</span>
                  <div className="modal-skills">
                    {selectedCertificate.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="modal-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="modal-description">
                <h3>About This Certification</h3>
                <p>
                  This certification validates expertise in {selectedCertificate.title.toLowerCase()} 
                  and demonstrates proficiency in the associated technologies and methodologies. 
                  It represents a commitment to professional development and staying current 
                  with industry standards.
                </p>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="modal-close-action"
                  onClick={() => setSelectedCertificate(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateCarousel;
