---
title: Integrate Apify
sidebar_label: Integrate Apify
sidebar_position: 3
slug: /get-started/integrate
description: Connect Apify to your stack - call Actors from your code, react to runs with webhooks, and plug results into your workflow tools, data stores, and agents.
pagination_next: null
pagination_prev: null
---

You already have a stack, and you want Apify to feed it. That might be a backend that needs scraped data, a workflow tool that reacts when a run finishes, or a warehouse that receives results. Every integration follows the same loop: authenticate, run an Actor, pick up its output, and hand it to the next system. This page walks through that loop and points you to the right page at each step. For the full list of supported tools, see [Integrations](/integrations).

## Call an Actor from your code

Everything in Apify Console is also available through the REST API. You authenticate with an API token, start an Actor run, and read the results from storage. Official clients for JavaScript and Python handle retries and pagination for you.

- [API integration](/integrations/api) - get a token, authenticate, and scope what the token can access.
- [API reference](/api/v2) - every endpoint, with the run and dataset calls you'll use most.
- [API client for JavaScript](/api/client/js) and [API client for Python](/api/client/python) - libraries that call the same API from your code.
- [Actor Standby](/actors/running/standby) - call an Actor as a live HTTP endpoint instead of starting a run per request.

## React when a run finishes

Instead of polling for a run to finish, let the platform call you. Webhooks fire on run events such as success or failure and send a POST request to a URL you choose. Actor-to-Actor integrations do the same thing inside the platform, starting another Actor or task from the finished run.

- [Webhooks](/integrations/webhooks) - events, payloads, and where to set them up.
- [Actor-to-Actor](/integrations/actors) - chain Actors and tasks without leaving the platform.
- [Save input as a task](/actors/running/tasks) and [schedule it](/actors/running/schedules) so integrations have a stable configuration to trigger.

## Connect your tools

If your team works in a workflow platform or a data tool, you don't need code. Apify has native modules for the common automation platforms and connectors for data destinations.

- [Workflows and notifications](/integrations/workflows-and-notifications) - n8n, Make, Zapier, and other automation platforms, plus Slack and email.
- [Data and storage](/integrations/data-and-storage) - Snowflake, Airbyte, Airtable, Google Drive, and other destinations.
- [Create a new integration](/integrations/integrate) - if your product isn't listed and you want to connect it to Apify.

## Connect an AI agent

Agents and coding assistants connect to Apify through the Apify MCP server, Agent Skills, or the plugin for your client. Start with the comparison, then follow the guide for the client you use.

- [For AI agents](/agents) - how the MCP server, plugins, and Agent Skills differ, and which one fits your setup.
- [Agent quickstart](/get-started/agent-onboarding) - a hands-on path from connecting an agent to running its first Actor.
- [AI integrations](/integrations/ai) - agent frameworks, SDKs, and vector databases.

To run Actors by hand first, start with [Run Actors](/get-started/run-actors). To build your own Actor, see [Build Actors](/get-started/build-actors).
