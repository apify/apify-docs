---
name: review-docs
description: Review Apify documentation for style guide compliance, quality standards, and best practices. Use when user says "review this doc", "check this page", "audit documentation", "review before PR", "is this ready to publish", or "review-docs". Runs automated checks and manual review against Apify style guide.
allowed-tools: Read Bash Glob Grep Agent
model: sonnet
metadata:
  argument-hint: file-path
---

# Documentation review

## Process

1. **Verify file version** - `git status` to confirm you have the latest
2. **Run deterministic checks** (main process) - these are objective, no judgment needed:
   - `npm run lint:md` (heading hierarchy, list numbering, spacing)
   - `vale "<file>" --minAlertLevel=error` (prose style, pronouns, dashes, code fences, admonitions)
   - `workflows/review-docs/scripts/check-frontmatter.sh "<file>"` (description char count)
3. **Delegated standards review** - spawn one subagent per standards file to check compliance. Each subagent reads the file being reviewed plus one standards file, and returns violations with line numbers and suggested fixes:
   - Subagent 1: check against `standards/writing-style.md` (voice, tone, headings, links)
   - Subagent 2: check against `standards/content-standards.md` (front matter, admonitions, code blocks)
   - Subagent 3: check against `standards/terminology.md` (product names, article usage)
   - Subagent 4: check against `standards/grammar-rules.md` (hyphenation, punctuation, brand spelling)
   Launch all 4 in parallel.
4. **Content review** (main process) - focus on what standards files don't cover:
   - Content structure (clear intro, logical flow, next steps)
   - Technical accuracy (code examples correct, API endpoints current)
   - Completeness (prerequisites listed, edge cases covered)
   - Code example quality (complete, runnable, commented where needed)
5. **Format output** - merge subagent findings + deterministic results + content review per `workflows/review-docs/references/review-format.md`

Deterministic tools first, then delegated standards checks, then content review. Report tool failures as objective facts. Report standards and content findings as judgment calls.

For detailed process notes and edge cases, see `workflows/review-docs/process.md`.
