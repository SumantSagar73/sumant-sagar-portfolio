import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { certificates } from '../data/certificates';
import '../styles/components/CertificateWall.css';

const CertificateWall = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Generate stable random tilts for each certificate
  const tilts = useMemo(() => {
    return certificates.map(() => Math.random() * 14 - 7); // -7 to 7 degrees for visible tilt
  }, []);

  return (
    <div className="certificate-wall-container">
      <div className="certificate-wall-grid">
        {certificates.map((cert, index) => {
          return (
            <motion.div
              key={cert.id}
              className="wall-frame"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: tilts[index] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.15, 
                rotate: 0,
                zIndex: 100,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedCertificate(cert)}
            >
              <div className="wall-frame-inner">
                <div className="frame-matting">
                  <div className="cert-content">
                    <div className="cert-header">
                      <span className="cert-icon">🏆</span>
                      <span className="cert-issuer">{cert.issuer}</span>
                    </div>
                    <h3 className="cert-title">{cert.title}</h3>
                    <div className="cert-date">{cert.date}</div>
                    <div className="cert-skills">
                      {cert.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="cert-skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="hanging-string"></div>
              <div className="nail"></div>
            </motion.div>
          );
        })}
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

export default CertificateWall;
