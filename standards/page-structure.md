# Page structure

Markdown, Docusaurus, and file layout rules for Apify documentation. For voice, wording, and naming, see [style-guide.md](style-guide.md).

## Front matter

Every documentation file needs YAML front matter:

```yaml
---
title: Page title
description: A clear description of the page content (140-160 characters)
sidebar_position: 1.0
slug: /path/to/page
---
```

### Required fields

- `title` - Sentence case, present tense, as in "Create your first Actor"
- `description` - 140-160 characters for SEO, clear and actionable. Use action-oriented phrasing, avoid repeating the same keyword, and don't use the word "documentation"
- `sidebar_position` - Decimal number for ordering (1.0, 1.1, 2.0)
- `slug` - URL path starting with `/`, as in `/platform/actors/running`

Vale ignores front matter, so nothing here is checked automatically. The description length in particular is on you.

### Optional fields

- `sidebar_label` - Shorter version of the title for sidebar navigation
- `toc_min_heading_level` - Minimum heading level in the table of contents (default: 2)
- `toc_max_heading_level` - Maximum heading level in the table of contents (default: 3)

### Examples

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

Follow the hierarchy H2 to H3 to H4. Never skip levels. H1 is the page title, set in front matter, so don't write one in the body.

```markdown
## Main section (H2)

### Subsection (H3)

#### Detail (H4 - use sparingly)
```

For heading casing and wording, see [style-guide.md](style-guide.md).

## Information ordering

Order sections so no concept is used before it's explained. Treat information dependencies as a directed graph: if understanding B requires A, present A first. When restructuring or reviewing a page, check that each section only relies on concepts introduced earlier on the page or linked to explicitly.

## Admonitions

Use Docusaurus admonitions for important information. All admonitions must have titles.

| Type | Use for |
| --- | --- |
| `:::note` | General callouts and additional context |
| `:::tip` | Helpful suggestions and best practices |
| `:::info` | Background information and explanations |
| `:::caution` | Warnings about potential issues or gotchas |
| `:::danger` | Critical warnings that could cause data loss or errors |

```markdown
:::note Title Here
Content of the admonition.
:::
```

## Code examples

Code examples should be:

- Complete, so they run without modification
- Realistic, solving real problems rather than toy examples
- Tested against current versions
- Commented only where the logic isn't self-evident

### Syntax highlighting

Always specify the language:

````markdown
```javascript
import { Actor } from 'apify';

await Actor.init();
// Your code here
await Actor.exit();
```
````

Common languages: `javascript`, `typescript`, `python`, `bash`, `json`, `yaml`, `html`, `css`.

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

When showing Dockerfile tags and package versions, make sure they match:

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

Internal links, within apify-docs, use relative paths and never include the domain:

```markdown
[Storage](/platform/storage)
```

External links use full URLs:

```markdown
[Playwright](https://playwright.dev)
```

For link text and verb choice, see [style-guide.md](style-guide.md).

## Images

### Alt text

All images need meaningful alt text describing the content:

```markdown
![Apify Console showing the Actor creation dialog](./images/create-actor.webp)
```

### When to use a screenshot

Keep screenshots to a minimum. If an image only shows what the prose already describes, leave it out. Screenshots go stale with every UI change, so add one when it carries information the text can't.

### Theme and indicators

- Light theme as default, and a light background for diagrams
- Consistent UI language (English)
- Highlight UI elements, meaning buttons, fields, and other clickable areas, with a `#F86606` (Apify orange) border
- No arrows and no circles

### Format

Use WebP for screenshots and diagrams, and SVG for logos, icons, and product images where available.

New raster images must be WebP. The `lint_images` CI check fails on PNG, JPG, and other raster formats. Convert and optimize an image, or a whole directory, with `pnpm opt:images <path>`, then update your Markdown to reference the resulting `.webp` file.

### Where images live

Store images in an `images/` subdirectory next to the Markdown file:

```text
platform/
├── actors/
│   ├── running.md
│   └── images/
│       └── run-button.webp
```

## Lists

Use numbered lists for sequential steps where order matters, and bullet points for non-sequential items, features, and options.

In numbered lists, use `1.` for every item rather than sequential numbers, which makes reordering easier:

```markdown
1. First step
1. Second step
1. Third step
```

For list punctuation and parallel structure, see [style-guide.md](style-guide.md).

## Files and directories

Use kebab-case for file names, as in `web-scraping-basics.md`. Pick descriptive names that reflect the content, and group related files in logical directories.

```text
sources/
├── platform/          # Platform documentation
│   ├── actors/        # Actor-related content
│   ├── storage/       # Storage documentation
│   └── integrations/  # Integration guides
└── academy/           # Educational content
    ├── tutorials/     # Step-by-step guides
    ├── webscraping/   # Web scraping courses
```
