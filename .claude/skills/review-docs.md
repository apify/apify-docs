# Documentation Review Skill

## Purpose

Review documentation for compliance with Apify style guide, quality standards, and best practices.

## When to Use

- Before submitting pull requests

- During documentation audits

- When editing existing documentation

- To ensure consistency across documentation

## Context files

- `AGENTS.md` - Documentation standards

- `CONTRIBUTING.md` - Contribution guidelines

- `.cursor/rules/*.mdc` - Cursor-specific rules

## Review process

### Before starting review

**CRITICAL**: Check that the latest changes were pulled from the feature branch

## Review checklist

### 1. Style guide compliance

**Microsoft Style Guide**:

- [ ] Headings use sentence case (not Title Case)

- [ ] Headings use simple present tense ("Create an Actor" NOT "Creating an Actor")

- [ ] UI elements use **bold** formatting ONLY (never bold for emphasis)

- [ ] Emphasis uses _italics_ (used sparingly)

- [ ] Inline code uses `backticks`

- [ ] Proper use of numbered lists vs. bullet points

- [ ] Oxford commas used in all lists

**Language Guidelines**:

- [ ] Uses US English spelling (e.g., "color" not "colour")

- [ ] Uses simple English ("use" not "utilize")

- [ ] Written in active voice

- [ ] Uses inclusive language (no gendered terms)

- [ ] Avoids directional language ("left/right")

- [ ] Action-oriented phrasing

**Apify Terminology** (check exact capitalization):

- [ ] **Apify Actor** (never "Apify actor")

- [ ] **Apify Proxy** (never "Apify proxy")

- [ ] **Apify Console** (never "the Apify Console")

- [ ] **Apify Store** (never "the Apify Store")

- [ ] **the Apify team** (lowercase)

- [ ] **the Apify platform** (lowercase)

- [ ] **AI agent** (lowercase for generic terms)

- [ ] **MCP server** (lowercase for generic terms)

### 2. Front matter validation

Required fields present and correct:

- [ ] `title` - Clear, action-oriented, sentence case, simple present tense

- [ ] `description` - 140-160 characters

- [ ] `description` - Explains value, not features

- [ ] `description` - Avoids word "documentation"

- [ ] `description` - Action-oriented phrasing

- [ ] `sidebar_position` - Appropriate numbering

- [ ] `slug` - Correct URL path and matches file path

**Example**:

```yaml

---

title: "Create an Actor"          # ✅ Sentence case, simple present tense
description: "Build and deploy your first Apify Actor with this guide covering setup, development, testing, and best practices."  # ✅ 140-160 chars, explains value
sidebar_position: 1
slug: /actors/development/create  # ✅ Matches file path

---

```

### 3. Content structure

**Heading Hierarchy**:

- [ ] Single H1 (page title) only

- [ ] Proper H2 → H3 → H4 nesting

- [ ] No skipped levels (H2 → H4)

- [ ] Headings are descriptive and scannable

**Document Flow**:

- [ ] Clear introduction explaining purpose

- [ ] Logical progression of topics

- [ ] Summary or next steps at end

- [ ] Related content linked appropriately

### 4. Code examples

**Quality**:

- [ ] Complete and runnable examples

- [ ] Proper syntax highlighting with language tag (REQUIRED)

- [ ] Includes comments for complex logic

- [ ] Uses realistic, meaningful variable names

- [ ] Shows both input and output where applicable

**Code Review Scope**:

- [ ] Code snippets are developer-provided

- [ ] Review comments and obvious mistakes only (not full code review)

**Multiple Languages**:

- [ ] Uses [Docusaurus code tabs](https://docusaurus.io/docs/markdown-features/tabs) when showing multiple languages

- [ ] Consistent examples across languages

- [ ] Includes JavaScript and Python where applicable

### 5. Links

**Internal Links**:

- [ ] Use relative paths

- [ ] Point to correct locations

- [ ] Use descriptive link text (not "click here")

- [ ] Link text makes sense out of context

**External Links**:

- [ ] Open in new tab if appropriate

- [ ] Point to reliable, permanent resources

- [ ] Include brief context about destination

**Example**:

```markdown
# ✅ Good

Learn more about [Actor definition files](/actors/development/actor-definition).

# ❌ Bad

Click [here](link) to learn more.

```

### 6. Images and media

**Screenshots**:

- [ ] Use light theme

- [ ] Include meaningful alt text

- [ ] Use red indicators for highlighting

- [ ] Appropriate size and resolution

- [ ] Stored in proper directory

**Alt Text**:

- [ ] Describes image content

- [ ] Useful for screen readers

- [ ] Not just "image" or "screenshot"

**Example**:

```markdown
# ✅ Good

![Actor input schema configuration in Apify Console](./images/input-schema.png)

# ❌ Bad

![screenshot](./img.png)

```

### 7. Admonitions

**Usage**:

- [ ] **MUST have a title** (REQUIRED - no exceptions)

- [ ] Appropriate type (note, tip, info, caution, danger)

- [ ] Title is descriptive

- [ ] Content is concise and relevant

- [ ] Not overused (max 2-3 per page)

**Example**:

```markdown
# ✅ Good - has title and correct spacing

:::tip Performance optimization

Use `requestHandlerTimeoutSecs` to prevent slow requests from blocking your Actor.

:::

# ❌ Bad - missing title (REQUIRED)

:::info
Be careful with this setting.
:::

# ❌ Bad - no title

:::tip
This is a helpful tip.
:::

```

### 8. Technical accuracy

**Validation**:

- [ ] Code examples tested and working

- [ ] API endpoints are current

- [ ] Configuration examples are valid

- [ ] Version numbers are up to date

- [ ] No deprecated features recommended

### 9. Accessibility

**Compliance**:

- [ ] Proper heading hierarchy

- [ ] Descriptive link text

- [ ] Alt text for images

- [ ] Color not used as only indicator

- [ ] Sufficient contrast in custom elements

### 10. SEO optimization

**Elements**:

- [ ] Descriptive, unique page title

- [ ] Meta description (140-160 chars)

- [ ] Relevant keywords used naturally

- [ ] Internal linking to related content

- [ ] Proper heading structure

### 11. Formatting consistency

**Text Elements**:

- [ ] Consistent use of bold for UI elements

- [ ] Consistent use of italics for emphasis

- [ ] Consistent use of code formatting

- [ ] No unnecessary ALL CAPS

- [ ] Proper spacing and line breaks

**Lists**:

- [ ] Parallel structure in list items

- [ ] Proper punctuation (periods for sentences)

- [ ] Consistent capitalization

- [ ] Numbered for sequential steps

- [ ] Bullets for non-sequential items

### 12. Specific content types

**For Tutorials**:

- [ ] Clear learning objectives stated

- [ ] Prerequisites listed

- [ ] Sequential, numbered steps

- [ ] Complete working examples

- [ ] Summary and next steps

**For API Documentation**:

- [ ] Operation IDs follow conventions

- [ ] All parameters documented

- [ ] Response schemas complete

- [ ] Code samples included

- [ ] Error responses documented

**For Reference Pages**:

- [ ] Comprehensive parameter tables

- [ ] Default values specified

- [ ] Type information included

- [ ] Examples for complex options

- [ ] Related pages linked

## Review process

### Step 1: Automated Checks

```bash
npm run lint:md        # Markdown linting
npm run lint:code      # Code linting
vale sync             # Prose linting setup

```

### Step 2: Manual Review

Go through each section of the checklist above, noting any issues.

### Step 3: Provide Feedback

**Format your review as**:

```markdown
## Documentation review: [File Name]

### ✅ Strengths

- [What's done well]

### ⚠️ Issues Found

#### Style Guide

- [ ] Issue 1: [Description]

  - Current: [Example]

  - Suggested: [Better example]

#### Content

- [ ] Issue 2: [Description]

### 📝 Suggestions

- [Optional improvement 1]

- [Optional improvement 2]

### 🎯 Priority Issues

1. [Critical issue to fix]

2. [Important issue to fix]

```

## Common issues

### Issue: Title Case or Gerund Headings

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

### Issue: Non-Descriptive Links

```markdown
# ❌ Bad

To learn more, click [here](link).

# ✅ Good

Learn more about [Actor input schemas](/actors/development/input-schema).

```

### Issue: Missing Front Matter Description

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

### Issue: Long Description or Feature-Focused

```markdown
# ❌ Bad - Too long (190 chars) and feature-focused

description: "This comprehensive documentation guide will teach you everything you need to know about creating, configuring, and deploying Actors on the Apify platform from start to finish."

# ❌ Bad - Feature-focused, not value-focused

description: "Documentation for Actor creation, configuration options, and deployment methods."

# ✅ Good - Value-focused (145 chars)

description: "Build and deploy Actors efficiently with this guide covering setup, development, testing, and best practices for production use."

```

### Issue: Bold for Emphasis

```markdown
# ❌ Bad - bold used for emphasis

Click the button and **ensure you verify** the settings.

# ✅ Good - bold only for UI elements

Click the **Save & Run** button and ensure you verify the settings.

```

### Issue: Missing Admonition Title

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

### Issue: Incorrect Apify Terminology

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
