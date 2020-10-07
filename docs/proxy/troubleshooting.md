---
title: Troubleshooting
description: Useful tips for debugging applications that use Apify Proxy. Check the status of your proxies and view information about the client IP address.
menuWeight: 9.6
paths:
    - proxy/troubleshooting
---

# [](#troubleshooting)Troubleshooting

To view the status of the connection to Apify Proxy, open the following URL in the browser that uses the proxy:

[http://proxy.apify.com/](http://proxy.apify.com/)

If the proxy connection works well, the web page should look something like this:

![Apify proxy status page]({{@asset proxy/images/proxy-status.png}})

To test that your requests are proxied and rotate the IP addresses correctly, you can open the following API endpoint via the proxy. It shows information about the client IP address:

[https://api.apify.com/v2/browser-info/](https://api.apify.com/v2/browser-info/)

