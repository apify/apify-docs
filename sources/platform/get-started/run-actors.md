---
title: Run Actors
sidebar_label: Run Actors
sidebar_position: 1
slug: /get-started/run-actors
description: Run existing Actors from Apify Store to get data or automate tasks with no code - pick an Actor, configure input, collect results, then automate.
pagination_next: null
pagination_prev: null
---

You don't need to write any code to get data or automation out of Apify. [Apify Store](https://apify.com/store) offers thousands of ready-made Actors, and running one always follows the same loop: pick an Actor, give it input, start the run, and collect the results. This page walks you through that loop and points you to the right tutorial or concept page at each step.

## Pick an Actor from Store

Apify Store is a marketplace of Actors built by Apify and the community, covering most popular websites and automation tasks. Each Actor has its own page that describes what it does, what input it expects, and how it charges. Some Actors charge for the events they perform, such as producing a result (pay per event), while others bill only for the platform resources their runs consume (pay per usage).

- Browse [Apify Store](https://apify.com/store) and pick an Actor that matches your use case.
- Read [Actors in Store](/actors/running/actors-in-store) to understand the pricing models before you start a large run.

## Give it input and run it

Every Actor takes structured input. In Apify Console, the input is a form where you enter your URLs, search terms, or other settings. Under the hood, that form is a JSON object - the same object you send when you later run the Actor through the API. Start with a tutorial, then read the concept pages as questions come up:

- [Run your first Actor](/actors/running) - choose an Actor, fill in the input, start the run, and export the results.
- [Getting started course](/academy/getting-started) - a guided Apify Academy walkthrough, from creating an account to your first run.
- [Input and output](/actors/running/input-and-output) - how run configuration works in detail.

## Collect the results

A run doesn't just print results to a log - it writes them to storage on the platform, where they stay available after the run finishes. Structured results, like scraped records, go to a dataset that you can view in Console or export as JSON, CSV, or Excel. Files and other records go to a key-value store.

- [Storage](/storage) - where results live: [datasets](/storage/dataset) for structured data, the [key-value store](/storage/key-value-store) for files and records.
- [Runs and builds](/actors/running/runs-and-builds) - run states, and how to resurrect a finished run.
- [Usage and resources](/actors/running/usage-and-resources) - what a run consumes and how that translates to cost.

## Automate the loop

Once a manual run produces the data you want, you rarely keep starting it by hand. The platform can store your input, run the Actor on a schedule, and deliver results straight to your other tools.

- [Save your input as a task](/actors/running/tasks) so you can re-run it without re-typing the configuration.
- [Schedule an Actor](/actors/running/schedules) to run automatically.
- [Send results to your tools](/integrations) - Make, Zapier, n8n, Slack, webhooks, and more.
- [Use an Actor as a live API](/actors/running/standby) with Actor Standby.
- [Monitor your runs](/actors/running/monitoring) to catch failures and track performance.
- Run Actors programmatically via the [API](/api/v2) or the [CLI](/cli/docs).

Ready to build your own Actor instead of running someone else's? Switch to [Build Actors](/get-started/build-actors).
