---
title: Troubleshooting
description: Documentation of Apify Proxy that enables anonymization of access to websites and IP rotation.
menuWeight: 7.6
---

# [](#troubleshooting)Troubleshooting

To view the status of the connection to Apify Proxy, open the following URL in the browser that uses the proxy:

[http://proxy.apify.com/](http://proxy.apify.com/)

If the proxy connection works well, the web page should look something like this:

![Apify proxy status page]({{@asset proxy/images/proxy-status.png}})

To test that your requests are proxied and rotate the IP addresses correctly, you can open the following API endpoint via the proxy. It shows information about the client IP address:

[https://api.apify.com/v2/browser-info/](https://api.apify.com/v2/browser-info/)

