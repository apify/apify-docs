# Claude Code Instructions for Apify Documentation

## Project Overview

You are working on the Apify documentation repository, which contains:
- **Platform documentation**: Core platform features and functionality (`/sources/platform/`)
- **Academy**: Educational content and tutorials (`/sources/academy/`)
- **API reference**: OpenAPI specifications (`/apify-api/`)

The project uses Docusaurus with MDX, follows Microsoft style guide principles, and has comprehensive style guidelines.

## Primary Reference Documents

**Always reference these files when working on documentation**:
1. `AGENTS.md` - Primary vendor-agnostic documentation standards (READ THIS FIRST)
2. `CONTRIBUTING.md` - Contribution guidelines, setup, and workflows
3. `.cursor/rules/*.mdc` - Cursor-specific rules (for reference)

## Available Skills

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

## Core Documentation Standards

### Language & Style
- **US English** spelling and grammar
- **Active voice** whenever possible
- **Inclusive language** - no gendered terms
- **Action-oriented** phrasing
- **Avoid directional language** (use "preceding/following" not "left/right")
- **Sentence case** for headings (not Title Case)

### Front Matter Requirements
Every documentation file must include:
```yaml
---
title: "Clear, action-oriented title"
description: "140-160 character description, no 'documentation' word"
sidebar_position: 1
slug: /path/to/page
---
```

### Text Formatting Standards
- **Bold** for UI elements, buttons, menu items
- _Italics_ for emphasis and new terms
- `code` for inline code, file names, paths, variables
- Code blocks with language specification
- Admonitions for important information (note, tip, info, caution, danger)

### Code Examples
- Include complete, runnable examples
- Use code tabs for multiple languages (JavaScript, Python)
- Add syntax highlighting with language tags
- Include comments for complex logic
- Show realistic, meaningful examples

### Links
- Use descriptive link text (never "click here")
- Use relative paths for internal links
- Verify all links work before committing

### Images
- Use light theme for screenshots
- Include meaningful alt text
- Use red indicators for highlighting
- Store in appropriate directories

## File Organization

### Naming Conventions
- Use **kebab-case** for file names: `web-scraping-basics.md`
- Use descriptive names that reflect content
- Group related files in logical directories

### Directory Structure
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

## API Documentation Specifics

### OpenAPI Structure
```text
apify-api/openapi/
├── openapi.yaml              # Main spec file
├── components/schemas/       # Data model definitions
└── paths/                    # API endpoint definitions
```

### Operation ID Conventions
Format: `{objectName}_{httpMethod}`
- Use camelCase for object names
- Single object for paths with `{id}`, plural otherwise
- Examples:
  - `/request-queues` GET → `requestQueues_get`
  - `/request-queues/{queueId}` PUT → `requestQueue_put`

### Path File Naming
Replace `/` with `@` in URL paths:
- `/request-queues` → `request-queues.yaml`
- `/request-queues/{queueId}` → `request-queues@{queueId}.yaml`

## Development Workflow

### Before Starting Work
1. Read `AGENTS.md` for documentation standards
2. Review `CONTRIBUTING.md` for specific guidelines
3. Check existing similar documentation for patterns
4. Determine which skill to use for the task

### During Development
1. Follow the appropriate skill instructions
2. Reference `AGENTS.md` for style questions
3. Use proper front matter in all files
4. Include complete, tested code examples
5. Add descriptive links and alt text

### Before Submitting
1. Run linting checks:
   ```bash
   npm run lint:md        # Markdown linting
   npm run lint:code      # Code linting
   ```
2. Use `/review-docs` skill to check compliance
3. Verify all code examples work
4. Check all links are valid
5. Ensure front matter is complete

### Testing Changes
```bash
npm install          # Install dependencies
npm start           # Start development server
npm test            # Validate OpenAPI specs (if applicable)
npm run build       # Test production build
```

## Common Patterns

### Tutorial Structure
1. Introduction with learning objectives
2. Prerequisites
3. Step-by-step numbered instructions
4. Complete code examples
5. Testing/verification section
6. Troubleshooting
7. Summary and next steps

### Platform Documentation
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

## Quality Checklist

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

## Important Notes

### What NOT to Do
- Don't use Title Case for headings
- Don't use "click here" or non-descriptive links
- Don't include the word "documentation" in descriptions
- Don't use directional language (left/right)
- Don't skip front matter
- Don't omit language tags on code blocks
- Don't use gendered language
- Don't commit without running linters

### Best Practices
- Start with user's goal/problem
- Provide context before technical details
- Use consistent terminology throughout
- Structure content logically (basic → advanced)
- Link to related content
- Keep descriptions within 140-160 characters
- Test all code examples before committing
- Use admonitions sparingly but effectively

## Getting Help

If you're unsure about:
- **Style questions**: Check `AGENTS.md` first
- **Setup issues**: See `CONTRIBUTING.md`
- **API documentation**: See `/api-doc` skill
- **Tutorial structure**: See `/tutorial` skill
- **Review process**: See `/review-docs` skill

## Project-Specific Context

### Multiple Repositories
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

### Linting Tools
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
