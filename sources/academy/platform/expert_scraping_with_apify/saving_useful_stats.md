---
title: VII - Saving useful run statistics
description: Understand how to save statistics about an actor's run, what types of statistics you can save, and why you might want to save them for a large-scale scraper.
sidebar_position: 6.7
slug: /expert-scraping-with-apify/saving-useful-stats
---

# Saving useful run statistics {#savings-useful-run-statistics}

**Understand how to save statistics about an actor's run, what types of statistics you can save, and why you might want to save them for a large-scale scraper.**

---

Using Crawlee and the Apify SDK, we are now able to collect and format data coming directly from websites and save it into a Key-Value store or Dataset. This is great, but sometimes, we want to store some extra data about the run itself, or about each request. We might want to store some extra general run information separately from our results, or potentially include statistics about each request within its corresponding dataset item.

The types of values that are saved are totally up to you, but the most common are error scores, number of total saved items, number of request retries, number of captchas hit, etc. Storing these values is not always necessary, but can be valuable when debugging and maintaining an actor. As your projects scale, this will become more and more useful and important.

## Learning 🧠 {#learning}

Before moving on, give these valuable resources a quick lookover:

- Refamiliarize with the various available data on the [Request object](https://crawlee.dev/api/core/class/Request).
- Learn about the [`failedRequestHandler` function](https://crawlee.dev/api/browser-crawler/interface/BrowserCrawlerOptions#failedRequestHandler).
- Understand how to use the [`errorHandler`](https://crawlee.dev/api/browser-crawler/interface/BrowserCrawlerOptions#errorHandler) function to handle request failures.
- Ensure you are comfortable using [key-value stores](https://docs.apify.com/sdk/js/docs/guides/data-storage#key-value-store) and [datasets](https://docs.apify.com/sdk/js/docs/api/dataset#__docusaurus), and understand the differences between the two storage types.

## Knowledge check 📝 {#quiz}

1. Why might you want to store statistics about an actor's run (or a specific request)?
2. In our Amazon scraper, we are trying to store the number of retries of a request once its data is pushed to the dataset. Where would you get this information? Where would you store it?
3. We are building a new imaginary scraper for a website that sometimes displays captchas at unexpected times, rather than displaying the content we want. How would you keep a count of the total number of captchas hit for the entire run? Where would you store this data? Why?
4. Is storing these types of values necessary for every single actor?
5. What is the difference between the `failedRequestHandler` and `errorHandler`?

## Our task

In our Amazon actor, each dataset result must now have the following extra keys:

```json
{
    "dateHandled": "date-here", // the date + time at which the request was handled
    "numberOfRetries": 4, // the number of retries of the request before running successfully
    "currentPendingRequests": 24 // the current number of requests left pending in the request queue
}
```

Also, an object including these values should be persisted during the run in th Key-Value store and logged to the console every 10 seconds:

```json
{
    "errors": { // all of the errors for every request path
        "some-site.com/products/123": [
            "error1",
            "error2"
        ]
    },
    "totalSaved": 43 // total number of saved items throughout the entire run
}
```

[**Solution**](./solutions/saving_stats.md)

## Wrap up

Wow, you've learned a whole lot in this course, so give yourself the pat on the back that you deserve! If you were able to follow along with this course, that means that you're officially an **Apify pro**, and that you're equipped with all of the knowledge and tools you need to build awesome scalable web-scrapers either for your own personal projects, or for the Apify platform.

Congratulations! 🎉
