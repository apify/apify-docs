---
title: Google SERP proxy
description: Learn how to collect search results from Google Search-powered tools. Get search results from localized domains in multiple countries, e.g. the US and Germany.
menuWeight: 10.5
paths:
    - proxy/google-serp-proxy
---

# [](#google-serp-proxy) Google SERP proxy

Google SERP proxy allows you to extract search results from Google Search-powered services. It allows searching in [various countries](#country-selection) and to dynamically switch between country domains.

Our Google SERP proxy currently supports the below services.

* Google Search (`http://www.google.<country domain>/search`).
* Google Shopping (`http://www.google.<country domain>/search?tbm=shop`).

> Google SERP proxy can **only** be used for Google Search and Shopping. It cannot be used to access other websites.

When using the proxy, **pricing is based on the number of requests made**.

To use Google SERP proxy or for more information, [contact us](https://apify.com/contact).

## [](#connecting-to-google-serp-proxy) Connecting to Google SERP proxy

Requests made through the proxy are automatically routed through a proxy server from the selected country and pure **HTML code of the search result page is returned**.

**Important:** Only HTTP requests are allowed, and the Google hostname needs to start with the `www.` prefix.

For code examples on how to connect to Google SERP proxies, see the [examples]({{@link proxy/google_serp_proxy/examples.md}}) page.

### [](#username-parameters) Username parameters

The `username` field enables you to pass various [parameters]({{@link proxy/connection_settings.md#username-parameters}}), such as groups and country, for your proxy connection.

When using Google SERP proxy, the username should always be:

```text
groups-GOOGLE_SERP
```

Unlike [datacenter]({{@link proxy/datacenter_proxy.md}}) or [residential]({{@link proxy/residential_proxy.md}}) proxies, there is no [session]({{@link proxy/connection_settings.md#username-parameters}}) parameter.

If you use the `country` [parameter]({{@link proxy/connection_settings.md#username-parameters}}), the Google proxy location is used if you access a website whose hostname (stripped of `www.`) starts with **google**.

## [](#country-selection) Country selection

You must use the correct Google domain to get results for your desired country code.

For example:

* Search results from the USA: `http://www.google.com/search?q=<query>`


* Shopping results from Great Britain: `http://www.google.co.uk/seach?tbm=shop&q=<query>`

See a [full list](https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/List_of_Google_domains.html) of available domain names for specific countries. When using them, remember to prepend the domain name with the `www.` prefix.
