# Claude Code configuration for Apify docs

This directory contains Claude Code configuration for the Apify documentation repository.

## Structure

```text
.claude/
├── README.md              # This file - Quick start guide
├── instructions.md        # Main instructions for Claude Code
├── rules/                 # Canonical standards (auto-loaded)
│   ├── writing-style.md   # Language, tone, grammar
│   ├── content-standards.md  # Formatting, front matter, code
│   ├── terminology.md     # Apify-specific terms
│   ├── file-organization.md  # Naming conventions
│   └── quality-standards.md  # Quality checklist
└── skills/                # Reusable skills for common tasks
    ├── doc-write/         # Documentation writing skill
    ├── api-doc/           # API documentation skill
    ├── tutorial/          # Tutorial creation skill
    └── review-docs/       # Documentation review skill
```

## How to use

### For Claude Code users

1. **Start a new session**: Claude Code will automatically read `instructions.md`
2. **Use skills**: Type `/doc-write`, `/api-doc`, `/tutorial`, or `/review-docs` to use specific skills
3. **Reference standards**: Always refer to `AGENTS.md` in the repo root for core standards

### Available skills

#### /doc-write
Documentation writing - Create or edit pages following style guide

#### /api-doc
API documentation - Work with OpenAPI specifications and endpoints

#### /tutorial
Tutorial creation - Build structured, educational tutorials

#### /review-docs
Documentation review - Check quality and compliance before submission

## Quick start

### Writing new documentation

```text
Use /doc-write skill to create a new documentation page about [topic]
```

### Creating a tutorial

```text
Use /tutorial skill to create a tutorial on [topic]
```

### Adding API endpoint

```text
Use /api-doc skill to document the new [endpoint-name] endpoint
```

### Reviewing documentation

```text
Use /review-docs skill to review sources/platform/[file-name].md
```

## Documentation standards

All documentation standards are in `.claude/rules/` (auto-loaded):

1. **`writing-style.md`** - Language, tone, grammar, headings, word choice
2. **`content-standards.md`** - Front matter, formatting, code examples, links, images
3. **`terminology.md`** - Apify-specific capitalization and product names
4. **`file-organization.md`** - File naming and directory structure
5. **`quality-standards.md`** - Comprehensive pre-submission checklist

Also reference:

- **`AGENTS.md`** - Vendor-agnostic documentation standards (in repo root)
- **`CONTRIBUTING.md`** - Setup, workflows, contribution process
- **`instructions.md`** - Full Claude Code instructions (in this directory)

## Testing

Before submitting:

```bash
npm run lint:md      # Check markdown
npm run lint:code    # Check code
npm start            # Preview changes
npm test             # Validate API specs
```

## Best practices

1. **Read `AGENTS.md` first** - Vendor-agnostic documentation standards
2. **Check `.claude/rules/`** - Auto-loaded standards for writing, formatting, terminology
3. **Use the appropriate skill** - Designed for specific documentation tasks
4. **Run linters before committing** - `npm run lint:md` and `npm run lint:code`
5. **Review before submit** - Use `/review-docs` skill for final checks

## Need help?

- Questions about style: Check `AGENTS.md`
- Setup issues: See `CONTRIBUTING.md`
- Skill usage: Read the specific skill file
- Claude Code general: Visit [Claude Code docs](https://github.com/anthropics/claude-code)
