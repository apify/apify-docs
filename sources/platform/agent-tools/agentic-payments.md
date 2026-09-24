---
title: Agentic payments
sidebar_label: Agentic payments
description: Let an AI agent pay for Apify Actor runs without an Apify account, by buying a prepaid, spend-capped token over x402 or MPP, or by paying with Skyfire.
sidebar_position: 4
slug: /agent-tools/agentic-payments
---

Agentic payments let an AI agent pay for Actor runs on its own, without an Apify account or a person setting up billing. The agent pays through a payment protocol, and the Apify platform meters each run against the amount it paid.

:::caution Experimental feature

Agentic payments are experimental and may change as payment protocols evolve.

:::

## Apify Agent General Interface

The [Apify Agent General Interface (AGI)](https://agi.apify.com) is the entry point for agents that pay their own way. An agent pays once through a supported protocol, and AGI returns a temporary Apify API token with a fixed spend cap. The agent then uses that token against the Apify API or the [MCP server](/mcp) like any other token:

1. List the supported protocols with `GET https://agi.apify.com/protocols`.
1. Request a token for an amount in USD, for example `GET https://agi.apify.com/protocols/x402/prepaid-tokens?amount=5&currency=usd`. AGI responds with a one-time payment challenge.
1. Pay the challenge and repeat the request with the signed payment credential. After the payment settles, AGI returns the prepaid token.
1. Call the Apify API or the MCP server with the `Authorization: Bearer <token>` header. Check the remaining balance with `GET https://agi.apify.com/prepaid-tokens/balance`.

The minimum purchase is $1. The token balance is a hard spending cap, the token expires 14 days after purchase, and unused balance is non-refundable. Check [agi.apify.com](https://agi.apify.com) for the current terms.

## Supported protocols

Two protocols go through AGI, and Skyfire has its own flow:

| Protocol | How the agent pays | Guide |
| :--- | :--- | :--- |
| [x402](https://www.x402.org) | A one-time payment in stablecoins on Base or Solana, exchanged for an AGI token | [Agentic payments with x402](/integrations/x402) |
| [MPP](https://mpp.dev) | A one-time payment in USDC or pathUSD on Tempo, exchanged for an AGI token | Instructions on [agi.apify.com](https://agi.apify.com) |
| [Skyfire](https://skyfire.xyz) | Pre-funded Skyfire payment tokens passed to the MCP server or the Apify API | [Agentic payments with Skyfire](/integrations/skyfire) |

Not every Actor accepts agentic payments. The [x402 guide](/integrations/x402#supported-actors) lists the eligibility rules.

## Agent-ready instructions

AGI serves its own instructions at [agi.apify.com](https://agi.apify.com), written for agents to read before they pay. For an end-to-end walkthrough of wallet setup, payment, and running Actors, point your agent at the [Apify x402 skill](https://raw.githubusercontent.com/apify/awesome-skills/refs/heads/main/skills/apify-x402-agentic-wallet/SKILL.md).

## Related resources

- [Agentic payments with x402](/integrations/x402) - Set up a wallet, buy a prepaid token, and run an Actor
- [Agentic payments with Skyfire](/integrations/skyfire) - Pay with Skyfire tokens through the MCP server or the Apify API
- [Apify MCP server](/mcp) - Use a prepaid token with the MCP server
- [Docs for agents](/agent-tools/docs-for-agents) - Every agent-facing surface Apify publishes
