---
title: Expert scraping with Apify
description: After learning the basics of actors, learn to develop pro-level scrapers on the Apify platform with this advanced course.
menuWeight: 6
category: courses
paths:
- expert-scraping-with-apify
---

# [](#expert-scraping) Expert scraping with Apify

This course will teach you the nitty gritty of what it takes to build pro-level scrapers with Apify. We recommend that you've at least looked through all of the other courses in the academy prior to taking this one on.

## [](#preparations) Preparations

Before developing a pro-level Apify scraper, there are some important things you should have at least a bit of knowledge about (knowing the basics of each is enough to continue through this section), as well as some things that you should have installed on your system.

> If you've already gone through the [Web scraping for beginners course]({{@link web_scraping_for_beginners.md}}) and the first lessons of the [Apify platform course]({{@link apify_platform.md}}), you will be more than well equipped to continue on with the lessons in this course.

### [](#javascript-and-node) JavaScript + Node.js

It is recommended to understand at least the fundamentals of JavaScript and be proficient with Node.js prior to developing an actor on the Apify platform. If you are not yet comfortable with asynchronous programming (with promises and `async...await`), loops (and the different types of loops in JavaScript), modularity, or working with external packages, we would recommend studying the following resources before coming back and continuing this section:

- [`async...await` (YouTube)](https://www.youtube.com/watch?v=vn3tm0quoqE&ab_channel=Fireship)
- [JavaScript loops (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [Modularity in Node.js](https://www.section.io/engineering-education/how-to-use-modular-patterns-in-nodejs/)

### [](#general-web-development) General web development

Throughout the next lessons, we will sometimes use certain technologies and terms related to the web without explaining them. This is because the knowledge of them will be **assumed** (unless we're showing something out of the ordinary).

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [HTTP protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [DevTools]({{@link web_scraping_for_beginners/data_collection/browser_devtools.md}})

### [](#jquery-or-cheerio) jQuery or Cheerio

We'll be using the [`cheerio`](https://www.npmjs.com/package/cheerio) package a whole lot to parse data from HTML. This package provides a simple API using jQuery syntax to help traverse downloaded HTML within Node.js.

### [](#puppeteer-playwright) Puppeteer/Playwright

[Puppeteer](https://pptr.dev/) is a library for running and controlling a [headless browser]({{@link web_scraping_for_beginners/crawling/headless_browser.md}}) in Node.js, and was developed at Google. The team working on it was hired by Microsoft to work on the [Playwright](https://playwright.dev/) project; therefore, many parallels can be seen between both the `puppeteer` and `playwright` packages. Proficiency in at least one of these will be good enough.

### [](#crawlee-apify-sdk-and-cli) Crawlee, Apify SDK, and the Apify CLI

If you're feeling ambitious, you don't need to have any prior experience with Crawlee to get started with this course; however, at least 5-10 minutes of exposure is recommended. If you haven't yet tried out Crawlee, you can refer to [this lesson]({{@link web_scraping_for_beginners/crawling/pro_scraping.md}}) in the **Web scraping for beginners** course (and ideally follow along). To familiarize with the Apify SDK,you can refer to the [Apify Platform]({{@link apify_platform.md}}) course.

The Apify CLI will play a core role in the running and testing of the actor you will build, so if you haven't gotten it installed already, please refer to [this short lesson]({{@link tools/apify_cli.md}}).

<!-- todo: remove all requirements up to this point -->

### [](#git) Git

In one of the later lessons, we'll be learning how to integrate our actor on the Apify platform with a Github repository. For this, you'll need to understand at least the basics of [Git](https://git-scm.com/docs). Here's a [great tutorial](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners) to help you get started with Git.

### [](#docker) Docker

Docker is a massive topic on its own, but don't be worried! We only expect you to know and understand the very basics of it, which can be learned about in [this short article](https://docs.docker.com/get-started/overview/) (10 minute read).

### [](#actor-basics) The basics of actors

Part of this course will be learning more in-depth about actors; however, some basic knowledge is already assumed. If you haven't yet gone through the [actors]({{@link apify_platform/getting_started/actors.md}}) lesson of the **Apify platform** course, it's highly recommended to at least give it a glance before moving forward.

## [](#next) Next up

[Next up]({{@link expert_scraping_with_apify/crawlee.md}}), we'll be learning in-depth about the most important tool in your actor-development toolbelt: The **Crawlee**.

> Each lesson will have a short _(and optional)_ quiz that you can take at home to test your skills and knowledge related to the lesson's content. Some questions have straight factual answers, but some others can have varying opinionated answers.
