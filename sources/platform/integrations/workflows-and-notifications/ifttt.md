---
title: IFTTT integration
description: Connect Apify Actors with IFTTT to automate workflows using actor run events, data queries, and task actions.
sidebar_label: IFTTT
sidebar_position: 6
slug: /integrations/ifttt
---

**Learn how to integrate your Apify Actors in IFTTT Applets.**

This guide explains how to use the Apify integration in IFTTT to build automations (Applets) triggered by actor or task runs and start new runs automatically.

An Applet is built from three key parts: a trigger that kicks off the workflow, optional queries that fetch the data, and one or more actions that execute when the Applet runs.

---

With [Apify integration for IFTTT](https://ifttt.com/apify), you can connect your Apify Actors to hundreds of services like Twitter, Gmail, Google Sheets, Slack, and more.

Your Applets can start Apify Actors or tasks, fetch items from a dataset and get records from key-value stores.

## Connect Apify with IFTTT

To use the Apify integration on IFTTT, you will need to:

- Have an [Apify account](https://console.apify.com/).
- Have an [IFTTT account](https://ifttt.com/).

To connect to Apify service:

- visit [Apify service page](https://ifttt.com/apify)
- click "Connect" button
- you will be redirected to the Apify login page
- login to your Apify console

![Apify Connect Service](../images/ifttt-connect-service.png)

### Step 1: Create an Applet with Apify service

To create an Applet, go to the [Explore](https://ifttt.com/explore) section and find the "Create" button.

In the create Applet form, you can choose whether you want to use Apify as the trigger or action.

Click on "Add" button in "If This" part of the applet and find Apify using the search box.

![Apify Choose Service](../images/ifttt-choose-service.png)

Then select which trigger you want to use.

![Apify Choose Trigger](../images/ifttt-choose-trigger.png)

In case you didn't connect to the Apify account, you will be prompted to do so when you select a trigger.

### Step 2: Set up your Apify action in an Applet

You are able to use any action to follow your Apify trigger. For example, you can use Gmail to send an email about a finished Actor run.

In this guide we'll show you how to use Apify as an action to start an Actor run.

After you select Apify as an action in the "Then That" part of the applet, you need to select the action you want to use. Let's use the "Run Actor" action for this example.

![Apify Choose Action](../images/ifttt-choose-action.png)

In the next step, you need to select the Actor you want to use. You can choose one by selecting it from the dropdown. You can choose between your recently used Actors and Actors from the store. IFTTT only displays up to 50 items in a dropdown at a time. If the actor or item you're looking for doesn't show up, it's not necessarily missing — it just might not be in the top 50 results yet.

>To make an Actor appear in the dropdown, try using it at least once via API or in the console.

We will use the Google Search Results Scraper Actor in this example.

![Apify Actor Customization](../images/ifttt-actor-config.png)

You can customize how the Actor runs by filling out the following parameters:

| Field         | Description                                                                 | Example Values            |
| ------------- | --------------------------------------------------------------------------- | ------------------------- |
| `Wait until run finishes`  | Defines how the actor should be executed.                           | `yes`, `no`           |
| `Input overrides`          | JSON input that will override actor's default input.                | `{"key": "value"}`    |
| `Build`                    | Specifies the Actor build to run. Can be build tag or build number. | `0.2.10`, `version-0` |
| `Memory`                   | Memory limit for the run in megabytes.                              | `256mb`               |

Once you're happy with the Actor customization, continue by pressing "Create action" button.

![Apify Actor Customization](../images/ifttt-applet-overview.png)

Once the applet is created, wait for you trigger to run and inspect the results by pressing the "View activity" button in the Applet overview page.

![Apify Actor Customization](../images/ifttt-applet-inspect.png)

## Triggers

### Actor Run Finished

> Triggers when a selected Actor run is finished.

### Task Run Finished

> Triggers when a selected Actor task run is finished.

## Actions

### Run Actor

> Runs a selected Actor.

### Run Task

> Runs a selected Actor task.


## Queries

### Get Dataset Items

> Retrieves items from a [dataset](/platform/storage/dataset).

### Scrape Single URL

> Runs a scraper for the website and returns its content.

### Get Key-Value Store Record

> Retrieves value from a [Key-value store](/platform/storage/key-value-store).

If you have any questions or need help, feel free to reach out to us on our [developer community on Discord](https://discord.com/invite/jyEM2PRvMU).
