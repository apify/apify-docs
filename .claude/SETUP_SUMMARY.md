## Claude Code Infrastructure Setup Summary

## Overview

This document summarizes the Claude Code infrastructure created for the Apify documentation repository.

## What Was Identified

### Existing Instruction Files

1. **`AGENTS.md`** (Root)
   - Primary vendor-agnostic documentation standards
   - Covers writing style, formatting, API docs, quality standards
   - Should be the first reference for all documentation work

2. **`CONTRIBUTING.md`** (Root)
   - Complete contribution guidelines
   - Development setup and workflows
   - API documentation process
   - Quality checks and linting

3. **`.cursor/rules/*.mdc`** (Cursor-specific)
   - `documentation-style.mdc` - Cursor-specific doc rules
   - `content-formatting.mdc` - MDX/Markdown formatting
   - `api-documentation.mdc` - OpenAPI workflows
   - `quality-standards.mdc` - Quality checklist
   - `file-organization.mdc` - Naming and structure

### Documentation Structure

```text
sources/
├── platform/          # Platform documentation
│   ├── actors/        # Actor-related content
│   ├── storage/       # Storage documentation
│   └── integrations/  # Integration guides
└── academy/           # Educational content
    ├── tutorials/     # Step-by-step guides
    └── webscraping/   # Web scraping courses

apify-api/
└── openapi/          # API specifications
    ├── openapi.yaml  # Main spec
    ├── components/   # Schemas
    └── paths/        # Endpoints
```

## What Was Created

### 1. Main Instructions File
**File**: `.claude/instructions.md`

Comprehensive instructions for Claude Code including:
- Project overview and structure
- Core documentation standards
- Available skills reference
- Development workflow
- Quality checklist
- Common patterns
- Best practices

### 2. Claude Code Skills

Four specialized skills for common documentation tasks:

#### `/doc-write` - Documentation Writing
**File**: `.claude/skills/doc-write.md`

**Purpose**: Create or edit documentation following style guide

**Includes**:
- Content standards (language, voice, style)
- Front matter requirements
- Text formatting rules
- Heading conventions
- Admonition usage
- Code example standards
- Link and image guidelines
- Quality checklist

#### `/api-doc` - API Documentation
**File**: `.claude/skills/api-doc.md`

**Purpose**: Work with OpenAPI specifications

**Includes**:
- OpenAPI file structure
- Schema documentation process
- Path documentation creation
- Operation ID conventions
- Code sample creation
- Testing and validation
- Best practices
- Quality checklist

#### `/tutorial` - Tutorial Creation
**File**: `.claude/skills/tutorial.md`

**Purpose**: Create structured tutorials

**Includes**:
- Complete tutorial structure template
- Front matter for tutorials
- Introduction section format
- Prerequisites section
- Step-by-step instruction format
- Code examples section
- Testing/verification section
- Troubleshooting section
- Summary and next steps
- Tutorial types (Platform, Academy, Integration)
- Quality checklist

#### `/review-docs` - Documentation Review
**File**: `.claude/skills/review-docs.md`

**Purpose**: Review documentation for compliance

**Includes**:
- Comprehensive review checklist
- Style guide compliance checks
- Front matter validation
- Content structure verification
- Code example quality checks
- Link and image validation
- Admonition usage review
- Technical accuracy checks
- Accessibility compliance
- SEO optimization review
- Common issues and examples
- Review process steps
- Feedback format template

### 3. Configuration Files

#### `.claude/claude.json`
Registers skills with Claude Code and defines context files:
- Skill definitions with names and descriptions
- Instructions file reference
- Context file references (AGENTS.md, CONTRIBUTING.md)

#### `.claude/README.md`
User-facing documentation for the Claude Code setup:
- Structure overview
- How to use skills
- Quick start examples
- Key standards reference
- Testing instructions
- Best practices
- Maintenance notes

## Key Features

### 1. Hierarchical Documentation Structure
```text
Primary Reference: AGENTS.md (vendor-agnostic)
       ↓
Contributing Guide: CONTRIBUTING.md (process & setup)
       ↓
Claude Instructions: .claude/instructions.md (Claude Code specific)
       ↓
Specialized Skills: .claude/skills/*.md (task-specific)
```

### 2. Comprehensive Style Guide Coverage
All skills enforce:
- US English, active voice, inclusive language
- Sentence case headings
- Proper front matter (140-160 char descriptions)
- Code formatting with syntax highlighting
- Descriptive links and alt text
- Proper heading hierarchy

### 3. Quality Assurance
Each skill includes:
- Detailed checklists
- Common issues and examples
- Testing procedures
- Before/after examples
- Best practices

### 4. Practical Examples
Skills provide:
- Complete templates
- Code examples
- Front matter examples
- Good vs. bad examples
- Real-world patterns

## How to Use

### Quick Start
```bash
# In Claude Code, use skills like this:
/doc-write       # Create or edit documentation
/api-doc         # Work with API specs
/tutorial        # Create tutorials
/review-docs     # Review documentation
```

### Typical Workflow

1. **Read reference materials**:
   - Start with `AGENTS.md` for core standards
   - Check `CONTRIBUTING.md` for process

2. **Choose appropriate skill**:
   - Writing content → `/doc-write`
   - API endpoint → `/api-doc`
   - Tutorial → `/tutorial`
   - Review → `/review-docs`

3. **Follow skill instructions**:
   - Each skill provides step-by-step guidance
   - Includes templates and examples
   - Has quality checklists

4. **Test and validate**:
   ```bash
   npm run lint:md      # Markdown linting
   npm run lint:code    # Code linting
   npm start            # Preview changes
   ```

5. **Review before submission**:
   - Use `/review-docs` skill
   - Run all linters
   - Verify examples work

## Integration with Existing Tools

### Complements Cursor Rules
The Claude Code setup:
- Works alongside existing `.cursor/rules/*.mdc` files
- Provides vendor-agnostic alternative
- Can be used by any AI assistant tool
- Maintains consistency with Cursor setup

### Respects Existing Standards
All skills based on:
- Microsoft Style Guide (from AGENTS.md)
- Apify documentation conventions
- OpenAPI 3.0 specifications
- Docusaurus best practices

### Works with Linting Tools
Skills guide users to run:
- `markdownlint` for Markdown
- `eslint` for code
- `Vale` for prose (optional)
- `npm test` for OpenAPI validation

## Maintenance

### Keeping in Sync
When documentation standards change:

1. Update `AGENTS.md` (source of truth)
2. Update `CONTRIBUTING.md` if process changes
3. Update `.claude/instructions.md` to reflect changes
4. Update relevant skill files in `.claude/skills/`
5. Update `.cursor/rules/*.mdc` for Cursor users

### Adding New Skills
To add a new skill:

1. Create `.claude/skills/new-skill.md`
2. Follow existing skill structure:
   - Purpose section
   - When to use
   - Context files
   - Instructions
   - Examples
   - Quality checklist
3. Register in `.claude/claude.json`
4. Document in `.claude/README.md`

### Version Control
All Claude Code files are checked into git:
- `.claude/instructions.md`
- `.claude/skills/*.md`
- `.claude/claude.json`
- `.claude/README.md`

Exception: `.claude/settings.local.json` may be gitignored if it contains user-specific settings.

## Benefits

### For Documentation Writers
- Clear guidance on style and formatting
- Ready-to-use templates
- Quality checklists
- Consistent standards

### For Reviewers
- Comprehensive review checklist
- Clear quality criteria
- Consistent feedback format
- Automated validation

### For Contributors
- Lower barrier to entry
- Clear expectations
- Helpful examples
- Quick feedback loop

### For Maintainers
- Consistent documentation quality
- Reduced review time
- Automated checks
- Scalable standards

## Success Criteria

Documentation is ready when it:
- ✅ Passes all linters
- ✅ Follows style guide (AGENTS.md)
- ✅ Has proper front matter
- ✅ Includes tested examples
- ✅ Uses descriptive links
- ✅ Has meaningful alt text
- ✅ Follows proper heading hierarchy
- ✅ Uses active voice and inclusive language

## Next Steps

### For Users
1. Read `.claude/README.md`
2. Try using a skill: `/doc-write`, `/api-doc`, `/tutorial`, or `/review-docs`
3. Reference `AGENTS.md` for style questions
4. Run linters before committing

### For Maintainers
1. Monitor usage and gather feedback
2. Update skills based on common issues
3. Keep standards in sync across files
4. Consider adding more specialized skills

### Potential Future Skills
- `/migration` - Guide for migrating legacy docs
- `/seo-optimize` - SEO optimization helper
- `/accessibility` - Accessibility checker
- `/link-checker` - Validate internal/external links
- `/front-matter` - Bulk front matter updates

## Summary

The Claude Code infrastructure provides:
- **4 specialized skills** for common documentation tasks
- **Comprehensive instructions** aligned with existing standards
- **Quality checklists** for consistency
- **Practical templates** and examples
- **Integration** with existing tools and workflows

All based on the existing `AGENTS.md` and `CONTRIBUTING.md` standards, ensuring consistency across the documentation ecosystem.
