---
title: Ad-hoc webhooks
description: Learn how to set one-off webhooks for actor runs started via the Apify API or from the actor's code. Trigger the event once the run reaches a desired state.
sidebar_position: 3
slug: /integrations/webhooks/ad-hoc-webhooks
---

# Ad-hoc webhooks

**Learn how to set one-off webhooks for actor runs started via the Apify API or from the actor's code. Trigger the event once the run reaches a desired state.**

---

An ad-hoc webhook is a one-time webhook created for a certain actor run when starting the run using the [Apify API](/api/v2). It's triggered at most once when the given run transitions into the desired state. Ad-hoc webhooks can be defined using a URL parameter `webhooks` added to the API endpoint that starts an actor or actor task:

```text
https://api.apify.com/v2/acts/[ACTOR_ID]/runs?token=[YOUR_API_TOKEN]&webhooks=[AD_HOC_WEBHOOKS]
```

where `AD_HOC_WEBHOOKS` is a base64 encoded stringified JSON array of webhook definitions:

```js
[
    {
        eventTypes: ['ACTOR.RUN.FAILED'],
        requestUrl: 'https://example.com/run-failed',
    },
    {
        eventTypes: ['ACTOR.RUN.SUCCEEDED'],
        requestUrl: 'https://example.com/run-succeeded',
        payloadTemplate: '{"hello": "world", "resource":{{resource}}}',
    },
];
```

## Creating an ad-hoc webhook dynamically

You can also create a webhook dynamically from the code of your actor using the [`Actor.addWebhook()`](/sdk/js/api/apify/class/Actor#addWebhook) function:

```js
import { Actor } from 'apify';

await Actor.init();
// ...
await Actor.addWebhook({
    eventTypes: ['ACTOR.RUN.FAILED'],
    requestUrl: 'https://example.com/run-failed',
});
// ...
await Actor.exit();
```

To learn more, see the [Apify SDK documentation](/sdk/js/api/apify/class/Actor#addWebhook).

To ensure that duplicate ad-hoc webhooks won't get created in a case of actor restart you can use the `idempotencyKey` parameter. The idempotency key must be unique across all the webhooks of a user so that only one webhook gets created for a given value. You can use, for example, the actor run ID as idempotency key:

```js
import { Actor } from 'apify';

await Actor.init();
// ...
await Actor.addWebhook({
    eventTypes: ['ACTOR.RUN.FAILED'],
    requestUrl: 'https://example.com/run-failed',
    idempotencyKey: process.env.APIFY_ACTOR_RUN_ID,
});
// ...
await Actor.exit();
```
