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

Review compliance against all standards in `.claude/rules/`:

- `writing-style.md` - Prose voice and tone
- `content-standards.md` - Formatting and structure
- `terminology.md` - Product names and capitalization
- `grammar-rules.md` - Grammar mechanics and punctuation
- `quality-standards.md` - Complete quality checklist
- `file-organization.md` - File naming and directory structure

## Review process

### Before starting review

**CRITICAL**: Check that the latest changes were pulled from the feature branch

## Review checklist

### Style compliance (delegated)

For each rules file, launch a subagent to check the reviewed content against that file's standards. The subagent reads the rules file directly, so the review always uses the latest rules.

Check content compliance against:

1. `writing-style.md` - voice, tone, language patterns
1. `content-standards.md` - formatting, front matter, headings, code, links, images
1. `terminology.md` - product names, article usage, feature terms
1. `grammar-rules.md` - hyphenation, punctuation, numbers, brand spelling

Each subagent should return a list of violations with line numbers and suggested fixes.

### Content review (manual)

These aspects require judgment and aren't covered by the rules files:

- [ ] **Content structure** - Clear introduction, logical progression, summary/next steps
- [ ] **Heading hierarchy** - H2 → H3 → H4, no skipped levels
- [ ] **Technical accuracy** - Code examples tested, API endpoints current, no deprecated features
- [ ] **Completeness** - Prerequisites listed, all steps included, edge cases addressed
- [ ] **Content-type checks**
  - **Tutorials**: Clear learning objectives, sequential numbered steps, verification at each step
  - **API docs**: All parameters documented, code samples in JS and Python, error responses
  - **Reference pages**: Comprehensive parameter tables, default values, type information
- [ ] **Accessibility** - Proper heading hierarchy, descriptive link text, image alt text
- [ ] **SEO** - Descriptive title, meta description 140-160 chars, internal linking

## How to review

### Step 1: Run automated checks

```bash
npm run lint:md        # Markdownlint - Markdown syntax/formatting
npm run lint:code      # ESLint - Code linting
```

### Step 2: Check style compliance

For each of the rules files listed above, review the content against that file's standards. Use a subagent per file to read the rules and check compliance. Collect all violations.

### Step 3: Content review

Go through the manual content review checklist above. These require human/AI judgment about structure, accuracy, and completeness.

### Step 4: Provide feedback

Format your review using the output template below.

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
