---
title: How to analyze pages and fix errors
description: Learn to deal with random crashes in your web scraping and automation jobs. Find our the essentials of debugging and fixing problems in your actors.
menuWeight: 3.8
paths:
    - tutorials/analyze-pages-and-fix-errors
---

# How to analyze pages and fix errors

Debugging is essential in programming. Even if you would not call yourself a programmer, having basic debugging skills will make building and maintaining [scrapers]({{@link tutorials/apify_scrapers.md}}) and [integration actors]({{@link tutorials/integrations/run_actor_and_retrieve_data_via_api.md}}) on Apify easier. It will help you avoid hiring an expensive developer and solve your issues faster.

This article covers the absolute basics. It discusses the most common problems and the simplest tools for analyzing the issue.

## [](#possible-problems) Possible problems

It is often tricky to see the full scope of what can go wrong. We assume once the code is set up correctly, it will keep working. Unfortunately, that is rarely true in the realm of web scraping and automation.

Websites change, they introduce new [anti-scraping technologies]({{@link web_scraping_101/anti_scraping_techniques.md}}), programming tools change and, in addition, people make mistakes.

Here are the most common reasons your working solution may break.

- The website changes its layout or [data feed](https://www.datafeedwatch.com/academy/data-feed).

- A site's layout changes depending on location or uses [A/B testing](https://www.youtube.com/watch?v=XDoKXaGrUxE&feature=youtu.be).

- A page starts to block you (recognizes you as a bot).

- The website [loads its data later dynamically]({{@link tutorials/scraping_dynamic_content.md}}), so the code works only sometimes, if you are slow or lucky enough.

- You made a mistake when updating your code.

- The code worked locally but not on the Apify [platform](https://my.apify.com).

- You have lost access to [Apify proxy]({{@link proxy.md}}) (your proxy trial is over).

- You have upgraded your [dependencies](https://www.quora.com/What-is-a-dependency-in-coding) (other software that you rely upon) and the new versions no longer work (this is harder to debug).

This is a long list, and it is by no means complete. However, if you use the right tools and remember the most common causes, you can find the problem quickly.

## [](#analysis) Analysis

[Web scraping]({{@link web_scraping_101.md}}) and [automation]({{@link robotic_process_automation.md}}) are very specific types of programming. It is not possible to rely on specialized debugging tools, since the code does not output the same results every time.

Many issues are edge cases, which occur in just one of a thousand pages or are time-dependent. Because of this, you cannot rely only on [determinism](https://en.wikipedia.org/wiki/Deterministic_algorithm).

### [](#logging) Logging

Logging is an essential tool for any programmer. When used correctly, they help you capture a surprising amount of information.

Note that Apify logs are [not infinite]({{@link actors/limits.md}}). If you see messages with skipped lines, consider toning down your logging.

General rules for logging:

- Usually, **many logs** is better than **no logs**.

- Putting more information into one line, rather than logging multiple short lines, helps reduce the overall log size.

- Focus on numbers. Log how many items you extract from a page, etc.

- Structure your logs and use the same structure in all your logs.

- Append the current page's URL to each log. This lets you immediately open that page and review it.

#### [](#example-of-a-structured-log) Example of a structured log

```log
[CATEGORY]: Products: 20, Unique products: 4, Next page: true --- https://apify.com/store
```

The log begins with the **page type**. Usually, we use labels such as **[CATEGORY]** and **[DETAIL]**. Then, we log important numbers and other information. Finally, we add the page's URL so we can check if the log is correct.

#### [](#errors) Errors

Errors require a different approach because, if your code crashes, you usual logs will not be called. Instead, exception handlers will print your error, but these are usually ugly messages with a [stack trace](https://en.wikipedia.org/wiki/Stack_trace) that only Apify experts will understand.

You can overcome this by adding [try/catch blocks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) into your code. In the catch block, explain what happened and re-throw the error (so the request is automatically retried).

```javascript
try {
    // Sensitive code block
    // ...
} catch (error) {
    // You know where the code crashed so you can explain here
    console.error('Request failed during login with an error:');
    throw error;
}
```

Read more information about logging and error handling in our public wiki about [developer best practices](https://gitlab.com/apify-public/wiki/-/wikis/writing-actors/how-to-write-and-not-write-an-actor).

### [](#saving-snapshots) Saving snapshots

By snapshots, we mean **screenshots** if you use a [browser/Puppeteer](https://sdk.apify.com/docs/examples/screenshots) and **HTML** saved into a [key-value store]({{@link storage/key_value_store.md}}) that you can easily display in your browser. Snapshots are useful throughout your code but especially important in error handling.

Note that an error can happen only in a few pages out of a thousand and look completely random. There is not much you can do other than save and analyze a snapshot.

Snapshots can tell you if:

- A website has changed its layout. This can also mean A/B testing or different content for different locations.

- You have been blocked – you open a [CAPTCHA](https://en.wikipedia.org/wiki/CAPTCHA) or **Access Denied** page.

- Data load later dynamically – the page is empty.

- The page was redirected – the content is different.

#### [](#how-to-save-a-snapshot) How to save a snapshot

In Apify scrapers (**Web Scraper** ([apify/web-scraper](https://apify.com/apify/web-scraper)), **Cheerio Scraper** ([apify/cheerio-scraper](https://apify.com/apify/cheerio-scraper)) and **Puppeteer Scraper** ([apify/puppeteer-scraper](https://apify.com/apify/puppeteer-scraper))), you can use their built-in `context.saveSnapshot()` function. Once called, it saves a screenshot and HTML into the run's **key-value store**.

When **building your own actors** with [Puppeteer](https://pptr.dev) or the the [Apify SDK](https://sdk.apify.com) package, you can use the powerful `utils.puppeteer.saveSnapshot()` [function](https://sdk.apify.com/docs/api/puppeteer#puppeteersavesnapshot). It allows you name the screenshot, so you can identify it later.

[Cheerio](https://cheerio.js.org)-based actors do not have a helper function because they allow taking snapshots with a single line of code. Just save the HTML with the correct content type.

```javascript
await Apify.setValue('SNAPSHOT', html, { contentType: 'text/html' });
```

#### [](#when-to-save-snapshots) When to save snapshots

The most common approach is to save on error. We can enhance our previous try/catch block like this:

```javascript
// storeId is ID of current key value store, where we save snapshots
const storeId = Apify.getEnv().defaultKeyValueStoreId;
try {
    // Sensitive code block
    // ...
} catch (error) {
    // Change the way you save it depending on what tool you use
    const randomNumber = Math.random();
    const key = `ERROR-LOGIN-${randomNumber}`;
    await Apify.utils.puppeteer.saveSnapshot(page, { key });
    const screenshotLink = `https://api.apify.com/v2/key-value-stores/${storeId}/records/${key}.jpg?disableRedirect=true`

    // You know where the code crashed so you can explain here
    console.error(`Request failed during login with an error. Screenshot: ${screenshotLink}`);
    throw error;
}
```

To make the error snapshot descriptive, we name it `ERROR-LOGIN`. We add a random number so the next `ERROR-LOGIN`s would not overwrite this one and we can see all the snapshots. If you can use an ID of some sort, it is even better.

**Beware**:

- The snapshot's **name** (key) can only contain letter, number, dot and dash characters. Other characters will cause an error, which makes the random number a safe pick.

- Do not overdo the snapshots. Once you get out of the testing phase, limit them to critical places. Saving snapshots uses resources.

### [](#error-reporting) Error reporting

Logging and snapshotting are great tools but once you reach a certain run size, it may be hard to read through them all. For a large project, it is handy to create a more sophisticated reporting system. For example, let's just look at simple **dataset** reporting.

This example extends our [previous snapshot solution](#when-to-save-snapshots) by creating a [named dataset]({{@link storage.md#named-and-unnamed-storages}}) (named datasets have infinite retention), where we will accumulate error reports. Those reports will explain what happened and will link to a saved snapshot, so we can do a quick visual check.

```javascript
// Let's create reporting dataset
// If you already have one, this will continue adding to it
const reportingDataset = await Apify.openDataset('REPORTING');

// storeId is ID of current key-value store, where we save snapshots
const storeId = Apify.getEnv().defaultKeyValueStoreId;

// We can also capture actor and run IDs
// to have easy access in the reporting dataset
const { actorId, actorRunId } = Apify.getEnv();
const linkToRun = `https://my.apify.com/actors/actorId#/runs/actorRunId`;

try {
    // Sensitive code block
    // ...
} catch (error) {
    // Change the way you save it depending on what tool you use
    const randomNumber = Math.random();
    const key = `ERROR-LOGIN-${randomNumber}`;
    await Apify.utils.puppeteer.saveSnapshot(page, { key });

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
    console.error(
        `Request failed during login with an error. Screenshot: ${screenshotLink}`
    );
    throw error;
}
```
