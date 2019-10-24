---
title: Publishing
description: Documentation of Apify actors - a serverless computing jobs that enable execution of long-running web scraping and automation tasks in the cloud.
menuWeight: 3.5
---

## [](#publishing)Publishing

Actors can be private or public. Private actors can only be accessed and started by their owner, while public actor are shown in the [store](https://apify.com/store) and can be run by anyone. Each public actor has a globally unique identifier that consists of the owner's username and the actor name, e.g. [apify/hello-world](https://apify.com/apify/hello-world).

To publish your actor, go to **Settings → Permissions** on the actor detail page and click the **Publish** button. You'll need to have a username set. This can be done on the [Profile](https://my.apify.com/account#/profile) page.

The short actor description shown in the store is taken from **Settings → Description**. Additionally, if the actor's source code is hosted in a [Git repository]({{@link actor/source_code.md#source-git-repo}}), [Zip file]({{@link actor/source_code.md#source-tarball}}) or [GitHub Gist]({{@link actor/source_code.md#source-github-gist}}), you can add a long description in [Markdown _open_in_new_](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) language to the `README.md` or `README` files in the root of the source code directory. To see an example of how this looks, go to [apify/web-scraper](https://apify.com/apify/web-scraper).

**IMPORTANT:** Note that if your actor is public and used by other people, its usage is not charged towards your account. The user running the actor is always the one who pays for the computational resources consumed by an actor's execution.
