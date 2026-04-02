# Review output format

Use this format when providing documentation review feedback.

## Template

```markdown
## Documentation review: [File name]

### Strengths

- [What's done well]

### Issues found

#### Style guide

- [ ] Issue 1: [Description]
  - Current: [Example from the doc]
  - Suggested: [Better version]

#### Content

- [ ] Issue 2: [Description]

### Suggestions

- [Optional improvement 1]
- [Optional improvement 2]

### Priority fixes

1. [Critical issue - must fix before publishing]
1. [Important issue - should fix]
1. [Minor issue - nice to have]
```

## Common issues with examples

### Title case or gerund headings

```markdown
# Bad - Title Case
## How To Create An Actor

# Bad - Gerund
## Creating an Actor

# Good - Sentence case, simple present tense
## Create an Actor
```

### Non-descriptive links

```markdown
# Bad
To learn more, click [here](link).

# Good
Learn more about [Actor input schemas](/actors/development/input-schema).
```

### Missing front matter description

```markdown
# Bad
---
title: "Actors"
---

# Good
---
title: "Create an Actor"
description: "Learn how to build and deploy your first Actor with step-by-step instructions covering setup, development, and testing."
---
```

### Long or feature-focused description

```markdown
# Bad - Too long (190 chars) and feature-focused
description: "This comprehensive documentation guide will teach you everything you need to know about creating, configuring, and deploying Actors on the Apify platform from start to finish."

# Good - Value-focused (145 chars)
description: "Build and deploy Actors efficiently with this guide covering setup, development, testing, and best practices for production use."
```

### Bold used for emphasis

```markdown
# Bad - bold used for emphasis
Click the button and **ensure you verify** the settings.

# Good - bold only for UI elements
Click the **Save & Run** button and ensure you verify the settings.
```

### Missing admonition title

```markdown
# Bad - no title (REQUIRED)
:::tip
Use pagination for large datasets.
:::

# Good - has title
:::tip Performance
Use pagination for large datasets.
:::
```

### Incorrect Apify terminology

```markdown
# Bad
The Apify Console allows you to manage your Apify actors.

# Good
Apify Console allows you to manage your Apify Actors.
```

## Quality gate

A document is ready for publication when:

- All checklist items pass
- Automated linting passes
- Content is technically accurate
- Examples are tested and working
- Style guide is followed consistently
- No broken links
- Proper front matter included
