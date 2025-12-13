import React, { Suspense } from 'react';
const CertificateCarousel = React.lazy(() => import('../components/CertificateCarousel'));
const CertificateWall = React.lazy(() => import('../components/CertificateWall'));
import useIsMobile from '../hooks/useIsMobile'
import Loader from '../components/Loader';
import '../styles/pages/Certifications.css';

const Certifications = () => {
  const isMobile = useIsMobile()

  return (
    <div className="certifications-page">
      <Suspense fallback={<Loader message="Loading certificates..." />}>
        {isMobile ? <CertificateWall /> : <CertificateCarousel />}
      </Suspense>

      <div className="certifications-info">
        <div className="info-container">
          <div className="info-section">
            <h3>Professional Development</h3>
            <p>
              Continuous learning and professional development are core to my approach
              as a software developer. These certifications represent my commitment to
              staying current with industry best practices and emerging technologies.
            </p>
          </div>

          <div className="info-section">
            <h3>Technology Stack</h3>
            <div className="tech-categories">
              <div className="tech-category">
                <h4>Cloud Platforms</h4>
                <ul>
                  <li>Amazon Web Services (AWS)</li>
                  <li>Google Cloud Platform (GCP)</li>
                  <li>Microsoft Azure</li>
                </ul>
              </div>

              <div className="tech-category">
                <h4>Development</h4>
                <ul>
                  <li>React & Node.js</li>
                  <li>Python & TypeScript</li>
                  <li>GraphQL & MongoDB</li>
                </ul>
              </div>

              <div className="tech-category">
                <h4>DevOps & Infrastructure</h4>
                <ul>
                  <li>Docker & Kubernetes</li>
                  <li>Terraform & Jenkins</li>
                  <li>CI/CD & Automation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Verification</h3>
            <p>
              All certifications can be verified through their respective issuing
              organizations. Click the "Verify" button on any certificate to access
              the official verification portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
