import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'client'),
  build: {
    outDir: path.resolve(__dirname, 'client/dist'),
    emptyOutDir: true,
    manifest: true,
    // Disabilita il modulepreload per evitare che AppWithProviders venga caricato prima del login
    modulePreload: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'client/index.html')
    }
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