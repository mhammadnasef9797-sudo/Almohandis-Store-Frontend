import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // استيراد مكتبة path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // تعريف أن @ يشير إلى مجلد src
    },
  },
});