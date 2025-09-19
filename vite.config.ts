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
  base: '/',
  server: {
    host: true,                           // '0.0.0.0'과 동일
    allowedHosts: ['jejuday.org', 'www.jejuday.org'],
    proxy: {
      '/api': {
        target: 'http://13.124.81.252:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/,''), // api 제거 후 백엔드 전달
      }
    }
  }
})
