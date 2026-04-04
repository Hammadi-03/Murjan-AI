import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Split large vendor libraries into separate cacheable chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — cached separately, rarely changes
          'vendor-react': ['react', 'react-dom'],
          // Markdown rendering
          'vendor-markdown': ['react-markdown'],
          // Animation library
          'vendor-motion': ['framer-motion', 'motion'],
          // Icons — only the used icons are tree-shaken, but chunk them separately
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Increase the warning limit slightly since we're splitting chunks
    chunkSizeWarningLimit: 600,
  },
  server: {
    // Local dev proxy – requests to /api are forwarded to our local Hono server
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
