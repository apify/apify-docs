---
title: Anti-scraping techniques and how to bypass them
menuTitle: Anti-scraping techniques
description: Explore the basics of web scraping prevention. Get around them with IP address rotation and proxies, emulate browser signatures or shared IP address sessions.
menuWeight: 4.2
paths:
    - web-scraping-101/anti-scraping-techniques
---

# [](#introduction) Anti-scraping techniques and how to bypass them

This article introduces the principles behind anti-scraping measures to demonstrate what you are up against when scraping sites that are protective of their data. We then describe the antidotes for these defenses. You can usually get around more basic protections by doing the direct opposite.

For example, if a site is blocking your IP address, you can switch between different addresses to stop them detecting you. If a website is analyzing your behavior, make it as human-like as possible. And, if the simpler options aren't enough, don't despair - [shared IP address emulation](https://dev.to/apify/bypassing-web-scraping-protection-get-the-most-out-of-your-proxies-with-shared-ip-address-emulation-291c) (also known as [session multiplexing](https://en.wikipedia.org/wiki/Session_multiplexing)) is there for you.

## [](#ip-address-based-blocking) IP address-based blocking

A popular option some websites use is blocking access based on the IP range your address belongs to. This kind of protection aims to reduce the amount of non-human traffic. For instance, websites will deny access to [ranges of Amazon Web Services's IP addresses](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html) and other commonly known ranges.

### [](#bypassing-ip-address-based-blocking) Bypassing IP address-based blocking

To work around IP address-based blocking, web scrapers can rotate IP addresses from which they send the requests to target websites. This can be done by using a pool of [proxy servers](https://en.wikipedia.org/wiki/Proxy_server) by assigning each request another proxy server from the pool and thus making it look like a request coming from another user. The proxies can be selected either randomly or in round-robin fashion.

This method's effectiveness depends on various factors such as the number of web pages that are being scraped, the sophistication of the scraping protection and the number and type of proxies. If you send too many requests from a single proxy in too short a period of time, the proxy might get “burned”, which means all further requests from it are blocked.

For successful large-scale scrapes, it is essential to have a sufficient pool of proxies and to time the workload to maximize the scraping throughput while not burning your proxies.

[Apify Proxy]({{@link proxy.md}}) enables you to do just this using a pool of datacenter and residential proxies.

## [](#ip-rate-limiting) IP rate limiting

When crawling a website, you’ll typically send many more requests from a single IP address than a human user could generate over the same period. Websites can easily monitor how many requests they receive from a single IP address. If the number of requests exceeds a certain limit, websites can block that IP address or make you pass a [CAPTCHA](https://en.wikipedia.org/wiki/CAPTCHA) test.

### [](#bypassing-ip-rate-limiting) Bypassing IP rate limiting

There are two ways to work around rate limiting. One option is to limit how many pages on a single site you scrape concurrently, and possibly even introduce delays (after reaching the original limit). The other is to use proxy servers and rotate IP addresses after a certain number of requests.

To lower the concurrency when using the [Apify SDK](https://sdk.apify.com/docs/typedefs/basic-crawler-options#maxconcurrency), just pass the `maxConcurrency` option to your crawler's setup. If you use actors from [Apify Store](https://apify.com/store), you can usually set the maximum concurrency in the actor's input.

## [](#http-request-analysis) HTTP request analysis

Each HTTP request sent from a client to a web server contains a lot of hidden information such as
[HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers), client IP address,
[SSL/TLS](https://www.websecurity.digicert.com/security-topics/what-is-ssl-tls-https) version or a list of supported
[TLS ciphers](https://en.wikipedia.org/wiki/Cipher_suite). Even the structure of the HTTP request itself, e.g. the order of the HTTP headers, can tell whether the request comes from a real web browser or a script.

Websites can check for these signals and block requests that don’t have the signature of a known web browser or show a CAPTCHA. You can bypass this protection using only plain HTTP requests because the protection does not collect any window attributes or evaluate any JavaScript code.

### [](#bypassing-http-request-analysis) Bypassing HTTP request analysis

A straightforward way to circumvent the HTTP request analysis is to use a real web browser, such as [headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome), to emulate browser HTTP signatures. However, this can quickly become expensive since web browsers consume a lot of system resources and are generally slow.

Thankfully, it is possible to emulate browsers’ HTTP request signatures even when using a low-level HTTP request library. This will make your scripted HTTP request look like a real web browser, yet it will be much faster and more efficient. Of course, this will only work in situations where the interesting page content is served directly in the first HTML response and not loaded later using [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)).

The [Apify SDK](https://sdk.apify.com) provides a [`requestAsBrowser()` function](https://sdk.apify.com/docs/api/utils#utilsrequestasbrowseroptions), which emulates the Firefox browser's HTTP headers. This makes it hard for the target site to tell the request isn’t coming from a full browser, unless it also uses browser fingerprinting.

## [](#user-behavior-analysis) User behavior analysis

Rather than analyzing and reacting to client requests in real time, websites can collect user behavior data over longer periods and then react to it only when sufficient information is available.

Such data can contain the order in which you visit pages, how long you stay on each page, your mouse movements or even how fast you type in the form. If enough evidence indicates that the user’s behavior is not human, websites can block the client IP address or serve a CAPTCHA.

## [](#browser-fingerprinting) Browser fingerprinting

Websites can also use various techniques to test whether a client's web browser is used by a human user or a robot, and even identify repeated visits of the same web browser. This is known as [browser fingerprinting](https://pixelprivacy.com/resources/browser-fingerprinting/) and it can range from very primitive JavaScript challenges to state-of-the-art browser integrity tests and behavioral analyses.

The tests look for things like information about your browser type and version, operating system, installed browser extensions, available fonts, timezone, among others. Combined, all this information forms a browser's “fingerprint”.

While this information may seem quite generic, [Panopticlick](https://panopticlick.eff.org/) found that on average only [1 in 286,777](https://panopticlick.eff.org/static/browser-uniqueness.pdf) browsers will have the same fingerprint as you.

## [](#combinations-of-techniques) Combinations of the above techniques

To make things complicated, websites often employ various scraping protection combinations such as IP address-based blocking and HTTP request analysis.

## [](#shared-ip-address-emulation) Reducing blocking with shared IP address emulation

Even though IP address rotation and emulation of browser HTTP signatures can get you far, there is a chance that for large scale crawls you’ll start getting blocked. Of course, you can always add more proxies, but that can become overly expensive.

Shared IP address emulation can dramatically extend the effectiveness of your scraping and multiply the number of pages that you can fetch. The technique relies on websites knowing that many different users can be behind a single IP address.

For example, requests from mobile devices are usually only routed through a handful of IP addresses, while users behind a single corporate firewall might all have a single IP address. By emulating and managing these user sessions per IP address, it is possible to trick websites into limiting how aggressive their blocking is.

To make it work, you need to make sure that a single user session is always routed via the same IP address. A website can identify such user sessions based on cookies, authentication tokens or a browser HTTP signature/fingerprint.

The [Apify SDK](https://sdk.apify.com)'s [`SessionPool`](https://sdk.apify.com/docs/api/session-pool#docsNav) class lets you do just that. It is easy to add to other Apify tools such as [actors]({{@link actors.md}}) or [proxy]({{@link proxy.md}}) but also works outside of the Apify ecosystem.

## [](#comparing-techniques) Comparing ways of bypassing scraping protection

In a [recent experiment](https://dev.to/apify/bypassing-web-scraping-protection-get-the-most-out-of-your-proxies-with-shared-ip-address-emulation-291c), we found session emulation to be at least twice as effective as plain [IP address rotation](#bypassing-ip-address-based-blocking).

