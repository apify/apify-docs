---
title: I - Webhooks & advanced actor overview
description: Learn more advanced details about actors, how they work, and the default configurations they can take. Also learn how to integrate your actor with webhooks.
menuWeight: 6.1
paths:
    - expert-scraping-with-apify/actors-webhooks
---

# [](#webhooks-and-advanced-actors) Webhooks & advanced actor overview

Thus far, you've run actors on the platform and written an actor of your own, which you published to the platform yourself using the Apify CLI; therefore, it's fair to say that you are becoming more familiar and comfortable with the concept of **actors**. Within this lesson, we'll take a more in-depth look at actors and what they can do.

## [](#advanced-actors) Advanced actor overview

In this course, we'll be working out of the Amazon scraper project from the **Web scraping for beginners** course. If you haven't already built that project, you can do it in three short lessons [here]({{@link web_scraping_for_beginners/challenge.md}}).

Take another look at the files within your Amazon scraper project. You'll notice that there is a **Dockerfile**. Every single actor has a Dockerfile (the actor's **Image**) which tells Docker how to spin up a container on the Apify platform which can successfully run the actor's code. "Apify Actors" is basically just a serverless platform that is running multiple Docker containers. For a deeper understanding of actor Dockerfiles, refer to the [Apify actor Dockerfile docs](https://sdk.apify.com/docs/guides/docker-images#example-dockerfile).

## [](#webhooks) Webhooks

Webhooks are a powerful tool that can be used for just about anything. You can set up actions to be taken for when an actor reaches a certain state (started, failed, succeeded, etc). These actions usually take the form of an API call (generally a POST request).

## [](#learning) Learning 🧠

Prior to moving forward, please read over these resources:

- Read about [running actors, handling actor inputs, memory and CPU](https://docs.apify.com/actors/running).
- Learn about [actor webhooks](https://docs.apify.com/webhooks), which we will implement in the next lesson.
- Learn [how to run actors](https://docs.apify.com/tutorials/integrations/run-actor-and-retrieve-data-via-api#run-an-actor-or-task) using Apify's REST API.

## [](#quiz) Knowledge check 📝

1. How do you allocate more CPU for an actor's run?
2. Within itself, can you get the exact time that an actor was started?
3. What are the types of default storages connected to an actor's run?
4. Can you change the allocated memory of an actor while it's running?
5. How can you run an actor with Puppeteer on the Apify platform with headless mode set to `false`?

## [](#our-task) Our task

In this task, we'll be building on top of what we already created in the previous lesson, so keep those files safe!

Once our Amazon actor has completed its run, we will, rather than sending an email to ourselves, call an actor through a webhook. The actor called will be a new actor that we will create together, which will take the dataset ID as input, then subsequently filter through all of the results and return only the cheapest one for each product. All of the results of the actor will be pushed to its default dataset.

[**Solution**]({{@link expert_scraping_with_apify/solutions/integrating_webhooks.md}})

## [](#next) Next up

This course's [next lesson]({{@link expert_scraping_with_apify/managing_source_code.md}}) is brief, but discusses a very important topic: managing your code and storing it in a safe place.
