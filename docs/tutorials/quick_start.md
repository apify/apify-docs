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

<!-- TODO push this tutorial with any starter packs - intro emails, show it to new users, etc -->

# Quick start

In this article, you will find the very basics of using the Apify platform. It shows you the principles of running any actor in Apify Store and the basics of making them using the in-app code editor.

Once you get to grips with this, [go through our Apify scrapers tutorials]({{@link tutorials/apify_scrapers.md}}) to learn about how our main tools work. If you're comfortable getting your hands into some JavaScript, [check out the Apify SDK](https://sdk.apify.com), which has plenty of [tutorials to get you going](https://sdk.apify.com/docs/guides/quick-start).

**You will need an Apify account to complete this tutorial. If you don't have one, [complete the sign-up process](https://my.apify.com/sign-up) first.**

## Run an actor

**1.** Navigate to [apify.com/store](https://apify.com/store) and pick any actor you like the look of. We'll pick the [Google Search Results Scraper](https://apify.com/apify/google-search-scraper).

![Apify store]({{@asset tutorials/images/apify-store.png}})

**2.** On the actor's page, click the **Try for free** button.

![Try for free]({{@asset tutorials/images/try-for-free.png}})

**3**. This will take you to the [Apify app](https://my.apify.com), where you will see the screen below.

![Actor input view]({{@asset tutorials/images/actor-input-view.png}})

**4.** Don't be put off by all the boxes - the actor is pre-configured to run without any extra input. Just click the **Run** button in the bottom-left corner and it will start.

Alternatively, you can play around with the settings to make the results more interesting for you.

**5.** Wait for the actor to run...

**6.** Get your results!

Click on the flashing **Results** button.

![Actor successful run view]({{@asset tutorials/images/actor-run-view.png}})

Then, choose which format you want your data in and check it out.

![Choose the data format]({{@asset tutorials/images/actor-run-results.png}})

Here is a preview of the actor's output as a table.

![Dataset preview]({{@asset tutorials/images/actor-run-dataset.png}})

## Create an actor


Go to the [Actor](https://my.apify.com/actors) section in the app, create a new actor and go to *Source* tab. Paste the following Node.js code into the *Source code* editor:

```js
const Apify = require('apify');

Apify.main(async () => {
    console.log('Hello world from Actor!');
});
```

Click *▷ Run* to build and run your actor. After the run is finished you should see something like:

![Apify actor run log]({{@asset actors/images/run-log.png}})

Congratulations, you have successfully created and run your first actor!

Let's try something little more complicated. We will change the actor to accept input and generate output (see [Input and output]({{@link actors/running/input.md}}) for more details):

```js
const Apify = require('apify');

Apify.main(async () => {
    // Get input and print it
    const input = await Apify.getInput();
    console.log('My input:');
    console.dir(input);

    // Save output
    const output = { message: 'Hello world!' };
    await Apify.setValue('OUTPUT', output);
});
```

Save your actor by clicking **Save** and then rebuild it by clicking **Build**\. After the build is finished, go to **Console** and set **Input** to:

```json
{ "hello": 123 }
```

Then set **Content type** to `application/json; charset=utf-8` and click **Run**. You will see something like:

![Apify actor run log]({{@asset actors/images/run-log-2.png}})

Excellent, you have just created your first actor to accept input and store output! Now you can start adding some magic.

The above actor is also available in the store as [apify/hello-world](https://apify.com/apify/hello-world). It uses the `apify` [NPM package](https://sdk.apify.com/), which provides various helper functions to simplify the development of actors. For example, the `Apify.main()` function invokes the main [user function]((https://sdk.apify.com/docs/api/apify#apifymainuserfunc)) and waits for its finish, logs exception details, etc. Note that the `apify` package is optional and actors do not need to use it at all.

For more complicated actors, you'll probably prefer to host the source code on Git. To do that, follow these steps:

1. Create a new Git repository.
2. Copy the boilerplate actor code from the [apify/quick-start](https://github.com/apifytech/actor-quick-start) actor.
3. Set **Source type** to **Git repository** for your actor in the app.
4. Paste the Git repo link to **Git URL**, save changes and build your actor.
5. That's it, now you can develop your actor locally on your computer and run it in the Apify cloud!

For more information, go to the [Git repository]({{@link actors/development/source_code.md#git-repository}}) section.

## What's next?

* [Try some other actors from Apify Store](https://apify.com/store).
* Learn to use our main scrapers: [Web Scraper]({{@link tutorials/apify_scrapers/web_scraper.md}}), [Cheerio Scraper]({{@link tutorials/apify_scrapers/cheerio_scraper.md}}), and [Puppeteer Scraper]({{@link tutorials/apify_scrapers/puppeteer_scraper.md}}).
* Learn more about using actors: [tasks]({{@link actors/tasks.md}}), [storages]({{@link storage.md}}), and [proxies]({{@link proxy.md}}).
* [Build your own actors](https://sdk.apify.com/docs/guides/quick-start) with the Apify SDK.
