---
title: Zapier
description: Learn how to integrate your Apify Actors with Zapier.
sidebar_position: 11.12
slug: /integrations/zapier
---

# Zapier integration

**Learn how to integrate your Apify Actors with Zapier.**

---

With [Apify integration for Zapier](https://zapier.com/apps/apify/integrations), you can connect Apify with more than 1,500 apps, including Slack, Trello, Google Sheets, Dropbox, Salesforce, and loads more.
Your Zapier workflows can start Apify Actors or tasks, fetch items from a dataset, set and get records from key-value stores or find actor or task runs.
You can use the Zapier integration to trigger a workflow whenever Actor or a task finishes.

## Connect Apify with Zapier

To use the Apify integration on Zapier, you will need:

- Have an [Apify account](https://console.apify.com/).
- Have a [Zapier account](https://zapier.com/).

## Step 1: Create Zap and Find Apify on Zapier

Once you have your Zapier account ready and you are successfully logged in you can create the first Zap.
Go to Zaps section and find button to "Create Zap".
In create Zap form, you can choose if you want to use Apify as trigger or action for the Zap.
Click on Trigger and find the Apify using search box.

![Apify Zapier Trigger 2](./images/zapier-trigger.png)

Then select which trigger you want to use.

![Apify Zapier Trigger 2](./images/zapier-trigger-2.png)


## Step 2: Create a connection to your Apify account

As the next step in the form you need to connect Apify account.
Click on "Sign in" button next to Connect to Apify title. Optionally you can use already connected account from the select.
The connection configuration opens into new tab of browser or in modal window.

![Apify Zapier connection](./images/zapier-new-connection.png)

In connection configuration you need to provide Apify API Token. You can find the token in Apify Console by navigating to **Settings > Integrations**.

![Integrations token](./images/apify-integrations-token.png)

Copy the token and paste into configuration form and continue with "Yes, Continue to Apify" button.
The connection is now created and the configuration form is closed. You can continue with the Zap configuration and
select the Actor you want to use as trigger.
In the last step you can test the connection and with "Test Trigger" button you can test the trigger.
The test should prefill data from existing Actor runs you have in Apify. If you don't have any runs, you can create one in Apify Console and then test the connection again.
After successful test you can continue with the Zap configuration and set up the action for the Zap.

## Step 3: Set up Apify action in Zapier

You are able to use any action to follow Apify trigger. For example you can use Gmail to send email about finished Actor run.
In this guide we show how to use Apify as action to start Actor run.
After you select Apify as action you need to select the action you want to use. In this case we use "Run Actor" action.

![Zapier Action](./images/zapier-action-1.png)

You need to select the connection you want to use. If you don't have any connection you can create new one by clicking on "Sign in" button and follow the steps in Step 2.
In the next step you need to select the Actor you want to use. You can use search box to find the Actor.
We will use Web Scraper Actor in this example.

![Zapier Action](./images/zapier-action-2.png)

You need to fill the input for the Actor and continue with "Continue" button to next step.

> You can choose to run Actor synchronously or asynchronously. If you choose to run Actor synchronously, the Zap will wait until the Actor finishes and the Actor output and data will be available in next steps.
> Beware that the hard timeout for the run is 30 seconds. If the Actor doesn't finish in 30 seconds, the run will be terminated and the Actor output will not be available in next steps.

In the next step you can test the action and if everything is using "Test step" button.
This button runs the Actor run on Apify and you can see its data in Zapier.

![Zapier Action](./images/zapier-action-3.png)

Once you are happy with the test you can publish the Zap and when it is turned on, it will run the Actor every time the trigger is fired.

## Triggers

### Finished Actor Run

> Triggers when a selected Actor run is finished.

### Finished Task Run

> Triggers when a selected Actor task run is finished.

## Actions

### Run Actor

> Runs a selected Actor.

### Run Task

> Runs a selected Actor task.

### Set Key-Value Store Record

> Sets a value to a [Key-value store](/platform/storage/key-value-store).

## Searches

### Fetch Dataset Items

> Retrieves items from a [dataset](/platform/storage/dataset).

### Find Last Actor Run

> Finds the most recent Actor run.

### Find Last Task Run

> Finds the most recent Actor task run.
>
### Get Key-Value Store Record

> Retrieves value from a [Key-value store](/platform/storage/key-value-store).

If you have any questions or need help, feel free to reach out to us on our [developer community on Discord](https://discord.com/invite/jyEM2PRvMU).
