---
title: Logging into a website
description: description
menuWeight: 1
paths:
    - puppeteer-playwright/common-use-cases/logging-into-a-website
---

# [](#logging-into-a-website) Logging into a website

Whether it's auto-renewing a service, automatically sending a message on an interval, or automatically cancelling a Netflix subscription, one of the most popular things headless browsers are used for is automating things within a user's account on a certain website. Of course, automating anything on a user's account requires the automation of the login process as well. In this lesson, we'll be covering how to build a simple login flow from start to finish with Playwright or Puppeteer.

> In this lesson, we'll be using [yahoo.com](https://yahoo.com) as an example. Feel free to follow along using the academy Yahoo account credentials, or even deviate from the lesson a bit and try building a login flow for a different website of your choosing!

## [](#inputting-credentials) Inputting credentials

<!--
1. Login (single concurrency)
2. After enqueue new requests
3. Pass cookies around
-->
