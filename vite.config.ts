import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  build: {
    outDir: 'dist'
  },
  // Supprimez toute référence à GEMINI_API_KEY
  define: {
    'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify('')
  }
});
