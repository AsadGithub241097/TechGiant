import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr"; // Import the SVGR plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(), // Add the SVGR plugin
  ],
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap'],
          animations: ['framer-motion', 'lottie-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'gsap', 'framer-motion'],
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
});
