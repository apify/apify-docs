---
title: Publishing your actor
description: Prepare your actor for Apify Store with a description and README file and learn how to make your actor available to the public.
menuWeight: 1
paths:
  - apify-platform/publishing-actors-on-apify-store/publishing-your-actor
---

# [](#publishing-actor) Publishing your actor

Before you make your actor public, it is important to write a good **Description** and **README** sections, so that users can understand what your actor does, how to configure its inputs, and what kind of output it returns.

You can find the Title and description configurations by going to **Apify Console** → **Actors** → **My Actors** → **your-actor** → **Settings → Publication**

![Actor publication settings]({{@asset apify_platform/publishing_actors_on_apify_store/images/actor-publication-settings.webp}})

Writing a complete and descriptive README can significantly increase your chances of convincing users to give your actors a try. Not only that, but you can also include popular keywords in text to increase the traffic to your actor's page. For more information on how you can **fine-tune your actor’s title, description, and Readme**, check our in-depth [SEO guide](https://docs.apify.com/actors/publishing/seo-and-promotion).

Now, let’s move on to understand exactly how to add a description and README to your Apify actors.

## [](#description) Description

The actor’s description is a short paragraph describing the actor’s purpose. It will be displayed on the actor’s page right below its title.

![Actor title and description]({{@asset apify_platform/publishing_actors_on_apify_store/images/actor-title-description.webp}})

While writing your actor’s description you also have the option to write an SEO title and description. The SEO title and description are used in place of the actor name and description on search engine results pages. Good SEO titles and descriptions utilize popular keywords, summarize the actor functionality, and are between 40-50 and 140-156 characters long, respectively.

![SEO title and description]({{@asset apify_platform/publishing_actors_on_apify_store/images/actor-SEO.webp}})

## [](#readme) README

The next step is to write a **README** detailing the actor’s features, reasons to scrape the targeted website, and an explanation about how to use the actor.

Keep in mind that the actor’s README is generated from your README.md file, and you can apply the same [SEO principles](https://docs.apify.com/actors/publishing/seo-and-promotion) throughout the README.

To save some time when writing an actor’s README, we recommend using the template below as a starting point:

[https://github.com/zpelechova/readme-template](https://github.com/zpelechova/readme-template)

Note that the complexity of the README should match the actor’s complexity. This means that the template above is not immutable and that you can adapt it to fit the particularities of your actor. You can check our guide, **[How to write great README for your actors](https://help.apify.com/en/articles/2912548-how-to-write-great-readme-for-your-actors)**, for more examples of README files.

## [](#make-your-actor-public) Make your actor Public

Once you have finished coding and testing your actor, it's time to publish it.

From your actor’s page in Apify Console, go to **Settings,** and scroll down to the **Public Information** section.

![Actor settings]({{@asset apify_platform/publishing_actors_on_apify_store/images/actor-settings.webp}})

Select the **Published** switch, and your actor should now be available to the public on Apify Store.

![Publish your actor]({{@asset apify_platform/publishing_actors_on_apify_store/images/publish-actor.webp}})

To check if everything went smoothly, you can go to [Apify Store](https://apify.com/store) and search for your actor’s name.

![Apify Store]({{@asset apify_platform/publishing_actors_on_apify_store/images/Apify-Store.webp}})

Then, click on your actor’s card and you will see your dedicated actor’s page. This is the page where users will most likely have their first contact with your actor, so make sure to carefully review it and check if everything is set up correctly.

![Actor page]({{@asset apify_platform/publishing_actors_on_apify_store/images/actor-page.webp}})

## [](#next) Next up

Congratulations! Now, your actor is available to the public in the Apify Store. In the [next lesson]({{@link apify_platform/publishing_actors_on_apify_store/monetizing_your_actor.md}})!, we'll learn how you can monetize your actors to start making money on the Apify platform.
