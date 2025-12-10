Performance and bundle optimization notes (automatically applied by Copilot)
====================================================

What I changed:
- Vite config: Increased `build.chunkSizeWarningLimit` and added `rollupOptions.output.manualChunks` to split large libraries (three, react-pdf, react-icons, framer-motion, vendor-large).
- Route-based code-splitting: `App.jsx` now lazy-loads pages (Home, About, Projects, Contact, Resume) using `React.lazy` and `Suspense` with a small loader fallback.
- Lazy-loaded heavy components: `CertificateCarousel`, `CertificateCardBackground`, `About3DBackground` (ready) are now lazy-loaded and wrapped with `Suspense` fallbacks.
- Images: Added `loading="lazy"` and `decoding="async"` to non-critical images and logos to reduce main bundle load.

Recommendations (manual steps):
- Asset optimization: Recompress large images in `public/assets` and `src/assets` using `webp`/`avif` and proper resize. Use srcset and width/height with CSS to reduce LCP.
- 3D Model Compression: If you use GLTF/GLB models, use Draco compression (gltf-pipeline or tools) and use DRACO loaders.
- Preconnect and Preload: Consider preconnecting to CDN endpoints used by `pdfjs` or critical assets to reduce fetch latency.
- Long-term caching: Configure HTTP cache headers (via hosting like Vercel) so the `three-vendor` or `pdf-vendor` chunks are cached.
- Lighthouse audits: After deploying, run a Lighthouse audit and revisit what still needs optimizing (TTI, LCP, CLS).

Notes on behavior:
- All UI behavior was preserved: lazy-loading only changes when assets are downloaded and renders fallback during that time.
- `CertificateCardBackground` uses `react-pdf` and is now lazy-loaded so the heavy `react-pdf` bundle doesn't load unless a certificate is viewed or carousel mounts.

If you want, I can now:
1) Replace large avatars and hero images with optimized WebP versions (I can produce script recommendations for batch conversion).
2) Introduce a `prefetch` or `preload` for `three-vendor` after the initial bundle if you want the 3D scenes to load faster on navigation.
3) Add optional user-controlled toggles to disable heavy 3D scenes on mobile.

-- Copilot
