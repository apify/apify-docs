---
title: Publishing actors
description: Learn how to make your actor available to the public or keep it private. Prepare your actor for Apify Store with a description and README file.
menuTitle: Publishing
menuWeight: 7.6
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actor/publishing
    - actors/publishing
---

# Publishing your actor

[//]: # (TODO: This section is pretty outdated)
Once you have finished coding and testing your actor, it's time to publish it. Go to the **Publication** tab on the actor's detail page and select the **Published** switch.

![Publish your actor in the Apify Console]({{@asset actors/publishing/images/publish.webp}})

As well as a README, input schema, and a category, you'll need a **username**. You can set one on your [Account](https://console.apify.com/account?tab=settings) page. Choose your username wisely, as changing it at a later stage will break any [integrations]({{@link integrations.md}}) that use it.

## Private or public?

Actors can be private or public.

Public actors are shown in the [store](https://apify.com/store) and can be run by anyone. Each public actor has a globally unique identifier that consists of the owner's username and the actor name, e.g. [apify/hello-world](https://apify.com/apify/hello-world).

Private actors can only be accessed and started by their owner. To keep your actor private, keep the **Published** switch in the **Publication** tab on **Off**.

## Title

The title should be simple and clear. Use the official name of the website your actor is for and add its function, e.g. **Scraper** / **Tool** / **Example** to make its function clear to users. Do not use abbreviations, as they might confuse users.

[See our tips for naming actors]({{@link actors/publishing/naming_your_actor.md}}).

## Description

In one or two sentences (ideally), describe you actor's main feature. Use simple, specific, non-technical language that all users will understand.

To add more details, including technical documentation, you can include a README. If the actor's source code is hosted in a [Git repository]({{@link actors/development/source_code.md#git-repository}}), [Zip file]({{@link actors/development/source_code.md#zip-file}}) or [GitHub Gist]({{@link actors/development/source_code.md#github-gist}}), add a **README.md** file to the repository's root. To see an example, visit [apify/web-scraper](https://apify.com/apify/web-scraper).

## Categories

Pick the category from the user's perspective. Try to only pick one and only add more if necessary.

## SEO title and SEO description

If you leave these blank, the actor's regular title and description will be used. Read more on [SEO]({{@link actors/publishing/seo_and_promotion.md}}) and [promoting your actor]({{@link actors/publishing/seo_and_promotion.md}}).

## Running costs when making an actor public

**IMPORTANT:** Note that if you make an actor publicly available, and it's used by other people, their usage is not charged towards your account. The user running the actor is always the one who pays for the computational resources consumed by an actor's execution.

