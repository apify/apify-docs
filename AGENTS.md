# Apify Documentation Standards

## Project Overview

This is the Apify documentation repository containing platform documentation, academy content, and API reference. The project uses Docusaurus with MDX, OpenAPI specifications, and follows Microsoft style guide principles.

## Documentation Structure

- **Platform docs**: `/sources/platform/` - Core platform features and functionality
- **Academy**: `/sources/academy/` - Educational content, tutorials, and courses
- **API reference**: `/apify-api/` - Generated from OpenAPI specifications

## Writing Style & Guidelines

### Language & Tone

- Use **US English** spelling and grammar
- Write in **inclusive language** - avoid gendered terms and assumptions
- Use **active voice** whenever possible
- Write for a **technical audience** but keep explanations clear and accessible
- Avoid directional language (don't use "left/right")
- Be **action-oriented** in descriptions and titles

### Technical Writing Best Practices

- **Start with the user's goal** - what are they trying to accomplish?
- **Use clear, concise sentences** - avoid unnecessary complexity
- **Provide context** before diving into technical details
- **Use consistent terminology** throughout the documentation
- **Include examples** for complex concepts
- **Structure content logically** - from basic to advanced concepts

### Microsoft Style Guide Compliance

- Use **sentence case** for headings
- Use **title case** for UI elements and proper nouns
- **Bold** for UI elements, buttons, menu items
- _Italics_ for emphasis and new terms
- `code` for inline code, file names, and technical terms
- Use **numbered lists** for sequential steps
- Use **bullet points** for non-sequential items

## Content Formatting Standards

### Front Matter (MDX files)

```yaml
---
title: "Clear, action-oriented title"
description: "140-160 character description that explains the value"
sidebar_position: 1
slug: /path/to/page
---
```

### Text Emphasis

- **Bold** for UI elements, buttons, menu items
- _Italics_ for emphasis and new terms
- `code` for inline code, file names, paths, variables
- Use code blocks with language specification for examples

### Admonitions

Use admonitions to highlight important information:

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

### Code Examples

- Use **code tabs** for multiple language examples
- Include **complete, runnable examples**
- Add **comments** to explain complex code
- Use **syntax highlighting** for all code blocks

## API Documentation Rules

### OpenAPI Specifications

- Follow **RESTful conventions** for endpoint design
- Use **descriptive operation IDs** following camelCase
- Include **comprehensive examples** for all endpoints
- Provide **clear parameter descriptions**

### Code Samples

- Include examples in **multiple languages** (JavaScript, Python, cURL)
- Use **realistic data** in examples
- Show **error handling** where appropriate
- Include **authentication examples**

## Common Patterns

### Tutorial Structure

1. **Introduction** - What will the user learn?
2. **Prerequisites** - What do they need to know/have?
3. **Step-by-step instructions** - Clear, numbered steps
4. **Code examples** - Complete, working examples
5. **Summary** - What they accomplished and next steps

### Troubleshooting Sections

- **Common issues** and solutions
- **Error messages** and their meanings
- **Debugging steps** for complex problems
- **Contact information** for additional help

## Accessibility Guidelines

- Use **descriptive link text** (avoid "click here")
- Include **alt text** for all images
- Use **proper heading hierarchy** (H1 → H2 → H3)
- Write **clear, concise content**

## SEO Best Practices

- Use **descriptive page titles**
- Include **relevant keywords** naturally
- Write **meta descriptions** (140-160 characters)
- Use **proper heading structure**
- Include **internal links** to related content

## File Organization Rules

### Naming Conventions

- Use **kebab-case** for file names: `web-scraping-basics.md`
- Use **descriptive names** that reflect content
- Group related files in **logical directories**

### Directory Structure

```text
sources/
├── platform/          # Platform documentation
│   ├── actors/        # Actor-related content
│   ├── storage/       # Storage documentation
│   └── integrations/  # Integration guides
└── academy/           # Educational content
    ├── tutorials/     # Step-by-step guides
    ├── webscraping/   # Web scraping courses
```

## Quality Standards

When creating or editing content, ensure:

- [ ] Content follows Microsoft style guide (sentence case headings, proper emphasis)
- [ ] Front matter includes proper title, description, and metadata
- [ ] Code examples are complete and include proper syntax highlighting
- [ ] All links use descriptive text (avoid "click here")
- [ ] Images include meaningful alt text
- [ ] Content uses inclusive language and active voice
- [ ] Headings follow proper hierarchy (H1 → H2 → H3)
- [ ] Content is clear, concise, and action-oriented

Remember: The goal is to help users succeed with Apify. Every piece of documentation should serve that purpose by being clear, accurate, and actionable.
