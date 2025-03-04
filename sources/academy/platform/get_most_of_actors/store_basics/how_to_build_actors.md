---
title: How to build Actors
description: Learn how to create web scrapers and automation tools on Apify. Use universal scrapers for quick setup, code templates for a head start, or SDKs and libraries for full control.
sidebar_position: 2
category: apify platform
slug: /actor-marketing-playbook/store-basics/how-to-build-actors
---

At Apify, we try to make building web scraping and automation straightforward. You can customize our universal scrapers with JavaScript for quick tweaks, use our code templates for rapid setup in JavaScript, TypeScript, or Python, or build from scratch using our JavaScript and Python SDKs or Crawlee libraries for Node.js and Python for ultimate flexibility and control. This guide offers a quick overview of our tools to help you find the right fit for your needs.

## Three ways to build Actors

1. [Our universal scrapers](https://apify.com/store/scrapers/universal-web-scrapers) — customize our boilerplate tools to your needs with a bit of JavaScript and setup.
2. [Our code templates](https://apify.com/templates) for web scraping projects — for a quick project setup to save you development time (includes JavaScript, TypeScript, and Python templates).
3. Open-source libraries and SDKs
    1. [JavaScript SDK](https://docs.apify.com/sdk/js/) & [Python SDK](https://docs.apify.com/sdk/python/) — for creating your own solution from scratch on the Apify platform using our free development kits. Involves more coding but offers infinite flexibility.
    2. [Crawlee](https://crawlee.dev/) and [Crawlee for Python](https://crawlee.dev/python) — for creating your own solutions from scratch using our free web automation libraries. Involves even more coding but offers infinite flexibility. There’s also no need to host these on the platform.

## Universal scrapers & what are they for

[Universal scrapers](https://apify.com/scrapers/universal-web-scrapers) were built to provide an intuitive UI plus configuration that will help you start extracting data as quickly as possible. Usually, you just provide a [simple JavaScript function](https://docs.apify.com/tutorials/apify-scrapers/getting-started#the-page-function) and set up one or two parameters, and you're good to go.

Since scraping and automation come in various forms, we decided to build not just one, but _six_ scrapers. This way, you can always pick the right tool for the job. Let's take a look at each particular tool and its advantages and disadvantages.

| Scraper | Technology | Advantages | Disadvantages | Best for |
| --- | --- | --- | --- | --- |
| 🌐 Web Scraper | Headless Chrome Browser | Simple, fully JavaScript-rendered pages | Executes only client-side JavaScript | Websites with heavy client-side JavaScript |
| 👐 Puppeteer Scraper | Headless Chrome Browser | Powerful Puppeteer functions,  executes both server-side and client-side JavaScript | More complex | Advanced scraping with client/server-side JS |
| 🎭 Playwright Scraper | Cross-browser support with Playwright library | Cross-browser support, executes both server-side and client-side JavaScript | More complex | Cross-browser scraping with advanced features |
| 🍩 Cheerio Scraper | HTTP requests + Cheerio parser (JQuery-like for servers) | Simple, fast, cost-effective | Pages may not be fully rendered (lacks JavaScript rendering), executes only server-side JavaScript | High-speed, cost-effective scraping |
| ⚠️ JSDOM Scraper | JSDOM library (Browser-like DOM API) | + Handles client-side JavaScript<br/>+ Faster than full-browser solutions<br/>+ Ideal for light scripting | Not for heavy dynamic JavaScript, executes server-side code only, depends on pre-installed NPM modules | Speedy scraping with light client-side JS |
| 🍲 BeautifulSoup Scraper | Python-based, HTTP requests + BeautifulSoup parser | Python-based, supports recursive crawling and URL lists | No full-featured web browser, not suitable for dynamic JavaScript-rendered pages | Python users needing simple, recursive crawling |

### How do I choose the right universal web scraper to start with?

🎯 Decision points:

- Use 🌐 [Web Scraper](https://apify.com/apify/web-scraper) if you need simplicity with full browser capabilities and client-side JavaScript rendering.
- Use 🍩 [Cheerio Scraper](https://apify.com/apify/cheerio-scraper) for fast, cost-effective scraping of static pages with simple server-side JavaScript execution.
- Use 🎭 [Playwright Scraper](https://apify.com/apify/playwright-scraper) when cross-browser compatibility is crucial.
- Use 👐 [Puppeteer Scraper](https://apify.com/apify/puppeteer-scraper) for advanced, powerful scraping where you need both client-side and server-side JavaScript handling.
- Use ⚠️ [JSDOM Scraper](https://apify.com/apify/jsdom-scraper) for lightweight, speedy scraping with minimal client-side JavaScript requirements.
- Use 🍲 [BeautifulSoup Scraper](https://apify.com/apify/beautifulsoup-scraper) for Python-based scraping, especially with recursive crawling and processing URL lists.


To make it easier, here's a short questionnaire that guides you on selecting the best scraper based on your specific use case:

<details>
    <summary>Questionnaire</summary>
    1. Is the website content rendered with a lot of client-side JavaScript?
        - Yes:
            - Do you need full browser capabilities?
                - Yes: use Web Scraper or Playwright Scraper
                - No, but I still want advanced features: use Puppeteer Scraper
        - No:
            - Do you prioritize speed and cost-effectiveness?
                - Yes: use Cheerio Scraper
                - No: use JSDOM Scraper
    2. Do you need cross-browser support for scraping?
        - Yes:** use Playwright Scraper
        - No:** continue to the next step.
    3. Is your preferred scripting language Python?**
        - Yes:** use BeautifulSoup Scraper
        - No:** continue to the next step.
    4. Are you dealing with static pages or lightweight client-side JavaScript?**
        - Static pages: use Cheerio Scraper or BeautifulSoup Scraper
        - Light client-side JavaScript:
            - Do you want a balance between speed and client-side JavaScript handling?
                - Yes: use JSDOM Scraper
                - No: use Web Scraper or Puppeteer Scraper
    5. Do you need to support recursive crawling or process lists of URLs?
        - Yes, and I prefer Python: use BeautifulSoup Scraper
        - Yes, and I prefer JavaScript: use Web Scraper or Cheerio Scraper
        - No: choose based on other criteria above.

This should help you navigate through the options and choose the right scraper based on the website’s complexity, your scripting language preference, and your need for speed or advanced features.

</details>


📚 Resources:

- How to use [Web Scraper](https://www.youtube.com/watch?v=5kcaHAuGxmY) to scrape any website
- How to use [Beautiful Soup](https://www.youtube.com/watch?v=1KqLLuIW6MA) to scrape the web
- Learn about our $1/month [Creator plan](https://apify.com/pricing/creator-plan) that encourages devs to build Actors based on universal scrapers

## Web scraping code templates

Similar to our universal scrapers, our [code templates](https://apify.com/templates) also provide a quick start for developing web scrapers, automation scripts, and testing tools. Built on popular libraries like BeautifulSoup for Python or Playwright for JavaScript, they save time on setup, allowing you to focus on customization. Though they require more coding than universal scrapers, they're ideal for those who want a flexible foundation while still needing room to tailor their solutions.

| Code template | Supported libraries | Purpose | Pros | Cons |
| --- | --- | --- | --- | --- |
| 🐍 Python | Requests, BeautifulSoup, Scrapy, Selenium, Playwright | Creating scrapers Automation Testing tools | - Simplifies setup - Supports major Python libraries | - Requires more manual coding (than universal scrapers)- May be restrictive for complex tasks |
| ☕️ JavaScript | Playwright, Selenium, Cheerio, Cypress, LangChain | Creating scrapers Automation Testing tools | - Eases development with pre-set configurations - Flexibility with JavaScript and TypeScript | - Requires more manual coding (than universal scrapers)- May be restrictive for tasks needing full control |


📚 Resources:

- [How to build a scraper](https://www.youtube.com/watch?v=u-i-Korzf8w) using a web scraper template.

## Toolkits and libraries

### Apify JavaScript and Python SDKs

[Apify SDKs](https://docs.apify.com/sdk/js/) are designed for developers who want to interact directly with the Apify platform. It allows you to perform tasks like saving data in Apify Datasets, running Apify Actors, and accessing the key-value store. Ideal for those who are familiar with [Node.js](https://docs.apify.com/sdk/js/) and [Python](https://docs.apify.com/sdk/python/), SDKs provide the tools needed to develop software specifically on the Apify platform, offering complete freedom and flexibility within the JavaScript ecosystem.

- _Best for_: interacting with the Apify platform (e.g., saving data, running Actors, etc)
- _Pros_: full control over platform-specific operations, integrates seamlessly with Apify services
- _Cons_: requires writing boilerplate code, higher complexity with more room for errors

### Crawlee

[Crawlee](https://crawlee.dev/) (for both Node.js and [Python](https://crawlee.dev/python)) is a powerful web scraping library that focuses on tasks like extracting data from web pages, automating browser interactions, and managing complex scraping workflows. Unlike the Apify SDK, Crawlee does not require the Apify platform and can be used independently for web scraping tasks. It handles complex operations like concurrency management, auto-scaling, and request queuing, allowing you to concentrate on the actual scraping tasks.

- _Best for_: web scraping and automation (e.g., scraping paragraphs, automating clicks)
- _Pros_: full flexibility in web scraping tasks, does not require the Apify platform, leverages the JavaScript ecosystem
- _Cons_: requires more setup and coding, higher chance of mistakes with complex operations

### Combining Apify SDK and Crawlee

While these tools are distinct, they can be combined. For example, you can use Crawlee to scrape data from a page and then use the Apify SDK to save that data in an Apify dataset. This integration allows developers to make use of the strengths of both tools while working within the Apify ecosystem.

📚 Resources:

- Introduction to [Crawlee](https://www.youtube.com/watch?v=g1Ll9OlFwEQ)
- Crawlee [blog](https://crawlee.dev/blog)
- Webinar on scraping with [Crawlee 101](https://www.youtube.com/watch?v=iAk1mb3v5iI): how to create scrapers in JavaScript and TypeScript
- Step-by-step video guide: [building an Amazon Scraper](https://www.youtube.com/watch?v=yTRHomGg9uQ) in Node.js with Crawlee
- Webinar on how to use [Crawlee Python](https://www.youtube.com/watch?v=ip8Ii0eLfRY)
- Introduction to Apify's [Python SDK](https://www.youtube.com/watch?v=C8DmvJQS3jk)


## Code templates vs. universal scrapers vs. libraries

Basically, the choice here depends on how much flexibility you need and how much coding you're willing to do. More flexibility → more coding.

[Universal scrapers](https://apify.com/scrapers/universal-web-scrapers) are simple to set up but are less flexible and configurable. Our [libraries](https://crawlee.dev/), on the other hand, enable the development of a standard [Node.js](https://nodejs.org/) or Python application, so be prepared to write a little more code. The reward for that is almost infinite flexibility.

[Code templates](https://apify.com/templates) are sort of a middle ground between scrapers and libraries. But since they are built on libraries, they are still on the rather more coding than less coding side. They will only give you a starter code to begin with. So please take this into account when choosing the way to build your scraper, and if in doubt — just ask us, and we'll help you out.

## Switching sides: how to transfer an existing solution from another platform

You can also take advantage of the Apify platform's features without having to modify your existing scraping or automation solutions.

### Integrating Scrapy spiders

The Apify platform fully supports Scrapy spiders. By [deploying your existing Scrapy code to Apify](https://apify.com/run-scrapy-in-cloud), you can take advantage of features like scheduling, monitoring, scaling, and API access, all without needing to modify your original spider. This process is made easy with the [Apify CLI](https://docs.apify.com/cli/), which allows you to convert your Scrapy spider into an Apify Actor with just a few commands. Once deployed, your spider can run in the cloud, offering a reliable and scalable solution for your web scraping needs.

Additionally, you can monetize your spiders by [publishing them as Actors](https://apify.com/partners/actor-developers) on Apify Store, potentially earning passive income from your work while benefiting from the platform’s extensive features.

### ScrapingBee, ScrapingAnt, ScraperAPI

To make the transition from these platforms easier, we've also created [SuperScraper API](https://apify.com/apify/super-scraper-api). This API is an open-source REST API designed for scraping websites by simply passing a URL and receiving the rendered HTML content in return. This service functions as a cost-effective alternative to other scraping services like ScrapingBee, ScrapingAnt, and ScraperAPI. It supports dynamic content rendering with a headless browser, can use various proxies to avoid blocking, and offers features such as capturing screenshots of web pages. It is ideal for large-scale scraping tasks due to its scalable nature.

To use SuperScraper API, you can deploy it with an Apify API token and access it via HTTP requests. The API supports multiple parameters for fine-tuning your scraping tasks, including options for rendering JavaScript, waiting for specific elements, and handling cookies and proxies. It also allows for custom data extraction rules and JavaScript execution on the scraped pages. Pricing is based on actual usage, which can be cheaper or more expensive than competitors, depending on the configuration.

📚 Resources:

- [How to integrate Scrapy projects](https://docs.apify.com/cli/docs/integrating-scrapy)
- Scrapy monitoring: how to [manage your Scrapy spider on Apify](https://blog.apify.com/scrapy-monitoring-spidermon/)
- Run ScrapingBee, ScraperAPI, and ScrapingAnt on Apify — [SuperScraper API Tutorial](https://www.youtube.com/watch?v=YKs-I-2K1Rg)

## General resources

- Creating your Actor: [Actor sources](https://docs.apify.com/academy/getting-started/creating-actors)
- Use it, build it or buy it? [Choosing the right solution on Apify](https://help.apify.com/en/articles/3024655-choosing-the-right-solution)
- How to programmatically retrieve data with the [Apify API](https://www.youtube.com/watch?v=ViYYDHSBAKM&t=0s)
- Improved way to [build your scrapers from a Git repo](https://www.youtube.com/watch?v=8QJetr-BYdQ)
- Webinar on [how to build and monetize Actors](https://www.youtube.com/watch?v=4nxStxC1BJM) on Apify Store
- 6 things you should know before buying or [building a web scraper](https://blog.apify.com/6-things-to-know-about-web-scraping/)
- For a comprehensive guide on creating your first Actor, visit the [Apify Academy](https://docs.apify.com/academy).
