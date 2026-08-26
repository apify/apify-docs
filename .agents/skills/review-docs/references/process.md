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

Vale carries most of the style guide. Run it at suggestion level, since the default hides suggestions and some documented rules ship at that level. Report what it says rather than re-checking its ground by hand or handing it to a subagent.

If `vale` isn't installed, say so in the output. Don't substitute a subagent pass. The PR check runs at error level on changed files only, so a green check is not equivalent to a local run.

## Step 3: Delegated review

Spawn subagents only for what no tool can check. Each reads the file being reviewed plus one standards file, and returns findings with line numbers and suggested fixes.

- Subagent 1, `standards/style-guide.md`: bold used for anything other than a UI element or critical warning, link text that isn't genuinely descriptive, parallel structure in lists, Oxford commas, legacy vs alternative vs deprecated used precisely, and acronyms expanded on first use
- Subagent 2, `standards/page-structure.md`: information ordering (no concept used before it's explained), whether each screenshot earns its place and follows the treatment rules (light theme, `#F86606` border, no arrows or circles), and whether the admonition type fits its content

Everything else in the standards files is either enforced by Vale or checked by the scripts above. Subagents are only for judgment no rule can express, like whether an image carries information the prose doesn't, or whether `:::caution` is the right severity.

Keep tool execution in the main process. Subagents may have sandbox restrictions that stop them running Bash.

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
