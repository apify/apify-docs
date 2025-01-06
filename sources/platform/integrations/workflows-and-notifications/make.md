---
title: Make integration
description: Learn how to integrate your Apify Actors with Make.
sidebar_label: Make
sidebar_position: 2
slug: /integrations/make
---

**Learn how to integrate your Apify Actors with Make.**

---

[Make](https://www.make.com/) *(formerly Integromat)* allows you to create scenarios where you can integrate various services (modules) to automate and centralize jobs. Apify has its own module you can use to run Apify Actors, get notified about run statuses, and receive Actor results directly in your Make scenario.

## Connect Apify to Make {#connect-apify-to-make}

To use the Apify integration on Make, you will need:

- An [Apify account](https://console.apify.com/).
- A Make account (and a [scenario](https://www.make.com/en/help/scenarios/creating-a-scenario)).

### Add the Apify module to your Make scenario

Add the Apify module to your scenario. You can find this module by searching for "Apify" in the module search bar.

Next, select one of the available options under Triggers, Actions and Searches, then click on the Apify module to open its configuration window.

![Apify module](../images/apify-module.png)

### Create a connection to your Apify account

In the Connection configuration window, you will need to provide your Apify API token.

![API token](../images/apify-token.png)

You can find the token in the Apify Console by navigating to **Settings > Integrations**.

![Integrations token](../images/apify-integrations-token.png)

Finally, copy your API token to the Make module and save it to create a connection.

Congratulations! You have successfully connected the Apify app and can now use it in your scenarios.

## How to run an Actor or task and get the results

There are two ways to run an Actor or task and get it's data in Make.com, depends on your needs and Actor complexity.

* **Synchronous run using action modules**
* **Asynchronous run using triggers**

The difference between the two is that the synchronous run will wait for the Actor or task to finish and once finish gets it's output using "Get Dataset Items",
while the asynchronous run will run the Actor and then use trigger in another scenario to catch run finish and get it's output using "Get Dataset Items".

### Synchronous run using action modules

In this example we will show you how to run an Actor synchronously and get it's output into Google Sheets.
The same principle applies to other modules run a task action.

:::info
There is hard timeout 5 minutes for the synchronous run in Make.com, if the Actor run takes longer than 5 minutes, the data will not be returned completely.
If you expect that your Actor run will take longer than 5 minutes, use the asynchronous run using triggers.
:::

Step 1: Add the Apify "Run an Actor" module

Step 2: Add the Apify "Get Dataset Items" module

Step 3: Add the Google Sheets "Create a Spreadsheet Rows" module


![img.png](img.png)


### Asynchronous run using triggers

In this example we will show you how to run an Actor asynchronously and get it's output into Google Sheets.

Step 1: Add the Apify "Watch Actor Runs" module

Step 2: Add the Apify "Get Dataset Items" module

Step 3: Add the Google Sheets "Create a Spreadsheet Rows" module


## Available modules and triggers

**Triggers**

* Watch Actor Runs: Triggers when a selected Actor run is finished.
* Watch Task Runs: Triggers when a selected task run is finished.

**Actions**

* Run a task: Runs a selected Actor task.
* Run an Actor: Runs a selected Actor.
* Scrape Single URL: Runs a scraper for the website and returns its content as text, markdown and HTML.
* Make an API Call: Makes an arbitrary authorized API call.

**Searches**

* Get Dataset Items: Retrieves items from a [dataset](/platform/storage/dataset).
