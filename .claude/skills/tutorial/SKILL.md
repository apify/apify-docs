# Tutorial creator skill

## Purpose

Create comprehensive, structured tutorials for the Apify Academy or Platform documentation.

## When to use

- Creating new tutorials
- Restructuring existing tutorials
- Converting informal guides into proper tutorials
- Building step-by-step learning content

## Context files

- `AGENTS.md` - Documentation standards
- `CONTRIBUTING.md` - Style guide and contribution workflows
- `.claude/rules/` - Claude Code-specific standards (auto-loaded)

## Standards reference

This skill follows all standards defined in `.claude/rules/`:

- **writing-style.md** - Language, tone, grammar (US English, active voice, sentence case, simple present tense)
- **content-standards.md** - Front matter, text formatting, admonitions (must have titles), code examples
- **terminology.md** - Apify-specific capitalization (Apify Actor, the Apify platform)
- **quality-standards.md** - General quality checklist

**Tutorial-specific structure** and best practices are documented in this skill file below.

## Tutorial structure

### 1. Front matter

```yaml

---

title: "Action-oriented tutorial title (sentence case, simple present tense)"
description: "Explain value, not features - what will user achieve (140-160 chars)"
sidebar_position: 1
slug: /category/tutorial-name  # Must match file path

---

```

**Important**:

- Use sentence case, NOT Title Case

- Use simple present tense: "Create an Actor" NOT "Creating an Actor"

- Match slug to file path

### 2. Introduction section

**Purpose**: Hook the reader and explain what they'll learn

**Template**:

```markdown
## [Tutorial title]

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

### 3. Prerequisites section

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

### 4. Step-by-step instructions

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

​```language
// Code example with comments
const example = "code";
​```

**Expected result**: [What should happen after this step]

:::tip
[Helpful tip related to this step]
:::
```

### 5. Code examples section

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

​```javascript
// Complete JavaScript example
// Comments explaining key sections
const example = "working code";
​```

</TabItem>
<TabItem value="py" label="Python">

​```python
"""Complete Python example with comments explaining key sections"""
example = "working code"
​```

</TabItem>
</Tabs>
```

### 6. Testing/verification section

**Purpose**: Help users verify their implementation works

**Template**:

```markdown
## Testing your solution

To verify everything works correctly:

1. [Test step 1]

2. [Test step 2]

**Expected output**:

​```text
[What the user should see]
​```

:::note
If you see [common error], check [solution].
:::
```

### 7. Troubleshooting section

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

### 8. Summary/next steps

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

## Tutorial types

### Platform tutorial

**Focus**: How to use Apify platform features
**Location**: `/sources/platform/`
**Style**: Practical, feature-focused

### Academy tutorial

**Focus**: Teaching web scraping or automation concepts
**Location**: `/sources/academy/tutorials/`
**Style**: Educational, concept-focused

### Integration tutorial

**Focus**: Connecting Apify with other tools
**Location**: `/sources/platform/integrations/`
**Style**: Step-by-step integration guide

## Tutorial best practices

1. **Start Simple**: Begin with basic concepts before advanced topics

2. **Be Specific**: Use concrete examples rather than abstract explanations

3. **Show, Don't Tell**: Include visual aids and code examples

4. **Test Everything**: Ensure all code examples work

5. **Anticipate Questions**: Address common points of confusion

6. **Link Related Content**: Connect to other relevant tutorials

7. **Keep Updated**: Mark tutorials with last-updated dates

8. **User Perspective**: Write from the user's point of view

9. **Never Make Assumptions**: About product features - ask if unsure

10. **Use Simple English**: Prefer "use" over "utilize"

## Tutorial-specific quality checklist

Before publishing, verify these tutorial-specific items:

- [ ] Clear learning objectives stated in introduction
- [ ] Prerequisites clearly listed with time estimate
- [ ] All steps are numbered and start with action verbs
- [ ] Code examples are complete, tested, and runnable
- [ ] Screenshots included where helpful (light theme, red indicators)
- [ ] Expected results shown after each major step
- [ ] Common issues addressed in troubleshooting section
- [ ] Summary lists what user accomplished
- [ ] Next steps and related content linked
- [ ] Tutorial type matches content (platform/academy/integration)

For general quality standards (front matter, formatting, terminology, language), see `quality-standards.md`

## Output

Provide a complete tutorial following the structure above, ready to be added to the documentation.
