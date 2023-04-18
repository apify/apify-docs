---
title: Metamorph
description: The metamorph operation transforms an Actor run into the run of another Actor with a new input.
slug: /actors/development/actor-definition/source-code/metamorph

---

**The metamorph operation transforms an Actor run into the run of another Actor with a new input. **

---

This feature is useful if you want to use another Actor to finish the work of your current one instead of internally starting a new Actor run and waiting for it to finish. With metamorph, you can easily create new Actors on top of existing ones, and give your users a nicer input structure and user interface for the final Actor. The metamorph operation is completely transparent to the Actor's users; they will just see that your Actor got the work done.

Internally, the system stops the Docker container corresponding to the Actor run and starts a new container using a different Docker image. All the default storages are preserved, and the new input is stored under the **INPUT-METAMORPH-1** key in the same default key-value store.

To make your Actor compatible with the metamorph operation, use `Actor.getInput()` instead of `Actor.getValue('INPUT')`. This method will fetch the input using the right key **INPUT-METAMORPH-1** in case of a metamorphed run.

For example, imagine you have an Actor that accepts a hotel URL on input and then internally uses the [apify/web-scraper](https://www.apify.com/apify/web-scraper) Actor to scrape all the hotel reviews. The metamorphing code would look like this:

```js
import { Actor } from 'apify';

await Actor.init();

// Get input of your actor.
const { hotelUrl } = await Actor.getInput();

// Create input for apify/web-scraper
const newInput = {
    startUrls: [{ url: hotelUrl }],
    pageFunction: () => {
        // Here you pass the page function that
        // scrapes all the reviews ...
    },
    // ... and here would be all the additional
    // input parameters.
};

// Transform the actor run to apify/web-scraper
// with the new input.
await Actor.metamorph('apify/web-scraper', newInput);

// The line here will never be reached, because the
// actor run will be interrupted.

await Actor.exit();
```
