---
name: review-docs
description: Review Apify documentation for style guide compliance, quality standards, and best practices. Use when user says "review this doc", "check this page", "audit documentation", "review before PR", "is this ready to publish", or "review-docs". Runs automated checks and manual review against Apify style guide.
allowed-tools: Read Bash Glob Grep Agent
metadata:
  argument-hint: file-path
---

# Documentation review

## Process

1. **Verify file version** - `git status` to confirm you have the latest
2. **Run deterministic checks** - these are objective, no judgment needed:
   - `npm run lint:md` (heading hierarchy, list numbering, spacing)
   - `vale "<file>" --minAlertLevel=error` (prose style, pronouns, dashes, code fences, admonitions)
   - `workflows/review-docs/scripts/check-frontmatter.sh "<file>"` (description char count)
3. **LLM review** - focus on what tools can't check:
   - Content structure (clear intro, logical flow, next steps)
   - Technical accuracy (code examples correct, API endpoints current)
   - Completeness (prerequisites listed, edge cases covered)
   - Terminology edge cases (check `standards/terminology.md` when unsure)
   - Code example quality (complete, runnable, commented where needed)
4. **Format output** per `workflows/review-docs/references/review-format.md`

Tools first, LLM second. Report tool failures as objective facts. Report LLM findings as judgment calls.

For detailed process notes and edge cases, see `workflows/review-docs/process.md`.
