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

   Vale carries most of the style guide, so don't re-check its ground by hand. If it isn't installed, say so and note that prose coverage was skipped.

   For a pull request, run all three over every changed `.md` and `.mdx` file and report per file.
3. **Delegated review** - spawn two subagents in parallel, for what no tool can check. Each reads the page being reviewed plus one standards file, and returns findings with line numbers and suggested fixes:
   - Subagent 1, `standards/style-guide.md`: bold outside UI elements and critical warnings, link text that doesn't say where it goes, non-parallel lists, missing serial commas, and loose use of "legacy", "alternative", or "deprecated"
   - Subagent 2, `standards/page-structure.md`: stacked headings, concepts used before they're explained, screenshots that don't earn their place or break the treatment rules, admonitions that don't fit their content, outnumber one per H2 section, or carry content the prose needs
4. **Content review** (main process) - focus on what neither tools nor standards cover:
   - Content structure (clear intro, logical flow, next steps)
   - Technical accuracy (code examples correct, API endpoints current)
   - Completeness (prerequisites listed, edge cases covered)
   - Code example quality (complete, runnable, commented where needed)
5. **Format output** - per `.agents/skills/review-docs/references/review-format.md`. Tool output goes in its own section, verbatim with rule names and line numbers. Judgment findings go in a separate section and must not restate anything a tool reported.

For detailed process notes and edge cases, see `.agents/skills/review-docs/references/process.md`.
