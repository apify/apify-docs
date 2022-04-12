---
title: Preparations
description: Prepare your knowledge and development environment prior to building your first actor to ensure the development process will go as smoothly as possible.
menuWeight: 1
paths:
- apify-platform/first-actor/preparations
---

# [](#preparations) Preparations

Before developing your first actor, there are some important things you should be have at least a bit of knowledge about (knowing the basics of each is enough to continue through this section), as well as some things that you should have installed on your system.

> If you've already gone through the [Web scraping for beginners course]({{@link web_scraping_for_beginners.md}}) and the first lessons of the [Apify platform course]({{@link apify_platform.md}}), you will be more than well equipped to continue on with the next few lessons.

## [](#javascript-and-node) JavaScript + Node.js

It is recommended to understand at least the fundamentals of JavaScript and be proficient with Node.js prior to developing an actor on the Apify platform. If you are not yet comfortable with asynchronous programming (with promises and `async...await`), loops (and the different types of loops in JavaScript), modularity, or working with external packages, we would recommend studying the following resources before coming back and continuing this section:

- [`async...await` (YouTube)](https://www.youtube.com/watch?v=vn3tm0quoqE&ab_channel=Fireship)
- [JavaScript loops (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [Modularity in Node.js](https://www.section.io/engineering-education/how-to-use-modular-patterns-in-nodejs/)

## [](#general-web-development) General web development

Throughout the next lessons, we will sometimes use certain technologies and terms related to the web without explaining them. This is because the knowledge of them will be **assumed** (unless we're showing something out of the ordinary).

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [HTTP protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [DevTools]({{@link web_scraping_for_beginners/data_collection/browser_devtools.md}})

## [](#apify-sdk-and-cli) Apify SDK + Apify CLI

If you haven't yet tried out the Apify SDK, you can refer to [this]({{@link web_scraping_for_beginners/crawling/pro_scraping.md}}) lesson in the **Web scraping for beginners** course (and ideally follow along).

The Apify CLI will play a core role in the running and testing of the actor you will build, so if you haven't gotten it installed already, please follow along with [this short lesson]({{@link apify_platform/apify_cli.md}}).

## [](#puppeteer-playwright) Puppeteer/Playwright

[Puppeteer](https://pptr.dev/) is a library for running and controlling a [headless browser]({{@link web_scraping_for_beginners/crawling/headless_browser.md}}) in Node.js, and was developed at Google. The team working on it was hired by Microsoft to work on the [Playwright](https://playwright.dev/) project; therefore, many parallels can be seen between both the `puppeteer` and `playwright` packages. Proficiency in at least one of these will be good enough.

## [](#jquery-or-cheerio) jQuery or Cheerio

We'll be using the [`cheerio`](https://www.npmjs.com/package/cheerio) package a whole lot to parse data from HTML. This package provides a simple API using jQuery syntax to help traverse downloaded HTML within Node.js.

## [](#git) Git

In one of the later lessons, we'll be learning how to integrate our actor on the Apify platform with a Github repository. For this, you'll need to understand at least the basics of [Git](https://git-scm.com/docs). Here's a [great tutorial](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners) to help you get started with Git.

## [](#docker) Docker

Docker is a massive topic on its own, but don't be worried! We only expect you to know and understand the very basics of it, which can be learned about in [this short article](https://docs.docker.com/get-started/overview/) (10 minute read).

## [](#next) Next up

[Next up]({{@link apify_platform/first_actor/apify_sdk.md}}), we'll be learning about the most important tool in your actor-developemt toolbelt: The **Apify SDK**.

> Each lesson will have a short _(and optional)_ quiz that you can take at home to test your skills and knowledge related to the lesson's content. Some questions have straight factual answers, but some others can have varying opinionated answers.
