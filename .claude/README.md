# Claude Code Configuration for Apify Docs

This directory contains Claude Code configuration for the Apify documentation repository.

## Structure

```text
.claude/
├── README.md           # This file
├── instructions.md     # Main instructions for Claude Code
└── skills/             # Reusable skills for common tasks
    ├── doc-write.md    # Documentation writing skill
    ├── api-doc.md      # API documentation skill
    ├── tutorial.md     # Tutorial creation skill
    └── review-docs.md  # Documentation review skill
```

## How to Use

### For Claude Code Users

1. **Start a new session**: Claude Code will automatically read `instructions.md`
2. **Use skills**: Type `/doc-write`, `/api-doc`, `/tutorial`, or `/review-docs` to use specific skills
3. **Reference standards**: Always refer to `AGENTS.md` in the repo root for core standards

### Available Skills

#### `/doc-write` - Documentation Writing

Create or edit documentation following Apify style guide.

- Use for: New pages, content updates, reformatting
- Handles: Style compliance, formatting, structure

#### `/api-doc` - API Documentation

Work with OpenAPI specifications and API endpoints.

- Use for: New endpoints, schema updates, code samples
- Handles: OpenAPI structure, operation IDs, examples

#### `/tutorial` - Tutorial Creation

Build structured, educational tutorials.

- Use for: New tutorials, tutorial restructuring
- Handles: Learning progression, examples, exercises

#### `/review-docs` - Documentation Review

Review documentation for quality and compliance.

- Use for: Pre-submission checks, audits, consistency
- Handles: Style guide compliance, accessibility, SEO

## Quick Start

### Writing New Documentation

```text
Use /doc-write skill to create a new documentation page about [topic]
```

### Creating a Tutorial

```text
Use /tutorial skill to create a tutorial on [topic]
```

### Adding API Endpoint

```text
Use /api-doc skill to document the new [endpoint-name] endpoint
```

### Reviewing Documentation

```text
Use /review-docs skill to review sources/platform/[file-name].md
```

## Primary References

Always reference these files from the repo root:

1. **`AGENTS.md`** - Core documentation standards (READ FIRST)
2. **`CONTRIBUTING.md`** - Setup, workflows, style guide
3. **`.cursor/rules/*.mdc`** - Cursor-specific rules (reference only)

## Key Standards

### Writing Style

- US English, active voice, inclusive language
- Sentence case for headings (not Title Case)
- Action-oriented phrasing
- No directional language (left/right)

### Front Matter

Every file needs:

```yaml
---
title: "Action-oriented title"
description: "140-160 chars, no 'documentation' word"
sidebar_position: 1
slug: /path/to/page
---
```

### Formatting

- **Bold** for UI elements
- _Italics_ for emphasis
- `code` for inline code/files
- Code blocks with language tags
- Admonitions for important info

### Links & Images

- Descriptive link text (not "click here")
- Alt text for all images
- Light theme for screenshots
- Red indicators for highlighting

## Testing

Before submitting:

```bash
npm run lint:md      # Check markdown
npm run lint:code    # Check code
npm start            # Preview changes
npm test             # Validate API specs
```

## Best Practices

1. **Read `AGENTS.md` first** - It's the source of truth
2. **Use the appropriate skill** - They're designed for specific tasks
3. **Test code examples** - All examples must work
4. **Check front matter** - Required for all files
5. **Run linters** - Before committing
6. **Review before submit** - Use `/review-docs`

## Maintenance

This configuration mirrors and extends the existing style guide:

- `AGENTS.md` - Vendor-agnostic standards
- `CONTRIBUTING.md` - Contribution process
- `.cursor/rules/*.mdc` - Cursor-specific rules

Keep these files in sync when updating documentation standards.

## Need Help?

- Questions about style: Check `AGENTS.md`
- Setup issues: See `CONTRIBUTING.md`
- Skill usage: Read the specific skill file
- Claude Code general: Visit [Claude Code docs](https://github.com/anthropics/claude-code)
