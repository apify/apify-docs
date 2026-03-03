---
description: Official Apify product and technical terminology
globs: ["sources/**/*.md", "sources/**/*.mdx", "apify-api/**/*.yaml"]
alwaysApply: true
---

# Apify Terminology

Official capitalization and usage rules for Apify-specific terms. Use these exact forms throughout all documentation.

## Product names

Always capitalize these Apify product names:

- **Apify Actor** (never "Apify actor" or "actor")
- **Apify Proxy** (never "Apify proxy" or "proxy")
- **Apify Console** (never "Apify console" or "console")
- **Apify Store** (never "Apify store" or "store")
- **Apify SDK** (never "Apify sdk")
- **Apify CLI** (never "Apify cli")
- **Apify API** (never "Apify api")

## Platform terms

Use lowercase for general platform references (include "the"):

- **the Apify platform** (never "Apify Platform" or "the Platform")
- **the Apify team** (never "the Apify Team")
- **the Apify ecosystem** (never "the Apify Ecosystem")

## Feature and concept terms

Use lowercase for platform features and concepts:

- **task** (never "Task")
- **schedule** (never "Schedule")
- **run** (never "Run")
- **build** (never "Build")
- **dataset** (never "Dataset")
- **key-value store** (never "Key-Value Store")
- **request queue** (never "Request Queue")
- **web scraping** (never "Web Scraping")

## Generic technical terms

Use lowercase for generic technical terms:

- **AI agent** (never "AI Agent")
- **MCP server** (never "MCP Server")
- **API endpoint** (never "API Endpoint")
- **web scraper** (never "Web Scraper")
- **proxy server** (never "Proxy Server")

## Usage examples

### Correct usage

```markdown
The Apify Actor runs on the Apify platform and stores data in a dataset.
You can configure your task to run on a schedule using Apify Proxy.
```

### Incorrect usage

```markdown
The Apify actor runs on the Apify Platform and stores data in a Dataset.
You can configure your Task to run on a Schedule using Apify proxy.
```

## Word choice guidelines

### Legacy vs alternative vs deprecated

Use precise terms to describe feature status:

| Word | When to use |
|------|-------------|
| **legacy** | Old approach still supported for backward compatibility, no announced removal |
| **alternative** | Valid approach, but not the preferred one |
| **deprecated** | Feature officially marked for removal in a future version |

### Examples

```markdown
The legacy Docker Compose approach is still supported.
You can use the alternative REST API instead of the GraphQL API.
The `Apify.main()` function is deprecated. Use `Actor.main()` instead.
```

## Special cases

### Actor names

When referring to specific Actors in the Apify Store:

- First mention: Full name with link, capitalized
  - Example: `[Website Content Crawler](https://apify.com/apify/website-content-crawler)`
- Subsequent mentions: Just the name, no link needed
  - Example: `Website Content Crawler can extract text content.`

### Version numbers

- Use "version" not "ver" or "v" in prose
- Example: "Node.js version 22" (not "Node.js v22" or "Node.js ver 22")
- Exception: Tags and code can use abbreviations (`node:22`, `v3.0.0`)

### Acronyms and abbreviations

First use: Spell out with acronym in parentheses
```markdown
Application Programming Interface (API)
```

Subsequent uses: Just the acronym
```markdown
The API returns a JSON response.
```

Common acronyms (no need to spell out):
- API, SDK, CLI, URL, HTTP, HTTPS, JSON, YAML, HTML, CSS, JS
- AWS, GCP, Azure
- npm, pip, Docker
