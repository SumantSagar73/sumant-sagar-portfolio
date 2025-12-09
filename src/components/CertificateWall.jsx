import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { certificates } from '../data/certificates';
import CertificateCardBackground from './CertificateCardBackground';
import '../styles/components/CertificateWall.css';
import '../styles/components/CertificateModal.css';
import { useCertificates } from '../context/CertificateContext';

const CertificateWall = () => {
  const { certificates } = useCertificates();
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Generate stable random tilts for each certificate
  const tilts = useMemo(() => {
    return certificates.map(() => Math.random() * 14 - 7); // -7 to 7 degrees for visible tilt
  }, [certificates]);

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
                  <CertificateCardBackground imageUrl={cert.image} />
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

            <div className="modal-content-wrapper">
              <div className="modal-image-section">
                <div className="modal-image-container">
                  <CertificateCardBackground imageUrl={selectedCertificate.image} width={800} />
                </div>
              </div>

              <div className="modal-details-section">
                <div className="modal-issuer-badge">
                  {selectedCertificate.issuer}
                </div>

                <h2 className="modal-title">
                  {selectedCertificate.title}
                </h2>

                <div className="modal-meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Issued</span>
                    <span className="meta-value">{selectedCertificate.date}</span>
                  </div>

                  <div className="meta-item">
                    <span className="meta-label">Skills</span>
                    <div className="modal-skills-list">
                      {selectedCertificate.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="skill-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-description">
                  <h3>About This Certification</h3>
                  <p>
                    This certification validates expertise in {selectedCertificate.title}
                    and demonstrates proficiency in the associated technologies and methodologies.
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    className="modal-btn modal-btn-secondary"
                    onClick={() => setSelectedCertificate(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateWall;
