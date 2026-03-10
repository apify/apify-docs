---
description: Review docs for style guide compliance
argument-hint: file-path
allowed-tools: Read, Bash, Glob, Grep
---

# Documentation review

Review documentation for compliance with Apify style guide, quality standards, and best practices.

## Instructions

### Step 1: Check latest changes

**CRITICAL**: Verify you're reviewing the latest version of the file. If reviewing a PR, confirm the branch is up to date.

## Standards reference

Review compliance against all standards in `.claude/rules/`:

- `writing-style.md` - Prose voice and tone
- `content-standards.md` - Formatting and structure
- `terminology.md` - Product names and capitalization
- `grammar-rules.md` - Grammar mechanics and punctuation
- `quality-standards.md` - Complete quality checklist
- `file-organization.md` - File naming and directory structure

## Review process

### Step 2: Run automated checks

```bash
npm run lint:md        # Markdownlint - Markdown syntax/formatting
npm run lint:code      # ESLint - Code linting
vale "path/to/file.md" --minAlertLevel=error  # Vale - Prose and style
```

## Review checklist

### Style compliance (delegated)

For each rules file, launch a subagent to check the reviewed content against that file's standards. The subagent reads the rules file directly, so the review always uses the latest rules.

Check content compliance against:

1. `writing-style.md` - voice, tone, language patterns
1. `content-standards.md` - formatting, front matter, headings, code, links, images
1. `terminology.md` - product names, article usage, feature terms
1. `grammar-rules.md` - hyphenation, punctuation, numbers, brand spelling

Each subagent should return a list of violations with line numbers and suggested fixes.

### Content review (manual)

These aspects require judgment and aren't covered by the rules files:

- [ ] **Content structure** - Clear introduction, logical progression, summary/next steps
- [ ] **Heading hierarchy** - H2 → H3 → H4, no skipped levels
- [ ] **Technical accuracy** - Code examples tested, API endpoints current, no deprecated features
- [ ] **Completeness** - Prerequisites listed, all steps included, edge cases addressed
- [ ] **Content-type checks**
  - **Tutorials**: Clear learning objectives, sequential numbered steps, verification at each step
  - **API docs**: All parameters documented, code samples in JS and Python, error responses
  - **Reference pages**: Comprehensive parameter tables, default values, type information
- [ ] **Accessibility** - Proper heading hierarchy, descriptive link text, image alt text
- [ ] **SEO** - Descriptive title, meta description 140-160 chars, internal linking

## Examples

Example 1: Pre-PR review

User says: "Review sources/platform/actors/running.md before I submit"

Actions:
1. Read the file
1. Run `npx markdownlint "sources/platform/actors/running.md"`
1. Run `vale "sources/platform/actors/running.md" --minAlertLevel=error`
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
