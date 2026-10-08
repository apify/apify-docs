---
title: Glossary
description: Definitions of Apify-specific terms, from Actors and datasets to proxy types and pricing models, each linking to the page that covers it in full.
slug: /glossary
toc_max_heading_level: 2
---

Short definitions of the terms used across Apify docs. Each entry links to the page that covers the concept in full.

This page covers only what is specific to Apify, not the general vocabulary of web scraping and software development.

## Actor

An [Actor](/actors) is a tool that does a job on the web, such as data extraction, lead generation, social media monitoring, or competitor tracking, and its output equips AI agents and apps with real-time web data. Technically, it's a serverless cloud program that takes a structured JSON input, performs a task, and optionally produces a structured output. You [build](/actors/development) it from your own code, run it from [Apify Console](/account/console), the [Apify API](/api/v2), or a [schedule](/actors/running/schedules), and can [publish](/actors/publishing) it to [Apify Store](https://apify.com/store) to earn from others using it.

## Actor run

An [Actor run](/actors/running/runs-and-builds) is a single execution of an Actor, with its own container, allocated resources, and storage. Each run is assigned a [dataset](/storage/dataset), a [key-value store](/storage/key-value-store), and a [request queue](/storage/request-queue), and moves through a lifecycle from ready to succeeded, failed, timed out, or aborted.

## Actor Standby

[Actor Standby](/actors/running/standby) is a mode that keeps an Actor ready in the background as an HTTP server. It answers requests in real time instead of paying a cold start on every call, which suits Actors used as live endpoints rather than batch jobs.

## Actor task

An [Actor task](/actors/running/tasks) is a saved, reusable input configuration for a specific Actor. It lets you rerun the same Actor with preset inputs from a [schedule](/actors/running/schedules), the [Apify API](/api/v2), or [Apify Console](/account/console), without reconfiguring it each time.

## Agentic payments

Agentic payments are a way for AI agents to pay for and run Actors without an Apify account or ongoing billing. With [x402](/integrations/x402) (USDC on Base) or the [Machine Payments Protocol (MPP)](/integrations/mpp) (stablecoins on Tempo or Solana), the agent pays once for a prepaid API token through [Apify AGI](#apify-agi), Apify's entry point for agents, and runs Actors until its balance runs out. With [Skyfire](/integrations/skyfire), the agent pays for each run with a pre-funded Skyfire token.

## API token

An [API token](/integrations/api) is a secret key tied to your Apify account that authenticates API requests and integrations. It identifies you to the [Apify API](/api/v2), the [Apify CLI](/cli), and the client libraries, and carries your account's permissions.

## Apify AGI

[Apify AGI](https://agi.apify.com) (Agent General Interface) is the entry point for autonomous agents to use and pay for the Apify platform and Actors. Agents reach it through [agentic payments](#agentic-payments), so they can run Actors without account setup or ongoing billing.

## Apify AI

[Apify AI](/account/apify-ai) is a conversational interface inside Apify Console for finding and running Actors in natural language, instead of keyword search. It runs on the same search and execution backend as [Apify Store](https://apify.com/store) search and the [Apify MCP server](/integrations/mcp).

## Apify API

The [Apify API](/api/v2) is the REST API for running Actors, managing storage, and controlling the Apify platform programmatically. It's the basis for the [client libraries](/integrations/api), the [CLI](/cli), and most [integrations](/integrations), and authenticates with an [API token](#api-token).

## Apify CLI

The [Apify CLI](/cli) is the command-line tool for creating, running, and deploying Actors from your local machine. Use it to scaffold an Actor from a template, run it locally against local storage, and [deploy](/actors/development/deployment) it to the Apify platform.

## Apify Console

[Apify Console](/account/console) is the web application where you manage all your Apify projects and resources: you run and manage Actors, inspect storage, and handle billing. It renders each Actor's input form from its [input schema](/actors/development/actor-definition/input-schema), and presents run results according to the [output schema](/actors/development/actor-definition/output-schema).

## Apify MCP Proxy

The [Apify MCP Proxy](/integrations/mcp-connectors) is the component of the Apify platform that an Actor reaches its [MCP connectors](#mcp-connectors) through. It validates each request, injects your stored credentials server-side, and forwards it to the upstream MCP server, so the credentials never enter the Actor.

## Apify MCP server

The [Apify MCP server](/integrations/mcp) is the server that exposes Actors as tools over the Model Context Protocol, so AI assistants and agents can discover and run them. Clients such as Claude, ChatGPT, and Cursor connect to it and call Actors as part of a conversation, without custom integration code.

## Apify Proxy

[Apify Proxy](/proxy) is the proxy service that routes requests through datacenter and residential IP addresses to reduce blocking. It rotates addresses automatically and lets you target specific countries, so Actors can reach sites that restrict traffic by address or geography.

## Apify SDK

The [Apify SDK](/sdk) is the JavaScript and Python toolkit for building Actors and working with the Apify platform programmatically. It wraps [storage](/storage), [proxy](/proxy), and run lifecycle handling, so an Actor reads input and writes results without calling the API directly.

## Apify Store

[Apify Store](https://apify.com/store) is the marketplace of tools for AI, with thousands of Actors for data extraction, lead generation, social media monitoring, and competitor tracking. Anyone can [build and publish](/actors/publishing) Actors there and earn from others using them, with placement influenced by each Actor's [quality score](/actors/publishing/quality-score).

## Apify storage

[Apify storage](/storage) is the Apify platform's built-in storage, made up of [datasets](/storage/dataset), [key-value stores](/storage/key-value-store), and [request queues](/storage/request-queue). Every Actor run gets one of each by default, and you can also create named stores that persist across runs.

## Build

A [build](/actors/development/builds-and-runs/builds) is a versioned Docker image compiled from an Actor's source code. Builds are numbered and tagged, so a run can pin a specific version and stay unaffected by later changes to the Actor.

## Compute unit

A [compute unit](/actors/running/usage-and-resources) (CU) is the Apify platform's usage and billing unit, equal to 1 GB of memory running for one hour. It's how Actor runs are metered, so allocating more memory to a run consumes CUs faster.

## Crawlee

[Crawlee](https://crawlee.dev) is Apify's open-source library for building web scrapers and browser automation in Node.js and Python. It handles crawling concerns such as queueing, retries, session management, and browser fingerprinting. Crawlee runs anywhere, and the Apify platform is where you deploy it at scale.

## Datacenter proxy

A [datacenter proxy](/proxy/datacenter-proxy) is the fastest and cheapest proxy type, routing through datacenter IP addresses at a higher risk of blocking. Addresses come from shared pools, which suits high-volume work against targets without strong anti-bot protection.

## Dataset

A [dataset](/storage/dataset) is append-only, table-like storage for an Actor's structured results. You export it as JSON, CSV, or Excel, read it through the [Apify API](/api/v2), and can describe its shape with a [dataset schema](/storage/dataset-schema).

## Google SERP proxy

A [Google SERP proxy](/proxy/google-serp-proxy) is a proxy specialized for collecting localized Google search engine results pages at scale. It targets specific country domains and languages, so you get results as they appear in a given market.

## Input schema

An [input schema](/actors/development/actor-definition/input-schema) is the JSON definition of an Actor's inputs. It generates the Actor's input form in [Apify Console](/account/console), validates what users submit, and tells AI agents what parameters the Actor accepts.

## Key-value store

A [key-value store](/storage/key-value-store) is storage for unstructured or auxiliary data, such as Actor input, files, screenshots, and images. Each run's store holds its `INPUT` record and any files the Actor writes, and its layout can be described with a [key-value store schema](/storage/key-value-store-schema).

## MCP connectors

[MCP connectors](/integrations/mcp-connectors) are a feature that lets an Actor call third-party services, such as Notion, Slack, and GitHub, over the Model Context Protocol using credentials you authorize once in your account settings. They work in the opposite direction to the [Apify MCP server](/integrations/mcp), which exposes Actors to outside AI clients.

## Output

[Output](/actors/running/input-and-output) is the data an Actor run produces. Structured results go to the run's [dataset](/storage/dataset) and anything else to its [key-value store](/storage/key-value-store), and you read both from [Apify Console](/account/console) or the [Apify API](/api/v2).

## Output schema

An [output schema](/actors/development/actor-definition/output-schema) is the definition of where an Actor stores its results and how Apify Console and the run API endpoint present them. [Publishing an Actor](/actors/publishing/publish) requires one, and it tells AI agents what results to expect before they run it.

## Pay-per-event

[Pay-per-event](/actors/publishing/monetize/pay-per-event) (PPE) is a pricing model that charges users for specific events an Actor emits, such as each result or action, rather than for compute time. The Actor triggers those events from its own code. Its [pay-per-event plus usage](/actors/publishing/monetize/pay-per-event#platform-usage-costs) option also charges users the Actor's platform usage costs, which lowers its [quality score](/actors/publishing/quality-score).

## Pay-per-usage

[Pay-per-usage](/actors/publishing/monetize/pricing-and-costs) is a pricing model where users pay only the usage costs an Actor generates on the Apify platform, with no additional charge. It's one of the two [monetization models](/actors/publishing/monetize) currently offered on Apify Store.

## Proxy

A [proxy](/proxy) is a server that forwards your requests, so target websites see its IP address instead of yours. On the Apify platform, you get proxies through [Apify Proxy](#apify-proxy) as [datacenter](#datacenter-proxy), [residential](#residential-proxy), or [Google SERP](#google-serp-proxy) proxies.

## Quality score

The [quality score](/actors/publishing/quality-score) is a 0 to 100 rating of how well an Actor in Apify Store meets Apify's quality criteria. It reflects reliability, ease of use, and popularity, and influences where the Actor places in [Actors in Apify Store](/actors/running/actors-in-store).

## Request queue

A [request queue](/storage/request-queue) is storage for the URLs to crawl that tracks their state. It deduplicates URLs and records which are pending or handled, so a crawl can resume after an interruption and be shared across runs.

## Residential proxy

A [residential proxy](/proxy/residential-proxy) is a proxy that routes requests through IP addresses of real home devices, making them the hardest to detect and block. It draws on a wider address pool than [datacenter proxies](/proxy/datacenter-proxy), at a higher price, for targets with strong anti-scraping measures.

## Schedule

A [schedule](/actors/running/schedules) is a cron-based trigger that runs an Actor or task automatically at set intervals. You define it with a cron expression and manage it from [Apify Console](/account/console) or the [Apify API](/api/v2).

## Webhook

A [webhook](/integrations/webhooks) is an HTTP callback the Apify platform sends when an Actor run changes state. Use it to trigger an external system, or another Actor, when a run succeeds or fails, instead of polling for the result.
