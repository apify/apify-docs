---
description: Content quality checklist and review standards
globs: ["sources/**/*.md", "sources/**/*.mdx"]
alwaysApply: true
---

# Quality Standards

Comprehensive quality checklist for all Apify documentation. Use this before submitting any content for review.

## Automated changes verification

:::danger Critical requirement for AI assistants

**When using regex, find-and-replace, or any automated command to perform mass changes across files, you MUST verify every single change individually before committing.**

Automated replacements are error-prone and can break:
- **Headings:** Proper nouns (GitHub, Docker), Apify products (Actors, Console), acronyms (API, SDK), capitalization after colons
- **Code examples:** Variable names, API endpoints, function calls, configuration values
- **Links:** URL paths, anchor references, file paths
- **Terminology:** Product names, feature names, technical terms with specific capitalization
- **Context-specific formatting:** Bold UI elements vs regular text, inline code vs prose

**Required process:**
1. Run the automated replacement command
1. Review the complete `git diff` output
1. Check every single changed line individually
1. Manually correct any broken proper nouns, acronyms, or context-dependent cases
1. Only commit after verifying all changes line-by-line

Never commit automated changes without verifying each one. Use diff tools to catch errors before committing.

:::

## Complete quality checklist

Before submitting documentation, verify:

### Writing and style

- [ ] Content follows **writing-style.md** (sentence case headings, active voice, no sales language)
- [ ] Language is US English (analyze, color, not analyse, colour)
- [ ] Tone is imperative and direct (use "Install the package" not "You should install")
- [ ] No first person (avoid "I recommend", use "we" for Apify team only)
- [ ] Content is simple (no sentence over 30 words, gets to the point)
- [ ] No em dashes (use hyphen with spaces: ` - ` instead of `—`)

### Formatting and structure

- [ ] Front matter follows **content-standards.md** (title, description 140-160 chars, sidebar_position, slug)
- [ ] Headings use sentence case (not title case) and no gerunds (-ing forms)
- [ ] Heading hierarchy is correct (H2 → H3 → H4, no skipped levels; H1 comes from front matter title)
- [ ] Bold used only for UI elements and critical warnings (not for structure or list intros)
- [ ] Code formatting uses backticks for file names, commands, config keys
- [ ] All admonitions have titles (required by **content-standards.md**)
- [ ] Lists use parallel structure (all items follow same grammatical pattern)
- [ ] Numbered lists use `1.` for all items (not sequential numbers)

### Terminology

- [ ] Apify product names follow **terminology.md** (Apify Actor, Apify Proxy, not actor/proxy)
- [ ] Platform terms use lowercase with "the" (the Apify platform, not Platform)
- [ ] Feature terms use lowercase (task, schedule, dataset, not Task/Schedule/Dataset)
- [ ] Word choice is precise (legacy vs alternative vs deprecated used correctly)

### Code examples

- [ ] Code examples are complete and runnable
- [ ] Syntax highlighting specified for all code blocks
- [ ] Code tabs used for multi-language examples
- [ ] Dockerfile tags match package.json versions
- [ ] Examples tested and working with current versions
- [ ] Comments only where logic isn't self-evident

### Links and references

- [ ] Link text is descriptive and action-oriented (no "click here" or "here")
- [ ] Internal links use relative paths (not full URLs)
- [ ] External tool mentions are linked to official sites
- [ ] Actor references include link on first mention
- [ ] No broken links (verify all URLs)

### Images and media

- [ ] All images include meaningful alt text
- [ ] Screenshots use light theme
- [ ] Red indicators used to highlight UI elements
- [ ] Images stored in `images/` subdirectory
- [ ] Image format is appropriate (PNG for screenshots, SVG for logos)

### File organization

- [ ] File naming follows **file-organization.md** (kebab-case)
- [ ] File placed in correct directory (platform/, academy/, api-reference/)
- [ ] Images in appropriate images/ subdirectory

### Technical validation

- [ ] Markdownlint passes (`npm run lint:md`) - Markdown syntax and formatting
- [ ] Vale style checks pass (no critical errors) - Prose and style validation
- [ ] No spelling errors in content

## Content type-specific standards

### For documentation pages

Use the **doc-write** skill for comprehensive guidance on:
- Content structure (introduction, prerequisites, steps, examples, summary)
- Documentation type distinction (tutorials vs guides vs reference)
- Platform-specific or Academy-specific requirements

### For tutorials

Use the **tutorial** skill for comprehensive guidance on:
- Tutorial structure template (8-section format)
- Learning objectives and expected outcomes
- Step-by-step instructions with verification
- Troubleshooting section

### For API documentation

Use the **api-doc** skill for comprehensive guidance on:
- OpenAPI specification standards
- Operation ID conventions
- Code sample requirements (JavaScript and Python)
- Schema and path documentation

### For documentation review

Use the **review-docs** skill for comprehensive guidance on:
- Review process and priority ranking
- Common issues and how to fix them
- Output format for review feedback

## Pre-submission checklist

Final verification before creating a pull request:

1. [ ] All items in quality checklist above are verified
1. [ ] Content reviewed against appropriate skill standards (if applicable)
1. [ ] Changes tested locally (preview looks correct)
1. [ ] All linting and validation passes
1. [ ] No console errors in local preview
1. [ ] Navigation works correctly (sidebar, breadcrumbs, links)
1. [ ] Search functionality works for new content
1. [ ] Cross-references to other pages are accurate
