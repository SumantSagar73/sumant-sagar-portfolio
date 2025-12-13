import React, { useState, useEffect, useRef, Suspense } from 'react';
import useIsMobile from '../hooks/useIsMobile'
// import { certificates } from '../data/certificates';
import { FaExpand, FaCompress, FaPlay, FaPause } from 'react-icons/fa';
const CertificateCardBackground = React.lazy(() => import('./CertificateCardBackground'));
import Loader from './Loader';
import '../styles/components/CertificateCarousel.css';
import '../styles/components/CertificateCarouselLoading.css';
import '../styles/components/CertificateModal.css';
import { useCertificates } from '../context/CertificateContext';

const CertificateCarousel = () => {
  const { certificates, loading } = useCertificates();
  const isMobile = useIsMobile()
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loadedIds, setLoadedIds] = useState(new Set());
  const [forceShow, setForceShow] = useState(false);

  const handleImageLoad = (id) => {
    setLoadedIds(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  // Reset loaded state when certificates change
  useEffect(() => {
    setLoadedIds(new Set());
    setForceShow(false);
  }, [certificates]);

  const allImagesLoaded = certificates.length > 0 && certificates.every(cert => loadedIds.has(cert.id));
  const isLoading = (loading || (certificates.length > 0 && !allImagesLoaded)) && !forceShow;

  // Safety timeout to prevent infinite loading
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setForceShow(true);
      }, 8000); // 8 seconds timeout
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  const [isInView, setIsInView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [autoRotation, setAutoRotation] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);
  const isScrolling = useRef(false);
  const rotationSpeed = useRef(0); // Current rotation speed
  const lastTime = useRef(0); // For smooth delta time animation

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
      // Set scrolling state
      isScrolling.current = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling.current = false;
      }, 150);

      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const scrollTop = container.scrollTop;
        const maxScroll = container.scrollHeight - container.clientHeight;
        const scrollPercent = maxScroll > 0 ? scrollTop / maxScroll : 0;
        setScrollPosition(scrollPercent);
        rafId = null;

        // On first scroll within the container, mark that the user has scrolled
        if (!hasScrolled && scrollTop > 0) {
          hasScrolled = true;
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

  // Auto-rotation effect with smooth inertia
  useEffect(() => {
    let animationFrameId;

    const animate = (time) => {
      if (lastTime.current === 0) {
        lastTime.current = time;
      }

      // Target speed: 0.2 when rotating, 0 when paused or hovered
      const targetSpeed = (isAutoRotating && hoveredCard === null) ? 0.2 : 0;

      // Smoothly interpolate current speed towards target speed (inertia)
      // 0.05 is the interpolation factor - lower means more inertia/smoother stop
      rotationSpeed.current += (targetSpeed - rotationSpeed.current) * 0.05;

      // Only update if there's significant movement
      if (Math.abs(rotationSpeed.current) > 0.001) {
        setAutoRotation(prev => prev + rotationSpeed.current);
      }

      lastTime.current = time;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isAutoRotating, hoveredCard]);

  // Intersection Observer to detect when section comes into view
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
        // Note: we intentionally do not auto-scroll here to avoid
        // interfering with other page navigation. We only track
        // whether the section is intersecting so parent components
        // or the user can decide to focus it.
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '-10% 0px -10% 0px' // Add some margin for better detection
      }
    );

    observer.observe(wrapper);
    return () => observer.unobserve(wrapper);
  }, [isFullscreen]);

  // Disable auto-rotation & hover interactions on mobile to improve performance
  useEffect(() => {
    if (isMobile) {
      setIsAutoRotating(false)
    }
  }, [isMobile])

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
    if (totalCertificates === 0) return {};
    const baseAngle = (360 / totalCertificates) * index;
    const rotationOffset = (scrollPosition * 360 * 2) + autoRotation; // 2 full rotations + auto rotation
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

    // Add hover effect - translate upward (do NOT translate forward)
    // We'll use a CSS variable to animate translateY on the inner card so
    // rotation (applied to the parent transform) is unaffected and remains smooth.
    const hoverX = x; // keep position around the circle - do not move forward/back
    const hoverZ = z;
    const hoverY = y; // don't change Y here; we will animate vertical lift on inner element using CSS
    const innerTranslateY = hoveredCard === index ? -40 : 0; // up 40px when hovered

    return {
      transform: `translate3d(${hoverX}px, ${hoverY}px, ${hoverZ}px) rotateY(${cardRotationY}deg) rotateX(0deg)`,
      // Pass CSS var to inner element so we can animate vertical translation separately and smoothly
      ['--card-translate-y']: `${innerTranslateY}px`,
      opacity: 1, // Keep all cards fully visible
      zIndex: Math.round(z + 500), // Ensure proper layering
      transition: 'none' // Keep rotation immediate (no CSS transition) - inner element will handle smooth animation
    };
  };

  return (
    <div
      className={`certificate-carousel-wrapper ${isFullscreen ? 'fullscreen' : ''}`}
      ref={wrapperRef}
    >
      {isLoading && (
        <div className="carousel-loading-overlay">
          <Loader message="Loading certificates..." />
        </div>
      )}

      <div className="carousel-controls">
        <button
          className="carousel-control-btn"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          aria-label={isAutoRotating ? "Pause Rotation" : "Start Rotation"}
          title={isAutoRotating ? "Pause Rotation" : "Start Rotation"}
        >
          {isAutoRotating ? <FaPause /> : <FaPlay />}
          <span className="control-hint">
            {isAutoRotating ? "Pause Rotation" : "Start Rotation"}
          </span>
        </button>

        <button
          className="carousel-control-btn"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          title={isFullscreen ? "Exit Fullscreen (Esc)" : "View Fullscreen"}
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
          <span className="control-hint">
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
          </span>
        </button>
      </div>

      <div
        ref={containerRef}
        className={`certificate-carousel-container ${isLoading ? 'blurred' : ''}`}
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
                    onMouseEnter={() => { if (!isMobile) setHoveredCard(index) }}
                    onMouseLeave={() => { if (!isMobile) setHoveredCard(null) }}
                    onClick={() => setSelectedCertificate(certificate)}
                  >
                    <div className="certificate-card-inner">
                      <div className="certificate-front">
                        <Suspense fallback={<div className='certificate-card-placeholder'>Loading...</div>}>
                          <CertificateCardBackground
                            imageUrl={certificate.image}
                            id={certificate.id}
                            onLoaded={() => handleImageLoad(certificate.id)}
                          />
                        </Suspense>
                      </div>

                      {/* Add back side with same content for visibility from all angles */}
                      <div className="certificate-back">
                        <CertificateCardBackground imageUrl={certificate.image} id={certificate.id} />
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

            <div className="modal-content-wrapper">
              <div className="modal-image-section">
                <div className="modal-image-container">
                  <Suspense fallback={<div className='certificate-modal-placeholder'>Loading preview...</div>}>
                    <CertificateCardBackground imageUrl={selectedCertificate.image} id={selectedCertificate.id} width={800} />
                  </Suspense>
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

export default CertificateCarousel;
