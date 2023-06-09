---
title: Use Apify via API from PHP
description: Learn how to access Apify's REST API endpoints from your PHP projects using the guzzle package. Follow a tutorial to run an actor and download its data.
sidebar_position: 1
slug: /php/use-apify-from-php
---

# How to use Apify from PHP

Apify's [RESTful API](https://docs.apify.com/api/v2#) allows you to use the platform from basically anywhere. Many projects are and will continue to be built using [PHP](https://www.php.net/). This tutorial enables you to use Apify in these projects in PHP and frameworks built on it.

Apify does not have an official PHP client (yet), so we are going to use [guzzle](https://github.com/guzzle/guzzle), a great library for HTTP requests. By covering a few fundamental endpoints, this tutorial will show you the principles you can use for all Apify API endpoints.

## Before you start

Make sure you have an Apify account and API token. You will find the token in the [Integrations]([https://console.apify.com/account#/integrations](https://console.apify.com/account#/integrations)) section in Apify Console.

If you don't already have guzzle installed in your project (or just want to try out the code examples), run `composer require guzzlehttp/guzzle` to install it in the current directory.

## Preparing the client

To get a guzzle instance ready to be used with the Apify API, we first need to set up the base endpoint and authentication.

```php
require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client([
    'base_uri' => 'https://api.apify.com/v2/',
    'headers' => [
        // Replace <YOUR_APIFY_API_TOKEN> with your actual token
        'Authorization' => 'Bearer <YOUR_APIFY_API_TOKEN>',
    ]
]);
```

Note that we pass the API token in the header. It can also be passed as a query string `token` parameter, but passing it in the header is preferred and more secure.

To check whether everything works well, we'll try to get information about the [current user](/api/v2#/reference/users/private-data/get-private-user-data).

```php
// Call the endpoint using our client
// Note that the path does not have a leading slash
$response = $client->get('users/me');
// Parse the response (most Apify API endpoints return JSON)
$parsedResponse = \json_decode($response->getBody(), true);
// The actual data are usually present under the `data` key
$data = $parsedResponse['data'];

echo \json_encode($data, JSON_PRETTY_PRINT);
```

If, instead of data, you see an error saying `Authentication token is not valid`, check if the API token you used to instantiate the client is valid.

## Running an actor

Now that we have our guzzle client ready to go, we can run some actors. Let's try the **Contact Details Scraper** ([vdrmota/contact-info-scraper](https://apify.com/vdrmota/contact-info-scraper)).

The [API reference](/api/v2#/reference/actors/run-collection/run-actor) states that an actor's input should be passed as JSON in the request body. Other options are passed as query parameters.

```php
// To run the actor, we make a POST request to its run's endpoint
// To identify the actor, you can use its ID, but you can also pass
// the full actor name [username]~[actorName] or just ~[actorName] for
// your own actors
$response = $client->post('acts/vdrmota~contact-info-scraper/runs', [
  // Actors usually accept JSON as input. When using the `json` key in
  // a POST request's options, guzzle sets proper request headers
  // and serializes the array we pass in
  'json' => [
    'startUrls' => [
        ['url' => 'https://www.apify.com/contact']
    ],
    'maxDepth' => 0,
  ],
  // Other run options are passed in as query parameters
  // This is optional since actors usually have reasonable defaults
  'query' => [ 'timeout' => 30 ],
]);
$parsedResponse = \json_decode($response->getBody(), true);
$data = $parsedResponse['data'];

echo \json_encode($data, JSON_PRETTY_PRINT);
```

You should see information about the run, including its ID and the ID of its default [dataset](/platform/storage/dataset). Take note of these, we will need them later.

## [](#getting-dataset) Getting the results from dataset

Actors usually store their output in a default dataset. The [actor runs endpoint](/api/v2#/reference/actor-runs) lets you get overall info about an actor run's default dataset.

```php
// Replace <RUN_ID> with the run ID you from earlier
$response = $client->get('actor-runs/<RUN_ID>/dataset');
$parsedResponse = \json_decode($response->getBody(), true);
$data = $parsedResponse['data'];

echo \json_encode($data, JSON_PRETTY_PRINT);
```

As you can see, the response contains overall stats about the dataset, like its number of items, but not the actual data. To get those, we have to call the **items** endpoint.

```php
// Replace <RUN_ID> with the run ID from earlier
$response = $client->get('actor-runs/<RUN_ID>/dataset/items');
// The dataset items endpoint returns an array of dataset items
// they are not under the `data` key like in other endpoints
$data = \json_decode($response->getBody(), true);

echo \json_encode($data, JSON_PRETTY_PRINT);
```

Some of the actors write to datasets other than the default. In these cases, you need to have the dataset ID and call the `datasets/<DATASET_ID>` and `datasets/<DATASET_ID>/items` endpoints instead.

For larger datasets, you can paginate through the results by passing query parameters.

```php
$response = $client->get('datasets/<DATASET_ID>/items', [
    'query' => [
        'offset' => 20,
        'limit' => 10,
    ]
]);
$parsedResponse = \json_decode($response->getBody(), true);
echo \json_encode($parsedResponse, JSON_PRETTY_PRINT);
```

All the available parameters are described in [our API reference](/api/v2#/reference/datasets/item-collection/get-items) and work both for all datasets.

## [](#getting-key-value-store) Getting the results from key-value stores

Datasets are great for structured data, but are not suited for binary files like images or PDFs. In these cases, actors store their output in [key-value stores](/platform/storage/key-value-store). One such actor is the **HTML String To PDF** ([mhamas/html-string-to-pdf](https://apify.com/mhamas/html-string-to-pdf)) converter. Let's run it.

```php
$response = $client->post('acts/mhamas~html-string-to-pdf/runs', [
    'json' => [
        'htmlString' => '<html><body><h1>Hello World</h1></body></html>'
    ],
]);
$parsedResponse = \json_decode($response->getBody(), true);
$data = $parsedResponse['data'];

echo \json_encode($data, JSON_PRETTY_PRINT);
```

Keep track of the returned run ID.

Similar to datasets, we can get overall info about the default key-value store.

```php
// Replace <RUN_ID> with the ID returned by the code above
$response = $client->get('actor-runs/<RUN_ID>/key-value-store');
$parsedResponse = \json_decode($response->getBody(), true);
$data = $parsedResponse['data'];

echo \json_encode($data, JSON_PRETTY_PRINT);
```

The items in key-value stores are not structured, so we cannot use the same approach as we did with dataset items. We can obtain some information about a store's content using its **keys** endpoint.

```php
// Don't forget to replace <RUN_ID> with the ID you got earlier
$response = $client->get('actor-runs/<RUN_ID>/key-value-store/keys');
$parsedResponse = \json_decode($response->getBody(), true);
$data = $parsedResponse['data'];

echo \json_encode($data, JSON_PRETTY_PRINT);
```

We can see that there are two record keys: `INPUT` and `OUTPUT`. The HTML String to PDF actor's README states that the PDF is stored under the `OUTPUT` key. Downloading it is simple:

```php
// Don't forget to replace the <RUN_ID>
$response = $client->get('actor-runs/<RUN_ID>/key-value-store/records/OUTPUT');
// Make sure that the destination (filename) is writable
file_put_contents(__DIR__ . '/hello-world.pdf', $response->getBody());
```

If you open the generated `hello-world.pdf` file, you should see... well, "Hello World".

If the actor stored the data in a key-value store other than the default, we can use the standalone endpoints, `key-value-stores/<STORE_ID>`, `key-value-stores/<STORE_ID>/keys`, and `key-value-stores/<STORE_ID>/records/<KEY>`. They behave the same way as the default endpoints. [See the full docs](https://docs.apify.com/api/v2#/reference/key-value-stores/store-object).

## When are the data ready?

It takes some time for an actor to generate its output. There are even actors that run for days. In the previous examples, we chose actors whose runs only take a few seconds. This meant the runs had enough time to finish before we ran the code to retrieve their dataset or key-value store (so the actor had time to produce some output). If we ran the code immediately after starting a longer-running actor, the dataset would probably still be empty.

For actors that are expected to be quick, we can use the `waitForFinish` parameter. Then, the running actor's endpoint does not respond immediately but waits until the run finishes (up to the given limit). Let's try this with the HTML String to PDF actor.

```php
$response = $client->post('acts/mhamas~html-string-to-pdf/runs', [
    'json' => [
        'htmlString' => '<html><body><h1>Hi World</h1></body></html>'
    ],
    // Pass in how long we want to wait, in seconds
    'query' => [ 'waitForFinish' => 60 ]
]);
$parsedResponse = \json_decode($response->getBody(), true);
$data = $parsedResponse['data'];

echo \json_encode($data, JSON_PRETTY_PRINT);

$runId = $data['id'];
$response = $client->get(sprintf('actor-runs/%s/key-value-store/records/OUTPUT', $runId));
file_put_contents(__DIR__ . '/hi-world.pdf', $response->getBody());
```

## Webhooks

For actors that take longer to run, we can use [webhooks](/platform/integrations/webhooks). A webhook is an HTML POST request that is sent to a specified URL when an actor's status changes. We can use them as a kind of notification that is sent when your run finishes. You can set them up using query parameters. If we used webhooks in the example above, it would look like this:

```php
// Webhooks need to be passed as a base64-encoded JSON string
$webhooks = \base64_encode(\json_encode([
    [
        // The webhook can be sent on multiple events
        // this one fires when the run succeeds
        'eventTypes' => ['ACTOR.RUN.SUCCEEDED'],
        // Set this to some url that you can react to
        // To see what is sent to the URL,
        // you can set up a temporary request bin at https://requestbin.com/r
        'requestUrl' => '<WEBHOOK_ENDPOINT_URL>',
    ],
]));
$response = $client->post('acts/mhamas~html-string-to-pdf/runs', [
    'json' => [
        'htmlString' => '<html><body><h1>Hello World</h1></body></html>'
    ],
    'query' => [ 'webhooks' => $webhooks ]
]);
```

## How to use Apify Proxy

There is another important Apify feature you will need: [proxy](/platform/proxy). Guzzle makes it really easy to use.

If you just want to make sure that your server's IP address won't get blocked somewhere when making requests, you can use the automatic proxy selection mode.

```php
$client = new \GuzzleHttp\Client([
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://console.apify.com/proxy
    'proxy' => 'http://auto:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000'
]);

// This request will be made through an automatically chosen proxy
$response = $client->get("http://proxy.apify.com/?format=json");
echo $response->getBody();
```

If you want to maintain the same IP between requests, you can use the session mode.

```php
$client = new \GuzzleHttp\Client([
    // Replace <YOUR_PROXY_PASSWORD> below with your password
    // found at https://console.apify.com/proxy
    'proxy' => 'http://session-my_session:<YOUR_PROXY_PASSWORD>@proxy.apify.com:8000'
]);

// Both responses should contain the same clientIp
$response = $client->get("https://api.apify.com/v2/browser-info");
echo $response->getBody();

$response = $client->get("https://api.apify.com/v2/browser-info");
echo $response->getBody();
```

[See the proxy docs](/platform/proxy/connection-settings) for more details on using specific proxies.

## Feedback

Are you interested in an Apify PHP client or other PHP-related content? Do you have some feedback on this tutorial? [Let us know](https://apify.typeform.com/to/KqhmiJge#source=tutorial_use_apify_from_php)!