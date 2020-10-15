---
title: Troubleshooting
description: Useful tips for debugging applications that use Apify Proxy. Check the status of your proxies and view information about the client IP address.
menuWeight: 9.6
paths:
    - proxy/troubleshooting
---

# [](#troubleshooting) Troubleshooting

To view your connection status to [Apify Proxy](https://apify.com/proxy), open the URL below in the browser using the proxy:

[http://proxy.apify.com/](http://proxy.apify.com/)

If the proxy connection is working, the page should look something like this:

![Apify proxy status page]({{@asset proxy/images/proxy-status.png}})

To test that your requests are proxied and IP addresses are being [rotated]({{@link web_scraping_101/anti_scraping_techniques.md#bypassing-ip-address-based-blocking}}) correctly, open the following API endpoint via the proxy. It shows information about the client IP address.

[https://api.apify.com/v2/browser-info/](https://api.apify.com/v2/browser-info/)

