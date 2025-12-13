import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increase the chunk warning size to 1.5MB to reduce noisy warnings in Vercel
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Manual chunk splitting so large libraries (three, react-pdf, icons, etc.)
        // are loaded separately and can be cached by the browser.
        manualChunks(id) {
          if (!id) return

          if (id.includes('node_modules')) {
            // Split specific large libraries

            // Three.js core only (engine)
            if (id.includes('/node_modules/three/') || id.includes('\\node_modules\\three\\')) {
              return 'three-vendor'
            }

            // @react-three/drei (components) - large, safe to split
            if (id.includes('@react-three/drei') || id.includes('@react-three\\drei')) {
              return 'drei-vendor'
            }

            // Note: @react-three/fiber stays in main vendor chunk with React to avoid initialization issues

            if (id.includes('react-pdf') || id.includes('pdfjs-dist')) {
              return 'pdf-vendor'
            }
            if (id.includes('react-icons')) {
              return 'icons-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion-vendor'
            }

            return 'vendor'
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      // In case components import with @ or other aliases in the future
      '@': path.resolve(__dirname, './src')
    }
  }
})
