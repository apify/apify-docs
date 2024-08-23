---
title: Automated tests
description: Learn how to automate ongoing testing and make sure your Actors perform over time. See code examples for configuring the Actor Testing Actor.
slug: /actors/development/automated-tests
sidebar_position: 9
---

**Learn how to automate ongoing testing and make sure your Actors perform over time. See code examples for configuring the Actor Testing Actor.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

# Automated tests for Actors

Automated testing is crucial for maintaining the reliaability and performance of your Actors over time. This guide will help you set up automated tests using the [Actor Testing Actor](https://apify.com/pocesar/actor-testing).

## Set up automated tests

1. Prepare test tasks - Create 1–5 separate testing tasks for your Actor.
1. Configure Actor testing - Set up a task using the Actor Testing Actor.
1. Validate tests - Run the test task multiple times until all tests pass.
1. Schedule tests - Set up a recurring schedule for your tests.
1. Monitor results - Review and address any issues on a weekly basis.

## Create test tasks

Example of Actor testing tasks

When creating test tasks:

* Include a test for your Actor's default configuration
* Set a low `maxItem` value to conserve credits
* For large data tests, reduce test frequency to conserve credits

## Configure the Actor Testing Actor

Follow the [setup guide](https://apify.com/pocesar/actor-testing) in the Actor's README.

Here are some recommended test scenarios:

<Tabs groupId="main">
<TabItem value="Run status" label="Run status">

```js
await expectAsync(runResult).toHaveStatus('SUCCEEDED');
```

</TabItem>
<TabItem value="Crash information from the log" label="Crash information from the log">


```js
await expectAsync(runResult).withLog((log) => {
    // Neither ReferenceError or TypeErrors should ever occur
    // in production code – they mean the code is over-optimistic
    // The errors must be dealt with gracefully and displayed with a helpful message to the user
    expect(log)
        .withContext(runResult.format('ReferenceError'))
        .not.toContain('ReferenceError');

    expect(log)
        .withContext(runResult.format('TypeError'))
        .not.toContain('TypeError');
});
```

</TabItem>
<TabItem value="Information from statistics (runtime, retries)" label="Information from statistics (runtime, retries)">

```js
await expectAsync(runResult).withStatistics((stats) => {
    // In most cases, you want it to be as close to zero as possible
    expect(stats.requestsRetries)
        .withContext(runResult.format('Request retries'))
        .toBeLessThan(3);

    // What is the expected run time for the number of items?
    expect(stats.crawlerRuntimeMillis)
        .withContext(runResult.format('Run time'))
        .toBeWithinRange(1 * 60000, 10 * 60000);
});
```

</TabItem>
<TabItem value="Information about and from within the dataset" label="Information about and from within the dataset">

```js
await expectAsync(runResult).withDataset(({ dataset, info }) => {
    // If you're sure, always set this number to be your exact maxItems
    expect(info.cleanItemCount)
        .withContext(runResult.format('Dataset cleanItemCount'))
        .toBe(3); // or toBeGreaterThan(1) or toBeWithinRange(1,3)

    // Make sure the dataset isn't empty
    expect(dataset.items)
        .withContext(runResult.format('Dataset items array'))
        .toBeNonEmptyArray();

    const results = dataset.items;

    // Check dataset items to have the expected data format
    for (const result of results) {
        expect(result.directUrl)
            .withContext(runResult.format('Direct url'))
            .toStartWith('https://www.yelp.com/biz/');

        expect(result.bizId)
            .withContext(runResult.format('Biz ID'))
            .toBeNonEmptyString();
    }
});
```

</TabItem>
<TabItem value="Information about the key-value store" label="Information about the key-value store">

```js
await expectAsync(runResult).withKeyValueStore(({ contentType }) => {
    // Check for the proper content type of the saved key-value item
    expect(contentType)
        .withContext(runResult.format('KVS contentType'))
        .toBe('image/gif');
},

// This also checks for existence of the key-value key
{ keyName: 'apify.com-scroll_losless-comp' },
);
```

</TabItem>
</Tabs>
