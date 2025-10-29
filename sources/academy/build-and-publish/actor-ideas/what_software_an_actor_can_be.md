---
title: Find ideas for your Actor
description: Discover what types of software you can build as Actors and use Apify's Ideas page to find trending projects for scrapers, integrations, and automation tools.
sidebar_position: 1
category: build-and-publish
slug: /build-and-publish/actor-ideas/find-actor-ideas
---

You want to build an Actor and publish it on Apify Store. Where should you start? See what types of software work as Actors and how to use the Apify Ideas page to find projects that users need.

---

## What can you build as an Actor

Actors are serverless cloud applications that run on the Apify platform. While most Actors are web scrapers, you can build various types of software as Actors can be anything that accepts input, performs a job, and runs in Docker.

### Web scrapers and crawlers

The most common type of Actor extracts data from websites. These Actors navigate web pages, collect information, and store structured data in datasets.

Examples:

- Site-specific scrapers ([Amazon Product Scraper](https://apify.com/junglee/amazon-crawler), [LinkedIn Profile Scraper](https://apify.com/curious_coder/linkedin-profile-scraper))
- Search engine scrapers ([Google Search Results](https://apify.com/apify/google-search-scraper), [Bing Search](https://apify.com/curious_coder/bing-search-scraper))
- Social media scrapers ([X/Twitter Scraper](https://apify.com/apidojo/twitter-scraper-lite), [Instagram Scraper](https://apify.com/apify/instagram-scraper))
- E-commerce data extractors ([Shopify Store Scraper](https://apify.com/autofacts/shopify), [eBay Price Monitor](https://apify.com/dtrungtin/ebay-items-scraper))

### SaaS API wrappers

Convert existing SaaS services into Actors to make them accessible through the Apify platform. This approach lets users integrate these services with Apify's automation ecosystem.

Example:

- [Parsera](https://apify.com/parsera-labs/parsera) wraps the Parsera.org service

### Open-source libraries

Package open-source tools as Actors to provide cloud-hosted versions that users can try without local installation. You handle no infrastructure while users cover compute costs.

Examples:

- [Monolith](https://apify.com/snshn/monolith) from the Y2Z/monolith GitHub project
- [Crawl4AI](https://apify.com/janbuchar/crawl4ai) from the unclecode/crawl4ai repository
- [Docling](https://apify.com/vancura/docling/source-code) from IBM's
docling-project

:::tip Open Source Fair Share

Open-source developers can earn income through [Apify's Open Source Fair Share program](https://apify.com/partners/open-source-fair-share).

:::

### MCP servers

Model Context Protocol (MCP) servers let AI agents interact with external tools and data sources. Converting MCP servers to Actors makes them accessible through Apify's platform.

Examples:

- [Playwright MCP](https://apify.com/jiri.spilka/playwright-mcp-server) from Microsoft's playwright-mcp
- [Browserbase MCP](https://apify.com/mcp-servers/browserbase-mcp-server) from Browserbase

### AI agents

Build Actors that use LLMs to perform complex tasks autonomously. These Actors can navigate websites, make decisions, and complete multi-step workflows.

## Use the Ideas page

The [Apify Ideas page](https://apify.com/ideas) is where users submit and explore potential projects for Actors. It serves as a collaborative space for proposing new tools and finding inspiration for web scraping and automation solutions.

### Browse and claim ideas

If you're unsure what to build next, the Ideas page shows projects the community wants.

Steps to develop an idea:

1. Browse the page: Visit [apify.com/ideas](https://apify.com/ideas) to find ideas that interest you. Look for ideas that align with your skills.

1. Select an idea: Review the details and requirements. Check the status—if it's marked **Open to develop**, you can start building.

1. Build your Actor: Develop your Actor based on the idea. You don't need to notify Apify during development.

1. Prepare for launch: Ensure your Actor meets quality standards and has a comprehensive README with installation instructions, usage details, and examples.

1. Publish your Actor: Deploy your Actor on Apify Store and make it live.

1. Claim your idea: After publishing, email [ideas@apify.com](mailto:ideas@apify.com) with your Actor URL and the original idea. Apify will tag the idea as _Completed_ and link it to your Actor.

1. Monitor and optimize: Track your Actor's performance and user feedback. Make improvements to keep your Actor current.

### Criteria for claiming an idea

To claim an idea, ensure:

- Your Actor is functional
- Your README contains relevant information
- Your Actor closely aligns with the original idea

### Submit your own ideas

The Ideas page is also where you contribute concepts to drive innovation in the community.

How to contribute:

1. Submit ideas: Share Actor concepts through the [Ideas submission
form](https://apify.typeform.com/to/BNON8poB#source=ideas). Provide clear details about what the tool should do and how it should work.

1. Engage with the community: Upvote ideas you find intriguing. More support
increases the likelihood a developer will build it.

1. Claim completed ideas: Once your Actor is running, claim your idea by emailing [ideas@apify.com](mailto:ideas@apify.com). Apify will mark it
_Completed_ and link it to your Actor—signaling to other developers that this tool exists.

### Multiple developers for one idea

Apify Store can host multiple Actors with similar functions. However, the "first come, first served" rule applies—the first developer to claim an idea receives the _Completed_ tag and a link from the Ideas page.

Competition helps developers improve their code. You can still build the Actor, but differentiate with a unique set of features.

## Generate ideas from other sources

Beyond the Ideas page, you can find Actor ideas through:

- SEO tools: Discover relevant search terms people use to find solutions
- Your experience: Draw from problems you've encountered in your work
- Community discussions: Browse Reddit, Stack Overflow, and forums for pain
points
- Competitor analysis: Research existing tools and identify gaps

For a complete validation framework, see [Validate your Actor idea](/academy/build-and-publish/actor-ideas/actor-validation).
