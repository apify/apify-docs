---
title: Agentic payments with Skyfire
sidebar_label: Skyfire
description: Use Skyfire to let AI agents buy a prepaid Apify API token from Apify AGI with a Skyfire PAY token and run Apify Actors without an Apify account.
slug: /integrations/skyfire
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

With [Skyfire](https://skyfire.xyz/), AI agents can buy a prepaid Apify API token from a Skyfire wallet balance and use it to run Apify Actors, without an Apify account.

:::caution Experimental feature

Agentic payments are experimental and may change as payment protocols evolve.

:::

<ThirdPartyDisclaimer />

## How Skyfire works

[Skyfire](https://skyfire.xyz/) is a payment network for AI agents. An agent with a funded Skyfire wallet creates a _PAY token_: a signed token for one seller, worth up to an amount the agent chooses.

[Apify AGI](https://agi.apify.com) (Agent General Interface) sells the prepaid token. It charges the PAY token once for the amount you request and returns a prepaid Apify API token. For the full, always-current instructions, read [Apify AGI's AGENTS.md](https://agi.apify.com/AGENTS.md).

Buying and using a token takes four steps:

1. Get Apify's seller service ID from Apify AGI.
1. Create a PAY token for that seller with the Skyfire API.
1. Send the PAY token to Apify AGI, which charges it and returns a prepaid token.
1. [Use the prepaid token](#use-the-prepaid-token) as your Apify API token until its balance runs out or it expires.

## Prerequisites

- A Skyfire buyer account with a funded wallet. [Sign up at Skyfire](https://app.skyfire.xyz/auth).
- The buyer API key from your Skyfire dashboard. Treat it as a secret.

## Buy a prepaid token

Buy a token with a `GET` or `POST` request to this endpoint:

```text
https://agi.apify.com/protocols/skyfire/prepaid-tokens?amount=5&currency=usd
```

- `amount` - A USD amount of at least $1, such as `5` or `1.50`. Use at most two decimals.
- `currency` - A currency code. The only accepted value is `usd`.

Without a PAY token, Apify AGI answers with `402` and Apify's seller service ID in the `sellerServiceId` field. Create a PAY token for that seller worth at least `amount`, then repeat the request with the PAY token in the `kyapay-token` header:

```bash
export SKYFIRE_API_KEY="..."  # your Skyfire buyer API key

# Get Apify's seller service ID
SERVICE=$(curl -s 'https://agi.apify.com/protocols/skyfire/prepaid-tokens?amount=5&currency=usd' | jq -r .sellerServiceId)

# Create a $5 PAY token that expires in 15 minutes
PAY_TOKEN=$(curl -s -X POST 'https://api.skyfire.xyz/api/v1/tokens' \
  -H "skyfire-api-key: $SKYFIRE_API_KEY" \
  -H 'Content-Type: application/json' \
  -d "{\"type\":\"pay\",\"tokenAmount\":\"5.00\",\"sellerServiceId\":\"$SERVICE\",\"expiresAt\":$(( $(date +%s) + 900 ))}" \
  | jq -er .token)

# Buy a $5 prepaid token
curl -s 'https://agi.apify.com/protocols/skyfire/prepaid-tokens?amount=5&currency=usd' \
  -H "kyapay-token: $PAY_TOKEN"
# → {"token":"apify_api_...","remainingBalanceUsd":5,"expiresAt":"..."}
```

Apify AGI charges only `amount`, and it charges each PAY token once, so repeating a request never charges again. If the request times out or returns a `409`, `429`, or `5xx` status, wait 10 seconds and repeat it with the same PAY token. Create a new PAY token only when the response asks for one. [Apify AGI's AGENTS.md](https://agi.apify.com/AGENTS.md) lists every retry case.

## Use the prepaid token

Send the token as a bearer token to the [Apify API](/api/v2). It acts as an API token until its balance runs out or it expires. Treat it like a secret, and don't print it or store it where others can read it.

```bash
export TOKEN="apify_api_..."  # the token from the previous step

# Run an Actor and get its dataset items in one call.
# In the API, replace the / in the Actor name with ~.
curl -s -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": ["natgeo"], "resultsLimit": 3}' \
  "https://api.apify.com/v2/actors/apify~instagram-post-scraper/run-sync-get-dataset-items"

# Check the remaining balance and expiry time
curl -s "https://agi.apify.com/prepaid-tokens/balance" -H "Authorization: Bearer $TOKEN"
# → {"remainingBalanceUsd":5,"expiresAt":"..."}
```

The token also works as the bearer credential for the [Apify MCP server](/mcp). Pass it in the `Authorization` header instead of signing in with OAuth.

## Supported Actors

A prepaid token works like a regular API token, so it runs any Actor that uses [limited permissions](/actors/development/permissions), whatever its pricing model. Actors that need full permissions return an error, because a prepaid account can't approve them.

## Token pricing and limits

- The smallest token you can buy is $1.
- The token balance is an absolute spending cap. Every Actor run draws from it until the balance runs out.
- The token expires 14 days after you buy it, and `expiresAt` gives the exact time. Any unused balance is non-refundable.
- A prepaid account also has [usage limits](/agents/payments#prepaid-account-limits), such as 1,000 compute units.

## Next steps

- Read the [Skyfire documentation](https://docs.skyfire.xyz) for details on PAY tokens.
- Browse [Apify Store](https://apify.com/store) for Actors to run.
- Follow the [x402](/integrations/x402) or [MPP](/integrations/mpp) integration guide to pay with stablecoins.
