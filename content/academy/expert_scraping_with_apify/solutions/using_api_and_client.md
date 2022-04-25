---
title: Using the Apify API & JavaScript client
description: Learn how to interact with the Apify API directly through the well-documented RESTful routes, or by using the proprietary Apify JavaScript client.
menuWeight: 4
paths:
    - expert-scraping-with-apify/solutions/using-api-and-client
---

# [](#using-api-and-client) Using the Apify API & JavaScript client

Since we need to create another actor, we'll once again use the `apify create` command and start from an empty template.

![Selecting an empty template to start with]({{@asset expert_scraping_with_apify/solutions/images/select-empty.webp}})

This time, let's call our project **actor-caller**.

Let's also set up some boilerplate, grabbing our inputs and creating a constant variable for the task:

```JavaScript
const Apify = require('apify');
const axios = require('axios');
const { URLSearchParams } = require('url');

Apify.main(async () => {
    const { useClient, memory, fields, maxItems } = await Apify.getInput();

    const TASK = 'YOUR_USERNAME~demo-actor-task';

    // our future code will go here
});
```

## [](#calling-a-task-via-client) Calling a task via JavaScript client

When using the `apify-client` package, you can create a new client instance by using `new ApifyClient()`. Within the Apify SDK however, it is not necessary to even install the `apify-client` package, as the `Apify.newClient()` function is available for use.

We'll start by creating a function called `withClient()` and creating a new client, then calling the task:

```JavaScript
const withClient = async () => {
    const client = Apify.newClient();
    const task = client.task(TASK);

    const { id } = await task.call({ memory });
};
```

After the task has run, we'll grab hold of its dataset, then attempt to download the items, plugging in our `maxItems` and `fields` inputs. Then, once the data has been downloaded, we'll push it to the default key-value store under a key named **OUTPUT.csv**.

```JavaScript
const withClient = async () => {
    const client = Apify.newClient();
    const task = client.task(TASK);

    const { id } = await task.call({ memory });

    const dataset = client.run(id).dataset();

    try {
        const items = await dataset.downloadItems('csv', {
            limit: maxItems,
            fields,
        });

        // If the content type is anything other than JSON, it must
        // be specified within the third options parameter
        return Apify.setValue('OUTPUT', items, { contentType: 'text/csv' });
    } catch (error) {
        throw new Error(error?.message);
    }
};
```

## [](#calling-a-task-via-api) Calling a task via API

First, we'll create a function (right under the `withClient()`) function named `withAPI` and instantiate a new variable which represents the API endpoint to run our task:

```JavaScript
const withAPI = async () => {
    const uri = `https://api.apify.com/v2/actor-tasks/${TASK}/run-sync-get-dataset-items?`;
};
```

To add the query parameters to the URL, we could create a super long string literal, plugging in all of our input values; however, there is a much better way: [`URLSearchParams`](https://nodejs.org/api/url.html#new-urlsearchparams). By using `URLSearchParams`, we can add the query parameters in an object:

```JavaScript
const withAPI = async () => {
    const uri = `https://api.apify.com/v2/actor-tasks/${TASK}/run-sync-get-dataset-items?`;
    const url = new URL(uri);

    url.search = new URLSearchParams({
        memory,
        format: 'csv',
        limit: maxItems,
        fields: fields.join(','),
        token: process.env.APIFY_TOKEN,
    });
};
```

Finally, let's make a `POST` request to our endpoint. You can use any library you want, but in this example, we'll use [`axios`](https://www.npmjs.com/package/axios). Don't forget to run `npm install axios` if you're going to use this package too!

```JavaScript
const withAPI = async () => {
    const uri = `https://api.apify.com/v2/actor-tasks/${TASK}/run-sync-get-dataset-items?`;
    const url = new URL(uri);

    url.search = new URLSearchParams({
        memory,
        format: 'csv',
        limit: maxItems,
        fields: fields.join(','),
        token: process.env.APIFY_TOKEN,
    });

    try {
        const { data } = await axios.post(url.toString());

        return Apify.setValue('OUTPUT', data, { contentType: 'text/csv' });
    } catch (error) {
        throw new Error(error?.message);
    }
};
```

## [](#finalizing-the-actor) Finalizing the actor

Now, since we've written both of these functions, all we have to do is write a conditional statement based on the boolean value from `useClient`:

```JavaScript
if (useClient) await withClient();
else await withAPI();
```

And before we push to the platform, let's not forget to write an input schema in the **INPUT_SCHEMA.JSON** file:

```JSON
{
  "title": "Actor Caller",
  "type": "object",
  "schemaVersion": 1,
  "properties": {
    "memory": {
      "title": "Memory",
      "type": "integer",
      "description": "Select memory in megabytes.",
      "default": 4096,
      "maximum": 32768,
      "unit": "MB"
    },
    "useClient": {
      "title": "Use client?",
      "type": "boolean",
      "description": "Specifies whether the Apify JS client, or the pure Apify API should be used.",
      "default": true
    },
    "fields": {
      "title": "Fields",
      "type": "array",
      "description": "Enter the dataset fields to export to CSV",
      "prefill": ["title", "url", "price"],
      "editor": "stringList"
    },
    "maxItems": {
      "title": "Max items",
      "type": "integer",
      "description": "Fill the maximum number of items to export.",
      "default": 10
    }
  },
  "required": ["useClient", "memory", "fields", "maxItems"]
}
```

## [](#final-code) Final code

To ensure we're on the same page, here is what the final code looks like:

```JavaScript
const Apify = require('apify');
const axios = require('axios');
const { URLSearchParams } = require('url');

Apify.main(async () => {
    const { useClient, memory, fields, maxItems } = await Apify.getInput();

    const TASK = 'YOUR_USERNAME~demo-actor-task';

    const withClient = async () => {
        const client = Apify.newClient();
        const task = client.task(TASK);

        const { id } = await task.call({ memory });

        const dataset = client.run(id).dataset();

        try {
            const items = await dataset.downloadItems('csv', {
                limit: maxItems,
                fields,
            });

            return Apify.setValue('OUTPUT', items, { contentType: 'text/csv' });
        } catch (error) {
            throw new Error(error?.message);
        }
    };

    const withAPI = async () => {
        const uri = `https://api.apify.com/v2/actor-tasks/${TASK}/run-sync-get-dataset-items?`;
        const url = new URL(uri);

        url.search = new URLSearchParams({
            memory,
            format: 'csv',
            limit: maxItems,
            fields: fields.join(','),
            token: process.env.APIFY_TOKEN,
        });

        try {
            const { data } = await axios.post(url.toString());

            return Apify.setValue('OUTPUT', data, { contentType: 'text/csv' });
        } catch (error) {
            throw new Error(error?.message);
        }
    };

    if (useClient) await withClient();
    else await withAPI();
});
```

## [](#quiz-answers) Quiz answers 📝

**Q: What is the relationship between the Apify API and Apify client? Are there any significant differences?**

**A:** The Apify client mimics the Apify API, so there aren't any super significant differences. It's super handy as it helps with managing the API calls (parsing, error handling, retries, etc) and even adds convenience functions.

The one main difference is that the Apify client automatically uses [**exponential backoff**](https://docs.apify.com/apify-client-js#retries-with-exponential-backoff) to deal with errors.

**Q: How do you pass input when running actor or task via API?**

**A:** The input should be passed into the **body** of the request when running an actor/task via API.

**Q: Do you need to install the `apify-client` NPM package when already using the `apify` package?**

**A:** No. The Apify client is available right in the sdk with the `Apify.newClient()` function.

## [](#wrap-up) Wrap up

That's it! Now, if you want to go above and beyond, you should create a Github repository for this actor, integrate it with a new actor on the Apify platform, and test if it works there as well (with multiple input configurations).
