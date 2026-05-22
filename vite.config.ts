import babel from '@rolldown/plugin-babel';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    devtools(),
    babel({ presets: [reactCompilerPreset()] }),
    react(),
    tanstackRouter(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
