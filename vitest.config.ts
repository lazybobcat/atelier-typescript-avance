import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.ts'],
    exclude: ['node_modules', '**/*.config.ts', '**/*.ignore.ts'],
    passWithNoTests: true,
  },
});
