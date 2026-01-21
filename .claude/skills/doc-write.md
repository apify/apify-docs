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
- Use **US English** spelling and grammar
- Write in **active voice** whenever possible
- Use **inclusive language** - avoid gendered terms
- Be **action-oriented** in descriptions and titles
- Avoid directional language (don't use "left/right", use "above/below" or "preceding/following")
- Write for a technical audience but keep explanations clear

### 2. Front Matter
Always include proper front matter in MDX/MD files:

```yaml
---
title: "Clear, action-oriented title"
description: "140-160 character description that explains the value"
sidebar_position: 1
slug: /path/to/page
---
```

### 3. Text Formatting
- **Bold** for UI elements, buttons, menu items
- _Italics_ for emphasis and new terms
- `code` for inline code, file names, paths, variables
- Use code blocks with language specification

### 4. Headings
- Use **sentence case** for all headings
- Follow proper hierarchy: H1 → H2 → H3
- Make headings descriptive and action-oriented

### 5. Admonitions
Use Docusaurus admonitions to highlight important information:

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
- Use code tabs for multiple languages
- Add syntax highlighting
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

### 10. Quality Checklist
Before finalizing, verify:
- [ ] Content follows Microsoft style guide
- [ ] Front matter includes proper title, description, and metadata
- [ ] Code examples are complete with syntax highlighting
- [ ] All links use descriptive text
- [ ] Images include meaningful alt text
- [ ] Content uses inclusive language and active voice
- [ ] Headings follow proper hierarchy
- [ ] Content is clear, concise, and action-oriented

## Output
Provide the complete documentation with proper formatting, ready to be committed to the repository.
