import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

// May be undefined: only the browser-based `tests` project needs it, and it
// guards at runtime (auth.fixture + the anon-context path in from-doc.spec.ts).
// Not throwing here lets the credential-free `integrity` project run on its own.
export const baseURL = process.env.CONSOLE_STAGING_URL;

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    // One retry in CI: a transient staging/network hiccup shouldn't surface as
    // "drift" and auto-file an issue. Genuine, repeatable drift still fails.
    retries: process.env.CI ? 1 : 0,
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
        // Static doc-side checks: no browser, no staging credentials. Runs first
        // so a stale baseline (e.g. docs moved) fails fast before the UI suite.
        {
            name: 'integrity',
            testMatch: /baseline-integrity\.spec\.ts/,
        },
        {
            name: 'tests',
            testMatch: /from-doc\.spec\.ts/,
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
