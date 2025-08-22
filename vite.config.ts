import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tsConfigPaths({
      projects: ['./tsconfig.app.json'],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://3.39.230.129:8080/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/,''), // api 제거 후 백엔드 전달
      }
    }
  }
})
