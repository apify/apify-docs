---
title: Web scraping for beginners
description: Learn how to develop web scrapers with this comprehensive and practical course. Go from beginner to expert, all in one place.
menuWeight: 1
category: courses
paths:
    - web-scraping-for-beginners
---

# [](#welcome) Web scraping for beginners

Welcome to **Web scraping for beginners**, a comprehensive and practical web scraping course that will take you from an absolute beginner to a successful web scraper developer. This course is sponsored by [Apify](https://apify.com), the web scraping and automation platform, but we will use only open-source technologies throughout all academy lessons. This means that the skills you learn will be applicable to any scraping project, and you'll be able to run your scrapers on any computer. No Apify account needed.

<!--If you would like to learn about the Apify platform and how it can help you build, run and scale your web scraping and automation projects, visit the Apify Academy, where we'll teach you all about our actors, proxies, API, scheduling, webhooks and much more. ONCE IT'S AVAILABLE-->

## [](#why-learn) Why learn scraper development?

With so many point-and-click tools and no-code software that can help you extract data from websites, what is the point of learning scraper development? Contrary to what their marketing departments say, a point-and-click or no-code tool will never be as flexible, as powerful, or as optimized as a custom-built scraper.

Any software can do only what it was programmed to do. If you build your own scraper, it can do anything you want. And you can always quickly change it to do more, less, or the same, but faster or cheaper. The possibilities are endless once you know how scraping really works.

Scraper development is a fun and challenging way to learn web development, web technologies, and understand the internet. You will reverse-engineer websites and understand how they work internally, what technologies they use and how they communicate with their servers. You will also master your chosen programming language and core programming concepts. When you truly understand web scraping, learning other technology like React or Next.js will be a piece of cake.

## [](#summary) Course Summary

When we set out to create the Academy, we wanted to build a complete guide to modern web scraping - a course that a beginner could use to create their first scraper, as well as a resource that professionals will continuously use to learn about advanced and niche web scraping techniques and technologies. All lessons include code examples and code-along exercises that you can use to immediately put your scraping skills into action.

This is what you'll learn in the **Web scraping for beginners** course:

* [Web scraping for beginners]({{@link web_scraping_for_beginners.md}})
  * [Basics of data collection]({{@link web_scraping_for_beginners/data_collection.md}})
  * [Basics of crawling]({{@link web_scraping_for_beginners/crawling.md}})
  * [Best practices]({{@link web_scraping_for_beginners/best_practices.md}})

> We release course content as soon as we write it instead of launching it all at the same time much later. If you want to get notified about new lessons in the academy, [sign up for a free Apify account](https://console.apify.com/sign-up?asrc=developers_portal) to get our newsletters.

## [](#requirements) Requirements

You don't need to be a developer or a software engineer to complete this course, but basic programming knowledge is recommended. Don't be afraid, though. We explain everything in great detail in the this course and provide external references that can help you level up your web scraping and development skills. If you're new to programming, pay very close attention to the instructions and examples. A seemingly insignificant thing like using `[]` instead of `()` can make a lot of difference.

> If you don't already have basic programming/web development knowledge and would like to be well-prepared for this course, we recommend taking a [JavaScript course](https://www.codecademy.com/learn/introduction-to-javascript) and learning about [CSS Selectors](https://www.w3schools.com/css/css_selectors.asp).

As you progress to the more advanced courses, the coding will get more challenging, but will still be manageable to a person with an intermediate level of programming skills.

Ideally, you should have at least a moderate understanding of the following concepts:

### [](#javascript-and-node) JavaScript + Node.js

It is recommended to understand at least the fundamentals of JavaScript and be proficient with Node.js prior to starting this course. If you are not yet comfortable with asynchronous programming (with promises and `async...await`), loops (and the different types of loops in JavaScript), modularity, or working with external packages, we would recommend studying the following resources before coming back and continuing this section:

* [`async...await` (YouTube)](https://www.youtube.com/watch?v=vn3tm0quoqE&ab_channel=Fireship)
* [JavaScript loops (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
* [Modularity in Node.js](https://www.section.io/engineering-education/how-to-use-modular-patterns-in-nodejs/)

### [](#general-web-development) General web development

Throughout the next lessons, we will sometimes use certain technologies and terms related to the web without explaining them. This is because the knowledge of them will be **assumed** (unless we're showing something out of the ordinary).

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [HTTP protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP)
* [DevTools]({{@link web_scraping_for_beginners/data_collection/browser_devtools.md}})

### [](#jquery-or-cheerio) jQuery or Cheerio

We'll be using the [`cheerio`](https://www.npmjs.com/package/cheerio) package a whole lot to parse data from HTML. This package provides a simple API using jQuery syntax to help traverse downloaded HTML within Node.js.

## [](#next) Next up

The course begins with a small bit of theory and moves into some realistic and practical examples of collecting data from the most popular websites on the internet using your browser console. So [let's get to it!]({{@link web_scraping_for_beginners/introduction.md}})

> If you already have experience with HTML, CSS, and browser DevTools, feel free to skip to the [Basics of crawling]({{@link web_scraping_for_beginners/crawling.md}}) section.
