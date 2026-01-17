import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    base: './', // Important for GitHub Pages relative paths
    build: {
      outDir: 'dist',
    },
    define: {
      // Safely pass the API Key
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
      // Ensure NODE_ENV is passed correctly for production optimizations
      'process.env.NODE_ENV': JSON.stringify(mode),
      // Prevents "process is not defined" error in some browser environments, 
      // but keeps it safe for React
      'process.env': JSON.stringify({
         API_KEY: env.VITE_API_KEY,
         NODE_ENV: mode
      })
    }
  };
});