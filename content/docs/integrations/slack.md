---
title: Slack
description: Learn how to integrate your Apify actors with Slack. This article guides you from installation through to automating your whole workflow in Slack.
menuWeight: 11.2
paths:
    - integrations/slack
---

# Slack integration

[Slack](https://slack.com/) allows you to install various services in your workspace in order to automate and centralize tasks. Apify is one of these services, and it allows you to run your Apify actors, be notified about their run status, and get your results, all without opening your browser.

## Get started

To use the Apify integration for Slack, you will need:

- An [Apify account](https://console.apify.com/).
- A Slack account (and workspace).

## [](#step-one) Step 1: Create a task in Apify Console

A task is a saved configuration for an [actor]({{@link actors.md}}). For example, we can use the [Google Shopping Scraper](https://console.apify.com/actors/aLTexEuCetoJNL9bL), Apify’s tool to scrape Google Shopping for product details, prices, reviews, and more.

To create a new task for this actor, simply go to the [actor’s page](https://apify.com/emastra/google-shopping-scraper) in Apify Store and click the **Try for free** button. You will be redirected to Apify Console. After filling in the input fields, click the **Save as new task** button. You can rename the task by clicking the **Settings** tab (let’s call it *shopping-test* for now) and find the task again by clicking **Tasks** in the left sidebar.

## [](#step-two) Step 2: Set up the Slack integration

Now click the **Integrations** tab on your task's page. Find the Slack integration, then click the **Configure** button. You will be prompted to log in with your Slack account and select your workspace in the **Settings > Integrations** window.

![Integrations tab]({{@asset integrations/images/integrations-tab.webp}})

Then, head back to your task to finish the setup. Select what type of events you would like to be notified of (e.g., when a run is created, when a run succeeds, when a run fails, etc.), your workspace, and the channel you want to receive the notifications in (you can set up an ad-hoc channel for this test). In the **Message** field, you can see how the notification will look, or you can craft a new custom one.

![Integration setup]({{@asset integrations/images/slack-integration-setup.webp}})

Once you are done, click the **Save** button.

## [](#step-three) Step 3: Give the Apify integration a trial run!

Click the **Start** button and head to the Slack channel you selected to see your first Apify integration notifications.

## Step 4: Start your run directly from Slack

You can now run the same task directly from Slack by typing /apify run [task name] into the Slack message box. Remember you can retrieve the task’s name by clicking Tasks in the left sidebar on Apify Console.

![Use Apify from Slack]({{@asset integrations/images/slack-apify-message.webp}})

When an actor doesn’t require you to fill in any input fields, you can run it by simply typing `/apify call [actor name]`.

You’re all set! If you have any questions or need help, feel free to reach out to us on our [Discord channel](https://discord.com/invite/jyEM2PRvMU).
