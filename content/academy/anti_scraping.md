---
title: Anti-scraping protections
description: Understand the various anti-scraping measures different sites use to prevent bots from accessing them, and how to appear more human to fix these issues.
menuWeight: 4
category: web scraping & automation
paths:
- anti-scraping
---

# [](#anti-scraping-protections) Anti-scraping protections

If at any point in time you've strayed away from the Academy's demo content, and into the wild west by writing some scrapers of your own, you may have been hit with anti-scraping measures. This is extremely common in the scraping world; however, the good thing is that there are always solutions.

This section covers the essentials of mitigating anti-scraping protections, such as proxies, HTTP headers and cookies, and a few other things to consider when working on a reliable and scalable crawler. Proper usage of the methods taught in the next lessons will allow you to collect data which is specific to a certain location, enable your crawler to browse websites as a logged-in user, and more.

In development, it is crucial to check and adjust the configurations related to our next lessons' topics, as simply doing this can fix blocking issues on the majority of websites.

## [](#why-block-bots) First of all, why do websites want to block bots?

What's up with that?! There are various reasons why a website might want to block bots from accessing it. Here are a few of the main ones:

- To prevent the possibility of malicious bots from crawling the site to steal sensitive data like passwords or personal data about users.
- In order to avoid server performance hits due to bots making a large amount of requests to the website at a single time.
- To avoid their competitors to gain market insights about their business.
- To prevent bots from scraping their content and selling it to other websites or re-publishing it.
- To not skew their analytics data with bot traffic.
- If it is a social media website, they might be attempting to keep away bots programmed to mass create fake profiles (which are usually sold later).

> We recommend checking out [this article about legal and ethical ramifications of web scraping](https://blog.apify.com/is-web-scraping-legal).

Unfortunately for these websites, they have to make compromises and tradeoffs. While super strong anti-bot protections will surely prevent the majority of bots from accessing their content, there is also a higher chance of regular users being flagged as bots and being blocked as well. Because of this, different sites have different scraping-difficulty levels based on the anti-scraping measures they take.

> Going into this topic, it's important to understand that there is no one silver bullet solution to bypassing protections against bots. Even if two websites are using Cloudflare (for example), one of them might be significantly more difficult to scrape due to harsher CloudFlare configurations. It is all about configuration, not the anti-scraping tool itself.

## [](#the-principles) The principles of anti-scraping protections

Anti-scraping protections can work on many different layers and use a large amount of bot-identification techniques. There are 4 main principles that anti-scraping protections are based on:

1. **Where you are coming from** - IP address of the incoming traffic is always available to the website. Proxies are used to emulate a different IP addresses but their quality matters a lot.
2. **How you look** - With each request, the website can analyze its HTTP headers, TLS version, cyphers, and other information. Moreover, if you use a browser, the website can also analyze the whole browser fingerprint and run challenges to clasify your hardware (like graphics hardware acceleration).
3. **What you are scraping** - There are many ways to extract the same data from a website. You can just get the inital HTML or you can use a browser to render the full page or you can reverse engineer internal APIs. Each of those endpoints can be protected differently.
4. **How you behave** - The website can see patterns in how you are ordering your requests, how fast you are scraping, etc. It can also analyse browser behavior like mouse movement, clicks or key presses.

Not all websites use all of these principles but they encompass the possibilities websites have to track and block bots. All anti-scraping mitigation techniques are based on making yourself blend in with the crowd of regular users with each of these principles. 

There are two main ways a bot can be detected, which follow two different types of web scraping:

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

One thing to keep in mind while navigating through this course is that advanced scraping methods are able to identify non-humans not only by one value (such as a single header value, or IP address), but are able to identify them through more complex things such as header combinations.

> For an in-depth video explanation of anti-scraping, and how to fix issues caused by it, check out [this talk](https://www.youtube.com/watch?v=aXil0K-M-Vs) from [Ondra Urban](https://github.com/mnmkng).

## [](#common-measures) Common anti-scraping measures

Because we here at Apify scrape for a living, we have discovered many popular and niche anti-scraping techniques. We've compiled them into a short and comprehensible list here to help understand the roadblocks before this course teaches you how to get around them.

> However, not all issues you encounter are caused by anti-scraping systems. Sometimes, it's just a simple configuration issue. Learn [how to effectively debug your programs here](https://developers.apify.com/academy/node-js/analyzing-pages-and-fixing-errors).

### IP rate-limiting

This is the most straightforward and standard protection, which is mainly implemented to prevent DDOS attacks, but it also works for blocking scrapers. Websites using rating don't allow to more than some defined number of requests from one IP address in a certain time span. If the max-request number is low, then there is a high potential for false-positive due to IP address uniqueness, such as in large companies where hundreds of employees can share the same IP address.

> Learn more about rate limiting [here]({{@link anti_scraping/techniques/rate_limiting.md}})

### Header checking

This type of bot identification is based on the given fact that humans are accessing web pages through browsers, which have specific [header]({{@link concepts/http_headers.md}}) sets which they send along with every request. The most commonly known header that helps to detect bots is the `user-agent` header, which holds a value that identifies which browser is being used, and what version it's running. Though `user-agent` is the most commonly used header for the **Header checking** method, other headers are sometimes used as well. The evaluation is often also run based on the header consistency, and includes a known combination of browser headers.

### URL analysis

Solely based on the way how the bots operate. It comperes data-rich pages visits and the other pages visits. The ratio of the data-rich and regular pages has to be high to identify the bot and reduce false positives successfully.

### Regular structure changes

By definition, this is not an anti-scraping method, but it can heavily affect the reliability of a scraper. If your target website drastically changes its CSS selectors, and your scraper is heavily reliant on selectors, it could break. In principle, websites using this method change their HTML structure or CSS selectors randomly and frequently, making the parsing of the data harder, and requiring more maintenance of the bot.

One of the best ways of avoiding the possible breaking of your scraper due to website structure changes is to limit your reliance on data from HTML elements as much as possible (see [API Scraping]({{@link api_scraping.md}}) and [JavaScript objects within HTML]({{@link node_js/js_in_html.md}}))

### IP session consistency

This technique is commonly uses to entirely block the bot from accessing the website altogether. It works on the principle that every entity that accesses the site gets a token. This token is then saved together with the IP address and HTTP request information such as user-agent and other specific headers. If the entity makes another request, but without the session token, the IP address is added on the greylist.

### Interval analysis

This technique is based on analyzing the time intervals of the visit of a website. If the times are very similar, the entity is added to the greylist. This method’s premise is that the bot runs in regular intervals by, for example, a CRON job that starts every Monday. It is a long-term strategy, so it should be used as an extension. This technique needs only the information from the HTTP request to identify the frequency of the visits.

### Browser fingerprinting

One of the most successful and advanced methods is collecting the browser's "fingerprint", which is a fancy name for information such as fonts, audio codecs, canvas fingerprint, graphics card, and more. Browser fingerprints are highly unique, so they are a reliable means of identifying a specific user (or bot). If the fingerprint provides different/inconsistent information, the user is added to the greylist.

> It's important to note that this method also blocks all users that cannot evaluate JavaScript (such as bots sending only static HTTP requests), and combines both of the fundamental methods mentioned earlier.

### Honeypots

The honeypot approach is based on providing links that only bots can see. A typical example is hidden pagination. Usually, the bot needs to go through all the pages in the pagination, so the website's last "fake" page has a hidden link for the user, but has the same selector as the real one. Once the bot visits the link, it is automatically blacklisted. This method needs only the HTTP information.

### IP-session consistency

This technique is common for blocking the bot from accessing the website. It works on the principle that every entity that accesses the site gets a token. This token is then saved together with the IP address and HTTP request information such as user-agent and other specific headers. If the entity makes another request, but without the session cookie, the IP address is added on the grey list.

## [](#first) First up

In our [first section]({{@link anti_scraping/techniques.md}}), we'll be discussing more in-depth about the various anti-scraping methods and techniques websites use, as well as how to mitigate these protections.
