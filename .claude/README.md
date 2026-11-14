# Claude Code configuration for Apify docs

This directory contains Claude Code configuration for the Apify documentation repository.

## Structure

```text
.agents/skills/            # Canonical skill location (AgentSkills spec)
├── doc-write/             # Documentation writing skill
├── api-doc/               # API documentation skill
├── tutorial/              # Tutorial creation skill
├── review-docs/           # Documentation review skill
└── adaptive-svg/          # Light/dark SVG merging skill

.claude/skills/            # Symlinks to .agents/skills/ (Claude Code discovery)
├── doc-write -> ../../.agents/skills/doc-write
├── api-doc -> ../../.agents/skills/api-doc
├── tutorial -> ../../.agents/skills/tutorial
├── review-docs -> ../../.agents/skills/review-docs
└── adaptive-svg -> ../../.agents/skills/adaptive-svg
```

Skills live in `.agents/skills/` (the AgentSkills open standard path), discoverable by Codex, Gemini CLI, OpenCode, Cursor, and others. Claude Code discovers them via symlinks in `.claude/skills/`.

Standards live at the repo root (shared across all skills):

```text
standards/                 # Writing, formatting, terminology rules
```

Each skill contains its own `references/` and `scripts/` (formerly in `workflows/`).

## How to use

### For Claude Code users

1. **Start a new session**: Claude Code reads `AGENTS.md`
2. **Use skills**: Type `/doc-write`, `/api-doc`, `/tutorial`, `/review-docs`, or `/adaptive-svg`
3. **Reference standards**: See `standards/` for detailed rules, `AGENTS.md` for summary

### Available skills

#### /doc-write
Documentation writing - Create or edit pages following style guide

#### /api-doc
API documentation - Work with OpenAPI specifications and endpoints

#### /tutorial
Tutorial creation - Build structured, educational tutorials

#### /review-docs
Documentation review - Check quality and compliance before submission

#### /adaptive-svg
Adaptive images - Merge light and dark variants copied from Figma into one image that follows the site theme, and check that each mode renders as before

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

All documentation standards are in `standards/` at the repo root:

1. **`README.md`** - Index: what to read when, and how rules are enforced
1. **`style-guide.md`** - Voice and tone, headings, text formatting, links, numbers, grammar, Apify terminology
1. **`page-structure.md`** - Frontmatter, admonitions, code blocks, images, lists, file naming
1. **`quality-standards.md`** - Complete quality checklist

Also reference:

- **`AGENTS.md`** - Condensed summary + pointers (in repo root)
- **`CONTRIBUTING.md`** - Setup, workflows, contribution process

## Testing

Before submitting:

```bash
npm run lint:md      # Check markdown
npm run lint:code    # Check code
vale "path/to/file.md" --minAlertLevel=error  # Check prose style
npm run openapi:lint # Validate OpenAPI specs
npm start            # Preview changes
```

## Best practices

1. **Read `AGENTS.md` first**
2. **Check `standards/`** - Detailed rules for writing, formatting, terminology
3. **Use the appropriate skill** - Designed for specific documentation tasks
4. **Run linters before committing** - `npm run lint:md`, `npm run lint:code`, and `vale`
5. **Review before submit** - Use `/review-docs` skill for final checks

## Need help?

- Questions about style: Check `standards/` or `AGENTS.md`
- Setup issues: See `CONTRIBUTING.md`
- Skill usage: Read the specific skill file
- Claude Code general: Visit [Claude Code docs](https://github.com/anthropics/claude-code)
