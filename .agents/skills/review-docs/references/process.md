# Documentation review process

Agent-agnostic workflow for reviewing Apify documentation.

## Step 1: Verify latest file version

- Run `git status` to check for unsaved changes
- If reviewing a PR: `git fetch && git checkout <branch>` to ensure the branch is current

## Step 2: Run deterministic checks

These are objective - no judgment needed. Report all failures. Run in the main process (not in subagents).

- `npm run lint:md` (markdownlint: heading hierarchy, double spaces, list numbering)
- `vale "<file>" --minAlertLevel=error` (prose style, dashes, code fences, admonitions)
- `.agents/skills/review-docs/scripts/check-frontmatter.sh "<file>"` (description char count)

## Step 3: Delegated standards review

Spawn one subagent per standards file to check compliance in parallel. Each subagent reads the file being reviewed plus one standards file, and returns violations with line numbers and suggested fixes.

- Subagent 1: check against `standards/writing-style.md` (voice, tone, headings, links)
- Subagent 2: check against `standards/content-standards.md` (front matter, admonitions, code blocks)
- Subagent 3: check against `standards/terminology.md` (product names, article usage)
- Subagent 4: check against `standards/grammar-rules.md` (hyphenation, punctuation, brand spelling)

Why subagents: each standards file gets dedicated attention. A single-pass review with a summary tends to miss edge cases (comma rules, article usage, brand spelling) that a focused read catches.

Why not deterministic tools in subagents: subagents may have sandbox restrictions that prevent running Bash commands. Keep all tool execution in the main process.

## Step 4: Content review

Run in the main process. Focus on what neither deterministic tools nor standards files cover:

- [ ] Content structure (clear intro, logical progression, next steps)
- [ ] Technical accuracy (code examples correct, API endpoints current)
- [ ] Completeness (prerequisites listed, edge cases addressed)
- [ ] Text formatting judgment (is bold usage for a UI element or misuse?)
- [ ] Link quality beyond "click here" (is the text genuinely descriptive?)
- [ ] Code example quality (complete, runnable, commented where needed)

## Step 5: Format output

Merge deterministic results + subagent findings + content review into structured output per `.agents/skills/review-docs/references/review-format.md`.

- Tool findings are objective facts
- Standards findings are rule-based judgment calls
- Content findings are subjective judgment calls
- Prioritize by impact: critical → important → minor

## Edge cases

### Reviewing generated API docs

Never review files in `apify-api/docs/` - they're generated. Review the OpenAPI YAML source in `apify-api/openapi/` instead.

### Reviewing pages with code tabs

Check that both JavaScript and Python examples are present and functionally equivalent. Verify code tab syntax matches the Docusaurus `Tabs`/`TabItem` pattern.

### Markdownlint false positives on admonitions

Markdownlint doesn't understand Docusaurus `:::` syntax natively. Check `.markdownlint.json` for configured exceptions. Focus on Vale for prose quality.
