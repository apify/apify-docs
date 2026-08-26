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
3. **Delegated review** - spawn subagents only for what no tool can check. Each reads the file plus one standards file, and returns findings with line numbers and suggested fixes:
   - Subagent 1, `standards/style-guide.md`: bold used for anything other than a UI element or critical warning, link text that isn't genuinely descriptive, parallel structure in lists, Oxford commas, and the terminology Vale doesn't reach - feature and concept terms in lowercase (task, run, build, dataset, key-value store, request queue, schedule, web scraping), generic technical terms in lowercase (AI agent, MCP server, API endpoint, web scraper, proxy server), crawler and scraper capitalized only inside an Actor name, legacy vs alternative vs deprecated used precisely, "version 22" not "v22", and the products that require "the" (the Apify SDK, CLI, API, platform)
   - Subagent 2, `standards/page-structure.md`: information ordering (no concept used before it's explained), whether each screenshot earns its place and follows the treatment rules (light theme, `#F86606` border, no arrows or circles), and whether the admonition type fits its content
   Launch both in parallel.
4. **Content review** (main process) - focus on what neither tools nor standards cover:
   - Content structure (clear intro, logical flow, next steps)
   - Technical accuracy (code examples correct, API endpoints current)
   - Completeness (prerequisites listed, edge cases covered)
   - Code example quality (complete, runnable, commented where needed)
5. **Format output** - per `.agents/skills/review-docs/references/review-format.md`. Tool output goes in its own section, reported verbatim with rule names and line numbers. Judgment findings go in a separate section, and must not restate anything a tool already reported.

Deterministic tools first, then delegated judgment checks, then content review. Report tool failures as objective facts. Report subagent and content findings as judgment calls.

For detailed process notes and edge cases, see `.agents/skills/review-docs/references/process.md`.
