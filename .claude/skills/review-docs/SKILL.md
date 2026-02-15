# Documentation review skill

## Purpose

Review documentation for compliance with Apify style guide, quality standards, and best practices.

## When to use

- Before submitting pull requests
- During documentation audits
- When editing existing documentation
- To ensure consistency across documentation

## Context files

- `AGENTS.md` - Vendor-agnostic documentation standards
- `CONTRIBUTING.md` - Contribution guidelines and workflows
- `.claude/rules/` - Claude Code-specific standards (auto-loaded)

## Standards reference

This skill follows all standards defined in `.claude/rules/`:

- **writing-style.md** - Language, tone, grammar (sentence case, no gerunds, active voice)
- **content-standards.md** - Front matter, formatting, admonitions (must have titles), code examples, links, images
- **terminology.md** - Apify-specific capitalization (Apify Actor not actor, the Apify platform)
- **file-organization.md** - File naming and directory structure
- **quality-standards.md** - Complete quality checklist

**Review-specific process** and common issues are documented in this skill file below.

## Review process

### Before starting review

**CRITICAL**: Check that the latest changes were pulled from the feature branch

## Review checklist

Use this streamlined checklist for reviews. For detailed standards, see `.claude/rules/`:

### Writing quality

- [ ] **Style guide compliance** (see `writing-style.md` + `content-standards.md`)
  - Headings: Sentence case, no gerunds ("Create" not "Creating")
  - Bold: ONLY for UI elements (not emphasis)
  - Language: US English, active voice, inclusive, simple
  - Terminology: Check `terminology.md` for exact capitalization

- [ ] **Front matter** (see `content-standards.md`)
  - `title` - Sentence case, simple present tense
  - `description` - 140-160 chars, value-focused (not feature list)
  - `slug` - Matches file path
  - `sidebar_position` - Appropriate numbering

- [ ] **Content structure**
  - Clear introduction
  - Proper heading hierarchy (H1 → H2 → H3, no skips)
  - Logical topic progression
  - Summary/next steps at end
  - Related content linked

### Content formatting

- [ ] **Code examples** (see `content-standards.md`)
  - Complete and runnable
  - Language tag specified (REQUIRED)
  - Realistic examples
  - Code tabs for multiple languages
  - **Review scope**: Comments and obvious mistakes only (not full code review)

- [ ] **Links** (see `content-standards.md`)
  - Descriptive text (not "click here")
  - Internal links use relative paths
  - External links point to reliable sources
  - Link text makes sense out of context

- [ ] **Images** (see `content-standards.md`)
  - Meaningful alt text
  - Light theme for screenshots
  - Red indicators for highlighting
  - Stored in proper directory structure

- [ ] **Admonitions** (see `content-standards.md`)
  - **MUST have a title** (REQUIRED - no exceptions)
  - Appropriate type (note/tip/info/caution/danger)
  - Not overused (max 2-3 per page)

### Technical validation

- [ ] **Technical accuracy**
  - Code examples tested and working
  - API endpoints current
  - Version numbers up to date
  - No deprecated features recommended

- [ ] **Accessibility**
  - Proper heading hierarchy
  - Descriptive link text
  - Alt text for images
  - Color not sole indicator

- [ ] **SEO optimization**
  - Descriptive, unique title
  - Meta description 140-160 chars
  - Internal linking to related content
  - Keywords used naturally

- [ ] **Content-type specific checks**
  - **Tutorials** (see `/tutorial` skill): Clear learning objectives, prerequisites listed, sequential numbered steps, summary and next steps
  - **API docs** (see `/api-doc` skill): Operation IDs follow conventions, all parameters documented, code samples included (JS, Python, cURL), error responses documented
  - **Reference pages**: Comprehensive parameter tables, default values specified, type information included

## How to review

### Step 1: Automated checks

```bash
npm run lint:md        # Markdownlint - Markdown syntax/formatting
npm run lint:code      # ESLint - Code linting
vale sync             # Vale - Prose style checking (optional)

```

### Step 2: Manual review

Go through each section of the checklist above, noting any issues.

### Step 3: Provide feedback

**Format your review as**:

```markdown
## Documentation review: [File name]

### ✅ Strengths

- [What's done well]

### ⚠️ Issues found

#### Style guide

- [ ] Issue 1: [Description]

  - Current: [Example]

  - Suggested: [Better example]

#### Content

- [ ] Issue 2: [Description]

### 📝 Suggestions

- [Optional improvement 1]

- [Optional improvement 2]

### 🎯 Priority issues

1. [Critical issue to fix]

2. [Important issue to fix]

```

## Common issues

### Issue: Title case or gerund headings

```markdown
# ❌ Bad - Title Case
## How to create an Actor

# ❌ Bad - Gerund
## Creating an Actor

# ✅ Good - Sentence case, simple present tense
## How to create an Actor

# ✅ Good - Simple present tense
## Create an Actor

```

### Issue: Non-descriptive links

```markdown
# ❌ Bad

To learn more, click [here](link).

# ✅ Good

Learn more about [Actor input schemas](/actors/development/input-schema).

```

### Issue: Missing front matter description

```markdown
# ❌ Bad

---

title: "Actors"

---

# ✅ Good

---

title: "Create an Actor"
description: "Learn how to build and deploy your first Actor with step-by-step instructions covering setup, development, and testing."

---

```

### Issue: Long description or feature-focused

```markdown
# ❌ Bad - Too long (190 chars) and feature-focused

description: "This comprehensive documentation guide will teach you everything you need to know about creating, configuring, and deploying Actors on the Apify platform from start to finish."

# ❌ Bad - Feature-focused, not value-focused

description: "Documentation for Actor creation, configuration options, and deployment methods."

# ✅ Good - Value-focused (145 chars)

description: "Build and deploy Actors efficiently with this guide covering setup, development, testing, and best practices for production use."

```

### Issue: Bold for emphasis

```markdown
# ❌ Bad - bold used for emphasis

Click the button and **ensure you verify** the settings.

# ✅ Good - bold only for UI elements

Click the **Save & Run** button and ensure you verify the settings.

```

### Issue: Missing admonition title

```markdown
# ❌ Bad - no title (REQUIRED)

:::tip
Use pagination for large datasets.
:::

# ✅ Good - has title

:::tip Performance best practice
Use pagination for large datasets.
:::

```

### Issue: Incorrect Apify terminology

```markdown
# ❌ Bad

The Apify Console allows you to manage your Apify actors.

# ✅ Good

Apify Console allows you to manage your Apify Actors.

```

## Output format

Provide a structured review using the format above, with:

- Clear identification of issues

- Specific examples from the content

- Concrete suggestions for improvement

- Priority ranking of issues

## Quality standards

A document is ready for publication when:

- All checklist items pass

- Automated linting passes

- Content is technically accurate

- Examples are tested and working

- Style guide is followed consistently

- No broken links

- Proper front matter included

- Accessibility standards met
