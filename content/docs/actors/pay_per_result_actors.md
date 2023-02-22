---
title: Actors paid per result
description: Find out how this model differs from the traditional "pay for usage" model and how this benefits you.

menuWeight: 7.4
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actors/pay-per-result-actors
---

This page explains how the new pricing model for actors in [Apify store](https://apify.com/store) allows you to pay only for the results an actor generates and not the underlying platform usage. This makes it transparent and easy to estimate upfront costs. If you have any feedback or would like to ask something, please join our [Discord](https://discord.gg/qkMS6pU4cF) community and let us know!

## Traditional approach - paying for usage

There are two types of public actors in [Apify Store](https://apify.com/store): free and [paid actors](https://docs.apify.com/platform/actors/paid-actors). The latter requires a monthly fee to rent the actor and use it after its trial period. When you run either a free or paid actor from the store, they generate platform usage that is subtracted from your prepaid usage, which is either $5 on the free plan or prepaid usage given by your subscription plan.

![Free and paid actors in Apify Store]({{@asset actors/images/free_vs_paid_actors.webp}})

Platform usage includes components such as [compute](https://docs.apify.com/platform/actors/running/compute-units), operations on [storages](https://docs.apify.com/platform/storage), and usage of [residential proxies](https://docs.apify.com/platform/proxy/residential-proxy) or [SERPs](<https://docs.apify.com/platform/proxy/google-serp-proxy>). You can find the details of your actor usage on the run detail page.

![Example run usage]({{@asset actors/images/example_run_usage.webp}})

With this model, it is quite difficult to know beforehand exactly how much usage the actor will generate when you run it, so you cannot easily estimate your costs upfront.

## Paying only for results instead

With the **pay per result** model, you only pay for the results that an actor returns when you run it, and you are not charged for the underlying platform usage. Technically, **results** you are charged for are the clean items in the default [dataset](https://docs.apify.com/platform/storage/dataset) created by the actor run.

<!-- TODO - add a bit about the ability to set the maximum limits actor should return -->

### How do I know an actor is paid per result?
An actor that is paid per result will display the price per 1,000 items in the store.

![Pay per result actor in store]({{@asset actors/images/pay_per_result_actor_store_card.webp}})

When you try the actor on the platform, you will see that the actor is paid per result next to the actor name.

![Actor paid per result in Console]({{@asset actors/images/console_pay_per_result_tag.webp}})

### Do I need to pay a monthly rental fee to run the actor?
No, the actor is free to run. You only pay for the results.

### What happens when I interact with the dataset after the run finishes?
Under the **pay per result** model, all platform costs generated **during the run of an actor** are not charged towards your account; you pay for the results instead. After the run finishes, any interactions with the default dataset storing the results, such as reading the results or writing additional data, will incur the standard platform usage costs. But do not worry, in the vast majority of cases, you only want to read the result from the dataset and that costs near to nothing.

### Do I pay for the storage of results on the Apify platform?
You will still be charged for the timed storage of the data in the same fashion as before. You can always decide to delete the dataset to reduce your costs after you export the data from the platform. By default, any unnamed dataset will be automatically removed after your data retention period, so in most cases, this is nothing to worry about.

### Where do I see how much I was charged for the pay-per-result actors?
You can see the overview of how much you have been charged for actors paid by result on your invoices and in the [Usage tab](https://console.apify.com/billing) of the Billing section in Console. It will be shown there as a separate service.

![Statistics in the billing section]({{@asset actors/images/pay_per_result_billing_usage_section.webp}})

<!-- TODO - add info about where to see this at per-actor level -->
<!-- TODO - add info about how to see this on run detail -->

