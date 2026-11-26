---
title: Apify Store
description: Browse Apify Store to discover thousands of public Actors, understand their pricing models, and choose the right one for your automation needs.
sidebar_position: 1
slug: /actors/store
---

[Apify Store](https://apify.com/store) is a marketplace of thousands of ready-made Actors for web scraping, data extraction, and automation. You can choose from the available Actors and run them on the Apify platform without writing code. You can also publish your own Actors and monetize them.

Each Actor's page shows what it does, how much it costs, and how other users rate it.

## Pricing models

Every Actor in [Apify Store](https://apify.com/store) uses one of the following pricing models:

- [Pay per event](#pay-per-event), where you pay for specific events the Actor creator defines, such as generating a single result or starting the Actor. Most Actors include platform usage in the price, but some may charge it separately.
- [Pay per usage](#pay-per-usage), where you only pay for the platform resources that the Actor consumes. There are no additional charges from the Actor developer.

:::note Post-run storage costs
After a run finishes, any interactions with the dataset - such as reading or writing additional data - incur standard platform usage costs. This applies to all pricing models. Unnamed datasets are automatically removed after your data retention period, so long-term storage is rarely a concern.
:::

### Pay per event

The pay-per-event pricing model breaks the cost of running an Actor into specific, chargeable events. Such events might include producing a single result, uploading a file, or starting the Actor.

To view the Actor's events and their prices, go to the Actor's page in Apify Store and select the **Pricing** tab.

:::caution Some Actors charge platform usage separately

Most pay-per-event Actors include [platform usage](../running/usage-and-resources/index.md) in the event price. However, some Actors might charge for platform usage separately. Always check the pricing before you run the Actor.

:::

When starting a run, you can define a maximum charge limit to prevent unexpected charges. The Actor terminates gracefully when it reaches that limit. Even if it doesn't stop immediately, you are never charged above the limit.

All your charges appear on your invoices and in the [**Historical usage**](https://console.apify.com/billing/historical-usage) tab in the **Billing** section of Apify Console. The cost of each run also appears on the run detail page.

If charges seem incorrect, [open an issue](#report-issues-with-actors) on the Actor's page in Apify Console or contact [Apify support](https://apify.com/contact).

### Pay per usage

When you use a pay-per-usage Actor, you are only charged for the platform usage that the runs of this Actor generate. [Platform usage](../running/usage-and-resources/index.md) includes components such as compute units, operations on [storages](/storage), and usage of [residential proxies](/proxy/residential-proxy) or [SERPs](/proxy/google-serp-proxy).

![Pay for usage Actor example](./images/pay_per_usage_actor_example.webp)

:::info Estimating Actor usage cost

With this model, it's very easy to see how many platform resources each Actor run consumed, but it is quite difficult to estimate their usage beforehand. The best way to find the costs of free Actors upfront is to try out the Actor on a limited scope (for example, on a small number of pages) and evaluate the consumption. You can easily do that using our [free plan](https://apify.com/pricing).

_For more information on platform usage cost see the [usage and resources](../running/usage-and-resources/index.md) page._

:::

## Actors under maintenance

An Actor gets the **Under maintenance** label when it fails Apify's [automated tests](/actors/publishing/test), or when its developer sets it. Its page then shows the **This Actor is under maintenance** banner, sometimes with a message from the developer. If you run it, the run can fail or return incomplete results.

If an Actor you use is under maintenance:

- Run it with a small input and check the results.
- On the Actor's **Issues** tab, look for an issue that describes your problem. If there isn't one, create one to ask the developer.
- To find a replacement, select **Show similar Actors** in the banner, or search [Apify Store](https://apify.com/store).

Actors under maintenance rank lower in Apify Store. If an Actor keeps failing the tests, Apify deprecates it.

## Report issues with Actors

Each Actor has an **Issues** tab in Apify Console. There, you can open an issue (ticket) and chat with the Actor's author, platform admins,
and other users of this Actor. Please feel free to use the tab to ask any questions, request new features, or give feedback. Alternatively, you can
always write to [community@apify.com](mailto:community@apify.com).

![Paid Actors' issues tab](./images/paid-actors-issues-tab.webp)

## Apify Store discounts

Each Apify subscription plan includes a discount tier (_BRONZE_, _SILVER_, _GOLD_) that provides access to increasingly lower prices on selected Actors.

:::note Discount participation

Discount offers are optional and determined by Actor owners. Not all Actors participate in the discount program.

:::

Additional discounts are available for Enterprise customers.

To check an Actor's pricing and available discounts, visit the Pricing section on the Actor's detail page in Apify Store.

![Apify Store discounts](./images/apify_store_discounts_web.webp)

In Apify Console, you can find information about pricing and available discounts in the Actor's header section.

![Apify Store discounts](./images/apify_store_discounts_console.webp)

![Apify Store discounts full table](./images/apify_store_discounts_full_table.webp)
