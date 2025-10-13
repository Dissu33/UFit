// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  // ➕ REQUIRED CHANGE: Add the server block for proxying API requests
  server: {
    proxy: {
      // Any request starting with /api will be forwarded
      '/api': {
        target: 'http://localhost:5000', // The address of your running Node/Express server
        changeOrigin: true, // Needed for virtual hosting
        secure: false, // Use false for local development
      },
    },
  },
})