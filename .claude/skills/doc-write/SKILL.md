---
name: doc-write
description: Write or edit Apify documentation pages following the style guide. Use when user says "write docs for", "create a new page", "document this feature", "add documentation about", "edit this doc page", or "write a guide for [topic]". Handles platform docs, guides, and reference pages with proper formatting and structure.
allowed-tools: Read Write Edit Bash Glob Grep
metadata:
  argument-hint: topic
---

# Documentation writing

## Process

1. **Determine doc type** - platform docs, guide, or reference (tutorials → use `/tutorial`)
2. **Research** - read related existing pages, check `standards/terminology.md` for product names
3. **Create front matter** - title (sentence case), description (140-160 chars), sidebar_position, slug
4. **Write content** following the structure for the doc type:
   - **Platform docs**: intro → prerequisites → main content → code examples → next steps
   - **Guides**: intro with goal → step-by-step instructions → verification → troubleshooting
   - **Reference**: brief description → parameters/options → examples → related pages
5. **Quality check** - run `npm run lint:md` and `vale` before finishing

Key rules: US English, active voice, imperative tone, sentence case headings, bold for UI elements only, all admonitions need titles, code blocks need language tags.

For detailed structure templates, see `workflows/doc-write/references/doc-structures.md`.
For edge cases and process notes, see `workflows/doc-write/process.md`.
