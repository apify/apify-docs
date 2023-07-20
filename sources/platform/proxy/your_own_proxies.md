---
title: Using your own proxies
description: Use your own proxies while using the Apify platform.
sidebar_position: 10.5
slug: /proxy/using-your-own-proxies
---

# Using your own proxies

In addition to our proxies, you can use your own both in Apify Console and SDK.

## Custom proxies in console {#console}

To use your own proxies with Apify Console, in your actor's **Input and options** tab, scroll down and open the **Proxy and browser configuration** section. Enter your proxy URLs, and you're good to go.

![Using custom proxy in Apify Console](../images/proxy-custom.png)

## Custom proxies in SDK {#SDK}

In the Apify SDK, use the `proxyConfiguration.newUrl(sessionId)` (JavaScript) or `proxy_configuration.new_url(session_id)` (Python) command to add your custom proxy URLs to the proxy configuration. See the [JavaScript](/sdk/js/api/apify/class/ProxyConfiguration#newUrl) or [Python](/sdk/python/reference/class/ProxyConfiguration#new_url) SDK docs for more details.
