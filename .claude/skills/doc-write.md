# Documentation writer skill

## Purpose

Help write or edit Apify documentation following the established style guide and best practices.

## When to use

- Creating new documentation pages
- Editing existing documentation
- Converting drafts into proper documentation format
- Updating documentation content

## Context files

- `AGENTS.md` - Primary vendor-agnostic documentation standards
- `CONTRIBUTING.md` - Contribution guidelines
- `.claude/rules/` - Claude Code-specific standards (auto-loaded)

## Standards reference

This skill follows all standards defined in `.claude/rules/`:

- **writing-style.md** - Language, tone, grammar, headings, word choice (US English, active voice, sentence case, no gerunds)
- **content-standards.md** - Front matter, text formatting, admonitions (must have titles), code examples, links, images
- **terminology.md** - Apify-specific capitalization (Apify Actor, the Apify platform, etc.)
- **quality-standards.md** - Complete pre-submission quality checklist

**Key reminders**:
- Sentence case for headings (not Title Case)
- No gerunds in headings (use "Create" not "Creating")
- Bold ONLY for UI elements (not for emphasis)
- All admonitions MUST have titles
- Front matter required (title, description 140-160 chars, sidebar_position, slug)
- Match slug to file path

## Documentation structure

### For platform documentation

1. **Introduction** - Clear description of the feature or concept
2. **When to use** - Explain when this feature is appropriate
3. **How to configure/use** - Step-by-step instructions with code examples
4. **Best practices** - Recommendations and tips
5. **Related features** - Links to related documentation

### For tutorials and guides

1. **Introduction** - What will the user learn? (Include learning objectives)
2. **Prerequisites** - Required knowledge, setup, accounts
3. **Step-by-step instructions** - Clear, numbered steps with explanations
4. **Code examples** - Complete, runnable examples (test before submitting)
5. **Testing/verification** - How to verify it works
6. **Summary** - What they accomplished and suggested next steps

### For reference documentation

1. **Overview** - Brief description of the topic
2. **Parameters/options** - Detailed list with types and descriptions
3. **Examples** - Practical usage examples
4. **Related information** - Links to related topics

## Documentation types

### Tutorials
- **Goal**: Teach users how to accomplish a specific task
- **Tone**: Instructional, encouraging, step-by-step
- **Examples**: "Build your first web scraper", "Deploy an Actor to production"
- **Use**: Complete code examples, screenshots, expected results at each step

### Guides
- **Goal**: Explain how to use a feature or solve a problem
- **Tone**: Informative, practical, solution-oriented
- **Examples**: "Actor configuration", "Working with datasets"
- **Use**: Focused code snippets, best practices, common patterns

### Reference
- **Goal**: Document technical specifications and API details
- **Tone**: Precise, comprehensive, technical
- **Examples**: "Actor configuration schema", "API endpoints"
- **Use**: Complete parameter lists, type definitions, return values

## Skill-specific checklist

Before finalizing documentation, verify these doc-write-specific items:

- [ ] Structure matches documentation type (tutorial/guide/reference)
- [ ] Introduction clearly states what the user will learn
- [ ] Prerequisites are listed if needed
- [ ] Code examples are complete and tested
- [ ] Each step in tutorials has clear instructions
- [ ] Related documentation is linked
- [ ] No assumptions made about product features (ask if unsure)

For general quality standards, see `quality-standards.md`

## Output

Provide the complete documentation with proper formatting, ready to be committed to the repository.
