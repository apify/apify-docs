# Documentation writing process

Agent-agnostic workflow for writing or editing Apify documentation.

## Step 1: Determine documentation type

| Type | Goal | Location |
|---|---|---|
| Platform docs | Practical guidance for features | `sources/platform/` |
| Guides | Explain how to solve a problem | `sources/platform/` or `sources/academy/` |
| Reference | Technical specifications | `sources/platform/` |
| Tutorial | Step-by-step learning | Use the tutorial workflow instead |

## Step 2: Research

- Read 2-3 existing pages in the same directory to match patterns
- Check `standards/terminology.md` for product name capitalization
- Identify related pages to link to

## Step 3: Create front matter

```yaml
---
title: Sentence case title
description: 140-160 character value-focused description
sidebar_position: 1.0
slug: /path/to/page
---
```

## Step 4: Write content

Follow the structure template for the doc type in `references/doc-structures.md`:

- **Platform docs**: introduction → when to use → configure/use → best practices → related features
- **Guides**: introduction → prerequisites → step-by-step → code examples → testing → summary
- **Reference**: overview → parameters/options → examples → related information

## Step 5: Quality check

- Run `npm run lint:md` on the new or edited file
- Run `vale "<file>" --minAlertLevel=error`
- Run `npm start` (or `npm run build`) to verify no broken links or slug conflicts

Key rules: US English, active voice, imperative tone, sentence case headings, bold for UI elements only, all admonitions need titles, code blocks need language tags.

## Edge cases

### Editing existing pages

Read the full existing page before making changes. Preserve the existing structure and voice. Only modify what's needed.

### Description length

Front matter `description` must be 140-160 characters for SEO. Focus on user value, not feature lists.

### Page doesn't match sibling pages

Before writing, read sibling pages in the same directory. Match heading structure, code example style, and admonition usage.
