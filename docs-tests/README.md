# docs-tests

Docs-as-tests for the Apify Console. Every UI claim in the platform docs — a
route resolves, a tab is named X, a button exists on page Y — is a testable
assertion. This package extracts those assertions from the docs with an LLM,
stores them as a reviewed baseline, and verifies them against Console staging
with Playwright, so documentation drift is caught automatically.

```
pages.json ──extract──▶ assertions/*.json ──Playwright──▶ output/issues.json
(page list)  (claude -p)  (committed baseline)   (2 suites)    (drift report)
```

Two suites run against the same baseline:

- **UI side** (`from-doc.spec.ts`) — does the live Console still match what the docs claim? Detects *UI drift* (the product changed, the docs didn't).
- **Doc side** (`baseline-integrity.spec.ts`) — does each assertion's `source_file` / `source_quote` still resolve in the repo? Detects *doc drift* (the docs moved or were rewritten under the baseline). Static, no browser, no credentials.

## Model

1. **`pages.json`** is an adjustable list of documentation pages (real source
   files under `sources/platform/…`) to cover.
2. **`scripts/extract.sh`** feeds one page to `claude -p` with a strict JSON
   schema and writes the result to `assertions/<slug>.json`.
   `scripts/extract-all.sh` does the whole manifest.
3. **`assertions/`** is the *stored, reviewed baseline* — committed to the repo.
   Regenerate it with the LLM whenever docs change, review the diff, commit.
   The assertion set is owned by humans even though a model drafts it.
4. **`tests/from-doc.spec.ts`** (UI side) reads every stored assertion and emits
   one Playwright `test()` per assertion, run against `$CONSOLE_STAGING_URL`.
5. **`tests/baseline-integrity.spec.ts`** (doc side) checks the *other half* of
   every assertion — that its `source_file` still exists and its `source_quote`
   still appears in it. This catches docs being moved or rewritten under the
   baseline; the UI checks alone stay green when that happens. Pure static: no
   browser, no credentials.
6. Failures from either suite point back to `source_file:line` so the offending
   prose is one click away, and land in `output/issues.json` for downstream
   triage.

The Notion plan *"AI-based testing for docs"* (its Part 1 routes + Part 2
elements) is the inspiration for which pages and claims to cover — not a fixed
transcription. The authoritative set is whatever the manifest + extractor
produce and a human commits.

## Assertion kinds

| Kind             | Checks                                                              |
| ---------------- | ------------------------------------------------------------------ |
| `route`          | Documented path is reachable (HTTP < 400)                          |
| `element_tab`    | Documented tab label exists on the page named in `at`              |
| `element_button` | Documented button label exists on the page named in `at`          |
| `element_text`   | Documented heading/label/field is visible on the page named in `at` |

## One-time setup

```bash
pnpm install
pnpm exec playwright install chromium
cp .env.example .env   # fill in CONSOLE_STAGING_URL + seeded-user email/password
```

## Generate / refresh the assertion baseline

```bash
# Every page in pages.json:
pnpm extract:all

# Or a single page:
pnpm extract sources/platform/account/settings.md
```

The extractor writes `assertions/<slug>.json`, where `<slug>` is the doc path
with `sources/platform/` stripped and `/` turned into `-` (so
`account/settings.md` → `account-settings.json`). Output is pretty-printed and
normalized through `jq` so re-extractions stay diff-friendly.

Review the diff in `assertions/`, then commit. **This is the step a human owns** —
the model drafts; you decide what's a real, testable UI claim (see
[Adding a new test case](#adding-a-new-test-case)).

## Run the tests

```bash
pnpm test            # both suites: doc-side integrity + UI checks against staging
pnpm test:integrity  # doc side only — static, no browser, no credentials
pnpm test:ui         # UI side only — against staging
pnpm issues          # machine-readable, action-oriented failures
pnpm report          # HTML report (failures include screenshots, video, trace)
```

`pnpm test` runs two Playwright projects — `integrity` (doc side) and `tests`
(UI side). `integrity` runs first and needs no credentials, so a stale baseline
(e.g. a doc that moved) fails fast before the browser suite starts.

Authentication is automatic: a worker-scoped fixture (`tests/auth.fixture.ts`)
logs in once per run with `CONSOLE_STAGING_USER_EMAIL` / `_PASSWORD` and keeps
the session in memory. **No `auth.json` is written or read** — nothing has to
pre-exist, so it behaves identically locally and in CI (where the credentials
come from GitHub Secrets). The seeded staging user has no 2FA.

`pnpm test` always writes `output/issues.json` — a summary plus one entry per
failing assertion, sorted by `source_line`, each carrying `source_file:line`,
the offending `source_quote`, and a one-line error. For `element_*` failures it
also captures the live page's same-kind labels (`observed_candidates`) and, when
unambiguous, a `suggested_target`, so a downstream LLM can propose a doc fix
without re-running the browser.

## Adding a new test case

There are two paths, depending on whether you're covering a whole new page or
adding a single claim.

### Cover a new page (the usual way)

1. Add the doc's repo-relative path to **`pages.json`**, e.g.
   `"sources/platform/account/notifications.md"`. Only add pages that document
   the **Console** UI — not the public marketing site (see the surface-mismatch
   gap below).
2. Run `pnpm extract sources/platform/account/notifications.md` (one page) or
   `pnpm extract:all` (everything). This writes `assertions/account-notifications.json`.
3. **Review the diff** — this is the real work. The extractor is a first draft;
   you confirm each assertion is a genuine, testable UI claim and delete the
   ones that aren't (see [Curating the diff](#curating-the-diff)).
4. `pnpm test:integrity` to confirm the doc side resolves, then `pnpm test` to
   validate against staging. Adjust or drop any assertion that fails for a
   reason other than real drift.
5. Commit `pages.json` + the new `assertions/*.json`.

Removing a page: delete its line from `pages.json` and its
`assertions/<slug>.json`.

### Add or edit a single assertion by hand

Assertions are plain JSON — you can hand-write one without re-extracting. Each
lives in `assertions/<page>.json` under `assertions[]`:

```json
{
  "id": "notifications-tab",              // unique, kebab-case
  "kind": "element_tab",                  // route | element_tab | element_button | element_text
  "target": "Notifications",              // route path (kind=route) OR the visible UI label
  "at": "/settings/notifications",        // page to open first (element_* only); omit for a route
  "page_context": "Settings > Notifications tab",   // human note, not asserted
  "source_quote": "The **Notifications** tab lets you…",  // exact text copied from the doc
  "source_line": 42,                      // 1-indexed line of that text in source_file
  "needs_auth": true                      // false = run logged-out (sign-up/sign-in pages)
}
```

Then run `pnpm test:integrity` (verifies `source_file`/`source_quote`/`source_line`
resolve) and `pnpm test`. `source_file` is set once per file at the top level, so
a hand-added assertion inherits it.

> An `element_*` assertion **without** `at` is intentionally *skipped*, not
> failed — it has no landing route to open. Those are the detail-page-fixture
> gap (below). Give it an `at` only when there's a real page it appears on.

### Curating the diff

The extractor over-generates; a few recurring false positives to delete on sight:

- **Bolded prose that isn't a UI label.** House style bolds real UI element
  names, but authors also bold for emphasis. `"The tab shows **third-party apps
  and services**…"` is a description, not a clickable label — drop it.
- **Sign-up / sign-in form buttons.** Console's `/sign-up` serves the app, not a
  form, so "Sign up" / "Continue with Google" buttons aren't present — don't
  assert them. The `/sign-up` and `/sign-in` *routes* are fine.
- **Surface mismatch.** If the doc describes `apify.com/store` (public site) but
  the harness tests Console `/store`, labels can differ — verify before adding.

## CI

`.github/workflows/docs-ui-tests.yaml` runs `pnpm test` (both suites) on a weekly
schedule and on manual dispatch: it installs Playwright, logs in with the
`CONSOLE_STAGING_*` repo secrets, evaluates the committed baseline against
staging, uploads the report, and files a `docs-ui-drift` issue when any assertion
fails — UI-side *or* doc-side. Extraction never runs in CI; the reviewed baseline
is the only input. The workflow triggers only from the default branch, so
pre-merge validation is a local `pnpm test` (or a temporary `push:` trigger on a
throwaway branch).

## Known gaps (deferred)

- **Coverage is a starting slice.** `pages.json` covers the account section
  (`account/console` dashboard, `account/settings`, `account/billing`) — routes
  and landing-page elements. (`console/store.md` was dropped: it has no bold UI
  element labels to test.) Widening to more pages is a follow-up: add to
  `pages.json`, re-extract, review, commit.
- **Detail-page fixtures.** Assertions about Actor-detail, Schedule-detail, etc.
  need a known fixture to navigate to. The runner currently *skips* element
  assertions with no `at` route — surfacing the gap without false negatives.
  Requires the seeded-user fixtures (1 Actor, 1 task, 1 schedule, named storages,
  1 webhook, 1 completed run) from the Notion plan.
- **Left-nav group check.** The documented global nav items (Dashboard/Store/
  Actors/…) are a Console-wide check, not a per-page claim — not modeled yet.
- **Multi-step flows.** The schema only supports atomic claims (one
  navigate-then-check). "Click X, then Y, then Z" sequences are not modeled.
- **Surface mismatch.** Some docs describe the public marketing site (e.g.
  `apify.com/store`) while the harness tests the Console (`/store`); the two can
  use different labels, so those element claims may not map. Check the surface a
  page actually documents before adding element assertions for it.

## Files

```
docs-tests/
├── pages.json                   # adjustable list of docs pages to cover
├── assertions/                  # committed baseline, one JSON per page (generated)
├── prompts/
│   ├── extract-system.md        # system prompt + known-routes table
│   └── assertion-schema.json    # JSON Schema for the extractor output
├── scripts/
│   ├── extract.sh               # one page  → assertions/<slug>.json
│   └── extract-all.sh           # whole manifest
├── reporters/issues-reporter.ts # custom Playwright reporter → output/issues.json
├── tests/
│   ├── auth.fixture.ts             # worker-scoped login from env creds (in-memory session)
│   ├── from-doc.spec.ts            # UI side: reads assertions/*.json, checks Console staging
│   ├── baseline-integrity.spec.ts  # doc side: checks each source_file/source_quote resolves
│   └── similarity.ts               # suggest-replacement helper for failures
├── playwright.config.ts         # two projects: `integrity` (doc) + `tests` (UI)
└── .env                         # CONSOLE_STAGING_URL + creds (gitignored)
```
