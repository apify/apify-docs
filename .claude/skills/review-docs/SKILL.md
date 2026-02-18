---
name: review-docs
description: Review Apify documentation for style guide compliance, quality standards, and best practices. Use when user says "review this doc", "check this page", "audit documentation", "review before PR", "is this ready to publish", or "review-docs". Runs automated checks and manual review against Apify style guide.
---

# Documentation review

Review documentation for compliance with Apify style guide, quality standards, and best practices.

## Instructions

### Step 1: Check latest changes

**CRITICAL**: Verify you're reviewing the latest version of the file. If reviewing a PR, confirm the branch is up to date.

### Step 2: Run automated checks

```bash
npm run lint:md        # Markdownlint - Markdown syntax/formatting
npm run lint:code      # ESLint - Code linting
vale sync             # Vale - Download styles (first time only)
vale "path/to/file.md" --minAlertLevel=error  # Vale - Prose style check
```

### Step 3: Manual review

Go through the checklist below, noting issues found.

#### Writing quality

- [ ] Headings: Sentence case, no gerunds ("Create" not "Creating")
- [ ] Bold: ONLY for UI elements (not emphasis)
- [ ] Language: US English, active voice, inclusive, simple
- [ ] Terminology: Matches `.claude/rules/terminology.md`

#### Front matter

- [ ] `title` - Sentence case, simple present tense
- [ ] `description` - 140-160 chars, value-focused (not feature list)
- [ ] `slug` - Matches file path
- [ ] `sidebar_position` - Appropriate numbering

#### Content structure

- [ ] Clear introduction
- [ ] Proper heading hierarchy (H1 → H2 → H3, no skips)
- [ ] Logical topic progression
- [ ] Summary/next steps at end
- [ ] Related content linked

#### Formatting

- [ ] Code examples: Complete, runnable, language tag specified
- [ ] Links: Descriptive text (not "click here"), internal use relative paths
- [ ] Images: Meaningful alt text, light theme, red indicators
- [ ] Admonitions: Must have title, appropriate type, max 2-3 per page
- [ ] Code review scope: Comments and obvious mistakes only (not full review)

#### Content-type checks

- **Tutorials**: Clear learning objectives, prerequisites, numbered steps, summary
- **API docs**: Operation IDs follow conventions, parameters documented, code samples included
- **Reference pages**: Parameter tables, default values, type information

### Step 4: Provide feedback

Format your review using the template in `references/review-format.md`.

## Examples

Example 1: Pre-PR review

User says: "Review sources/platform/actors/running.md before I submit"

Actions:
1. Read the file
1. Run `npx markdownlint "sources/platform/actors/running.md"`
1. Check against review checklist
1. Output structured review with strengths, issues, and priority fixes

Example 2: Style audit

User says: "Check if this page follows the style guide"

Actions:
1. Read the file
1. Focus on writing quality and terminology checks
1. Flag specific lines with issues and suggested fixes
1. Provide priority ranking

## Troubleshooting

### Markdownlint reports false positives on admonitions

Cause: Markdownlint doesn't understand Docusaurus `:::` admonition syntax natively.

Solution: Check `.markdownlint.json` for configured exceptions. Some rules (like MD046) may be disabled for admonition blocks. Focus on Vale for prose quality instead.

### Vale reports errors on Apify product names

Cause: Vale styles may not include Apify-specific terminology.

Solution: Check `.vale/styles/` for Apify vocabulary files. If missing, run `vale sync` to download the latest styles. Product names like "Actor", "Console", "Proxy" are correct as capitalized.

### Unsure if a term should be capitalized

Solution: Check `.claude/rules/terminology.md` for the definitive list. Product names (Actor, Console, Proxy, Store) are capitalized. Feature terms (task, schedule, dataset) are lowercase.

## Output

Provide a structured review using the format in `references/review-format.md`, with clear identification of issues, specific examples, concrete suggestions, and priority ranking.
