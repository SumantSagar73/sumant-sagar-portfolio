import React, { createContext, useState, useEffect, useContext } from 'react';

const CertificateContext = createContext();

export const useCertificates = () => {
    const context = useContext(CertificateContext);
    if (!context) {
        throw new Error('useCertificates must be used within a CertificateProvider');
    }
    return context;
};

export const CertificateProvider = ({ children }) => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CACHE_KEY = 'cached_certificates';

    const fetchCertificates = async (isBackgroundUpdate = false) => {
        if (!isBackgroundUpdate) setLoading(true);

        try {
            const response = await fetch('https://certify-backend-9gtd.onrender.com/api/public/user/sumantsagar/certificates');
            const data = await response.json();

            if (data && data.certificates && Array.isArray(data.certificates)) {
                const mappedData = data.certificates.map((cert, index) => ({
                    id: cert.slug || index,
                    title: cert.title,
                    issuer: cert.issuer,
                    date: new Date(cert.date).getFullYear().toString(),
                    image: cert.imageUrl,
                    skills: [cert.category],
                    credential: cert.slug,
                    verifyUrl: '#'
                }));

                setCertificates(mappedData);

                // Update cache
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    certificates: mappedData,
                    timestamp: Date.now()
                }));
            } else {
                console.error('Unexpected API response structure:', data);
                if (!isBackgroundUpdate) setCertificates([]);
            }
        } catch (err) {
            console.error('Error fetching certificates:', err);
            setError(err);
        } finally {
            if (!isBackgroundUpdate) setLoading(false);
        }
    };

    const refreshCertificates = () => {
        fetchCertificates(false);
    };

    useEffect(() => {
        // Try to load from cache first
        const cachedData = localStorage.getItem(CACHE_KEY);

        if (cachedData) {
            try {
                const parsedCache = JSON.parse(cachedData);
                if (parsedCache && Array.isArray(parsedCache.certificates)) {
                    setCertificates(parsedCache.certificates);
                    setLoading(false); // Skip loading spinner if cache exists

                    // Silently fetch fresh data in background
                    fetchCertificates(true);
                    return;
                }
            } catch (e) {
                console.error('Error parsing certificate cache:', e);
                localStorage.removeItem(CACHE_KEY);
            }
        }

        // If no cache or invalid cache, fetch normally
        fetchCertificates(false);
    }, []);

    return (
        <CertificateContext.Provider value={{ certificates, loading, error, refreshCertificates }}>
            {children}
        </CertificateContext.Provider>
    );
};

export default CertificateProvider;
