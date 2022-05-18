---
title: Deploying your code
description: In this course learn how to take an existing project of yours and deploy it to the Apify platform as an actor in just a few minutes!
menuWeight: 5.2
paths:
- apify-platform/deploying-your-code
---

# [](#deploying) Deploying your code to Apify

This section will discuss how to use your newfound knowledge of the Apify platform and actors from the [**Getting started**]({{@link apify_platform/getting_started.md}}) section to deploy your existing project's code to the Apify platform as an actor.

Because actors are basically just chunks of code running in Docker containers, you're able to **_Actorify_** just about anything!

![The deployment workflow]({{@asset apify_platform/images/deployment-workflow.webp}})

Actors are language agnostic, which means that the language your project is written in does not affect your ability to actorify it.

![Supported languages]({{@asset apify_platform/images/supported-languages.webp}})

Though the majority of actors currently on the platform were written in Node.js, and despite the fact our current preferred languages are JavaScript and Python, there are a few examples of actors in other languages:

- [Actor written in Rust](https://apify.com/lukaskrivka/rust-actor-example)
- [GO actor](https://apify.com/jirimoravcik/go-actor-example)
- [Actor written with Julia](https://apify.com/jirimoravcik/julia-actor-example)

## [](#workflow) The "actorification" workflow

There are four main steps to turning a piece of code into an actor:

1. Handle [accepting inputs and writing outputs]({{@link apify_platform/deploying_your_code/inputs_outputs.md}}).
2. Create an [input schema]({{@link apify_platform/deploying_your_code/input_schema.md}}) **(optional)**.
3. Add a [Dockerfile]({{@link apify_platform/deploying_your_code/docker_file.md}}).
4. [Deploy]({{@link apify_platform/deploying_your_code/deploying.md}}) to the Apify platform!

## Our example project

For this section, we'll be turning this example project into an actor:

```marked-tabs
<marked-tab header="JavaScript" lang="javascript">
// index.js
const addAllNumbers = (...nums) => nums.reduce((total, curr) => (total += curr));

console.log(addAllNumbers(1, 2, 3, 4)) // -> 10
</marked-tab>
<marked-tab header="Python" lang="python">
# index.py
def add_all_numbers (nums):
    total = 0

    for num in nums:
        total += num

    return total

print(add_all_numbers([1, 2, 3, 4])) # -> 10
</marked-tab>
```

> For all lessons in this section, we'll have examples for both Node.js and Python so that you can follow along in either language.

<!-- We've pushed this code to GitHub and are ready to turn it into an actor that takes any number of integers as input, adds them all up, then stores the solution as its output. -->

## [](#next) Next up

[Next lesson]({{@link apify_platform/deploying_your_code/inputs_outputs.md}}), we'll be learning how to accept input into our actor as well as deliver output.
