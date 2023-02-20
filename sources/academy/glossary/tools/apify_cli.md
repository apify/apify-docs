---
title: The Apify CLI
description: Learn about, install, and log into the Apify CLI - your best friend for interacting with the Apify platform via your terminal.
sidebar_position: 9.1
slug: /tools/apify-cli
---

# The Apify CLI {#the-apify-cli}

**Learn about, install, and log into the Apify CLI - your best friend for interacting with the Apify platform via your terminal.**

---

The [Apify CLI](https://docs.apify.com/cli) helps you create, develop, build and run Apify actors, and manage the Apify cloud platform from any computer. It can be used to automatically generate the boilerplate for different types of projects, initialize projects, remotely call actors on the platform, and run your own projects.

## Installing {#installing}

To install the Apfiy CLI, you'll first need NPM, which comes preinstalled with Node.js. If you haven't yet installed Node, learn how to do that [here](../../webscraping/web_scraping_for_beginners/data_extraction/computer_preparation.md). Additionally, make sure you've got an Apify account, as you will need to log in to the CLI to gain access to its full potential.

Open up a terminal instance and run the following command:

```shell
npm i -g apify-cli
```

This will install the CLI via NPM.

## Logging in {#logging-in}

After the CLI has finished installing, navigate to the [Apify Console](https://console.apify.com?asrc=developers_portal) and click on **Settings**. Then, within your account settings, click **Integrations**. The page should look like this:

![Integrations tab on the Apify Platform](./images/settings-integrations.webp)

> We've censored out the **User ID** in the image because it is private information which should not be shared with anyone who is not trusted. The same goes for your **Personal API Token**.

Copy the **Personal API Token** and return to your terminal, entering this command:

```shell
apify login -t YOUR_TOKEN_HERE
```

If you see a log which looks like this,

```text
Success: You are logged in to Apify as YOUR_USERNAME!
```

If you see a log which looks like **Success: You are logged in to Apify as YOUR_USERNAME!**, you're in!
