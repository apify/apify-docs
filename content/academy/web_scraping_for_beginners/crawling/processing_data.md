---
title: Processing Data
description: Learn how to process the data you scraped using the Apify SDK and how to convert JSON to Excel files using the Apify API.
menuWeight: 9
paths:
- web-scraping-for-beginners/crawling/processing-data
---

# [](#processing-data) Processing Data

From the previous lessons, we know two things:

1. We can use `Apify.pushData()` to save data to the default dataset.
2. The default dataset files are saved in the `apify_storage/datasets/default` folder.

But when we look inside the folder, we see that there's A LOT of files, and we don't want to work with those manually. Fortunately, we can use the dataset itself to process the data.

## [](#loading-data) Loading Dataset Data

To access the default dataset, we first have to open it by calling the [`Apify.openDataset()`](https://sdk.apify.com/docs/api/apify#opendataset) function. We can then easily work with all the items in the dataset. Let's put the processing into a separate file in our project called `dataset.js`.

```JavaScript
// dataset.js
import Apify from 'apify';

const dataset = await Apify.openDataset();
const { items } = await dataset.getData();
console.log(items.length);
```

When we ran this code, having the results from our previous lessons in the `apify_storage` folder, it printed `32` for us. Your number may differ.

## [](#filtering-data) Filtering Data

Let's say we wanted to print the title for each product that is more expensive than $50. We'll also keep track of the products by price, and find out the most expensive one. There are no specific functions to do that, so we'll use plain JavaScript.

```JavaScript
// dataset.js
import Apify from 'apify';

const dataset = await Apify.openDataset();
const { items } = await dataset.getData();

let mostExpensive;

console.log('All items over $50 USD:');
for (const { title, price } of items) {
    // Use a regular expression to filter out the
    // non-number and non-decimal characters
    const numPrice = +price.replace(/[^0-9.]/g, '');
    if (numPrice > 50) console.table({ title, price });
    if (numPrice > mostExpensive.price) mostExpensive = { title, price };
}

console.log('Most expensive product:');
console.table(mostExpensive);
```

In our case, the most expensive product was the Macbook Pro. Surprising? Heh, not really 😅

## [](#converting-to-excel) Converting the dataset to Excel

We promised that you won't need an Apify account for anything in this course, and it's true. You can use the skills learned in the [Save to CSV lesson]({{@link web_scraping_for_beginners/data_collection/save_to_csv.md}}) to save the dataset to a CSV. Just use the loading code from above, plug it in there and then open the CSV in Excel. However, we really want to show you this neat trick. It won't cost you anything, we promise, and it's a cool and fast way to convert datasets to any format.

### [](#get-apify-token) Getting an Apify Token

First, you need a free Apify account. To get one, head to the [sign-up form](https://console.apify.com/sign-up) and complete the process. Once you have created the account and verified your email, go to the [integration settings](https://console.apify.com/account#/integrations), where you can copy your personal API token. This will give you access to the Apify API.

![copy personal API token in Apify console]({{@asset web_scraping_for_beginners/crawling/images/api-token.webp}})

### [](#upload-dataset) Upload your dataset to Apify

Now that you have a token, you can upload your local dataset to the Apify platform. It's super easy. Let's reuse some of our earlier code and add more.

```JavaScript
// dataset.js
import Apify from 'apify';

const localDataset = await Apify.openDataset();
const { items } = await localDataset.getData();

// We will use the Apify API client to access the Apify API.
const apifyClient = Apify.newClient({
    token: 'YOUR_API_TOKEN', // Paste your API token here.
});

console.log('Creating a new dataset on the Apify platform');
const remoteDataset = await apifyClient.datasets().getOrCreate();
const datasetClient = apifyClient.dataset(remoteDataset.id);

console.log('Uploading dataset items to the newly created dataset');
await datasetClient.pushItems(items);
```

### [](#download-to-excel) Download and save the Excel file

When we have the dataset uploaded on the Apify platform, we can easily download it in any format including JSON, CSV, Excel and others.

```JavaScript
console.log('Downloading an Excel file and saving it to disk');
const xlsx = await datasetClient.downloadItems('xlsx');
writeFileSync('dataset.xlsx', xlsx);
```

The full code, to do this in one go, looks like this:

```JavaScript
// dataset.js
import Apify from 'apify';
import { writeFileSync } from 'fs';

const localDataset = await Apify.openDataset();
const { items } = await localDataset.getData();

const apifyClient = Apify.newClient({
    token: 'YOUR_API_TOKEN', // Paste your API token here.
});

console.log('Creating a new dataset on the Apify platform');
const remoteDataset = await apifyClient.datasets().getOrCreate();
const datasetClient = apifyClient.dataset(remoteDataset.id);

console.log('Uploading dataset items to the newly created dataset');
await datasetClient.pushItems(items);

console.log('Downloading an Excel file and saving it to disk');
const xlsx = await datasetClient.downloadItems('xlsx');
writeFileSync('dataset.xlsx', xlsx);
```

It doesn't even have to be a dataset created by the Apify SDK. You can use this method to convert any JSON array to a CSV, XLSX, and so on.

## [](#wrap-up) Wrap up 💥

And this is it for the [Basics of crawling section]({{@link web_scraping_for_beginners/crawling.md}}) of the [Web scraping for beginners]({{@link web_scraping_for_beginners.md}}) course. For now, this is also the last section. If you want to learn more about web scraping, stay tuned. We will keep updating the Academy with more content regularly, until we cover all the advanced and expert topics we promised at the beginning.

If you're hooked and want to continue learning right away, head to the [getting started guide](https://sdk.apify.com/docs/guides/getting-started) of the Apify SDK. It will help you reinforce your learnings from this course and also explain the inner workings of the SDK in more detail. See you there 👋
