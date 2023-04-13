---
title: IV - Apify API & client
description: Gain an in-depth understanding of the two main ways of programmatically interacting with the Apify platform - through the API, and through a client.
sidebar_position: 6.4
slug: /expert-scraping-with-apify/apify-api-and-client
---

# Apify API & client {#api-and-client}

**Gain an in-depth understanding of the two main ways of programmatically interacting with the Apify platform - through the API, and through a client.**

---

There are two main ways to programmatically interact with the Apify platform: by directly using [Apify's RESTful API](/api/v2), or by using the [JavaScript](/api/client/js) and [Python](/api/client/python) API clients. In the next two lessons, we'll be focusing on the first two.

> Apify's API and JavaScript API client allow us to do anything a regular user can do when interacting with the platform's web interface, only programmatically.

## Learning 🧠 {#learning}

- Scroll through the [Apify API docs](/api/v2) (there's a whole lot there, so you're not expected to memorize everything).
- Read about the Apify client in [Apify's docs](/api/client/js). It can also be seen on [GitHub](https://github.com/apify/apify-client-js) and [NPM](https://www.npmjs.com/package/apify-client).
- Learn about the [`Actor.newClient()`](/sdk/js/reference/class/Actor#newClient) function in the Apify SDK.
- Skim through [this article](https://help.apify.com/en/articles/2868670-how-to-pass-data-from-web-scraper-to-another-actor) about API integration (this article is old; however, still relevant).

## Knowledge check 📝 {#quiz}

1. What is the relationship between the Apify API and Apify client? Are there any significant differences?
2. How do you pass input when running actor or task via API?
3. Do you need to install the `apify-client` NPM package when already using the `apify` package?

## Our task

In the previous lesson, we created a **task** for the Amazon actor we build in the first two lessons of this course. Now, we'll be creating another new actor, which will have two jobs:

1. Programmatically call the Amazon actor.
2. Export its results into CSV format under a new key called **OUTPUT.csv** in the default key-value store.

Though it's a bit unintuitive, this is a perfect activity for learning how to use both the Apify API and the Apify JavaScript client.

The new actor should take the following input values, which be mapped to parameters in the API calls:

```json
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

[**Solution**](./solutions/using_api_and_client.md)

## Next up {#next}

[Lesson VI](./migrations_maintaining_state.md) will teach us everything we need to know about migrations and how to handle them properly to avoid losing any state; therefore, increasing the reliability of our **demo-actor** Amazon scraper.
