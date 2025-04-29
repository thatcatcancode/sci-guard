import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({
  mode
}) => {
  const isDev = mode === 'development';
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: isDev ? {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')  // Remove /api prefix
        }
      }
    } : undefined,
    build: {
      outDir: '../public', // or wherever you want the final build to go
    }
  }
});


