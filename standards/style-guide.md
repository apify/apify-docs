# Style guide

Voice, wording, and naming rules for Apify documentation. For front matter, admonitions, code blocks, images, and file layout, see [page-structure.md](page-structure.md).

Most of these rules run in CI through Vale. Run `vale "<file>"` on what you changed rather than working from memory.

## Core principles

1. Simple. Get to the point. No sentence over 30 words. Every sentence delivers information.
1. Factual. Back up claims with evidence. Use numbers, not vague qualifiers.
1. Technical. Write for developers. Don't oversimplify. Link to fill knowledge gaps.

> Write the same way you would explain something to a person sitting next to you.

## Content types

Match language to content type:

| Content type     | CTA verbs                 | Example                                      |
| --- | --- | --- |
| Tutorials/guides | Learn, Build, Create      | "Learn how to build a web scraper"           |
| Reference docs   | Access, Integrate, Use    | "Access the Apify platform programmatically" |
| Discovery pages  | Explore, Discover, Browse | "Explore available Actors"                   |

Don't use "Learn" for pure reference documentation - it sets tutorial expectations.

## Language and tone

### US English

Use "analyze" not "analyse", "color" not "colour".

| British | US (preferred) |
| --- | --- |
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
| --- | --- |
| We recommend pinning the version  | Pin the version     |
| You should use the latest SDK     | Use the latest SDK  |
| It's best to avoid hardcoding     | Avoid hardcoding    |

### No sales language

Don't use promotional terms (ultimate, cutting-edge, supercharge, seamless). Use factual, specific claims instead. Skip cheerful sign-offs like "Happy scraping!"

### Avoid first person

Use "you" to focus on the reader. Avoid "I", "me", "myself" in docs.

| Avoid                                 | Prefer                           |
| --- | --- |
| I recommend using version 22          | Use version 22                   |
| In my experience, this works better   | This approach is more reliable   |

### Active and inclusive voice

Use active voice. Avoid gendered terms. Don't use directional language ("left/right") for UI - it breaks with different layouts.

| Avoid                             | Prefer                           |
| --- | --- |
| The Actor is started by the user  | The user starts the Actor        |
| He can configure his settings     | You can configure your settings  |
| Click the button on the left      | Click the **Settings** button    |
| See the storage guide             | Check out the storage guide      |

Use "they/their" as a singular pronoun when the person isn't specified:

| Avoid | Prefer |
| --- | --- |
| When a user starts his Actor | When a user starts their Actor |
| he/she can configure | they can configure |
| Each developer should check his or her settings | Each developer should check their settings |

### Avoid "our"

Replace "our" with "the" or "Apify" to keep docs product-focused rather than company-focused.

| Avoid                | Prefer                    |
| --- | --- |
| our team             | the Apify team            |
| our platform         | the Apify platform        |
| our API              | the Apify API             |
| our documentation    | the Apify documentation   |

Acceptable uses of "our" - direct team actions or invitations:

- "We're excited to announce..." (team action)
- "Join our webinar" (direct invitation)

## Headings

For heading levels and hierarchy, see [page-structure.md](page-structure.md).

### Casing

**Sentence case only.** Capitalize only the first word and proper nouns.

| Avoid (Title Case) | Prefer (Sentence case) | Rule |
| --- | --- | --- |
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
| Understanding Request Queues | Understand request queues | Lowercase feature names |
| Enable Standby Mode | Enable standby mode | Lowercase mode names |
| Access The Apify Console | Access Apify Console | "Apify Console" stays capitalized (product), no "the" |
| Run Your First Actor | Run your first Actor | "Actor" capitalized, "your" lowercase |
| Manage Node Modules | Manage node modules | Lowercase generic terms |
| Step 1: install the dependencies | Step 1: Install the dependencies | Capitalize after colon (starts new clause) |
| Option 2: use the alternative approach | Option 2: Use the alternative approach | Capitalize after colon (starts new clause) |

### Form

**No gerunds (-ing forms).** Use noun phrases or imperatives.

**No question-like headings.** Answer the question instead of asking it.

| Avoid                        | Prefer                  |
| --- | --- |
| How to run an Actor?         | Run an Actor            |
| What is a request queue?     | Request queues          |

## Text formatting

### Bold

Use bold for:

- UI elements (buttons, menus, fields, tabs)
- Critical warnings or key terms that must stand out

Don't use bold for:

- List introductions or section labels
- Code block introductions
- General emphasis (use italics instead)
- Structural labels when context is clear

| Avoid | Prefer |
| --- | --- |
| **Examples:** | Examples: |
| **In your Dockerfile**, use... | In your `Dockerfile`, use... |

### Italics

Use italics for emphasis and introducing new terms:

| Use case | Example |
| --- | --- |
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

Don't use em dashes (—). Use hyphen with spaces ( - ) instead. Fix corrupted em dash artifacts (`Ã¢â‚¬"`) wherever you find them.

## Links

For link syntax and internal path rules, see [page-structure.md](page-structure.md).

### Descriptive link text

Use action-oriented, descriptive link text. Avoid generic phrases like "click here" or "this link" - screen readers often read links out of context.

| Avoid | Prefer |
| --- | --- |
| `[Click here](url)` to learn more | `[Learn about Actor pricing](url)` |
| Read more about it `[here](url)` | Read the `[Actor development guide](url)` |
| See the `[documentation](url)` | `[Read the API documentation](url)` |

### Action verbs for links

Match the verb to the content type:

| Content type | Verbs |
| --- | --- |
| Documentation | Read, View, Check, See |
| Tutorials | Learn, Build, Follow |
| Reference | Access, Browse, Explore |
| Examples | View, Try, Clone |

### Tool mentions

When mentioning tools, languages, or external resources, link to their official site:

| Avoid | Prefer |
| --- | --- |
| You can use Playwright for this | You can use [Playwright](https://playwright.dev) for this |

### Trim link filler

| Avoid | Prefer |
| --- | --- |
| visit the Docker Hub tags page | visit Docker Hub |
| check out the official docs | check the documentation |

## Numbers

Spell out one through nine. Use digits for 10 and above.

Always use digits for:

- Measurements: 5 GB, 3 seconds, 2 CPUs
- Versions: version 18, version 3.0
- Percentages: 5%, 100%
- Prices: $5, $1,000
- Technical values: 0, 1, port 8080

When mixing ranges in the same sentence, use digits for both:

| Avoid | Prefer |
| --- | --- |
| between three and 15 retries | between 3 and 15 retries |
| from one to 100 results | from 1 to 100 results |

### Abbreviations

Use M for million, B for billion, k for thousand.

| Context | Format |
| --- | --- |
| Tight spaces, tables | 5M requests, 2.5k users |
| First mentions, emphasis | 5 million requests per day |
| Prose | The platform handles over 10 billion requests |

### Separators and money

- Thousands: comma separator ($1,000)
- Decimals: period ($9.8)
- Symbol before amount: $49 (not 49$)
- Include currency for international context: $49 USD

### Dates and times

- Dates: Month Day, Year. "August 5, 2024"
- Never `5.8.2024` or `2024-08-05` in prose. ISO format is fine in code
- No ordinal suffixes. "August 5" not "August 5th"
- No abbreviated months. "January" not "Jan"
- Times: 12-hour, with a space before PM or AM. "5 PM", "11:30 AM"
- Uppercase, no periods. `5 PM` not `5 p.m.`

## Grammar

### Compound adjective hyphenation

Hyphenate compound adjectives before nouns. Don't hyphenate after nouns or with -ly adverbs.

| Avoid | Prefer | Rule |
| --- | --- | --- |
| real time dashboard | real-time dashboard | Hyphenate before noun |
| battle tested solution | battle-tested solution | Hyphenate before noun |
| the dashboard updates in real-time | the dashboard updates in real time | Don't hyphenate after noun |
| a fully-automated process | a fully automated process | Don't hyphenate -ly adverbs |
| a well known library | a well-known library | Hyphenate before noun |
| the library is well-known | the library is well known | Don't hyphenate after noun |

### Contractions

Use contractions for a natural, conversational tone (don't, can't, you'll, it's, won't). Be consistent within each page.

Imperative warnings without contractions are fine for emphasis:

| Context | Example |
| --- | --- |
| General docs | "You don't need to install anything." |
| Critical warning | "Do not delete production data." |
| Instructions | "If the build doesn't start, check the logs." |

### "etc." usage

Always place a comma before "etc." Never combine "such as" with "etc." - they serve the same limiting function.

| Avoid | Prefer |
| --- | --- |
| such as Node.js, Python, etc. | such as Node.js and Python |
| formats like JSON, YAML etc. | formats like JSON, YAML, etc. |

Prefer "and more" as an alternative to "etc." in running prose.

### "e.g." and "i.e." formatting

Place a comma before "e.g." and "i.e." but no comma after (Apify house style). Don't start sentences with "e.g." or "i.e."

| Avoid | Prefer |
| --- | --- |
| Use a runtime, e.g., Node.js | Use a runtime, e.g. Node.js |
| Use a runtime e.g. Node.js | Use a runtime, e.g. Node.js |
| E.g. you can use Playwright | For example, you can use Playwright |
| I.e. it runs on the server | That is, it runs on the server |

- "e.g." means "for example" and introduces a partial list
- "i.e." means "that is" and restates or clarifies

### "such as" comma rules

Use a comma before "such as" when the information is nonrestrictive (extra, removable). Omit the comma when restrictive (narrows the meaning).

| Type | Example | Test |
| --- | --- | --- |
| Nonrestrictive | "Apify supports many languages, such as JavaScript and Python." | Remove "such as..." and the sentence still makes sense. |
| Restrictive | "Languages such as JavaScript and Python are supported." | Removing "such as..." changes the meaning. |

If the "such as" clause can be removed without changing the core meaning, add a comma.

### "a" vs "an"

Base the article on sound, not spelling:

| Example | Reason |
| --- | --- |
| a URL | Starts with "yoo-" sound |
| an API | Starts with "ay-" sound |
| a universal solution | Starts with "yoo-" sound |
| an hour | Silent "h" |
| an HTML page | Starts with "aitch-" sound |
| a JSON file | Starts with "jay-" sound |
| an SQL query | Starts with "ess-" sound |
| a UUID | Starts with "yoo-" sound |

### Articles in definitions

Include "a/an" before nouns in definition lists:

| Avoid                              | Prefer                               |
| --- | --- |
| `{version}` - Node.js version only | `{version}` - A Node.js version only |

### Oxford comma

Always use the serial comma:

| Avoid                        | Prefer                           |
| --- | --- |
| pencil, eraser and notebook  | pencil, eraser, and notebook     |

### List punctuation and parallel structure

Full sentences get periods. Fragments get no punctuation. Don't mix within a list. Never use commas or semicolons at the end of list items.

Full sentences:

```markdown
- The Actor starts and initializes the browser.
- It navigates to the target URL and waits for the page to load.
- Results are saved to the default dataset.
```

Fragments:

```markdown
- Browser initialization
- Page navigation
- Data storage
```

All items in a list must follow the same grammatical pattern:

```markdown
1. Reproducibility - Your builds behave the same way
1. Predictability - You know exactly which version you're running
1. Debugging - Version-specific issues are easier to track down
```

### Ampersand usage

Use "and" in prose. Reserve "&" for brand names, UI labels, event titles, and tight spaces.

| Avoid | Prefer |
| --- | --- |
| scraping & crawling | scraping and crawling |
| AT and T | AT&T |

### Spelling

Use "OK" or "okay", never "Ok".

## Terminology

### Product names

Always capitalize these Apify product names:

- Apify Actor (never `Apify actor` or `actor`)
- Apify Proxy (never `Apify proxy` or `proxy`)
- Apify Console (never `Apify console` or `console`)
- Apify Store (never `Apify store` or `store`)
- Apify SDK (never `Apify sdk`)
- Apify CLI (never `Apify cli`)
- Apify API (never `Apify api`)

### Article usage with Apify products

Some products take "the", others don't:

| Product | Article | Correct | Incorrect |
| --- | --- | --- | --- |
| Apify Console | No "the" | Log into Apify Console | Log into the Apify Console |
| Apify Store | No "the" | Find Actors in Apify Store | Find Actors in the Apify Store |
| Apify SDK | Requires "the" | Build with the Apify SDK | Build with Apify SDK |
| Apify CLI | Requires "the" | Install the Apify CLI | Install Apify CLI |
| Apify API | Requires "the" | Call the Apify API | Call Apify API |
| Apify Proxy | No "the" | Connect through Apify Proxy | Connect through the Apify Proxy |
| the Apify platform | Always "the" | Deploy on the Apify platform | Deploy on Apify platform |

### Platform terms

Use lowercase for general platform references, and include "the":

- the Apify platform (never "Apify Platform" or "the Platform")
- the Apify team (never "the Apify Team")
- the Apify ecosystem (never "the Apify Ecosystem")

### Feature and concept terms

Use lowercase for platform features and concepts: task, schedule, run, build, dataset, key-value store, request queue, web scraping.

### Generic technical terms

Use lowercase for generic technical terms: AI agent, MCP server, API endpoint, web scraper, proxy server.

### MCP connectors

`MCP connectors` is an Apify feature name. Use lowercase `connectors` for the feature, and lowercase `connector` on its own for a specific connector created through the feature.

- MCP connectors - the feature
- connector - a specific authorized connector, as in "create a connector"

`MCP server` stays lowercase as a generic term. `MCP Proxy` is capitalized when it refers to the Apify MCP Proxy component.

### Correct and incorrect usage

```markdown
The Apify Actor runs on the Apify platform and stores data in a dataset.
You can configure your task to run on a schedule using Apify Proxy.
```

```markdown
The Apify actor runs on the Apify Platform and stores data in a Dataset.
You can configure your Task to run on a Schedule using Apify proxy.
```

### Legacy vs alternative vs deprecated

Use precise terms to describe feature status:

| Word | When to use |
| --- | --- |
| legacy | Old approach still supported for backward compatibility, no announced removal |
| alternative | Valid approach, but not the preferred one |
| deprecated | Feature officially marked for removal in a future version |

```markdown
The legacy Docker Compose approach is still supported.
You can use the alternative REST API instead of the GraphQL API.
The `Apify.main()` function is deprecated. Use `Actor.main()` instead.
```

### Actor names

When referring to specific Actors in Apify Store:

- First mention: full name with link, capitalized. `[Website Content Crawler](https://apify.com/apify/website-content-crawler)`
- Subsequent mentions: just the name, no link needed
- No "the" before Actor names. Treat them like proper nouns
  - Correct: "Website Content Crawler can perform deep crawls."
  - Incorrect: "The Website Content Crawler can perform deep crawls."
  - Exception: "the" is fine when the Actor name modifies a following noun, as in "Use the Website Content Crawler Actor."

### Crawler and scraper capitalization

Keep "crawler" and "scraper" lowercase as generic terms. Capitalize only when part of a proper Actor name.

| Context | Example |
| --- | --- |
| Generic term | "Use a web crawler to extract data." |
| Actor name | "Website Content Crawler can extract text content." |
| Generic term | "Build a custom scraper with Crawlee." |
| Actor name | "Google Search Scraper returns structured results." |

### Version numbers

- Use "version" not "ver" or "v" in prose. "Node.js version 22", not "Node.js v22"
- Exception: tags and code can use abbreviations (`node:22`, `v3.0.0`)

### Tool and brand name spelling

Use the exact official spelling: JavaScript, TypeScript, Node.js, GitHub, ChatGPT, MongoDB, PostgreSQL, VS Code, WordPress, n8n, LangChain, jQuery, Dockerfile.

### Acronyms and abbreviations

First use spells it out with the acronym in parentheses, as in "Application Programming Interface (API)". Later uses take the acronym alone.

No need to spell out: API, SDK, CLI, URL, HTTP, HTTPS, JSON, YAML, HTML, CSS, JS, AWS, GCP, Azure, npm, pip, Docker.

## Reference

Full Apify style guide: <https://www.notion.so/apify/Apify-style-guide-1b9f39950a2280d49e5be69ce2961a79>
