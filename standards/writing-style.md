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

Don't use promotional terms (ultimate, cutting-edge, supercharge, seamless, etc.). Use factual, specific claims instead.

> Enforced by Vale (`Apify.SalesLanguage`). Run `vale "<file>"` to check.

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
| Access The Apify Console | Access Apify Console | "Apify Console" stays capitalized (product), no "the" |
| Run Your First Actor | Run your first Actor | "Actor" capitalized, "your" lowercase |
| Manage Node Modules | Manage node modules | Lowercase generic terms |
| Step 1: install the dependencies | Step 1: Install the dependencies | Capitalize after colon (starts new clause) |
| Option 2: use the alternative approach | Option 2: Use the alternative approach | Capitalize after colon (starts new clause) |

### Form

**No gerunds (-ing forms).** Use noun phrases or imperatives.

> Enforced by Vale (`Apify.HeadingGerund`). Run `vale "<file>"` to check.

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

### Em dashes

Don't use em dashes (—). Use hyphen with spaces ( - ) instead.

> Enforced by Vale (`Microsoft.Dashes`). Run `vale "<file>"` to check.

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

### Actor references

First mention: Actor name with link, capitalized.

```markdown
[Website Content Crawler](https://apify.com/apify/website-content-crawler)
can crawl websites and extract text content.
```

Subsequent mentions: Just the name, no link needed.

### Tool mentions

When mentioning tools, languages, or external resources, link to their official site:

| Avoid | Prefer |
|-------|--------|
| You can use Playwright for this | You can use [Playwright](https://playwright.dev) for this |

### Trim link filler

| Avoid | Prefer |
|-------|--------|
| visit the Docker Hub tags page | visit Docker Hub |
| check out the official docs | check the documentation |

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
- No ordinal suffixes: "August 5" not "August 5th"
- No abbreviated months: "January" not "Jan"

### Time

- Format: 12-hour with space before AM/PM
- Example: 5 PM, 11:30 AM
- Uppercase: PM (not pm or p.m.)
- Never use periods: "5 PM" not "5 p.m."

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

This guide covers writing patterns. For additional rules, see:

- `content-standards.md` - Markdown and Docusaurus formatting (front matter, admonitions, code blocks, images, lists)
- `grammar-rules.md` - Detailed grammar mechanics (hyphenation, contractions, e.g./i.e., list punctuation)
- `terminology.md` - Apify product names, capitalization, and word choice
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution workflow and repository standards
- Full Apify style guide: https://www.notion.so/apify/Apify-style-guide-1b9f39950a2280d49e5be69ce2961a79
