---
title: Integrating Actors via API
description: Learn how to integrate with other Actors and tasks using the Apify API.
sidebar_position: 2
slug: /integrations/actors/integrating-actors-via-api
---

# Integrating Actors via API

**Learn how to integrate with other Actors and tasks using the Apify API.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

You can integrate Actors via API using the [Create webhook](/api/v2#/reference/webhooks/webhook-collection/create-webhook) endpoint. It's the same as any other webhook, but to make sure you see it in Apify Console, you need to make sure of a few things.

* The `requestUrl` field needs to point to the **Run Actor** or **Run task** endpoints and needs to use their IDs as identifiers (ie. not their technical names).
* The `payloadTemplate` field should be valid JSON - ie. it should only use variables enclosed in strings. You will also need to make sure that it contains a `payload` field.
* The `shouldInterpolateStrings` field needs to be set to `true`, otherwise the variables won't work.
* Add `isApifyIntegration` field with the value `true`. This is a helper that turns on the Actor integration UI, if the above conditions are met.

Not meeting the conditions does not mean that the webhook won't work; it will just be displayed as a regular HTTP webhook in Apify Console.

The webhook should look something like this:

```json
{
    "requestUrl": "https://api.apify.com/v2/acts/<integration-actor-id>/runs",
    "eventTypes": ["ACTOR.RUN.SUCCEEDED"],
    "condition": {
        "actorId": "<actor-id>",
    },
    "shouldInterpolateStrings": true,
    "isApifyIntegration": true,
    "payloadTemplate": "{\"field\":\"value\",\"payload\":{\"resource\":\"{{resource}}\"}}",
}
```

It's usually enough to just include the `resource` field in the payload template, but some Actors might also need other fields. Keep in mind that the `payloadTemplate` is a string, not an object.
