---
title: API Scraping
description: Sniff out a site's API and use it to efficiently retrieve data.
menuWeight: 20.7
paths:
    - data-collection-basics/api-scraping
---

# [](#what) What is API scraping?

Simply put, API scraping is sniffing out a website's API endpoints, and retrieving the desired data directly from their API, as opposed to parsing the data from their hydrated pages.

> Note: In this tutorial, we'll be using [SoundCloud's website](https://soundcloud.com), but the techniques described here can be applied to any site.

# [](#advantages-disadvantages) Advantages of API Scraping

## Advantages

### 1. More reliable
Since the data is coming directly from the site's API, as opposed from the parsing of HTML content based on CSS selectors, it can be relied on more, as it is less likely to change. Typically, websites change their APIs much less frequently than they change the structure/selectors of their pages.

### 2. Configurable
Most APIs accept query parameters such as `maxPosts` or `fromCountry`. These parameters can be mapped to the configuration options of the scraper, which makes creating a scraper that supports various requirements and use-cases much easier.

### 3. Fast and efficient
Especially for <a href="https://blog.apify.com/what-is-a-dynamic-page/" target="_blank">dynamic sites</a> in which a headless browser is required (which can sometimes be cumbersome), scraping their API can prove to be much quicker and more efficient.

### 4. Easy on the target website
By using a website's API instead of sending a massive amount of traffic to their pages, the target website is less likely to suffer any potential performance issues.

## Disdvantages

### 1. Sometimes requires special tokens
Many APIs will require the session cookie, an API key, or some other special value to be included within the header of the request in order to receive any data back. For certain projects, this can be a challenge.

### 2. Potential overhead
For complex APIs that require certain headers and/or payloads in order to make a successful request, return encoded data, have rate limits, or that use modern technologies such as GraphQL, there can be a slight overhead in figuring out how to utilize them in a scraper.

# [](#detecting) Detecting whether or not there is data coming from an API

A lot of times, the response object of an API call can be found within a `<script>` tag in the DOM. Let's take a look at how to find these data objects.

Using our DevTools, we can inspect our [target page](https://soundcloud.com/tiesto/tracks), or right click the page and click "View Page Source" to see the DOM. Next, we'll find a value on the page that we can predict would be in a potential API response. For our page, we'll use the "Tracks" count of `845`. On the "View Page Source" page, we'll do <kbd>⌘</kbd> + <kbd>F</kbd> and type in this value, which will show all matches for it within the DOM. This method can expose `<script>` tag objects which hold the target data.

![Find the value within the DOM using CMD + F]({{@asset data_collection_basics/images/view-845.png}})

These data objects will usually be attached to the window object (often prefixed with two uderscores - `__`). When scrolling to the beginning of the script tag on our "View Page Source" page, we see that the name of our target object is `__sc_hydration`. Heading back to DevTools and typing this into the console, the object is displayed.

![View the target data in the window object using the console in DevTools]({{@asset data_collection_basics/images/view-object-in-window.png}})

This data object could be parsed directly from the DOM and used within a scraper, however, its existence almost definitely confirms that there is an API endpoint that can be reached.

# [](#sniffing) Sniffing out API endpoints

Using the network tab

Reloading the page/clicking certain stuff to get the endpoints

IMAGE OF ENDPOINT IN NETWORK TAB

Figuring out the configuration options of the endpint

touch on "limit" and other stuff

# [](#challenges) Dealing with headers, cookies, and tokens

SoundCloud one needs a token, this token is the same for every user and changes every few weeks (based on our observations and tests)

Can make the token a configuration option of the scraper

Dealing with different response types such as JSON or HTML responses (some APIs return unstyled raw HTML components instead of JSON)

# [](#extra-challenges) Extra challenges

Will cover these more in depth later on so be short:

Base64 encoded stuff and Buffers (recommend base64 package + link to Buffer object docs)

GraphQL - queries are very specific and some namings and params have to be absolutely exact, requests have to be POST to the same URL, so need a uniqueKey for each