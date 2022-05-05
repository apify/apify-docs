---
title: V - Apify API & client
description: Gain an in-depth understanding of the two main ways of programmatically interacting with the Apify platform - throught the API, and through a client.
menuWeight: 6.5
paths:
    - expert-scraping-with-apify/apify-api-and-client
---

# [](#api-and-client) Apify API & client

There are two main ways to programmatically interact with the Apify platform: by directly using [Apify's RESTful API](https://docs.apify.com/api/v2), or by using the [JavaScript](https://docs.apify.com/apify-client-js) and [Python](https://docs.apify.com/apify-client-python) API clients. In the next two lessons, we'll be focusing on the first two.

> Apify's API and JavaScript API client allow us to do anything a regular user can do when interacting with the platform's web interface, only programmatically.

## [](#learning) Learning 🧠

- Scroll through the [Apify API docs](https://docs.apify.com/api/v2) (there's a whole lot there, so you're not expected to memorize everything).
- Read about the Apify client in [Apify's docs](https://docs.apify.com/apify-client-js). It can also be seen on [Github](https://github.com/apify/apify-client-js) and [NPM](https://www.npmjs.com/package/apify-client).
- Learn about the [`Apify.newClient()`](https://sdk.apify.com/docs/api/apify#apifynewclientoptions) function in the SDK.
- Skim through [this article](https://help.apify.com/en/articles/2868670-how-to-pass-data-from-web-scraper-to-another-actor) about API integration (this article is old; however, still relevant).

## [](#quiz) Knowledge check 📝

1. What is the relationship between the Apify API and Apify client? Are there any significant differences?
2. How do you pass input when running actor or task via API?
3. Do you need to install the `apify-client` NPM package when already using the `apify` package?

## Our task

In the previous lesson, we created a **task** for the Amazon actor we build in the first two lessons of this course. Now, we'll be creating another new actor, which will have two jobs:

1. Programmatically call the Amazon actor.
2. Export its results into CSV format under a new key called **OUTPUT.csv** in the default key-value store.

Though it's a bit unintuitive, this is a perfect activity for learning how to use both the Apify API and the Apify JavaScript client.

The new actor should take the following input values, which be mapped to parameters in the API calls:

```JSON
{
    // How much memory to allocate to the Amazon actor
    // Must be a power of 2
    "memory": 4096,

    // Whether to use the JavaScript client to make the
    // call, or to use the API
    "useClient": false,

    // The fields in each item to return back. All other
    // fields should be ommitted
    "fields": ["title", "itemUrl", "offer"],

    // The maximum number of items to return back
    "maxItems": 10
}
```

[**Solution**]({{@link expert_scraping_with_apify/solutions/using_api_and_client.md}})

## [](#next) Next up

[Lesson VI]({{@link expert_scraping_with_apify/migrations_maintaining_state.md}}) will teach us everything we need to know about migrations and how to handle them properly to avoid losing any state; therefore, increasing the reliability of our **demo-actor** Amazon scraper.
