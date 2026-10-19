---
title: Trigger.dev integration
sidebar_label: Trigger.dev
description: Learn how to run Apify Actors from Trigger.dev tasks, suspend long runs until an Apify webhook resumes them, and give Trigger.dev AI agents Apify tools.
slug: /integrations/trigger-dev
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[Trigger.dev](https://trigger.dev/) is an open-source platform for durable background tasks and AI agents. You write tasks in TypeScript instead of a visual builder, and Trigger.dev runs them with retries, queues, and run logs. With the [Apify JavaScript client](/api/client/js), a task can run any Actor from [Apify Store](https://apify.com/store), wait for the results, and pass them on to the rest of your code.

Trigger.dev's terms of service require a proxy for web scraping and prohibit scraping third-party websites directly from Trigger.dev Cloud without the site owner's permission, as its [Puppeteer guide](https://trigger.dev/docs/guides/examples/puppeteer) explains. Actors run on the Apify platform, so the scraping happens there and your task only calls the Apify API.

<ThirdPartyDisclaimer />

## Prerequisites

- An [Apify account](https://console.apify.com/?utm_source=trigger.dev&utm_medium=integrations) and an [Apify API token](https://console.apify.com/settings/integrations?utm_source=trigger.dev&utm_medium=integrations)
- A project with [Trigger.dev initialized](https://trigger.dev/docs/quick-start)

## Set up Apify in your Trigger.dev project

1. Install the Apify JavaScript client:

    ```bash
    npm install apify-client
    ```

1. Add your token as `APIFY_TOKEN` to the `.env` file for local development, and to the **Environment Variables** page in the Trigger.dev dashboard for deployed tasks:

    ```bash
    APIFY_TOKEN="<your-apify-token>"
    ```

1. Add `apify-client` to [`build.external`](https://trigger.dev/docs/config/config-file#external) in `trigger.config.ts`, so Trigger.dev doesn't bundle it:

    ```ts title="trigger.config.ts"
    import { defineConfig } from "@trigger.dev/sdk";

    export default defineConfig({
      project: "<project ref>",
      // Your other config settings...
      build: {
        external: ["apify-client"],
      },
    });
    ```

1. Create the Apify client that all the examples on this page share. The `x-apify-integration-platform` header tells Apify the requests come from Trigger.dev.

    ```ts title="trigger/apify.ts"
    import { ApifyClient } from "apify-client";

    export const apify = new ApifyClient({
      token: process.env.APIFY_TOKEN,
      requestInterceptors: [
        (config) => {
          // Identifies requests from Trigger.dev tasks to Apify
          config.headers = { ...config.headers, "x-apify-integration-platform": "trigger.dev" };
          return config;
        },
      ],
    });
    ```

## Choose a pattern

How long the Actor runs decides how your task should wait for it:

| Pattern | Use it for | While the Actor runs |
| --- | --- | --- |
| [Run an Actor and wait](#run-an-actor-and-wait) | Actors that finish in seconds | The task stays active and counts towards Trigger.dev compute usage. |
| [Run an Actor with a webhook](#run-an-actor-with-a-webhook) | Anything longer, such as crawls and large scrapes | The task is suspended and doesn't count towards compute usage. |
| [Use Apify as an agent tool](#use-apify-as-an-agent-tool) | AI agents that pick and run Actors themselves | The agent waits on a webhook task, so it doesn't count towards compute usage either. |

## Run an Actor and wait

This task starts an Actor, waits for it to finish, and returns the items from the run's default [dataset](/storage/dataset).

```ts title="trigger/apify-actor-run.ts"
import { AbortTaskRunError, logger, task } from "@trigger.dev/sdk";
import { apify } from "./apify";

export const apifyActorRun = task({
  id: "apify-actor-run",
  maxDuration: 600,
  retry: { maxAttempts: 3 },
  run: async (payload: { actorId: string; input: Record<string, unknown> }) => {
    const run = await apify.actor(payload.actorId).call(payload.input, {
      timeout: 300, // Apify stops the Actor after 5 minutes, so it doesn't keep running after the task gives up
      waitSecs: 360,
      maxItems: 1000, // cap spend on pay-per-result Actors
    });

    if (run.status === "ABORTED") {
      // Someone stopped the Actor on purpose, so don't start it again
      throw new AbortTaskRunError(`Actor run ${run.id} was aborted`);
    }

    if (run.status !== "SUCCEEDED") {
      throw new Error(`Actor run ${run.id} finished with status ${run.status}`);
    }

    const { items } = await apify.dataset(run.defaultDatasetId).listItems();

    logger.info("Actor run finished", { runId: run.id, itemCount: items.length });

    return { runId: run.id, datasetId: run.defaultDatasetId, items };
  },
});
```

- `timeout` stops the Actor on the Apify platform before `waitSecs` runs out, so the task never retries while an earlier Actor run is still going.
- `maxItems` caps how many results a pay-per-result Actor charges you for. Nobody watches a background job, so a cap stops a runaway crawl.
- A failed or timed-out Actor run throws an error, so the task's [retry settings](https://trigger.dev/docs/errors-retrying) start the Actor again. An aborted run throws `AbortTaskRunError` instead, because someone stopped it on purpose.
- `call()` copies the Actor's log into your run logs. Pass `log: null` in the options to turn this off.

To test the task, trigger it from the Trigger.dev dashboard with this payload. It runs [Website Content Crawler](https://apify.com/apify/website-content-crawler) on three pages:

```json
{
  "actorId": "apify/website-content-crawler",
  "input": {
    "startUrls": [{ "url": "https://docs.apify.com/academy" }],
    "maxCrawlPages": 3,
    "crawlerType": "cheerio",
    "proxyConfiguration": { "useApifyProxy": true }
  }
}
```

## Run an Actor with a webhook

For anything longer than a few seconds, start the Actor with `start()` instead of `call()` and attach an [ad-hoc webhook](/integrations/webhooks/ad-hoc-webhooks) that points at a Trigger.dev [wait token](https://trigger.dev/docs/wait-for-token) URL. The task suspends on `wait.forToken()`, and Apify resumes it by calling the URL when the Actor run ends. A suspended task doesn't count towards Trigger.dev compute usage, however long the Actor runs.

The full task is in Trigger.dev's [Apify Actor run guide](https://trigger.dev/docs/guides/examples/apify-actor-run#example-2-run-a-long-actor-and-resume-on-a-webhook). It relies on these Apify details:

- The webhook covers all four [events](/integrations/webhooks/events) that end an Actor run, so a failed, aborted, or timed-out run resumes the task with an error instead of leaving it waiting until the token times out.
- A `payloadTemplate` of `{ "eventType": {{eventType}}, "resource": {{resource}} }` keeps the request small. Whatever Apify posts to the token URL becomes the token's result, so type the result after the template, not the default webhook payload.
- The Actor's `timeout` is shorter than the token's `timeout`, so the Actor always ends, and the webhook fires, before the token expires.
- Webhook event types use underscores (`ACTOR.RUN.TIMED_OUT`), but a run's `status` uses a hyphen (`TIMED-OUT`). Compare event types with event types and statuses with statuses.

## Use Apify as an agent tool

Trigger.dev [AI chat agents](https://trigger.dev/docs/ai-chat/tools) use [AI SDK](https://ai-sdk.dev/) tools, so Apify can be a set of tools the agent calls. Trigger.dev's [Apify tools example](https://trigger.dev/docs/ai-chat/tools#example-web-scraping-tools-with-apify) has the full code for three tools:

- `searchApifyActors` searches Apify Store, so the model picks an Actor at runtime instead of you hardcoding one. It returns monthly users and the pricing model, so the model can prefer widely used Actors.
- `getApifyActorInputSchema` gives the model the Actor's real input fields. Without it, the model guesses field names and Apify rejects the run.
- `runApifyActor` runs the Actor through the webhook task from the [previous section](#run-an-actor-with-a-webhook), so the agent doesn't count towards compute usage while the Actor works. It returns at most 50 items and the `datasetId`, because a dataset can be larger than the model's context window.

Set `needsApproval: true` on `runApifyActor` to pause the agent before it spends money on a run. Your frontend shows the pending call and sends the user's answer, as described in Trigger.dev's [human-in-the-loop guide](https://trigger.dev/docs/ai-chat/patterns/human-in-the-loop).

## Limitations

- Cancelling a Trigger.dev run doesn't stop the Actor run it started. Abort the Actor run in [Apify Console](https://console.apify.com/actors/runs?utm_source=trigger.dev&utm_medium=integrations) or with `apify.run(runId).abort()`.
- The tasks on this page and in the Trigger.dev guides aren't retry-safe: every retry starts a new Actor run. In production, store the Actor run ID and reuse that run on retry instead of starting a new one.

## Troubleshooting

### Tasks fail with `ProxyAgent is not a constructor`

`apify-client` was bundled into the task. Add it to `build.external` in `trigger.config.ts`, as shown in [Set up Apify in your Trigger.dev project](#set-up-apify-in-your-triggerdev-project), and run `trigger dev` or deploy again.

### The agent can't run an Actor that needs extra permissions

Some Actors need extra permissions before the API can run them. `runApifyActor` then returns Apify's error with a link to approve the permissions in Apify Console. Approve them there and ask the agent again, or let the model pick a different Actor.

For questions or help, reach out on the [Apify developer community on Discord](https://discord.com/invite/jyEM2PRvMU).

## Resources

- [Trigger.dev documentation](https://trigger.dev/docs)
- [Trigger.dev Apify Actor run guide](https://trigger.dev/docs/guides/examples/apify-actor-run)
- [Trigger.dev wait for token](https://trigger.dev/docs/wait-for-token)
- [Trigger.dev AI chat tools](https://trigger.dev/docs/ai-chat/tools)
- [Apify JavaScript client](/api/client/js)
- [Ad-hoc webhooks](/integrations/webhooks/ad-hoc-webhooks)
- [Apify API token](/integrations/api#api-token)
- [Apify Store](https://apify.com/store)
