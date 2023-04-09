---
title: Metamorph
description: The metamorph operation transforms an actor run into a run of another actor with a new input.
slug: /actors/development/actor-definition/source-code/metamorph

---

**The metamorph operation transforms an actor run into a run of another actor with a new input. **

---

This feature is useful if you want to use another actor to finish the work of your current actor, instead of internally starting a new actor run and waiting for its finish. With metamorph, you can easily create new actors on top of existing ones, and give your users nicer input structure and user-interface for the final actor. For the users of your actors, the metamorph operation is completely transparent, they will just see your actor got the work done.

Internally, the system stops the Docker container corresponding to the actor run and starts a new container using a different Docker image. All the default storages are preserved and the new input is stored under the **INPUT-METAMORPH-1** key in the same default key-value store.

To make you actor compatible with metamorph operation use `Actor.getInput()` instead of `Actor.getValue('INPUT')`. This method will fetch the input using the right key **INPUT-METAMORPH-1** in a case of metamorphed run.

For example, imagine you have an actor that accepts a hotel URL on input and then internally uses the [apify/web-scraper](https://www.apify.com/apify/web-scraper) actor to scrape all the hotel reviews. The metamorphing code would look as follows:

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
