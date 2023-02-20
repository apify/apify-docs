---
title: Troubleshooting
description: Useful tips for debugging applications that use Apify Proxy. Check the status of your proxies and view information about the client IP address.
sidebar_position: 10.6
slug: /proxy/troubleshooting
---

# Troubleshooting {#troubleshooting}

**Useful tips for debugging applications that use Apify Proxy. Check the status of your proxies and view information about the client IP address.**

---

To view your connection status to [Apify Proxy](https://apify.com/proxy), open the URL below in the browser using the proxy:

[http://proxy.apify.com/](http://proxy.apify.com/)

If the proxy connection is working, the page should look something like this:

![Apify proxy status page](./images/proxy-status.png)

To test that your requests are proxied and IP addresses are being [rotated](../web_scraping_101/anti_scraping_techniques.md) correctly, open the following API endpoint via the proxy. It shows information about the client IP address.

[https://api.apify.com/v2/browser-info/](https://api.apify.com/v2/browser-info/)

