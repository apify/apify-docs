import { test, expect, type Page } from '@playwright/test';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { suggestReplacement } from './similarity';

type AssertionKind = 'route' | 'element_button' | 'element_tab' | 'element_text';

interface Assertion {
  id: string;
  kind: AssertionKind;
  target: string;
  at?: string;
  page_context: string;
  source_quote: string;
  source_line: number;
  needs_auth: boolean;
}

interface ExtractionOutput {
  source_file: string;
  assertions: Assertion[];
}

// The stored, reviewed baseline: one JSON file per documentation page, produced
// by `pnpm extract:all` and committed to the repo. The runner evaluates every
// stored assertion against staging.
const ASSERTIONS_DIR = resolve(process.cwd(), 'assertions');

function loadStoredSets(): ExtractionOutput[] {
  if (!existsSync(ASSERTIONS_DIR)) return [];
  return readdirSync(ASSERTIONS_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => JSON.parse(readFileSync(join(ASSERTIONS_DIR, f), 'utf8')) as ExtractionOutput);
}

const sets = loadStoredSets();

if (sets.length === 0) {
  test('no stored assertions', () => {
    test.skip(
      true,
      `${ASSERTIONS_DIR} is empty. Run \`pnpm extract:all\` to generate the assertion baseline.`,
    );
  });
}

for (const data of sets) {
  test.describe(`Doc-derived assertions from ${data.source_file}`, () => {
    for (const a of data.assertions) {
      test(`[${a.kind}] ${a.id} — ${a.target}`, async ({ page }) => {
        test.info().annotations.push({
          type: 'source',
          description: `${data.source_file}:${a.source_line} — "${a.source_quote}"`,
        });
        test.info().annotations.push({ type: 'page', description: a.page_context });
        test.info().annotations.push({
          type: 'assertion-data',
          description: JSON.stringify({ ...a, source_file: data.source_file }),
        });

        await runAssertion(page, a);
      });
    }
  });
}

async function runAssertion(page: Page, a: Assertion): Promise<void> {
  if (a.kind === 'route') {
    const resp = await page.goto(a.target, { waitUntil: 'domcontentloaded' });
    expect(resp, `goto ${a.target} returned no response`).not.toBeNull();
    expect(resp!.status(), `goto ${a.target} returned HTTP ${resp!.status()}`).toBeLessThan(400);
    return;
  }

  // Element assertions: navigate to `at` first if provided. If `at` is missing
  // we skip rather than running against an arbitrary page — that's the
  // detail-page-fixture problem, not a real assertion failure.
  if (!a.at) {
    test.skip(true, `assertion ${a.id} has no \`at\` route; needs a fixture`);
    return;
  }

  await page.goto(a.at, { waitUntil: 'domcontentloaded' });

  try {
    await checkElement(page, a);
  } catch (err) {
    // On failure, snapshot same-kind elements from the live page so a
    // downstream LLM can fix the docs without re-running the browser. The
    // reporter reads this annotation into output/issues.json.
    await annotateCandidates(page, a);
    throw err;
  }
}

async function checkElement(page: Page, a: Assertion): Promise<void> {
  switch (a.kind) {
    case 'element_button': {
      await page.getByRole('button', { name: a.target, exact: false }).first().waitFor({ state: 'visible', timeout: 10_000 });
      return;
    }
    case 'element_tab': {
      // Playwright's `tab` role doesn't always match the Console's tab impl.
      // Fall back to a text match if the role lookup misses.
      const byRole = page.getByRole('tab', { name: a.target, exact: false }).first();
      const byText = page.getByText(a.target, { exact: false }).first();
      try {
        await byRole.waitFor({ state: 'visible', timeout: 5_000 });
      } catch {
        await byText.waitFor({ state: 'visible', timeout: 5_000 });
      }
      return;
    }
    case 'element_text': {
      await page.getByText(a.target, { exact: false }).first().waitFor({ state: 'visible', timeout: 10_000 });
      return;
    }
  }
}

async function annotateCandidates(page: Page, a: Assertion): Promise<void> {
  const candidates = await collectCandidates(page, a.kind);
  const suggestion = suggestReplacement(a.target, candidates);
  test.info().annotations.push({
    type: 'observed-candidates',
    description: JSON.stringify({
      candidate_kind: candidateKind(a.kind),
      candidates,
      suggested_target: suggestion,
    }),
  });
}

async function collectCandidates(page: Page, kind: AssertionKind): Promise<string[]> {
  try {
    switch (kind) {
      case 'element_button':
        return clean(await page.getByRole('button').allTextContents());
      case 'element_tab':
        return clean(await page.getByRole('tab').allTextContents());
      case 'element_text':
        // Most doc claims of `element_text` are section headings. Capture all
        // heading levels so the downstream LLM has the full table of contents.
        return clean(await page.locator('h1, h2, h3, h4, h5, h6').allTextContents());
      default:
        return [];
    }
  } catch {
    return [];
  }
}

function candidateKind(kind: AssertionKind): string {
  switch (kind) {
    case 'element_button': return 'button';
    case 'element_tab': return 'tab';
    case 'element_text': return 'heading';
    default: return 'unknown';
  }
}

function clean(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of items) {
    const t = raw.replace(/\s+/g, ' ').trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}
