---
title: Development
desc: Read about the technical part of building Apify actors. Learn to define actor inputs, build new versions, persist actor state, and choose base Docker images.
sidebar_position: 7.4
slug: /actors/development
---

**Read about the technical part of building Apify actors. Learn to define actor inputs, build new versions, persist actor state, and choose base Docker images.**

---

This section will guide you through the whole story of [Actor](../index.mdx) development.

You can follow chapters sequentially from [Quick start](./quick_start/index.mdx), where you learn how to create your first Actor in justa  few minutes, through the more technical sections describing the whole Actor model, up to the [Performance](./performance.md) section, where you learn how to fine-tune your Actor to get the best out of the Apify.

import Card from "@site/src/components/Card";
import CardGrid from "@site/src/components/CardGrid";

<CardGrid>
    <Card
        title="Quick start"
        to="/platform/actors/development/quick-start"
        desc="Create your first actor using Apify Console IDE or locally."
    />
    <Card
        title="Actor definition"
        to="/platform/actors/development/actor-definition"
        desc="Learn how to turn your arbitrary code into an actor simply by adding an Actor definition directory."
    />
    <Card
        title="Deployment"
        to="/platform/actors/development/deployment"
        desc="Learn how to deploy you Actor to Apify platform and build them."
    />
    <Card
        title="Builds and runs"
        to="/platform/actors/development/builds-and-runs"
        desc="Learn about Actor builds and runs, their lifecycle, versioning, and other properties."
    />
    <Card
        title="Performance"
        to="/platform/actors/development/Performance"
        desc="Learn how to get the maximum value out of your Actors, minimize costs, and maximize results."
    />
</CardGrid>

---

After you development, you can jump on the section [Publishing and monetization](../publishing/index.mdx) to learn about how to publish your Actor in [Apify Store](https://apify.com/store) and monetize it by renting it out to users of the platform.
