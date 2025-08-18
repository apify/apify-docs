---
title: Bubble integration
description: Learn how to integrate your Apify Actors with Bubble for automated workflows and notifications.
sidebar_label: Bubble
sidebar_position: 7
slug: /integrations/bubble
---

**Learn how to integrate your Apify Actors with Bubble for automated workflows and notifications.**

---

[Bubble](https://bubble.io/) is a no-code platform that allows you to build web applications without writing code. With the Apify integration for Bubble, you can easily connect your Apify Actors to your Bubble applications to automate workflows and display scraped data.

## Get started

To use the Apify integration for Bubble, you will need:

- An [Apify account](https://console.apify.com/)
- A [Bubble account](https://bubble.io/)
- A Bubble application where you want to use the integration

## Step 1: Install the Apify plugin for Bubble

To integrate Apify with your Bubble application, you first need to install the Apify plugin from the Bubble plugin marketplace.

![Apify Plugin Download](../images/bubble/plugin_install_preview.png)

1. Go to your Bubble application dashboard and navigate to the **Plugins** tab.
1. Click the **Add plugins** button.
1. Search for "Apify" in the plugin marketplace.
1. Click on the Apify plugin and then click **Install**.

## Step 2: Configure the Apify plugin

After installing the plugin, you'll need to provide your API token when setting up Apify actions:

1. You can find your API token in the Apify Console under **Settings > API & Integrations**.
2. For security, store your API token in your User data type with Privacy rules applied rather than entering it directly in each API call.

## Using the integration

Once the plugin is configured, you can start building automated workflows.

### Trigger Actor runs from Bubble events

Create workflows that automatically run Apify Actors when certain events occur in your Bubble app:

1. Create a workflow triggered by your preferred event (form submission, button click, page load, etc.)
2. Add the "Run Actor" or "Run Actor Task" action to your workflow
3. Configure the Actor parameters and input data
4. Set up follow-up actions to handle the results

![Using Apify run Actor](../images/bubble/auto_run_preview.png)

### Display Apify data in your application

Use Apify data sources to populate your Bubble app with Actor information and results:

1. Use data calls like "List User Tasks", "List Actor Runs", or "List Store Actors" as data sources for repeating groups
2. Configure the specific Actor or task you want to display
3. Use "Fetch Data From Dataset Json As Data" to show actual scraped results from your Actor runs

![Using Apify data calls](../images/bubble/data_preview.png)

### Automate data collection workflows

Set up recurring data collection that updates your Bubble app automatically:

1. Create a scheduled workflow or API workflow
2. Use the "Run Actor Task" action to collect fresh data
3. Process and store the results in your Bubble database
4. Update your app's display elements with new data

![Using Apify Actions calls](../images/bubble/automate_data_workflow.png)

## Step 4: Example use cases

### E-commerce price monitoring

1. Set up a workflow that triggers daily or weekly
2. Use the "Run Actor" action to scrape competitor prices
3. Display the results in your Bubble app's dashboard
4. Set up notifications when prices change significantly

### Lead generation automation

1. Create a form submission workflow
2. Use scraped data to enrich lead information automatically
3. Store enriched data in your Bubble database
4. Trigger follow-up actions based on the enriched data

### Content aggregation

1. Schedule regular Actor runs to collect content from multiple sources
2. Use "Fetch Data From Dataset Json As Data" to display aggregated content
3. Create filtered views based on content categories or dates

## Available Apify actions and data sources

The Apify plugin provides two main types of operations:

**Actions** (for workflows):
- Run Actor
- Run Actor Task
- Scrape Single URL
- Manage webhooks and data stores

**Data Sources** (for displaying information):
- Fetch data from datasets in various formats
- List Actors, tasks, and runs
- Access key-value store records

## Troubleshooting

- **Authentication errors**: Ensure your API token is in the format "Bearer <api_token>" and has necessary permissions
- **Missing Actors or tasks**: Run your Actor at least once in the Apify Console to make it appear in Bubble dropdowns
- **Timeout errors**: For long-running Actors, consider using asynchronous runs
- **Data format issues**: Ensure JSON data is properly formatted when working with datasets

If you have any questions or need help, feel free to reach out to us on our [Discord channel](https://discord.com/invite/jyEM2PRvMU).
