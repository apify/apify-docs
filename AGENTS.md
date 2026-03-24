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

### OpenAPI specification changes

- Prefer re-use of existing objects via `$ref` over duplication. Reusable components can be found in `/openapi/components`.
- Components most suitable for re-use are:
  - Request parameters and path parameters defined in  `/openapi/components/parameters`
  - Request/response schemas defined in `/openapi/components/schemas`
  - Explicit non-automatic examples defined in `/openapi/components/examples`
- When changing files in `/openapi/paths` look for opportunities to extract shared duplicate objects into re-usable components saved in `/openapi/components`.
- When adding new endpoints, check first if any existing path is similar and if yes, try to re-use same components. If by adding new paths you create new duplication, try to extract it into a new components and reference it instead.
- Prefer automatically generated examples from schema over explicit examples.

#### Error responses
- Re-use schemas for error responses defined in `/apify-api/openapi/components/responses`
- Each endpoint should have at least following error responses: 400 (Bad Request), 405 (Method Not Allowed), 429 (Too Many Requests).
- Endpoints that define `security: []` do not use any authentication.
- Each endpoint that uses authentication should have at least following error responses: 401 (Unauthorized), 403 (Forbidden).
- Each endpoint that has `runs/last` in its path or that has any ID related parameter (for example `actorId`, `buildId`, `runId`, `datasetId` and so on) should have at least one 404 (Not Found) error.
- Each endpoint that has `requestBody` should have at least following error responses: 413 (Payload Too Large), 415 (Unsupported Media Type).

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

## Standards

Detailed writing and formatting standards are in `standards/`:

- `standards/writing-style.md` - Prose voice, tone, headings, links, numbers
- `standards/content-standards.md` - Front matter, admonitions, code blocks, images
- `standards/terminology.md` - Product names, capitalization, article usage
- `standards/grammar-rules.md` - Hyphenation, punctuation, numbers, brand spelling
- `standards/file-organization.md` - File naming and directory structure
- `standards/quality-standards.md` - Complete quality checklist before submitting

Key rules at a glance:

- US English, active voice, imperative tone, no sales language
- Sentence case headings, no gerunds
- Bold for UI elements only; `code` for filenames, commands, variables
- All admonitions require titles
- 140-160 character descriptions in front matter
- See `standards/terminology.md` for Apify product name capitalization
- Don't use em dashes (—) - use hyphen with spaces ( - ) instead

## Workflows

Reusable documentation workflows are in `workflows/`:

- `workflows/review-docs/` - Documentation review process and output format
- `workflows/doc-write/` - Writing and editing documentation pages
- `workflows/tutorial/` - Creating structured tutorials
- `workflows/api-doc/` - OpenAPI specification and API documentation

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
