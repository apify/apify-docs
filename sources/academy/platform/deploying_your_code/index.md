---
title: Deploying your code
description: In this course learn how to take an existing project of yours and deploy it to the Apify platform as an Actor.
sidebar_position: 9
category: apify platform
slug: /deploying-your-code
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploying your code to Apify {#deploying}

**In this course learn how to take an existing project of yours and deploy it to the Apify platform as an Actor.**

---

This section will discuss how to use your newfound knowledge of the Apify platform and Actors from the [**Getting started**](../getting_started/index.md) section to deploy your existing project's code to the Apify platform as an Actor.
Any program running in a Docker container can become an Apify Actor.

![The deployment workflow](../../images/deployment-workflow.png)

Apify provides detailed guidance on how to deploy Node.js and Python programs as Actors, but apart from that you're not limited in what programming language you choose for your scraper.

![Supported languages](../../images/supported-languages.jpg)

Here are a few examples of Actors in other languages:

- [Rust Actor](https://apify.com/lukaskrivka/rust-actor-example)
- [Go Actor](https://apify.com/jirimoravcik/go-actor-example)
- [Julia Actor](https://apify.com/jirimoravcik/julia-actor-example)

## The "actorification" workflow {#workflow}

Follow these four main steps to turn a piece of code into an Actor:

1. Handle [accepting inputs and writing outputs](./inputs_outputs.md).
2. Create an [input schema](./input_schema.md) **(optional)**.
3. Add a [Dockerfile](./docker_file.md).
4. [Deploy](./deploying.md) to the Apify platform!

## Our example project

For this section, we'll be turning this example project into an Actor:

<Tabs groupId="main">
<TabItem value="JavaScript" label="JavaScript">

```js
// index.js
const addAllNumbers = (...nums) => nums.reduce((total, curr) => total + curr, 0);

console.log(addAllNumbers(1, 2, 3, 4)); // -> 10
```

</TabItem>
<TabItem value="Python" label="Python">

```py
# index.py
def add_all_numbers (nums):
    total = 0

    for num in nums:
        total += num

    return total

print(add_all_numbers([1, 2, 3, 4])) # -> 10

```

</TabItem>
</Tabs>

> For all lessons in this section, we'll have examples for both Node.js and Python so that you can follow along in either language.

<!-- We've pushed this code to GitHub and are ready to turn it into an Actor that takes any number of integers as input, adds them all up, then stores the solution as its output. -->

## Next up {#next}

[Next lesson](./inputs_outputs.md), we'll be learning how to accept input into our Actor as well as deliver output.
