import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import eslintConfig from '@electron-toolkit/eslint-config';
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';

export default defineConfig(
  { ignores: ['**/node_modules', '**/dist', '**/out', '**/build', 'public/output.css'] },

  js.configs.recommended, // 'eslint:recommended'
  eslintPluginReact.configs.flat.recommended, // 'plugin:react/recommended'
  eslintPluginReact.configs.flat['jsx-runtime'], // 'plugin:react/jsx-runtime'
  eslintConfig, // '@electron-toolkit'
  eslintConfigPrettier, // '@electron-toolkit/eslint-config-prettier'

  {
    settings: {
      react: { version: 'detect' },
    },
  },

  // your custom rules, placed last so they override the configs above
  {
    rules: {
      'react/prop-types': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'comma-dangle': 'off',
    },
  }
);
