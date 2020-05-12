---
title: Actors
description: Documentation of Apify actors - a serverless computing jobs that enable execution of long-running web scraping and automation tasks in the cloud.
menuWeight: 3
paths: 
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actor
    - actors
---

# Apify Actors

Actors run on the Apify serverless computing platform and enable the execution of arbitrary pieces of code. Unlike traditional serverless platforms, the run of an actor is not limited to the lifetime of a single HTTP transaction. It can run for as long as necessary, even forever. The actor can perform anything from a simple action such as filling out a web form or sending an email, to complex operations such as crawling an entire website and removing duplicates from a large dataset.

A single isolated actor consists of source code and various settings. You can think of an actor as a cloud app or service.

*   [**Quick Start**]({{@link actors/quick_start.md}})
*   [**Run**]({{@link actors/run.md}})
*   [**Examples**]({{@link actors/examples.md}})
*   [**Build**]({{@link actors/development/build.md}})
*   [**Source code**]({{@link actors/development/source_code.md}})
*   [**Limits**]({{@link actors/limits.md}})
*   [**Publishing**]({{@link actors/publishing.md}})

