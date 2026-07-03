import { test as base, type BrowserContext } from '@playwright/test';
import 'dotenv/config';

const EMAIL = process.env.CONSOLE_STAGING_USER_EMAIL;
const PASSWORD = process.env.CONSOLE_STAGING_USER_PASSWORD;
const BASE_URL = process.env.CONSOLE_STAGING_URL;

type StorageState = Awaited<ReturnType<BrowserContext['storageState']>>;

// Step logging for the login flow. The worker fixture runs before any test, and
// the `list` reporter prints nothing until a test completes — so without this a
// slow or stuck login is indistinguishable from a crash. Each line carries the
// elapsed time since the step before it, so a frozen step is obvious. Writes to
// stderr to bypass Playwright's per-test stdout buffering and show up live.
function makeLogger() {
  let last = Date.now();
  return (step: string): void => {
    const now = Date.now();
    const delta = ((now - last) / 1000).toFixed(1);
    last = now;
    process.stderr.write(`[auth +${delta}s] ${step}\n`);
  };
}

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

      const log = makeLogger();
      log('starting login (worker fixture)');

      const context = await browser.newContext({ baseURL: BASE_URL });
      const page = await context.newPage();
      log('navigating to /sign-in');
      // The Console is an SPA that never reaches networkidle (it holds live
      // connections open), so wait on DOM content and let the form hydrate.
      await page.goto('/sign-in', { waitUntil: 'domcontentloaded' });
      log(`loaded ${new URL(page.url()).pathname}`);

      // The Apify sign-in is a TWO-STEP native form (verified against staging):
      //   step 1: #email + a "Next" submit button
      //   step 2: #password + a "Log in" submit button
      // Both steps stay on /sign-in (SPA). The "Continue with Google/GitHub"
      // buttons are SSO — never click those; target the native submit buttons.
      const email = page.locator('#email, input[type="email"]').first();
      log('waiting for email field');
      await email.waitFor({ state: 'visible', timeout: 15_000 });
      await email.fill(EMAIL);
      log('email filled, clicking Next');

      await page.getByRole('button', { name: /^next$/i }).click();

      const password = page.locator('#password, input[type="password"]').first();
      log('waiting for password field');
      await password.waitFor({ state: 'visible', timeout: 15_000 });
      await password.fill(PASSWORD);
      log('password filled, clicking Log in');

      await page.getByRole('button', { name: /^log ?in$/i }).click();
      log('submitted credentials, waiting to leave /sign-in');

      // Confirm we left the sign-in page; otherwise creds/selectors are wrong.
      await page.waitForURL((url) => !url.pathname.includes('/sign-in'), { timeout: 15_000 });
      log(`logged in, landed on ${new URL(page.url()).pathname}`);

      const state = await context.storageState();
      await context.close();
      log('session captured, handing off to tests');

      await use(state);
    },
    { scope: 'worker' },
  ],

  // Feed the in-memory session to every test's context.
  storageState: ({ authState }, use) => use(authState),
});

export { expect } from '@playwright/test';
