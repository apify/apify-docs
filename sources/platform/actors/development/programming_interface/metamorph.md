---
title: Metamorph
description: The metamorph operation transforms an Actor run into the run of another Actor with a new input.
slug: /actors/development/programming-interface/metamorph
sidebar_position: 8
---

**The metamorph operation transforms an Actor run into the run of another Actor with a new input.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Transform Actor runs

Metamorph is a powerful operation that transforms an Actor run into the run of another Actor with a new input. This feature enables you to leverage existing Actors and create more efficient workflows.

## Understand metamorph

The metamorph process invovles several key steps. It stops the current Actor's Docker container, then starts a new container using a different Docker image. During this transition, all default storages are preserved. The new input is stored under the _INPUT-METAMORPH-1_ key in the default key-value store, ensuring seamless data transfer between Actor runs.

## Benefits of metamorph

Metamorph offers several advantages for developers:

- Seamless transition between Actors without starting a new run
- Building new Actors on top of existing ones
- Providing users with an improved input structure and interface
- Maintaining transparency for end-users

These benefits make metamorph a valuable tool for creating complex, efficient workflows.

## Implementation guidelines

To make your Actor compatibile with metamorph, use `Actor.getInput()` instead of `Actor.getValue(&#96;INPUT&#96;)`. This method fetches the input using the correct key (_INPUT-METAMORPH-1_) for metamorphed runs, ensuring proper data retrieval in transformed Actor runs.

:::note Runtime limits

There's a limit to how many times you can metamorph a single run. Refer to the [Actor runtime limits](/platform/limits#actor-limits) for more details.

:::

## Example

Let's walk through an example of using metamorph to create a hotel review scraper:

1. Create an Actor that accepts a hotel URL as input.

1. Use the [apify/web-scraper](https://www.apify.com/apify/web-scraper) Actor to scrape reviews.

1. Use the metamorph operation to transform into a run of apify/web-scraper.


<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

Here's the JavaScript code to achieve this:

```js
import { Actor } from 'apify';

await Actor.init();

// Get input of your Actor.
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

// Transform the Actor run to apify/web-scraper
// with the new input.
await Actor.metamorph('apify/web-scraper', newInput);

// The line here will never be reached, because the
// Actor run will be interrupted.
await Actor.exit();
```

</TabItem>
<TabItem value="Python" label="Python">

Here's the Python code to achieve this:

```python
from apify import Actor

async def main():
    async with Actor:
        # Get input of your Actor
        actor_input = await Actor.get_input() or {}

        # Create input for apify/web-scraper
        new_input = {
            'startUrls': [{'url': actor_input['url']}],
            'pageFunction': """
                # Here you pass the page function that
                # scrapes all the reviews ...
            """,
            # ... and here would be all the additional input parameters
        }

        # Transform the Actor run to apify/web-scraper with the new input
        await Actor.metamorph('apify/web-scraper', new_input)

        # The line here will never be reached, because the Actor run will be interrupted
        Actor.log.info('This should not be printed')
```

</TabItem>
</Tabs>

By following these steps, you can create a powerful hotel review scraper that leverages the capabilities of existing Actors through the metamorph operation.
