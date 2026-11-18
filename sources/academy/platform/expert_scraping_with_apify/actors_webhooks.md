---
title: Webhooks & advanced Actor overview
description: Learn more advanced details about Actors, how they work, and the default configurations they can take. Also, learn how to integrate your Actor with webhooks.
sidebar_position: 6.1
sidebar_label: I - Webhooks & advanced Actor overview
slug: /expert-scraping-with-apify/actors-webhooks
pagination: true
---

**Learn more advanced details about Actors, how they work, and the default configurations they can take. Also, learn how to integrate your Actor with webhooks.**

---

In this course, you'll take an existing Amazon scraper and extend it lesson by lesson with features you'll need when running scrapers on the Apify platform. This first lesson takes a more in-depth look at Actors and shows how to connect them with webhooks.

## The Amazon scraper {#amazon-scraper}

Each lesson of this course builds on top of [academy-amazon-scraper](https://github.com/apify-projects/academy-amazon-scraper), a starter project with a ready-made Amazon scraper, so you don't need to write one from scratch. The scraper takes a keyword, searches Amazon for it, and saves every offer for each product it finds. One product can have several offers from different sellers, and each offer is saved as a separate item in the dataset.

To follow the course, you need [Node.js](https://nodejs.org/) 24 or newer, the [Apify CLI](/cli/docs/installation), and an [Apify account](https://console.apify.com). Clone the repository, install its dependencies, and log in to Apify:

```bash
git clone https://github.com/apify-projects/academy-amazon-scraper.git
cd academy-amazon-scraper
npm install
apify login
```

Amazon blocks scrapers quickly, so the scraper uses [Apify Proxy](/proxy) with residential IP addresses. Connecting to Apify Proxy from your own computer requires a paid plan, so throughout the course, we'll run the scraper on the Apify platform, where the free plan is enough. Deploy it there:

```bash
apify push
```

Then open the **academy-amazon-scraper** Actor in [Apify Console](https://console.apify.com/actors) and start it to check that it works. A run with the default input costs a few cents. The project's README explains how the scraper works, so read it before moving on.

## Advanced Actor overview {#advanced-actors}

Take a look at the files within the project. You'll notice that there is a **Dockerfile** in the project's root folder. Every single Actor has a Dockerfile (the Actor's **Image**) which tells Docker how to spin up a container on the Apify platform which can successfully run the Actor's code. "Apify Actors" is a serverless platform that runs multiple Docker containers. For a deeper understanding of Actor Dockerfiles, refer to the [Apify Actor Dockerfile docs](/sdk/js/docs/guides/docker-images#example-dockerfile).

## Webhooks {#webhooks}

Webhooks are a powerful tool that can be used for just about anything. You can set up actions to be taken when an Actor reaches a certain state (started, failed, succeeded, etc). These actions usually take the form of an API call (generally a POST request).

## Learning 🧠 {#learning}

Prior to moving forward, please read over these resources:

- Read about [running Actors, handling Actor inputs, memory and CPU](/actors/running).
- Learn about [Actor webhooks](/integrations/webhooks), which we will implement in the next lesson.
- Learn [how to run Actors](/academy/api/run-actor-and-retrieve-data-via-api) using Apify's REST API.

## Knowledge check 📝 {#quiz}

1. How do you allocate more CPU for an Actor's run?
2. Within itself, can you get the exact time that an Actor was started?
3. What are the types of default storages connected to an Actor's run?
4. Can you change the allocated memory of an Actor while it's running?
5. How can you run an Actor with Puppeteer on the Apify platform with headless mode set to `false`?

## Our task {#our-task}

In this task, we'll be building on top of the **academy-amazon-scraper** Actor you deployed at the beginning of this lesson.

Once our Amazon Actor has completed its run, we might want to send an email to ourselves, but let's call another Actor through a webhook instead. The Actor called will be a new Actor that you will create. It will take the dataset ID as input, then filter through all of the results and return only the cheapest result for each unique ASIN. All of the results of the Actor will be pushed to its default dataset.

[**Solution**](./solutions/integrating_webhooks.md)

## Next up {#next}

This course's [next lesson](./managing_source_code.md) is brief, but discusses a very important topic: managing your code and storing it in a safe place.
