---
title: API Scraping
description: Learn the benefits and drawbacks of API scraping, how to locate an API, how to utilize its features, and how to work around common roadblocks.
menuWeight: 3.1
paths:
    - advanced-web-scraping/api-scraping
---

# What is API scraping?

Simply put, API scraping is locating a website's API endpoints, and collecting the desired data directly from their API, as opposed to parsing the data from their rendered HTML pages.

> **Note:** In this tutorial, we'll be using [SoundCloud's website](https://soundcloud.com) as an example target, but the techniques described here can be applied to any site.

In this module, we will discuss the benefits and drawbacks of API scraping, how to locate an API, how to utilize its potential features, and how to work around some common roadblocks.

## [](#advantages) Advantages of API Scraping

### 1. More reliable

Since the data is coming directly from the site's API, as opposed from the parsing of HTML content based on CSS selectors, it can be relied on more, as it is less likely to change. Typically, websites change their APIs much less frequently than they change the structure/selectors of their pages.

### 2. Configurable

Most APIs accept query parameters such as `maxPosts` or `fromCountry`. These parameters can be mapped to the configuration options of the scraper, which makes creating a scraper that supports various requirements and use-cases much easier. They can also be utilized to easily filter and/or limit data results.

### 3. Fast and efficient

Especially for [dynamic sites](https://blog.apify.com/what-is-a-dynamic-page/), in which a headless browser is required (which can sometimes be slow and cumbersome), scraping their API can prove to be much quicker and more efficient.

### 4. Easy on the target website

Depending on the website, sending large amounts of requests to their pages could result in a slight performance decrase on their end. By using their API instead, not only does your scraper run better, but it is less demanding of the target website.

## [](#disadvantages) Disdvantages of API Scraping

### 1. Sometimes requires special tokens

Many APIs will require the session cookie, an API key, or some other special value to be included within the header of the request in order to receive any data back. For certain projects, this can be a challenge.

### 2. Potential overhead

For complex APIs that require certain headers and/or payloads in order to make a successful request, return encoded data, have rate limits, or that use modern technologies such as GraphQL, there can be a slight overhead in figuring out how to utilize them in a scraper.

## [](#locating-endpoints) Locating API endpoints

In order to retrive a website's API endpoints, as well as other data about them, the **Network** tab within Chrome's (or another browser's) DevTools can be used. This tab allows you to see the all of the various network requests being made, and even allows you to filter them based on request type, response type, or by a keyword.

On our target page, we'll open up the Network tab, and filter by request type of `Fetch/XHR`, as opposed to the default of `All`. Next, we'll do some action on the page which causes the request for the target data to be sent, which will enable us to view the request in DevTools. The types of actions that need to be done can vary depending on the website, the type of page, and the type of data being returned. Sometimes, reloading the page is enough, while other times, a button must be clicked, or the page must be scrolled. For our example use case, reloading the page is sufficient.

_Here's what we can see see in the Network tab after reloading the page:_

![Network tab results after completing an action on the page which results in the API being called]({{@asset advanced_web_scraping/images/results-in-network-tab.webp}})

Let's say that our target data is a full list of Tiësto's uploaded songs on SoundCloud. We can use the **Filter** option to search for the keyword `tracks`, and see if any endpoints have been hit that include that word. Multiple results may still be in the list when using this feature, so it is important to carefully examine the payloads and responses of each request in order to ensure that the correct one is found.

> **Note:** The keyword/piece of data that is used in this filtered search should be a target keyword or a piece of target data that that can be assumed will most likely be a part of the endpoint.

After a little bit of digging through the different response values of each request in our filtered list within the Network tab, we can discover this endpoint, which returns a JSON list including 20 of Tiësto's latest tracks:

![Endpoint found in the Network tab]({{@asset advanced_web_scraping/images/endpoint-found.webp}})

## [](#learning-the-api) Learning the API

The majority of APIs, especially for popular sites that serve up large amounts of data, are configurable through different parameters, query options, or payload values. A lot of times, an endpoint discovered through the Network tab will reveal at least a few of these options.

Here's what our target endpoint's URL looks like coming directly from the Network tab:

```text
https://api-v2.soundcloud.com/users/141707/tracks?representation=&client_id=zdUqm51WRIAByd0lVLntcaWRKzuEIB4X&limit=20&offset=0&linked_partitioning=1&app_version=1646987254&app_locale=en
```

Since our request doesn't have any body/payload, we just need to analyze the URL. We can break this URL down into chunks that help us understand what each value does.

![Breaking down the request url into understandable chunks]({{@asset advanced_web_scraping/images/analyzing-the-url.webp}})

Understanding an API's various configurations helps with creating a game-plan on how to best scrape it, as many of the parameters can be utilized for easy pagination, or easy data-filtering. Additionally, these values can be mapped to a scraper's configuration options, which overall makes the scraper more versatile.

Let's say we want to receive all of the user's tracks in one request. Based on our observations of the endpoint's different parameters, we can modify the URL and utilize the `limit` option to return more than just twenty songs. The `limit` option is extremely common with most APIs, and allows the person making the request to literally limit the maximum number of results to be returned in the request:

```text
https://api-v2.soundcloud.com/users/141707/tracks?client_id=zdUqm51WRIAByd0lVLntcaWRKzuEIB4X&limit=99999
```

By using the ridiculously large number of `99999`, we ensure that all of the user's tracks will be captured in this single request. Luckily, with SoundCloud's API, there is no cap to the `limit` parameter; however, most other APIs will have a limit to ensure that hundreds of thousands of results aren't retrieved at one time. For this use-case, setting a massive results limit is not much of a risk, as most users don't have a track-count over 500 anyways, but receiving too many results at once can result in overflow errors.

## [](#challenges) Dealing with headers, cookies, and tokens

Unfortunately, most APIs will require a valid cookie to be included in the `cookie` field within a request's headers in order to be authorized. Other APIs may require special tokens, or other data that validates the request.

Luckily, there are ways to retrive and set cookies for requests prior to sending them, which will be covered more in-depth within future Scraping Academy modules. The most important things to know at the moment are:

1. For sites that heavily rely on cookies for user-verification and request authorization, certain generic requests (such as to the website's main page, or to the target page) will return back a (or multiple) `set-cookie` header(s).
2. The `set-cookie` response header(s) can be parsed and used as the `cookie` header in the headers of a request. A great package for parsing these values from a response's headers is [`set-cookie-parser`](https://www.npmjs.com/package/set-cookie-parser). With this package, cookies can be parsed from headers like so:

```JavaScript
const axios = require('axios');

// import the set-cookie-parser module
const setCookieParser = require('set-cookie-parser');

const getCookie = async () => {
    // make a request to the target site
    const response = await axios.get('https://www.zillow.com/');

    // parse the cookies from the response
    const cookies = setCookieParser.parse(response);

    // format the parsed data into a usable string
    const cookieString = cookies.map(({ name, value }) => `${name}=${value};`).join(' ');

    // log the final cookie string to be used in a 'cookie' header
    console.log(cookieString);
};

getCookie();
```

Other APIs may not require a valid cookie header, but instead will require certain headers to be attached to the request which are typically attached when a user makes a "real" request from a browser. The most commonly required headers are:

- `User-Agent`
- `Referer`
- `Origin`
- `Host`

Headers required by the target API can be configured manually in a manner such as this, and attached to every single request the scraper sends:

```JavaScript
const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 YaBrowser/22.1.0.2500 Yowser/2.5 Safari/537.36',
    Referer: 'https://soundcloud.com',
    ...
}
```

However, a much better option is to use either a custom implementation of generating random headers for each request, or to use a package such as [`got-scraping`](https://www.npmjs.com/package/got-scraping) to automatically do this.

With `got-scraping`, generating request-specific headers can be done right within a request with `headerGeneratorOptions`. Specific headers can also be set with the `headers` option:

```JavaScript
const response = await gotScraping({
    url: 'https://example.com',
    headerGeneratorOptions: {
        browsers: [
            {
                name: 'chrome',
                minVersion: 87,
                maxVersion: 89
            }
        ],
        devices: ['desktop'],
        locales: ['de-DE', 'en-US'],
        operatingSystems: ['windows', 'linux'],
    },
    headers: {
        'some-header': 'Hello, Academy!'
    }
})
```

For our SoundCloud example, testing the endpoint from the previous section in a tool like [Postman]({{@link glossary/postman.md}}) works perfectly, and returns the data we want; however, when the `client_id` parameter is removed, we receive a **401 Unauthorized** error. Luckily, the Client ID is the same for every user, which means that it is not tied to a session or an IP address (this is based on our own observations and tests). The big downfall is that the token being used by SoundCloud changes every few weeks, so it shouldn't be hardcoded. This case is actually quite common, and is not only seen with SoundCloud.

Ideally, this `client_id` should be scraped dynamically, especially since it changes frequently, but unfortunately, the token cannot be found anywhere on SoundCloud's pages. We already know that it's available within the parameters of certain requests though, and luckily, [Puppeteer](https://github.com/puppeteer/puppeteer) offers a simple way to analyze each response when on a page. It's a bit like using browser DevTools, which you are already familiar with by now, but programatically instead.

Here is a way you could dynamically scrape the `client_id` using Puppeteer:

```JavaScript
// import the puppeteer module
const puppeteer = require('puppeteer');

const scrapeClientId = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // initialize a variable that will eventually hold the client_id
    let clientId = null;

    // handle each response
    page.on('response', async (res) => {
        // try to grab the 'client_id' parameter from each URL
        const id = new URL(res._url).searchParams.get('client_id') ?? null;

        // if the parameter exists, set our clientId variable to the newly parsed value
        if (id) clientId = id;
    });

    // visit the page
    await page.goto('https://soundcloud.com/tiesto/tracks');

    // wait for a selector that ensures the page has time to load and make requests to its API
    await page.waitForSelector('.sc-classic');

    await browser.close();
    console.log(clientId); // log the retrieved client_id
};

scrapeClientId();
```

## [](#extra-challenges) Extra challenges

### 1. Different data formats

APIs come in all different shapes and sizes. That means every API will vary in not only the quality of the data that it returns, but also that format that it is in. The two most common formats are JSON and HTML.

JSON responses are the most ideal, as they are easily manipulatable in JavaScript code. In general, no serious parsing is necessary, and the data can be easily filtered and formatted to fit a scraper's output schema.

APIs which ouput HTML are generally returning the raw HTML of a small component of the page which is already hydrated with data. In these cases, it is still worth using the API, as it is still more efficient than making a request to the entire page; even though the data does still need to be parsed from the HTML response.

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

### 3. Different types of APIs

The vast majority of APIs our there are standard REST APIs that have different endpoints. Even though this is the case, it is important to be aware that newer API technologies such as [GraphQL](https://graphql.org/) are becoming more popular, and therefore more utilized in modern web applications.

A GraphQL API works differently from a standard API. All requests are `POST` requests to a single endpoint - typically `https://targetdomain.com/graphql`. Queries are passed as a payload, and are very specific (which can be difficult to deal with). Additionally, GraphQL is a language in of itself; therefore, one must at least skim their documentation for a light understanding of the technology in order to be able to effectively scrape an API that uses it.

> **Note:** these concepts will be covered more in-depth later on, but it is good to be aware of them now.

## [](#next) Next up...

In the next lesson we will look at a great complement to API scraping. Extracting data from JSON objects that were sent along with other resources - like the page's initial HTML. This can often simplify your life and save you from using a browser on a dynamic website. [Let's get to it]({{@link advanced_web_scraping/js_in_html.md}}).
