---
title: Agentic payments with MPP
sidebar_label: MPP
description: Use the Machine Payments Protocol (MPP) to let AI agents buy a prepaid Apify API token with stablecoins on Tempo or Solana - no Apify account needed.
slug: /integrations/mpp
---

With the [Machine Payments Protocol (MPP)](https://mpp.dev), AI agents can buy a prepaid Apify API token and pay with stablecoins on [Tempo](https://tempo.xyz) or [Solana](https://solana.com), without an Apify account.

:::caution Experimental feature

Agentic payments are experimental and may change as payment protocols evolve.

:::

## How MPP works

[MPP](https://mpp.dev) is a protocol for paying for HTTP resources from code. A server answers an unpaid request with HTTP `402 Payment Required` and one or more payment challenges. The client pays one challenge and repeats the request with proof of payment.

[Apify AGI](https://agi.apify.com) (Agent General Interface) sells the token and handles the payment. It uses the `charge` intent, a one-time payment. You pay once upfront for a prepaid token, then use that token to run Actors until its balance runs out. For the full, always-current instructions, read [Apify AGI's AGENTS.md](https://agi.apify.com/AGENTS.md).

## Supported networks and currencies

Apify AGI offers one challenge per network and currency, in the order below. Pay whichever one your wallet holds funds for.

| Network | Currency | Token address or mint |
| --- | --- | --- |
| Tempo mainnet (chain ID `4217`) | USDC.e | `0x20c000000000000000000000b9537d11c60e8b50` |
| Tempo mainnet (chain ID `4217`) | pathUSD | `0x20c0000000000000000000000000000000000000` |
| Solana mainnet | USDC | `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` |
| Solana mainnet | USDT | `Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB` |

USDC.e is the Tempo token for bridged USDC. Its on-chain name is `Bridged USDC (Stargate)`.

## Prerequisites

- An MPP client: [mppx](https://www.npmjs.com/package/mppx) for Tempo, and mppx with [`@solana/mpp`](https://www.npmjs.com/package/@solana/mpp) or [pay.sh](https://pay.sh) for Solana.
- A wallet holding the amount you want to buy, at least $1, in one of the [supported currencies](#supported-networks-and-currencies).
- Funds in the same wallet for the network fee, because Apify AGI doesn't sponsor fees. On Solana, that's a small amount of SOL.

## Request a prepaid token

Buy a token with a `GET` or `POST` request to this endpoint:

```text
https://agi.apify.com/protocols/mpp/prepaid-tokens?amount=5&currency=usd
```

- `amount` - A USD amount as a string, such as `"5"` or `"1.50"`. Use at most two decimals. The amount must be at least $1. If it's missing or invalid, the challenge falls back to $1.
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

It's the same kind of prepaid token the x402 flow returns, so you can [run an Actor](/integrations/x402#run-an-actor) and check the [supported Actors](/integrations/x402#supported-actors) exactly as on the x402 page. The token also works as the bearer credential for the [Apify MCP server](/integrations/mcp). Pass it in the `Authorization` header instead of signing in with OAuth. Check the remaining balance and expiry time at any time:

```bash
curl -s "https://agi.apify.com/prepaid-tokens/balance" -H "Authorization: Bearer $TOKEN"
# → {"remainingBalanceUsd":5,"expiresAt":"..."}
```

## Errors and retries

Errors return a JSON body with an `error` object that holds `type` and `message`. The key statuses:

| Status | `type` | Meaning | What to do |
| --- | --- | --- | --- |
| `202` | `payment-pending` | The payment was received, but the token isn't minted yet. | Retry shortly with the same credential. |
| `400` | `amount-mismatch` | `amount` differs from the signed amount. Apify AGI broadcast nothing. | Request the amount you signed. |
| `402` | - | No credential, or a malformed, expired, or below-minimum one. The body holds fresh challenges. | Pay one of the new challenges. |
| `402` | `payment-failed` | Apify AGI rejected the payment. The money didn't move. | Read `message`, fix the cause, and start a new payment. |
| `409` | `settlement-in-progress` | Another request is settling this payment. | Retry shortly with the same credential. |
| `409` | `payment-already-used` | This transaction was already used for a payment. | Pay a new challenge. |
| `502` | `facilitator-error`, `internal-api-error` | Payment verification or the account service is temporarily unavailable. | Retry with the same credential. |

Retrying with the exact credential you sent first is safe: it returns the same token, never a second one, until the challenge expires about 5 minutes after issue.

## Token pricing and limits

- The smallest token you can buy is $1.
- The token balance is an absolute spending cap. Every Actor run draws from it until the balance runs out.
- The token expires 14 days after you buy it, and `expiresAt` gives the exact time. Any unused balance is non-refundable.
- Your wallet pays the network fee in both push and pull mode.

## Next steps

- Read the [MPP documentation](https://mpp.dev) for details of the protocol.
- Browse [Apify Store](https://apify.com/store) for Actors to run.
- To pay with the alternative x402 protocol instead, follow the [x402 integration guide](/integrations/x402).
