import { useState, useEffect } from 'react';
import { getPdfFromDB } from '../lib/indexedDB';

/**
 * Hook to retrieve a cached PDF URL from IndexedDB.
 * @param {string} id - The ID of the PDF to retrieve.
 * @returns {Object} { pdfUrl, loading, error }
 */
export const usePdf = (id) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let objectUrl = null;
        let mounted = true;

        const loadPdf = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const blob = await getPdfFromDB(id);

                if (mounted) {
                    if (blob) {
                        objectUrl = URL.createObjectURL(blob);
                        setPdfUrl(objectUrl);
                    } else {
                        // If not found in DB, we might want to handle it (e.g., it wasn't cached yet)
                        // For now, we just return null, consumer might fallback or show error
                        // Ideally, the caching logic ensures it's there, or we could attempt a fetch here as fallback
                        // But per requirements, we load ONLY from IndexedDB (assuming cache step happened)
                        setError(`PDF with ID ${id} not found in cache`);
                    }
                }
            } catch (err) {
                if (mounted) {
                    console.error("Error loading PDF from DB:", err);
                    setError(err.message);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadPdf();

        return () => {
            mounted = false;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [id]);

    return { pdfUrl, loading, error };
};
