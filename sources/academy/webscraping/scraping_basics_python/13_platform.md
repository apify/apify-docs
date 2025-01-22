---
title: Using a scraping platform with Python
sidebar_label: Using a platform
description: Lesson about building a Python application for watching prices. Using the Apify platform to deploy a scraper.
sidebar_position: 13
slug: /scraping-basics-python/platform
---

import Exercises from './_exercises.mdx';

**In this lesson, we'll deploy our application to a scraping platform that automatically runs it daily. We'll also use the platform's API to retrieve and work with the results.**

---

Before starting with a scraping platform, let's highlight a few caveats in our current setup:

- **User-operated:** We have to run the scraper ourselves. If we're tracking price trends, we'd need to remember to run it daily. And if we want alerts for big discounts, manually running the program isn't much better than just checking the site in a browser every day.
- **No monitoring:** If we have a spare server or a Raspberry Pi lying around, we could use [cron](https://en.wikipedia.org/wiki/Cron) to schedule it. But even then, we'd have little insight into whether it ran successfully, what errors or warnings occurred, how long it took, or what resources it used.
- **Manual data management:** Tracking prices over time means figuring out how to organize the exported data ourselves. Processing the data could also be tricky since different analysis tools often require different formats.
- **Anti-scraping risks:** If the target website detects our scraper, they can rate-limit or block us. Sure, we could run it from a coffee shop's Wi-Fi, but eventually, they'd block that too—risking seriously annoying the barista.

In this lesson, we'll use a platform to address all of these issues. Generic cloud platforms like [GitHub Actions](https://github.com/features/actions) can work for simple scenarios. But platforms dedicated to scraping, like [Apify](https://apify.com/), offer extra features such as monitoring scrapers, managing retrieved data, and overcoming anti-scraping measures.

:::info Why Apify

Scraping platforms come in many varieties, offering a wide range of tools and approaches. As the course authors, we're obviously a bit biased toward Apify—we think it's both powerful and complete.

That said, the main goal of this lesson is to show how deploying to **any platform** can make life easier—it's not Apify-specific. Plus, everything we cover here fits within [Apify's free tier](https://apify.com/pricing).

:::

## Registering

## Something

## What's next

---

<Exercises />

:::danger Work in progress

This course is incomplete. As we work on adding new lessons, we would love to hear your feedback. You can comment right here under each page or [file a GitHub Issue](https://github.com/apify/apify-docs/issues) to discuss a problem.

:::
