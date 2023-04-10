---
title: Exporting data
description: Learn how to export the data you scraped using Crawlee to CSV or JSON.
sidebar_position: 9
slug: /web-scraping-for-beginners/crawling/exporting-data
---

# Processing data {#processing-data}

**Learn how to export the data you scraped using Crawlee to CSV or JSON.**

---

In the previous lessons, you learned that:

1. You can use `Dataset.pushData()` to save data to the default dataset.
2. The default dataset files are saved in the `./storage/datasets/default` folder.

But when we look inside the folder, we see that there are a lot of files, and we don't want to work with those manually. We can use the dataset itself to export the data.

## Exporting data to CSV {#export-csv}

Crawlee's `Dataset` provides an easy way to export all your scraped data into one big CSV file. You can then open it in Excel or any other data processor. To do that, you simply need to call [`Dataset.exportToCSV()`](https://crawlee.dev/api/core/class/Dataset#exportToCSV) after collecting all the data. That means, after your crawler run finishes.

```js title=browser.js
// ...
await crawler.run();
// Add this line to export to CSV.
await Dataset.exportToCSV('results');
```

After you add this one line and run the code, you'll find your CSV with all the scraped products in here:

```text
./storage/key-value-stores/default/results.csv
```

:::info

[Key-value store](https://crawlee.dev/docs/guides/result-storage#key-value-store) is another of Crawlee's storages. It's best for saving files like CSVs, PDFs or images, but also large JSONs or crawler statistics.

:::

## Exporting data to JSON {#export-json}

Exporting to JSON is very similar to exporting to CSV, we just need to use a different function: [`Dataset.exportToJSON`](https://crawlee.dev/api/core/class/Dataset#exportToJSON). Exporting to JSON is useful when you don't want to work with each item separately, but would rather have one big JSON file with all the results.

```js title=browser.js
// ...
await crawler.run();
// Add this line to export to JSON.
await Dataset.exportToJSON('results');
```

You will find the resulting JSON here:

```text
./storage/key-value-stores/default/results.json
```

## Final scraper code {#filtering-data}

```js title=browser.js
import { PlaywrightCrawler, Dataset } from 'crawlee';

const crawler = new PlaywrightCrawler({
    // We removed the headless: false option to hide the browser windows.
    requestHandler: async ({ parseWithCheerio, request, enqueueLinks }) => {
        console.log(`Fetching URL: ${request.url}`)

        if (request.label === 'start-url') {
            await enqueueLinks({
                selector: 'a.product-item__title',
            });
            return;
        }

        // Fourth, parse the browser's page with Cheerio.
        const $ = await parseWithCheerio();

        const title = $('h1').text().trim();
        const vendor = $('a.product-meta__vendor').text().trim();
        const price = $('span.price').contents()[2].nodeValue;
        const reviewCount = parseInt($('span.rating__caption').text());
        const description = $('div[class*="description"] div.rte').text().trim();
        const recommendedProducts = $('.product-recommendations a.product-item__title')
            .map((i, el) => $(el).text().trim())
            .toArray();

        await Dataset.pushData({
            title,
            vendor,
            price,
            reviewCount,
            description,
            recommendedProducts,
        });
    },
});

await crawler.addRequests([{
    url: 'https://warehouse-theme-metal.myshopify.com/collections/sales',
    label: 'start-url',
}]);

await crawler.run();
await Dataset.exportToCSV('results');
```

## Next up {#next}

And this is it for the [**Basics of crawling**](./index.md) section of the [**Web scraping for beginners**](../index.md) course. If you want to learn more, test your knowledge of the methods and concepts you learned in this course by moving forward with the [**challenge**](../challenge/index.md).
