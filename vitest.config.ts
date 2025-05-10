import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      all: true,
      reportOnFailure: true,
      reportsDirectory: 'coverage',
      reporter: ['text', 'lcov'],
      include: ['app/**/*.{ts,tsx}'],
      exclude: [
        'app/**/*.test.{ts,tsx}',
        'app/**/*.d.ts',
        'app/tests/**',
        'app/layouts/**',
        'app/routes/**',
        'app/routes.ts'
      ]
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
      '@utils': path.resolve(__dirname, './app/utils')
    }
  }
});
