import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    base: '/gif-search/',
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});