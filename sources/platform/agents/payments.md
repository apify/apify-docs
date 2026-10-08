---
title: Let your AI agent pay for Actor runs
sidebar_label: Agentic payments
description: Let an AI agent pay for Apify Actor runs without signing up, by buying a prepaid, spend-capped token over x402 or MPP, or by paying with Skyfire.
sidebar_position: 4
slug: /agents/payments
---

Agentic payments let an AI agent pay for Actor runs on its own, without signing up for Apify or a person setting up billing. The agent pays through a payment protocol, and the Apify platform meters each run against the amount it paid.

:::caution Experimental feature

Agentic payments are experimental and may change as payment protocols evolve.

:::

## Apify Agent General Interface

The [Apify Agent General Interface (AGI)](https://agi.apify.com) is the entry point for agents that pay their own way. An agent pays once through a supported protocol, and AGI returns a temporary Apify API token with a fixed spend cap. To buy and use a token:

1. List the supported protocols with `GET https://agi.apify.com/protocols`.
1. Request a token for an amount in USD through x402 or MPP (see [supported protocols](#supported-protocols)), for example `GET https://agi.apify.com/protocols/x402/prepaid-tokens?amount=5&currency=usd`. AGI responds with a one-time payment challenge.
1. Pay the challenge and repeat the request with the signed payment credential. After the payment settles, AGI returns the prepaid token.
1. Call the Apify API or the [MCP server](/mcp) with the `Authorization: Bearer <token>` header. Check the remaining balance with `GET https://agi.apify.com/prepaid-tokens/balance`.

The minimum amount for a prepaid token is $1. The token balance is a hard spending cap, the token expires 14 days after you buy it, and unused balance is non-refundable. Check [agi.apify.com](https://agi.apify.com) for the current terms.

A prepaid token works like a regular API token, so it runs any Actor that uses limited permissions, whatever its pricing model. Actors that need full permissions return an error, because a prepaid account can't approve them.

### Prepaid account limits

On top of the spending cap, a prepaid account can use at most:

- 1,000 compute units
- 10 GB of residential proxy traffic
- 50,000 Google SERP proxy requests
- 1,000 GB of external data transfer

## Supported protocols

Two protocols go through AGI, and Skyfire has its own flow:

| Protocol | How the agent pays | Guide |
| :--- | :--- | :--- |
| [x402](https://www.x402.org) | A one-time payment in stablecoins on Base or Solana, exchanged for a prepaid token | [Agentic payments with x402](/integrations/x402) |
| [MPP](https://mpp.dev) | A one-time payment in stablecoins on Tempo or Solana, exchanged for a prepaid token | [Agentic payments with MPP](/integrations/mpp) |
| [Skyfire](https://skyfire.xyz) | Pre-funded Skyfire payment tokens passed to the MCP server or the Apify API, limited to eligible pay-per-event Actors | [Agentic payments with Skyfire](/integrations/skyfire) |

## Agent-ready instructions

AGI serves its own instructions at [agi.apify.com](https://agi.apify.com), written for agents to read before they pay. They cover each protocol, the supported networks and currencies, and the current terms.

## Related resources

- [Agentic payments with x402](/integrations/x402) - Set up a wallet, buy a prepaid token, and run an Actor
- [Agentic payments with MPP](/integrations/mpp) - Buy a prepaid token with stablecoins on Tempo or Solana
- [Agentic payments with Skyfire](/integrations/skyfire) - Pay with Skyfire tokens through the MCP server or the Apify API
- [Apify MCP server](/mcp) - Use a prepaid token with the MCP server
- [Resources for AI agents](/agents/resources) - Find every agent-facing surface Apify publishes
