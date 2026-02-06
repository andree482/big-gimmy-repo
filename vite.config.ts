import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'vite-plugin-compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    // Compressione gzip per ridurre transfer size
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Compressione brotli (migliore di gzip)
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  root: path.resolve(__dirname, 'client'),
  build: {
    outDir: path.resolve(__dirname, 'client/dist'),
    emptyOutDir: true,
    manifest: true,
    // Disabilita il modulepreload per evitare che AppWithProviders venga caricato prima del login
    modulePreload: false,
    // Target moderno per bundle più piccoli
    target: 'es2020',
    // Chunk size warning a 300KB
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      input: path.resolve(__dirname, 'client/index.html'),
      output: {
        // Code splitting ottimizzato per performance mobile
        manualChunks: {
          // Vendor chunks separati per caching migliore
          'react-vendor': ['react', 'react-dom'],
          'framer': ['framer-motion'],
          'radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-accordion',
            '@radix-ui/react-popover',
          ],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'query': ['@tanstack/react-query'],
        },
      },
    },
    // Minificazione aggressiva
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
  },
    server: {
    hmr: false, // disabilita HMR
    allowedHosts: ['infrangible-darci-filthily.ngrok-free.dev'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  
});