---
title: Ad-hoc webhooks
description: Set up one-time webhooks for Actor runs initiated through the Apify API or from the Actor's code. Trigger events when the run reaches a specific state.
sidebar_position: 3
slug: /integrations/webhooks/ad-hoc-webhooks
---

**Set up one-time webhooks for Actor runs initiated through the Apify API or from the Actor's code. Trigger events when the run reaches a specific state.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

An ad-hoc webhook is a single-use webhook created for a specific Actor run when starting the run using the [Apify API](/api/v2). The webhook triggers once when the run transitions to the specified state. Define ad-hoc webhooks using the `webhooks` URL parameter added to the API endpoint that starts an Actor or Actor task:

```text
https://api.apify.com/v2/acts/[ACTOR_ID]/runs?token=[YOUR_API_TOKEN]&webhooks=[AD_HOC_WEBHOOKS]
```

replace `AD_HOC_WEBHOOKS` with a base64 encoded stringified JSON array of webhook definitions:

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

## Create an ad-hoc webhook dynamically

You can also create a webhook dynamically from your Actor's code using the Actor's add webhook method:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

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

</TabItem>
<TabItem value="Python" label="Python">

```python
from apify import Actor

async def main():
    async with Actor:
        await Actor.add_webhook(
            event_types=['ACTOR.RUN.FAILED'],
            request_url='https://example.com/run-failed',
        )
        # ...
```

</TabItem>
</Tabs>

For more information, check out the [JavaScript SDK documentation](/sdk/js/reference/class/Actor#addWebhook) or the [Python SDK documentation](/sdk/python/reference/class/Actor#add_webhook).

To prevent duplicate ad-hoc webhooks in case of Actor restart, use the idempotency key parameter. The idempotency key must be unique across all user webhooks to ensure only one webhook is created for a given value. For example, use the Actor run ID as an idempotency key:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

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

</TabItem>
<TabItem value="Python" label="Python">

```python
import os
from apify import Actor

async def main():
    async with Actor:
        await Actor.add_webhook(
            event_types=['ACTOR.RUN.FAILED'],
            request_url='https://example.com/run-failed',
            idempotency_key=os.environ['APIFY_ACTOR_RUN_ID'],
        )
        # ...
```

</TabItem>
</Tabs>
