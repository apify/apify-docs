# Claude Code instructions for Apify documentation

`CLAUDE.md` (symlink to `AGENTS.md`) covers project architecture, commands, and common pitfalls. Documentation standards are auto-loaded from `.claude/rules/` - those are the canonical source for all writing, formatting, and terminology rules.

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
