---
title: Migrate an Actor to multi-tenant
sidebar_label: Migrate to multi-tenant
description: Move a standard Actor or a single-tenant Server Actor to multi-tenant by running an HTTP server, charging each request, and testing before you switch.
slug: /actors/development/programming-interface/standby/migrate-to-multi-tenant
sidebar_position: 1
---

Most Actors need two changes to become multi-tenant: pay-per-event pricing, and charging per request instead of per run. This applies whether your Actor already has the server interface or not.

Before you start, [check whether your Actor fits](./index.md#check-whether-your-actor-fits) multi-tenant. For how Server Actors work, see [Develop Server Actors](./index.md).

## Migrate a standard Actor

1. Run an HTTP server on the port from `ACTOR_WEB_SERVER_PORT`, and set `usesStandbyMode` to `true`. See [Run an HTTP server](./index.md#run-an-http-server).
1. Branch on how the run started. See [Determine which interface started the Actor](./index.md#determine-which-interface-started-the-actor).
1. Describe your endpoints. See [Describe your endpoints](./index.md#describe-your-endpoints).
1. Charge each request. See [Charge for a request](/actors/monetize/server-actors#charge-for-a-request).
1. Switch the tenancy to multi-tenant. See [Switch the tenancy](./index.md#switch-the-tenancy).

Your input schema keeps working, so users can still run the Actor through its input interface.

## Migrate a single-tenant Server Actor

Your Actor already runs an HTTP server, so the migration is mostly about how you charge. In single-tenant, one run belongs to one caller, so the run knows whom to charge. In multi-tenant, one run serves many callers, so each charge has to name the request it's for. See [Charge for a request](/actors/monetize/server-actors#charge-for-a-request).

Before you switch an Actor that already has callers:

- Send the request ID with every charge. Single-tenant runs ignore it, so the same code works before and after the switch.
- Check that your plan has enough memory and concurrent runs to serve all your callers.
- Review the max requests per run, desired requests per run, and idle timeout settings. In single-tenant, each caller brought their own run, so these settings barely mattered. In multi-tenant, they decide how much traffic your runs handle and what it costs you.
- Tell users who created tasks of your Actor that those tasks stop serving requests to the server interface. Tasks that run the Actor through its input interface keep working.

## Test the change

The tenancy applies to the whole Actor as soon as you confirm it. To test before your callers see the change:

- Build your changes under a [build tag](../../builds_and_runs/builds.md) other than the one in the **Build** setting. Callers don't get the changes until you point the setting at the new tag. This prepares the code, but it doesn't test the multi-tenant path, because the tenancy applies to every build.
- Create a second, private Actor from the same source, enable the server interface and multi-tenant there, and send test requests to its URL. Once it behaves as expected, build the same changes into the original Actor and switch its tenancy. Don't publish the copy.
