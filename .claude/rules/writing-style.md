# Apify Documentation Writing Style

Instructions for AI assistants writing Apify documentation. Based on Apify style guide and technical writer feedback.

## Core Principles

1. **Simple** - Get to the point. No sentence over 30 words. Every sentence delivers information.
1. **Factual** - Back up claims with evidence. Use numbers, not vague qualifiers.
1. **Technical** - Write for developers. Don't oversimplify. Link to fill knowledge gaps.

> Write the same way you would explain something to a person sitting next to you.

## Language & Tone

### US English

Use "analyze" not "analyse", "color" not "colour".

### Imperative tone

Use direct instructions, not soft recommendations:

| Avoid | Prefer |
|-------|--------|
| We recommend pinning the version | Pin the version |
| You should use the latest SDK | Use the latest SDK |
| It's best to avoid hardcoding | Avoid hardcoding |

### No sales language

| Avoid | Prefer |
|-------|--------|
| Experience Apify, the ultimate platform! | Welcome to Apify, the cloud web scraping platform. |
| Our highly efficient system | Apify's system handles 500K requests per minute |

### Avoid first person

Use "you" to focus on the reader. Avoid "I", "me", "myself" in docs.

| Avoid | Prefer |
|-------|--------|
| I recommend using version 22 | Use version 22 |
| In my experience, this works better | This approach is more reliable |

## Formatting

### Headings

**Sentence case only.** No title case.

| Avoid | Prefer |
|-------|--------|
| Store And Manage Data | Store and manage data |

**No gerunds (-ing forms).** Use noun phrases or imperatives.

| Avoid | Prefer |
|-------|--------|
| Finding available tags | Available tags |
| Getting started with Actors | Get started with Actors |
| Understanding the API | API overview |

Rationale: Noun-phrase headings are more scannable and search-friendly (Microsoft style guide).

### Bold

Use bold sparingly. Don't bold:
- List introductions
- Code block introductions
- Section labels when context is clear

| Avoid | Prefer |
|-------|--------|
| **Examples:** | Examples: |
| **In your Dockerfile**, use... | In your `Dockerfile`, use... |

Bold is for critical warnings or key terms, not routine structure.

### Ordered lists

Use `1.` for all items (not sequential numbers). Easier to maintain:

```markdown
1. First step
1. Second step
1. Third step
```

### Parallel structure

All items in a list must follow the same grammatical pattern:

```markdown
# Avoid - mixed patterns
1. Reproducibility - your builds behave the same
1. Predictability - you know which version
1. Easier to track down issues

# Prefer - consistent pattern
1. Reproducibility - Your builds behave the same way
1. Predictability - You know exactly which version you're running
1. Debugging - Version-specific issues are easier to track down
```

### Em dashes

**Don't use em dashes (—).** LLMs overuse them. Use hyphen with spaces ( - ) instead.

## Grammar

### Articles in definitions

Include "a/an" before nouns in definition lists:

| Avoid | Prefer |
|-------|--------|
| `{version}` - Node.js version only | `{version}` - A Node.js version only |

### Oxford comma

Always use the serial comma:

| Avoid | Prefer |
|-------|--------|
| pencil, eraser and notebook | pencil, eraser, and notebook |

### "the" before products

Use "the" before "Apify platform", "Apify SDK", etc.

| Avoid | Prefer |
|-------|--------|
| I use Apify platform | I use the Apify platform |

## Terminology

### Capitalization

- **Actor** - Always uppercase when referring to Apify Actors
- **Apify Proxy**, **Apify Console**, **Apify Store** - Product names, capitalized
- **the Apify platform** - Lowercase "platform", include "the"
- **task**, **schedule** - Lowercase

### Word choice

| Word | When to use |
|------|-------------|
| legacy | Feature is deprecated or will be removed |
| alternative | Valid approach, but not the preferred one |
| deprecated | Feature will be removed in a future version |

## Links

### Action-oriented text

| Avoid | Prefer |
|-------|--------|
| [actor-node-playwright tags](url) | [View actor-node-playwright tags](url) |
| See the [documentation](url) | [Read the documentation](url) |

### Trim filler words

| Avoid | Prefer |
|-------|--------|
| visit the Docker Hub tags page | visit Docker Hub |
| check out the official docs | see the documentation |

### Actor references

First mention: Actor name with link, capitalized.

```markdown
[Website Content Crawler](https://apify.com/apify/website-content-crawler)
can crawl websites and extract text content.
```

## Code Examples

- Use backticks for file names, commands, config keys
- Prefer complete, runnable examples
- Add comments only when code isn't self-explanatory
- Match versions in examples (e.g., Dockerfile tag matches package.json version)

## Numbers & Formatting

- Thousands: comma separator ($1,000)
- Decimals: period ($9.8)
- Money: symbol before amount ($49, not 49$)
- Dates: August 5, 2024 (never 5.8.2024)
- Time: 5 pm or 5 PM (space after number)

## Common Mistakes

Patterns to avoid:
- "Happy scraping!" closings
- Em dashes
- Title case headings
- Gerunds in headings
- Bold for routine structure
- "Ok" (use "OK" or "okay")
- Missing "the" before "Apify platform"
- Sales language ("ultimate", "cutting-edge", "supercharge")
- Vague claims without numbers

## Reference

Full Apify style guide: https://www.notion.so/apify/de9fbb99dcd84665b6d3f790fc88b3b6
