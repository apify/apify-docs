---
title: Ad-hoc webhooks
description: Learn how to set one-off webhooks for Actor runs started via the Apify API or from the Actor's code. Trigger the event once the run reaches a desired state.
sidebar_position: 3
slug: /integrations/webhooks/ad-hoc-webhooks
---

# Ad-hoc webhooks

**Learn how to set one-off webhooks for Actor runs started via the Apify API or from the Actor's code. Trigger the event once the run reaches a desired state.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

An ad-hoc webhook is a one-time webhook created for a certain Actor run when starting the run using the [Apify API](/api/v2). It's triggered no more than once when the given run transitions into the desired state. Ad-hoc webhooks can be defined using a URL parameter `webhooks` added to the API endpoint that starts an Actor or Actor task:

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

You can also create a webhook dynamically from the code of your Actor using the Actor's add webhook method:

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

To learn more, see the [JavaScript SDK documentation](/sdk/js/reference/class/Actor#addWebhook) or the [Python SDK documentation](/sdk/python/reference/class/Actor#add_webhook).

To ensure that duplicate ad-hoc webhooks won't get created in the case of Actor restart, you can use the idempotency key parameter. The idempotency key must be unique across all the webhooks of a user so that only one webhook gets created for a given value. You can use, for example, the Actor run ID as an idempotency key:

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
