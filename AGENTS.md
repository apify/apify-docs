# Apify Documentation Standards

## Project overview

Docusaurus-based documentation site combining multiple content types:

- **Platform docs** (`sources/platform/`) - Product documentation
- **Academy** (`sources/academy/`) - Educational courses and tutorials
- **API reference** (`apify-api/`) - Generated from OpenAPI specs
- **Multi-repo architecture** - SDK/Client docs from separate repos served via nginx

One unified site built from multiple repositories. See `CONTRIBUTING.md` for multi-repo setup.

## Commands

```bash
npm install              # Install dependencies (runs patch-package via postinstall)
npm start                # Dev server (rebuilds API docs, port 3000)
npm run build            # Production build (catches broken links, bad frontmatter)
npm run lint             # Run all linters (markdownlint + ESLint)
npm run lint:md          # Markdownlint only
npm run lint:code        # ESLint only
npm run lint:fix         # Auto-fix both linters
vale sync                # Download Vale styles (first time only)
vale "path/to/file.md" --minAlertLevel=error  # Prose style check
npm run api:rebuild      # Regenerate API docs from OpenAPI specs
npm run openapi:lint     # Validate OpenAPI spec (Redocly + Spectral + YAML)
```

## Architecture

### OpenAPI documentation pipeline

API docs are generated, NOT hand-written. The workflow:

1. **Source of truth**: `apify-api/openapi/openapi.yaml` (splits into `/paths` and `/components`)
1. **Redocly plugins** (`apify-api/plugins/apify.mjs`) inject custom behavior:
   - `code-samples-decorator.mjs` - Auto-adds code samples if files exist in `/code_samples/{js,curl}/`
   - `legacy-doc-url-decorator.mjs` - Adds backward-compatible URLs
   - `client-references-links-decorator.mjs` - Links to client library docs
1. **Build command**: `npm run api:rebuild` = clean + bundle with Redocly + generate with Docusaurus
1. **Output**: Markdown files in `apify-api/docs/` (gitignored, regenerated on each build)

Never edit generated API docs directly. Edit the OpenAPI YAML source or add code samples.

### OpenAPI code samples

Add code samples by creating files in `apify-api/openapi/code_samples/{javascript,curl}/`:

- Filename must match `operationId` from OpenAPI spec (e.g., `actorRun_get.js`)
- Decorator auto-detects and adds `x-codeSamples` property
- Missing samples are logged during build

### Theme system

Uses `@apify/docs-theme` package - a shared theme across all 6+ documentation repos. Don't modify theme files directly. Changes to the theme propagate via CI to all projects.

### LLMs.txt generation

Post-build scripts (`scripts/joinLlmsFiles.mjs` + `indentLlmsFile.mjs`) combine `llms.txt` files from all sections into root. Edit source `llms.txt` files in content directories, not the generated root one.

### Slug collection

`tools/utils/collectSlugs.js` scans directories for `slug:` in frontmatter, used in `docusaurus.config.js` for dynamic navigation with `activeBaseRegex`. Ensure slugs are collected when adding new sections.

## Multi-repo ecosystem

| Repository | Port | Content |
|---|---|---|
| apify-docs (this repo) | 3000 | Platform, Academy, OpenAPI |
| apify-client-js | 3001 | JavaScript client docs |
| apify-client-python | 3002 | Python client docs |
| apify-sdk-js | 3003 | JavaScript SDK docs |
| apify-sdk-python | 3004 | Python SDK docs |
| apify-cli | 3005 | CLI documentation |

Use `npm run start:dev` + nginx to serve all repos together locally. See `CONTRIBUTING.md` for setup.

## Deployment

- Auto-deploy on merge to `master`
- Preview builds on pull requests
- PR titles must use [Conventional Commits](https://www.conventionalcommits.org/) format (`docs:`, `fix:`, `feat:`, etc.) - enforced by CI

## Common pitfalls

1. **Editing generated API docs** - Always edit OpenAPI YAML source, never generated markdown in `apify-api/docs/`
1. **Broken links on build** - `onBrokenLinks: 'throw'` fails CI. Check slugs match file paths
1. **Missing frontmatter** - Description or slug errors break SEO and navigation
1. **Missing code block language** - Always specify language for syntax highlighting
1. **Stale API docs locally** - Run `npm run api:rebuild` after changing OpenAPI specs

## Quick reference

- **Add new doc**: Create `.md` in `sources/{platform,academy}/`, add frontmatter with title/description/slug
- **Add API endpoint**: Edit `apify-api/openapi/paths/**/*.yaml`, add code samples, run `npm run api:rebuild`
- **Fix broken build**: Check `onBrokenLinks` errors, verify slugs match file paths, validate frontmatter

---

## Writing style

### Language and tone

- **US English** spelling (analyze, color, not analyse, colour)
- **Active voice** and **imperative tone** ("Install the package", not "You should install")
- **Simple English** - no sentence over 30 words, get to the point
- **Inclusive language** - avoid gendered terms, don't use directional language (left/right) for UI
- No first person ("I recommend") - use "you" for the reader
- No sales language ("ultimate", "cutting-edge", "supercharge")

### Headings

- **Sentence case only** - capitalize first word and proper nouns only
- **No gerunds** (-ing forms) - use noun phrases or imperatives
- **Capitalize after colons** when introducing a complete clause
- **Proper hierarchy** - H1 (from frontmatter) → H2 → H3 → H4, never skip levels

Examples:

| Avoid | Prefer |
|---|---|
| Store And Manage Data | Store and manage data |
| Getting Started With Actors | Get started with Actors |
| Step 1: install the dependencies | Step 1: Install the dependencies |

### Text formatting

- **Bold** for UI elements only (buttons, menus, fields) and critical warnings
- *Italics* for emphasis and introducing new terms
- `code` for file names, commands, config keys, variables, and code values
- Never use bold for list introductions or general emphasis

### Admonitions

All admonitions must have titles (2-3 scannable words). Types: `note`, `tip`, `info`, `caution`, `danger`.

```markdown
:::note Actor versions
Actors can have multiple versions. Pin to a specific version for production use.
:::
```

### Lists

- Numbered lists (`1.` for all items) for sequential steps
- Bullet points for non-sequential items
- All items must follow the same grammatical pattern (parallel structure)
- Use Oxford commas

### Links

- Descriptive, action-oriented link text (never "click here" or "here")
- Internal links use relative paths, never full URLs
- Link external tools to official sites on first mention
- Link Actor names on first mention

### Em dashes

Don't use em dashes (—). Use hyphen with spaces ( - ) instead.

## Content formatting

### Front matter

Every `.md`/`.mdx` file requires:

```yaml
---
title: Sentence case title
description: 140-160 character description for SEO
sidebar_position: 1.0
slug: /path/to/page
---
```

### Code examples

- Complete and runnable
- Syntax highlighting specified for all code blocks
- Code tabs for multi-language examples (JavaScript + Python)
- Version matching between Dockerfile tags and package.json

### Images

- Meaningful alt text on all images
- Light theme for screenshots
- Red indicators to highlight UI elements
- Store in `images/` subdirectory next to the markdown file
- PNG for screenshots, SVG for logos

## Terminology

### Product names (always capitalize)

Apify Actor, Apify Proxy, Apify Console, Apify Store, Apify SDK, Apify CLI, Apify API

### Platform terms (lowercase with "the")

the Apify platform, the Apify team, the Apify ecosystem

### Feature terms (always lowercase)

task, schedule, run, build, dataset, key-value store, request queue, web scraping

### Generic technical terms (lowercase)

AI agent, MCP server, API endpoint, web scraper, proxy server

### Actor references

First mention: full name with link (`[Website Content Crawler](https://apify.com/apify/website-content-crawler)`). Subsequent mentions: just the name.

## File organization

- **Kebab-case** for file names: `web-scraping-basics.md`
- Match slug to file path
- Group related files in logical directories

## Review checklist

When creating or reviewing documentation, verify:

- [ ] Sentence case headings, no gerunds, proper hierarchy
- [ ] Front matter complete (title, description 140-160 chars, sidebar_position, slug)
- [ ] Bold used only for UI elements
- [ ] All admonitions have titles
- [ ] Code examples are complete with syntax highlighting
- [ ] Links use descriptive text, internal links use relative paths
- [ ] Images have alt text, use light theme
- [ ] Terminology matches rules above
- [ ] US English, active voice, no sales language
- [ ] `npm run lint` passes
