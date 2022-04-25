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

For this section, we'll be turning our example Node.js project into an actor. The example project looks like this:

```JavaScript
// index.js
const addAllNumbers = (...nums) => nums.reduce((total, curr) => (total += curr));

console.log(addAllNumbers(1, 2, 3, 4)) // -> 10
```

```JSON
// package.json
{
  "name": "number-adder",
  "version": "1.0.0",
  "description": "Add numbers",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "me",
  "license": "MIT"
}
```

We've pushed this code to Github and are ready to turn it into an actor.

## [](#next) Next up

[Next lesson]({{@link apify_platform/deploying/docker_file.md}}) will be all about Dockerfiles for actors and how to write them.
