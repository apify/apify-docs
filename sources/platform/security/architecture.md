---
title: Platform architecture
sidebar_label: Architecture
sidebar_position: 2
slug: /security/architecture
description: How the Apify platform is built - control and execution planes, what happens during an Actor run, how workloads stay isolated, and how storage works.
---

This page describes how the Apify platform is built: how it is structured, what happens when an Actor runs, how workloads stay isolated, and how data is stored. It is written for developers and technical teams who want a single technical overview of the platform.

Security controls and the division of responsibilities are covered separately in the [shared responsibility model](/security/shared-responsibility) and the [Apify Security Whitepaper](https://apify.com/security-whitepaper.pdf).

## Design principles

A few principles shape most of the decisions described below:

- Isolation by default. Every Actor run executes in its own isolated environment, and one account cannot reach another account's data.
- Single access path. All reads and writes to platform data go through the authenticated, authorized Apify API. There is no side channel to storage.
- One region, multiple zones. The platform trades the complexity of cross-region operation for resilience within a single region.

## Control plane and execution plane

The platform has two logical planes:

- Control plane. Apify Console, the Apify API, and the supporting services. This is where you and your integrations manage Actors, tasks, schedules, storage, and billing.
- Execution plane. Actor runs execute here, together with the storage that holds their inputs and results.

The two planes run as separate systems. The execution plane still depends on the API to authenticate, read inputs, and store results. Every action a run takes against platform data therefore passes through the API's authorization checks rather than reaching storage directly.

As a developer, you interact with the platform through a few surfaces:

- Apify Console for the UI
- The [Apify API](/api/v2) for programmatic access
- [Apify Proxy](/proxy) for outbound requests
- [Storage](/storage) for inputs and results

## Cloud infrastructure

The platform runs on Amazon Web Services (AWS) in a single region, spread across multiple Availability Zones. Compute, storage, and queueing are built on managed AWS services, with Linux and containers as the core stack. The primary application database is a MongoDB Atlas cluster, and operational data (request queues, datasets, and key-value stores) is held in Apify storage systems built on DynamoDB and S3.

For the specific region, see the [shared responsibility model](/security/shared-responsibility).

## Anatomy of an Actor run

A single Actor run moves through the platform in the following steps:

1. Request and authentication. A run starts from Apify Console, the Apify API, a schedule, or an integration. The request reaches the Apify API, which authenticates the caller and confirms the caller is allowed to start the run.
1. Scheduling and placement. An orchestrator queues the run and places it on the compute that runs Actors. The orchestrator is tuned to minimize startup latency even under load.
1. Startup and scoped token. The run executes in its own isolated environment and receives an API token tied to the owning account. For most Actors, this token is limited to the run's own inputs and storages. Full-permission Actors receive broader access and require one-time owner approval.
1. Input. The Actor reads its input and any referenced storages through the API.
1. Execution and outbound traffic. The Actor does its work. When it fetches target websites, that traffic egresses through Apify Proxy, so target sites see proxy IP addresses rather than internal infrastructure.
1. Output. The Actor writes results back to storage (a dataset, key-value store, or request queue) through the API. The platform tracks status throughout, so you can watch the run live or fetch results after it finishes.
1. Teardown. When the run finishes, the platform destroys the environment. No run state persists on the worker node.

For the states a run passes through and how builds relate to runs, see [Runs and builds](/actors/running/runs-and-builds).

## Workload isolation

Platform services and customer workloads run in separate, isolated compute environments, so a customer workload cannot run alongside or interfere with the services that operate the platform. Each run is isolated at several levels:

- Process and filesystem isolation. Every run executes in its own environment with its own filesystem, memory, and CPU. Runs cannot see each other's processes or data.
- Resource limits. Memory and CPU are capped per run, so one workload cannot starve another. See [Usage and resources](/actors/running/usage-and-resources).
- Scoped credentials by default. Each run receives an API token tied to the owning account. Most Actors run with limited permissions, so the token only lets them read their inputs and read or write their own storages. Some Actors need full account access to do their job. These carry a permissions badge, and running one for the first time requires the account owner's explicit, one-time approval. See [Actor permissions](/actors/running/permissions).
- Ephemeral compute. The platform destroys the environment after each run, so no customer state persists on the worker nodes.

One account cannot reach another account's data. Cross-tenant data exposure and Actor sandbox escape are treated as priority vulnerability classes in the [vulnerability disclosure policy](/security/vulnerability-disclosure).

## Apify Proxy

Outbound requests from an Actor to target sites can route through [Apify Proxy](/proxy), a managed pool of datacenter and residential IP addresses. The proxy sits between the Actor and the public internet, so target sites see proxy IP addresses rather than platform infrastructure. No customer data is stored on the proxy servers, and traffic is encrypted by default.

## Storage

Actor runs read and write three storage primitives, all held in managed, encrypted storage and reachable only through the API:

- [Dataset](/storage/dataset). An append-style store for results, typically tabular or JSON records.
- [Key-value store](/storage/key-value-store). Arbitrary files and records, including an Actor's input and output.
- [Request queue](/storage/request-queue). The URLs an Actor still needs to process. The queue persists the state of each request (pending or handled), so a run can retry or resume without losing its place.

Data retention depends on the storage: named storages persist until you delete them, and unnamed storages are removed automatically after a retention period. For the current retention rules, see [Data retention](/storage#data-retention).

## Data durability and backups

The platform protects your data with redundancy, backups, and safeguards against accidental deletion:

- Redundancy. The data your Actors collect (datasets, key-value stores, request queues) lives in Amazon S3 and DynamoDB, replicated across multiple Availability Zones - S3 is designed for 99.999999999% (11 nines) durability. The primary database runs as a replicated cluster across zones too, so the loss of a node or zone loses no data.
- Backups. The primary database is backed up automatically by the managed database service it runs on. These backups let the platform recover from a serious failure; they are not an archive of individual accounts.
- Deletion safeguards. Data stores carry deletion protection at the infrastructure level, and customer data is erased in two monitored phases: first marked as deleted, then removed permanently. Nothing is destroyed by accident, and deletion completes on time, for example when you delete your account.

## Availability and resilience

The loss of a single Availability Zone - a physically separate data center within the region - does not take the platform down. Availability rests on several mechanisms:

- Autoscaling. Capacity for both platform services and customer workloads scales up and down with demand, so traffic spikes do not exhaust resources.
- Rate limiting and throttling. The API enforces per-account rate limits, which contain runaway usage and keep one account's traffic from degrading service for others.
- Load balancing and redundancy. Platform services run as multiple redundant instances behind load balancers, so a failed instance is routed around automatically.
- Health checks and self-healing. Unhealthy instances are detected and replaced automatically.

Apify publishes incidents on the [status page](https://status.apify.com) and notifies subscribed users automatically.

## Integrations and the API

Everything programmatic goes through the [Apify API](/api/v2), which authenticates and authorizes each request. Integrations build on that same API. Webhooks push run events to external systems, the API clients for JavaScript and Python let applications drive the platform, and third-party connectors reuse the API's authentication. AI agents can discover and run Actors and read results through the [Apify MCP server](/integrations/mcp).

For the full list, see [Integrations](/integrations).
