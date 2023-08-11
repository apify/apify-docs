---
title: Integrating Actors via API
description: Learn how to integrate with other Actors and tasks
sidebar_position: 2
slug: /integrations/actors/integrating-actors-via-api
---


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
