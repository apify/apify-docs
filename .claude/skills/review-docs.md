# Documentation Review Skill

## Purpose
Review documentation for compliance with Apify style guide, quality standards, and best practices.

## When to Use
- Before submitting pull requests
- During documentation audits
- When editing existing documentation
- To ensure consistency across documentation

## Context Files
- `AGENTS.md` - Documentation standards
- `CONTRIBUTING.md` - Contribution guidelines
- `.cursor/rules/*.mdc` - Cursor-specific rules

## Review Checklist

### 1. Style Guide Compliance

**Microsoft Style Guide**:
- [ ] Headings use sentence case (not Title Case)
- [ ] UI elements use **bold** formatting
- [ ] Emphasis uses _italics_
- [ ] Inline code uses `backticks`
- [ ] Proper use of numbered lists vs. bullet points

**Language Guidelines**:
- [ ] Uses US English spelling
- [ ] Written in active voice
- [ ] Uses inclusive language (no gendered terms)
- [ ] Avoids directional language ("left/right")
- [ ] Action-oriented phrasing

### 2. Front Matter Validation

Required fields present and correct:
- [ ] `title` - Clear and action-oriented
- [ ] `description` - 140-160 characters
- [ ] `description` - Avoids word "documentation"
- [ ] `description` - Action-oriented phrasing
- [ ] `sidebar_position` - Appropriate numbering
- [ ] `slug` - Correct URL path

**Example**:
```yaml
---
title: "Create an Actor"          # ✅ Sentence case, action-oriented
description: "Learn how to build and deploy your first Actor on the Apify platform with this step-by-step guide covering code, configuration, and testing."  # ✅ 140-160 chars, no "documentation"
sidebar_position: 1
slug: /actors/development/create
---
```

### 3. Content Structure

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

### 4. Code Examples

**Quality**:
- [ ] Complete and runnable examples
- [ ] Proper syntax highlighting with language tag
- [ ] Includes comments for complex logic
- [ ] Uses realistic, meaningful variable names
- [ ] Shows both input and output where applicable

**Multiple Languages**:
- [ ] Uses Docusaurus code tabs when showing multiple languages
- [ ] Consistent examples across languages
- [ ] Includes JavaScript and Python where applicable

**Example**:
```markdown
# ✅ Good
```javascript
// Fetch actor details
const actor = await client.actor('john-doe/my-actor').get();
console.log(actor);
```

# ❌ Bad
```
const a = await c.actor('x').get();  // No language tag, unclear names
```
```

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

### 6. Images and Media

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
- [ ] Appropriate type (note, tip, info, caution, danger)
- [ ] Includes descriptive title
- [ ] Content is concise and relevant
- [ ] Not overused (max 2-3 per page)

**Example**:
```markdown
# ✅ Good
:::tip Performance optimization
Use `requestHandlerTimeoutSecs` to prevent slow requests from blocking your Actor.
:::

# ❌ Bad (no title, wrong type)
:::info
Be careful with this setting.
:::
```

### 8. Technical Accuracy

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

### 10. SEO Optimization

**Elements**:
- [ ] Descriptive, unique page title
- [ ] Meta description (140-160 chars)
- [ ] Relevant keywords used naturally
- [ ] Internal linking to related content
- [ ] Proper heading structure

### 11. Formatting Consistency

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

### 12. Specific Content Types

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

## Review Process

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
## Documentation Review: [File Name]

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

## Common Issues

### Issue: Title Case Headings
```markdown
# ❌ Bad
## How To Create An Actor

# ✅ Good
## How to create an Actor
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

### Issue: Long Description
```markdown
# ❌ Bad (190 chars)
description: "This comprehensive documentation guide will teach you everything you need to know about creating, configuring, and deploying Actors on the Apify platform from start to finish."

# ✅ Good (148 chars)
description: "Learn to create, configure, and deploy Actors on Apify with this step-by-step guide covering setup, development, and best practices."
```

## Output Format

Provide a structured review using the format above, with:
- Clear identification of issues
- Specific examples from the content
- Concrete suggestions for improvement
- Priority ranking of issues

## Quality Standards

A document is ready for publication when:
- All checklist items pass
- Automated linting passes
- Content is technically accurate
- Examples are tested and working
- Style guide is followed consistently
- No broken links
- Proper front matter included
- Accessibility standards met
