# Documentation review process

Agent-agnostic workflow for reviewing Apify documentation.

## Step 1: Verify latest file version

- Run `git status` to check for unsaved changes
- If reviewing a PR: `git fetch && git checkout <branch>` to ensure the branch is current

## Step 2: Run deterministic checks

These are objective - no judgment needed. Report all failures.

- `npm run lint:md` (markdownlint: heading hierarchy, double spaces, list numbering)
- `vale "<file>" --minAlertLevel=error` (prose style, dashes, code fences, admonitions)
- `workflows/review-docs/scripts/check-frontmatter.sh "<file>"` (description char count)

## Step 3: Manual review

The deterministic tools handle mechanical checks. Focus on what requires understanding:

- [ ] Content structure (clear intro, logical progression, next steps)
- [ ] Technical accuracy (code examples correct, API endpoints current)
- [ ] Completeness (prerequisites listed, edge cases addressed)
- [ ] Heading quality (sentence case nuances, gerund detection beyond -ing suffix)
- [ ] Terminology edge cases (check `standards/terminology.md` when unsure)
- [ ] Text formatting judgment (is bold usage for a UI element or misuse?)
- [ ] Link quality beyond "click here" (is the text genuinely descriptive?)
- [ ] Code example quality (complete, runnable, commented where needed)

## Step 4: Format output

Combine tool output and manual findings into structured review per `references/review-format.md`.

- Tool findings are objective facts
- Manual findings are judgment calls
- Prioritize by impact: critical → important → minor

## Edge cases

### Reviewing generated API docs

Never review files in `apify-api/docs/` - they're generated. Review the OpenAPI YAML source in `apify-api/openapi/` instead.

### Reviewing pages with code tabs

Check that both JavaScript and Python examples are present and functionally equivalent. Verify code tab syntax matches the Docusaurus `Tabs`/`TabItem` pattern.

### Markdownlint false positives on admonitions

Markdownlint doesn't understand Docusaurus `:::` syntax natively. Check `.markdownlint.json` for configured exceptions. Focus on Vale for prose quality.
