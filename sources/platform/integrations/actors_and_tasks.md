---
title: Actors
description: Learn how to integrate with other Actors and tasks
sidebar_position: 11.10
slug: /integrations/actors
---

## How to prepare integration-ready Actor?

Any Actor can be used as integration. But in order to make the experience nice for it’s users, there are few things to keep on mind.

### General guidelines

If your Actor is supposed to be used as integration, it will most likely have input that can be described as two groups of fields. The first group is the “static” part of input - the fields that have the same value whenever the integration is triggered. The second “dynamic” group are fields that are specific to the triggering event - information on the run or build that triggered the integration.

The Actor should ideally try to hide it’s complexity from users and take all the “dynamic” fields from the implicit `payload` field - it is attached automatically. This way users don’t have to take care of passing in variables on their own, and only need to take care of the static part of input.

One important thing is that it is not the dataset contents that is passed to the Actor on input just the dataset id. This means that getting the actual contents of dataset is something that the Actor needs to take care of. And ideally not load the full dataset while doing so, as it might be too large to fit to memory, but rather process it in batches.

### Example

To illustrate the above, here is a simplified example how an Actor that uploads dataset to a table/collection in some database.

We would start with input looking something like this:

```plaintext
datasetId (string) - Id of dataset that should be uploaded
connectionString (string) - Credentials for the database connection
tableName (string) - Name of table / collection
```

With such input schema, users have to provide input that looks like this

```json
{
  "datasetId": "{{resource.defaultDatasetId}}",
  "connectionString": "****",
  "tableName": "results"
}
```

And in the Actor code, we’d use this to get the values:

```js
const { datasetId, connectionString, tableName } = await Actor.getInput();
```

That is comfortable for Actor’s developer, but not for the end user. To make it comfortable, we’d use different input schema:

```
connectionString (string) - Credentials for the database connection
tableName (string) - Name of table / collection
```

In this case, users only need to provide the “static” part of input:

```json
{
  "connectionString": "****",
  "tableName": "results"
}
```

In Actor code, `datasetId` (the dynamic part) would be obtained from `payload` field:

```jsx
const { payload, connectionString, tableName } = await Actor.getInput();
const datasetId = payload.resource.defaultDatasetId;
```

It’s also possible to combine both approaches together, which is useful for development purposes or advanced usage. It would mean keeping `datasetId` on input, hidden under some “Advanced options” section, and using it like this:

```jsx
const { payload, datasetId } = await Actor.getInput();
const datasetIdToProcess = payload?.resource?.defaultDatasetId ?? datasetId;
```

In the example we’re focusing on accessing the default dataset of run, but the approach would be similar for any other field.

### Making your Actor available to other users

To allow other users to use your Actor as integration, make it public, users can then integrate it using “Connect Actor or Task” button on the integrations tab of any Actor. So that’s it, making it public is enough. Nevertheless there are two ways how to make the Actor more visible.

For the Actors that are generic enough to be used with basically any other Actor it’s possible to have them listed under “Generic integrations”. Those include (but are not limited to) uploading the datasets to databases, sending notifications through various messaging systems, creating issues in ticketing systems etc. To have your Actor listed under generic integrations, contact support.

Some Actors can only be integrated with a few or even just one other Actor. Let’s say that you have Actor that’s capable of scraping profiles from social network X(Y), it makes sense to show it for Actors that produce usernames on social network X(Y), but not for Actors that produce lists of products. In this case it’s possible to have the Actor listed in integrations “Specific to this Actor”. In order to have your Actor listed, contact support.

## Using Actor-to-Actor integrations via API

Integrating Actor via API is also possible, using the [webhooks](https://docs.apify.com/api/v2#/reference/webhooks/webhook-collection/create-webhook) endpoint. It’s the same as any other webhooks, but to make sure you see it in Console in the nice UI, you need to make sure of few things. The `requestUrl` field needs to point to run Actor or run task endpoints and needs to use their ids as identifiers (ie. not names). The `payloadTemplate` field should be valid json - ie. it should only use variables enclosed in strings. Also you need to make sure that it contains `payload` field. The `shouldInterpolateStrings` field needs to be set to `true`, otherwise the variables won’t work. The last thing needed is to add `isApifyIntegration` field with `true` value. This is just a helper that turns on the nice UI, if the above conditions are met.

Not meeting the conditions won’t mean that the webhook won’t work. It’s just going to be displayed as a regular HTTP webhook in Console.

### Example

The webhook would look something like this:

```jsx
{
  "requestUrl": "https://api.apify.com/v2/acts/<integration-actor-id>/runs",
  "eventTypes": [ "ACTOR.RUN.SUCCEEDED" ],
  "condition": {
     "actorId": "<actor-id>",
  },
  "shouldInterpolateStrings": true,
  "isApifyIntegration": true,
  "payloadTemplate": "{\"field\":\"value\",\"payload\":{\"resource\":\"{{resource}}\"}}",
}
```

It’s usually enough to just include `resource` in the payload template, but some actors might need other fields too. Keep in mind that the `payloadTemplate` is string, not object.

## What is under the hood?

Under the hood the Actor to Actor integration uses regular HTTP POST webhooks targeting Apify API, it’s just nicer UI for the same thing. The UI allows to fill the payload template using Actor input UI, not just plaintext, and constructs the url to start actor with given options.

The UI makes sure that the variables are enclosed in strings, meaning that event the payload template itself is a valid JSON, not just the resulting interpolation. It also automatically adds `payload` field that contains default webhook payload. So for Actors that are meant to be used as integrations, users don’t have to fill in the variables, and Actor just takes the data from this field.