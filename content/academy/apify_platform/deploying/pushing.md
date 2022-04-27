---
title: Pushing
description: Create a new actor on the Apify Console and integrate it with your Github repository to run your code on the platform and automatically rebuild any new changes.
menuWeight: 4
paths:
- apify-platform/deploying/pushing
---

# [](#pushing) Pushing

Before we deploy our project onto the Apify platform, let's ensure that we've pushed the changes we made in the last 3 lessons into our remote Github repository.

In this lesson, we'll create a new actor on the Apify platform and integrate it with our repo so that any time we push to Github, the code on the platform is also updated and the actor is rebuilt. Though this all sounds quite complex, it can actually be done in 3 very simple steps.

## [](#creating-the-actor) Creating the actor

Before anything can be integrated, we've gotta create an actor. Luckily, this is super easy to do. Let's head over to our [Apify Console](https://console.apify.com) and click on the **New** button, then select the **Empty** template.

![Create new button]({{@asset apify_platform/getting_started/images/create-new-actor.webp}})

Easy peasy!

## [](#changing-source-location) Changing source code location

In the **Source** tab on the new actor's page, we'll click the dropdown menu under **Source code** and select **Git repository**. By default, this is set to **Multiple source files**.

![Select source code location]({{@asset expert_scraping_with_apify/images/select-source-location.webp}})

Now we'll paste the link to our Github repository into the **Git URL** text field and click **Save**.

## [](#adding-repo-webhook) Adding the webhook to the repository

The final step is to click on **API** in the top right corner of our actor's page:

![API button]({{@asset expert_scraping_with_apify/images/api-button.webp}})

And scroll through all of the links until we find the **Build actor** API endpoint. Now we'll copy this endpoint's URL, head back over to our Github repository and navigate to **Settings > Webhooks > Add webhook**. The final thing to do is to paste the URL and save the webhook.

![Adding a webhook to your Github repo]({{@asset expert_scraping_with_apify/images/github-integration.webp}})

That's it! the actor should now pull its source code from the repo and automatically build.

## [](#next) Next up

In our next [exciting lesson]({{@link apify_platform/deploying/monetizing.md}}), we'll be learning how to publish our actor to the rest of the world, then monetize it.
