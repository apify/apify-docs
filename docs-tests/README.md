# docs-tests

Docs-as-tests for the Apify Console. Every UI claim in the platform docs — a
route resolves, a tab is named X, a button exists on page Y — is a testable
assertion. This package extracts those assertions from the docs with an LLM,
stores them as a reviewed baseline, and verifies them against Console staging
with Playwright, so documentation drift is caught automatically.

```
pages.json ──extract──▶ assertions/*.json ──Playwright──▶ output/issues.json
(page list)  (claude -p)  (committed baseline)  (vs staging)   (drift report)
```

## Model

1. **`pages.json`** is an adjustable list of documentation pages (real source
   files under `sources/platform/…`) to cover.
2. **`scripts/extract.sh`** feeds one page to `claude -p` with a strict JSON
   schema and writes the result to `assertions/<slug>.json`.
   `scripts/extract-all.sh` does the whole manifest.
3. **`assertions/`** is the *stored, reviewed baseline* — committed to the repo.
   Regenerate it with the LLM whenever docs change, review the diff, commit.
   The assertion set is owned by humans even though a model drafts it.
4. **`tests/from-doc.spec.ts`** reads every stored assertion and emits one
   Playwright `test()` per assertion, run against `$CONSOLE_STAGING_URL`.
5. Failures point back to `source_file:line` so the offending prose is one click
   away, and land in `output/issues.json` for downstream triage.

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
cp .env.example .env   # fill in CONSOLE_STAGING_URL
```

## Generate / refresh the assertion baseline

```bash
# Every page in pages.json:
pnpm extract:all

# Or a single page:
pnpm extract sources/platform/console/settings.md
```

Review the diff in `assertions/`, then commit. This is the step a human owns.

## Run the tests

```bash
# Authenticate once (seeded staging user). Opens a browser; log in by hand
# (incl. 2FA), then press the green "Resume" button in Playwright Inspector.
# Writes auth.json (gitignored). Skip on subsequent runs.
pnpm auth

pnpm test            # evaluate all stored assertions against staging
pnpm issues          # machine-readable, action-oriented failures
pnpm report          # HTML report (failures include screenshots, video, trace)
```

`pnpm test` always writes `output/issues.json` — a summary plus one entry per
failing assertion, sorted by `source_line`, each carrying `source_file:line`,
the offending `source_quote`, and a one-line error. For `element_*` failures it
also captures the live page's same-kind labels (`observed_candidates`) and, when
unambiguous, a `suggested_target`, so a downstream LLM can propose a doc fix
without re-running the browser.

## Adjusting coverage

Edit `pages.json` and re-run `pnpm extract:all`. Add a page → it gets an
assertion set; remove one → delete its `assertions/<slug>.json`.

## Known gaps (deferred)

- **Detail-page fixtures.** Assertions about Actor-detail, Schedule-detail, etc.
  need a known fixture to navigate to. The runner currently *skips* element
  assertions with no `at` route — surfacing the gap without false negatives.
  Requires the seeded-user fixtures (1 Actor, 1 task, 1 schedule, named storages,
  1 webhook, 1 completed run) from the Notion plan.
- **Left-nav group check.** The documented global nav items (Dashboard/Store/
  Actors/…) are a Console-wide check, not a per-page claim — not modeled yet.
- **Session-gated pages.** Pages like `/settings/security` re-prompt for
  credentials when the stored session is stale; needs a `requires_fresh_session`
  field plus a re-auth flow.
- **Multi-step flows.** The schema only supports atomic claims (one
  navigate-then-check). "Click X, then Y, then Z" sequences are not modeled.
- **No CI yet.** Local only; wiring into a scheduled GitHub Action (modeled on
  `.github/workflows/lychee.yml`) is the follow-up.

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
│   ├── auth.setup.ts            # interactive login, saves auth.json
│   ├── from-doc.spec.ts         # reads assertions/*.json, emits tests
│   └── similarity.ts            # suggest-replacement helper for failures
├── playwright.config.ts
└── .env                         # CONSOLE_STAGING_URL (gitignored)
```
