---
title: Developing a scraper with docs driven prompting
description: Improve your Apify scraper by first documenting its behavior and letting AI agent to follow it as a spec.
slug: /scraping-with-apify-and-ai/docs-driven-prompting
unlisted: true
---

**In this lesson, we'll keep improving our app for tracking prices on an e-commerce website. We'll write documentation, which is not only useful to people, but also works as a context for Cursor.**

---

We made our life easier with an AI agent. When improving our scraper, there's now a lot less back and forth than with AI chat. Both approaches share one downside though.

Prompting a chat or agent is quick and straightforward, but it doesn't leave us with any trace of our intentions:

- If want to let someone else to take over the development in the future, it's gonna be a tough call for them to figure out why certain decisions were made and if certain behavior is intentional or accidental.
- If we attend to something else for a while and come to this project after several months, we'll happen to be almost like the someone else from the first bullet point. After a week we very clearly remember why we process prices certain way, but one year later it's gonna be just a spotty distant memory.
- If we ever want to let anyone else to use our scraper as a user, they'll need instructions on how to run it and what to expect.

Traditionally, we'd create such documentation after having made our software. With AI, we can describe how our program works before we have it done, and then point the AI agent to it as a specification and tell it to make it happen.

## Creating README

:::note Course under construction
This page hasn't been written yet. Come later, please!
:::

## Dealing with price intervals

:::note Course under construction
This page hasn't been written yet. Come later, please!
:::

<!--
In the next lesson, we'll take a look at how we can develop our scraper by documenting how it should behave instead of prompting the AI agent feature by feature, without a track record of our intentions.

Improving the README, e.g. input output. Pointing the agent to the README and turning the design to reality.
-->

<!--
#### Creating README.md
Create simple README.md where we document how the scraper behaves, what it produces as an output, etc. Primer to Markdown.
#### Dealing with price intervals
Explain focus on product and domain knowledge. In the README explain how the scraper should handle prices like "From $1,398.00", introduce minPrice, keep prices as numbers, etc.

Let the agent implement handling of variants based on the README. Run updated code, see results.

Teaser: Imagine the target website changes something (happens often!). In such case the README won't help. Let's deal with that.
-->
