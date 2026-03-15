import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function baseRedirectPlugin(): Plugin {
  return {
    name: 'base-redirect',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? '/'
        if (!url.startsWith('/cabinly-bookingpage/') && !url.startsWith('/@') && !url.startsWith('/node_modules')) {
          req.url = '/cabinly-bookingpage' + url
        }
        next()
      })
    },
  }
}

export default defineConfig({
  base: "/cabinly-bookingpage/",
  plugins: [baseRedirectPlugin(), react(), tailwindcss()],
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
