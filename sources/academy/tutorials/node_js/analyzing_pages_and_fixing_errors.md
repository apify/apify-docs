---
title: How to analyze and fix errors when scraping a website
description: Learn how to deal with random crashes in your web-scraping and automation jobs. Find out the essentials of debugging and fixing problems in your crawlers.
sidebar_position: 14.1
slug: /node-js/analyzing-pages-and-fixing-errors
---

# How to analyze and fix errors when scraping a website {#scraping-with-sitemaps}

**Learn how to deal with random crashes in your web-scraping and automation jobs. Find out the essentials of debugging and fixing problems in your crawlers.**

---

Debugging is absolutely essential in programming. Even if you don't call yourself a programmer, having basic debugging skills will make building crawlers easier. It will also help you save money by allowing you to avoid hiring an expensive developer to solve your issue for you.

This quick lesson covers the absolute basics by discussing some of the most common problems and the simplest tools for analyzing and fixing them.

## Possible causes {#possible-causes}

It is often tricky to see the full scope of what can go wrong. We assume that once the code is set up correctly, it will keep working. Unfortunately, that is rarely true in the realm of web scraping and automation.

Websites change, they introduce new [anti-scraping technologies](../../webscraping/anti_scraping/index.md), programming tools change and, in addition, people make mistakes.

Here are the most common reasons your working solution may break.

- The website changes its layout or [data feed](https://www.datafeedwatch.com/academy/data-feed).
- A site's layout changes depending on location or uses [A/B testing](https://www.youtube.com/watch?v=XDoKXaGrUxE&feature=youtu.be).
- A page starts to block you (recognizes you as a bot).
- The website [loads its data later dynamically](./dealing_with_dynamic_pages.md), so the code works only sometimes, if you are slow or lucky enough.
- You made a mistake when updating your code.
- Your [proxies](../../webscraping/anti_scraping/mitigation/proxies.md) aren't working.
- You have upgraded your [dependencies](https://www.quora.com/What-is-a-dependency-in-coding) (other software that your software relies upon), and the new versions no longer work (this is harder to debug).

## Diagnosing/analyzing the issue {#issue-analysis}

Web scraping and automation are very specific types of programming. It is not possible to rely on specialized debugging tools, since the code does not output the same results every time. However, there are still many ways to diagnose issues in a crawler.

> Many issues are edge cases, which occur in just one of a thousand pages or are time-dependent. Because of this, you cannot rely only on [determinism](https://en.wikipedia.org/wiki/Deterministic_algorithm).

### Logging {#logging}

Logging is an essential tool for any programmer. When used correctly, it helps you capture a surprising amount of information. Here are some general rules for logging:

- Usually, **many logs** is better than **no logs** at all.
- Putting more information into one line, rather than logging multiple short lines, helps reduce the overall log size.
- Focus on numbers. Log how many items you extract from a page, etc.
- Structure your logs and use the same structure in all your logs.
- Append the current page's URL to each log. This lets you immediately open that page and review it.

Here's an example of what a structured log message might look like:

```text
[CATEGORY]: Products: 20, Unique products: 4, Next page: true --- https://apify.com/store
```

The log begins with the **page type**. Usually, we use labels such as **\[CATEGORY\]** and **\[DETAIL\]**. Then, we log important numbers and other information. Finally, we add the page's URL, so we can check if the log is correct.

#### Logging errors {#logging-errors}

Errors require a different approach because, if your code crashes, your usual logs will not be called. Instead, exception handlers will print the error, but these are usually ugly messages with a [stack trace](https://en.wikipedia.org/wiki/Stack_trace) that only the experts will understand.

You can overcome this by adding [try/catch blocks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) into your code. In the catch block, explain what happened and re-throw the error (so the request is automatically retried).

```js
try {
    // Sensitive code block
    // ...
} catch (error) {
    // You know where the code crashed so you can explain here
    throw new Error('Request failed during login with an error', { cause: error });
}
```

Read more information about logging and error handling in our developer [best practices](../../webscraping/web_scraping_for_beginners/best_practices.md) section.

### Saving snapshots {#saving-snapshots}

By snapshots, we mean **screenshots** if you use a [browser with Puppeteer/Playwright](../../webscraping/puppeteer_playwright/index.md) and HTML saved into a [key-value store](https://crawlee.dev/api/core/class/KeyValueStore) that you can easily display in your own browser. Snapshots are useful throughout your code but especially important in error handling.

Note that an error can happen only in a few pages out of a thousand and look completely random. There is not much you can do other than save and analyze a snapshot.

Snapshots can tell you if:

- A website has changed its layout. This can also mean A/B testing or different content for different locations.
- You have been blocked – you open a [CAPTCHA](https://en.wikipedia.org/wiki/CAPTCHA) or an **Access Denied** page.
- Data load later dynamically – the page is empty.
- The page was redirected – the content is different.

You can learn how to take snapshots in Puppeteer or Playwright in [this short lesson](../../webscraping/puppeteer_playwright/page/page_methods.md)

#### When to save snapshots {#when-to-save-snapshots}

The most common approach is to save on error. We can enhance our previous try/catch block like this:

```js
import { puppeteerUtils } from 'crawlee';

// ...
// storeId is ID of current key value store, where we save snapshots
const storeId = Actor.getEnv().defaultKeyValueStoreId;
try {
    // Sensitive code block
    // ...
} catch (error) {
    // Change the way you save it depending on what tool you use
    const randomNumber = Math.random();
    const key = `ERROR-LOGIN-${randomNumber}`;
    await puppeteerUtils.saveSnapshot(page, { key });
    const screenshotLink = `https://api.apify.com/v2/key-value-stores/${storeId}/records/${key}.jpg`

    // You know where the code crashed so you can explain here
    throw new Error('Request failed during login with an error', { cause: error });
}
// ...
```

To make the error snapshot descriptive, we name it **ERROR-LOGIN**. We add a random number so the next **ERROR-LOGIN**s would not overwrite this one and we can see all the snapshots. If you can use an ID of some sort, it is even better.

**Beware:**

- The snapshot's **name** (key) can only contain letter, number, dot and dash characters. Other characters will cause an error, which makes the random number a safe pick.
- Do not overdo the snapshots. Once you get out of the testing phase, limit them to critical places. Saving snapshots uses resources.

### Error reporting {#error-reporting}

Logging and snapshotting are great tools but once you reach a certain run size, it may be hard to read through them all. For a large project, it is handy to create a more sophisticated reporting system. For example, let's just look at simple **dataset** reporting.

## With the Apify SDK {#with-the-apify-sdk}

This example extends our snapshot solution above by creating a [named dataset](/platform/storage#named-and-unnamed-storages) (named datasets have infinite retention), where we will accumulate error reports. Those reports will explain what happened and will link to a saved snapshot, so we can do a quick visual check.

```js
import { Actor } from 'apify';
import { puppeteerUtils } from 'crawlee';

await Actor.init();
// ...
// Let's create reporting dataset
// If you already have one, this will continue adding to it
const reportingDataset = await Actor.openDataset('REPORTING');

// storeId is ID of current key-value store, where we save snapshots
const storeId = Actor.getEnv().defaultKeyValueStoreId;

// We can also capture actor and run IDs
// to have easy access in the reporting dataset
const { actorId, actorRunId } = Actor.getEnv();
const linkToRun = `https://console.apify.com/actors/actorId#/runs/actorRunId`;

try {
    // Sensitive code block
    // ...
} catch (error) {
    // Change the way you save it depending on what tool you use
    const randomNumber = Math.random();
    const key = `ERROR-LOGIN-${randomNumber}`;
    await puppeteerUtils.saveSnapshot(page, { key });

    const screenshotLink = `https://api.apify.com/v2/key-value-stores/${storeId}/records/${key}.jpg?disableRedirect=true`;

    // We create a report object
    const report = {
        errorType: 'login',
        errorMessage: error.toString(),

        // You will have to adjust the keys if you save them in a non-standard way
        htmlSnapshot: `https://api.apify.com/v2/key-value-stores/${storeId}/records/${key}.html?disableRedirect=true`,
        screenshot: screenshotLink,
        run: linkToRun,
    };

    // And we push the report
    await reportingDataset.pushData(report);

    // You know where the code crashed so you can explain here
    throw new Error('Request failed during login with an error', { cause: error });
}
// ...
await Actor.exit();
```
