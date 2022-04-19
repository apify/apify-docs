---
title: Apify API
description: Learn how to use the Apify API to programmatically call your actors, retrieve data stored on the platform, view actor logs, and more!
menuWeight: 4
paths:
- apify-platform/getting-started/apify-api
---

# [](#the-apify-api) The Apify API

[Apify's API](https://docs.apify.com/api/v2#/reference) is your ticket to the Apify platform without even needing to access the [Apify Console](https://console.apify.com) web-interface. The API is organized around RESTful HTTP endpoints.

In this lesson, we'll be learning how to use the Apify API to call an actor and view its results. We'll be using the actor we created in the previous lesson, so if you haven't already gotten that one set up, go ahead do  that before moving forward if you'd like to follow along.

## [](#finding-your-endpoint) Finding your endpoint

So, we want to run our **adding-actor** via API and view its results in CSV format at the end. After looking through the [Apify API reference](https://docs.apify.com/api/v2#/reference), we've found that we can in fact [run an actor synchronously and get its dataset items](https://docs.apify.com/api/v2#/reference/actors/run-actor-synchronously-and-get-dataset-items/run-actor-synchronously-with-input-and-get-dataset-items). The endpoint looks like this:

```text
https://api.apify.com/v2/acts/actorId/run-sync-get-dataset-items
```

The endpoint itself can take many different parameters that determine how the actor is run, and the format of the results which will be returned in the response. Firstly though, we have to worry about the **actorId** part of the URL, which must be replaced with the ID of the actor we'd like to run. Let's navigate to our actor's **Settings** tab and copy the **ID** from there:

![The actor's ID is available in the "Settings" tab]({{@asset apify_platform/getting_started/images/actor-settings-id.webp}})

Great! Now, our URL looks like this:

```text
https://api.apify.com/v2/acts/2bmkwWmp8fJkYzxqp/run-sync-get-dataset-items
```

Let's make the request using [Insomnia]({{@link tools/insomnia.md}}) now!

![API authentication error]({{@asset apify_platform/getting_started/images/api-error.webp}})

If you also received an error, this was **not** a mistake.

## [](#parameters) Parameters

Since the actor we're using for this lesson is private, we must provide our API token as a parameter in order to prove that we have access to the actor we're trying to call. Your token can be retrieved by navigating to the [Apify Console](https://console.apify.com), clicking on **Settings**, then clicking on **Integrations** and copying the **Personal API Token**.

![Integrations tab on the Apify Platform]({{@asset apify_platform/deploying/images/settings-integrations.webp}})

Now, we should pass the token as a parameter:

```text
https://api.apify.com/v2/acts/2bmkwWmp8fJkYzxqp/run-sync-get-dataset-items?token=YOUR_TOKEN_HERE
```

Finally, since we want to get the results in CSV format instead of the default JSON format, we can pass the **format** parameter as well:

```text
https://api.apify.com/v2/acts/2bmkwWmp8fJkYzxqp/run-sync-get-dataset-items?token=YOUR_TOKEN_HERE&format=csv
```

Finally, we'll send the request again with the new URL we've constructed.

![API response]({{@asset apify_platform/getting_started/images/api-csv-response.webp}})

And there it is! The actor was run with our inputs of **num1** and **num2**, then the dataset results were returned back to us in CSV format.

## [](#api-many-features) Apify API's many features

What we've done in this lesson only scratches the surface of what the Apify API can do. Right from Insomnia, or from any HTTP client, you can [manage datasets](https://docs.apify.com/api/v2#/reference/datasets/dataset/get-dataset) and [key-value stores](https://docs.apify.com/api/v2#/reference/key-value-stores/key-collection/get-dataset), [add to request queues](https://docs.apify.com/api/v2#/reference/request-queues/queue-collection/add-request), [update actors](https://docs.apify.com/api/v2#/reference/actors/actor-object/add-request), and much more! Basically, whatever you can do on the platform's web-interface, you also do through the API.

## [](#next) Next up

Be on the lookout for more lessons about the Apify platform very soon!
