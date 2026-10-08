---
title: Agentic payments with MPP
sidebar_label: MPP
description: Use the Machine Payments Protocol (MPP) to let AI agents buy a prepaid Apify API token with stablecoins on Tempo or Solana - no Apify account needed.
slug: /integrations/mpp
---

import AgenticPaymentsEligibility from '@site/sources/_partials/_agentic-payments-eligibility.mdx';

With the [Machine Payments Protocol (MPP)](https://mpp.dev), AI agents can buy a prepaid Apify API token and pay with stablecoins on [Tempo](https://tempo.xyz) or [Solana](https://solana.com), without an Apify account.

:::caution Experimental feature

Agentic payments are experimental and may change as payment protocols evolve.

:::

## How MPP works

Buying and using a token takes four steps:

1. [Set up a wallet](#prerequisites) on Tempo or Solana and fund it with a supported stablecoin.
2. [Request a prepaid token](#request-a-prepaid-token) from Apify AGI. Your MPP client pays for it from the wallet.
3. Apify AGI verifies the payment and returns a prepaid Apify API token.
4. [Use that token](#use-the-prepaid-token) as your Apify API token until its balance runs out or it expires.

[MPP](https://mpp.dev) is a protocol for paying for HTTP resources from code. A server answers an unpaid request with HTTP `402 Payment Required` and one or more payment challenges. The client pays one challenge and repeats the request with proof of payment.

[Apify AGI](https://agi.apify.com) (Agent General Interface) sells the token and handles the payment. It uses the `charge` intent, a one-time payment. You pay once upfront for a prepaid token, then use that token to run Actors until its balance runs out. For the full, always-current instructions, read [Apify AGI's AGENTS.md](https://agi.apify.com/AGENTS.md).

## Supported networks and currencies

Apify AGI offers one challenge per network and currency, in the order below. Pay whichever one your wallet holds funds for.

| Network | Currency |
| --- | --- |
| Tempo mainnet (chain ID `4217`) | [USDC.e](https://explore.tempo.xyz/token/0x20c000000000000000000000b9537d11c60e8b50) |
| Tempo mainnet (chain ID `4217`) | [pathUSD](https://explore.tempo.xyz/token/0x20c0000000000000000000000000000000000000) |
| Solana mainnet | [USDC](https://developers.circle.com/stablecoins/usdc-contract-addresses) |
| Solana mainnet | [USDT](https://tether.to/en/supported-protocols) |

Your MPP client reads each token address or mint from the `402` challenge, so you never enter one by hand. Each currency links to its issuer or block explorer entry, where you can check the address yourself.

USDC.e is the Tempo token for bridged USDC. Its on-chain name is `Bridged USDC (Stargate)`.

## Prerequisites

- An MPP client for the network you pay on:
  - On Tempo, the [mppx](https://www.npmjs.com/package/mppx) CLI.
  - On Solana, mppx with [`@solana/mpp`](https://www.npmjs.com/package/@solana/mpp) and [`@solana/kit`](https://www.npmjs.com/package/@solana/kit), or the [pay.sh](https://pay.sh) CLI.
- A wallet holding the amount you want to buy, at least $1, in one of the [supported currencies](#supported-networks-and-currencies).
- Funds in the same wallet for the network fee, because Apify AGI doesn't sponsor fees. On Solana, that's a small amount of SOL.

## Request a prepaid token

Buy a token with a `GET` or `POST` request to this endpoint:

```text
https://agi.apify.com/protocols/mpp/prepaid-tokens?amount=5&currency=usd
```

- `amount` - A USD amount, such as `5` or `1.50`. Use at most two decimals. If it's missing or invalid, the challenge falls back to $1. Requests below $1 are rejected.
- `currency` - A currency code. The only accepted value is `usd`.

Buying a token takes two requests, and MPP clients make both for you. The first carries no payment, and Apify AGI answers with `402` and one challenge per supported currency. The client pays one challenge and repeats the request with an `Authorization: Payment` header. Apify AGI verifies the payment and answers with `201` and the token, its balance, and its expiry time:

```json
{"token":"apify_api_...","remainingBalanceUsd":5,"expiresAt":"..."}
```

If you write your own MPP client, the `402` response carries one `WWW-Authenticate: Payment` header per challenge, and its body repeats the challenges as JSON.

## Choose push or pull mode

Apify AGI accepts the `charge` intent in two modes. Your client picks the mode when it builds the payment credential.

- In push mode, your client broadcasts the transfer itself and sends the transaction hash (Tempo) or signature (Solana). Apify AGI verifies the transfer on-chain and mints the token. It ignores the `amount` in the request, and the token gets the amount of the challenge you paid. Use push mode when your client can broadcast.
- In pull mode, your client signs the transfer but doesn't broadcast it. Apify AGI compares the signed amount with `amount` in the request, then broadcasts the transaction. If they differ, it returns `400 amount-mismatch` and broadcasts nothing. Use pull mode when your client can sign but can't broadcast.

## Pay on Tempo

Pay with USDC.e or pathUSD on Tempo mainnet using the [mppx](https://www.npmjs.com/package/mppx) CLI. It reads the challenges, pays a Tempo one, and repeats the request for you. Install the CLI, create an account, and fund its address with USDC.e or pathUSD on Tempo. Then request the token:

```bash
npm i -g mppx
mppx account create
mppx account view  # print the address to fund
mppx 'https://agi.apify.com/protocols/mpp/prepaid-tokens?amount=5&currency=usd'  # buy a $5 token
```

The CLI keeps its account in the operating system keychain, so on headless Linux without a keychain service, use the mppx client library with a [viem](https://viem.sh) account instead.

## Pay on Solana

Pay with USDC or USDT on Solana mainnet, and keep a small amount of SOL in the same wallet for the network fee. Install the client packages with `npm install mppx @solana/mpp @solana/kit`.

Pass a [`@solana/kit`](https://www.npmjs.com/package/@solana/kit) `TransactionSigner` to `solana.charge`, and set `broadcast: true` for push mode or `broadcast: false` for pull mode. The client pays the first challenge it can, in server order, so a wallet holding only USDT needs an `orderChallenges` callback passed to `Mppx.create` that puts USDT first.

```javascript
import { createKeyPairSignerFromBytes } from '@solana/kit';
import { solana } from '@solana/mpp/client';
import { Mppx } from 'mppx/client';

// A 64-byte keypair as a JSON array, the format of a Solana CLI keypair file
const keypair = new Uint8Array(JSON.parse(process.env.SOLANA_KEYPAIR));
const signer = await createKeyPairSignerFromBytes(keypair);

const mppx = Mppx.create({
    methods: [solana.charge({ signer, broadcast: true })], // false for pull
    polyfill: false, // keep the global fetch untouched
});
const response = await mppx.fetch('https://agi.apify.com/protocols/mpp/prepaid-tokens?amount=5&currency=usd');
console.log(response.status, await response.json());
```

You can also pay with [pay.sh](https://pay.sh), the Solana Foundation's payments CLI, which signs a pull credential and repeats the request for you:

```bash
npm install -g @solana/pay
pay setup   # set up a wallet
pay whoami  # print the address to fund
pay --mainnet --mpp curl 'https://agi.apify.com/protocols/mpp/prepaid-tokens?amount=5&currency=usd'
```

## Use the prepaid token

Send the token as a bearer token to the [Apify API](/api/v2). It acts as an API token until its balance runs out or it expires. Treat it like a secret, and don't print it or store it where others can read it.

It's the same kind of prepaid token the x402 flow returns. The token also works as the bearer credential for the [Apify MCP server](/mcp). Pass it in the `Authorization` header instead of signing in with OAuth. Check the remaining balance and expiry time at any time:

```bash
curl -s "https://agi.apify.com/prepaid-tokens/balance" -H "Authorization: Bearer $TOKEN"
# → {"remainingBalanceUsd":5,"expiresAt":"..."}
```

## Run an Actor

Export the token, then find an Actor and run it:

```bash
export TOKEN="apify_api_..."  # the token from the previous step
```

:::caution Actor name format

When using the API, replace the `/` in the Actor name with `~` (for example, `apify/instagram-post-scraper` becomes `apify~instagram-post-scraper`).

:::

```bash
# Find an Actor in the store
curl -s "https://api.apify.com/v2/store?search=instagram&limit=5"

# Run an Actor and get its dataset items in one call
curl -s -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": ["natgeo"], "resultsLimit": 3}' \
  "https://api.apify.com/v2/actors/apify~instagram-post-scraper/run-sync-get-dataset-items"
# → JSON array with the scraped Instagram posts
```

To review what an Actor does and which input it accepts, fetch its Markdown documentation at `https://apify.com/<username>/<actor-name>.md`.

## Supported Actors

Not all Actors in Apify Store are eligible.

<AgenticPaymentsEligibility />

## Token pricing and limits

- The smallest token you can buy is $1.
- The token balance is an absolute spending cap. Every Actor run draws from it until the balance runs out.
- The token expires 14 days after you buy it, and `expiresAt` gives the exact time. Any unused balance is non-refundable.
- Your wallet pays the network fee in both push and pull mode.

## Next steps

- Read the [MPP documentation](https://mpp.dev) for details of the protocol.
- Browse [Apify Store](https://apify.com/store) for Actors to run.
- To pay with the alternative x402 protocol instead, follow the [x402 integration guide](/integrations/x402).
