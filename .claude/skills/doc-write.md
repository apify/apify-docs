# Documentation Writer Skill

## Purpose

Help write or edit Apify documentation following the established style guide and best practices.

## When to Use

- Creating new documentation pages
- Editing existing documentation
- Converting drafts into proper documentation format
- Updating documentation content

## Context Files

- `AGENTS.md` - Primary documentation standards
- `CONTRIBUTING.md` - Contribution guidelines

## Instructions

When writing or editing documentation:

### 1. Content Standards

- Use **US English** spelling and grammar (e.g., "color" not "colour")
- Use **simple English** - prefer "use" over "utilize", favor simple sentence structures
- Write in **active voice** whenever possible
- Use **inclusive language** - avoid gendered terms
- Be **action-oriented** in descriptions and titles
- Use **simple present tense** for headings: "Create an Actor" (NOT "Creating an Actor")
- Use **Oxford commas** in all lists
- Avoid directional language (don't use "left/right", use "above/below" or "preceding/following")
- Write for a technical audience but keep explanations clear
- **Never make assumptions about product features** - ask if unsure

### 2. Front Matter

Always include proper front matter in MDX/MD files:

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

### 3. Text Formatting

- **Bold** ONLY for UI elements, buttons, tabs, menu items (e.g., "Click **Save & Run**"). NEVER use bold for emphasis.
- _Italics_ for emphasis (use sparingly)
- `code` for inline code, file names, paths, API parameters (e.g., "Set `timeout` in `INPUT.json`")
- Code blocks MUST specify language: ` ```javascript `, ` ```python `, ` ```bash `

### 4. Headings

- Use **sentence case** for all headings (not Title Case)
- Use **simple present tense**: "Create an Actor" (NOT "Creating an Actor")
- Follow proper hierarchy: H1 → H2 → H3
- Make headings descriptive and action-oriented

### 5. Admonitions

**All admonitions MUST have a title** (REQUIRED). Use Docusaurus admonitions to highlight important information:

```markdown
:::note Important information

Your note content here.

:::

:::tip Pro tip

Helpful tip for users.

:::

:::info Additional context

Background information.

:::

:::caution Warning

Something to be careful about.

:::

:::danger Critical

Critical information that could cause issues.

:::
```

### 6. Code Examples

- Include complete, runnable examples
- Use [code tabs](https://docusaurus.io/docs/markdown-features/tabs) for multiple languages
- Add syntax highlighting with language tags (REQUIRED)
- Include comments for complex code

### 7. Links

- Use descriptive link text (avoid "click here")
- Verify all internal links are correct
- Use relative paths for internal links

### 8. Images

- Use light theme for screenshots
- Include meaningful alt text
- Use red indicators for highlighting

### 9. Structure

For tutorials and guides, follow this structure:

1. **Introduction** - What will the user learn?
2. **Prerequisites** - What do they need?
3. **Step-by-step instructions** - Clear, numbered steps
4. **Code examples** - Complete, working examples
5. **Summary** - What they accomplished and next steps

### 10. Apify Terminology

Always use exact capitalization and phrasing:

- **Apify Actor** (never "Apify actor" or "apify actor")
- **Apify Proxy** (never "Apify proxy")
- **Apify Console** (never "the Apify Console")
- **Apify Store** (never "the Apify Store")
- **the Apify team** (lowercase "the", lowercase "team")
- **the Apify platform** (lowercase "the", lowercase "platform")
- **AI agent** (lowercase for generic terms)
- **MCP server** (lowercase for generic terms)

### 11. Quality Checklist

Before finalizing, verify:

- [ ] Content follows Microsoft style guide (sentence case, simple present tense)
- [ ] Front matter includes proper title, description (140-160 chars explaining value), and metadata
- [ ] Slug matches file path
- [ ] Code examples are complete with syntax highlighting (REQUIRED)
- [ ] All admonitions have titles (REQUIRED)
- [ ] Bold used ONLY for UI elements, never for emphasis
- [ ] Oxford commas used in all lists
- [ ] All links use descriptive text
- [ ] Images include meaningful alt text
- [ ] Content uses inclusive language, simple English, and active voice
- [ ] Headings follow proper hierarchy and use simple present tense
- [ ] Content is clear, concise, and action-oriented
- [ ] Correct Apify terminology used throughout
- [ ] No assumptions made about product features

## Output

Provide the complete documentation with proper formatting, ready to be committed to the repository.
