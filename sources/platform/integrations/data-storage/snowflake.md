---
title: Snowflake integration
description: Use the Apify Snowflake Native App to run Actors and import dataset results directly into your Snowflake tables from within the Snowflake UI.
sidebar_label: Snowflake
sidebar_position: 1
slug: /integrations/snowflake
---

import ThirdPartyDisclaimer from '@site/sources/\_partials/\_third-party-integration.mdx';

With the Apify integration for [Snowflake](https://www.snowflake.com/), you can run Apify Actors and import their results directly into your Snowflake data warehouse without leaving the Snowflake UI. The integration is distributed as a [Snowflake Native App](https://docs.snowflake.com/en/developer-guide/native-apps/native-apps-about) and provides a built-in Streamlit interface for managing Actor runs and dataset imports.

<ThirdPartyDisclaimer />

## Prerequisites

To use the Apify integration for Snowflake, you will need:

- An [Apify account](https://console.apify.com/)
- A [Snowflake account](https://www.snowflake.com/) with permissions to install Native Apps and create External Access Integrations.

## Install the app

Install the Apify integration from the Snowflake Marketplace and follow the guided setup.

### Step 1: Install from Snowflake Marketplace

In Snowsight, open the **Data Products** menu and navigate to the **Marketplace**. Search for **Apify** and open the listing, then click **Get** to begin installation.

![Apify integration listing in Snowflake Marketplace](../images/snowflake/marketplace_listing.png)

### Step 2: Set up External Access Integration

During installation, the app prompts you to create a **Network Rule** and an **External Access Integration** so the app can reach the Apify API.

Follow the SQL instructions shown in the setup screen. Run the provided SQL in a Snowsight worksheet under an account-admin role, then return to the app setup and confirm the integration name.

![External connections setup during app installation](../images/snowflake/step_2_setup_EAI.png)

:::note Required privileges

The role setting up the app must be able to create an External Access Integration and a Network Rule, and must grant the app the `CREATE DATABASE` and `READ SESSION` account-level privileges.

:::

### Step 3: Grant required privileges

After the External Access Integration is in place, grant the app the remaining privileges it needs:

- **CREATE DATABASE** - lets the app create a dedicated database for exported data.
- **READ SESSION** - lets the app associate Apify API tokens with individual Snowflake users.

The app displays the required `GRANT` statements. Copy and run them in a worksheet under the `ACCOUNTADMIN` role.

![Account privileges grant during app setup](../images/snowflake/step_3_grant_privileges.png)

## Connect your Apify account

![Apify Snowflake Integration home page](../images/snowflake/page_1_homepage.png)

Open the installed app and go to the **API Token** page. The page checks whether a Snowflake secret bound to the app is configured and whether it can reach the Apify API.

![API Token page showing a connected Apify account](../images/snowflake/page_2_api_token.png)

If the connection check fails, create or update a Snowflake secret with your Apify API token:

1. In Snowsight, go to **Admin** > **Security** > **Secrets**.
1. Create a new secret of type **Generic String** and paste your [Apify API token](https://console.apify.com/settings/integrations).
1. Bind the secret to the app according to the instructions shown on the API Token page.

Once the secret is configured, the page confirms your connected Apify username and email.

## Import a dataset

The **Import Data from Dataset** page lets you fetch items from an Apify dataset and load them into a Snowflake table.

### Step 1: Select a dataset

Choose one of your named datasets from the dropdown or enter a custom dataset ID. You can find dataset IDs in [Apify Console](https://console.apify.com/storage/datasets) under **Storage** > **Datasets**.

![Import Dataset page with dataset selector and Advanced options](../images/snowflake/page_3_import_dataset_step_1.png)

Expand **Advanced options** to refine what data is fetched:

| Option               | Description                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------ |
| **Select fields**    | Comma-separated list of fields to include. The fields are exported in the order specified. |
| **Omit fields**      | Comma-separated list of fields to exclude.                                                 |
| **Unwind**           | Comma-separated list of array or object fields to flatten into separate rows.              |
| **Offset**           | Number of items to skip from the beginning of the dataset.                                 |
| **Limit**            | Maximum number of items to fetch.                                                          |
| **Clean**            | Excludes empty items and fields starting with `#`.                                         |
| **Descending order** | Returns items in reverse order.                                                            |

Click **Fetch Data** to retrieve a preview of the dataset.

### Step 2: Choose an export mode

After fetching data, select how you want to load it into Snowflake:

![Dataset items preview and export mode selector](../images/snowflake/page_3_import_dataset_step_2.png)

- **Create new table** - the app creates a new table in the `APIFY.DATASETS_EXPORTS` schema in a dedicated database. Select which columns to include, then click **Next: Export**.

    ![Export settings with column selection](../images/snowflake/page_3_import_dataset_step_3.png)

    :::note Visibility

    Tables created by the app are only visible to `ACCOUNTADMIN` by default. The app grants access to exported tables via its `app_public` application role. To make the tables visible to other roles, grant that role in a Snowsight worksheet:

    ```sql
    GRANT APPLICATION ROLE <app_name>.app_public TO ROLE <your_role>;
    ```

    Alternatively, open the app in Snowsight, go to the **Access management** tab, and click **Add** to assign the `app_public` role to any account role.

    ![Access management tab for granting app_public role](../images/snowflake/setup_table_access_privilege.png)

    :::

- **Insert into existing table** - reference an existing table in your account. The app prompts you to grant it access to your table, then lets you map dataset columns to destination columns before inserting.

Click **Next: Export** to write the data to Snowflake.

## Run an Actor

The **Run Actor** page lets you trigger an Apify Actor run from within Snowflake and then import its results directly.

### Step 1: Select an Actor

Choose an Actor from two sources:

- **Recently used Actors** - lists Actors from your Apify account.
- **Apify Store** - browses publicly available Actors. Click **Load all Actors** to load the full catalog.

You can also type a custom Actor ID (for example, `apify/web-scraper`) directly into the input.

![Run Actor page with Actor source and selection dropdown](../images/snowflake/page_4_run_actor_step_1.png)

### Step 2: Configure and run

Provide the Actor input as a JSON object. You can copy the input from the Actor's page in [Apify Console](https://console.apify.com/store).

Expand **Advanced Run Options** to set:

- **Timeout** - maximum run duration in seconds (default 3600). Set to `0` for no timeout.
- **Memory** - RAM allocated to the run in MB (default 4096 MB). More memory means more CPU.

Click **Next: Run Actor** to start the run.

![Actor Input JSON form with Advanced Run Options](../images/snowflake/page_4_run_actor_step_3.png)

### Step 3: Monitor the run

The app polls the run status every five seconds and shows live updates. You can also follow the link to **View run in Apify Console** for full logs.

![Actor run in progress with live status updates](../images/snowflake/page_4_run_actor_step_4.png)

Use the **Abort Actor run** button to stop the run at any time.

### Step 4: Import results

When the run completes, click **Next: Import dataset** to go straight to the **Import Data from Dataset** page with the run's default dataset pre-filled. Follow the [import steps](#import-a-dataset) to load the results into Snowflake.

![Completed Actor run with Next: Import dataset button](../images/snowflake/page_4_run_actor_step_5.png)

## Next steps

With Apify data in Snowflake, you can query it with standard SQL, join it with your existing tables, and connect it to BI tools like Tableau, Looker, or Snowflake's own data sharing features.

If you have any questions or need assistance, contact us at [integrations@apify.com](mailto:integrations@apify.com), through our live chat, or in our [developer community on Discord](https://discord.com/invite/jyEM2PRvMU).
