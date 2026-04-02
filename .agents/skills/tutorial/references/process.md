# Tutorial creation process

Agent-agnostic workflow for creating structured Apify tutorials.

## Step 1: Determine tutorial type

- **Platform tutorial** - How to use Apify platform features (`sources/platform/`)
- **Academy tutorial** - Teaching web scraping or automation concepts (`sources/academy/tutorials/`)
- **Integration tutorial** - Connecting Apify with other tools (`sources/platform/integrations/`)

## Step 2: Research

- Read related docs to understand the topic
- Check existing tutorials for style reference
- Identify prerequisites the reader needs

## Step 3: Create front matter

```yaml
---
title: Action-oriented title in sentence case
description: Value-focused description, 140-160 characters
sidebar_position: 1.0
slug: /category/tutorial-name
---
```

Use simple present tense ("Create an Actor" not "Creating an Actor"). Match slug to file path.

## Step 4: Write tutorial content

Follow the 8-section template in `.agents/skills/tutorial/references/tutorial-template.md`:

1. Introduction with learning objectives
1. Prerequisites with checklist and time estimate
1. Step-by-step instructions (numbered, action verbs)
1. Code examples (complete, runnable, with code tabs)
1. Testing/verification with expected output
1. Troubleshooting for common issues
1. Summary of accomplishments
1. Next steps with links

Each step should have a clear action verb, expected result, and verification. Code examples must be complete - no pseudocode.

## Step 5: Quality check

- Run `npm run lint:md` on the new file
- Run `vale "<file>" --minAlertLevel=error`
- Run `npm start` (or `npm run build`) to verify no broken links or slug conflicts

## Edge cases

### Build fails after adding tutorial

Verify front matter has all required fields. Run `npm run build` to catch broken links and slug issues.

### Code examples don't render correctly

Ensure every code block has a language specifier. For code tabs, use the exact Docusaurus `Tabs`/`TabItem` import pattern from `.agents/skills/tutorial/references/tutorial-template.md`.

### Tutorial doesn't appear in sidebar

Add `sidebar_position` and verify the file is in the correct `sources/` subdirectory.
