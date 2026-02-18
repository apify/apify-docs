# Claude Code instructions for Apify documentation

Read `AGENTS.md` first - it is the single source of truth for project architecture, commands, writing style, and terminology.

## Claude Code specifics

Detailed documentation standards are auto-loaded from `.claude/rules/`:

- `writing-style.md` - Language, tone, grammar, headings
- `content-standards.md` - Front matter, formatting, code examples, links, images
- `terminology.md` - Apify product capitalization
- `file-organization.md` - Naming and directory structure
- `quality-standards.md` - Pre-submission checklist

These rules expand on the standards in `AGENTS.md` with detailed examples and tables.

## Available skills

| Skill | When to use |
|---|---|
| `/doc-write` | Creating or editing documentation pages |
| `/api-doc` | Working with OpenAPI specifications |
| `/tutorial` | Creating step-by-step tutorials |
| `/review-docs` | Reviewing documentation before submission |

## PR title format

Use [Conventional Commits](https://www.conventionalcommits.org/) - enforced by CI:

- `docs: <description>` - Documentation changes (most common)
- `fix: <description>` - Bug fixes
- `feat: <description>` - New features
- `chore: <description>` - Maintenance tasks

## Key reminders

- Never make assumptions about product features - ask if unsure
- For code review: check comments and obvious mistakes only (not full code review)
- Prioritize clarity and usefulness over strict rule adherence
- See `CONTRIBUTING.md` for development setup and contribution workflow
