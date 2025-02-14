---
title: How Apify Store works
description: Learn how to create and publish your own Actor, and join a growing community of innovators in web automation.
sidebar_position: 1
category: apify platform
slug: /get-most-of-actors/store-basics/how-store-works
---

**Out of the 2,000+ Actors on the [Apify Store](https://apify.com/store) marketplace, hundreds of them were created by developers just like you. Let's get acquainted with the concept of Apify Store and what it takes to publish an Actor there.**

---

## What are Actors (and why are they called that)

[Actors](https://apify.com/actors) are serverless cloud applications that run on the Apify platform, capable of performing various computing tasks on the web, such as crawling websites or sending automated emails. They are developed by independent developers all over the world, and _you can be one of them_.

The term "Actor" is used because, like human actors, these programs follow a script. This naming convention unifies both web scraping and web automation solutions under a single term. Actors can range in complexity and function, targeting different websites or performing multiple tasks, which makes the umbrella term very useful.

## What is Apify Store

[Apify Store](https://apify.com/store) is a public library of Actors that is constantly growing and evolving. It's basically a publicly visible (and searchable) part of the Apify platform. With over 3,000 Actors currently available, most of them are created and maintained by the community. Actors that consistently perform well remain in Apify Store, while those reported as malfunctioning or under maintenance are eventually removed. This ensures that the tools in our ecosystem are reliable, effective, and competitive.

### Types of Actors

- _Web scraping Actors_: for instance, [Twitter (X) Scraper](https://apify.com/apidojo/twitter-user-scraper) extracts data from Twitter.
- _Automation Actors_: for example, [Content Checker](https://apify.com/jakubbalada/content-checker) monitors website content for changes and emails you once a change occurs.
- _Bundles_: chains of multiple Actors united by a common data point or target website. For example, [Restaurant Review Aggregator](https://apify.com/tri_angle/restaurant-review-aggregator) can scrape reviews from six platforms at once.

Learn more about bundles here: [Actor bundles](/academy/get-most-of-actors/product-optimization/actor-bundles)

## Public and private Actors

Actors in Apify Store can be public or private:

- _Private Actors_: these are only accessible to you in Apify Console. You can use them without exposing them to the web. However, you can still share the results they produce.
- _Public Actors_: these are available to everyone on Apify Store. You can choose to make them free or set a price. By publishing your web scrapers and automation solutions, you can attract users and generate income.

## How Actor monetization works (briefly)

You can monetize your Actors using three different pricing models:

- Pay for usage: charge based on how much the Actor is used.
- Pay per result: the price is based on the number of results produced, with the first few free.
- Monthly billing: set a fixed monthly rate for using the Actor.

For detailed information on which pricing model might work for your Actor, refer to [How Actor monetization works](/academy/get-most-of-actors/store-basics/how-actor-monetization-works).

## Actor ownership in Store

Actors are either created and maintained by Apify or by members of the community:

- _Maintained by Apify_: created and supported by the Apify team.
- _Maintained by Community_: created and managed by independent developers from the community.

To see who maintains an Actor, check the upper-right corner of the Actor's page.

When it comes to managing Actors on Apify, it’s important that every potential community developer understands the differences between Apify-maintained and Community-maintained Actors. Here’s what you need to know to navigate the platform effectively and ensure your work stands out.

### Community-maintained Actors

✨ _Features and functionality_: offers a broader range of use cases and features, often tailored to specific needs. Great for exploring unique or niche applications.

🧑‍💻 _Ownership_: created and maintained by independent developers like you.

🛠 _Maintenance_: you’re responsible for all updates, bug fixes, and ongoing maintenance. Apify hosts your Actor but does not manage its code.

👷‍♀️ _Reliability and testing_: it’s up to you to ensure your Actor’s reliability and performance.

☝️ _Support and Issues_: Apify does not provide direct support for Community-maintained Actors. You must manage issues through the Issues tab, where you handle user queries and problems yourself.

✍️ _Documentation_: you’re responsible for creating and maintaining documentation for your Actor. Make sure it’s clear and helpful for users.

:::tip

For the best results, ensure your Actor is well-documented and thoroughly tested. Engage with users through the Issues tab to address any problems promptly. By maintaining high standards and being proactive, you’ll enhance your Actor’s reputation and usability in Apify Store.

:::

## Importance of Actor testing and reliability

Testing your Actors is crucial to ensure they work as intended. That's why we do it on our Store side as much as you should do it on yours.

Apify runs automated tests daily to ensure all Actors in Apify Store are functional and reliable. These tests check _if an Actor can successfully run with its default input within 5 minutes_. If an Actor fails for three consecutive days, it’s labeled under maintenance, and the developer is notified. Continuous failures for another 28 days lead to deprecation.

To restore an Actor's health, developers should fix and rebuild it. The testing system will automatically recognize the changes within 24 hours. If your Actor requires longer run times or authentication, contact support to explain why it should be excluded from tests. For more control, you can implement your own tests using the Actor Testing tool available in Apify Store.

### Actor metrics and reliability score

On the right panel of each Actor in Store, you can see a list of Actor metrics.

Actor metrics such as the number of monthly users, star ratings, success rates, response times, creation dates, and recent modifications collectively offer insights into its reliability. Basically, they serve as a _shorthand for potential users to assess your Actor's reliability_ before even trying it out.

A high number of monthly users indicates widespread trust and effective performance, while a high star rating reflects user satisfaction. A success rate nearing 100% demonstrates consistent performance. Short response times show a commitment to addressing issues promptly, though quicker responses are ideal. A recent creation date suggests modern features and ongoing development, while recent modifications point to active maintenance and continuous improvements. Together, these metrics provide a comprehensive view of an Actor’s reliability and quality.

### Reporting Issues in Actors

Each Actor has an **Issues** tab in Apify Console and on the web. Here, users can open an issue (ticket) and engage in discussions with the Actor's creator, platform admins, and other users. The tab is ideal for asking questions, requesting new features, or providing feedback.

Since the **Issues** tab is public, the level of activity — or lack thereof — can be observed by potential users and may serve as an indicator of the Actor's reliability. A well-maintained Issues tab with prompt responses suggests an active and dependable Actor.

Learn more about how to handle the [Issues tab]


### Getting featured in Apify Store

Actors that perform reliably and efficiently may be featured in the [Apify picks](https://apify.com/store/collections/apify_picks) section or the **Featured developers** section of Apify Store. The purpose of this is to highlight them for users seeking top-quality tools.

## Resources

- Best practices on setting up [testing for your Actor](https://docs.apify.com/platform/actors/publishing/test)
- What are Apify-maintained and [Community-maintained Actors](https://help.apify.com/en/articles/6999799-what-are-apify-maintained-and-community-maintained-actors)? On ownership, maintenance, features, and support
- Step-by-step guide on how to [publish your Actor](https://docs.apify.com/platform/actors/publishing)
- Watch our webinar on how to [build, publish and monetize Actors](https://www.youtube.com/watch?v=4nxStxC1BJM)
- Detailed [guide on pricing models](https://docs.apify.com/platform/actors/running/actors-in-store) for Actors in Store
