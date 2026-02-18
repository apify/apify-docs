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

Common US vs British English patterns:

| British | US (preferred) |
| ------- | -------------- |
| -ise (organise) | -ize (organize) |
| -our (colour) | -or (color) |
| -re (centre) | -er (center) |
| -ogue (catalogue) | -og (catalog) |
| programme | program |
| grey | gray |
| travelled | traveled |
| licence (noun) | license |

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

### Avoid "our"

Replace "our" with "the" or "Apify" to keep docs product-focused rather than company-focused.

| Avoid                | Prefer                    |
| -------------------- | ------------------------- |
| our team             | the Apify team            |
| our platform         | the Apify platform        |
| our API              | the Apify API             |
| our documentation    | the Apify documentation   |

Acceptable uses of "our" - direct team actions or invitations:
- "We're excited to announce..." (team action)
- "Join our webinar" (direct invitation)

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

## Formatting, links, and code

See `content-standards.md` for all formatting rules (headings, bold, code, admonitions, lists, links, images, numbers). See `grammar-rules.md` for grammar mechanics (hyphenation, contractions, e.g./i.e., list punctuation).

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
- Corrupted em dash characters (`Ã¢â‚¬"`) - always fix these encoding artifacts

## Reference

This guide covers writing patterns. For structural guidelines (file naming, screenshots, tutorial structure, SEO), see:

- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Contribution workflow and repository standards
- [AGENTS.md](../../AGENTS.md) - Comprehensive documentation guidelines for AI assistants
- Full Apify style guide: https://www.notion.so/apify/Apify-style-guide-1b9f39950a2280d49e5be69ce2961a79
