import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF worker
// Use a specific version if pdfjs.version is available, otherwise fallback to a known stable version for react-pdf 9/10
const pdfVersion = pdfjs.version || '4.4.168';
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfVersion}/build/pdf.worker.min.mjs`;

class PdfErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("PDF Rendering Error:", error);
  }

  render() {
    if (this.state.hasError) {
      return <div className="certificate-bg-fallback flex items-center justify-center text-gray-500 text-sm">PDF Preview Unavailable</div>;
    }
    return this.props.children;
  }
}

const CertificateCardBackground = ({ imageUrl, type = "image", width = 220 }) => {
    const [isPdf, setIsPdf] = useState(false);
    const [error, setError] = useState(false);
    const [numPages, setNumPages] = useState(null);

    useEffect(() => {
        const isPDF = imageUrl?.toLowerCase().includes(".pdf") || type === "pdf";
        setIsPdf(!!isPDF);
    }, [imageUrl, type]);

    const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

    if (!imageUrl || error) {
        return <div className="certificate-bg-fallback" />;
    }

    if (isPdf) {
        return (
            <div className="certificate-bg-media pdf-container">
                <PdfErrorBoundary>
                    <Document 
                        file={imageUrl} 
                        onLoadSuccess={onDocumentLoadSuccess} 
                        onLoadError={(err) => {
                            console.error("Document Load Error:", err);
                            setError(true);
                        }}
                        loading={<div className="pdf-loading">Loading...</div>}
                    >
                        {numPages && (
                            <Page 
                                pageNumber={1} 
                                width={width} 
                                renderTextLayer={false} 
                                renderAnnotationLayer={false} 
                                error={<div className="pdf-error">Page Error</div>}
                            />
                        )}
                    </Document>
                </PdfErrorBoundary>
            </div>
        );
    }

    return (
        <div className="certificate-bg-media image-container">
            <img src={imageUrl} alt="Certificate" onError={() => setError(true)} />
        </div>
    );
};

export default CertificateCardBackground;
