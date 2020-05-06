---
title: Publishing
description: Documentation for the process of publishing an actor in the Apify Store.
menuWeight: 3.6
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actor/publishing
    - actors/publishing
---

# [](#publishing) Publishing your actor

To publish your actor, go to the **Publication** tab on the actor detail page and tick the **Published** box.

As well as the requirements shown under `Is everything set?`, you'll need a username. You can set one on your [Profile](https://my.apify.com/account#/profile) page. Choose your username wisely, as changing it at a later stage will break any API URLs that contain it.

## [](#private-or-public) Private or public?

Actors can be private or public. 

Public actors are shown in the [store](https://apify.com/store) and can be run by anyone. Each public actor has a globally unique identifier that consists of the owner's username and the actor name, e.g. [apify/hello-world](https://apify.com/apify/hello-world).

Private actors can only be accessed and started by their owner. To keep your actor private, keep the **Published** box in the **Publication** tab unticked.

## [](#description) Description

The short actor description shown in the store is taken from **Settings → Description**. Additionally, if the actor's source code is hosted in a [Git repository]({{@link actors/source_code.md#git-repository}}), [Zip file]({{@link actors/source_code.md#zip-file}}) or [GitHub Gist]({{@link actors/source_code.md#github-gist}}), you can add a long description in the [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) language to the `README.md` file in the root of the source code's directory. To see an example of how this looks, visit [apify/web-scraper](https://apify.com/apify/web-scraper).

## [](#charges) Charges

**IMPORTANT:** Note that if your actor is public and used by other people, its usage is not charged towards your account. The user running the actor is always the one who pays for the computational resources consumed by an actor's execution.

