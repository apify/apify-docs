---
description: Standard formatting rules for all Apify documentation
globs: ["sources/**/*.md", "sources/**/*.mdx"]
alwaysApply: true
---

# Content Standards

Canonical formatting standards for all Apify documentation. These rules ensure consistency across platform docs, academy tutorials, and API references.

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

## Headings

### Casing

**Sentence case only.** Capitalize only the first word and proper nouns.

#### Common mistakes

| Avoid (Title Case) | Prefer (Sentence case) | Rule |
|-------------------|------------------------|------|
| Store And Manage Data | Store and manage data | Lowercase articles, conjunctions, prepositions |
| Getting Started With Actors | Get started with Actors | "Actors" stays capitalized (Apify product name) |
| Use The Apify SDK | Use the Apify SDK | "SDK" stays capitalized (acronym) |
| Advanced Web Scraping Techniques | Advanced web scraping techniques | Lowercase generic terms |
| Configure GitHub Actions | Configure GitHub Actions | Preserve proper noun capitalization |
| Connect To Google Sheets | Connect to Google Sheets | Lowercase prepositions ("to") |
| Set Up Your Environment | Set up your environment | Lowercase articles ("your") |
| API Reference Documentation | API reference documentation | Keep acronyms capitalized, rest lowercase |
| Working With Docker Containers | Work with Docker containers | "Docker" stays capitalized (product name) |
| Extend The Base Image | Extend the base image | Lowercase "the" mid-sentence |
| How Do I Start? | How do I start? | Capitalize "I" in questions |
| Understanding Request Queues | Understand request queues | Lowercase feature names |
| Enable Standby Mode | Enable standby mode | Lowercase mode names |
| Access The Apify Console | Access the Apify Console | "Apify Console" stays capitalized (product) |
| Run Your First Actor | Run your first Actor | "Actor" capitalized, "your" lowercase |
| Manage Node Modules | Manage node modules | Lowercase generic terms |
| Step 1: install the dependencies | Step 1: Install the dependencies | Capitalize after colon (starts new clause) |
| Option 2: use the alternative approach | Option 2: Use the alternative approach | Capitalize after colon (starts new clause) |

### Form

**No gerunds (-ing forms).** Use noun phrases or imperatives.

| Avoid | Prefer |
|-------|--------|
| Finding available tags | Available tags |
| Getting started with Actors | Get started with Actors |
| Understanding the API | API overview |

### Hierarchy

Follow proper heading hierarchy: H1 → H2 → H3. Never skip levels.

```markdown
# Page Title (H1 - only one per page, usually from front matter)

## Main Section (H2)

### Subsection (H3)

#### Detail (H4 - use sparingly)
```

## Text formatting

### Bold

**Do use bold for:**
- UI elements (buttons, menus, fields, tabs)
- Critical warnings or key terms that must stand out

**Don't use bold for:**
- List introductions or section labels
- Code block introductions
- General emphasis (use italics instead)
- Structural labels when context is clear

| Avoid | Prefer |
|-------|--------|
| **Examples:** | Examples: |
| **In your Dockerfile**, use... | In your `Dockerfile`, use... |

### Italics

Use italics for emphasis and introducing new terms:

| Use case | Example |
|----------|---------|
| New term introduction | An *Actor* is a serverless program... |
| Emphasis | This step is *required* for the Actor to work |

### Code formatting

Use backticks for inline code:

- File names: `Dockerfile`, `package.json`, `.actor/actor.json`
- Commands: `npm install`, `docker build`
- Config keys: `actorSpecification`, `dockerfile`
- Variable names: `API_TOKEN`, `userId`
- Code values: `true`, `null`, `"string"`

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

### Examples

```markdown
:::note Actor versions
Actors can have multiple versions. Pin to a specific version for production use.
:::

:::tip Performance optimization
Use the `maxRequestsPerCrawl` option to limit the number of requests for testing.
:::

:::caution Breaking changes
Version 3.0 introduces breaking changes. Review the migration guide before upgrading.
:::

:::danger Data loss risk
Deleting a dataset is permanent. All data will be lost and cannot be recovered.
:::
```

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

### Descriptive link text

Use action-oriented, descriptive link text. Avoid generic phrases like "click here" or "this link" - screen readers often read links out of context.

| Avoid | Prefer |
|-------|--------|
| `[Click here](url)` to learn more | `[Learn about Actor pricing](url)` |
| Read more about it `[here](url)` | Read the `[Actor development guide](url)` |
| See the `[documentation](url)` | `[Read the API documentation](url)` |

### Action verbs for links

Match the verb to the content type:

| Content type | Verbs |
|--------------|-------|
| Documentation | Read, View, Check, See |
| Tutorials | Learn, Build, Follow |
| Reference | Access, Browse, Explore |
| Examples | View, Try, Clone |

### Internal vs external links

**Internal links** (within apify-docs):
- Use relative paths: `[Storage](/platform/storage)`
- Never include the domain

**External links** (to other sites):
- Use full URLs: `[Playwright](https://playwright.dev)`
- Make tool mentions navigable

### Actor references

First mention: Actor name with link, capitalized.

```markdown
[Website Content Crawler](https://apify.com/apify/website-content-crawler)
can crawl websites and extract text content.
```

Subsequent mentions: Just the name, no link needed.

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

## Numbers and formatting

### Thousands and decimals

- Thousands: comma separator ($1,000)
- Decimals: period ($9.8)

### Money

- Symbol before amount: $49 (not 49$)
- Include currency: $49 USD for international context

### Dates

- Format: Month Day, Year
- Example: August 5, 2024
- Never: 5.8.2024 or 2024-08-05 in prose (ISO format OK in code)

### Time

- Format: 12-hour with space before AM/PM
- Example: 5 PM, 11:30 AM
- Uppercase: PM (not pm or p.m.)

## Parallel structure

All items in a list must follow the same grammatical pattern:

**Avoid - mixed patterns:**
```markdown
1. Reproducibility - your builds behave the same
1. Predictability - you know which version
1. Easier to track down issues
```

**Prefer - consistent pattern:**
```markdown
1. Reproducibility - Your builds behave the same way
1. Predictability - You know exactly which version you're running
1. Debugging - Version-specific issues are easier to track down
```

## List types

- **Numbered lists**: Sequential steps where order matters
- **Bullet points**: Non-sequential items, features, options

In numbered lists, use `1.` for all items (not sequential numbers):

```markdown
1. First step
1. Second step
1. Third step
```

This makes reordering easier during editing.
