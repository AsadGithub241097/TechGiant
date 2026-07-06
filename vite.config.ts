import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr"; // Import the SVGR plugin

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
    // Copy SEO files to build output
    assetsDir: 'assets',
    outDir: 'dist',
    copyPublicDir: true,
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
