---
title: Apify AI
description: Apify AI is the conversational AI interface inside Apify Console for finding and running Actors using natural language, instead of keyword search.
sidebar_position: 2.5
category: platform
slug: /console/apify-ai
---

Apify AI is a conversational AI interface inside [Apify Console](https://console.apify.com) that lets you describe what you want in plain English and runs the right Actor for you. It uses the same search and execution backend as [Apify Store](https://apify.com/store) search and the [Apify MCP server](/platform/integrations/mcp).

<!-- TODO: add screenshot of the Store search bar showing the "Ask AI" routing -->

## Where to find Apify AI

Apify AI has two entry points in Apify Console:

- _Store search bar_ - long, intent-heavy queries are routed to Apify AI. Short keyword queries continue to use the regular Store search.
- _Dashboard widget_ - a chat widget on the Console dashboard.

## What you can do with Apify AI

Apify AI currently supports the core discovery and execution workflow:

- Search Apify Store for an Actor that matches your goal.
- View an Actor's details, including its input schema and pricing.
- Run an Actor with inputs that Apify AI fills in from your description.
- Fetch results from the Actor's default dataset.

## Excluded Actors

Apify AI can run most Actors in Apify Store, but two categories are excluded:

- _Full-permission Actors_ - excluded for security. Running a [full-permission Actor](/actors/running/permissions#full-permission-actors) is a decision you approve personally, so an LLM can't make it on your behalf.
- _Rental Actors_ - excluded because their subscription-based model doesn't fit the sporadic, on-demand way Apify AI runs Actors.

## Out of current scope

Apify AI does not yet support the following operations. Use Apify Console directly for these:

- Creating or running [tasks](/platform/actors/running/tasks).
- Setting up [schedules](/platform/schedules).
- [Publishing](/platform/actors/publishing) Actors.
- Configuring external [integrations](/platform/integrations).

## Daily usage limit

Apify AI has a daily token limit per user:

- Free plan users get a lower daily allowance.
- Users on any paid plan share the same higher daily allowance.

If you hit the limit, wait until the next day or upgrade to a paid plan for the higher allowance.

## Search ranking

Search ranking in Apify AI uses parameters similar to those evaluated by the [Actor quality score](/platform/actors/publishing/quality-score), the same as Apify Store search and the MCP server `search-actors` tool. The two are separate systems that correlate strongly: Actors with higher quality scores tend to rank higher in search. To improve your Actor's visibility, focus on improving its quality score.

## Related

- [Apify MCP server](/platform/integrations/mcp) - the programmatic interface to the same backend for external AI agents and CLIs.
- [Actor quality score](/platform/actors/publishing/quality-score) - the metric that correlates with search ranking across surfaces.
- [Apify Store](/console/store) - the Console view of the Store, including the search bar entry point.
