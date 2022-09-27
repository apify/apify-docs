---
title: How to optimize and speed up your web scraper
description: We all want our scrapers to run as fast as possible and cost as little money as possible. Learn how to think about performance in the context of web-scraping and automation.
menuWeight: 18
category: tutorials
paths:
    - optimizing-scrapers
---

# [](#optimizing-scrapers) Optimizing scrapers

Especially if you are running your scrapers on [Apify](https://apify.com), performance is directly related to your wallet (or rather bank account). The slower and heavier your program is, the more proxy bandwidth, storage, [compute units](https://help.apify.com/en/articles/3490384-what-is-a-compute-unit) and higher [subscription plan](https://apify.com/pricing) you'll need.

The goal of optimization is simple: Make the code run as fast possible and use the least resources possible. On Apify, the resources are memory and CPU usage (don't forget that the more memory you allocate to a run, the bigger share of CPU you get - proportionally). Memory alone should never be a bottleneck though. If it is, that means either a bug (memory leak) or bad architecture of the program (you need to split the computation to smaller parts). So in the rest of this article, we will focus only on optimizing CPU usage. You allocate more memory only to get more power from the CPU.

There is one more thing. Optimization has its own cost: development time. You should always think about how much time you're able to spend on it and if it's worth it.

Before we dive into the practical side of things, lets diverge with an analogy to help us think about the performance of scrapers.

## [](#analogy) Game development analogy

Modern games are extremely complicated beasts. Every frame (usually 60 times a second), the game has to calculate the physics of the world, run AI, user input, and render everything into a beautiful scene. You can imagine that running all of that every 16 ms in a complicated game is a developer's nightmare. That's why a significant portion of game development is spent on optimizations. Every little waste matters.

This is mainly true in the programming heart of the game - the engine. The engine is responsible for the heavy lifting of performance critical parts like physics, animation, AI, and rendering. Once the engine is built, you can design the game on top of it. You can add different spells, conversation chains, items, animations etc. to make your game cool. Those extra things may not run every frame and don't need to be optimized as heavily as the engine itself.

Now, if you want to build your own game and you are not a C/C++ veteran with a team, you will likely use an existing engine (like Unreal or Unity) and focus on the design of the game environment itself. Unless you go crazy, the game will likely run just fine since those engines have already been optimized for you. Your job is to choose an appropriate engine and use it well.

## [](#back-to-scrapers) Back to scrapers

What are the engines of the scraping world? A [browser](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md), an [HTTP library](https://www.npmjs.com/package/@apify/http-request), an [HTML parser](https://github.com/cheeriojs/cheerio), and a [JSON parser](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse). The CPU spends more than 99% of its workload in these libraries. As with engines, you are not likely gonna write these from scratch - instead you'll use something like [Crawlee](https://crawlee.dev) that handles a lot of the overheads for you.

It is about how you use these tools. The small amount of code you write in your [`requestHandler`](https://crawlee.dev/api/http-crawler/interface/HttpCrawlerOptions#requestHandler) is absolutely insignificant compared to what is running inside these tools. In other words, it doesn't matter how many functions you call or how many variables you extract. If you want to optimize your scrapers, you need to choose the lightweight option from the tools and use it as little as possible. A crawler scraping only JSON API can be as much as 200 times faster/cheaper than a browser based solution.

**Ranking of the tools from the most efficient to the least:**

1. **JSON API** (HTTP call + JSON parse) - Scraping an API (public or internal) is the best option. The response is usually smaller than the HTML page and the data are already structured and cheap to parse. Usable for about 30% of websites.
2. **Pure HTML** (HTTP call + HTML parse) -  All data is on the main single HTML page. Often the HTML contains script and JSON data that are rich and nicely structured. Some pages can be quite big and the parsing is slower than for JSON. But it is still 10-20 times faster than a browser. Usable for about 90% of websites.
3. **Browser** (hundreds of HTTP calls, script execution, rendering) - Browsers are huge beasts. They do so much work to allow for smooth human interaction which makes them really inefficient for scraping. Use a browser only if it helps you bypass anti-scraping protection or you need to interact with the page.

