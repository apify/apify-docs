---
title: Examples
description: Documentation of Apify actors - a serverless computing jobs that enable execution of long-running web scraping and automation tasks in the cloud.
menuWeight: 3.7
paths:
    - actor/examples
---

# [](#examples)Examples

This section provides examples of actors using various features of the Apify platform. All these examples and many more are also available in the [store](https://apify.com/store?type=acts&search=user%3Aapify%20example).

## [](#puppeteer)Puppeteer

This example demonstrates how to use headless Chrome with Puppeteer to open a web page, determines its dimensions, save a screenshot and print it to PDF. The actor can be found in the Apify store as [apify/example-puppeteer](https://apify.com/apify/example-puppeteer).

    const Apify = require('apify');

    Apify.main(async () => {
       const input = await Apify.getInput();

       if (!input || !input.url) throw new Error('Invalid input, must be a JSON object with the "url" field!');

       console.log('Launching Puppeteer...');
       const browser = await Apify.launchPuppeteer();

       console.log(`Opening URL: ${input.url}`);
       const page = await browser.newPage();
       await page.goto(input.url);

       // Get the "viewport" of the page, as reported by the page.
       console.log('Determining page dimensions...');
       const dimensions = await page.evaluate(() => ({
           width: document.documentElement.clientWidth,
           height: document.documentElement.clientHeight,
           deviceScaleFactor: window.devicePixelRatio
       }));
       console.log(`Dimension: ${JSON.stringify(dimensions)}`);

       // Grab a screenshot
       console.log('Saving screenshot...');
       const screenshotBuffer = await page.screenshot();
       await Apify.setValue('screenshot.png', screenshotBuffer, { contentType: 'image/png' });

       console.log('Saving PDF snapshot...');
       const pdfBuffer = await page.pdf({ format: 'A4'});
       await Apify.setValue('page.pdf', pdfBuffer, { contentType: 'application/pdf' });

       console.log('Closing Puppeteer...');
       await browser.close();

       console.log('Done.');
       console.log('You can check the output in the key-value on the following URLs:');
       const storeId = process.env.APIFY_DEFAULT_KEY_VALUE_STORE_ID;
       console.log(`- https://api.apify.com/v2/key-value-stores/${storeId}/records/screenshot.png`)
       console.log(`- https://api.apify.com/v2/key-value-stores/${storeId}/records/page.pdf`);
    });

The code above uses the [`launchPuppeteer()`](https://sdk.apify.com/docs/api/apify#apifylaunchpuppeteeroptions) function provided by the [`apify`](https://sdk.apify.com/) NPM package. The function launches Puppeteer with several settings that enable it to run in an actor. Note that the actor needs to have **Base image** set to [Node.js 10 + Puppeteer on Debian]({{@link actor/development/build.md#base-images}}) in order to run Puppeteer.

## [](#custom-dockerfile)Custom Dockerfile

This example demonstrates how to create an actor written in PHP using a custom Dockerfile. For more information, see the [Custom Dockerfile]({{@link actor/development/source_code.md#custom-dockerfile}}) section. The Dockerfile is based on the [`php:7.0-cli`](https://hub.docker.com/_/php/) Docker image that contains everything needed to run PHP in a terminal.

`Dockerfile` contains only two commands. The first copies source code into the container and the second executes `main.php`.

The actor can be found in the Apify store as [apify/example-php](https://apify.com/apify/example-php).

### Dockerfile

```dockerfile
FROM php:7.0-cli
COPY ./* ./
CMD [ "php", "./main.php" ]
```

### main.php

```php
<?php
print "Starting ...\n";
print "ENV vars:\n";
print_r($_ENV);
print "Fetching http://example.com ...\n";
$exampleComHtml = file_get_contents('http://example.com');
print "Searching for <h1> tag contents ...\n";
preg_match_all('/<h1>(.*?)<\/h1>/', $exampleComHtml, $matches);
print "Found: " . $matches[1][0] . "\n";
print "I am done!\n";
```

## [](#state-persistence)State persistence

This actor demonstrates how to persist a state, so that on restart the actor can continue where it left off. For more information, see the [State persistence]({{@link actor/run.md#state-persistence}}) section. The actor simply counts from one up. In each run it prints one number. Its state (counter position) is stored in a named [key-value store]({{@link storage/key_value_store.md}}) called `example-counter`. You will find it in the [Storage](https://my.apify.com/key-value-stores) section of the app after you run the actor.

The actor can be found in the Apify store as [apify/example-counter](https://apify.com/apify/example-counter).

    const Apify = require('apify');

    Apify.main(async () => {
        const keyValueStores = Apify.client.keyValueStores;

        // Get store with name 'example-counter'.
        const store = await keyValueStores.getOrCreateStore({
            storeName: 'example-counter',
        });

        // Get counter state record from store.
        const record = await keyValueStores.getRecord({
            key: 'counter',
            storeId: store.id,
        });

        // If there is no such record then start from zero.
        let counter = record ? record.body : 0;

        // Increase counter, print and set as output.
        counter ++;
        console.log(`Counter: ${counter}`);
        Apify.setValue('OUTPUT', counter);

        // Save increased value back to store.
        await keyValueStores.putRecord({
            storeId: store.id,
            key: 'counter',
            body: counter.toString(), // Record body must be a string or buffer!
        });
    });

