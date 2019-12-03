---
title: Ad hoc webhooks
description: Documentation of Apify webhooks system that enables integration of multiple actors or external systems.
menuWeight: 8.3
---

# [](./webhooks#adhoc)Ad hoc webhooks

An ad hoc webhook is a one-time webhook created for a certain actor run when starting the run using Apify [API](https://apify.com/docs/api/v2). It's triggered at most once when the given run transitions into the selected state. Ad hoc webhooks can be defined using a URL parameter `webhooks` added to the API endpoint that starts an actor or actor task:

    https://api.apify.com/v2/acts/[ACTOR_ID]/runs?token=[YOUR_API_TOKEN]&webhooks=[AD_HOC_WEBHOOKS]

where `AD_HOC_WEBHOOKS` is a base64 encoded stringified JSON array of webhook definitions:

    [
        {
            "eventTypes": ["ACTOR.RUN.CREATED"],
            "requestUrl": "https://example.com/run-created"
        },
        {
            "eventTypes": ["ACTOR.RUN.SUCCEEDED"],
            "requestUrl": "https://example.com/run-succeeded",
            "payloadTemplate": "{\"hello\": \"world\", \"resource\":{{resource}}}"
        },
    ]

## Creating an ad hoc webhook dynamically

You can also create a webhook dynamically from a code of your actor using `Apify.addWebhook()` function:

    await Apify.addWebhook({
        eventTypes: ['ACTOR.RUN.CREATED'],
        requestUrl: 'https://example.com/run-created'
    });

To learn more see [Apify SDK documentation](https://sdk.apify.com/docs/api/apify#apifyaddwebhook-code-promise-lt-object-undefined-gt-code).

To ensure that duplicate ad hoc webhooks won't get created in a case of actor restart you can use `idempotencyKey` parameter. Idempotency key must be unique across all the webhooks of a user so the only one webhook gets created for a given value. You can use for example actor run ID as idempotency key:

    await Apify.addWebhook({
        eventTypes: ['ACTOR.RUN.CREATED'],
        requestUrl: 'https://example.com/run-created'
        idempotencyKey: process.env.APIFY_ACTOR_RUN_ID,
    });
