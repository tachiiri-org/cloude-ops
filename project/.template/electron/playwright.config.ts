import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/ui',
  outputDir: 'test-results/playwright',
  reporter: [['list']],
  timeout: 30_000,
  workers: 1,
});
