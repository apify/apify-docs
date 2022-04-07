---
title: Anti-Scraping Protection
description: Understand the various anti-scraping measures different websites use, and how to appear more human to fix them.
menuWeight: 4
category: courses
paths:
- anti-scraping
---

# [](#anti-scraping-protection) Anti-Scraping Protection

If at any point in time you've strayed away from the Academy's demo content, and into the wild west by writing some scrapers of your own, you may have been hit with anti-scraping measures. This is extremely common in the scraping world; however, the good thing is that there are always solutions.

This section covers the essentials of mitigating anti-scraping protections, such as proxies, HTTP headers and cookies, and a few other things to consider when working on a reliable and scalable crawler. Proper usage of the methods taught in the next lessons will allow you to collect data which is specific to a certain location, enable your crawler to browse websites as a logged-in user, and more.

In development, it is crucial to check and adjust the configurations related to our next lessons' topics, as simply doing this can fix blocking issues on the majority of websites.

## [](#the-principles) The principles of anti-scraping protections

Anti-scraping protections can work on many different layers and use a large amount of bot-identification techniques. There are two main ways a bot can be detected, which follow two different types of web-scraping:

1. Using HTTP requests
2. Using browser automation.

Once a bot is detected, there are some countermeasures a website takes to prevent it from reaccessing it. The protection techniques are divided into two main categories:

1. Uses only the information provided within the HTTP request, such as headers, IP addresses, TLC versions, ciphers, etc.
2. Uses JavaScript evaluation to collect browser fingerprint, or even track the entity behavior on the website. These JavaScript evaluations can also track mouse movement, key pressed. Based on the information gathered, they can decide if the entity is a bot or a valid user. This method is often paired with the first one.

Once one of these methods detects that the entity is a bot, it will take countermeasures depending on how advanced its techniques are.

A common workflow of a website after it has detected a bot goes as follows:

1. The bot is added to the "greylist" (a list of suspicious IP addresses, or any other value that can be used to uniquely identify the bot).
2. A [Turing test](https://en.wikipedia.org/wiki/Turing_test) is provided to the bot (captcha). If the bot succeeds, it is added to the whitelist.
3. If the captcha is failed, the bot is added to the blacklist.

One thing to keep in mind while navigating through this course is that advanced scraping methods are able to identify non-humans not only by one value (such as a single header value, or IP address), but are able to identify them through more complex things such as header combinations.

> For a visual + auditory in-depth explanation of anti-scraping, and how to fix issues caused by it, check out [this talk](https://www.youtube.com/watch?v=aXil0K-M-Vs) from Ondra Urban.

## [](#common-measures) Common Anti-Scraping Measures

### 1. Browser fingerprinting

One of the most successful methods is collecting the browser's "fingerprint", which is a fancy name for information such as fonts, audio codecs, canvas fingerprint, graphics card, and more. Browser fingerprints are highly unique, so they are a reliable means of identifying a specific user (or bot). If the fingerprint provides different/inconsistent information, the entity is added to the greylist.

> It's important to note that this method also blocks all entities that cannot evaluate JavaScript (such as bots sending only static HTTP requests), and combines both of the fundamental methods mentioned earlier.

### 2. Regular structure changes

By definition, this is not an anti-scraping method, but it can heavily affect the reliability of a scraper. If your target website drastically changes its CSS selectors, and your scraper is heavily reliant on selectors, it could break. In principle, websites using this method change their HTML structure or CSS selectors randomly and frequently, making the parsing of the data harder, and requiring more maintenance of the bot.

### 3. Interval analysis

This technique is based on analyzing the time intervals of the visit of a website. If the times are very similar, the entity is added to the greylist. This method’s premise is that the bot runs in regular intervals by, for example, a CRON job that starts every Monday. It is a long-term strategy, so it should be used as an extension. This technique needs only the information from the HTTP request to identify the frequency of the visits.

### 4. URL analysis

Solely based on the way how the bots operate. It comperes data-rich pages visits and the other pages visits. The ratio of the data-rich and regular pages has to be high to identify the bot and reduce false positives successfully.

### 5. IP session consistency

This technique is common for entirely blocking the bot from accessing the website altogether. It works on the principle that every entity that accesses the site gets a token. This token is then saved together with the IP address and HTTP request information such as user-agent and other specific headers. If the entity makes another request, but without the session cookie, the IP address is added on the grey list.

### 6. IP rate-limiting

This is the most straightforward and standard protection, which is mainly implemented to prevent DDOS attacks, but it also works for blocking scrapers. Websites using rating don't allow to more than some defined number of requests from one IP address in a certain time span. If the max-request number is low, then there is a high potential for false-positive due to IP address uniqueness, such as in large companies where hundreds of employees can share the same IP address.

> Learn more about rate limiting [here]({{@link glossary/rate_limiting.md}})

### 7. Header checking

This type of bot identification is based on the given fact that humans are accessing web pages through browsers, which have specific header sets which they send along with every request. The most commonly known header that helps to detect bots is the `user-agent` header, which holds a value that identifies which browser is being used, and what version it's running. Though `user-agent` is the most commonly used header for the **Header checking** method, other headers are sometimes used as well. The evaluation is often also run based on the header consistency, and includes a known combination of browser headers.

## [](#next) Next up

In our [first section]({{@link anti_scraping/proxies.md}}), we'll be discussing about one of the most crucial parts of web-scraping and web-automation: how to properly leverage proxies to avoid many of the anti-scraping techniques listed above.
