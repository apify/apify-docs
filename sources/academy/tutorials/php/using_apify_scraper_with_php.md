---
title: Using Apify Scrapers via API from PHP
description: Start scrapers and fetch results from a PHP application
sidebar_position: 1
slug: /php/using-apify-scraper-with-php
---

Once you set up and test your scraper, you can integrate it into your application via our API. Many of the questions we get are about API integration from PHP, so we've prepared this article on using Apify's API with a PHP application.

## What is our goal?

The main goal of this article is to give you an example of how to start your scraper and fetch results from a PHP application. We'll also show you how to alter the scraper configuration when starting the scraper.

## Where can I find the API endpoint for my scraper?

Each actor or task you set up at Apify has its own automatically-generated API endpoint. You can find this in the API section of the scraper configuration page. The API for starting the scraper has the following format for actors:

> `https://api.apify.com/v2/acts/ACTOR_ID/runs?token=API_TOKEN`

and for tasks:

> `https://api.apify.com/v2/actor-tasks/ACTOR_TASK_ID/runs?token=API_TOKEN`

Don't forget to replace the capitalized part with your own values. You can read a more detailed article on how to work with our API [here](https://help.apify.com/en/articles/3224035-run-actor-task-and-retrieve-data-via-api).

## Starting the scraper and fetching results from PHP

We can now use this API from our PHP application. Here's an example of how to start the scraper and get a response describing the scraper run:

```PHP
<?php

$ch = curl_init('https://api.apify.com/v2/actor-tasks/ACTOR_TASK_ID/runs?token=API_TOKEN');\
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");\
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\
$result_json = curl_exec($ch);

In `$result_json` you can find the response describing the scraper run:

{\
  "data": {\
    "id": "HG7ML7M8z78YcAPEB",\
    "actId": "HDSasDasz78YcAPEB",\
    "userId": "BPWZBd9V9c746JAnF",\
    "actorTaskId": "KJHSKHausidyaJKHs",\
    "startedAt": "2019-11-30T07:34:24.202Z",\
    "finishedAt": "2019-12-12T09:30:12.202Z",\
    "status": "SUCCEEDED",\
    "meta": {\
      "origin": "WEB",\
      "clientIp": "172.234.12.34",\
      "userAgent": "Mozilla/5.0 (iPad)",\
      "scheduleId": "dWazFsPpxMigMSqHL",\
      "scheduledAt": "2019-06-10T11:40:00.000Z"\
    },\
    "stats": {\
      "inputBodyLen": 240,\
      "restartCount": 0,\
      "resurrectCount": 2,\
      "memAvgBytes": 35914228.4,\
      "memMaxBytes": 38244352,\
      "memCurrentBytes": 0,\
      "cpuAvgUsage": 0.00955965,\
      "cpuMaxUsage": 3.15469,\
      "cpuCurrentUsage": 0,\
      "netRxBytes": 2652,\
      "netTxBytes": 1338,\
      "durationMillis": 26239,\
      "runTimeSecs": 26.239,\
      "metamorph": 0,\
      "computeUnits": 0.0072886\
    },\
    "options": {\
      "build": "latest",\
      "timeoutSecs": 300,\
      "memoryMbytes": 1024,\
      "diskMbytes": 2048\
    },\
    "buildId": "7sT5jcggjjA9fNcxF",\
    "exitCode": 0,\
    "defaultKeyValueStoreId": "eJNzqsbPiopwJcgGQ",\
    "defaultDatasetId": "wmKPijuyDnPZAPRMk",\
    "defaultRequestQueueId": "FL35cSF7jrxr3BY39",\
    "buildNumber": "0.2.2",\
    "containerUrl": "https://nwfcc4btrgqt.runs.apify.com"\
  }\
}
```

Even if the scraper is still running, you can fetch results (data you outputted from the pageFunction) using the `defaultDatasetId`. To get complete results when the scraper is finished, you can periodically check the result dataset for scraper status or even better use a webhook, which you can set up under advanced settings on the scraper configuration page.

You can get the dataset items via this API

> `https://api.apify.com/v2/datasets/DATASET_ID/items`

## Changing scraper configuration when starting the scraper

Sometimes you want to run your scraper and change some of its settings for the current run. A typical use case is a scraper configuration with a set of `Start URLs` when starting the crawl. You can achieve this by altering these settings when starting the scraper via API using POST data with new scraper settings.

Here's an example in PHP (with some basic output):

```PHP
<?php

$data = array(\
    "startUrls" => [\
        array("url" => "http://www.example.com"),\
        array("url" => "http://www.example.com?test2")]\
);\
$data_json = json_encode($data);

echo "<h1>Invoking Apify API with:</h1>";\
echo "<pre>\n".$data_json."</pre>";\
echo "<br><br>";

$ch = curl_init('https://api.apify.com/v2/actor-tasks/ACTOR_TASK_ID/runs?token=API_TOKEN');\
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");\
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);\
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\
curl_setopt($ch, CURLOPT_HTTPHEADER, array(\
        'Content-Type: application/json',\
        'Content-Length: ' . strlen($data_json))\
);\
$result_json = curl_exec($ch);

echo "<h1>Result:</h1>";\
echo "<pre>\n".$result_json."</pre>";
```

Note that this only changes the scraper settings for the current run. This enables you to run crawls in parallel with different configurations.

[Let us know](mailto:support@apify.com) if you come across any issues or would like to contribute examples for other languages.
