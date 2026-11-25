# docs-tests

Docs-as-tests for the Apify Console. Every UI claim in the platform docs — a
route resolves, a tab is named X, a button exists on page Y — is a testable
assertion. This package extracts those assertions from the docs with an LLM and
stores them as a reviewed baseline.

```
pages.json ──extract──▶ assertions/*.json ──check──▶ PR annotations
(page list)  (claude -p)  (committed baseline)  (static, in this repo)
```

This repository holds the **baseline and static checks only**. It is public, so
it runs no browser against Console and stores no Console credentials. Checking
the assertions against the live Console UI needs a signed-in session, and that
runs outside this repository, with the baseline read as data.

## Model

1. **`pages.json`** is an adjustable list of documentation pages (real source
   files under `sources/platform/…`) to cover.
2. **`scripts/extract.sh`** feeds one page to `claude -p` with a strict JSON
   schema and writes the result to `assertions/<slug>.json`.
   `scripts/extract-all.sh` does the whole manifest.
3. **`assertions/`** is the *stored, reviewed baseline* — committed to the repo.
   Regenerate it with the LLM whenever docs change, review the diff, commit.
   The assertion set is owned by humans even though a model drafts it.
4. **`scripts/check-baseline.mjs`** checks the baseline statically:
   - **Format** — every assertion follows the [format rules](#format-rules).
     A violation fails the check.
   - **Doc drift** — every assertion's `source_file` still exists and its
     `source_quote` still appears in it. This catches docs being moved or
     rewritten under the baseline. A stale assertion is a warning; add
     `--strict` to make it fail.

The Notion plan *"AI-based testing for docs"* (its Part 1 routes + Part 2
elements) is the inspiration for which pages and claims to cover — not a fixed
transcription. The authoritative set is whatever the manifest + extractor
produce and a human commits.

## Assertion kinds

| Kind             | Claim                                                               |
| ---------------- | ------------------------------------------------------------------ |
| `route`          | Documented path is reachable                                       |
| `element_tab`    | Documented tab label exists on the page named in `at`              |
| `element_button` | Documented button label exists on the page named in `at`          |
| `element_text`   | Documented heading/label/field is visible on the page named in `at` |

## Setup

Nothing to install: the check and its tests use only Node.js (version 24) built-ins.
Extraction also needs the `claude` CLI, `jq` and `perl`.

## Generate / refresh the assertion baseline

```bash
# Every page in pages.json:
bash scripts/extract-all.sh

# Or a single page:
bash scripts/extract.sh sources/platform/account/settings/index.md
```

The extractor writes `assertions/<slug>.json`, where `<slug>` is the doc path
with `sources/platform/` stripped and `/` turned into `-` (so
`account/settings.md` → `account-settings.json`). Output is pretty-printed and
normalized through `jq` so re-extractions stay diff-friendly.

Review the diff in `assertions/`, then commit. **This is the step a human owns** —
the model drafts; you decide what's a real, testable UI claim (see
[Adding a new test case](#adding-a-new-test-case)).

## Check the baseline

```bash
node scripts/check-baseline.mjs            # format errors fail, stale assertions warn
node scripts/check-baseline.mjs --strict   # stale assertions fail too
node --test scripts/                       # tests for the checker itself
```

Each finding names the assertion, its file and, for doc drift, the
`source_file:line` of the offending prose.

## Format rules

The baseline is read by a browser job outside this repository, so the format is
strict. The check rejects anything else:

- `kind` is one of the four kinds above.
- `id` is unique within the file and kebab-case.
- `target` of a `route`, and every `at`, is a plain Console path: it starts with
  a single `/` and has no scheme, host, backslash, whitespace or `..`
  (`/billing#/limits` is fine, `https://…` and `//host/…` are not).
- `target` of an `element_*` assertion is a visible label of at most 120 characters.
- `source_file` is a Markdown file under `sources/`.
- No fields other than those shown in the example below.

## Adding a new test case

There are two paths, depending on whether you're covering a whole new page or
adding a single claim.

### Cover a new page (the usual way)

1. Add the doc's repo-relative path to **`pages.json`**, e.g.
   `"sources/platform/account/notifications.md"`. Only add pages that document
   the **Console** UI — not the public marketing site (see the surface-mismatch
   gap below).
2. Run `bash scripts/extract.sh sources/platform/account/notifications.md` (one
   page) or `bash scripts/extract-all.sh` (everything). This writes
   `assertions/account-notifications.json`.
3. **Review the diff** — this is the real work. The extractor is a first draft;
   you confirm each assertion is a genuine, testable UI claim and delete the
   ones that aren't (see [Curating the diff](#curating-the-diff)).
4. Run `node scripts/check-baseline.mjs --strict` to confirm the format and the
   doc side.
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

Then run `node scripts/check-baseline.mjs --strict`. `source_file` is set once
per file at the top level, so a hand-added assertion inherits it.

> An `element_*` assertion **without** `at` has no landing route to open, so a
> browser run can only skip it. Those are the detail-page-fixture gap (below).
> Give it an `at` only when there's a real page it appears on.

### Curating the diff

The extractor over-generates; a few recurring false positives to delete on sight:

- **Bolded prose that isn't a UI label.** House style bolds real UI element
  names, but authors also bold for emphasis. `"The tab shows **third-party apps
  and services**…"` is a description, not a clickable label — drop it.
- **Sign-up / sign-in form buttons.** Console's `/sign-up` serves the app, not a
  form, so "Sign up" / "Continue with Google" buttons aren't present — don't
  assert them. The `/sign-up` and `/sign-in` *routes* are fine.
- **Surface mismatch.** If the doc describes `apify.com/store` (public site) but
  the assertion targets Console `/store`, labels can differ — verify before adding.

## CI

`.github/workflows/docs-ui-tests.yaml` runs the checker's tests and
`check-baseline.mjs` on pull requests and pushes to `master` that touch
`sources/platform/**` or `docs-tests/**`. The job has read-only permissions,
uses no secrets and installs no dependencies. A format violation fails it; a
stale assertion shows up as a warning annotation and in the job summary.

## Known gaps (deferred)

- **Coverage is a starting slice.** `pages.json` covers the account section
  (`account/console` dashboard, `account/settings`, `account/billing`) — routes
  and landing-page elements. (`console/store.md` was dropped: it has no bold UI
  element labels to test.) Widening to more pages is a follow-up: add to
  `pages.json`, re-extract, review, commit.
- **Detail-page fixtures.** Assertions about Actor-detail, Schedule-detail, etc.
  need a known fixture to navigate to, so they have no `at` route yet.
- **Left-nav group check.** The documented global nav items (Dashboard/Store/
  Actors/…) are a Console-wide check, not a per-page claim — not modeled yet.
- **Multi-step flows.** The schema only supports atomic claims (one
  navigate-then-check). "Click X, then Y, then Z" sequences are not modeled.
- **Surface mismatch.** Some docs describe the public marketing site (e.g.
  `apify.com/store`) while the assertions target the Console (`/store`); the two
  can use different labels, so those element claims may not map. Check the
  surface a page actually documents before adding element assertions for it.

## Files

```
docs-tests/
├── pages.json                    # adjustable list of docs pages to cover
├── assertions/                   # committed baseline, one JSON per page (generated)
├── prompts/
│   ├── extract-system.md         # system prompt + known-routes table
│   └── assertion-schema.json     # JSON Schema for the extractor output
└── scripts/
    ├── extract.sh                # one page  → assertions/<slug>.json
    ├── extract-all.sh            # whole manifest
    ├── check-baseline.mjs        # static format + doc-drift check
    └── check-baseline.test.mjs   # tests for the checker
```
