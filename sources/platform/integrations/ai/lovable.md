---
title: Lovable integration
description: Connect Apify to Lovable to run Actors from the project chat and your published app, then read the scraped results from datasets and key-value stores.
sidebar_label: Lovable
slug: /integrations/lovable
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[Lovable](https://lovable.dev) is an AI app builder that turns a prompt into a working web app. The [Apify connector](https://docs.lovable.dev/integrations/apify), built and maintained by Lovable, lets those apps call the Apify API through a shared connection, so an app can run [Actors](https://apify.com/store) and display the results.

The connector is an app and chat connector: one connection works both in the project chat while you build and in the published app. Once it's linked to a project, your app can:

- Run Actors to scrape websites and automate browser workflows.
- Track an Actor run until it finishes.
- Read results from datasets and key-value stores.
- List recent Actor runs and their datasets.

<ThirdPartyDisclaimer />

## Prerequisites

Before you connect the two platforms, you need:

- _An Apify account_ - If you don't have one, [sign up here](https://console.apify.com/sign-up).
- _Apify API token_ - Get your token from the **API & Integrations** section in [Apify Console](https://console.apify.com/settings/integrations). See [API token](/integrations/api#api-token) for scope and expiration options.
- _A Lovable account_ - App and chat connectors are available on the Free, Pro, and Business plans.
- _Permission to create connections_ - Enterprise plans restrict connection creation to **No one** by default, until an admin changes it in **Connectors > Admin settings > App + chat connectors**.

## Connect Apify to Lovable

The connection lives at the workspace level, so you create it once and reuse it across projects.

1. In Lovable, open [**Connectors**](https://lovable.dev/dashboard?connectors), search for `Apify`, and select it.
1. Select **Add connection**, then choose **App + chat connector**.

    ![Apify connector page in Lovable, with the Add connection button and the App + chat connector option highlighted](images/lovable/add-connection.webp)

1. Fill in the connection dialog, pasting your Apify API token when it asks for one.
1. Select **Connect**.

A new connection is private to you. Share it with specific people or with the whole workspace to let them link it to their own projects.

You can create more than one connection, each with its own token, which keeps environments such as development and production separate, and keeps their usage apart in Apify Console.

To use the connection in a project, ask Lovable in the project chat to link the project to it.

## Build a feature that runs an Actor

After you link the project, describe the feature in the project chat and name the Actor you want to run. Lovable generates the API calls, the state handling, and the UI that renders the dataset.

Actors that pair well with a Lovable front end include:

- [Google Maps Scraper](https://apify.com/compass/crawler-google-places) for lead lists built from directory pages.
- [Instagram Profile Scraper](https://apify.com/apify/instagram-profile-scraper) and [TikTok Scraper](https://apify.com/clockworks/tiktok-scraper) for social monitoring feeds.
- [E-commerce Scraping Tool](https://apify.com/apify/e-commerce-scraping-tool) for price tracking dashboards.
- [Website Content Crawler](https://apify.com/apify/website-content-crawler) and [Google Search Results Scraper](https://apify.com/apify/google-search-scraper) for research and summarization pages.

Example prompts:

- _"Use Apify and build a dashboard that runs the E-commerce Scraping Tool Actor on a list of product URLs and charts the price history."_
- _"Use Apify and build a console that lists recent Actor runs with status, duration, and a link to each dataset."_

Runs started through the connector bill against your Apify plan, and the cost of each run stays visible in Apify Console. Lovable doesn't handle Apify billing.

## Handle long-running Actor runs

Actor runs take anywhere from seconds to minutes, and the Apify API rate-limits both run creation and dataset reads. That shapes how you prompt.

For a long run, ask Lovable to start the run, poll the run status at a slow interval until it finishes, and only then read the dataset. For a short job, Apify can start the run and return the dataset items in a single call.

A `429` response means the Apify API is rate-limiting your account. Ask Lovable to retry with exponential backoff rather than re-sending at a fixed interval, otherwise the app stays throttled.

## Limitations

Two constraints are worth knowing before you design around the connector:

- Tokens aren't rotated automatically. When you [rotate a token](/integrations/api#rotation) in Apify Console, update the Lovable connection with the new one. Requests fail until you do.
- Per-end-user Apify login isn't supported. Each connection represents a single Apify account, shared across every project linked to it, so all usage lands on that one account.

## Manage the connection

Manage an existing connection from [**Connectors**](https://lovable.dev/dashboard?connectors) in Lovable: select **Apify**, then open the connection.

- Unlink a project to remove Apify access from that project while the connection stays available to the others.
- Delete the connection to remove it from the workspace. Deletion is permanent, removes the credentials from every linked project, and breaks any app feature that uses Apify until you add a new connection.

Deleting a connection in Lovable doesn't revoke the token in Apify. To cut off access entirely, delete the token in [**Settings > API & Integrations**](https://console.apify.com/settings/integrations) as well.

## Resources

- [Lovable documentation for the Apify connector](https://docs.lovable.dev/integrations/apify)
- [Lovable app and chat connectors](https://docs.lovable.dev/integrations/app-connectors)
- [Apify API token](/integrations/api#api-token)
