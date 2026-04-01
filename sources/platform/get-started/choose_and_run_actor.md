---
title: Choose and run an Actor
description: Find the right Actor in Apify Store and run it to scrape data, automate tasks, or power your AI agents - no coding required.
sidebar_position: 2
slug: /get-started/choose-and-run-actor
---

import Card from '@site/src/components/Card';
import CardGrid from '@site/src/components/CardGrid';

Actors are ready-made tools that run on the Apify platform. Pick one from the Store, configure it, click **Start**, and get structured data back. No coding required.

## Find an Actor

1. Go to [Apify Store](https://console.apify.com/store).
1. Search by use case (e.g., "scrape Google results") or browse by category.
1. Check the Actor card for a description, pricing, and user ratings.

For this walkthrough, use [Website Content Crawler](https://apify.com/apify/website-content-crawler) - it extracts text content from any website.

<!-- TODO: screenshot of Apify Store with Website Content Crawler -->

## Configure and run

1. Open the Actor and click **Start**.
1. In the **Input** tab, enter a URL in the **Start URLs** field (e.g., `https://example.com`).
1. Optionally adjust settings like **Max crawl pages** to limit the scope.
1. Click **Start**.

<!-- TODO: screenshot of Actor input form -->

The Actor begins running immediately. You can watch progress in the **Log** tab.

## Get your data

When the run finishes:

1. Open the **Storage** tab and click the default dataset.
1. Preview the results in the table view.
1. Click **Export** to download as JSON, CSV, Excel, or other formats.

<!-- TODO: screenshot of dataset export -->

You can also access results programmatically via the [Apify API](/api/v2) or [API clients](/platform/integrations/apify-for-ai-agents#api-client).

## Next steps

<CardGrid>
    <Card
        title="Schedule recurring runs"
        desc="Run Actors automatically on a schedule."
        to="/platform/actors/running/schedules"
    />
    <Card
        title="Use the API"
        desc="Run Actors and retrieve data programmatically."
        to="/platform/integrations/apify-for-ai-agents#rest-api"
    />
    <Card
        title="Build your own Actor"
        desc="Create custom scraping and automation tools."
        to="/platform/get-started/build-an-actor"
    />
</CardGrid>
