---
title: Quick start
description: Learn how to run any actor in Apify Store or create your own. A step-by-step guide through your first steps on the Apify platform.
menuWeight: 3.1
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actor/quick-start
    - actors/quick-start
    - tutorials/quick-start
---

# Quick start

In this article, you will find the very basics of using the Apify platform. It shows you the principles of running any actor in Apify Store and the basics of making them using the in-app code editor.

When you're done here, [see our Apify scrapers tutorials]({{@link tutorials/apify_scrapers.md}}) to learn about our main tools. If you're comfortable using JavaScript, [check out the Apify SDK](https://sdk.apify.com), which has plenty of [tutorials to get you going](https://sdk.apify.com/docs/guides/quick-start).

**You will need an Apify account to complete this tutorial. If you don't have one, [complete the sign-up process](https://console.apify.com/sign-up) first.**

## Run an actor

**1.** Navigate to [apify.com/store](https://apify.com/store) and pick any actor you like the look of. We'll pick the [Google Search Results Scraper](https://apify.com/apify/google-search-scraper).

![Apify store]({{@asset tutorials/images/apify-store.webp}})

**2.** On the actor's page, click the **Try for free** button.

![Try for free]({{@asset tutorials/images/try-for-free.webp}})

**3**. This will take you to [Apify Console](https://console.apify.com), where you will see the screen below.

![Actor input view]({{@asset tutorials/images/actor-input-view.webp}})

**4.** Don't be put off by all the boxes - the actor is pre-configured to run without any extra input. Just click the **Run** button in the bottom-left corner and it will start.

Alternatively, you can play around with the settings to make the results more interesting for you.

**5.** Wait for the actor to run...

**6.** Get your results!

Click on the flashing **Results** button.

![Actor successful run view]({{@asset tutorials/images/actor-run-view.webp}})

Then, choose which format you want your data in and check it out.

![Choose the data format]({{@asset tutorials/images/actor-run-results.webp}})

Here is a preview of the actor's output as a table.

![Dataset preview]({{@asset tutorials/images/actor-run-dataset.webp}})

## Create an actor

**1.** [Go to the **Actors** section](https://console.apify.com/actors) in the Apify Console and click on the **Create new** button.

![Create a new actor]({{@asset tutorials/images/create-actor.webp}})

**2.** Go to the **Source** tab and paste the Node.js code below into the **Source code** editor.

```js
const Apify = require('apify');

Apify.main(async () => {
    console.log('Hello world from Actor!');
});
```

**3.** Click **▷ Run** in the **Developer console** below to build and run your actor. After the run is finished, you should see something like:

![Apify actor run log]({{@asset tutorials/images/run-log.webp}})

Congratulations, you have successfully created and run your first actor!

### Accepting input

Let's try something little more advanced. We will enable the actor to accept input and generate output (for more details, [see the Input article]({{@link actors/running/input.md}})).

**1.** Paste the code below into the **Source code** editor.

```js
const Apify = require('apify');

Apify.main(async () => {
    // Get input and print it
    const input = await Apify.getInput();
    console.log('My input:');
    console.dir(input);
});
```

**2.** Save your actor by clicking **Save** and then rebuild it by clicking **Build**.

**3.** After the build is finished, go to the **Developer console** and set the **Input** to:

```json
{ "hello": 123 }
```

![Apify actor run log]({{@asset tutorials/images/create-actor-set-input.webp}})

**4.** Click **Run**. When the run finishes, you will see something like:

![Apify actor run log]({{@asset tutorials/images/run-log-2.webp}})

Excellent, you have just created your first actor that accepts input and stores output! Now you can start adding some magic.

You can program an Apify actor to do anything one can do in the browser, from sending emails to processing vast amounts of data. For examples and inspiration, [visit Apify Store](https://apify.com/store).

### Building more advanced actors

The above actor (and many others) uses the `apify` [NPM package](https://www.npmjs.com/package/apify), which simplifies the development of actors. The Apify SDK has tutorials on how you can [get started](https://sdk.apify.com/docs/guides/getting-started).

If you are building your own actors, you'll probably prefer to host the source code on Git. To do that, follow these steps:

1. Create a new Git repository.
2. Copy the boilerplate actor code from the [apify/quick-start](https://github.com/apify/actor-quick-start) actor.
3. Set **Source type** to **Git repository** for your actor in the app.
4. Paste the Git repo link to **Git URL**, save changes and build your actor.
5. That's it, now you can develop your actor locally on your computer and run it in the Apify cloud!

For more information, see the [Git repository]({{@link actors/development/source_code.md#git-repository}}) section.

## What's next?

* [Try some other actors from Apify Store](https://apify.com/store).
* Learn to use our main scrapers: [Web Scraper]({{@link tutorials/apify_scrapers/web_scraper.md}}), [Cheerio Scraper]({{@link tutorials/apify_scrapers/cheerio_scraper.md}}), and [Puppeteer Scraper]({{@link tutorials/apify_scrapers/puppeteer_scraper.md}}).
* Learn more about using actors: [tasks]({{@link actors/tasks.md}}), [storages]({{@link storage.md}}), and [proxies]({{@link proxy.md}}).
* [Set up the `apify` package on your computer](https://sdk.apify.com/docs/guides/getting-started) and [build your own actors](https://sdk.apify.com/docs/guides/quick-start) with the Apify SDK.
