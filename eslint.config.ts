import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginRouter from '@tanstack/eslint-plugin-router';
import pluginQuery from '@tanstack/eslint-plugin-query';
import boundaries from 'eslint-plugin-boundaries';
import { boundariesSettings, boundariesRules } from './eslint.boundaries';
import { projectRules } from './eslint.rules';

export default defineConfig([
  globalIgnores(['dist', 'build', '.tanstack']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      boundaries,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      pluginRouter.configs['flat/recommended'],
      pluginQuery.configs['flat/recommended'],
      boundaries.configs.recommended,
    ],
    settings: {
      ...boundariesSettings,
    },
    rules: {
      ...boundariesRules,
      ...projectRules,
    },
  },
]);
