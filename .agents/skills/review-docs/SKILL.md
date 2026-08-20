---
name: review-docs
description: Review Apify documentation for style guide compliance, quality standards, and best practices. Use when user says "review this doc", "check this page", "audit documentation", "review before PR", "is this ready to publish", or "review-docs". Runs automated checks and manual review against Apify style guide.
allowed-tools: Read Bash Glob Grep Agent
model: sonnet
argument-hint: file-path
---

# Documentation review

## Process

1. **Verify file version** - `git status` to confirm you have the latest
2. **Run deterministic checks** (main process) - these are objective, no judgment needed:
   - `vale --minAlertLevel=suggestion "<file>"` (prose style: voice, tone, terminology, grammar, headings, link text)
   - `pnpm lint:md` (heading hierarchy, list numbering, spacing)
   - `.agents/skills/review-docs/scripts/check-frontmatter.sh "<file>"` (description char count)

   Vale carries most of the style guide, so don't re-check its ground by hand. If `vale` isn't installed, say so in the output and note that prose-style coverage was skipped.

   Reviewing a pull request rather than one page: run all three over every changed `.md` and `.mdx` file, and report per file. `git diff --name-only origin/master...HEAD -- '*.md' '*.mdx'` gets the list.
3. **Delegated review** - spawn subagents only for what no tool can check. Each reads the file plus its assigned standards section, and returns findings with line numbers and suggested fixes:
   - Subagent 1: information ordering (no concept used before it's explained), parallel structure in lists, Oxford commas, article usage with Apify products - `standards/style-guide.md` and the information ordering section of `standards/page-structure.md`
   - Subagent 2: whether each screenshot earns its place, screenshot treatment (light theme, `#F86606` border, no arrows or circles), and whether the admonition type fits its content - `standards/page-structure.md`
   Launch both in parallel.
4. **Content review** (main process) - focus on what neither tools nor standards cover:
   - Content structure (clear intro, logical flow, next steps)
   - Technical accuracy (code examples correct, API endpoints current)
   - Completeness (prerequisites listed, edge cases covered)
   - Code example quality (complete, runnable, commented where needed)
5. **Format output** - per `.agents/skills/review-docs/references/review-format.md`. Tool output goes in its own section, reported verbatim with rule names and line numbers. Judgment findings go in a separate section, and must not restate anything a tool already reported.

Deterministic tools first, then delegated judgment checks, then content review. Report tool failures as objective facts. Report subagent and content findings as judgment calls.

For detailed process notes and edge cases, see `.agents/skills/review-docs/references/process.md`.
