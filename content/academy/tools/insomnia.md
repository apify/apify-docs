---
title: Insomnia
description: Learn about Insomnia, a simple yet super valuable tool for testing requests and proxies when building scalable web scrapers.
menuWeight: 9.2
paths:
    - tools/insomnia
---

# [](#what-is-insomnia) What is Insomnia?

Despite its name, the [Insomnia](https://insomnia.rest/download) desktop application has absolutely nothing to do with having a lack of sleep. Rather, it is a tool to build and test APIs. If you've already read about [Postman]({{@link tools/postman.md}}), you already know what Insomnia can be used for, as they both do practically the same exact things. There are some small differences between them, though. Like Postman, Insomnia allows you to send requests with specific headers and cookies, to add a request payload, etc. One difference is that Insomnia also allows you to see the whole timeline of the request.

Insomnia can be downloaded from its [official website](https://insomnia.rest/download), and its features can be read about in the [official documentation](https://docs.insomnia.rest/).

## [](#insomnia-interface) The Insomnia interface

After opening the app, you'll first need to create a new request. After creating the request, you'll see an interface that looks like this:

![Insomnia interface]({{@asset tools/images/insomnia-interface.webp}})

Let's break down the main sections:

### List of requests

You can configure multiple request with a custom payload, headers, cookies, parameters, etc. They are automatically saved in the list of requests until deleted.

### Address bar

The place where you select the type of request to send (**GET**, **POST**, **PUT**, **DELETE**, etc.), specify the URI of the request, and send the request with the **Send** button.

### Request options

Here, you can add a request payload, specify authorization parameters, add query parameters, and attach headers to the request.

### Response

Where the response body is displayed after the request has been sent. Like in Postman, the request can be viewed in preview mode, pretty-printed, or in its raw form. This section also has the **Headers** and **Cookies** tabs, which respectively show the request headers and cookies.

## [](#request-timeline) Request timeline

The one feature of Insomnia that separates it from Postman is the **Timeline**.

![Request timeline]({{@asset tools/images/insomnia-timeline.webp}})

This feature allows you to see information about the request that is not present in the response body.

## [](#using-proxies) Using proxies in Insomnia

In order to use a proxy, you need to specify the proxy's parameters in Insomnia's preferences. In preferences, scroll down to the **HTTP Network Proxy** section under the **General** tab and specify the full proxy URL there:

![Configuring a proxy]({{@asset tools/images/insomnia-proxy.webp}})

## [](#managing-cookies-cache) Managing the cookies cache

Insomnia keeps the cookies for the requests you have already sent before. This might result in you receiving a difference response within your scraper from what you're receiving in Insomnia, as a necessary cookie is not present in the request sent by the scraper. To check whether or not some cookies associated with a certain request have been cached, click on the **Cookies** button at top of the list of requests:

![Click on the "Cookies" button]({{@asset tools/images/insomnia-cookies.webp}})

This'll bring up the **Manage cookies** window, where all cached cookies can be viewed, edited, or deleted.

![The "Manage Cookies" tab]({{@asset tools/images/insomnia-manage-cookies.webp}})

## [](#postman-or-insomnia) So, Postman or Insomnia?

The application you choose to use is completely up to personal preference, and will not affect your development workflow. If viewing timelines of the requests you send is important to you, then you should go with Insomnia; however, if that doesn't matter, just choose the one that has the most intuitive interface for you.
