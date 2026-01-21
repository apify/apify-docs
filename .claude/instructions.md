# Claude Code Instructions for Apify Documentation

## Project overview

You are working on the Apify documentation repository, which contains:

- **Platform documentation**: Core platform features and functionality (`/sources/platform/`)
- **Academy**: Educational content and tutorials (`/sources/academy/`)
- **API reference**: OpenAPI specifications (`/apify-api/`)

The project uses Docusaurus with MDX, follows Microsoft style guide principles, and has comprehensive style guidelines.

## Primary reference documents

**Always reference these files when working on documentation**:

1. `AGENTS.md` - Primary vendor-agnostic documentation standards (READ THIS FIRST)
2. `CONTRIBUTING.md` - Contribution guidelines, setup, and workflows
3. `.cursor/rules/*.mdc` - Cursor-specific rules (for reference)

## Available skills

Use these skills for specific documentation tasks:

### `/doc-write` - Documentation Writing

**When to use**: Creating or editing documentation pages
**Handles**: Content creation, formatting, style guide compliance

### `/api-doc` - API Documentation

**When to use**: Working with OpenAPI specifications
**Handles**: Creating endpoints, schemas, code samples

### `/tutorial` - Tutorial Creation

**When to use**: Creating step-by-step tutorials
**Handles**: Tutorial structure, learning content, examples

### `/review-docs` - Documentation Review

**When to use**: Reviewing documentation before submission
**Handles**: Style guide compliance, quality checks, consistency

## Core documentation standards

### Language & Style

- **US English** spelling and grammar (e.g., "color" not "colour")
- **Active voice** whenever possible
- **Inclusive language** - no gendered terms
- **Action-oriented** phrasing
- **Simple English** - prefer "use" over "utilize", favor simple sentence structures
- **Avoid directional language** (use "preceding/following" not "left/right")
- **Sentence case** for headings (not Title Case)
- **Simple present tense** for headings: "Create an Actor" (not "Creating an Actor")
- **Use Oxford commas** in lists
- **Never make assumptions about product features** - ask if unsure

### Front matter requirements

Every documentation file must include:

```yaml
---
title: "Sentence case title (action-oriented, simple present tense)"
description: "140-160 chars - explain value, not features (no 'documentation' word)"
sidebar_position: 1
slug: /path/to/page
---
```

**Important**: Match slug to file path

- File: `/sources/platform/actors/running.md`
- Slug: `/platform/actors/running`

### Text formatting standards

- **Bold** ONLY for UI elements, buttons, tabs, menu items (e.g., "Click **Save & Run**"). NEVER use bold for emphasis.
- _Italics_ for emphasis (use sparingly)
- `code` for inline code, file names, paths, API parameters (e.g., "Set `timeout` in `INPUT.json`")
- Code blocks MUST specify language: ` ```javascript `, ` ```python `, ` ```bash `
- **All admonitions MUST have a title** - Available types: `note`, `tip`, `info`, `caution`, `danger`

### Code examples

- Include complete, runnable examples
- Use [code tabs](https://docusaurus.io/docs/markdown-features/tabs) for multiple languages (JavaScript, Python)
- Add syntax highlighting with language tags (REQUIRED)
- Include comments for complex logic
- Show realistic, meaningful examples

### Admonition format

**All admonitions MUST include a title:**

```markdown
:::note Important information

Your note content here.

:::

:::tip Pro tip

Helpful advice for advanced users.

:::

:::caution Warning

Something that could cause issues.

:::
```

### Links

- Use descriptive link text (never "click here")
- Use relative paths for internal links
- Verify all links work before committing

### Images

- Use light theme for screenshots
- Include meaningful alt text
- Use red indicators for highlighting
- Store in appropriate directories

## File organization

### Naming conventions

- Use **kebab-case** for file names: `web-scraping-basics.md` (never camelCase or snake_case)
- Use descriptive names that reflect content
- Group related files in logical directories
- **Match slug to file path** for consistency

### Directory structure

```text
sources/
├── platform/          # Platform documentation
│   ├── actors/        # Actor-related content
│   ├── storage/       # Storage documentation
│   └── integrations/  # Integration guides
└── academy/           # Educational content
    ├── tutorials/     # Step-by-step guides
    └── webscraping/   # Web scraping courses
```

## API documentation specifics

### OpenAPI Structure

```text
apify-api/openapi/
├── openapi.yaml              # Main spec file
├── components/schemas/       # Data model definitions
└── paths/                    # API endpoint definitions
```

### Operation ID conventions

Format: `{objectName}_{httpMethod}`

- Use camelCase for object names
- Single object for paths with `{id}`, plural otherwise
- Examples:
  - `/request-queues` GET → `requestQueues_get`
  - `/request-queues/{queueId}` PUT → `requestQueue_put`

### Path file naming

Replace `/` with `@` in URL paths:

- `/request-queues` → `request-queues.yaml`
- `/request-queues/{queueId}` → `request-queues@{queueId}.yaml`

## Development workflow

### Before starting work

1. Read `AGENTS.md` for documentation standards
2. Review `CONTRIBUTING.md` for specific guidelines
3. Check existing similar documentation for patterns
4. Determine which skill to use for the task

### During development

1. Follow the appropriate skill instructions
2. Reference `AGENTS.md` for style questions
3. Use proper front matter in all files
4. Include complete, tested code examples
5. Add descriptive links and alt text

### Before submitting

1. Run linting checks:

   ```bash
   npm run lint:md        # Markdown linting
   npm run lint:code      # Code linting

   # Run locally for more detailed output:
   npx markdownlint "path/to/file.md"  # Check specific markdown files
   vale sync                            # Download Vale styles (first time)
   vale "path/to/file.md" --minAlertLevel=error  # Check prose
   ```

2. Use `/review-docs` skill to check compliance
3. Verify all code examples work
4. Check all links are valid
5. Ensure front matter is complete

### Testing changes

```bash
npm install          # Install dependencies
npm start           # Start development server
npm test            # Validate OpenAPI specs (if applicable)
npm run build       # Test production build
```

## Common patterns

### Tutorial structure

1. Introduction with learning objectives
2. Prerequisites
3. Step-by-step numbered instructions
4. Complete code examples
5. Testing/verification section
6. Troubleshooting
7. Summary and next steps

### Platform documentation

1. Clear description of feature
2. When to use it
3. How to configure/use it
4. Code examples
5. Best practices
6. Related features

### API Documentation

1. Endpoint description
2. Parameters with types and descriptions
3. Request examples
4. Response schemas
5. Error responses
6. Code samples (JavaScript, Python, cURL)

## Quality checklist

Before considering any documentation complete:

- [ ] Content follows Microsoft style guide
- [ ] Front matter complete (title, description 140-160 chars)
- [ ] Code examples complete with syntax highlighting
- [ ] Links use descriptive text
- [ ] Images include meaningful alt text
- [ ] Inclusive language and active voice used
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Content is clear, concise, action-oriented
- [ ] All automated linting passes
- [ ] Examples tested and working

## Important notes

### What NOT to do

- Don't use Title Case for headings (use sentence case)
- Don't use gerunds in headings ("Creating" - use "Create" instead)
- Don't use bold for emphasis (ONLY for UI elements)
- Don't forget titles on admonitions (REQUIRED)
- Don't use "click here" or non-descriptive links
- Don't include the word "documentation" in descriptions
- Don't use directional language (left/right)
- Don't skip front matter
- Don't omit language tags on code blocks
- Don't use gendered language
- Don't commit without running linters
- Don't make assumptions about product features - ask instead
- Don't use incorrect Apify terminology (see terminology section)

### Best practices

- Start with user's goal/problem
- Provide context before technical details
- Use consistent Apify terminology (see terminology section)
- Use simple English - "use" not "utilize"
- Use Oxford commas in all lists
- Use simple present tense for headings
- Structure content logically (basic → advanced)
- Link to related content
- Keep descriptions within 140-160 characters explaining value, not features
- Match slug to file path for consistency
- Test all code examples before committing
- Use admonitions sparingly but effectively (always with titles)
- Never make assumptions about product features - ask if unsure
- For code review: check comments and obvious mistakes only

## Apify-specific terminology

**Always use exact capitalization and phrasing:**

- **Apify Actor** (never "Apify actor" or "apify actor")
- **Apify Proxy** (never "Apify proxy")
- **Apify Console** (never "the Apify Console")
- **Apify Store** (never "the Apify Store")
- **the Apify team** (lowercase "the", lowercase "team")
- **the Apify platform** (lowercase "the", lowercase "platform")
- **AI agent** (lowercase for generic terms)
- **MCP server** (lowercase for generic terms)

## Content review process

### Before reviewing a PR

- Check that the latest changes were pulled from the feature branch

### Review checklist

When reviewing or creating documentation, verify:

- **Clarity**: Instructions are easy to understand
- **Consistency**: Uniform terminology (see word list above) and style throughout
- **Grammar & Spelling**: Correct errors, use American English with Oxford commas
- **Structure**: Logical flow, no duplicate content, appropriate headings/lists
- **Links**: Verify all links are functional and relevant, link key terms to their docs
- **Code snippets**: Developer-provided; check comments and obvious mistakes only (not full code review)

## Getting help

If you're unsure about:

- **Style questions**: Check `AGENTS.md` first
- **Setup issues**: See `CONTRIBUTING.md`
- **API documentation**: See `/api-doc` skill
- **Tutorial structure**: See `/tutorial` skill
- **Review process**: See `/review-docs` skill
- **Product features**: Never make assumptions - ask if unsure

## Project-specific context

### Multiple repositories

The full documentation ecosystem includes multiple repos:

- apify-docs (this repo) - Platform, Academy, OpenAPI
- apify-client-js - JavaScript client docs
- apify-client-python - Python client docs
- apify-sdk-js - JavaScript SDK docs
- apify-sdk-python - Python SDK docs
- apify-cli - CLI documentation

### Theme

Uses `@apify/docs-theme` package - don't modify theme files directly.

### Deployment

- Automatic deployment on merge to `master`
- Preview builds available for pull requests
- Uses nginx for routing between repositories

### Linting tools

- **markdownlint** - Markdown formatting
- **eslint** - JavaScript/TypeScript code
- **Vale** - Prose linting (optional, download styles with `vale sync`)

## Remember

The goal is to help users succeed with Apify. Every piece of documentation should:

- Be **clear** and easy to understand
- Be **accurate** and technically correct
- Be **actionable** with concrete examples
- Follow the **style guide** consistently
- Provide **real value** to users

When in doubt, prioritize clarity and usefulness over strict adherence to rules. But always maintain consistency within the documentation set.
