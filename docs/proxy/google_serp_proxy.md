---
title: Google SERP proxy
description: Learn how to collect search results from Google Search-powered tools. Get search results from localised domains in multiple countries, e.g. the US and Germany.
menuWeight: 7.5
paths:
    - proxy/google-serp-proxy
---

# [](#google-serp-proxy) Google SERP proxy

If you need to get search results from Google Search or other google search powered services from multiple countries with an option to dynamically switch between countries then you can use Google SERP proxy.

Requests made through the proxy are automatically routed through a proxy server from the selected country and pure **HTML code of the search result page is returned**.

Currently supported Google search services are:

*   Google Search (`http://www.google.<country domain>/search`)
*   Google Shopping (`http://www.google.<country domain>/search?tbm=shop`)

**Important:** Only HTTP requests are allowed, and the Google hostname needs to start with the `www.` prefix.

**Pricing is based on the number of requests made**. [Contact us](https://apify.com/contact) if you want to use Google SERP proxy or if you need more information.


## [](#connecting-to-google-serp-proxy) Connecting to Google SERP proxy

For code examples on how to connect to Google SERP proxies, see the [examples]({{@link proxy/google_serp_proxy/examples.md}}) page.

### [](#username-parameters) Username parameters

The **username** field enables you to pass various [parameters]({{@link proxy/connection_settings.md#username-parameters}}) for your proxy connection.

When using Google SERP proxy, the username should always be:

```
groups-GOOGLE_SERP
```

Unlike [datacenter]({{@link proxy/datacenter_proxy.md}}) or [residential]({{@link proxy/residential_proxy.md}}) proxies, there is no [session]({{@link proxy/connection_settings.md#username-parameters}}) parameter.

## [](#country-selection) Country selection

You must use the correct Google domain to get results for your desired country code.

For example:

* Search results from the USA: `http://www.google.com/search?q=<query>`

* Shopping results from Great Britain: `http://www.google.co.uk/seach?tbm=shop&q=<query>`

See a [full list](https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/List_of_Google_domains.html) of available domain names for specific countries. When using them, remember to prepend the domain name with the `www.` prefix.

## [](#using-with-puppeteer) Using with Puppeteer

Google SERP proxy cannot be used with [Puppeteer](https://pptr.dev/), due to HTTP Strict Transport Security [headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security).
