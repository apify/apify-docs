import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const baseURL = process.env.CONSOLE_STAGING_URL;
if (!baseURL) {
  throw new Error(
    'CONSOLE_STAGING_URL is not set. Copy .env.example to .env and fill it in.',
  );
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['./reporters/issues-reporter.ts'],
  ],

  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'tests',
      testMatch: /from-doc\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
      },
    },
  ],
});
