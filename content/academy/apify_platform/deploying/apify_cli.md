---
title: Apify CLI
description: Learn about and install an important tool for communicating with your Apify SDK projects and the Apify Platform from your terminal - the Apify CLI.
menuWeight: 1
paths:
- apify-platform/deploying/apify-cli
---

# [](#the-cli) Apify CLI

The [Apify CLI](https://docs.apify.com/cli) helps you create, develop, build and run Apify actors, and manage the Apify cloud platform from any computer. It can be used to automatically generate the boilerplate for different types of projects, remotely call actors on the platform, and run your own projects. The Apify CLI will become your best friend while developing locally with the [Apify SDK](https://sdk.apify.com/).

## [](#installing) Installing

To install the Apfiy CLI, you'll first need NPM, which comes preinstalled with Node.js. If you haven't yet installed Node, learn how to do that [here]({{@link web_scraping_for_beginners/data_collection/computer_preparation.md}}). Additionally, make sure you've got an Apify account, as you will need to log in to the CLI to gain access to its full potential.

Open up a terminal instance and run the following command:

```shell
npm i -g apify-cli
```

This will install the CLI via NPM.

## [](#logging-in) Logging in

After the CLI has finished installing, navigate to the [Apify Console](https://console.apify.com) and click on **Settings**. Then, within your account settings, click **Integrations**. The page should look like this:

![Integrations tab on the Apify Platform]({{@asset apify_platform/deploying/images/settings-integrations.webp}})

> We've censored out the **User ID** in the image because it is private information which should not be shared with anyone who is not trusted. The same goes for your **Personal API Token**.

Copy the **Personal API Token** and return to your terminal, entering this command:

```shell
apify login -t YOUR_TOKEN_HERE
```

If you see a log which looks like this,

```text
Success: You are logged in to Apify as YOUR_USERNAME!
```

If you see a log which looks like **Success: You are logged in to Apify as YOUR_USERNAME!**, you're in and ready to get developing!

## [](#quick-note) Quick note

When you're locally test-running your code in the next lessons, always be sure to use the `apify run` command with the `-p` flag. This `-p` stands for **purge**, which will automatically purge all storages before running the actor again. Now that you have the Apify CLI, you should no longer be using `node FILENAME.js` to run your projects with the Apify SDK.

## [](#next) Next up

Be on the lookout for more lessons very soon!
