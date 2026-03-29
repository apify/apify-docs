---
title: Automate workflows
description: Connect Apify to Zapier, Make, n8n, and other automation tools. Schedule recurring runs and set up webhooks for event-driven workflows.
sidebar_position: 5
slug: /get-started/automate-workflows
---

import Card from '@site/src/components/Card';
import CardGrid from '@site/src/components/CardGrid';

Connect Apify to thousands of apps without writing code, or use schedules and webhooks to automate Actor runs.

## Integration platforms

Apify has native integrations with popular automation tools. Connect an Actor's output to any app in their ecosystems.

**Example: Send Actor results to Google Sheets**

1. Open your Actor run in [Apify Console](https://console.apify.com).
1. Go to the **Integrations** tab.
1. Select **Google Sheets** and authorize the connection.
1. Map the dataset fields to sheet columns.

Each time the Actor runs, results flow to your spreadsheet automatically.

For step-by-step setup guides, see:

- [Zapier integration](/platform/integrations/zapier)
- [Make integration](/platform/integrations/make)
- [n8n integration](/platform/integrations/n8n)

## Schedules

Run any Actor on a recurring basis without manual intervention.

1. Open your Actor in [Apify Console](https://console.apify.com).
1. Go to the **Schedules** tab and click **Create schedule**.
1. Set the frequency (every hour, daily, weekly, or a custom cron expression).
1. Save. The Actor runs automatically on schedule.

<!-- TODO: screenshot of schedule configuration -->

[Read more about schedules](/platform/actors/running/schedules).

## Webhooks

Trigger external actions when an Actor run succeeds, fails, or finishes.

1. Open your Actor in [Apify Console](https://console.apify.com).
1. Go to the **Webhooks** tab and click **Create webhook**.
1. Enter the target URL and select the event type (e.g., **Run succeeded**).
1. Save. Apify sends a POST request with run details to your URL each time the event fires.

<!-- TODO: screenshot of webhook configuration -->

[Read more about webhooks](/platform/integrations/webhooks).

## Next steps

<CardGrid>
    <Card
        title="All integrations"
        desc="Browse AI, workflow, data storage, and programming integrations."
        to="/platform/integrations"
    />
    <Card
        title="Connect AI agents"
        desc="Use Actors as tools for LLMs and AI agent frameworks."
        to="/platform/get-started/connect-ai-agents"
    />
    <Card
        title="Platform basics"
        desc="Understand how Actors, storage, and automation fit together."
        to="/platform/get-started/platform-basics"
    />
</CardGrid>
