---
title: I - Apify SDK introduction
description: Learn about the Apify SDK, as well as some semi-advanced topics which will be important throughout the next lessons in this section of the course.
menuWeight: 6.1
paths:
    - professional-scraping/apify-sdk
---

# [](#the-apify-sdk) The Apify SDK

The SDK is one of the most fundamental parts of developing for the Apify platform. It is an open-source JavaScript library built on top of these technologies:

- Apify actors (which run the Node.js app built with the SDK inside a Docker container)
- The Apify API/Apify Client (on the Apify platform)
- Your local operating system (for local development)
- Puppeteer + Playwright (as headless browser managers)
- Request + Cheerio (for downloading and parsing HTML)

The SDK factors away and manages the hard parts of the scraping/automation development under the hood, such as:

- Autoscaling
- Request concurrency
- Queueing requests
- Data storage
- Using and rotating [proxies]({{@link anti_scraping/proxies.md}})
- Puppeteer/Playwright setup overhead
- Plus much more!

As a developer, your goal is to take the Apify SDK, which is quite generic on its own, and write website-specific or use-case-specific actors.

## [](#docs) Docs, docs, docs

The Apify SDK and its resources can be found in various different places:

1. [Official documentation](https://sdk.apify.com/)
2. [Apify SDK guide](https://sdk.apify.com/docs/guides/motivation)
3. [SDK implementation examples](https://sdk.apify.com/docs/examples/cheerio-crawler)
4. [Github repository (source code, issues)](https://github.com/apify/apify-js)
5. [NPM](https://www.npmjs.com/package/apify)
6. [Help articles](https://help.apify.com/)

## [](#learning) Learning 🧠

Before continuing, it is highly recommended to do the following:

- Look over [the SDK guide](https://sdk.apify.com/docs/guides/motivation) and ideally **code along**
- Read [this short article](https://help.apify.com/en/articles/1829103-request-labels-and-how-to-pass-data-to-other-requests) about **request labels** and [`userData`](https://sdk.apify.com/docs/api/request#requestuserdata) (this will be extremely useful later on)
- Check out [this article](https://blog.apify.com/what-is-a-dynamic-page/) about dynamic pages
- Quickly skim the [SDK examples](https://sdk.apify.com/docs/examples/cheerio-crawler)
- Read about the [RequestList](https://sdk.apify.com/docs/api/request-list) and [RequestQueue](https://sdk.apify.com/docs/api/request-queue)

## [](#quiz) Knowledge check 📝

Each lesson in this section will have a short quiz to help you test your knowledge of the topics discussed before moving onto implementing them.

1. When using Puppeteer or Playwright, how can you still use jQuery with the SDK?
2. What is the main difference between Cheerio and jQuery?
3. In which situations would you use CheerioCrawler? What are its limitations?
4. Using Puppeteer, how can you extract data from a page without using jQuery/Cheerio?
5. What is the default concurrency the SDK uses? Why this number?
6. What is the difference between the RequestList and the RequestQueue?
7. How can we send data between requests?

## [](#our-task) Our task

On Amazon, we can use this link to get to the results page of any product we want:

```text
https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=KEYWORD
```

Our actor's input will look like this:

```JSON
{
    "keyword": "iphone"
}
```

The goal at hand is to scrape all of the products from the first page of results for whatever keyword was provided (for our test case, it will be **iphone**), then to scrape each offer of each product, and push the results to the dataset. For context, the offers for a product look like this:

![Amazon product offers]({{@asset professional_scraping/images/product-offers.webp}})

In the end, we'd like our final output to look something like this:

```JSON
[
    {
        "title": "Apple iPhone 6 a1549 16GB Space Gray Unlocked (Certified Refurbished)",
        "asin": "B07P6Y7954",
        "itemUrl": "https://www.amazon.com/Apple-iPhone-Unlocked-Certified-Refurbished/dp/B00YD547Q6/ref=sr_1_2?s=wireless&ie=UTF8&qid=1539772626&sr=1-2&keywords=iphone",
        "description": "What's in the box: Certified Refurbished iPhone 6 Space Gray 16GB Unlocked , USB Cable/Adapter. Comes in a Generic Box with a 1 Year Limited Warranty.",
        "keyword": "iphone",
        "seller name": "Blutek Intl",
        "offer": "$162.97"
    },
    {
        "title": "Apple iPhone 6 a1549 16GB Space Gray Unlocked (Certified Refurbished)",
        "asin": "B07P6Y7954",
        "itemUrl": "https://www.amazon.com/Apple-iPhone-Unlocked-Certified-Refurbished/dp/B00YD547Q6/ref=sr_1_2?s=wireless&ie=UTF8&qid=1539772626&sr=1-2&keywords=iphone",
        "description": "What's in the box: Certified Refurbished iPhone 6 Space Gray 16GB Unlocked , USB Cable/Adapter. Comes in a Generic Box with a 1 Year Limited Warranty.",
        "keyword": "iphone",
        "sellerName": "PLATINUM DEALS",
        "offer": "$169.98"
    },
    {
        "...": "..."
    }
]

```

> The `asin` is the ID of the product, which is data present on the Amazon website.

Each of the items in the dataset will represent a scraped offer, and will have the same `title`, `asin`, `itemUrl`, and `description`. The offer-specific fields will be `sellerName` and `offer`.

After the scrape has completed, we'll programmatically call a [public actor which sends emails](https://apify.com/apify/send-mail) to send ourselves an email with a publicly viewable link to the actor's final dataset.

[**Solution**]({{@link professional_scraping/solutions/actor_building.md}})

## [](#next) Next up

This was the largest part of the **Pro Apify scraper development** section, so since you've complete this, you're a total rockstar and ready to move into some even more advanced topics! 🎸 In the [next lesson]({{@link professional_scraping/actors_webhooks.md}}), you'll be learning some more advanced details about actors, as well as how to utilize webhooks.
