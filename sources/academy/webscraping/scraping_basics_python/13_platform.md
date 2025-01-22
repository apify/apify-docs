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

Before starting with a scraping platform, let's highlight a few caveats in our current solution:

- **User-operated:** We have to run the scraper ourselves. If we're interested in price trends, we'd have to remember to run the program every day. If we want the program to alert us about a big discount, having to run it manually isn't much better than just opening the web page in our browser every day.
- **No monitoring:** If we have a spare server or a Raspberry Pi under the table, we could use [cron](https://en.wikipedia.org/wiki/Cron) to schedule the program. But even then, we'd have little visibility into whether it finished successfully, what errors or warnings occurred, how long it ran, or what resources it consumed.
- **Manual data management:** To track prices over time, we'd have to figure out how to organize the exported data. If we wanted to process the data, we might discover that different data analysis tools require specific formats.
- **Prone to anti-scraping:** If the target website detects we're scraping their data, they can rate-limit or even block us. We could take a laptop to a nearby coffee shop and run the program while connected to their public Wi-Fi, but eventually they'll probably block that one too—risking seriously annoying your barista.

:::danger Work in progress

This course is incomplete. As we work on adding new lessons, we would love to hear your feedback. You can comment right here under each page or [file a GitHub Issue](https://github.com/apify/apify-docs/issues) to discuss a problem.

:::
