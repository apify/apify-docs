---
title: Anti-scraping protections
description: Understand the various anti-scraping measures different sites use to prevent bots from accessing them, and how to appear more human to fix these issues.
sidebar_position: 4
category: web scraping & automation
slug: /anti-scraping
---

# Anti-scraping protections {#anti-scraping-protections}

**Understand the various anti-scraping measures different sites use to prevent bots from accessing them, and how to appear more human to fix these issues.**

---

If at any point in time you've strayed away from the Academy's demo content, and into the Wild West by writing some scrapers of your own, you may have been hit with anti-scraping measures. This is extremely common in the scraping world; however, the good thing is that there are always solutions.

This section covers the essentials of mitigating anti-scraping protections, such as proxies, HTTP headers and cookies, and a few other things to consider when working on a reliable and scalable crawler. Proper usage of the methods taught in the next lessons will allow you to extract data which is specific to a certain location, enable your crawler to browse websites as a logged-in user, and more.

In development, it is crucial to check and adjust the configurations related to our next lessons' topics, as doing this can fix blocking issues on the majority of websites.

## Quick start {#quick-start}

If you don't have time to read about the theory behind anti-scraping protections to fine-tune your scraping project and instead you need to get unblocked ASAP, here are some quick tips:

- Use high-quality proxies. [Residential proxies](/platform/proxy/residential-proxy) are the least blocked. You can find many providers out there like Apify, BrightData, Oxylabs, NetNut, etc.
- Set **real-user-like HTTP settings** and **browser fingerprints**. [Crawlee](https://crawlee.dev/) uses statistically generated realistic HTTP headers and browser fingerprints by default for all of its crawlers.
- Use a browser to pass bot capture challenges. We recommend [Playwright with Firefox](https://crawlee.dev/docs/examples/playwright-crawler-firefox) because it is not that common for scraping. You can also play with [non-headless mode](https://crawlee.dev/api/playwright-crawler/interface/PlaywrightCrawlerOptions#headless) and adjust other [fingerprint settings](https://crawlee.dev/api/browser-pool/interface/FingerprintGeneratorOptions).
- Consider extracting data from **[private APIs](../api_scraping/index.md)** or **mobile app APIs**. They are usually much less protected.
- Increase the number of request retries significantly to at least 10 with [`maxRequestRetries: 10`](https://crawlee.dev/api/basic-crawler/interface/BasicCrawlerOptions#maxRequestRetries). Rotate sessions after every error with [`maxErrorScore: 1`](https://crawlee.dev/api/core/interface/SessionOptions#maxErrorScore)
- If you cannot afford to use browsers for performance reasons, you can try [Playwright.request](https://playwright.dev/docs/api/class-playwright#playwright-request) or [curl-impersonate](https://www.npmjs.com/package/node-libcurl) as the HTTP library for [Cheerio](https://crawlee.dev/api/cheerio-crawler/class/CheerioCrawler) or [Basic](https://crawlee.dev/api/basic-crawler/class/BasicCrawler) Crawlers, instead of its default [got-scraping](https://crawlee.dev/docs/guides/got-scraping) HTTP back end. These libraries have access to native code which offers much finer control over the HTTP traffic and mimics real browsers more than what can be achieved with plain Node.js implementation like `got-scraping`. These libraries should become part of Crawlee itself in the future.

In the vast majority of cases, this configuration should lead to success. Success doesn't mean that all requests will go through unblocked, that is not realistic. Some IP addresses and fingerprint combinations will still be blocked but the automatic retry system takes care of that. If you can get at least 10% of your requests through, you can still scrape the whole website with enough retries. The default [SessionPool](https://crawlee.dev/api/core/class/SessionPool) configuration will preserve the working sessions and eventually the success rate will increase.

If the above tips didn't help, you can try to fiddle with the following:

- Try different browsers. Crawlee & Playwright support Chromium, Firefox and WebKit out of the box. You can also try the [Brave browser](https://brave.com) which [can be configured for Playwright](https://blog.apify.com/unlocking-the-potential-of-brave-and-playwright-for-browser-automation/).
- Don't use browsers at all. Sometimes the anti-scraping protections are extremely sensitive to browser behavior but will allow plain HTTP requests (with the right headers) just fine. Don't forget to match the specific [HTTP headers](/academy/concepts/http-headers) for each request.
- Decrease concurrency. Slower scraping means you can blend in better with the rest of the traffic.
- Add human-like behavior. Don't traverse the website like a bot (paginating quickly from 1 to 100). Instead, visit various types of pages, add time randomizations and you can even introduce some mouse movements and clicks.
- Try Puppeteer with the [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth) plugin. Generally, Crawlee's default configuration should have stronger bypassing but some features might land first in the stealth plugin.
- Find different sources of the data. The data might be rendered to the HTML but you could also find it in JavaScript (inlined in the HTML or in files) or in the API responses. Especially the APIs are often much less protected (if you use the right headers).
- Reverse engineer the JavaScript challenges that run on the page so you can figure out how the bypass them. This is a very advanced topic that you can read about online. We plan to introduce more content about this.

Keep in mind that there is no silver bullet solution. You can find many anti-scraping systems and each of them behaves differently depending the website's configuration. That is why "trying a few things" usually leads to success. You will find more details about these tricks in the [mitigation](./mitigation/index.md) section below.

## First of all, why do websites want to block bots? {#why-block-bots}

What's up with that?! A website might have a variety of reasons to block bots from accessing it. Here are a few of the main ones:

- To prevent the possibility of malicious bots from crawling the site to steal sensitive data like passwords or personal data about users.
- In order to avoid server performance hits due to bots making a large amount of requests to the website at a single time.
- To avoid their competitors to gain market insights about their business.
- To prevent bots from scraping their content and selling it to other websites or re-publishing it.
- To not skew their analytics data with bot traffic.
- If it is a social media website, they might be attempting to keep away bots programmed to mass create fake profiles (which are usually sold later).

> We recommend checking out [this article about legal and ethical ramifications of web scraping](https://blog.apify.com/is-web-scraping-legal/).

Unfortunately for these websites, they have to make compromises and tradeoffs. While super strong anti-bot protections will surely prevent the majority of bots from accessing their content, there is also a higher chance of regular users being flagged as bots and being blocked as well. Because of this, different sites have different scraping-difficulty levels based on the anti-scraping measures they take.

> Going into this topic, it's important to understand that there is no one silver bullet solution to bypassing protections against bots. Even if two websites are using Cloudflare (for example), one of them might be significantly more difficult to scrape due to harsher CloudFlare configurations. It is all about configuration, not the anti-scraping tool itself.

## The principles of anti-scraping protections {#the-principles}

Anti-scraping protections can work on many different layers and use a large amount of bot-identification techniques.

1. **Where you are coming from** - The IP address of the incoming traffic is always available to the website. Proxies are used to emulate a different IP addresses but their quality matters a lot.
2. **How you look** - With each request, the website can analyze its HTTP headers, TLS version, ciphers, and other information. Moreover, if you use a browser, the website can also analyze the whole browser fingerprint and run challenges to classify your hardware (like graphics hardware acceleration).
3. **What you are scraping** - The same data can be extracted in many ways from a website. You can get the initial HTML or you can use a browser to render the full page or you can reverse engineer internal APIs. Each of those endpoints can be protected differently.
4. **How you behave** - The website can see patterns in how you are ordering your requests, how fast you are scraping, etc. It can also analyze browser behavior like mouse movement, clicks or key presses.

These are the 4 main principles that anti-scraping protections are based on.

Not all websites use all of these principles but they encompass the possibilities websites have to track and block bots. All techniques that help you mitigate anti-scraping protections are based on making yourself blend in with the crowd of regular users with each of these principles.

A bot can usually be detected in one of two ways, which follow two different types of web scraping:

1. Crawlers using **HTTP requests**
2. Crawlers using **browser automation** (usually with a headless browser)

Once a bot is detected, there are some countermeasures a website takes to prevent it from re-accessing it. The protection techniques are divided into two main categories:

1. Uses only the **information provided within the HTTP request**, such as headers, IP addresses, TLS versions, ciphers, etc.
2. Uses **JavaScript evaluation to collect browser fingerprint**, or even track the user behavior on the website. These JavaScript evaluations can also track mouse movement or keys pressed. Based on the information gathered, they can decide if the user is a bot or a human. This method is often paired with the first one.

Once one of these methods detects that the user is a bot, it will take countermeasures depending on how advanced its techniques are.

A common workflow of a website after it has detected a bot goes as follows:

1. The bot is added to the "greylist" (a list of suspicious IP addresses, fingerprints or any other value that can be used to uniquely identify the bot).
2. A [Turing test](https://en.wikipedia.org/wiki/Turing_test) is provided to the bot. Typically a **captcha**. If the bot succeeds, it is added to the whitelist.
3. If the captcha is failed, the bot is added to the blacklist.

One thing to keep in mind while navigating through this course is that advanced anti-scraping methods are able to identify non-humans not only by one value (such as a single header value, or IP address), but are able to identify them through more complex things such as header combinations.

Watch a conference talk by [Ondra Urban](https://github.com/mnmkng), which provides an overview of various anti-scraping measures and tactics for circumventing them.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/aXil0K-M-Vs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

:::info Several years old?

Although the talk, given in 2021, features some outdated code examples, it still serves well as a general overview.

:::

## Common anti-scraping measures {#common-measures}

Because we here at Apify scrape for a living, we have discovered many popular and niche anti-scraping techniques. We've compiled them into a short and comprehensible list here to help understand the roadblocks before this course teaches you how to get around them.

> Not all issues you encounter are caused by anti-scraping systems. Sometimes, it's a configuration issue. Learn [how to effectively debug your programs here](/academy/node-js/analyzing-pages-and-fixing-errors).

### IP rate-limiting

This is the most straightforward and standard protection, which is mainly implemented to prevent DDoS attacks, but it also works for blocking scrapers. Websites using rate limiting don't allow to more than some defined number of requests from one IP address in a certain time span. If the max-request number is low, then there is a high potential for false-positive due to IP address uniqueness, such as in large companies where hundreds of employees can share the same IP address.

> Learn more about rate limiting [here](./techniques/rate_limiting.md)

### Header checking

This type of bot identification is based on the given fact that humans are accessing web pages through browsers, which have specific [header](../../glossary/concepts/http_headers.md) sets which they send along with every request. The most commonly known header that helps to detect bots is the `User-Agent` header, which holds a value that identifies which browser is being used, and what version it's running. Though `User-Agent` is the most commonly used header for the **Header checking** method, other headers are sometimes used as well. The evaluation is often also run based on the header consistency, and includes a known combination of browser headers.

### URL analysis

Solely based on the way how the bots operate. It compares data-rich page visits and the other page visits. The ratio of the data-rich and regular pages has to be high to identify the bot and reduce false positives successfully.

### Regular structure changes

By definition, this is not an anti-scraping method, but it can heavily affect the reliability of a scraper. If your target website drastically changes its CSS selectors, and your scraper is heavily reliant on selectors, it could break. In principle, websites using this method change their HTML structure or CSS selectors randomly and frequently, making the parsing of the data harder, and requiring more maintenance of the bot.

One of the best ways of avoiding the possible breaking of your scraper due to website structure changes is to limit your reliance on data from HTML elements as much as possible (see [API Scraping](../api_scraping/index.md) and [JavaScript objects within HTML](../../tutorials/node_js/js_in_html.md))

### IP session consistency

This technique is commonly used to entirely block the bot from accessing the website altogether. It works on the principle that every entity that accesses the site gets a token. This token is then saved together with the IP address and HTTP request information such as User-Agent and other specific headers. If the entity makes another request, but without the session token, the IP address is added on the greylist.

### Interval analysis

This technique is based on analyzing the time intervals of the visit of a website. If the times are very similar, the entity is added to the greylist. This method’s premise is that the bot runs in regular intervals by, for example, a CRON job that starts every Monday. It is a long-term strategy, so it should be used as an extension. This technique needs only the information from the HTTP request to identify the frequency of the visits.

### Browser fingerprinting

One of the most successful and advanced methods is collecting the browser's "fingerprint", which is a fancy name for information such as fonts, audio codecs, canvas fingerprint, graphics card, and more. Browser fingerprints are highly unique, so they are a reliable means of identifying a specific user (or bot). If the fingerprint provides different/inconsistent information, the user is added to the greylist.

> It's important to note that this method also blocks all users that cannot evaluate JavaScript (such as bots sending only static HTTP requests), and combines both of the fundamental methods mentioned earlier.

### Honeypots

The honeypot approach is based on providing links that only bots can see. A typical example is hidden pagination. Usually, the bot needs to go through all the pages in the pagination, so the website's last "fake" page has a hidden link for the user, but has the same selector as the real one. Once the bot visits the link, it is automatically blacklisted. This method needs only the HTTP information.


## First up {#first}

In our [first section](./techniques/index.md), we'll be discussing more in-depth about the various anti-scraping methods and techniques websites use, as well as how to mitigate these protections.
