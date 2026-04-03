# Content Standards

Markdown and Docusaurus formatting standards for Apify documentation. For general writing style rules (headings, text formatting, links, numbers), see `writing-style.md`.

## Front matter requirements

All documentation files must include YAML front matter with these fields:

```yaml
---
title: Page title
description: A clear description of the page content (140-160 characters)
sidebar_position: 1.0
slug: /path/to/page
---
```

### Required fields

- **title**: Sentence case, present tense (e.g., "Create your first Actor")
- **description**: 140-160 characters for SEO, clear and actionable
- **sidebar_position**: Decimal number for ordering (1.0, 1.1, 2.0, etc.)
- **slug**: URL path starting with `/` (e.g., `/platform/actors/running`)

### Optional fields

- **sidebar_label**: Shorter version of title for sidebar navigation
- **toc_min_heading_level**: Minimum heading level in table of contents (default: 2)
- **toc_max_heading_level**: Maximum heading level in table of contents (default: 3)

### Front matter examples

Documentation page:
```yaml
---
title: Store and manage data
description: Learn how to store and manage data in Apify datasets, key-value stores, and request queues.
sidebar_position: 3.0
slug: /platform/storage
---
```

Tutorial:
```yaml
---
title: Build a web scraper
description: Step-by-step guide to building your first web scraper with Apify and Playwright.
sidebar_position: 1.0
slug: /academy/tutorials/web-scraper
---
```

## Heading hierarchy

Follow proper heading hierarchy: H2 → H3 → H4. Never skip levels. (H1 is the page title, set in front matter)

```markdown
## Main section (H2)

### Subsection (H3)

#### Detail (H4 - use sparingly)
```

## Information ordering

Order sections so no concept is used before it's explained. Treat information dependencies as a directed graph - if understanding B requires A, present A first. When restructuring or reviewing a page, check that each section only relies on concepts introduced earlier on the page or linked to explicitly.

## Admonitions

Use Docusaurus admonitions for important information. **All admonitions MUST have titles.**

### Admonition types

| Type | Use for |
|------|---------|
| `:::note` | General callouts and additional context |
| `:::tip` | Helpful suggestions and best practices |
| `:::info` | Background information and explanations |
| `:::caution` | Warnings about potential issues or gotchas |
| `:::danger` | Critical warnings that could cause data loss or errors |

### Format

```markdown
:::note Title Here
Content of the admonition.
:::
```

> Missing titles enforced by Vale (`Apify.AdmonitionTitle`). Run `vale "<file>"` to check.

## Code examples

### Completeness

Code examples should be:
- **Complete**: Runnable without modifications
- **Realistic**: Solve real problems, not toy examples
- **Tested**: Verified to work with current versions
- **Commented**: Only when logic isn't self-evident

### Syntax highlighting

Always specify the language for syntax highlighting:

````markdown
```javascript
import { Actor } from 'apify';

await Actor.init();
// Your code here
await Actor.exit();
```
````

### Common languages

- `javascript` - JavaScript code
- `typescript` - TypeScript code
- `python` - Python code
- `bash` - Shell commands
- `json` - JSON data
- `yaml` - YAML configuration
- `html` - HTML markup
- `css` - CSS styles

### Code tabs

Use tabs for multiple language examples:

````markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="javascript" label="JavaScript">

```javascript
const result = await client.actor('apify/web-scraper').call();
```

</TabItem>
<TabItem value="python" label="Python">

```python
result = client.actor('apify/web-scraper').call()
```

</TabItem>
</Tabs>
````

### Version matching

When showing Dockerfile tags and package versions, ensure they match:

```dockerfile
FROM apify/actor-node-playwright:22
```

```json
{
  "dependencies": {
    "playwright": "^1.40.0"
  }
}
```

## Links

### Internal vs external links

**Internal links** (within apify-docs):
- Use relative paths: `[Storage](/platform/storage)`
- Never include the domain

**External links** (to other sites):
- Use full URLs: `[Playwright](https://playwright.dev)`
- Make tool mentions navigable

## Images

### Alt text

All images must include meaningful alt text describing the content:

```markdown
![Apify Console showing the Actor creation dialog](./images/create-actor.png)
```

### Theme

Screenshots should use:
- **Light theme** as default
- **Light background** for diagrams
- Consistent UI language (English)

### Visual indicators

Use red boxes or arrows to highlight important UI elements:
- **Red border**: Highlight clickable elements (buttons, fields)
- **Red arrow**: Point to specific areas
- **Red circle**: Highlight small elements

### Image format

- **PNG** for screenshots and diagrams
- **JPG** for photos
- **SVG** for logos and icons (when available)

### File organization

Store images in an `images/` subdirectory next to the markdown file:

```text
platform/
├── actors/
│   ├── running.md
│   └── images/
│       └── run-button.png
```

## Lists

### List types

- **Numbered lists**: Sequential steps where order matters
- **Bullet points**: Non-sequential items, features, options

### Numbered list convention

In numbered lists, use `1.` for all items (not sequential numbers):

```markdown
1. First step
1. Second step
1. Third step
```

This makes reordering easier during editing.
