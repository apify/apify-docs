# Tutorial template

Complete 8-section template for Apify tutorials. Adapt sections based on tutorial type (platform, academy, integration).

## Section 1: Front matter

```yaml
---
title: "Action-oriented tutorial title (sentence case, simple present tense)"
description: "Explain value, not features - what will user achieve (140-160 chars)"
sidebar_position: 1
slug: /category/tutorial-name
---
```

## Section 2: Introduction

```markdown
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

## Section 3: Prerequisites

```markdown
## Prerequisites

Before starting this tutorial, make sure you have:

- [ ] [Required knowledge/skill 1]
- [ ] [Required tool/account 2]
- [ ] [Required setup 3]

**Time estimate**: [X] minutes
```

## Section 4: Step-by-step instructions

```markdown
## Step 1: [Action verb] [what to do]

[Brief explanation of what this step accomplishes]

1. [First sub-step]
1. [Second sub-step]

​```javascript
// Code example with comments
const example = "code";
​```

**Expected result**: [What should happen after this step]

:::tip Helpful context
[Helpful tip related to this step]
:::
```

## Section 5: Code examples

```markdown
## Complete example

Here's the complete code for this tutorial:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="javascript" label="JavaScript">

​```javascript
// Complete JavaScript example
import { Actor } from 'apify';

await Actor.init();
// Your code here
await Actor.exit();
​```

</TabItem>
<TabItem value="python" label="Python">

​```python
"""Complete Python example"""
from apify import Actor

async def main() -> None:
    async with Actor:
        # Your code here
        pass
​```

</TabItem>
</Tabs>
```

## Section 6: Testing and verification

```markdown
## Test your solution

To verify everything works correctly:

1. [Test step 1]
1. [Test step 2]

**Expected output**:

​```text
[What the user should see]
​```

:::note Verification
If you see [common error], check [solution].
:::
```

## Section 7: Troubleshooting

```markdown
## Troubleshooting

### [Common problem 1]

**Symptom**: [What the user sees]

**Solution**: [How to fix it]

### [Common problem 2]

**Symptom**: [What the user sees]

**Solution**: [How to fix it]
```

## Section 8: Summary and next steps

```markdown
## Summary

In this tutorial, you learned how to:

- [Accomplishment 1]
- [Accomplishment 2]
- [Accomplishment 3]

## Next steps

Now that you've completed this tutorial, you can:

- [Related tutorial/topic 1] - [Link]
- [Related tutorial/topic 2] - [Link]
- [Advanced topic] - [Link]
```

## Best practices

1. Start simple - basic concepts before advanced topics
1. Be specific - use concrete examples, not abstract explanations
1. Show, don't tell - include visual aids and code examples
1. Test everything - ensure all code examples work
1. Anticipate questions - address common points of confusion
1. Link related content - connect to other tutorials and docs
1. Write from the user's perspective
1. Never make assumptions about product features - ask if unsure
