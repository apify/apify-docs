# Documentation structure templates

Templates for each documentation type. Adapt based on content needs.

## Platform documentation

For feature documentation in `sources/platform/`.

```markdown
---
title: Feature name in sentence case
description: 140-160 chars explaining user value
sidebar_position: 1.0
slug: /platform/category/feature
---

## Introduction

[Clear description of the feature. What it does, why it matters.]

## When to use [feature]

[Explain use cases and scenarios where this feature is appropriate.]

## Configure [feature]

1. [Step 1 with action verb]
1. [Step 2]

​```javascript
// Complete, runnable example
​```

## Best practices

- [Practice 1]
- [Practice 2]

## Related features

- [Related feature 1](relative-link)
- [Related feature 2](relative-link)
```

## Guides

For how-to guides explaining problem-solving approaches.

```markdown
---
title: Action-oriented title
description: 140-160 chars explaining what user will accomplish
sidebar_position: 1.0
slug: /path/to/guide
---

## Introduction

[What problem does this guide solve? What will the user accomplish?]

## Prerequisites

- [Required knowledge or setup]

## Step 1: [Action verb] [what to do]

[Explanation and code examples]

## Step 2: [Action verb] [what to do]

[Explanation and code examples]

## Test your setup

[How to verify it works]

## Summary

[What the user accomplished and suggested next steps]
```

## Reference documentation

For technical specifications, API parameters, and configuration options.

```markdown
---
title: Feature reference
description: 140-160 chars about the reference content
sidebar_position: 1.0
slug: /path/to/reference
---

## Overview

[Brief description of what this reference covers.]

## Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `param1` | `string` | - | Description of param1 |
| `param2` | `number` | `10` | Description of param2 |

## Examples

### Basic usage

​```javascript
// Minimal example
​```

### Advanced usage

​```javascript
// Full-featured example
​```

## Related information

- [Related topic](relative-link)
```
