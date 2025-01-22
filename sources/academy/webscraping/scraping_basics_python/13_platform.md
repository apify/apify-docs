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

Before starting with a scraping platform, let's point out several caveats in our current solution:

- **User-operated:** We have to run the scraper ourselves. If we're interested in price trends, we'd have to remember to run the program every day. If we want to be notified about a big discount, having a program we need to run manually isn't much of an improvement over manually opening the web page in our browser every day.
- **No monitoring:** If we have a spare server or a RapsberryPi under table, we could use [cron](https://en.wikipedia.org/wiki/Cron) to schedule the program, but even then we'd have little visibility into whether it finished successfully, what errors or warnings occur, how long it runs, or what resources it consumes.
- **Manual data management:** To keep track of prices in time, we'd have to figure out a way how to organize the exported data. If we wanted to process the data, we might find out that different data analysis tools require different formats.
- **Prone to anti-scraping:** If the target website detects we're scraping their data, they can rate-limit or even block us. We could take a laptop to a nearby coffee place and run the program while connected to their public wi-fi, but eventually they'll probably block that one too, which puts you in a serious hazard of angrying your barista.

:::danger Work in progress

This course is incomplete. As we work on adding new lessons, we would love to hear your feedback. You can comment right here under each page or [file a GitHub Issue](https://github.com/apify/apify-docs/issues) to discuss a problem.

:::
