---
title: Actors
description: Learn how to develop, run and share serverless cloud programs. Create your own web scraping and automation tools and publish them on the Apify platform.
menuWeight: 7
category: platform
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actor
    - actors
---

# Actors

Actors are serverless cloud programs that can do almost anything a human can do in a web browser. They can do anything from small tasks like filling in forms or unsubscribing from online services, all the way up to scraping and processing vast numbers of web pages.

You can use actors [manually in the Apify console](https://console.apify.com/actors), using [API](/api/v2) or [scheduler]({{@link schedules.md}}). You can easily [integrate them with other apps]({{@link tutorials/integrations.md}}) and share your actors with other Apify users via our [access rights]({{@link access_rights.md}}) system.

> New to Apify? [Try actors with our **quick start** tutorial]({{@link tutorials/quick_start.md}}).

A single isolated actor consists of source code and various settings. You can think of an actor as a cloud app or service that runs on the Apify platform. The run of an actor is not limited to the lifetime of a single HTTP transaction. It can run for as long as necessary, even forever.

## Section overview

* [Running]({{@link actors/running.md}})
  * [Input]({{@link actors/running/input.md}})
  * [Memory and CPU]({{@link actors/running/memory_and_cpu.md}})
  * [Compute units and consumption]({{@link actors/running/compute_units.md}})
* [Tasks]({{@link actors/tasks.md}})
* [Development]({{@link actors/development.md}})
  * [Base Docker images]({{@link actors/development/base_docker_images.md}})
  * [Builds]({{@link actors/development/builds.md}})
  * [Continuous integration]({{@link actors/development/continuous_integration.md}})
  * [Environment variables]({{@link actors/development/environment_variables.md}})
  * [Input schema]({{@link actors/development/input_schema.md}})
  * [Source code]({{@link actors/development/source_code.md}})
  * [State persistence]({{@link actors/development/state_persistence.md}})
  * [Testing and maintenance]({{@link actors/development/testing_and_maintenance.md}})
* [Paid actors]({{@link actors/paid_actors.md}})
* [Publishing]({{@link actors/publishing.md}})
  * [Naming your actor]({{@link actors/publishing/naming_your_actor.md}})
  * [SEO and promotion]({{@link actors/publishing/seo_and_promotion.md}})
* [Security]({{@link actors/security.md}})
* [Limits]({{@link actors/limits.md}})
* [Examples]({{@link actors/examples.md}})

## Public, private, and paid actors

Actors can be public (free or [paid]({{@link actors/paid_actors.md}})) or private. Private actors are yours to use and keep, and no one will see them if you don't want them to. Public actors are [available to everyone]({{@link actors/publishing.md}}) in [Apify Store](https://apify.com/store). You can make them free to use, or you can [charge for them](https://blog.apify.com/make-regular-passive-income-developing-web-automation-actors-b0392278d085/).

## Building public actors

There are four main stages of building a public actor:

1. [Development]({{@link actors/development.md}}).
2. [Publication]({{@link actors/publishing.md}}).
3. [Testing and maintenance]({{@link actors/development/testing_and_maintenance.md}}).
4. [Promotion]({{@link actors/publishing/seo_and_promotion.md}}).

While you don't have to maintain private actors, public actors are a more long-term project. Be prepared to stick with the project for at least a few months. Ensure you have enough time to maintain the project (~2 hours weekly). With this perspective, you will be able to monetize and promote your actors better.

Code quality is a priority. It is public on [Github](https://github.com), and your actors may be a new user's first and critical contact with Apify. Code should be open to changes and updates – don't fear to refactor. Beware of breaking changes, though! If you do a breaking change, communicate it to all existing users with an explanation.

Documentation is vital (your actor's README). It should be clear, detailed, and readable. Think of the users, who might not be developers, so use simple, easy-to-understand language and avoid technical jargon.

Ensure periodic testing. You can either do yourself or [set up automatic tests]({{@link actors/development/testing_and_maintenance.md}}) / [monitoring](https://apify.com/apify/monitoring). Try to prevent your users from coming to you with the issues.

### Inspiration

To come up with ideas for new actors, you can use your own experience with friends, colleagues, customers. Alternatively, you can use SEO tools that might help you to find the right search terms, websites related to web scraping, web automation, or web integrations. [See the SEO article]({{@link actors/publishing/seo_and_promotion.md}}) for more details. Finally, you may take a look at our [actor ideas page](https://apify.com/ideas) to find out which actors are most in demand by the Apify community.

To better understand the context and practical usage of public actors, [check out our blog](https://blog.apify.com/). Get familiar with how we think and write about actors, e.g. [Content Checker](https://blog.apify.com/how-to-set-up-a-content-change-watchdog-for-any-website-in-5-minutes-460843b12271) (short), [Kickstarter scraper](https://blog.apify.com/kickstarter-search-actor-create-your-own-kickstarter-api-7672acdb8d77) (mid-size), and [Google Sheets actor](https://blog.apify.com/import-data-easily-to-and-from-google-sheets-with-a-new-apify-actor-43536b719029) (long one).
