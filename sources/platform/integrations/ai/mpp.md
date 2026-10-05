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

Each challenge names a payment method, such as `tempo` or `solana`, and an intent. Apify AGI uses the `charge` intent, a one-time payment. You pay once upfront for a prepaid token, then use that token to run Actors until its balance runs out.

[Apify AGI](https://agi.apify.com) (Agent General Interface) sells the token and handles the payment. Agents can read the same instructions as Markdown at [agi.apify.com/llms.txt](https://agi.apify.com/llms.txt).

## Supported networks and currencies

Apify AGI offers one challenge per network and currency, in the order below. Pay whichever one your wallet holds funds for. All four currencies use six decimals.

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

You don't need an Apify account.

## Request a prepaid token

Buy a token with a `GET` or `POST` request to this endpoint:

```text
https://agi.apify.com/protocols/mpp/prepaid-tokens?amount=5&currency=usd
```

- `amount` - A USD amount as a string, such as `"5"` or `"1.50"`. Use at most two decimals. The amount must be at least $1.
- `currency` - A currency code. The only accepted value is `usd`.

Pass both parameters in the query string, or in a JSON body on `POST`, such as `{"amount":"5","currency":"usd"}`. If both are present, the body takes precedence. If `amount` is missing or invalid, including a JSON number instead of a string, the challenge falls back to $1.

Buying a token takes two requests, and MPP clients make both for you:

1. The first request carries no payment. Apify AGI answers with `402` and one challenge per supported currency.
1. The client pays one challenge and repeats the request with an `Authorization: Payment` header. Apify AGI verifies the payment and answers with `201`.

The `201` response holds the token, its balance, and its expiry time:

```json
{"token":"apify_api_...","remainingBalanceUsd":5,"expiresAt":"..."}
```

The token acts as an API token until its balance runs out or it expires. Treat it like a secret. Don't print it or store it where others can read it.

## Choose push or pull mode

Apify AGI accepts the `charge` intent in two modes. Your client picks the mode when it builds the payment credential.

- In push mode, your client broadcasts the transfer itself and sends the transaction hash (Tempo) or signature (Solana). Apify AGI verifies the transfer on-chain, read-only, and mints the token.
- In pull mode, your client signs the transfer but doesn't broadcast it. Apify AGI broadcasts the signed transaction and waits for confirmation. Your wallet still pays the network fee.

Use push mode when your client can broadcast. If the wallet can't cover the payment, the client then fails locally, and nothing reaches Apify AGI. Use pull mode when your client can sign but can't broadcast.

The modes treat the `amount` in the request differently:

- In pull mode, Apify AGI compares it with the signed amount before it broadcasts. If they differ, it returns `400 amount-mismatch` and broadcasts nothing.
- In push mode, Apify AGI ignores it. The token gets the amount of the challenge you paid, checked against the on-chain transfer.

## Pay on Tempo

Pay with USDC.e or pathUSD on Tempo mainnet using [mppx](https://www.npmjs.com/package/mppx). It reads the challenges, pays a Tempo one, and repeats the request for you.

### Pay with the mppx CLI

Install the CLI, create an account, and fund its address with USDC.e or pathUSD on Tempo. Then request the token:

```bash
# Install the mppx CLI
npm i -g mppx

# Create a Tempo account and print the address to fund
mppx account create
mppx account view

# Buy a $5 token
mppx 'https://agi.apify.com/protocols/mpp/prepaid-tokens?amount=5&currency=usd'
# → {"token":"apify_api_...","remainingBalanceUsd":5,"expiresAt":"..."}
```

The CLI keeps its account in the operating system keychain. On headless Linux without a keychain service, such as `secret-tool` with GNOME Keyring, it fails with `KEYCHAIN_UNAVAILABLE`. Use the mppx library instead.

### Pay with the mppx library

The mppx client library needs no keychain. Install it with [viem](https://viem.sh):

```bash
npm install mppx viem
```

Pass a viem account to `tempo.charge` and set `mode` explicitly. For an account built from a local private key, the default mode is pull.

```javascript
import { Mppx, tempo } from 'mppx/client';
import { privateKeyToAccount } from 'viem/accounts';

// A 0x-prefixed hex private key, loaded from your secret store
const account = privateKeyToAccount(process.env.TEMPO_PRIVATE_KEY);

const mppx = Mppx.create({
    methods: [tempo.charge({ account, mode: 'push' })], // or 'pull'
    polyfill: false, // keep the global fetch untouched
});

const response = await mppx.fetch(
    'https://agi.apify.com/protocols/mpp/prepaid-tokens?amount=5&currency=usd',
);
console.log(response.status, await response.json());
// → 201 { token: 'apify_api_...', remainingBalanceUsd: 5, expiresAt: '...' }
```

## Pay on Solana

Pay with USDC or USDT on Solana mainnet. In both modes, keep a small amount of SOL in the same wallet for the network fee.

### Pay with mppx and @solana/mpp

Install the client packages:

```bash
npm install mppx @solana/mpp @solana/kit
```

The `signer` is a [`@solana/kit`](https://www.npmjs.com/package/@solana/kit) `TransactionSigner`. Set `broadcast: true` for push mode or `broadcast: false` for pull mode.

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

const response = await mppx.fetch(
    'https://agi.apify.com/protocols/mpp/prepaid-tokens?amount=5&currency=usd',
);
console.log(response.status, await response.json());
// → 201 { token: 'apify_api_...', remainingBalanceUsd: 5, expiresAt: '...' }
```

The client pays the first challenge it can, in the server's order, so USDC comes before USDT. If your wallet holds only USDT, pass an `orderChallenges` callback to `Mppx.create` that puts the USDT challenge first.

Without an `rpcUrl` option, `solana.charge` picks a default RPC endpoint for the challenge's network. Pass `rpcUrl` to use your own.

### Pay with pay.sh

[pay.sh](https://pay.sh) is the Solana Foundation's payments CLI. It signs a pull credential and repeats the request for you.

```bash
# Install pay.sh, set up a wallet, and print the address to fund
npm install -g @solana/pay
pay setup
pay whoami

# Buy a $5 token
pay --mainnet --mpp curl 'https://agi.apify.com/protocols/mpp/prepaid-tokens?amount=5&currency=usd'
# → {"token":"apify_api_...","remainingBalanceUsd":5,"expiresAt":"..."}
```

## Use the prepaid token

Send the token as a bearer token to the [Apify API](/api/v2). Apify AGI isn't involved once it mints the token, and billing meters each run against the token's balance.

The token is the same kind of prepaid token the x402 flow returns, so the steps on that page apply unchanged:

- [Run an Actor](/integrations/x402#run-an-actor) with the token and read its results.
- Check which Actors you can run in [Supported Actors](/integrations/x402#supported-actors).

The token also works as the bearer credential for the [Apify MCP server](/integrations/mcp). Pass it in the `Authorization` header instead of signing in with OAuth.

Check the remaining balance and expiry time at any time:

```bash
curl -s "https://agi.apify.com/prepaid-tokens/balance" \
  -H "Authorization: Bearer $TOKEN"
# → {"remainingBalanceUsd":5,"expiresAt":"..."}
```

## Payment challenge format

Read this section if you write an MPP client or debug a payment. A request without an `Authorization: Payment` header returns `402` with one `WWW-Authenticate: Payment` header per challenge:

```bash
curl -si 'https://agi.apify.com/protocols/mpp/prepaid-tokens?amount=5&currency=usd'
```

```text
HTTP/2 402
www-authenticate: Payment id="<challenge-id>", realm="agi.apify.com", method="tempo", intent="charge", request="<base64url>", description="...", expires="2026-10-05T02:20:13.539Z"
www-authenticate: Payment id="<challenge-id>", realm="agi.apify.com", method="tempo", intent="charge", request="<base64url>", description="...", expires="..."
www-authenticate: Payment id="<challenge-id>", realm="agi.apify.com", method="solana", intent="charge", request="<base64url>", description="...", expires="..."
www-authenticate: Payment id="<challenge-id>", realm="agi.apify.com", method="solana", intent="charge", request="<base64url>", description="...", expires="..."
```

The `request` parameter is base64url-encoded JSON. The response body repeats the challenges with `request` decoded. This example shows the first Tempo and the first Solana challenge, without `description`:

```json
{
  "challenges": [
    {
      "id": "<challenge-id>",
      "realm": "agi.apify.com",
      "method": "tempo",
      "intent": "charge",
      "expires": "2026-10-05T02:20:13.539Z",
      "request": {
        "amount": "5000000",
        "currency": "0x20c000000000000000000000b9537d11c60e8b50",
        "recipient": "0x4277a412BB736Dcc21FC62bF8b7D550Dd5cBEbD7",
        "methodDetails": { "chainId": 4217, "supportedModes": ["push", "pull"] }
      }
    },
    {
      "id": "<challenge-id>",
      "realm": "agi.apify.com",
      "method": "solana",
      "intent": "charge",
      "expires": "2026-10-05T02:20:13.541Z",
      "request": {
        "amount": "5000000",
        "currency": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "recipient": "ECUPkq6DP8VUSEueL4qNznyNDJLwu6PQhnMQ5cuZsTLH",
        "methodDetails": {
          "decimals": 6,
          "network": "mainnet",
          "recentBlockhash": "<recent-blockhash>",
          "tokenProgram": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      }
    }
  ]
}
```

The fields that matter when you pay:

- `method` - A payment network, `tempo` or `solana`.
- `intent` - A payment type. Apify AGI always uses `charge`, a one-time payment.
- `request.amount` - A price in atomic units of the currency. With six decimals, `5000000` is $5.
- `request.currency` - A token address on Tempo, or a token mint on Solana.
- `request.recipient` - An Apify address that receives the payment.
- `request.methodDetails.supportedModes` - A list of modes Apify AGI accepts on Tempo: `push` and `pull`.
- `expires` - An expiry time, about 5 minutes after Apify AGI issues the challenge.

Pay one challenge before it expires, then repeat the request with `Authorization: Payment <credential>`. The credential is base64url-encoded JSON that echoes the challenge and carries the proof of payment. For push mode, that's the transaction hash (Tempo) or signature (Solana). For pull mode, it's the signed transaction.

## Responses and errors

Errors return a JSON body with an `error` object that holds `type` and `message`. The `400` errors apply only to pull payments. A request without a credential never gets them. It gets a $1 challenge instead.

| Status | `type` | Meaning | What to do |
| --- | --- | --- | --- |
| `201` | - | The token is minted. | Use the token. |
| `202` | `payment-pending` | The payment was received, but the token isn't minted yet. | Retry shortly with the same credential. |
| `400` | `invalid-amount` | `amount` isn't a string with at most two decimals, or it's below $1. | Fix `amount`. |
| `400` | `invalid-currency` | `currency` isn't `usd`. | Set `currency` to `usd`. |
| `400` | `amount-mismatch` | `amount` differs from the signed amount. Apify AGI broadcast nothing. | Request the amount you signed. |
| `402` | - | No credential, or a malformed, expired, or below-minimum one. The body holds fresh challenges. | Pay one of the new challenges. |
| `402` | `payment-failed` | Apify AGI rejected the payment. The money didn't move. | Read `message`, fix the cause, and start a new payment. |
| `409` | `settlement-in-progress` | Another request is settling this payment. | Retry shortly with the same credential. |
| `409` | `payment-already-used` | This transaction was already used for a payment, such as by a credential built for a different challenge. | Pay a new challenge. |
| `502` | `facilitator-error` | Payment verification is temporarily unavailable. | Retry with the same credential. |
| `502` | `internal-api-error` | The account service is temporarily unavailable. | Retry with the same credential. |

## Retries and idempotency

Retrying is safe. Apify AGI keys each payment on its on-chain transaction, so a retry with the same credential returns the same token and never mints a second one. You can redeem each on-chain transaction only once.

- Retry with the exact credential you sent first, not a new credential built around the same transaction.
- Retry after a `202`, a `409 settlement-in-progress`, a `502`, or a lost response.
- Retry before the challenge expires. After that, Apify AGI rejects the credential and answers with fresh challenges. Paying one of them buys a new token.

## Token pricing and limits

- The smallest token you can buy is $1.
- The token balance is an absolute spending cap. Every Actor run draws from it until the balance runs out.
- The token expires 14 days after you buy it, and `expiresAt` gives the exact time. Any unused balance is non-refundable.
- Your wallet pays the network fee in both push and pull mode.

## Next steps

- Read the [MPP documentation](https://mpp.dev) for details of the protocol.
- Browse [Apify Store](https://apify.com/store) for Actors to run.
- To pay with the alternative x402 protocol instead, follow the [x402 integration guide](/integrations/x402).
