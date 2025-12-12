# Apify Documentation - AI Agent Guide

## Part 1: Repository-Specific Information

### Project Overview

Docusaurus-based documentation site combining:
- **Platform docs** (`/sources/platform/`) - Product documentation
- **Academy** (`/sources/academy/`) - Educational courses
- **API reference** (`/apify-api/`) - Generated from OpenAPI specs
- **Multi-repo architecture** - SDK/Client docs from separate repos served via nginx

**Key insight:** ONE unified site built from MULTIPLE repositories. See CONTRIBUTING.md for multi-repo setup.

### Architecture & Critical Workflows

#### OpenAPI Documentation Build Pipeline

**Critical:** API docs are generated, NOT hand-written. The workflow:

1. **Source of truth**: `apify-api/openapi/openapi.yaml` (splits into `/paths` and `/components`)
2. **Redocly plugins** (`apify-api/plugins/apify.mjs`) inject custom behavior:
   - `code-samples-decorator.mjs` - Auto-adds code samples if files exist in `/code_samples/{js,curl}/`
   - `legacy-doc-url-decorator.mjs` - Adds backward-compatible URLs
   - `client-references-links-decorator.mjs` - Links to client library docs
3. **Build command**: `npm run api:rebuild` = clean + bundle with Redocly + generate with Docusaurus
4. **Output**: Markdown files in `apify-api/docs/` (gitignored, regenerated on each build)

**Never edit generated files directly**. Edit the OpenAPI YAML or add code samples to trigger auto-inclusion.

#### Custom Theme System

Shared theme in `apify-docs-theme/` workspace:
- Single source of truth for navigation, styling, components
- Used across all 6+ documentation repos
- Changes here propagate via CI to all projects
- Key files: `src/config.js` (nav structure), `src/theme.js` (Docusaurus theme config)

### Project-Specific Patterns

#### OpenAPI Code Samples

Add code samples by creating files in `apify-api/openapi/code_samples/{javascript,curl}/`:
- Filename MUST match `operationId` from OpenAPI spec
- Example: `actorRun_get.js` for operation with `operationId: "actorRun_get"`
- Decorator auto-detects and adds `x-codeSamples` property
- Missing samples logged during build (check console)

#### Slug Collection Pattern

`tools/utils/collectSlugs.js` recursively scans directories for `slug:` in frontmatter. Used in `docusaurus.config.js` to build dynamic navigation with `activeBaseRegex` patterns. When adding new sections, ensure slugs are collected for nav highlighting.

#### External Link Processing

`tools/utils/externalLink.js` rehype plugin auto-adds `target="_blank"` and `rel="noopener noreferrer"` to external links. Internal links (same domain) are detected via `isInternal()` helper.

#### LLMs.txt Generation

Post-build (`scripts/joinLlmsFiles.mjs` + `indentLlmsFile.mjs`):
- Combines `llms.txt` from all sections into root
- Used by AI tools for context (via `@signalwire/docusaurus-plugin-llms-txt`)
- Edit source `llms.txt` files in content dirs, not the generated root one

### Common Pitfalls

1. **Editing generated API docs** - Always edit OpenAPI YAML source, never generated markdown
2. **Broken links on build** - `onBrokenLinks: 'throw'` fails CI. Check slugs match file paths
3. **Missing frontmatter** - Description or slug errors break SEO and navigation
4. **Missing code block language** - Always specify language for syntax highlighting

### Testing & Quality

- **Local build test**: `npm run build` - Catches broken links, bad frontmatter
- **Linting**: `npm run lint:fix` - Auto-fixes markdown + code style issues
- **Link validation**: Docusaurus throws on broken internal links (see `onBrokenLinks` in config)
- **OpenAPI validation**: `npm run redoc:test` - Validates OpenAPI spec with Redocly

### Quick Reference

- **Add new doc**: Create `.md` in `/sources/{platform,academy}/`, add frontmatter with title/description/slug
- **Add API endpoint**: Edit `/apify-api/openapi/paths/**/*.yaml`, add code samples, run `npm run api:rebuild`
- **Update navigation**: Edit `/sources/{platform,academy}/sidebars.js`
- **Fix broken build**: Check `onBrokenLinks` errors, verify slugs match file paths, validate frontmatter

## Part 2: Writing & Style Guidelines

### Content Standards (Microsoft Style Guide Based)

#### Frontmatter Requirements

Every `.md`/`.mdx` file needs:
```yaml
---
title: "Sentence case title (action-oriented)"
description: "140-160 chars - explain value, not features"
sidebar_position: 1
slug: /path/to/page
---
```

#### File Naming & Organization

- **Kebab-case filenames**: `web-scraping-basics.md` (never camelCase or snake_case)
- **Match slug to file path**: `/sources/platform/actors/running.md` → `slug: /platform/actors/running`

#### Text Formatting Conventions

- **Bold** for UI elements, buttons, tabs, menu items only: "Click **Save & Run**"
- *Italics* for emphasis (use sparingly)
- `code` for inline code, file paths, API parameters: "Set `timeout` in `INPUT.json`"
- Code blocks MUST specify language: ` ```javascript `, ` ```python `, ` ```bash `
- Use [code tabs](https://docusaurus.io/docs/markdown-features/tabs) for multi-language examples

#### Writing Style

- Use simple English - prefer "use" over "utilize", favor simple sentence structures
- Use American English spelling: "color" not "colour"
- Use Oxford commas in lists
- Use sentence case for headings and titles (not title case)
- **Never make assumptions about product features** - ask if unsure

#### Admonitions (Docusaurus-specific)

**All admonitions must have a title.** Available types: `note`, `tip`, `info`, `caution`, `danger`

```markdown
:::note Important information

Standard informational note.

:::

:::tip Pro tip

Helpful advice for advanced users.

:::

:::caution Warning

Something that could cause issues.

:::
```

#### Terminology & Word List

Use exact capitalization and phrasing:
- **Apify Actor** (never "Apify actor")
- **Apify Proxy**
- **Apify Console** (never "the Apify Console")
- **Apify Store** (never "the Apify Store")
- **the Apify team**
- **the Apify platform**
- **AI agent**, **MCP server** (lowercase for generic terms)

### Content Review Checklist

When reviewing or creating documentation:
- **Clarity**: Instructions are easy to understand
- **Consistency**: Uniform terminology (see word list above) and style throughout
- **Grammar & Spelling**: Correct errors, use American English
- **Structure**: Logical flow, no duplicate content, appropriate headings/lists
- **Links**: Verify all links are functional and relevant, link key terms to their docs
- **Code snippets**: Developer-provided; check comments and obvious mistakes only

### Documentation Type Guidelines

**Platform documentation** (`sources/platform/**/*.md`):
- Focus on practical, actionable guidance
- Include real-world examples and use cases
- Reference related API endpoints when applicable

**Academy content** (`sources/academy/**/*.md`):
- Structure content for learning progression
- Include hands-on exercises and examples
- Provide clear prerequisites and next steps

**MDX files** (`sources/**/*.mdx`):
- Use component imports and JSX syntax appropriately
- Ensure proper frontmatter formatting
- Test component rendering during development

## Related Documentation

- Full contribution guide: `CONTRIBUTING.md`
- Style standards: `AGENTS.md` (vendor-agnostic rules)
- Cursor-specific rules: `.cursor/rules/*.mdc` (if using Cursor)
