---
title: HTTP headers
description: Understand what HTTP headers are, what they're used for, and three of the biggest differences between HTTP/1.1 and HTTP/2 headers.
menuWeight: 8.1
paths:
- concepts/http-headers
---

# [](#headers) HTTP headers

[HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) let the client and the server pass additional information with an HTTP request or response. Headers are represented by an object where the keys are header names. Headers can also contain certain authentication tokens.

In general, there are 4 different paths you'll find yourself on when scraping a website and dealing with headers:

## [](#no-headers) No headers

For some websites you won't need to worry about modifying headers at all, as there are no checks or verifications in place.

## [](#needs-default-headers) Some default headers required

Some websites will require certain default browser headers to work properly, such as **User-Agent** (though, this header is becoming more obsolete, as there are more sophisticated ways to detect and block a suspicious user).

Another example of such a "default" header is **Referer**. Some e-commerce websites might share the same platform, and data is loaded through XMLHttpRequests to that platform, which simply would not know which data to return without knowing which exact website is requesting it.

## [](#needs-custom-headers) Custom headers required

A custom header is a non-standard HTTP header used for a specific website. For example, an imaginary website of **cool-stuff.com** might have a header with the name **X_Cool_Stuff_Token** which is required for every single request to a product page.

Dealing with cases like these usually isn't difficult, but can sometimes be tedious.

## [](#needs-specific-headers) Very specific headers required

The most challenging websites to scrape are the ones that require a full set of site-specific headers to be included with the request. For example, not only would they potentially require proper **User-Agent** and **Referer** headers mentioned above, but also **Accept**, **Accept-Language**, **Accept-Encoding**, etc. with specific values.

Another big one to mention is the **Cookie** header. We cover this in more detail within the [cookies]({{@link concepts/http_cookies.md}}) lesson.

You could use Chrome DevTools to inspect request headers, and [Insomnia]({{@link tools/insomnia.md}}) or [Postman]({{@link tools/postman.md}}) to test how the website behaves with or without specific headers.

## [](#http1-vs-http2) HTTP/1.1 vs HTTP/2 headers

There are some differences between HTTP/1.1 and HTTP/2 headers. We won't cover all the differences in this lesson, but you should overall keep these three in mind:

1. There are no status messages in HTTP/2 headers (only status codes).
2. Certain headers are no longer used in HTTP/2 (such as **Connection** along with few other related to it like **Keep-Alive**). In HTTP/2, connection-specific headers are prohibited. While some browsers will simply ignore them, Safari and other webkit-based browsers will outright reject any response that contains them. Easy to do by accident, and a big problem.
3. While HTTP/1.1 headers are case-insensitive and could be sent by the browsers with the capitalized letters (e.g. **Accept-Encoding**, **Cache-Control**, **User-Agent**), HTTP/2 headers are must be lower-cased (e.g. **accept-encoding**, **cache-control**, **user-agent**).

> To learn more about the difference between HTTP/1.1 and HTTP/2 headers, check out [this](https://httptoolkit.tech/blog/translating-http-2-into-http-1/) article
