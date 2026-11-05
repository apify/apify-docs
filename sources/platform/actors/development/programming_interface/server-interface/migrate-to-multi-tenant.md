---
title: Migrate an Actor to multi-tenant
sidebar_label: Migrate to multi-tenant
description: Move an Actor to multi-tenant by doing its work in an HTTP request handler, charging each request, and testing the change before you switch the tenancy.
slug: /actors/development/programming-interface/server-actors/migrate-to-multi-tenant
sidebar_position: 1
---

Migrating to multi-tenant moves your Actor's main work, such as scraping a page, out of the run and into the handler for each HTTP request. A run no longer does one job and stops. It stays up and does the work once for each request it receives.

To earn from a multi-tenant Actor, use pay-per-event pricing and charge each request instead of each run. With pay per usage, users pay nothing, and you pay for the Actor's platform usage. This applies whether your Actor already has the server interface or not.

Before you start, [check whether your Actor fits](./index.md#check-whether-your-actor-fits) multi-tenant. For how Server Actors work, see [Develop Server Actors](./index.md).

## Migrate an Actor without the server interface

1. Run an HTTP server on the port from `ACTOR_WEB_SERVER_PORT`, and set `usesStandbyMode` to `true`. See [Run an HTTP server](./index.md#run-an-http-server).
1. Move the Actor's main work into the request handler, so each request does its work and returns the result in the response.
1. Handle runs started through either interface. See [Determine which interface started the Actor](./index.md#determine-which-interface-started-the-actor).
1. Describe your endpoints. See [Describe your endpoints](./index.md#describe-your-endpoints).
1. If the Actor uses pay-per-event pricing, charge each request. See [Charge for a request](/actors/monetize/server-actors#charge-for-a-request).
1. Switch the tenancy to multi-tenant. See [Switch the tenancy](./index.md#switch-the-tenancy).

Your input schema keeps working, so users can still run the Actor through its input interface.

## Migrate a single-tenant Server Actor

Your Actor already runs an HTTP server, so the migration is mostly about how you charge. In single-tenant, one run belongs to one user, so the run knows whom to charge. In multi-tenant, one run serves many users, so each charge has to name the request it's for. See [Charge for a request](/actors/monetize/server-actors#charge-for-a-request).

Before you switch an Actor that already has users:

- Send the request ID with every charge. Single-tenant runs ignore it, so the same code works before and after the switch.
- Check that your plan has enough memory and concurrent runs to serve all your users.
- Review the max requests per run, desired requests per run, and idle timeout settings. In single-tenant, each user brought their own run, so these settings barely mattered. In multi-tenant, they decide how much traffic your runs handle and what it costs you.
- Tell users who created tasks of your Actor that those tasks stop serving requests to the server interface. Tasks that run the Actor through its input interface keep working.

## Test the change

The tenancy applies to the whole Actor within 2 minutes of when you confirm it. To test before your users see the change:

- Build your changes under a [build tag](../../builds_and_runs/builds.md) other than the one in the **Build** setting. Users don't get the changes until you point the setting at the new tag. This prepares the code, but it doesn't test the multi-tenant path, because the tenancy applies to every build.
- Create a second, private Actor from the same source, enable the server interface and multi-tenant there, and send test requests to its URL. Once it behaves as expected, build the same changes into the original Actor and switch its tenancy. Don't publish the copy. Requests from your own account aren't charged, so this test doesn't cover charging.
