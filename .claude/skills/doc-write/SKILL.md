---
name: doc-write
description: Write or edit Apify documentation pages following the style guide. Use when user says "write docs for", "create a new page", "document this feature", "add documentation about", "edit this doc page", or "write a guide for [topic]". Handles platform docs, guides, and reference pages with proper formatting and structure.
---

# Documentation writer

Write or edit Apify documentation following the established style guide and best practices.

## Instructions

### Step 1: Determine documentation type

| Type | Goal | Location |
|---|---|---|
| Platform docs | Practical guidance for features | `sources/platform/` |
| Guides | Explain how to solve a problem | `sources/platform/` or `sources/academy/` |
| Reference | Technical specifications | `sources/platform/` |
| Tutorial | Step-by-step learning | Use `/tutorial` skill instead |

For tutorials, use the `/tutorial` skill which has a dedicated 8-section structure.

### Step 2: Create front matter

```yaml
---
title: Sentence case title
description: 140-160 character value-focused description
sidebar_position: 1.0
slug: /path/to/page
---
```

### Step 3: Write content following type structure

See `references/doc-structures.md` for detailed templates per documentation type.

**Platform documentation**: Introduction → When to use → How to configure/use → Best practices → Related features

**Guides**: Introduction → Prerequisites → Step-by-step → Code examples → Testing → Summary

**Reference**: Overview → Parameters/options → Examples → Related information

### Step 4: Apply quality standards

All standards from `.claude/rules/` apply. Key doc-write checks:

- [ ] Structure matches documentation type
- [ ] Introduction clearly states what the user will learn
- [ ] Prerequisites listed if needed
- [ ] Code examples are complete and tested
- [ ] Each step has clear instructions
- [ ] Related documentation is linked
- [ ] No assumptions about product features (ask if unsure)

For the complete quality checklist, see `quality-standards.md`.

## Examples

Example 1: New feature documentation

User says: "Write docs for the new standby mode feature"

Actions:
1. Create file at `sources/platform/actors/standby-mode.md`
1. Use platform documentation structure
1. Write introduction explaining what standby mode is and when to use it
1. Add configuration steps with code examples
1. Include best practices and link to related Actor docs

Result: Complete platform doc page ready for review.

Example 2: Edit existing page

User says: "Update the storage docs to include the new retention policy"

Actions:
1. Read existing file to understand current structure
1. Add new section following existing patterns
1. Ensure new content matches style guide
1. Verify no broken links or heading hierarchy issues

Result: Updated page with new section, preserving existing structure.

## Troubleshooting

### Description too short or too long

Cause: Front matter `description` must be 140-160 characters for SEO.

Solution: Focus on user value, not feature lists. Use active language. Count characters and adjust. Example: "Learn how to store and manage data in Apify datasets, key-value stores, and request queues for your Actors." (112 chars - too short, expand with more value).

### Heading hierarchy warnings from markdownlint

Cause: Skipped heading levels (e.g., H2 → H4) or multiple H1 tags.

Solution: H1 comes from front matter `title`. Start page content with H2, then H3 for subsections. Never skip levels.

### Page doesn't match existing documentation patterns

Cause: New page uses different structure than sibling pages.

Solution: Before writing, read 2-3 existing pages in the same directory to match patterns. Check heading structure, code example style, and admonition usage.

## Output

Provide complete documentation with proper formatting, ready to be committed to the repository.
