---
title: JavaScript API client
description: Full documentation of the apify-client NPM package version latest, which simplifies access to the Apify API using JavaScript / Node.js
menuWeight: 1
---

# Apify API client for JavaScript 0.5.22[](https://apify.com/docs/sdk/apify-client-js/latest)

## ApifyClient

#### new ApifyClient (options opt)


Basic usage of ApifyClient:

    const ApifyClient = require('apify-client');

    const apifyClient = new ApifyClient({
      userId: 'jklnDMNKLekk',
      token: 'SNjkeiuoeD443lpod68dk',
    });


##### Parameters:

*   **`options`** ( Object ) <optional> - Global options for ApifyClient. You can globally configure here any method option from any namespace. For example if you are working with just one crawler then you can preset it's crawlerId here instead of passing it to each crawler's method.

    *   **`userId`** ( String ) <optional> - Your user ID at apify.com
    *   **`token`** ( String ) <optional> - Your API token at apify.com
    *   **`expBackOffMillis`** ( Number ) <optional> - Wait time in milliseconds before repeating request to Apify API in a case of server or rate limit error Defaults to `500`.
    *   **`expBackOffMaxRepeats`** ( Number ) <optional> - Maximum number of repeats in a case of error Defaults to `8`.
    *   **`retryOnStatusCodes`** ( Array.<Number> ) <optional> - An array of status codes on which request gets retried. By default requests are retried only in a case of limit error (status code 429). Defaults to `[429]`.

### Methods (2)

#### getOptions() → {Object}

Returns options of ApifyClient instance.

##### Returns:

*   ( Object ) - See [ApifyClient](#ApifyClient) constructor options

#### setOptions (options)

Overrides options of ApifyClient instance.


##### Parameters:

*   **`options`** ( Object ) - See [ApifyClient](#ApifyClient) options object
