import { getPdfFromDB, savePdfToDB } from './indexedDB';

/**
 * Fetches a PDF from a URL and caches it in IndexedDB if not already present.
 * @param {string} id - Unique identifier for the PDF.
 * @param {string} url - The URL to fetch the PDF from.
 * @returns {Promise<void>}
 */
export const fetchAndCachePdf = async (id, url) => {
  if (!id || !url) return;

  try {
    // Check if already in DB
    const existingBlob = await getPdfFromDB(id);
    if (existingBlob) {
      // console.log(`PDF ${id} already cached.`);
      return;
    }

    // Fetch from network
    // console.log(`Fetching PDF ${id} from ${url}...`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const blob = await response.blob();

    // Save to DB
    await savePdfToDB({ id, blob });
    // console.log(`PDF ${id} cached successfully.`);

  } catch (error) {
    console.error(`Error caching PDF ${id}:`, error);
    // We don't throw here to allow other PDFs to continue processing in Promise.all
  }
};

/**
 * Caches multiple PDFs in parallel.
 * @param {Array<{id: string, url: string}>} pdfList 
 * @returns {Promise<void>}
 */
export const cacheMultiplePdfs = async (pdfList) => {
  if (!Array.isArray(pdfList) || pdfList.length === 0) return;

  const promises = pdfList.map(({ id, url }) => fetchAndCachePdf(id, url));
  await Promise.all(promises);
};
