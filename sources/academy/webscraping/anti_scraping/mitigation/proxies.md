---
title: Proxies
description: Learn all about proxies, how they work, and how they can be leveraged in a scraper to avoid blocking and other anti-scraping tactics.
sidebar_position: 1
slug: /anti-scraping/mitigation/proxies
---

# Proxies {#about-proxies}

**Learn all about proxies, how they work, and how they can be leveraged in a scraper to avoid blocking and other anti-scraping tactics.**

---

A proxy server provides a gateway between users and the internet, to be more specific in our case - between the crawler and the target website.

Many websites have [rate-limiting](../techniques/rate_limiting.md) set up, which is when a website **limits** the **rate** at which requests can be sent from a single IP address. In cases when a higher number of requests is expected for the crawler - using a proxy is essential to let the crawler run as smoothly as possible and avoid being blocked.

The following factors determine the quality of a proxy IP:

- How many users share the same proxy IP address?
- How did the previous user use (or overuse) the proxy?
- How long was the proxy left to "heal" before it was resold?
- What is the quality of the underlying server of the proxy? (latency)

Although IP quality is still the most important factor when it comes to using proxies and avoiding anti-scraping measures, nowadays it's not just about avoiding rate-limiting, which brings new challenges for scrapers that can no longer rely on IP rotation. Anti-scraping software providers, such as CloudFlare, have global databases of "suspicious" IP addresses. If you are unlucky, your newly bought IP might be blocked even before you use it. If the previous owners overused it, it might have already been marked as suspicious in many databases, or even (very likely) was blocked altogether. If you care about the quality of your IPs, use them as a real user, and any website will have a hard time banning them completely.

Fixing rate-limiting issues is only the tip of the iceberg of what proxies can do for your scrapers, though. By implementing proxies properly, you can successfully avoid the majority of anti-scraping measures listed in the [previous lesson](../index.md).

## About proxy links {#understanding-proxy-links}

To use a proxy, you need a proxy link, which contains the connection details, sometimes including credentials.

```text
http://proxy.example.com:8080
```

The proxy link above has several parts:

- `http://` tells us we're using HTTP protocol,
- `proxy.example.com` is a hostname, i.e. an address to the proxy server,
- `8080` is a port number.

Sometimes the proxy server has no name, so the link contains an IP address instead:

```text
http://123.456.789.10:8080
```

If proxy requires authentication, the proxy link can contain username and password:

```text
http://USERNAME:PASSWORD@proxy.example.com:8080
```

## Proxy rotation {#proxy-rotation}

Web scrapers can implement a method called "proxy rotation" to **rotate** the IP addresses they use to access websites. Each request can be assigned a different IP address, which makes it appear as if they are all coming from different users in different location. This greatly enhances performance, and is a major factor when it comes to making a web scraper appear more human.

## Next up {#next}

Proxies are one of the most important things to understand when it comes to mitigating anti-scraping techniques in a scraper. Now that you're familiar with what they are, the next lesson will be teaching you how to configure your crawler in Crawlee to use and automatically rotate proxies. [Let's get right into it!](./using_proxies.md)
