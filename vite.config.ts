import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/our-wedding/',
  build: {
    outDir: 'dist/our-wedding',
  },
  plugins: [react()],
});
