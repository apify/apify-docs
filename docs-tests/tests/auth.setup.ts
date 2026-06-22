import { test as setup, expect } from '@playwright/test';
import { existsSync } from 'node:fs';

const AUTH_FILE = 'auth.json';

// Interactive login. Run once with `pnpm auth` (or `npm run auth`).
// The test pauses on the Console sign-in page; you log in by hand
// (including any 2FA), navigate to the home page, then press the
// "Resume" button in Playwright Inspector. Storage state is saved
// to auth.json and reused by the tests project.
//
// Skips if auth.json already exists. Delete the file to re-auth.
setup('authenticate', async ({ page }) => {
  if (existsSync(AUTH_FILE) && !process.env.FORCE_REAUTH) {
    setup.skip(true, `${AUTH_FILE} already exists; set FORCE_REAUTH=1 to overwrite.`);
    return;
  }

  await page.goto('/sign-in');
  console.log('\n  → Log in by hand. Then press the green "Resume" button in Playwright Inspector.\n');
  await page.pause();

  // Sanity check: we should now be authenticated. The home redirect lands
  // somewhere under /actors, /dashboard, etc. — not back on /sign-in.
  await expect(page).not.toHaveURL(/\/sign-in/);

  await page.context().storageState({ path: AUTH_FILE });
});
