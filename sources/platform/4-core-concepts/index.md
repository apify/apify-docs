---
title: Core concepts
description: "Essential platform features including storage for data management and proxies for anonymous web access across different geographies."
sidebar_position: 1
slug: /core-concepts
---

import Card from "@site/src/components/Card";
import CardGrid from "@site/src/components/CardGrid";

**Essential platform features including storage for data management and proxies for anonymous web access across different geographies.**

---

The Apify platform provides core infrastructure services that enable effective web scraping, automation, and data processing workflows.

## Storage

The platform provides three types of storage accessible both within the [Apify Console](https://console.apify.com/storage) and externally through the [REST API](/api/v2), [API clients](/api), or [SDKs](/sdk).

<CardGrid>
    <Card
        title="Dataset"
        desc="Stores results from web scraping and data processing, with each Actor run getting a unique dataset. Features include table-like data visualization and multiple export formats like JSON and Excel."
        to="/platform/core-concepts/storage/dataset"
    />
    <Card
        title="Key-value store"
        desc="Stores various data types like JSON, HTML, images, and strings. Accessible via Apify Console or API, it's ideal for diverse data storage needs.​"
        to="/platform/core-concepts/storage/key-value-store"
    />
    <Card
        title="Request queue"
        desc="Manages URL processing for web crawling and other tasks. Supports different crawling orders and allows for querying and updating URLs, accessible via Apify Console or API​."
        to="/platform/core-concepts/storage/request-queue"
    />
</CardGrid>

## Proxies

[Apify Proxy](https://apify.com/proxy) allows you to change your IP address when web scraping to reduce the chance of being [blocked](/academy/anti-scraping/techniques) because of your geographical location. The proxy service monitors the health of your IP pool and intelligently rotates addresses to prevent IP address-based blocking.

You can use proxies in your [Actors](/platform/using-actors) or any other application that supports HTTP proxies. View your proxy settings and password on the [Proxy](https://console.apify.com/proxy) page in Apify Console. For pricing information, visit [apify.com/pricing](https://apify.com/pricing).

<CardGrid>
    <Card
        title="Datacenter proxy"
        desc="The fastest and cheapest option. It uses datacenters to change your IP address. Note that there is a chance of being blocked because of the activity of other users."
        to="/platform/core-concepts/proxy/datacenter-proxy"
    />
    <Card
        title="Residential proxy"
        desc="IP addresses located in homes and offices around the world. These IPs are the least likely to be blocked."
        to="/platform/core-concepts/proxy/residential-proxy"
    />
    <Card
        title="Google SERP proxy"
        desc="Download and extract data from Google Search Engine Result Pages (SERPs). You can select country and language to get localized results."
        to="/platform/core-concepts/proxy/google-serp-proxy"
    />
</CardGrid>
