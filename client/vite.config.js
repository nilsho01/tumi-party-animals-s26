import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://pa-s26-api-8kup.onrender.com',
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
});
