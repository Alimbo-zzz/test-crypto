import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

import { resolve } from 'path';
const src = resolve(__dirname, './src');
const _public = resolve(__dirname, './public');

export default defineConfig({
  base: '/vite-react/',
  plugins: [
    react(),
    legacy({ targets: ['IE >= 11'] }),
  ],
  server: { port: 3030 },
  build: { minify: true },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/vars.scss";
          @import "@/styles/mixins.scss";
        `
      }
    },
    // postcss: { plugins: [autoprefixer()] }
  },
  resolve: {
    alias: {
      '@': resolve(src),
      '@scripts': resolve(src, 'scripts'),
      '@styles': resolve(src, 'styles'),
      '@store': resolve(src, 'store'),
      // assets
      '@images': resolve(_public, 'images'),
      '@icons': resolve(_public, 'icons'),
      '@fonts': resolve(_public, 'fonts'),
      // react
      '@pages': resolve(src, 'pages'),
      '@components': resolve(src, 'components'),
      '@hooks': resolve(src, 'hooks'),
      '@contexts': resolve(src, 'contexts'),
      '@ui': resolve(src, 'ui'),
    }
  }
})