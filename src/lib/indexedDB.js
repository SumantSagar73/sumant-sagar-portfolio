const DB_NAME = 'PortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'pdfs';

/**
 * Opens the IndexedDB database.
 * @returns {Promise<IDBDatabase>}
 */
export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(`IndexedDB error: ${event.target.error}`);
        };
    });
};

/**
 * Saves a PDF blob to the database.
 * @param {Object} params
 * @param {string} params.id - Unique identifier for the PDF.
 * @param {Blob} params.blob - The PDF blob.
 * @returns {Promise<void>}
 */
export const savePdfToDB = async ({ id, blob }) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put({ id, blob, timestamp: Date.now() });

            request.onsuccess = () => resolve();
            request.onerror = (event) => reject(`Error saving PDF: ${event.target.error}`);
        });
    } catch (error) {
        console.error('Failed to save PDF to DB:', error);
        throw error;
    }
};

/**
 * Retrieves a PDF blob from the database.
 * @param {string} id - Unique identifier for the PDF.
 * @returns {Promise<Blob|null>}
 */
export const getPdfFromDB = async (id) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(id);

            request.onsuccess = (event) => {
                const result = event.target.result;
                resolve(result ? result.blob : null);
            };
            request.onerror = (event) => reject(`Error getting PDF: ${event.target.error}`);
        });
    } catch (error) {
        console.error('Failed to get PDF from DB:', error);
        return null;
    }
};

/**
 * Retrieves all stored PDFs (metadata only).
 * @returns {Promise<Array>}
 */
export const getAllPdfs = async () => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
            request.onerror = (event) => reject(`Error getting all PDFs: ${event.target.error}`);
        });
    } catch (error) {
        console.error('Failed to get all PDFs:', error);
        return [];
    }
};
