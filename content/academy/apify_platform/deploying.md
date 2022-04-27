---
title: Deploying your code
description: In this course learn how to take an existing project of yours and deploy it to the Apify platform as an actor in just a few minutes!
menuWeight: 5.2
paths:
- apify-platform/deploying
---

# [](#deploying) Deploying your code to Apify

This section will discuss how to use your newfound knowledge of the Apify platform and actors from the [**Getting started**]({{@link apify_platform/getting_started.md}}) section to deploy your existing project's code to the Apify platform as an actor.

Because actors are basically just chunks of code running in Docker containers, you're able to **_Actorify_** just about anything!

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

> For all sections

We've pushed this code to Github and are ready to turn it into an actor.

## [](#next) Next up

[Next lesson]({{@link apify_platform/deploying/inputs_outputs.md}}), we'll be learning how to accept input into our actor as well as return output.
