import { defineConfig } from '@playwright/test';

const port = process.env.E2E_PORT ?? '3000';
const serverMode = process.env.E2E_SERVER ?? 'dev';

if (serverMode !== 'dev' && serverMode !== 'production') {
  throw new Error(`Unsupported E2E_SERVER "${serverMode}". Use "dev" or "production".`);
}

const serverCommand = serverMode === 'production'
  ? `npm run start -- --hostname 0.0.0.0 --port ${port}`
  : `npm run dev -- --port ${port}`;

export default defineConfig({
  testDir: './e2e',
  timeout: 45000,
  expect: {
    timeout: 7000,
  },
  fullyParallel: false,
  workers: 1,
  reporter: 'line',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    channel: process.env.E2E_BROWSER_CHANNEL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: serverCommand,
    url: `http://127.0.0.1:${port}`,
    // Reusing a server is opt-in so CI and local runs agree. Set this to 1
    // when the requested dev or production server is already running here.
    reuseExistingServer: process.env.E2E_REUSE_SERVER === '1',
    timeout: 120000,
  },
});
