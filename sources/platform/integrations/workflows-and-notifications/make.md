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

### Add the Apify module to scenario

Add the Apify module to your scenario. You can find this module by searching for "Apify" in the module search bar.

Next, select one of the available options under Triggers, Actions and Searches, then click on the Apify module to open its configuration window.

![Apify module](../images/apify-module.png)

### Create a connection to Apify

In the Connection configuration window, you will need to provide your Apify API token.

![API token](../images/apify-token.png)

You can find the token in the Apify Console by navigating to **[Settings > API & Integrations](https://console.apify.com/settings/integrations)**.

![Integrations token](../images/apify-integrations-token.png)

Finally, copy your API token to the Make module and save it to create a connection.

Congratulations! You have successfully connected the Apify app and can now use it in your scenarios.

## Run an Actor or task with output

There are two ways to run an Actor or task and get its data in Make.com, depending on your needs and Actor complexity.

* **Synchronous run using action module**
* **Asynchronous run using trigger**

:::info
There is a hard timeout of 5 minutes for the synchronous run in Make.com. If the Actor or task run takes longer than 5 minutes, the data will not be returned completely.
If you expect that your Actor run will take longer than 5 minutes, use the asynchronous run using a trigger.
:::

The difference between the two is that the synchronous run will wait for the Actor or task to finish and once finished gets its output using "Get Dataset Items",
while the asynchronous run will catch the Actor run which will run from another scenario or elsewhere.

### Synchronous with action module

In this example, we will show you how to run an Actor synchronously and get its output into Google Sheets.
The same principle applies to another module that runs a task action.

#### Step 1: Add the Apify "Run an Actor" module

Before you start, you need to [connect the Apify account with Make.com](#create-a-connection-to-apify).
After you need to add Apify module called "Run an Actor" to your scenario and set it up.
In the example, we will use the "Google Maps Review Scraper" Actor. The most important part is to set the "Run synchronously" to "Yes", which will wait for the Actor to finish.

![img_1.png](img_1.png)

#### Step 2: Add the Apify "Get Dataset Items" module

In the next step, you need to add the "Get Dataset Items" module to your scenario, which will get the output from the Actor run.
In the "Dataset ID" field, you need to provide the default dataset ID from the Actor run, which you can find in variables from the previous module "Run an Actor".
If you do not see variables, you can run the scenario and check again.

![img_2.png](img_2.png)

#### Step 3: Add the Google Sheets "Create a Spreadsheet Rows" module

In the last step, you need to add the Google Sheets "Bulk Add Rows" module to your scenario, which will create new rows in the Google Sheets.
In the "Spreadsheet ID" field, you need to provide the Google Sheets ID, which you can find in the URL of the Google Sheets.
You need to set the columns range "A-Z" and add the date from the previous step "Get Dataset Items" to Rows values.

![img_3.png](img_3.png)

You are done, now once you run the scenario, it will run the Actor and get the output into Google Sheets.

### Asynchronous with trigger

In this example, we will show you how to run an Actor asynchronously and get it's output into Google Sheets.
Before you start, you need to decide from where you want to run the Actor run. You can run it manually Apify console, using a schedule, or with a different Make.com scenario.

#### Step 1: Add the Apify "Watch Actor Runs" module

Before you start, you need to [connect the Apify account with Make.com](#create-a-connection-to-apify).
After you need to add Apify module called "Watch Actor Runs" where you set up webhook for Actor you want to catch the run.
In the example, we will use the "Google Maps Review Scraper" Actor.

![img_4.png](img_4.png)

#### Step 2: Add the Apify "Get Dataset Items" module

In the next step, you need to add the "Get Dataset Items" module to your scenario, which will get the output from the Actor run.
In the "Dataset ID" field, you need to provide the default dataset ID from the Actor run, which you can find in variables from the previous module "Watch Actor Runs".

![img_5.png](img_5.png)

#### Step 3: Add the Google Sheets "Create a Spreadsheet Rows" module

In the last step, you need to add the Google Sheets "Bulk Add Rows" module to your scenario, which will create new rows in the Google Sheets.
In the "Spreadsheet ID" field, you need to provide the Google Sheets ID, which you can find in the URL of the Google Sheets.
You need to set columns range "A-Z" and add the date from the previous step "Get Dataset Items" to Row values.

![img_6.png](img_6.png)

You are done, now once the Actor run is finished, it will get the output into Google Sheets.
You can run the Actor using the Apify console, schedule, or different Make.com scenarios.

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
