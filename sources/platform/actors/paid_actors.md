---
title: Paid actors
description: Learn how actor rentals work on the Apify platform. Find out about running costs, what you need to rent an actor, and how to pay for your rentals.
sidebar_position: 7.4
slug: /actors/paid-actors
---

# Paid actors

**Learn how actor rentals work on the Apify platform. Find out about running costs, what you need to rent an actor, and how to pay for your rentals.**

---

Paid actors are a new feature in [Apify Store](https://apify.com/store). They're like any other public actors, but with a slight difference. In order to use a paid actor, you **rent** it and pay a monthly fee to the developer. This empowers the developer to dedicate more time and effort to their actors. It ensures that these actors are of the **highest quality** and receive **ongoing maintenance**.

![Paid actors in Apify Store](./images/paid-actors-store.png)

Each paid actor has a **free trial,** followed by a flat monthly rental fee that is automatically charged **from your platform usage credits** in advance for the following month. The trial's length is always shown for each paid actor.

For more information about how to monetize your actor, best practices and SEO and promotion tips and tricks, head over to the [Getting the most of your public actors on Apify Store](/academy/get-most-of-actors) section of the Apify Developers Academy.

![Paid actors free trial](./images/paid-actors-trial.png)

<!-- You can read more about why we released paid actors in [this blog post](tbd) from Apify CEO Jan Čurn. -->

## Can I run paid actors via API or the Apify client?

Yes, when you are renting a paid actor, you can run it using either our [API](/api/v2) or [JavaScript](https://docs.apify.com/api/client/js) or [Python](https://docs.apify.com/api/client/python) clients as you would do with private or free public actors.

## Do I pay platform costs for running paid actors?

Yes, you will pay normal [platform usage costs](https://apify.com/pricing/actors) on top of the monthly actor rental fee. The platform costs work exactly the same way as for free public actors or your private actors. You should find estimates of the cost of usage in each individual paid actor's README ([see an example](https://apify.com/drobnikj/crawler-google-places#how-much-will-it-cost)).

## Do I need an Apify paid plan to use paid actors?

You don't need a paid plan to start a paid actor's free trial. Just activate the trial, and you are good to go. After that, you will need to subscribe to one of [Apify's paid plans](https://apify.com/pricing) in order to keep renting the actor and continue using it.

## When will I be charged for the actor rental?

You always prepay the actor rental for the following month. The first payment happens when the trial expires, and then recurs monthly. When you open the actor in the Apify Console, you will see when the next rental payment is due, and you will also receive a notification when it happens.

**Example**: You activate a 7-day trial of an actor at **noon of April 1, 2021**. If you don't turn off auto-renewal, you will be charged at **noon on April 8, 2021**, then **May 8, 2021**, and so on.

## How am I charged for actor rental?

The rental fee for an actor is automatically subtracted from your platform usage credits, similarly to, e.g. [compute units](/platform/actors/running/compute-units). If you don't have enough credits prepaid, you will need to cover any overage in the next invoice.

## Will I be automatically charged at the end of the free trial?

If you have an [Apify paid plan](https://apify.com/pricing), you will be automatically charged the monthly rental fee at the end of your free trial and you will be able to run the actor for another month. If you aren't subscribed to an Apify plan, you will need to subscribe to one of [Apify's paid plans](https://apify.com/pricing) in order to continue using the actor after the trial has ended.

Apart from the monthly rental fee, you will be charged standard platform costs for running the actor (this is why you need to be subscribed), as you would be for any other actor, including your private ones.

## Can I cancel my actor rental?

During your trial or any time after that, **you can always turn off auto-renewal** so that you are not charged when your current actor rental expires. If you choose to do so, you can always turn it back on later.

## Where can I see how much I have paid for actor rental?

Since actor rental fees are paid from platform usage credits, these fees conceptually belong under platform usage.

Hence, you can find the breakdown of how much you have been charged for paid actors on the bottom of the **Platform usage** tab in the [Billing](https://console.apify.com/billing) section. The overall sum will also be visible in the usage bar chart and the table on the top of the same tab.

![Paid actors billing in Apify Console](./images/paid-actors-billing.png)

## How do I report issues with an actor?

Each actor has an `Issues` tab present in the Apify Console. There, you can open an issue (ticket) and chat with the actor's author, platform admins,
and other users of this actor. Please, feel free to use the tab to ask any questions, request new features or give feedback. Alternatively, you can
always write to [community@apify.com](mailto:community@apify.com).

![Paid actors issues tab](./images/paid-actors-issues-tab.png)

## How do I give general feedback on paid actors?

Paid actors are still in **beta** stage, and you will likely be one of this feature's very first users. So, if you have any feedback which is not actor-specific, but relates more to the experience of renting an actor or similar topics, please let us know at [community@apify.com](mailto:community@apify.com). Thank you!
