# Claude Code instructions for Apify documentation

## Project overview

You are working on the Apify documentation repository, which contains:

- **Platform documentation**: Core platform features and functionality (`/sources/platform/`)
- **Academy**: Educational content and tutorials (`/sources/academy/`)
- **API reference**: OpenAPI specifications (`/apify-api/`)

The project uses Docusaurus with MDX, follows Microsoft style guide principles, and has comprehensive style guidelines.

## Primary reference documents

**Always reference these files when working on documentation**:

1. **AGENTS.md** - Primary vendor-agnostic documentation standards (READ THIS FIRST)
2. **.claude/rules/** - Claude Code-specific standards (AUTO-LOADED)
   - `writing-style.md` - Language, tone, grammar, and writing guidelines
   - `content-standards.md` - Formatting, front matter, code examples, links, images
   - `terminology.md` - Apify-specific capitalization and terminology
   - `file-organization.md` - File naming and directory structure
   - `quality-standards.md` - Comprehensive quality checklist
3. **CONTRIBUTING.md** - Contribution guidelines, setup, and workflows
4. `.cursor/rules/*.mdc` - Cursor-specific rules (for reference)

## Available skills

Use these skills for specific documentation tasks:

### `/doc-write` - Documentation writing

**When to use**: Creating or editing documentation pages
**Handles**: Content creation, formatting, style guide compliance

### `/api-doc` - API documentation

**When to use**: Working with OpenAPI specifications
**Handles**: Creating endpoints, schemas, code samples

### `/tutorial` - Tutorial creation

**When to use**: Creating step-by-step tutorials
**Handles**: Tutorial structure, learning content, examples

### `/review-docs` - Documentation review

**When to use**: Reviewing documentation before submission
**Handles**: Style guide compliance, quality checks, consistency

## Documentation standards

All documentation standards are defined in `.claude/rules/` and are auto-loaded by Claude Code:

- **Writing style**: See `writing-style.md` for language, tone, grammar, headings, and word choice
- **Content formatting**: See `content-standards.md` for front matter, text formatting, admonitions, code examples, links, and images
- **Terminology**: See `terminology.md` for Apify-specific capitalization and product names
- **File organization**: See `file-organization.md` for naming conventions and directory structure
- **Quality assurance**: See `quality-standards.md` for comprehensive pre-submission checklist

**Quick reference**:

- Use sentence case for headings (not Title Case)
- Bold only for UI elements (not emphasis)
- All admonitions must have titles
- Front matter required (title, description 140-160 chars, sidebar_position, slug)
- Use descriptive link text (never "click here")
- All code blocks must specify language

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

See the `/api-doc` skill for comprehensive OpenAPI specification standards, operation ID conventions, and path file naming.

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
   npm run lint:md        # Markdownlint - Markdown syntax/formatting
   npm run lint:code      # ESLint - Code linting

   # Run locally for more detailed output:
   npx markdownlint "path/to/file.md"  # Markdownlint - Check specific files
   vale sync                            # Vale - Download styles (first time)
   vale "path/to/file.md" --minAlertLevel=error  # Vale - Check prose style
   ```

2. Use `/review-docs` skill to check compliance
3. Verify all code examples work
4. Check all links are valid
5. Ensure front matter is complete

### Creating pull requests

When creating PRs for this repository, follow these requirements:

**PR Title Format**: Use [Conventional Commits](https://www.conventionalcommits.org/) format:

- `docs: <description>` - Documentation changes (most common)
- `fix: <description>` - Bug fixes
- `feat: <description>` - New features
- `chore: <description>` - Maintenance tasks
- `refactor: <description>` - Code refactoring
- `test: <description>` - Test updates

**Examples**:

- ✅ `docs: fix grammatical error in residential proxy documentation`
- ✅ `docs: add missing actor.json properties`
- ✅ `fix: correct data retention period in storage docs`
- ❌ `Fix grammatical error` (missing type prefix)
- ❌ `Documentation Update` (wrong format)

**Enforcement**: PR titles are validated by GitHub Actions. PRs with incorrect titles will fail CI checks.

**Reference**: See `CONTRIBUTING.md` and `.github/workflows/check-pr-title.yaml`

### Testing changes

```bash
npm install          # Install dependencies
npm start           # Start development server
npm test            # Validate OpenAPI specs (if applicable)
npm run build       # Test production build
```

## Common patterns

See respective skills for content-type specific patterns:

- **Tutorials**: See `/tutorial` skill for 8-section tutorial structure
- **Platform documentation**: See `/doc-write` skill for feature documentation patterns
- **API documentation**: See `/api-doc` skill for endpoint documentation patterns

## Quality checklist

Before considering any documentation complete, see `quality-standards.md` for the comprehensive checklist and use the `/review-docs` skill for final review.

## Best practices

- Start with user's goal/problem
- Provide context before technical details
- Use consistent Apify terminology (see `terminology.md`)
- Structure content logically (basic → advanced)
- Link to related content
- Test all code examples before committing
- Never make assumptions about product features - ask if unsure
- For code review: check comments and obvious mistakes only

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

- **markdownlint** - Markdown syntax and formatting validation
- **eslint** - JavaScript/TypeScript code linting
- **Vale** - Prose style checking (optional, download styles with `vale sync`)

## Remember

The goal is to help users succeed with Apify. Every piece of documentation should:

- Be **clear** and easy to understand
- Be **accurate** and technically correct
- Be **actionable** with concrete examples
- Follow the **style guide** consistently
- Provide **real value** to users

When in doubt, prioritize clarity and usefulness over strict adherence to rules. But always maintain consistency within the documentation set.
