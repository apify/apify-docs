---
title: Cookies, headers, and tokens
description: Learn about how some APIs require certain cookies, headers, and/or tokens to be present in a request in order for data to be received.
sidebar_position: 2
slug: /api-scraping/general-api-scraping/cookies-headers-tokens
---

# Dealing with headers, cookies, and tokens {#challenges}

**Learn about how some APIs require certain cookies, headers, and/or tokens to be present in a request in order for data to be received.**

---

Unfortunately, most APIs will require a valid cookie to be included in the `cookie` field within a request's headers in order to be authorized. Other APIs may require special tokens, or other data that validates the request.

Luckily, there are ways to retrieve and set cookies for requests prior to sending them, which will be covered more in-depth within future Scraping Academy modules. The most important things to know at the moment are:

## Cookies {#cookies}

1. For sites that heavily rely on cookies for user-verification and request authorization, certain generic requests (such as to the website's main page, or to the target page) will return back a (or multiple) `set-cookie` header(s).
2. The `set-cookie` response header(s) can be parsed and used as the `cookie` header in the headers of a request. A great package for parsing these values from a response's headers is [`set-cookie-parser`](https://www.npmjs.com/package/set-cookie-parser). With this package, cookies can be parsed from headers like so:

```js
const axios = require('axios');

// import the set-cookie-parser module
const setCookieParser = require('set-cookie-parser');

const getCookie = async () => {
    // make a request to the target site
    const response = await axios.get('https://www.example.com/');

    // parse the cookies from the response
    const cookies = setCookieParser.parse(response);

    // format the parsed data into a usable string
    const cookieString = cookies.map(({ name, value }) => `${name}=${value};`).join(' ');

    // log the final cookie string to be used in a 'cookie' header
    console.log(cookieString);
};

getCookie();
```

## Headers {#headers}

Other APIs may not require a valid cookie header, but instead will require certain headers to be attached to the request which are typically attached when a user makes a "real" request from a browser. The most commonly required headers are:

- `User-Agent`
- `Referer`
- `Origin`
- `Host`

Headers required by the target API can be configured manually in a manner such as this, and attached to every single request the scraper sends:

```js
const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 YaBrowser/22.1.0.2500 Yowser/2.5 Safari/537.36',
    Referer: 'https://soundcloud.com',
    ...
}
```

However, a much better option is to use either a custom implementation of generating random headers for each request, or to use a package such as [`got-scraping`](https://www.npmjs.com/package/got-scraping) to automatically do this.

With `got-scraping`, generating request-specific headers can be done right within a request with `headerGeneratorOptions`. Specific headers can also be set with the `headers` option:

```js
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

## Tokens {#tokens}

For our SoundCloud example, testing the endpoint from the previous section in a tool like [Postman](../../../glossary/tools/postman.md) works perfectly, and returns the data we want; however, when the `client_id` parameter is removed, we receive a **401 Unauthorized** error. Luckily, the Client ID is the same for every user, which means that it is not tied to a session or an IP address (this is based on our own observations and tests). The big downfall is that the token being used by SoundCloud changes every few weeks, so it shouldn't be hardcoded. This case is actually quite common, and is not only seen with SoundCloud.

Ideally, this `client_id` should be scraped dynamically, especially since it changes frequently, but unfortunately, the token cannot be found anywhere on SoundCloud's pages. We already know that it's available within the parameters of certain requests though, and luckily, [Puppeteer](https://github.com/puppeteer/puppeteer) offers a simple way to analyze each response when on a page. It's a bit like using browser DevTools, which you are already familiar with by now, but programmatically instead.

Here is a way you could dynamically scrape the `client_id` using Puppeteer:

```js
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

## Next up {#next}

Keep the code above in mind, because we'll be using it in the [next lesson](./handling_pagination.md) when paginating through results from SoundCloud's API.
