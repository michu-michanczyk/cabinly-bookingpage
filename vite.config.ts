import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/cabinly-bookingpage/",
  plugins: [react(), tailwindcss()],
  server: {
    open: "/cabinly-bookingpage/",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-dates': ['date-fns'],
        },
      },
    },
    chunkSizeWarningLimit: 400,
  },
})
