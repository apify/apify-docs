---
name: tutorial
description: Create structured tutorials for Apify Academy or Platform documentation. Use when user says "create a tutorial", "write a tutorial", "build a step-by-step guide", "convert this guide into a tutorial", or "tutorial for [topic]". Handles tutorial structure, learning objectives, prerequisites, step-by-step instructions, code examples, and troubleshooting sections.
---

# Tutorial creator

Create comprehensive, structured tutorials for Apify documentation following the 8-section template.

## Instructions

### Step 1: Determine tutorial type

Identify the tutorial type based on user request:

- **Platform tutorial** - How to use Apify platform features (`sources/platform/`)
- **Academy tutorial** - Teaching web scraping or automation concepts (`sources/academy/tutorials/`)
- **Integration tutorial** - Connecting Apify with other tools (`sources/platform/integrations/`)

### Step 2: Create front matter

```yaml
---
title: Action-oriented title in sentence case
description: Value-focused description, 140-160 characters
sidebar_position: 1.0
slug: /category/tutorial-name
---
```

Use simple present tense ("Create an Actor" not "Creating an Actor"). Match slug to file path.

### Step 3: Write tutorial content

Follow the 8-section template in `references/tutorial-template.md`:

1. Introduction with learning objectives
1. Prerequisites with checklist and time estimate
1. Step-by-step instructions (numbered, action verbs)
1. Code examples (complete, runnable, with code tabs)
1. Testing/verification with expected output
1. Troubleshooting for common issues
1. Summary of accomplishments
1. Next steps with links

### Step 4: Apply quality standards

All standards from `.claude/rules/` apply. Key tutorial-specific checks:

- [ ] Clear learning objectives in introduction
- [ ] Prerequisites listed with time estimate
- [ ] Steps are numbered and start with action verbs
- [ ] Code examples are complete, tested, and runnable
- [ ] Expected results shown after each major step
- [ ] Common issues addressed in troubleshooting
- [ ] Summary lists what user accomplished
- [ ] Next steps and related content linked

For general quality standards (front matter, formatting, terminology), see `quality-standards.md`.

## Examples

Example 1: Platform tutorial request

User says: "Create a tutorial for deploying an Actor to production"

Actions:
1. Create file at `sources/platform/actors/tutorials/deploy-actor.md`
1. Use platform tutorial structure from template
1. Include prerequisites (Apify account, Actor ready)
1. Write step-by-step deployment instructions with screenshots
1. Add code examples for `apify push` and Console deployment
1. Include troubleshooting for common deployment errors

Result: Complete tutorial following 8-section template, ready for review.

Example 2: Academy tutorial request

User says: "Write a tutorial on web scraping with Playwright"

Actions:
1. Create file at `sources/academy/tutorials/playwright-scraping.md`
1. Use academy tutorial structure (educational, concept-focused)
1. Include prerequisites (Node.js, basic JavaScript)
1. Teach concepts progressively with working code at each step
1. Include both JavaScript and Python code tabs

Result: Educational tutorial with progressive learning structure.

## Troubleshooting

### Build fails after adding tutorial

Cause: Missing or incorrect front matter (slug mismatch, missing description).

Solution: Verify front matter has all required fields. Run `npm run build` to catch broken links and slug issues. Check that `onBrokenLinks` errors reference your new file.

### Code examples don't render correctly

Cause: Missing language tag on code blocks or incorrect code tab syntax.

Solution: Ensure every code block has a language specifier. For code tabs, use the exact Docusaurus `Tabs`/`TabItem` import pattern from `references/tutorial-template.md`.

### Tutorial doesn't appear in sidebar

Cause: Missing `sidebar_position` in front matter or file in wrong directory.

Solution: Add `sidebar_position` and verify the file is in the correct `sources/` subdirectory. Check `sidebars.js` if using manual sidebar configuration.

## Output

Provide a complete tutorial following the 8-section template, ready to be committed to the repository.
