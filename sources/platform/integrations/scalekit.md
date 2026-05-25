---
title: Scalekit integration
sidebar_label: Scalekit
description: Add per-user OAuth to Apify Actors with Scalekit AgentKit. Store tokens server-side, manage authorization flows, and call tools in 100+ connectors.
sidebar_position: 21
slug: /integrations/scalekit
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

## What is Scalekit

[Scalekit](https://scalekit.com) is auth infrastructure for AI agents. It provides a token vault and connector layer that handles OAuth 2.0 flows, token storage, automatic refresh, and API proxying for 90+ third-party services including Notion, Gmail, Slack, Google Calendar, GitHub, and more.

With the [Scalekit Node SDK](https://www.npmjs.com/package/@scalekit-sdk/node) inside your Actor, each user who runs it can connect their own SaaS accounts. Scalekit stores the OAuth tokens server-side, refreshes them automatically, and proxies API calls on the user's behalf. Your Actor never touches a token directly.

See the [Scalekit Agent Auth documentation](https://docs.scalekit.com/agent-auth/overview/) for the full API reference.

<ThirdPartyDisclaimer />

## How to use Apify with Scalekit

This guide shows how to add per-user OAuth to an Apify Actor using Scalekit. The example connects to a user's Notion workspace and searches their pages.

### Prerequisites

- A [Scalekit account](https://app.scalekit.com) with your `SCALEKIT_ENV_URL`, `SCALEKIT_CLIENT_ID`, and `SCALEKIT_CLIENT_SECRET` from **Dashboard > Developers > Settings > API Credentials**
- An [Apify account](https://console.apify.com/)
- A connection configured in the Scalekit dashboard (go to **Agent Auth > Connections > + Create Connection** and select the service, for example Notion)
- Node.js version 18 or later

Install the Scalekit SDK in your Actor project:

```bash
npm install @scalekit-sdk/node
```

Set your Scalekit credentials as Actor environment variables in Apify Console under **Settings > Environment variables**:

```bash
SCALEKIT_ENV_URL=https://your-env.scalekit.com
SCALEKIT_CLIENT_ID=skc_...
SCALEKIT_CLIENT_SECRET=your-secret
```

### Step 1: Initialize the Scalekit client

Create a Scalekit client using your environment credentials. Initialize it once and reuse it across your Actor.

```javascript
import { Actor } from 'apify';
import { ScalekitClient } from '@scalekit-sdk/node';

await Actor.init();

const scalekit = new ScalekitClient(
  process.env.SCALEKIT_ENV_URL,
  process.env.SCALEKIT_CLIENT_ID,
  process.env.SCALEKIT_CLIENT_SECRET,
);
```

### Step 2: Connect a user's account

Call `getOrCreateConnectedAccount` to check if a user has already authorized a service. This method is idempotent - safe to call on every Actor run.

Use `Actor.getEnv().userId` as the identifier. This string is stable per Apify account, so each user gets their own OAuth session automatically.

```javascript
const { userId } = Actor.getEnv();

const resp = await scalekit.actions.getOrCreateConnectedAccount({
  connectionName: 'notion',
  identifier: userId,
});

let account = resp.connectedAccount ?? resp;
```

The connected account has one of these statuses:

| Status | Meaning |
| --- | --- |
| `ACTIVE` | User is authorized, tokens are valid |
| `INACTIVE` | User has not connected yet |
| `EXPIRED` | Token needs re-authorization |

### Step 3: Authorize the user

If the account is not active, generate an authorization link and surface it in the Actor's status message. The user completes OAuth in their browser, and the Actor polls until the connection is active.

```javascript
import { ConnectorStatus } from '@scalekit-sdk/node/lib/pkg/grpc/scalekit/v1/connected_accounts/connected_accounts_pb';

if (account.status !== ConnectorStatus.ACTIVE) {
  const { link } = await scalekit.actions.getAuthorizationLink({
    connectionName: 'notion',
    identifier: userId,
  });

  await Actor.setStatusMessage(`Authorize Notion: ${link}`);

  // Poll until the user completes OAuth.
  const deadline = Date.now() + 300_000;
  let connected = false;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 5_000));
    const poll = await scalekit.actions.getOrCreateConnectedAccount({
      connectionName: 'notion',
      identifier: userId,
    });
    const pollAccount = poll.connectedAccount ?? poll;
    if (pollAccount.status === ConnectorStatus.ACTIVE) {
      account = pollAccount;
      connected = true;
      break;
    }
  }

  if (!connected) throw new Error('Timed out waiting for Notion authorization.');
}
```

:::tip Authorization persistence

The user authorizes once. Every future Actor run for that Apify account finds an active session and skips the authorization step entirely.

:::

### Step 4: Call the API

Once the account is active, call the third-party API through Scalekit. There are two approaches.

#### Pre-built tools with `executeTool`

Scalekit provides pre-built tools for common operations that return structured, AI-friendly responses:

```javascript
const result = await scalekit.actions.executeTool({
  toolName: 'notion_page_search',
  connectedAccountId: account.id,
  toolInput: { query: 'Meeting Notes', page_size: 5 },
});

console.log('Search results:', JSON.stringify(result, null, 2));
```

#### Direct API calls with `actions.request`

For any API endpoint - including ones without a pre-built tool - use `actions.request`. Scalekit injects the user's token and handles refresh automatically:

```javascript
const result = await scalekit.actions.request({
  connectionName: 'notion',
  identifier: userId,
  path: '/v1/search',
  method: 'POST',
  body: { query: 'Meeting Notes', page_size: 5 },
});
```

Both approaches use the same connected account and the same token vault. Use `executeTool` when a pre-built tool exists for your use case. Use `actions.request` for full control over the API call or to reach endpoints without a pre-built tool.

## Complete example

An Actor that initializes Scalekit, checks authorization, and searches the user's Notion pages:

```javascript
import { Actor } from 'apify';
import { ScalekitClient } from '@scalekit-sdk/node';
import { ConnectorStatus } from '@scalekit-sdk/node/lib/pkg/grpc/scalekit/v1/connected_accounts/connected_accounts_pb';

await Actor.init();

try {
  const input = await Actor.getInput();
  const { task } = input;

  const scalekit = new ScalekitClient(
    process.env.SCALEKIT_ENV_URL,
    process.env.SCALEKIT_CLIENT_ID,
    process.env.SCALEKIT_CLIENT_SECRET,
  );

  const { userId } = Actor.getEnv();

  const resp = await scalekit.actions.getOrCreateConnectedAccount({
    connectionName: 'notion',
    identifier: userId,
  });
  let account = resp.connectedAccount ?? resp;

  if (account.status !== ConnectorStatus.ACTIVE) {
    const { link } = await scalekit.actions.getAuthorizationLink({
      connectionName: 'notion',
      identifier: userId,
    });

    await Actor.setValue('OUTPUT', {
      status: 'AWAITING_AUTH',
      authorizationLink: link,
      message: 'Open the link to authorize Notion.',
    });
    await Actor.setStatusMessage(`Authorize Notion: ${link}`);

    const deadline = Date.now() + 300_000;
    let connected = false;
    while (Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 5_000));
      const poll = await scalekit.actions.getOrCreateConnectedAccount({
        connectionName: 'notion',
        identifier: userId,
      });
      const pollAccount = poll.connectedAccount ?? poll;
      if (pollAccount.status === ConnectorStatus.ACTIVE) {
        account = pollAccount;
        connected = true;
        break;
      }
    }

    if (!connected) throw new Error('Timed out waiting for Notion authorization.');
  }

  const result = await scalekit.actions.executeTool({
    toolName: 'notion_page_search',
    connectedAccountId: account.id,
    toolInput: { query: task, page_size: 5 },
  });

  await Actor.setValue('OUTPUT', { status: 'DONE', task, result });
  await Actor.pushData({ task, result });
} catch (err) {
  console.error('Actor failed:', err.message);
  await Actor.fail(err.message);
}

await Actor.exit();
```

## Use Scalekit with an LLM agent Actor

When your Actor runs an LLM-driven agent, Scalekit's pre-built tools integrate directly into the tool-calling loop. Define tool schemas, pass them to the LLM, and execute tool calls through `scalekit.actions.executeTool`:

```javascript
// The LLM decided to search the user's Notion workspace.
// Execute the tool call through Scalekit - it handles auth automatically.
const result = await scalekit.actions.executeTool({
  toolName: 'notion_page_search',
  connectedAccountId: account.id,
  toolInput: { query: 'Meeting Notes', page_size: 5 },
});

// Feed the result back to the LLM for reasoning.
messages.push({
  role: 'tool_result',
  tool_use_id: toolCall.id,
  content: JSON.stringify(result),
});
```

For a complete working example, see [Notion + YouTube Agent](https://github.com/scalekit-developers/agentkit-apify-actor-example) - an open-source Actor that accepts a natural-language task, connects to the user's Notion and a shared YouTube account, and writes research results to a Notion page using Scalekit tool calls.

## Available connectors

Scalekit supports 90+ OAuth connectors. Common services include:

| Service | `connectionName` |
| --- | --- |
| Gmail | `gmail` |
| Google Calendar | `googlecalendar` |
| Google Drive | `googledrive` |
| Slack | `slack` |
| Notion | `notion` |
| GitHub | `github` |
| HubSpot | `hubspot` |
| Jira | `jira` |
| Salesforce | `salesforce` |
| Linear | `linear` |
| Outlook | `outlook` |
| Zoom | `zoom` |
| Gong | `gong` |
| Airtable | `airtable` |

Change `connectionName` in `getOrCreateConnectedAccount` and `getAuthorizationLink` to connect to a different service. The rest of the code stays the same.

[Browse all connectors](https://docs.scalekit.com/reference/agent-connectors)

:::tip Multiple services per user

Use the same `identifier` across connectors to let your Actor access multiple services for the same user - for example, Gmail and Google Calendar for a scheduling assistant.

:::

## Resources

- [Scalekit Agent Auth documentation](https://docs.scalekit.com/agent-auth/overview/)
- [Agent Auth quickstart](https://docs.scalekit.com/agent-auth/quickstart/)
- [All available connectors](https://docs.scalekit.com/reference/agent-connectors)
- [Agentic tool calling](https://docs.scalekit.com/agent-auth/tools/agent-tools-quickstart/)
- [Notion + YouTube Agent example](https://github.com/scalekit-developers/agentkit-apify-actor-example)
- [Apify Actor per-user OAuth cookbook](https://docs.scalekit.com/cookbooks/apify-actor-per-user-oauth/)
- [Apify Actor documentation](/platform/actors)