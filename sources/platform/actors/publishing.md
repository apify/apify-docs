---
title: Publishing your actor
description: Prepare your actor for the Apify Store with a description and README file and learn how to make your actor available to the public.
sidebar_position: 7.5
slug: /actors/publishing
---

# Publishing your actor {#publishing-actor}

**Prepare your actor for the Apify Store with a description and README file and learn how to make your actor available to the public.**

---

Before you make your actor public, it is important to make sure your actor has good **Description** and **README** sections so that users can understand what your actor does, how to configure its inputs, and what kind of output it returns. In this lesson, we will briefly go over each of the fields you have to fill in before publishing your actor. For more detailed information about [SEO and promotion](/academy/get-most-of-actors/seo-and-promotion) and [how to write a comprehensive README](/academy/get-most-of-actors/actor-readme), check our guides at Apify Developer Academy.

You can find the Title and description configurations by going to **Apify Console** → **Actors** → **My Actors** → **your-actor** → **Settings → Publication**

![Actor publication settings](./images/actor-publication-settings.webp)

## Description {#description}

The actor’s description is a short paragraph describing the actor’s purpose. It will be displayed on the actor’s page right below its title.

![Actor title and description](./images/actor-title-description.webp)

While writing your actor’s description you also have the option to write an SEO title and description. The SEO title and description are used in place of the actor name and description on search engine results pages. Good SEO titles and descriptions utilize popular keywords, summarize the actor functionality, and are between 40-50 and 140-156 characters long, respectively.

![SEO title and description](./images/actor-SEO.webp)

## README {#readme}

The next step is to include a **README** detailing the actor’s features, reasons to scrape the targeted website, and an explanation about how to use the actor.

Keep in mind that the actor’s README is generated from your README.md file, and you can apply the same [SEO principles](/academy/get-most-of-actors/seo-and-promotion) described in the previous lesson to your README.

To save some time when writing an actor’s README, you can use the template below as a starting point:

[https://github.com/zpelechova/readme-template](https://github.com/zpelechova/readme-template)

Note that the complexity of the README should match the actor’s complexity. This means that the template above is not immutable and that you can adapt it to fit the particularities of your actor.

## Make your actor Public {#make-your-actor-public}

Once you have finished coding and testing your actor, it's time to publish it.

From your actor’s page in Apify Console, go to **Publication → Display information**, fill in all the relevant fields for your actor (e.g., "Icons","Actor name", "Description", "Categories") and save it.

![Actor settings](./images/actor-display-information.webp)

Once all the fields are filled in, you will notice that the button **Publish to Store** will turn green. Just click on it and your actor should now be available to the public on Apify Store.

![Publish your actor](./images/publish-actor-to-store.webp)

To check if everything went smoothly, you can go to [Apify Store](https://apify.com/store) and search for your actor’s name.

![Apify Store](./images/Apify-Store.webp)

Then, click on your actor’s card and you will see your dedicated actor’s page. This is the page where users will most likely have their first contact with your actor, so make sure to carefully review it and check if everything is set up correctly.

![Actor page](./images/actor-page.webp)

## Actor testing {#actor-testing}

Apify has a QA system that regularly runs automated tests to ensure that all actors in the store are functional.

The test runs the actor with its default input (defined by the **prefill** option in the input schema file) and expects it to finish with a **Succeeded** status within 5 minutes of the beginning of the run.

![Actor page](./images/actor-test.webp)

If the actor fails to complete successful runs for three consecutive days, the developer will be notified, and the actor will be labeled **Under Maintenance** until it is fixed. After another 14 days of failing runs, you will receive another notification. Finally, if the runs continue to fail after yet another 14 days, the actor will be **Deprecated**.

### What if my actor cannot comply with the test logic?

Actors that require some sort of authentication will always fail the tests despite being fully functional. If that's the case with your actor, please contact support at **support@apify.com** and explain your specific use case that justifies why the actor should be excluded from the automated tests.

### Advanced actor testing

You can easily implement your own tests and customize them to fit your actor's particularities by using our public [Actor Testing](https://apify.com/pocesar/actor-testing) tool available on the Apify store.
