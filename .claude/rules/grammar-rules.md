---
description: Grammar mechanics and punctuation rules for Apify documentation
globs: ["sources/**/*.md", "sources/**/*.mdx"]
alwaysApply: true
---

# Grammar rules

Grammar mechanics and punctuation rules for all Apify documentation. These complement the writing style and terminology guides.

## Compound adjective hyphenation

Hyphenate compound adjectives before nouns. Don't hyphenate after nouns or with -ly adverbs.

| Avoid | Prefer | Rule |
|-------|--------|------|
| real time dashboard | real-time dashboard | Hyphenate before noun |
| battle tested solution | battle-tested solution | Hyphenate before noun |
| the dashboard updates in real-time | the dashboard updates in real time | Don't hyphenate after noun |
| a fully-automated process | a fully automated process | Don't hyphenate -ly adverbs |
| a well known library | a well-known library | Hyphenate before noun |
| the library is well-known | the library is well known | Don't hyphenate after noun |

## Contractions

Use contractions for a natural, conversational tone (don't, can't, you'll, it's, won't). Be consistent within each page.

Imperative warnings without contractions are fine for emphasis:

| Context | Example |
|---------|---------|
| General docs | "You don't need to install anything." |
| Critical warning | "Do not delete production data." |
| Instructions | "If the build doesn't start, check the logs." |

## "etc." usage

Always place a comma before "etc." Never combine "such as" with "etc." - they serve the same limiting function.

| Avoid | Prefer |
|-------|--------|
| such as Node.js, Python, etc. | such as Node.js and Python |
| formats like JSON, YAML etc. | formats like JSON, YAML, etc. |
| | Supports JSON, YAML, XML, and more. |

Prefer "and more" as an alternative to "etc." in running prose.

## "e.g." and "i.e." formatting

Place a comma before "e.g." and "i.e." but no comma after (Apify house style). Don't start sentences with "e.g." or "i.e."

| Avoid | Prefer |
|-------|--------|
| Use a runtime, e.g., Node.js | Use a runtime, e.g. Node.js |
| Use a runtime e.g. Node.js | Use a runtime, e.g. Node.js |
| E.g. you can use Playwright | For example, you can use Playwright |
| I.e. it runs on the server | That is, it runs on the server |

- **e.g.** means "for example" - introduces a partial list
- **i.e.** means "that is" - restates or clarifies

## "such as" comma rules

Use a comma before "such as" when the information is nonrestrictive (extra, removable). Omit the comma when restrictive (narrows the meaning).

| Type | Example | Test |
|------|---------|------|
| Nonrestrictive | "Apify supports many languages, such as JavaScript and Python." | Remove "such as..." and the sentence still makes sense. |
| Restrictive | "Languages such as JavaScript and Python are supported." | Removing "such as..." changes the meaning. |

**Removability test:** If the "such as" clause can be removed without changing the core meaning, add a comma.

## "a" vs "an"

Base the article on sound, not spelling:

| Example | Reason |
|---------|--------|
| a URL | Starts with "yoo-" sound |
| an API | Starts with "ay-" sound |
| a universal solution | Starts with "yoo-" sound |
| an hour | Silent "h" |
| an HTML page | Starts with "aitch-" sound |
| a JSON file | Starts with "jay-" sound |
| an SQL query | Starts with "ess-" sound |
| a UUID | Starts with "yoo-" sound |

## Numbers in prose

Spell out one through nine. Use digits for 10 and above.

Always use digits for:
- Measurements: 5 GB, 3 seconds, 2 CPUs
- Versions: version 18, version 3.0
- Percentages: 5%, 100%
- Prices: $5, $1,000
- Technical values: 0, 1, port 8080

When mixing ranges in the same sentence, use digits for both:

| Avoid | Prefer |
|-------|--------|
| between three and 15 retries | between 3 and 15 retries |
| from one to 100 results | from 1 to 100 results |

## Number abbreviations

Use M for million, B for billion, k for thousand.

| Context | Format |
|---------|--------|
| Tight spaces, tables | 5M requests, 2.5k users |
| First mentions, emphasis | 5 million requests per day |
| Prose | The platform handles over 10 billion requests |

## List punctuation

Full sentences get periods. Fragments get no punctuation. Don't mix within a list.

**Full sentences (periods):**
```markdown
- The Actor starts and initializes the browser.
- It navigates to the target URL and waits for the page to load.
- Results are saved to the default dataset.
```

**Fragments (no punctuation):**
```markdown
- Browser initialization
- Page navigation
- Data storage
```

Never use commas or semicolons at the end of list items.

## Ampersand usage

Use "and" in prose. Reserve "&" for brand names, UI labels, event titles, and tight spaces (tables, headings with space constraints).

| Avoid | Prefer |
|-------|--------|
| scraping & crawling | scraping and crawling |
| AT and T | AT&T |

## Gender-neutral language

Use "they/their" as a singular pronoun when the person's name isn't specified.

| Avoid | Prefer |
|-------|--------|
| When a user starts his Actor | When a user starts their Actor |
| he/she can configure | they can configure |
| Each developer should check his or her settings | Each developer should check their settings |

## Tool and brand name spelling

Use the exact official spelling for tools and brand names:

| Incorrect | Correct |
|-----------|---------|
| Javascript | JavaScript |
| Typescript | TypeScript |
| NodeJS, Node.JS | Node.js |
| Github | GitHub |
| Chatgpt | ChatGPT |
| N8n, N8N | n8n |
| Mongodb | MongoDB |
| Postgresql, Postgres | PostgreSQL |
| Jquery | jQuery |
| Wordpress | WordPress |
| Elasticsearch | Elasticsearch |
| VSCode, VS code | VS Code |
| DockerFile, dockerfile | Dockerfile |
