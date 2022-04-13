---
title: Integrating webooks
description: Learn how to integrate webhooks into your actors. Webhooks are a super powerful tool, and can be used to do almost anything!
menuWeight: 6.4
paths:
    - pro-apify-scraper-development/integrating-webhooks
---

# [](#setup) Setup

In this lesson we'll be writing a new actor and integrating it with our beloved Amazon scraping actor, but first, let's remove the code which sends ourselves an email so that we don't end up spamming ourselves when testing:

```JavaScript
// ...
log.info('Starting the crawl.');
await crawler.run();
log.info('Crawl finished.');

// We don't need the code below anymore!

// log.info('Sending dataset link...');
// const dataset = await Apify.openDataset();
// const { id } = await dataset.getInfo();

// await Apify.call('apify/send-mail', {
//     to: 'youremail@gmail.com',
//     subject: 'Amazon Dataset',
//     text: `https://api.apify.com/v2/datasets/${id}/items?clean=true&format=json`,
// });

// log.info('Finished.');
//...
```

Next, we'll navigate to the same directory our **demo-actor** folder lives, and run `apify create filter-actor` _(once again, you can name the actor whatever you want, but for this lesson, we'll be calling the new actor **filter-actor**)_. When prompted for which type of boilerplate to start out with, select **Empty**.

![Selecting an empty template to start with]({{@asset pro_apify_scraper_development/images/select-empty.webp}})

Cool! Now, we're ready to get started.

## [](#building-the-new-actor) Building the new actor

First of all, we should clear out any of the boilerplate code within **main.js** to get a clean slate:

```JavaScript
// main.js
const Apify = require('apify');

Apify.main(async () => {

});
```

We'll be passing the ID of the Amazon actor's default dataset along to the new actor, so we can expect that as an input:

```JavaScript
Apify.main(async () => {
    const { datasetId } = await Apify.getInput();
    const dataset = await Apify.openDataset(datasetId);
// ...
```

Next, we'll grab hold of the dataset's items with the `dataset.getData()` function:

```JavaScript
const { items } = await dataset.getData();
```

There are a few different methods that can be used to achieve the goal output of this actor, but using the [`Array.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) is the most concise:

```JavaScript
const filtered = items.reduce((acc, curr) => {
    // Grab the price of the item matching our current
    // item's ASIN in the map. If it doesn't exist, set
    // "prevPrice" to null
    const prevPrive = acc?.[curr.asin] ? +acc[curr.asin].offer.slice(1) : null;

    // Grab the price of our current offer
    const price = +curr.offer.slice(1);

    // If the item doesn't yet exist in the map, add it.
    // Or, if the current offer's price is less than the
    // saved one, replace the saved one
    if (!acc[curr.asin] || prevPrive > price) acc[curr.asin] = curr;

    // Return the map
    return acc;
}, {});
```

The results should be an array, so finally, we can take the map we just created and push an array of all of its values to the actor's default dataset:

```JavaScript
await Apify.pushData(Object.values(filtered));
```

Our final code looks like this:

```JavaScript
const Apify = require('apify');

Apify.main(async () => {
    const { datasetId } = await Apify.getInput();
    const dataset = await Apify.openDataset(datasetId);

    const { items } = await dataset.getData();

    const filtered = items.reduce((acc, curr) => {
        const prevPrive = acc?.[curr.asin] ? +acc[curr.asin].offer.slice(1) : null;
        const price = +curr.offer.slice(1);

        if (!acc[curr.asin] || prevPrive > price) acc[curr.asin] = curr;

        return acc;
    }, {});

    await Apify.pushData(Object.values(filtered));
});
```

Cool! But **wait**, don't forget to configure the **INPUT_SCHEMA.json** file as well! It's not necessary to do this step, as we'll be calling the actor through Apify's API within a webhook, but it's still good to get into the habit of writing quality input schemas that describe the input values your actors are expecting.

```JSON
{
    "title": "Amazon Filter Actor",
    "type": "object",
    "schemaVersion": 1,
    "properties": {
        "datasetId": {
            "title": "Dataset ID",
            "type": "string",
            "description": "Enter the ID of the dataset.",
            "editor": "textfield"
        }
    },
    "required": ["datasetId"]
}
```

Now we're done, and we can push it up to the Apify platform with the `apify push` command.

## [](#setting-up-the-webhook) Setting up the webhook

Since we'll be calling the actor via the [Apify API](https://docs.apify.com/tutorials/integrations/run-actor-and-retrieve-data-via-api#run-an-actor-or-task), we'll need to grab hold of the ID of the actor we just created and pushed to the platform. The ID is always accessible through the **Settings** page of the actor.

![Actor ID in actor settings]({{@asset pro_apify_scraper_development/images/actor-settings.webp}})

With this `actorId`, and our `token`, which is retrievable through **Settings > Integrations** on the Apify Console, we can construct a link which will call the actor:

```text
https://api.apify.com/v2/acts/Yk1bieximsduYDydP/runs?token=YOUR_TOKEN_HERE
```

We can also use our username and the name of the actor like this:

```text
https://api.apify.com/v2/acts/USERNAME~filter-actor/runs?token=YOUR_TOKEN_HERE
```

Whichever one you choose is totally up to preference.

Next, within the actor, we will click the **Integrations** tab and choose **Webhook**, then fill out the details to look like this:

![Configuring a webhook]({{@asset pro_apify_scraper_development/images/adding-webhook.webp}})

We have chosen to run the webhook once the actor has succeeded, which means that its default dataset will surely be populated. Since the filtering actor is expecting the default dataset ID of the Amazon actor, we use the `resource` variable to grab hold of the `defaultDatasetId`.

Click **Save**, then run the Amazon **demo-actor** again.

## [](#checking-the-webhook) Making sure it worked

If everything worked, then at the end of the **demo-actor**'s run, we should see this within the **Integrations** tab:

![Webhook succeeded]({{@asset pro_apify_scraper_development/images/webhook-succeeded.webp}})

Additionally, we should be able to see that our **filter-actor** was run, and have access to its dataset:

![Dataset preview]({{@asset pro_apify_scraper_development/images/dataset-preview.webp}})

## [](#wrap-up) Wrap up

In the past few lessons, you've learned how to build an actor from scratch, how to publish an actor, and how to integrate webhooks into your actor. You've also learned about the two main ways to call actors programmatically - through the Apify API, and through the Apify SDK (with `Apify.call()`).

That's all the lessons within this module for now, but more will come very soon!
