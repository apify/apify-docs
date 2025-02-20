---
title: Actor bundles
description: Learn what an Actor bundle is, explore existing examples, and discover how to promote them.
sidebar_position: 2
category: apify platform
slug: /get-most-of-actors/product-optimization/actor-bundles
---

**Learn what an Actor bundle is, explore existing examples, and discover how to promote them.**

---

## What is an Actor bundle?

If an Actor is an example of web automation software, what is an Actor bundle? An Actor bundle is basically a chain of multiple Actors unified by a common use case. Bundles can include both scrapers and automation tools, and they are usually designed to achieve an overarching goal related to scraping or automation.

The concept of an Actor bundle originated from frequent customer requests for comprehensive tools. For example, someone would ask for a Twitter scraper that also performs additional tasks, or for a way to find all profiles of the same public figure across multiple social media platforms without needing to use each platform separately.

For example, consider a bundle that scrapes company reviews from multiple platforms, such as Glassdoor, LinkedIn, and Indeed. Typically, you would need to use several different scrapers and then consolidate the results. But this bundle would do it all in one run, once provided with the name of the company. Or consider a bundle that scrapes all posts and comments of a given profile, and then produces a sentiment score for each scraped comment.

The main advantage of an Actor bundle is its ease of use. The user inputs a keyword or a URL, and the Actor triggers all the necessary Actors sequentially to achieve the desired result. The user is not expected to use each Actor separately and then process and filter the results themselves.

### Examples of bundles

🔍 [Social Media Finder](https://apify.com/tri_angle/social-media-finder) searches for profiles on 13 social media sites provided just the (nick)name.

🍝 [Restaurant Review Aggregator](https://apify.com/tri_angle/restaurant-review-aggregator) gets restaurant reviews from Google Maps, DoorDash, Uber Eats, Yelp, Tripadvisor, and Facebook in one place.

🤔 [Social Media Sentiment Analysis Tool](https://apify.com/tri_angle/social-media-sentiment-analysis-tool) not only collects comments from Facebook, Instagram, and TikTok but also performs sentiment analysis on them. It unites post scrapers, comments scrapers and a text analysis tool.

🦾 [Website Content Crawler + Pinecone bundle](https://apify.com/tri_angle/wcc-pinecone-integration) scrapes a website and stores the data in a Pinecone database to build and improve your own AI chatbot assistant.

🤖 [Pinecone GPT Chatbot](https://apify.com/tri_angle/pinecone-gpt-chatbot) combines OpenAI's GPT models with Pinecone's vector database, which simplifies creating a GPT Chatbot.

As you can see, they vary in complexity and range.

---

## Caveats

### Pricing model

Since bundles are still relatively experimental, profitability is not guaranteed and will depend heavily on the complexity of the bundle.

However, if you have a solid idea for a bundle, don’t hesitate to reach out. Prepare your case, write to our support team, and we’ll help determine if it’s worth it.

### Specifics of bundle promotion

First of all, when playing with the idea of creating a bundle, always check the keyword potential. Sometimes, there are true keyword gems just waiting to be discovered, with high search volume and little competition.

However, bundles may face the challenge of being "top-of-the-funnel" solutions. People might not search for them directly because they don't have a specific keyword in mind. For instance, someone is more likely to search for an Instagram comment scraper than imagine a bundle that scrapes comments from 10 different platforms, including Instagram.

Additionally, Google tends to favor tools with rather focused descriptions. If your tool offers multiple functions, it can send mixed signals that may conflict with each other rather than accumulate.

Sometimes, even though a bundle can be a very innovative tool product-wise, it can be hard to market from an SEO perspective and match the search intent.

In such cases, you may need to try different marketing and promotion strategies. Once you’ve exhausted every angle of SEO research, be prepared to explore non-organic marketing channels like Product Hunt, email campaigns, community engagement, Reddit, other social media, your existing customer base, word-of-mouth promotion, etc.

Remember, bundles originated as customized solutions for specific use cases - they were not primarily designed to be easily found.

This is also an opportunity to tell a story rather than just presenting a tool. Consider writing a blog post about how you created this tool, recording a video, or hosting a live webinar. If you go this route, it’s important to emphasize how the tool was created and what a technical feat it represents.

That said, don’t abandon SEO entirely. You can still capture some SEO value by referencing the bundle in the READMEs of the individual Actors that comprise it. For example, if a bundle collects reviews from multiple platforms, potential users are likely to search for review scrapers for each specific platform—Google Maps reviews scraper, Tripadvisor reviews scraper, Booking reviews scraper, etc. These keywords may not lead directly to your review scraping bundle, but they can guide users to the individual scrapers, where you can then present the bundle as a more comprehensive solution.

---

## Resources

Learn more about Actor Bundles: https://blog.apify.com/apify-power-actors/
