---
title: Anti-scraping techniques and how to bypass them
menuTitle: Anti-scraping techniques
description: Explore anti web scraping, and methods used to bypass blocking, such as IP address rotation and proxies, emulated browser signatures, shared sessions, etc.
sidebar_position: 4.2
slug: /web-scraping-101/anti-scraping-techniques
---

# Anti-scraping techniques {#anti-scraping-techniques-and-how-to-bypass-them}

**Explore anti web scraping, and methods used to bypass blocking, such as IP address rotation and proxies, emulated browser signatures, shared sessions, etc.**

---

Many websites use anti-scraping techniques to block web scraping bots. Our research shows that there are a number of methods deployed in the field to bypass these defenses.

In many cases, we found that very simple changes in approach are commonly used. For example, if a site is blocking based on IP address, switching between different addresses is effective. If a website is analyzing behavior, making that behavior as human-like as possible will confuse the anti-scraping system. If these simpler options fail, there are more complex methods available, such as [shared IP address emulation](https://dev.to/apify/bypassing-web-scraping-protection-get-the-most-out-of-your-proxies-with-shared-ip-address-emulation-291c) (also known as [session multiplexing](https://en.wikipedia.org/wiki/Session_multiplexing)).

## IP address-based blocking {#ip-address-based-blocking}

A popular option some websites use is blocking access based on the IP range your address belongs to. This kind of protection aims to reduce the amount of non-human traffic. For instance, websites will deny access to [ranges of Amazon Web Services's IP addresses](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html) and other commonly known ranges.

### Bypassing IP address-based blocking {#bypassing-ip-address-based-blocking}

We found that web scraping can work around IP address-based blocking by rotating the IP addresses from which they send the requests to target websites. This can be done by using a pool of [proxy servers](https://en.wikipedia.org/wiki/Proxy_server) by assigning each request another proxy server from the pool and thus making it look like a request coming from another user. The proxies can be selected either randomly or in round-robin fashion.

This method's effectiveness depends on various factors, such as the number of web pages that are being scraped, the sophistication of the scraping protection and the number and type of proxies. If too many requests are sent from a single proxy in too short a period of time, the proxy might get “burned”, which means all further requests from it are blocked.

Our research determined that, for successful large-scale scraping activities, it is essential to have a sufficient pool of proxies and to time the workload to maximize the scraping throughput while burning proxies.

[Apify Proxy](../proxy/index.md) enables you to enhance your data throughput and access websites from any geographical location by using an extensive pool of datacenter and residential proxies.

## IP rate limiting {#ip-rate-limiting}

When crawling a website, a web scraping bot will typically send many more requests from a single IP address than a human user could generate over the same period. Websites can easily monitor how many requests they receive from a single IP address. If the number of requests exceeds a certain limit, websites can block that IP address or require a [CAPTCHA](https://en.wikipedia.org/wiki/CAPTCHA) test.

### Bypassing IP rate limiting {#bypassing-ip-rate-limiting}

We found that two ways are used to work around rate limiting. One method is to limit how many pages on a single site are scraped concurrently, with delays possibly even being intentionally introduced (after reaching the original limit). The other method is to use proxy servers and rotate IP addresses after a certain number of requests.

Apify actors are designed to reduce the workload on websites being scraped. To lower the concurrency when using the [Apify SDK](https://docs.apify.com/sdk/js/) and [Crawlee](https://crawlee.dev/api/basic-crawler/interface/BasicCrawlerOptions#maxConcurrency), just pass the `maxConcurrency` option to your crawler's setup. If you use actors from [Apify Store](https://apify.com/store), you can usually set the maximum concurrency in the actor's input.

## HTTP request analysis {#http-request-analysis}

Each HTTP request sent from a client to a web server contains a lot of hidden information such as
[HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers), client IP address,
[SSL/TLS](https://www.websecurity.digicert.com/security-topics/what-is-ssl-tls-https) version or a list of supported
[TLS ciphers](https://en.wikipedia.org/wiki/Cipher_suite). Even the structure of the HTTP request itself, e.g. the order of the HTTP headers, can tell whether the request comes from a real web browser or a script.

Websites can check for these signals and block requests that do not have the signature of a known web browser or show a CAPTCHA. Our research shows that this kind of protection is commonly bypassed by the use of only plain HTTP requests, because the protection does not collect any window attributes or evaluate any JavaScript code.

### Bypassing HTTP request analysis {#bypassing-http-request-analysis}

A straightforward method frequently used to circumvent HTTP request analysis is to use a real web browser, such as [headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome), to emulate browser HTTP signatures. However, this is inefficient, as web browsers consume a lot of system resources and are generally slow.

A more efficient method used is to emulate browser HTTP request signatures even when using a low-level HTTP request library. This makes the scripted HTTP request look like a real web browser, but is much faster and more efficient. Note that we found that this method only works in situations where the page content is served directly in the first HTML response and not loaded later using [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)).

To test this, we used [got-scraping](https://github.com/apify/got-scraping), which is sending browser-like requests out of the box.

## User behavior analysis {#user-behavior-analysis}

Rather than analyzing and reacting to client requests in real time, websites can collect user behavior data over longer periods and then react to it only when sufficient information is available.

Such data can contain the order in which pages are visited, how long the user stays on each page, mouse movements or even how fast forms are filled in. If enough evidence indicates that the user’s behavior is not human, websites can block the client IP address or serve a CAPTCHA.

## Browser fingerprinting {#browser-fingerprinting}

Websites can also use various techniques to test whether a client's web browser is being used by a human user or a robot, and even identify repeated visits of the same web browser. This is known as [browser fingerprinting](https://pixelprivacy.com/resources/browser-fingerprinting/), and it can range from very primitive JavaScript challenges to state-of-the-art browser integrity tests and behavioral analyses.

The tests look for things like information about your browser type and version, operating system, installed browser extensions, available fonts, timezone, among others. Combined, all this information forms a browser's “fingerprint”.

While this information may seem quite generic, [Panopticlick](https://panopticlick.eff.org/) found that on average only [1 in 286,777](https://panopticlick.eff.org/static/browser-uniqueness.pdf) browsers will have the same fingerprint as you.

## Combinations of the above techniques {#combinations-of-the-above-techniques}

To make things complicated, websites often employ various scraping protection combinations such as IP address-based blocking and HTTP request analysis.

## Reducing blocking with shared IP address emulation {#reducing-blocking-with-shared-ip-address-emulation}

IP address rotation and emulation of browser HTTP signatures can be effective for many web scraping tasks, but large-scale crawls will get blocked. Using more proxies is a solution to this, but that can be expensive.

Shared IP address emulation can dramatically extend the effectiveness of scraping and multiply the number of pages that can be fetched. The technique relies on websites knowing that many different users can be behind a single IP address.

For example, requests from mobile devices are usually only routed through a handful of IP addresses, while users behind a single corporate firewall might all have a single IP address. By emulating and managing these user sessions per IP address, we found that it is possible to prevent websites from aggressive blocking.

To make it work, a single user session has to always be routed via the same IP address. A website can identify such user sessions based on cookies, authentication tokens or a browser HTTP signature/fingerprint.

Our research into this was assisted by the [Crawlee](https://docs.apify.com/sdk/js)'s [`SessionPool`](https://crawlee.dev/api/core/class/SessionPool) class. This can be added to other Apify tools such as [actors](../actors/index.md) or [proxy](../proxy/index.md), but it also works outside the Apify ecosystem.

## Comparing ways of bypassing scraping protection {#comparing-ways-of-bypassing-scraping-protection}

In a [recent experiment](https://dev.to/apify/bypassing-web-scraping-protection-get-the-most-out-of-your-proxies-with-shared-ip-address-emulation-291c), we found session emulation to be at least twice as effective as plain [IP address rotation](#bypassing-ip-address-based-blocking).

