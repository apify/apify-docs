import { test, expect } from '@playwright/test';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

// Doc-side drift detection. The main suite (from-doc.spec.ts) checks the live
// Console UI; this suite checks the OTHER half of every assertion — that its
// documentation back-reference still resolves. When docs move or get rewritten
// (e.g. the IA v3 flip that relocated `console/*.md` to `account/*.md`), the UI
// checks stay green but `source_file`/`source_quote` silently go stale, so a
// later drift report would point maintainers at a doc that no longer exists.
// These tests fail loudly when that happens, and route through the same issues
// reporter + auto-filed drift issue as the UI checks.
//
// Pure static checks: they read the committed docs from the repo, launch no
// browser, and need no staging credentials — so they run in the `integrity`
// Playwright project with no `use.baseURL` and no auth fixture.

interface Assertion {
    id: string;
    kind: string;
    target: string;
    at?: string;
    page_context: string;
    source_quote: string;
    source_line: number;
    needs_auth?: boolean;
}

interface ExtractionOutput {
    source_file: string;
    assertions: Assertion[];
}

const ASSERTIONS_DIR = resolve(process.cwd(), 'assertions');
// docs-tests/ sits at the apify-docs repo root, so a `source_file` like
// `sources/platform/account/billing.md` resolves one level up.
const REPO_ROOT = resolve(process.cwd(), '..');

function loadStoredSets(): ExtractionOutput[] {
    if (!existsSync(ASSERTIONS_DIR)) return [];
    return readdirSync(ASSERTIONS_DIR)
        .filter((f) => f.endsWith('.json'))
        .sort()
        .map((f) => JSON.parse(readFileSync(join(ASSERTIONS_DIR, f), 'utf8')) as ExtractionOutput);
}

// Collapse all whitespace so a quote still matches when the doc reflowed lines
// or changed indentation without changing the wording.
const normalize = (s: string): string => s.replace(/\s+/g, ' ').trim();

const sets = loadStoredSets();

if (sets.length === 0) {
    test('no stored assertions', () => {
        test.skip(true, `${ASSERTIONS_DIR} is empty. Run \`pnpm extract:all\` to generate the baseline.`);
    });
}

for (const data of sets) {
    test.describe(`Baseline integrity: ${data.source_file}`, () => {
        const absPath = join(REPO_ROOT, data.source_file);

        for (const a of data.assertions) {
            test(`[${a.id}] doc back-reference resolves`, () => {
                // Same annotation the UI suite emits, so the issues reporter and
                // the auto-filed drift issue treat a doc-drift failure uniformly.
                // `kind` is prefixed `doc:` so a maintainer can tell at a glance
                // it's the documentation side, not the Console UI, that drifted.
                test.info().annotations.push({
                    type: 'assertion-data',
                    description: JSON.stringify({
                        id: a.id,
                        kind: `doc:${a.kind}`,
                        target: data.source_file,
                        page_context: a.page_context,
                        source_file: data.source_file,
                        source_line: a.source_line,
                        source_quote: a.source_quote,
                    }),
                });

                expect(
                    existsSync(absPath),
                    `source_file "${data.source_file}" does not exist in the repo — the doc was moved or deleted. Update pages.json and re-extract.`,
                ).toBe(true);

                const content = readFileSync(absPath, 'utf8');
                const lineCount = content.split('\n').length;

                expect(
                    a.source_line >= 1 && a.source_line <= lineCount,
                    `source_line ${a.source_line} is out of range for ${data.source_file} (1..${lineCount}) — the doc changed. Re-extract to refresh the baseline.`,
                ).toBe(true);

                expect(
                    normalize(content).includes(normalize(a.source_quote)),
                    `source_quote not found in ${data.source_file} — the documented text changed. Re-extract to refresh the baseline. Quote: "${a.source_quote}"`,
                ).toBe(true);
            });
        }
    });
}
