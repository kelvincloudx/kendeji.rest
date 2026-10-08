import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://kendeji.rest',
  trailingSlash: 'always',
  vite: {
    resolve: {
      preserveSymlinks: true
    }
  },
  build: {
    format: 'directory'
  }
});
