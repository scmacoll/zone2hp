/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

// Uses Astro's Vite config so tests resolve the same aliases / env as the app.
// Pure-logic modules live in src/lib/**; their tests sit beside them as *.test.ts.
export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
