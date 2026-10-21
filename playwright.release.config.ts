import { defineConfig } from '@playwright/test';

const port = process.env.E2E_RELEASE_PORT ?? '3102';

export default defineConfig({
  testDir: './release-e2e',
  testMatch: ['release-production-journey.spec.ts'],
  timeout: 300000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  workers: 1,
  reporter: 'line',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npm run start -- --hostname 127.0.0.1 --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 120000,
  },
});
