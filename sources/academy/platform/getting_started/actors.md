---
title: Actors
description: What is an Actor? How do we create them? Learn the basics of what Actors are, how they work, and try out an Actor yourself right on the Apify platform!
sidebar_position: 1
slug: /getting-started/actors
---

# Actors {#actors}

**What is an Actor? How do we create them? Learn the basics of what Actors are, how they work, and try out an Actor yourself right on the Apify platform!**

---

After you've followed the **Getting started** lesson, you're almost ready to start creating some Actors! But before we get into that, let's discuss what an Actor is, and a bit about how they work.

## What's an Actor? {#what-is-an-actor}

When you deploy your script to the Apify platform, it is then called an **Actor**, which is a [serverless microservice](https://www.datadoghq.com/knowledge-center/serverless-architecture/serverless-microservices/#:~:text=Serverless%20microservices%20are%20cloud-based,suited%20for%20microservice-based%20architectures.) that accepts an input and produces an output. Actors can run for a few seconds, hours or even infinitely. An Actor can perform anything from a simple action such as filling out a web form or sending an email, to complex operations such as crawling an entire website and removing duplicates from a large dataset.

Once an Actor has been pushed to the Apify platform, they can be shared to the world through the [Apify Store](https://apify.com/store), and even monetized after going public.

> Though the majority of Actors that are currently on the Apify platform are scrapers, crawlers, or automation software, Actors are not limited to just scraping. They are just pieces of code running in Docker containers, which means they can be used for nearly anything.

## Actors on the Apify platform {#actors-on-platform}

For a super quick and dirty understanding of what a published Actor looks like, and how it works, let's run an SEO audit of **apify.com** using the [SEO audit Actor](https://apify.com/drobnikj/seo-audit-tool).

On the front page of the Actor, click the green **Try for free** button. If you're logged into your Apify account which you created during the [**Getting started**](./index.md) lesson, you'll be taken to the Apify Console and greeted with a page that looks like this:

![Actor configuration](./images/seo-actor-config.png)

This is where we can provide input to the Actor. The defaults here are just fine, so we'll just leave it as is and click the green **Start** button to run it. While the Actor is running, you'll see it log some information about itself.

![Actor logs](./images/actor-logs.jpg)

After the Actor has completed its run (you'll know this when you see **SEO audit for apify.com finished.** in the logs), the results of the run can be viewed by clicking the **Results** tab, then subsequently the **View in another tab** option under **Export**.

## The "Actors" tab {#actors-tab}

While still on the platform, click on the tab with the **< >** icon which says **Actors**. This tab is your one-stop-shop for seeing which Actors you've used recently, and which ones you've developed yourself. You will be frequently using this tab when developing and testing on the Apify platform.

![The "Actors" tab on the Apify platform](./images/actors-tab.jpg)

Now that you know the basics of what Actors are and how to use them, it's time to develop **an Actor of your own**!

## Next up {#next}

Get ready, because in the [next lesson](./creating_actors.md), you'll be writing your very own Actor!
