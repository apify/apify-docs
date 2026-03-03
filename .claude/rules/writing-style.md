---
description: Comprehensive writing style rules for Apify documentation
globs: ["sources/**/*.md", "sources/**/*.mdx"]
alwaysApply: true
---

# Apify Documentation Writing Style

Instructions for AI assistants writing Apify documentation. Based on Apify style guide and technical writer feedback.

## Core Principles

1. **Simple** - Get to the point. No sentence over 30 words. Every sentence delivers information.
1. **Factual** - Back up claims with evidence. Use numbers, not vague qualifiers.
1. **Technical** - Write for developers. Don't oversimplify. Link to fill knowledge gaps.

> Write the same way you would explain something to a person sitting next to you.

## Content Types

Match language to content type:

| Content type     | CTA verbs                 | Example                                      |
| ---------------- | ------------------------- | -------------------------------------------- |
| Tutorials/guides | Learn, Build, Create      | "Learn how to build a web scraper"           |
| Reference docs   | Access, Integrate, Use    | "Access the Apify platform programmatically" |
| Discovery pages  | Explore, Discover, Browse | "Explore available Actors"                   |

Don't use "Learn" for pure reference documentation - it sets tutorial expectations.

## Language & Tone

### US English

Use "analyze" not "analyse", "color" not "colour".

### Imperative tone

Use direct instructions, not soft recommendations:

| Avoid                             | Prefer              |
| --------------------------------- | ------------------- |
| We recommend pinning the version  | Pin the version     |
| You should use the latest SDK     | Use the latest SDK  |
| It's best to avoid hardcoding     | Avoid hardcoding    |

### No sales language

| Avoid                                      | Prefer                                              |
| ------------------------------------------ | --------------------------------------------------- |
| Experience Apify, the ultimate platform!   | Welcome to Apify, the full-stack web scraping platform.  |
| Our highly efficient system                | Apify's system handles 500K requests per minute     |

### Avoid first person

Use "you" to focus on the reader. Avoid "I", "me", "myself" in docs.

| Avoid                                 | Prefer                           |
| ------------------------------------- | -------------------------------- |
| I recommend using version 22          | Use version 22                   |
| In my experience, this works better   | This approach is more reliable   |

### Active & inclusive voice

Use active voice. Avoid gendered terms. Don't use directional language ("left/right") for UI - it breaks with different layouts.

| Avoid                             | Prefer                           |
| --------------------------------- | -------------------------------- |
| The Actor is started by the user  | The user starts the Actor        |
| He can configure his settings     | You can configure your settings  |
| Click the button on the left      | Click the **Settings** button    |

## Formatting

### Headings

**Sentence case only.** No title case.

Common mistakes: Capitalizing articles (the, a, an), prepositions (to, with, from), and conjunctions (and, or, but).

| Avoid (Title Case) | Prefer (Sentence case) |
| ------------------ | ---------------------- |
| Store And Manage Data | Store and manage data |
| Use The Apify SDK | Use the Apify SDK |
| Connect To Google Sheets | Connect to Google Sheets |
| Configure GitHub Actions | Configure GitHub Actions |
| How Do I Start? | How do I start? |

**Preserve proper nouns and acronyms:** Apify products (Actors, Console, Proxy), external tools (GitHub, Docker, Playwright), and acronyms (API, SDK, CLI) stay capitalized.

**Capitalize after colons:** When a colon introduces a complete clause or instruction, capitalize the first word after it.

| Avoid | Prefer |
| ----- | ------ |
| Step 1: install the dependencies | Step 1: Install the dependencies |
| Option 2: use the alternative | Option 2: Use the alternative |

**No gerunds (-ing forms).** Use noun phrases or imperatives.

| Avoid                         | Prefer                     |
| ----------------------------- | -------------------------- |
| Finding available tags        | Available tags             |
| Getting started with Actors   | Get started with Actors    |
| Understanding the API         | API overview               |
| Setting up your environment   | Set up your environment    |
| Using Docker containers       | Use Docker containers      |
| Building your first Actor     | Build your first Actor     |
| Running the scraper           | Run the scraper            |
| Extending the base image      | Extend the base image      |

Rationale: Noun-phrase headings are more scannable and search-friendly (Microsoft style guide).

### Bold

**Do use bold for:**

- UI elements (buttons, menus, fields): Click the **Actors** button
- Critical warnings or key terms

**Don't use bold for:**

- List introductions
- Code block introductions
- Section labels when context is clear

| Avoid                           | Prefer                        |
| ------------------------------- | ----------------------------- |
| **Examples:**                   | Examples:                     |
| **In your Dockerfile**, use...  | In your `Dockerfile`, use...  |

Bold for UI elements helps users scan for clickable items. Bold for structure creates visual noise.

### Italics

Use italics for emphasis and introducing new terms:

| Use case                 | Example                                       |
| ------------------------ | --------------------------------------------- |
| New term introduction    | An *Actor* is a serverless program...         |
| Emphasis                 | This step is *required* for the Actor to work |

### List types

**Numbered lists** - Sequential steps where order matters
**Bullet points** - Non-sequential items, features, options

In numbered lists, use `1.` for all items (not sequential numbers). Easier to maintain:

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

### Admonitions

Use Docusaurus admonitions for important information:

| Type         | Use for                                     |
| ------------ | ------------------------------------------- |
| `:::note`    | General callouts                            |
| `:::tip`     | Helpful suggestions                         |
| `:::info`    | Background context                          |
| `:::caution` | Warnings about gotchas                      |
| `:::danger`  | Critical warnings that could cause issues   |

**All admonitions require titles.** Use 2-3 words that are scannable and summarize the content.

| Avoid                                   | Prefer                     |
| --------------------------------------- | -------------------------- |
| `:::note Note`                          | `:::note Actor versions`   |
| `:::caution Be careful when deleting`   | `:::caution Data loss`     |
| `:::tip` (no title)                     | `:::tip Performance`       |

Prefer admonitions over block quotes for highlighted content.

## Grammar

### Articles in definitions

Include "a/an" before nouns in definition lists:

| Avoid                              | Prefer                               |
| ---------------------------------- | ------------------------------------ |
| `{version}` - Node.js version only | `{version}` - A Node.js version only |

### Oxford comma

Always use the serial comma:

| Avoid                        | Prefer                           |
| ---------------------------- | -------------------------------- |
| pencil, eraser and notebook  | pencil, eraser, and notebook     |

### "the" before products

Use "the" before "Apify platform", "Apify SDK", etc.

| Avoid                | Prefer                    |
| -------------------- | ------------------------- |
| I use Apify platform | I use the Apify platform  |

## Terminology

See `terminology.md` for complete Apify-specific terminology and capitalization rules.

## Links

### Action-oriented text

| Avoid                             | Prefer                                  |
| --------------------------------- | --------------------------------------- |
| [actor-node-playwright tags](url) | [View actor-node-playwright tags](url)  |
| See the [documentation](url)      | [Read the documentation](url)           |

### Accessible link text

Use descriptive link text. Avoid generic phrases like "click here" or "this link" - screen readers often read links out of context.

| Avoid                              | Prefer                                    |
| ---------------------------------- | ----------------------------------------- |
| `[Click here](url)` to learn more  | `[Learn about Actor pricing](url)`        |
| Read more about it `[here](url)`   | Read the `[Actor development guide](url)` |

### Make tool mentions navigable

When mentioning tools, languages, or external resources, link them to help readers explore:

| Avoid                               | Prefer                                                      |
| ----------------------------------- | ----------------------------------------------------------- |
| You can use Playwright for this     | You can use [Playwright](https://playwright.dev) for this   |

### Trim filler words

| Avoid                          | Prefer                |
| ------------------------------ | --------------------- |
| visit the Docker Hub tags page | visit Docker Hub      |
| check out the official docs    | check the documentation |

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
- Time: 5 PM (space before, uppercase)

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

This guide covers writing patterns. For structural guidelines (file naming, screenshots, tutorial structure, SEO), see:

- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Contribution workflow and repository standards
- [AGENTS.md](../../AGENTS.md) - Comprehensive documentation guidelines for AI assistants
- Full Apify style guide: https://www.notion.so/apify/Apify-style-guide-1b9f39950a2280d49e5be69ce2961a79
