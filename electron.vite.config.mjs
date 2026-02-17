import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 1. Core Dependencies (React, ReactDOM, Redux)
          'react-core': ['react', 'react-dom', 'react-redux', 'redux', 'redux-thunk'],

          // 2. UI Libraries (MUI, Emotion)
          'ui-libraries': [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled',
          ],

          // 3. Charting (Recharts)
          charting: ['recharts'],

          // 4. Data Grid (AG Grid)
          'data-grid': ['ag-grid-community', 'ag-grid-react'],

          // 5. Utility Libraries
          utilities: [
            'axios',
            'lodash',
            'file-saver',
            'docx',
            'xlsx',
            'jspdf',
            'html2canvas',
            'promise-worker/register',
          ],

          // 6. Routing & Navigation
          routing: ['react-router-dom'],

          // 7. i18n
          i18n: ['i18next', 'react-i18next'],
        },
      },
    },
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [react(), tailwindcss()],
    worker: {
      format: 'es',
    },
  },
});
