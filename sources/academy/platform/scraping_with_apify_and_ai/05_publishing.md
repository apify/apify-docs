---
title: Publishing to Apify Store
description: Use AI to prepare your scraper for other users by improving its first-run experience, Apify Store listing, documentation, and maintenance plan.
slug: /scraping-with-apify-and-ai/publishing-to-apify-store
unlisted: true
---

**In this lesson, we'll prepare our app for tracking prices on an e-commerce website for other people to use. We'll use Cursor to inspect and polish its first-run experience and documentation, prepare its Apify Store listing, and make a plan for keeping it reliable.**

---

Our scraper works, and its behavior is backed by documentation and tests. However, we've built it only for ourselves. If we wanted other people to use it, they'd run into several problems:

- _Wrong kind of README:_ It tells its developers how the code should behave, not users how to get useful data.
- _Rough first run:_ We haven't designed, documented, or tested the scraper inputs for a first-time user.
- _Empty storefront:_ The Actor has no convincing name, description, presentation, or clear pricing.
- _No maintenance strategy:_ There will be failed runs, user questions, or changes to the target website. We need to be prepared.

We can ask an AI agent to examine our Actor from a user's perspective and help us tie up these loose ends. We'll also prepare our scraper's Apify Store listing and decide how to keep it working after launch.

## Turning the README into a landing page

Right now, the README explains how to develop the project, how it works, and why we made certain design decisions.

That's useful information, but not for most scraper users. They want to know what data the Actor provides, what inputs it takes, and what its output looks like.

They might care about the implementation when they need to understand the scraper's limitations. Otherwise, they'll be perfectly happy not knowing any details, as long as it works.

Let's move the current README to a separate file, such as `CONTRIBUTING.md`, and create a new `README.md` that serves as the Actor's landing page. Ask the AI agent to draft it:

```text
Move the current README content to CONTRIBUTING.md.
Then read https://docs.apify.com/actors/publishing/actor-readme
and draft a new README focused on users.
```

After a short wait, we'll have a new README ready. Each AI agent run is different, but the result will probably include sections similar to these:

- What does this Actor do?
- How to scrape Shopify product prices
- How much does it cost?
- Input and output
- FAQ

Cursor can read the contributing docs, inspect the code, and follow the [guide to writing a good Actor README](/actors/publishing/actor-readme) we gave it. That gives it enough context to draft a useful document. It can also anticipate questions and answers like the following:

- What websites does this Actor support?
- How are prices parsed?
- How is stock availability handled?
- Can I schedule regular price checks?
- Something went wrong - what should I check?

Read the whole README and make sure everything is accurate and sounds like you. It will set users' expectations, and it's you who is responsible for every promise it makes, not the AI agent.

This new README will eventually become the page that sells your Actor, so keep prompting the AI agent to improve it. Most importantly, ask it to rename the Actor to something juicier than "My Actor"!

## Making the first run easy

:::note Course under construction
This page hasn't been written yet. Please come back later!
:::

<!--
- Ask the learner to try the Actor as a new user would: start with the prefilled input, finish quickly, return useful data, and fail with an actionable message.
- Briefly check safe defaults, clear field names and tooltips, a useful sample output, and consistent output. Do not repeat the schema reference.
- Connect this pass to the tests created in the previous lesson. Mention that Apify's Store test expects the default run to succeed and produce a non-empty dataset within five minutes.
- Link to [How to create a great input schema](/academy/actor-marketing-playbook/product-optimization/how-to-create-a-great-input-schema), [Actor output schema](/actors/development/actor-definition/output-schema), and [Automated testing](/actors/publishing/test).
-->

## Preparing the Store listing

:::note Course under construction
This page hasn't been written yet. Please come back later!
:::

<!--
- Walk through the decisions to make before opening the Publication tab: a clear name, permanent technical name/URL, concise description, recognizable logo, sample output, schemas, and pricing model.
- Explain in a sentence that the regular name and description serve Store visitors, while the optional SEO variants serve searchers. Avoid turning this into an SEO lesson.
- Point to [Name your Actor](/academy/actor-marketing-playbook/actor-basics/name-your-actor), [Actor description and SEO description](/academy/actor-marketing-playbook/actor-basics/actor-description), and [Importance of Actor URL](/academy/actor-marketing-playbook/actor-basics/importance-of-actor-url).
- Do not reproduce the publication clicks. End with [Publish your Actor](/actors/publishing/publish) and [Monetize your Actor](/actors/publishing/monetize) as the next operational steps.
-->

## Planning for maintenance

:::note Course under construction
This page hasn't been written yet. Please come back later!
:::

<!--
- Make the maintenance obligation concrete: monitor runs, keep tests useful, watch target-site changes, answer issues, and avoid silent breaking changes.
- Introduce the Actor quality score as a useful dashboard, not a number to game. Highlight reliability, ease of use, pricing transparency, trust, and consistency.
- Suggest reserving regular maintenance time and deciding how users will get support before publishing.
- Link to [Actor quality score](/actors/publishing/quality-score), [Handle Actor issues](/academy/actor-marketing-playbook/interact-with-users/issues-tab), and [Display Actor status](/actors/publishing/actor-status).
-->

## Helping the right users find it

:::note Course under construction
This page hasn't been written yet. Please come back later!
:::

<!--
- Keep promotion practical and small: describe the problem in the user's words, record one short demo that shows input through result, and share it where that audience already asks for help.
- Point out that the Store page, README headings, video, tutorials, and helpful public issue answers can all contribute to search and AI discovery.
- Encourage one or two relevant channels rather than an indiscriminate launch campaign.
- Link to the [Marketing checklist](/academy/actor-marketing-playbook/promote-your-actor/checklist), [SEO guide](/academy/actor-marketing-playbook/promote-your-actor/seo), and [Video tutorials](/academy/actor-marketing-playbook/promote-your-actor/video-tutorials) for deeper promotion guidance.
-->
