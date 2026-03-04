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

## Writing and style standards

Detailed documentation standards live in `.claude/rules/`:

| File | Covers |
|---|---|
| `writing-style.md` | Voice, tone, headings, text formatting, links, numbers, parallel structure |
| `content-standards.md` | Front matter, heading hierarchy, admonitions, code blocks, images, lists |
| `terminology.md` | Product names, article usage, feature terms, Actor references |
| `grammar-rules.md` | Hyphenation, contractions, e.g./i.e., numbers, list punctuation, brand spelling |
| `file-organization.md` | Kebab-case naming, directory structure |
| `quality-standards.md` | Complete pre-submission checklist |

Read these files for the full rules. The most critical rules at a glance:

- **US English**, active voice, imperative tone, no sales language
- **Sentence case headings** - no title case, no gerunds (-ing forms)
- **Bold for UI elements only** - not for structure or emphasis
- **All admonitions must have titles**
- **No em dashes** - use hyphen with spaces ( - ) instead
- **Terminology** - capitalize product names (Apify Actor, Apify Console), lowercase features (dataset, schedule, run)
- **Numbered lists** use `1.` for all items, with parallel structure
- **Descriptive link text** - no "click here"
- Run `npm run lint` before submitting
