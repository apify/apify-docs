---
title: Storage
description: Store anything from images and key-value pairs to structured output data. Learn how to access and manage your stored data from the Apify platform or via API.
sidebar_position: 9
category: platform
slug: /storage
---

import Card from "@site/src/components/Card";
import CardGrid from "@site/src/components/CardGrid";

# Storage {#storage}

**Store anything from images and key-value pairs to structured output data. Learn how to access and manage your stored data on the Apify Console or via the API.**

---

The Apify platform provides three types of storage accessible both within our [Apify Console](https://console.apify.com/storage) and externally through our API ([REST API](/api/v2#/), [JavaScript Client](/sdk/js) or [Python Client](/sdk/python) ) or SDKs ([JavaScript SDK](/api/client/js) or [Python SDK](/api/client/python)).

<CardGrid>
    <Card
        title="Dataset"
        desc="Stores results from web scraping and data processing, with each Actor run getting a unique dataset. Features include table-like data visualization and multiple export formats like JSON and Excel."
        to="/platform/storage/dataset"
    />
    <Card
        title="Key-value store"
        desc="Stores various data types like JSON, HTML, images, and strings. Accessible via Apify Console or API, it's ideal for diverse data storage needs.​"
        to="/platform/storage/key-value-store"
    />
    <Card
        title="Request queue"
        desc="Manages URL processing for web crawling and other tasks. Supports different crawling orders and allows for querying and updating URLs, accessible via Apify Console or API​."
        to="/platform/storage/request-queue"
    />
</CardGrid>

