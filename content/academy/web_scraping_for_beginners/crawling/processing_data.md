---
title: Processing data
description: Learn how to process the data you scraped using the Crawlee library and how to convert JSON files to Excel using the Apify API.
menuWeight: 9
paths:
- web-scraping-for-beginners/crawling/processing-data
---

# [](#processing-data) Processing data

From the previous lessons, we know two things:

1. We can use `Dataset.pushData()` to save data to the default dataset.
2. The default dataset files are saved in the **storage/datasets/default** folder.

But when we look inside the folder, we see that there's A LOT of files, and we don't want to work with those manually. Fortunately, we can use the dataset itself to process the data.

## [](#loading-data) Loading dataset data

To access the default dataset, we can use the  [`Dataset`](https://crawlee.dev/api/types/interface/Dataset) class exported from `crawlee`. We can then easily work with all the items in the dataset. Let's put the processing into a separate file in our project called **dataset.js**.

```JavaScript
// dataset.js
import { Dataset, Configuration } from 'crawlee';

// Crawlee automatically deletes data from its previous runs.
// We can turn this off by setting 'purgeOnStart' to false.
// If we did not do this, we would have no data to process.
// This is a temporary workaround, and we'll add a better interface soon.
Configuration.getGlobalConfig().set('purgeOnStart', false);

const dataset = await Dataset.open();

const { items } = await dataset.getData();
console.log(items.length);
```

When we ran this code, having the results from our previous lessons in the **storage** folder, it printed **32** for us. Your number may differ.

## [](#filtering-data) Filtering data

Let's say we wanted to print the title for each product that is more expensive than $50. We'll also keep track of the products by price, and find out the most expensive one. There are no specific functions to do that, so we'll use plain JavaScript.

```JavaScript
// dataset.js
import { Dataset, Configuration } from 'crawlee';

Configuration.getGlobalConfig().set('purgeOnStart', false);

const { items } = await Dataset.getData();

let mostExpensive;

console.log('All items over $50 USD:');
for (const { title, price } of items) {
    // Use a regular expression to filter out the
    // non-number and non-decimal characters
    const numPrice = Number(price.replace(/[^0-9.]/g, ''));
    if (numPrice > 50) console.table({ title, price });
    if (numPrice > mostExpensive.price) mostExpensive = { title, price };
}

console.log('Most expensive product:');
console.table(mostExpensive);
```

In our case, the most expensive product was the Macbook Pro. Surprising? Heh, not really 😅

## [](#converting-to-excel) Converting the dataset to Excel

We promised that you won't need an Apify account for anything in this course, and it's true. You can use the skills learned in the [Save to CSV lesson]({{@link web_scraping_for_beginners/data_collection/save_to_csv.md}}) to save the dataset to a CSV. Just use the loading code from above, plug it in there and then open the CSV in Excel. However, we really want to show you this neat trick. It won't cost you anything, and it's a cool and fast way to convert datasets to any format.

### [](#get-apify-token) Getting an Apify token

First, you need a free Apify account. To get one, head to the [sign-up form](https://console.apify.com/sign-up?asrc=developers_portal) and complete the process. Once you have created the account and verified your email, go to the [integration settings](https://console.apify.com/account#/integrations), where you can copy your personal API token. This will give you access to the Apify API.

![copy personal API token in Apify console]({{@asset web_scraping_for_beginners/crawling/images/api-token.webp}})

### [](#upload-dataset) Uploading your dataset to Apify

Now that you have a token, you can upload your local dataset to the Apify platform. It's super easy with the [`apify-client`](https://www.npmjs.com/package/apify-client) NPM package. Let's reuse some of our earlier code and add more.

```JavaScript
// dataset.js
import { Dataset, Configuration } from 'crawlee';
import { ApifyClient } from 'apify-client';

Configuration.getGlobalConfig().set('purgeOnStart', false);

const { items } = await Dataset.getData();

// We will use the Apify API client to access the Apify API.
const apifyClient = new ApifyClient({
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
import { Dataset, Configuration } from 'crawlee';
import { ApifyClient } from 'apify-client';
import { writeFileSync } from 'fs';

Configuration.getGlobalConfig().set('purgeOnStart', false);

const { items } = await Dataset.getData();

const apifyClient = new ApifyClient({
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

It doesn't even have to be a dataset created by Crawlee. You can use this method to convert any JSON array to a CSV, XLSX, and so on.

## [](#next) Next up

And this is it for the [**Basics of crawling**]({{@link web_scraping_for_beginners/crawling.md}}) section of the [**Web scraping for beginners**]({{@link web_scraping_for_beginners.md}}) course. But that's not all! If you're feeling up for it, test your knowledge of the methods and concepts you learned in this course by moving forward with the [**challenge**]({{@link web_scraping_for_beginners/challenge.md}})!
