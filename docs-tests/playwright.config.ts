import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const baseURL = process.env.CONSOLE_STAGING_URL;
if (!baseURL) {
    throw new Error('CONSOLE_STAGING_URL is not set. Copy .env.example to .env and fill it in.');
}

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: 0,
    reporter: [['html', { open: 'never' }], ['list'], ['./reporters/issues-reporter.ts']],

    use: {
        baseURL,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    // No setup project and no storageState file: authentication is a worker-scoped
    // fixture (tests/auth.fixture.ts) that logs in fresh each run and keeps the
    // session in memory. Nothing on disk has to pre-exist — works the same locally
    // and in CI, where credentials come from GitHub Secrets.
    projects: [
        {
            name: 'tests',
            testMatch: /from-doc\.spec\.ts/,
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
