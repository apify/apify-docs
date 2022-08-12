---
title: API scraping
description: Learn all about how the professionals scrape various types of APIs with various configurations, parameters, and requirements.
menuWeight: 4
category: courses
paths:
    - api-scraping
---

# API scraping

API scraping is locating a website's API endpoints, and collecting the desired data directly from their API, as opposed to parsing the data from their rendered HTML pages.

> **Note:** In the next few lessons, we'll be using [SoundCloud's website](https://soundcloud.com) as an example target, but the techniques described here can be applied to any site.

In this module, we will discuss the benefits and drawbacks of API scraping, how to locate an API, how to utilize its potential features, and how to work around some common roadblocks.

## [](#what-is-api) What's an API?

An API is a custom service that lives on the server of any given website. They provide an intuitive way for the website's client-side pages to send and receive data to and from the server, where it can be stored in a database, manipulated, or used to perform an operation. Though not **all** sites have APIs, the majority do - especially modern web-applications. Learn more about APIs [in this article](https://blog.apify.com/what-is-an-api/).

## Different types of APIs

The vast majority of APIs our there are standard REST APIs that have different endpoints. Even though this is the case, it is important to be aware that newer API technologies such as [GraphQL](https://graphql.org/) are becoming more popular, and therefore more utilized in modern web applications.

A GraphQL API works differently from a standard API. All requests are `POST` requests to a single endpoint - typically `https://targetdomain.com/graphql`. Queries are passed as a payload, and are very specific (which can be difficult to deal with). Additionally, GraphQL is a language in of itself; therefore, one must at least skim their documentation for a light understanding of the technology in order to be able to effectively scrape an API that uses it.

> **Note:** these concepts will be covered more in-depth later on, but it is good to be aware of them now.

## [](#advantages) Advantages of API scraping

### 1. More reliable

Since the data is coming directly from the site's API, as opposed from the parsing of HTML content based on CSS selectors, it can be relied on more, as it is less likely to change. Typically, websites change their APIs much less frequently than they change the structure/selectors of their pages.

### 2. Configurable

Most APIs accept query parameters such as `maxPosts` or `fromCountry`. These parameters can be mapped to the configuration options of the scraper, which makes creating a scraper that supports various requirements and use-cases much easier. They can also be utilized to easily filter and/or limit data results.

### 3. Fast and efficient

Especially for [dynamic sites](https://blog.apify.com/what-is-a-dynamic-page/), in which a headless browser would otherwise be required (it can sometimes be slow and cumbersome), scraping their API can prove to be much quicker and more efficient.

### 4. Easy on the target website

Depending on the website, sending large amounts of requests to their pages could result in a slight performance decrease on their end. By using their API instead, not only does your scraper run better, but it is less demanding of the target website.

## [](#disadvantages) Disdvantages of API Scraping

### 1. Sometimes requires special tokens

Many APIs will require the session cookie, an API key, or some other special value to be included within the header of the request in order to receive any data back. For certain projects, this can be a challenge.

### 2. Potential overhead

For complex APIs that require certain headers and/or payloads in order to make a successful request, return encoded data, have rate limits, or that use modern technologies such as GraphQL, there can be a slight overhead in figuring out how to utilize them in a scraper.

<!-- These will be articles in the future -->

## [](#extra-challenges) Extra challenges

### 1. Different data formats

APIs come in all different shapes and sizes. That means every API will vary in not only the quality of the data that it returns, but also that format that it is in. The two most common formats are JSON and HTML.

JSON responses are the most ideal, as they are easily manipulatable in JavaScript code. In general, no serious parsing is necessary, and the data can be easily filtered and formatted to fit a scraper's output schema.

APIs which output HTML are generally returning the raw HTML of a small component of the page which is already hydrated with data. In these cases, it is still worth using the API, as it is still more efficient than making a request to the entire page; even though the data does still need to be parsed from the HTML response.

### 2. Encoded data

Sometimes, a response will look something like this:

```JSON
{
    "title": "Scraping Academy Message",
    "message": "SGVsbG8hIFlvdSBoYXZlIHN1Y2Nlc3NmdWxseSBkZWNvZGVkIHRoaXMgYmFzZTY0IGVuY29kZWQgbWVzc2FnZSEgV2UgaG9wZSB5b3UncmUgbGVhcm5pbmcgYSBsb3QgZnJvbSB0aGUgQXBpZnkgU2NyYXBpbmcgQWNhZGVteSE="
}
```

Or some other encoding format. This example's `message` has some data encoded in [Base64](https://en.wikipedia.org/wiki/Base64), which is one of the most common encoding types. For testing out Base64 encoding and decoding, you can use [base64encode.org](https://www.base64encode.org/) and [base64decode.org](https://www.base64decode.org/). Within a project where base64 decoding/encoding is necessary, the [Node.js Buffer Class](https://nodejs.org/api/buffer.html) can be used like so:

```JavaScript
const value = 'SGVsbG8hIFlvdSBoYXZlIHN1Y2Nlc3NmdWxseSBkZWNvZGVkIHRoaXMgYmFzZTY0IGVuY29kZWQgbWVzc2FnZSEgV2UgaG9wZSB5b3UncmUgbGVhcm5pbmcgYSBsb3QgZnJvbSB0aGUgQXBpZnkgU2NyYXBpbmcgQWNhZGVteSE='

const decoded = Buffer.from(value, 'base64').toString('utf-8')

console.log(decoded)
```

## [](#next) Next up

Get started with this course by learning some general knowledge about API scraping in the [General API Scraping]({{@link api_scraping/general_api_scraping.md}}) section! This section will teach you everything you need to know about scraping APIs before moving into more complex sections.
