---
title: Google SERP proxy
description: Learn how to collect search results from Google Search-powered tools. Get search results from localized domains in multiple countries, e.g. the US and Germany.
menuWeight: 9.5
paths:
    - proxy/google-serp-proxy
---

# [](#google-serp-proxy)Google SERP proxy

If you need to get search results from Google Search or other google search powered services from multiple countries with an option to dynamically switch between countries then you can use Google SERP proxy.

Requests made through the proxy are automatically routed through a proxy server from the selected country and pure **HTML code of the search result page is returned**.

Currently supported google search services are:

* Google Search (`http://www.google.<country domain>/search`)
* Google Shopping (`http://www.google.<country domain>/search?tbm=shop`)

**Important:** Only HTTP requests are allowed, and the Google hostname needs to start with `www.` subdomain.

**Pricing is based on the number of requests made**. Please [contact us](https://apify.com/contact) if you want to use Google SERP Proxy or if you need more information.

## [](#username-parameters)Username parameters

HTTP proxy username is used to pass various parameters for the proxy connection.

In the case of Google SERP proxy, the username should always look like this

    groups-GOOGLE_SERP

Unlike datacenter or residential proxies, there is no session parameter.

## [](#country-selection)Country selection

A correct google domain needs to be used to get results for the desired country code.
For example:

Search results from the US: `http://www.google.com/search?q=<query>`

Shopping results from Great Britain: `http://www.google.co.uk/seach?tbm=shop&q=<query>`

Search results from Germany: `http://www.google.de/search?q=<query>`

See [full list of available domain names](https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/List_of_Google_domains.html) for specific countries. When used, always remember to prepend the domain name with `www.` prefix.

