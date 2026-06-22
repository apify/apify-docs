import { test as base, type BrowserContext } from '@playwright/test';
import 'dotenv/config';

const EMAIL = process.env.CONSOLE_STAGING_USER_EMAIL;
const PASSWORD = process.env.CONSOLE_STAGING_USER_PASSWORD;
const BASE_URL = process.env.CONSOLE_STAGING_URL;

type StorageState = Awaited<ReturnType<BrowserContext['storageState']>>;

// Worker-scoped authentication. Logs in ONCE per worker with credentials from
// the environment (.env locally, GitHub Secrets in CI) and hands the resulting
// session to every test as an in-memory storageState.
//
// No auth.json is ever written or read — nothing has to pre-exist in CI; each
// run authenticates fresh. The seeded staging user has no 2FA, so this is a
// plain email + password form submit.
export const test = base.extend<object, { authState: StorageState }>({
  authState: [
    async ({ browser }, use) => {
      if (!EMAIL || !PASSWORD) {
        throw new Error(
          'CONSOLE_STAGING_USER_EMAIL and CONSOLE_STAGING_USER_PASSWORD must be set ' +
            '(.env locally, GitHub Secrets in CI).',
        );
      }

      const context = await browser.newContext({ baseURL: BASE_URL });
      const page = await context.newPage();
      await page.goto('/sign-in');

      // Selectors aren't pinned to the Console DOM; each field tries a few
      // resilient locators. If a step misses, the retained trace shows the form.
      const email = page
        .locator('input[type="email"], input[name="email"], input[name="username"]')
        .first();
      await email.waitFor({ state: 'visible', timeout: 15_000 });
      await email.fill(EMAIL);

      const password = page.locator('input[type="password"], input[name="password"]').first();
      await password.fill(PASSWORD);

      await page.getByRole('button', { name: /sign in|log in|continue/i }).first().click();

      // Confirm we left the sign-in page; otherwise creds/selectors are wrong.
      await page.waitForURL((url) => !/\/sign-in/.test(url.pathname), { timeout: 15_000 });

      const state = await context.storageState();
      await context.close();

      await use(state);
    },
    { scope: 'worker' },
  ],

  // Feed the in-memory session to every test's context.
  storageState: ({ authState }, use) => use(authState),
});

export { expect } from '@playwright/test';
