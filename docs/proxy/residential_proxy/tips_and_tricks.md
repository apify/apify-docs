---
title: Tips and tricks
menuTitle: Tips and tricks
description: Documentation of Apify Proxy that enables anonymization of access to websites and IP rotation.
paths:
    - proxy/residential-proxy/tips-and-tricks
---

# [](#tips-and-tricks)Tips and tricks

Since Residential proxy is less predictable than datacenter proxy and is priced differently (by number of IPs vs traffic used), there are some important things that need to be considered before you use the Residential proxy in your solutions.

## The traffic used by automated browsers needs to be controlled

Since Residential proxy is priced by data traffic used, it's very easy to realy quickly use up all prepaid traffic, especialy when accessing websites with large files loaded on every page.

There are two main ways to reduce the traffic use of your solutions:

*   [Block requests which are not required for your solution](https://help.apify.com/en/articles/2423246-block-requests-in-puppeteer)
*   [Cache responses that you require but do not wish to load again and again](https://help.apify.com/en/articles/2424032-cache-responses-in-puppeteerr)

When both of these options are combined, the data traffic of your solution can be reduced dramatically.

## The speed of connected proxy can vary greatly

Each host on the Residential proxy network uses a different device, has different network speed and different latencies. This means that request made with one session can be extremely fast, while another request with different session can be extremely slow. The difference can be from a few milliseconds to a few seconds.

If your solution requires quickly loaded content, the best option is to set session, try a small request and see if the response time is acceptable. If it is, you can use this session for other requests. Otherwise, repeat the attempt with a different session.  
Just remember that sessions are not persistent, so from time to time, you will have to reevaluate the speed of the session and switch to a different one if needed.

## Connections can be interrupted

For this problem there is no easy solution, so either do not use the Residential proxy for larger requests or if you have no choice, expect that interruptions might happen and write your solution with this situation in mind.

