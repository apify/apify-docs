---
title: Tips and tricks
description: Helpful tips for using your application with Apify's residential proxies. Control traffic, deal with interrupted connections and manage expenses.
paths:
    - proxy/residential-proxy/tips-and-tricks
---

# [](#tips-and-tricks) Tips and tricks

[Residential]({{@link proxy/residential_proxy.md}}) proxies are less predictable than [datacenter]({{@link proxy/datacenter_proxy.md}}) proxies and are priced differently (by number of IPs vs traffic used). Because of this, there are some important things to consider before using residential proxy in your solutions.

## [](#control-traffic-used-by-automated-browsers) Control traffic used by automated browsers

Residential proxy is priced by data traffic used. Thus, it's easy to quickly use up all your prepaid traffic. In particular, when accessing websites with large files loaded on every page.

To reduce your traffic use, we recommend using the Apify SDK's `blockRequests()` [function](https://sdk.apify.com/docs/api/puppeteer#puppeteerblockrequestspage-options). 

## [](#connected-proxy-speed-variation) Connected proxy speed variation

Each host on the residential proxy network uses a different device. They have different network speeds and different latencies. This means that requests made with one [session]({{@link proxy.md#sessions}}) can be extremely fast, while another request with a different session can be extremely slow. The difference can range from a few milliseconds to a few seconds.

If your solution requires quickly loaded content, the best option is to set a [session]({{@link proxy.md#sessions}}), try a small request and see if the response time is acceptable. If it is, you can use this session for other requests. Otherwise, repeat the attempt with a different session.

## [](#connection-interruptions) Connection interruptions

While sessions are persistent, they can be destroyed at any time if the host devices are turned off or disconnected.

For this problem there is no easy solution. One option is to not use residential proxy for larger requests (instead use [datacenter]({{@link proxy/datacenter_proxy.md}}) proxy). If you have no other choice, expect that interruptions might happen and write your solution with this in mind.
