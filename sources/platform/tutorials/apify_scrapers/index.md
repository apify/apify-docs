---
title: Apify scrapers
description: Discover Apify's ready-made web scraping and automation tools. Compare Web Scraper, Cheerio Scraper and Puppeteer Scraper to decide which is right for you.
sidebar_position: 3.2
slug: /tutorials/apify-scrapers
---

# Scraping with Apify

**Discover Apify's ready-made web scraping and automation tools. Compare Web Scraper, Cheerio Scraper and Puppeteer Scraper to decide which is right for you.**

---

Scraping and crawling the web can be difficult and time-consuming without the right tools. That's why Apify provides ready-made solutions to crawl and scrape any website. They are based on our [actors](https://apify.com/actors), the [Apify SDK](https://docs.apify.com/sdk/js) and [Crawlee](https://crawlee.dev/).

Don't let the number of options confuse you. Unless you're really sure you need to use a specific tool, just go ahead and use **Web Scraper** ([apify/web-scraper](./web_scraper.md)). It is the easiest to pick up and can handle almost anything. Look at **Puppeteer Scraper** ([apify/puppeteer-scraper](./puppeteer_scraper.md)) or **Cheerio Scraper** ([apify/cheerio-scraper](./cheerio_scraper.md)) only after you know your target websites well and need to optimize your scraper.

[Visit the Scraper introduction tutorial to get started!](./getting_started.md)

## [](#web-scraper)Web Scraper

Web Scraper is a ready-made solution for scraping the web using the Chrome browser. It takes away all the work necessary to set up a browser for crawling, controls the browser automatically and produces machine-readable results in several common formats.

Underneath, it uses the Puppeteer library to control the browser, but you don't need to worry about that. Using a simple web UI and a little of basic JavaScript, you can tweak it to serve almost any scraping need.

[Visit the Web Scraper tutorial to get started!](./web_scraper.md)

## [](#cheerio-scraper)Cheerio Scraper

Cheerio Scraper is a ready-made solution for crawling the web using plain HTTP requests to retrieve HTML pages and then parsing and inspecting the HTML using the [cheerio](https://www.npmjs.com/package/cheerio) library. It's blazing fast.

Cheerio is a server-side version of the popular jQuery library that does not run in the browser but instead constructs a DOM out of an HTML string and then provides the user an API to work with that DOM.

Cheerio Scraper is ideal for scraping websites that do not rely on client-side JavaScript to serve their content. It can be as much as 20 times faster than using a full-browser solution like Puppeteer.

[Visit the Cheerio Scraper tutorial to get started!](./cheerio_scraper.md)

## [](#puppeteer-scraper)Puppeteer Scraper

Puppeteer Scraper is the most powerful scraper tool in our arsenal (aside from developing your own actors). It uses the Puppeteer library to programmatically control a headless Chrome browser, and it can make it do almost anything. If using Web Scraper does not cut it, Puppeteer Scraper is what you need.

Puppeteer is a Node.js library, so knowledge of Node.js and its paradigms is expected when working with Puppeteer Scraper.

[Visit the Puppeteer Scraper tutorial to get started!](./puppeteer_scraper.md)

