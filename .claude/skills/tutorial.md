# Tutorial Creator Skill

## Purpose
Create comprehensive, structured tutorials for the Apify Academy or Platform documentation.

## When to Use
- Creating new tutorials
- Restructuring existing tutorials
- Converting informal guides into proper tutorials
- Building step-by-step learning content

## Context Files
- `AGENTS.md` - Documentation standards
- `CONTRIBUTING.md` - Style guide

## Tutorial Structure

### 1. Front Matter
```yaml
---
title: "Action-oriented tutorial title"
description: "Clear description of what the user will learn (140-160 chars)"
sidebar_position: 1
slug: /category/tutorial-name
---
```

### 2. Introduction Section

**Purpose**: Hook the reader and explain what they'll learn

**Template**:
```markdown
# [Tutorial Title]

**[Brief description of what the user will accomplish]**

---

[Opening paragraph explaining the problem/use case this tutorial addresses]

## What you'll learn

In this tutorial, you'll learn how to:

- [Learning objective 1]
- [Learning objective 2]
- [Learning objective 3]

By the end, you'll be able to [specific outcome].
```

### 3. Prerequisites Section

**Purpose**: Set expectations for required knowledge and setup

**Template**:
```markdown
## Prerequisites

Before starting this tutorial, make sure you have:

- [ ] [Required knowledge/skill 1]
- [ ] [Required tool/account 2]
- [ ] [Required setup 3]

**Time estimate**: [X] minutes
```

### 4. Step-by-Step Instructions

**Purpose**: Guide users through the process clearly and systematically

**Guidelines**:
- Use numbered lists for sequential steps
- Start each step with an action verb
- Include code examples for each major step
- Add screenshots where helpful
- Explain what each step accomplishes

**Template**:
```markdown
## Step 1: [Action verb] [what to do]

[Brief explanation of what this step accomplishes]

1. [First sub-step]
2. [Second sub-step]

```language
// Code example with comments
const example = "code";
```

**Expected result**: [What should happen after this step]

:::tip
[Helpful tip related to this step]
:::
```

### 5. Code Examples Section

**Purpose**: Provide complete, working code that users can run

**Guidelines**:
- Include complete, runnable examples
- Use code tabs for multiple languages
- Add comprehensive comments
- Show both input and output
- Explain key parts of the code

**Template**:
```markdown
## Complete example

Here's the complete code for this tutorial:

<Tabs>
<TabItem value="js" label="JavaScript">

```javascript
// Complete JavaScript example
// Comments explaining key sections
const example = "working code";
```

</TabItem>
<TabItem value="py" label="Python">

```python
# Complete Python example
# Comments explaining key sections
example = "working code"
```

</TabItem>
</Tabs>
```

### 6. Testing/Verification Section

**Purpose**: Help users verify their implementation works

**Template**:
```markdown
## Testing your solution

To verify everything works correctly:

1. [Test step 1]
2. [Test step 2]

**Expected output**:
```
[What the user should see]
```

:::note
If you see [common error], check [solution].
:::
```

### 7. Troubleshooting Section

**Purpose**: Address common issues users might encounter

**Template**:
```markdown
## Troubleshooting

### [Common problem 1]

**Symptom**: [What the user sees]

**Solution**: [How to fix it]

### [Common problem 2]

**Symptom**: [What the user sees]

**Solution**: [How to fix it]
```

### 8. Summary/Next Steps

**Purpose**: Reinforce learning and guide users forward

**Template**:
```markdown
## Summary

In this tutorial, you learned how to:

- ✅ [Accomplishment 1]
- ✅ [Accomplishment 2]
- ✅ [Accomplishment 3]

## Next steps

Now that you've completed this tutorial, you can:

- [Related tutorial/topic 1] - [Link]
- [Related tutorial/topic 2] - [Link]
- [Advanced topic] - [Link]

## Additional resources

- [Related documentation link 1]
- [Related documentation link 2]
- [External resource link]
```

## Tutorial Types

### Platform Tutorial
**Focus**: How to use Apify platform features
**Location**: `/sources/platform/`
**Style**: Practical, feature-focused

### Academy Tutorial
**Focus**: Teaching web scraping or automation concepts
**Location**: `/sources/academy/tutorials/`
**Style**: Educational, concept-focused

### Integration Tutorial
**Focus**: Connecting Apify with other tools
**Location**: `/sources/platform/integrations/`
**Style**: Step-by-step integration guide

## Best Practices

1. **Start Simple**: Begin with basic concepts before advanced topics
2. **Be Specific**: Use concrete examples rather than abstract explanations
3. **Show, Don't Tell**: Include visual aids and code examples
4. **Test Everything**: Ensure all code examples work
5. **Anticipate Questions**: Address common points of confusion
6. **Link Related Content**: Connect to other relevant tutorials
7. **Keep Updated**: Mark tutorials with last-updated dates
8. **User Perspective**: Write from the user's point of view

## Quality Checklist

Before publishing:
- [ ] Clear learning objectives stated upfront
- [ ] Prerequisites clearly listed
- [ ] All steps are numbered and action-oriented
- [ ] Code examples are complete and tested
- [ ] Screenshots included where helpful (light theme)
- [ ] Common issues addressed in troubleshooting
- [ ] Next steps and related content linked
- [ ] Front matter complete with description (140-160 chars)
- [ ] All code blocks have language specification
- [ ] Proper heading hierarchy maintained
- [ ] Active voice used throughout
- [ ] Inclusive language verified

## Output
Provide a complete tutorial following the structure above, ready to be added to the documentation.
