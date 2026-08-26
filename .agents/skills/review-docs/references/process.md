# Documentation review process

Agent-agnostic workflow for reviewing Apify documentation.

## Step 1: Verify latest file version

- Run `git status` to check for unsaved changes
- If reviewing a PR: `git fetch && git checkout <branch>` to ensure the branch is current

## Step 2: Run deterministic checks

These are objective - no judgment needed. Report all failures. Run in the main process (not in subagents).

- `vale --minAlertLevel=suggestion "<file>"` (prose style: voice, tone, terminology, grammar, headings, link text)
- `pnpm lint:md` (markdownlint: heading hierarchy, double spaces, list numbering)
- `.agents/skills/review-docs/scripts/check-frontmatter.sh "<file>"` (description char count)

Vale carries most of the style guide, about 70 rules from the `apify/vale-rules` package. Run it at suggestion level, because the default hides suggestions and some documented rules ship at that level. Report what it says. Don't re-check its ground by hand, and don't delegate it to a subagent, which is slower and less reliable than the linter at the same job. If `vale` isn't installed, note in the output that prose-style coverage was skipped rather than substituting a subagent pass.

The repo-level PR check runs Vale at `--minAlertLevel=error` on changed files only, so it gates a much smaller set than a local run. Don't treat a green PR check as equivalent.

Two Vale rules are dead but cost nothing, because markdownlint covers the same ground. `Apify.ImageAltText` was dropped in the move to the package and `Apify.AltTextFilename` only fires when alt text looks like a filename, so empty alt text passes Vale, but `MD045` catches it. `Apify.CodeFenceLanguage` declares `tokens:` under `scope: raw` where working raw rules use `raw:`, so it never fires, but `MD040` catches bare fences. Worth cleaning up in `apify/vale-rules`, not worth a workaround here.

## Step 3: Delegated review

Spawn subagents only for what no tool can check. Each reads the file being reviewed plus one standards file, and returns findings with line numbers and suggested fixes.

- Subagent 1, `standards/style-guide.md`: bold used for anything other than a UI element or critical warning, link text that isn't genuinely descriptive, parallel structure in lists, Oxford commas, plus the terminology Vale doesn't reach (see below)
- Subagent 2, `standards/page-structure.md`: information ordering (no concept used before it's explained), whether each screenshot earns its place and follows the treatment rules (light theme, `#F86606` border, no arrows or circles), and whether the admonition type fits its content

### Terminology Vale doesn't reach

The package covers the Apify product-name cluster: `ApifyProductNames`, `ActorCapitalization`, `ApifyBrandCasing`, `TechnologyNames`. It covers nothing else in the terminology section, verified by probing one violation per documented rule. Subagent 1 owns the remainder:

- Feature and concept terms in lowercase: task, run, build, dataset, key-value store, request queue, schedule, web scraping
- Generic technical terms in lowercase: AI agent, MCP server, API endpoint, web scraper, proxy server
- "crawler" and "scraper" capitalized only as part of an Actor name
- legacy vs alternative vs deprecated used precisely
- "version 22" in prose, not "v22" or "ver 22"
- Products that require "the": the Apify SDK, the Apify CLI, the Apify API, the Apify platform. `ApifyProductNames` only catches the opposite direction, where an article must be removed

Why these two and nothing else: everything else in the standards files is either enforced by Vale or checked by the scripts above. Subagents are for judgment that no rule can express, such as whether an image carries information the prose doesn't, or whether `:::caution` is the right severity.

Why one file each: every judgment item lives wholly in one standards file, so no subagent has to read two files or navigate to a section of another. Subagent 1 asks whether the prose is right, subagent 2 asks whether the page is built right.

Why subagents rather than one pass: each gets a focused read. A single review that also has to cover content accuracy tends to skim the judgment calls.

Why not deterministic tools in subagents: subagents may have sandbox restrictions that prevent running Bash commands. Keep all tool execution in the main process.

## Step 4: Content review

Run in the main process. Focus on what neither deterministic tools nor standards files cover:

- [ ] Content structure (clear intro, logical progression, next steps)
- [ ] Technical accuracy (code examples correct, API endpoints current)
- [ ] Completeness (prerequisites listed, edge cases addressed)
- [ ] Code example quality (complete, runnable, commented where needed)

## Step 5: Format output

Merge deterministic results + subagent findings + content review into structured output per `.agents/skills/review-docs/references/review-format.md`.

- Tool findings go in their own section, verbatim, with rule names and line numbers
- Subagent findings are judgment calls against a documented rule
- Content findings are subjective judgment calls
- Never restate a tool finding as a judgment finding. If `vale` reported it, it belongs in the automated section only
- Prioritize by impact: critical → important → minor

## Edge cases

### Reviewing generated API docs

Never review files in `apify-api/docs/` - they're generated. Review the OpenAPI YAML source in `apify-api/openapi/` instead.

### Reviewing pages with code tabs

Check that both JavaScript and Python examples are present and functionally equivalent. Verify code tab syntax matches the Docusaurus `Tabs`/`TabItem` pattern.

### Markdownlint false positives on admonitions

Markdownlint doesn't understand Docusaurus `:::` syntax natively. Check `.markdownlint.json` for configured exceptions. Vale covers admonition titles via `ApifyDocs.AdmonitionTitle`.
