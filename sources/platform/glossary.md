---
title: Glossary
description: Definitions of Apify-specific terms, from Actors and datasets to proxy types and pricing models, each linking to the page that covers it in full.
slug: /glossary
toc_max_heading_level: 2
---

Short definitions of the terms used across Apify docs. Each entry links to the page that covers the concept in full.

This page covers only what is specific to Apify, not the general vocabulary of web scraping and software development.

## Actor

An [Actor](/actors) is the core unit of the Apify platform: a serverless cloud program that performs a job on the web, such as automation, an AI task, or data extraction.

## Actor run

An [Actor run](/actors/running/runs-and-builds) is a single execution of an Actor, with its own container, allocated resources, and storage.

## Actor Standby

[Actor Standby](/actors/running/standby) is a mode that keeps an Actor ready in the background as an HTTP server, so it answers requests without a cold start on every call.

## Actor task

An [Actor task](/actors/running/tasks) is a saved, reusable input configuration for a specific Actor.

## API token

An [API token](/integrations/api) is a secret key tied to your Apify account that authenticates API requests and integrations.

## Apify AGI

[Apify AGI](https://agi.apify.com) (Agent General Interface) is the entry point for autonomous agents to use and pay for the platform and Actors through agentic payment protocols, without account setup or ongoing billing.

## Apify AI

[Apify AI](/account/apify-ai) is a conversational interface inside Apify Console for finding and running Actors in natural language, instead of keyword search.

## Apify API

The [Apify API](/api/v2) is the REST API for running Actors, managing storage, and controlling the platform programmatically.

## Apify CLI

The [Apify CLI](/cli) is the command-line tool for creating, running, and deploying Actors from your local machine.

## Apify Console

[Apify Console](/account/console) is the web application where you run and manage Actors, inspect storage, and handle billing.

## Apify MCP server

The [Apify MCP server](/integrations/mcp) exposes Actors as tools over the Model Context Protocol, so AI assistants and agents can discover and run them.

## Apify Proxy

[Apify Proxy](/proxy) routes requests through datacenter and residential IP addresses to reduce blocking.

## Apify SDK

The [Apify SDK](/sdk) is the JavaScript and Python toolkit for building Actors and working with the platform programmatically.

## Apify Store

[Apify Store](https://apify.com/store) is the marketplace of Actors for AI, automation, and data extraction. Anyone can publish an Actor there and earn when others use it.

## Apify storage

[Apify storage](/storage) is the platform's built-in storage, made up of datasets, key-value stores, and request queues.

## Build

A [build](/actors/development/builds-and-runs/builds) is a versioned Docker image compiled from an Actor's source code. A run executes a build.

## Compute unit

A [compute unit](/actors/running/usage-and-resources) (CU) is the platform's usage and billing unit, equal to 1 GB of memory running for one hour.

## Crawlee

[Crawlee](https://crawlee.dev) is Apify's open-source library for building web scrapers and browser automation in Node.js and Python.

## Datacenter proxy

A [datacenter proxy](/proxy/datacenter-proxy) is the fastest and cheapest proxy type, routing through datacenter IP addresses at a higher risk of blocking.

## Dataset

A [dataset](/storage/dataset) is append-only, table-like storage for an Actor's structured results, exportable to JSON, CSV, Excel, and other formats.

## Google SERP proxy

A [Google SERP proxy](/proxy/google-serp-proxy) is a proxy specialized for collecting localized Google search engine results pages at scale.

## Input schema

An [input schema](/actors/development/actor-definition/input-schema) is the JSON definition of an Actor's inputs. It generates the Actor's input form in Apify Console.

## Key-value store

A [key-value store](/storage/key-value-store) holds unstructured or auxiliary data, such as Actor input, files, screenshots, and images.

## MCP connectors

[MCP connectors](/integrations/mcp-connectors) let an Actor call third-party services, such as Notion, Slack, and GitHub, over the Model Context Protocol using credentials you authorize once in your account settings. They work in the opposite direction to the Apify MCP server, which exposes Actors to outside AI clients.

## MCP Proxy

The [Apify MCP Proxy](/integrations/mcp-connectors) is the platform component an Actor reaches its MCP connectors through. It validates each request, injects your stored credentials server-side, and forwards it to the upstream MCP server, so the credentials never enter the Actor.

## Output

[Output](/actors/running/input-and-output) is the data an Actor run produces. It's stored in the run's dataset and key-value store, and readable from Apify Console or the API.

## Output schema

An [output schema](/actors/development/actor-definition/output-schema) declares where an Actor stores its results and how Apify Console and the run API endpoint present them. Publishing an Actor to Apify Store requires one.

## Pay-per-event

[Pay-per-event](/actors/publishing/monetize/pay-per-event) (PPE) is a pricing model that charges users for specific events an Actor emits, such as each result or action, rather than for compute time.

## Pay-per-usage

[Pay-per-usage](/actors/publishing/monetize/pricing-and-costs) is a pricing model that charges users for the platform resources an Actor consumes, such as compute, storage, and proxy.

## Quality score

The [quality score](/actors/publishing/quality-score) rates how well a Store Actor meets Apify's quality criteria on a scale of 0 to 100, and influences its visibility in Apify Store.

## Rental

[Rental](/actors/publishing/monetize/rental) is a pricing model that charges users a flat monthly fee to use a paid Actor, after a free trial.

## Request queue

A [request queue](/storage/request-queue) holds the URLs to crawl, tracks their state, and enables resumable, deduplicated crawls.

## Residential proxy

A [residential proxy](/proxy/residential-proxy) routes requests through IP addresses of real home devices, making them the hardest to detect and block.

## Schedule

A [schedule](/actors/running/schedules) is a cron-based trigger that runs an Actor or task automatically at set intervals.

## Webhook

A [webhook](/integrations/webhooks) is an HTTP callback the platform sends when an Actor run changes state, used to connect Apify to external systems.

## x402

[x402](/integrations/x402) is an agentic payment protocol the platform supports, so agents can pay per Actor call without an account or ongoing billing.
