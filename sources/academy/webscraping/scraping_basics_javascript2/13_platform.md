---
title: Using a scraping platform with Node.js
sidebar_label: Using a platform
description: Lesson about building a Node.js application for watching prices. Using the Apify platform to deploy a scraper.
slug: /scraping-basics-javascript2/platform
unlisted: true
---

**In this lesson, we'll deploy our application to a scraping platform that automatically runs it daily. We'll also use the platform's API to retrieve and work with the results.**

---

Before starting with a scraping platform, let's highlight a few caveats in our current setup:

- _User-operated:_ We have to run the scraper ourselves. If we're tracking price trends, we'd need to remember to run it daily. And if we want alerts for big discounts, manually running the program isn't much better than just checking the site in a browser every day.
- _No monitoring:_ If we have a spare server or a Raspberry Pi lying around, we could use [cron](https://en.wikipedia.org/wiki/Cron) to schedule it. But even then, we'd have little insight into whether it ran successfully, what errors or warnings occurred, how long it took, or what resources it used.
- _Manual data management:_ Tracking prices over time means figuring out how to organize the exported data ourselves. Processing the data could also be tricky since different analysis tools often require different formats.
- _Anti-scraping risks:_ If the target website detects our scraper, they can rate-limit or block us. Sure, we could run it from a coffee shop's Wi-Fi, but eventually, they'd block that too—risking seriously annoying our barista.

In this lesson, we'll use a platform to address all of these issues. Generic cloud platforms like [GitHub Actions](https://github.com/features/actions) can work for simple scenarios. But platforms dedicated to scraping, like [Apify](https://apify.com/), offer extra features such as monitoring scrapers, managing retrieved data, and overcoming anti-scraping measures.

:::info Why Apify

Scraping platforms come in many varieties, offering a wide range of tools and approaches. As the course authors, we're obviously biased toward Apify—we think it's both powerful and complete.

That said, the main goal of this lesson is to show how deploying to _any platform_ can make life easier. Plus, everything we cover here fits within [Apify's free tier](https://apify.com/pricing).

:::

## Registering

First, let's [create a new Apify account](https://console.apify.com/sign-up). We'll go through a few checks to confirm we're human and our email is valid—annoying but necessary to prevent abuse of the platform.

Apify serves both as an infrastructure where to privately deploy and run own scrapers, and as a marketplace, where anyone can offer their ready scrapers to others for rent. But let's hold off on exploring the Apify Store for now.

## Getting access from the command line

To control the platform from our machine and send the code of our program there, we'll need the Apify CLI. The [Apify CLI installation guide](https://docs.apify.com/cli/docs/installation) suggests we can install it with `npm` as a global package:

```text
$ npm -g install apify-cli

added 440 packages in 2s
...
```

We better verify that we installed the tool by printing its version:

```text
$ apify --version
apify-cli/0.0.0 system-arch00 node-v0.0.0
```

Now let's connect the CLI with the cloud platform using our account from previous step:

```text
$ apify login
...
Success: You are logged in to Apify as user1234!
```

## Turning our program to an Actor

Every program that runs on the Apify platform first needs to be packaged as a so-called [Actor](https://apify.com/actors)—a standardized container with designated places for input and output.

Many [Actor templates](https://apify.com/templates/categories/javascript) simplify the setup for new projects. We'll skip those, as we're about to package an existing program.

Inside the project directory we'll run the `apify init` command followed by a name we want to give to the Actor:

```text
$ apify init warehouse-watchdog
Success: The Actor has been initialized in the current directory.
```

The command creates an `.actor` directory with `actor.json` file inside. This file serves as the configuration of the Actor.

:::tip Hidden dot files

On some systems, `.actor` might be hidden in the directory listing because it starts with a dot. Use your editor's built-in file explorer to locate it.

:::

We'll also need a few changes to our code. First, let's add the `apify` package, which is the [Apify SDK](https://docs.apify.com/sdk/js/):

```text
$ npm install apify --save

added 123 packages, and audited 123 packages in 0s
...
```

Now we'll modify the program so that before it starts, it configures the Actor environment, and after it ends, it gracefully exits the Actor process:

```js title="index.js"
import { CheerioCrawler } from 'crawlee';
// highlight-next-line
import { Actor } from 'apify';

function parseVariant($option) {
  ...
}

// highlight-next-line
await Actor.init();

const crawler = new CheerioCrawler({
  ...
});

await crawler.run(['https://warehouse-theme-metal.myshopify.com/collections/sales']);
crawler.log.info('Exporting data');
await crawler.exportData('dataset.json');
await crawler.exportData('dataset.csv');

// highlight-next-line
await Actor.exit();
```

Finally, let's tell others how to start the project. This is not specific to Actors. JavaScript projects usually include this so people and tools like Apify know how to run them. We will add a `start` script to `package.json`:

```json title="package.json"
{
  "name": "academy-example",
  "version": "1.0.0",
  ...
  "scripts": {
    // highlight-next-line
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    ...
  }
}
```

That's it! Before deploying the project to the cloud, let's verify that everything works locally:

```text
$ apify run
Run: npm run start

> academy-example@1.0.0 start
> node index.js

INFO  System info {"apifyVersion":"0.0.0","apifyClientVersion":"0.0.0","crawleeVersion":"0.0.0","osType":"Darwin","nodeVersion":"v0.0.0"}
INFO  CheerioCrawler: Starting the crawler.
INFO  CheerioCrawler: Looking for product detail pages
INFO  CheerioCrawler: Product detail page: https://warehouse-theme-metal.myshopify.com/products/jbl-flip-4-waterproof-portable-bluetooth-speaker
INFO  CheerioCrawler: Saving a product variant
INFO  CheerioCrawler: Saving a product variant
...
```

## Deploying the scraper

Now we can proceed to deployment:

```text
$ apify push
Info: Created Actor with name warehouse-watchdog on Apify.
Info: Deploying Actor 'warehouse-watchdog' to Apify.
Run: Updated version 0.0 for Actor warehouse-watchdog.
Run: Building Actor warehouse-watchdog
...
Actor build detail https://console.apify.com/actors/a123bCDefghiJkLMN#/builds/0.0.1
? Do you want to open the Actor detail in your browser? (Y/n)
```

After opening the link in our browser, assuming we're logged in, we should see the **Source** screen on the Actor's detail page. We'll go to the **Input** tab of that screen. We won't change anything—just hit **Start**, and we should see logs similar to what we see locally, but this time our scraper will be running in the cloud.

![Actor's detail page, screen Source, tab Input](./images/actor-input.webp)

When the run finishes, the interface will turn green. On the **Output** tab, we can preview the results as a table or JSON. We can even export the data to formats like CSV, XML, Excel, RSS, and more.

![Actor's detail page, screen Source, tab Output](./images/actor-output.webp)

:::info Accessing data

We don't need to click buttons to download the data. It's possible to retrieve it also using Apify's API, the `apify datasets` CLI command, or the JavaScript SDK. Learn more in the [Dataset docs](https://docs.apify.com/platform/storage/dataset).

:::

## Running the scraper periodically

Now that our scraper is deployed, let's automate its execution. In the Apify web interface, we'll go to [Schedules](https://console.apify.com/schedules). Let's click **Create new**, review the periodicity (default: daily), and specify the Actor to run. Then we'll click **Enable**—that's it!

From now on, the Actor will execute daily. We can inspect each run, view logs, check collected data, [monitor stats and charts](https://docs.apify.com/platform/monitoring), and even set up alerts.

![Schedule detail page](./images/actor-schedule.webp)

## Adding support for proxies

If monitoring shows that our scraper frequently fails to reach the Warehouse Shop website, it's likely being blocked. To avoid this, we can [configure proxies](https://docs.apify.com/platform/proxy) so our requests come from different locations, reducing the chances of detection and blocking.

Proxy configuration is a type of [Actor input](https://docs.apify.com/platform/actors/running/input-and-output#input). Crawlee scrapers automatically connect their default dataset to the Actor output, but input must be handled manually. Inside the `.actor` directory we'll create a new file, `inputSchema.json`, with the following content:

```json title=".actor/inputSchema.json"
{
  "title": "Crawlee Cheerio Scraper",
  "type": "object",
  "schemaVersion": 1,
  "properties": {
    "proxyConfig": {
      "title": "Proxy config",
      "description": "Proxy configuration",
      "type": "object",
      "editor": "proxy",
      "prefill": {
        "useApifyProxy": true,
        "apifyProxyGroups": []
      },
      "default": {
        "useApifyProxy": true,
        "apifyProxyGroups": []
      }
    }
  }
}
```

Now let's connect this file to the actor configuration. In `actor.json`, we'll add one more line:

```json title=".actor/actor.json"
{
  "actorSpecification": 1,
  "name": "warehouse-watchdog",
  "version": "0.0",
  "buildTag": "latest",
  "environmentVariables": {},
    // highlight-next-line
    "input": "./inputSchema.json"
}
```

:::danger Trailing commas in JSON

Make sure there's no trailing comma after the line, or the file won't be valid JSON.

:::

That tells the platform our Actor expects proxy configuration on input. We'll also update the `index.js`. Thanks to the built-in integration between Apify and Crawlee, we can pass the proxy configuration as-is to the `CheerioCrawler`:

```js
...
await Actor.init();
// highlight-next-line
const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new CheerioCrawler({
  // highlight-next-line
  proxyConfiguration,
  async requestHandler({ $, request, enqueueLinks, pushData, log }) {
    ...
  },
});

// highlight-next-line
crawler.log.info(`Using proxy: ${proxyConfiguration ? 'yes' : 'no'}`);
await crawler.run(['https://warehouse-theme-metal.myshopify.com/collections/sales']);
...
```

To verify everything works, we'll run the scraper locally. We'll use the `apify run` command again, but this time with the `--purge` option to ensure we're not reusing data from a previous run:

```text
$ apify run --purge
Run: npm run start

> academy-example@1.0.0 start
> node index.js

INFO  System info {"apifyVersion":"0.0.0","apifyClientVersion":"0.0.0","crawleeVersion":"0.0.0","osType":"Darwin","nodeVersion":"v0.0.0"}
WARN  ProxyConfiguration: The "Proxy external access" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com
INFO  CheerioCrawler: Using proxy: no
INFO  CheerioCrawler: Starting the crawler.
INFO  CheerioCrawler: Looking for product detail pages
INFO  CheerioCrawler: Product detail page: https://warehouse-theme-metal.myshopify.com/products/denon-ah-c720-in-ear-headphones
INFO  CheerioCrawler: Saving a product variant
INFO  CheerioCrawler: Saving a product variant
...
```

In the logs, we should see `Using proxy: no`, because local runs don't include proxy settings. A warning informs us that it's a paid feature we don't have enabled, so all requests will be made from our own location, just as before. Now, let's update the cloud version of our scraper with `apify push`:

```text
$ apify push
Info: Deploying Actor 'warehouse-watchdog' to Apify.
Run: Updated version 0.0 for Actor warehouse-watchdog.
Run: Building Actor warehouse-watchdog
(timestamp) ACTOR: Found input schema referenced from .actor/actor.json
...
? Do you want to open the Actor detail in your browser? (Y/n)
```

Back in the Apify console, we'll go to the **Source** screen and switch to the **Input** tab. We should see the new **Proxy config** option, which defaults to **Datacenter - Automatic**.

![Actor's detail page, screen Source, tab Input with proxies](./images/actor-input-proxies.webp)

We'll leave it as is and click **Start**. This time, the logs should show `Using proxy: yes`, as the scraper uses proxies provided by the platform:

```text
(timestamp) ACTOR: Pulling Docker image of build o6vHvr5KwA1sGNxP0 from registry.
(timestamp) ACTOR: Creating Docker container.
(timestamp) ACTOR: Starting Docker container.
(timestamp) INFO  System info {"apifyVersion":"0.0.0","apifyClientVersion":"0.0.0","crawleeVersion":"0.0.0","osType":"Darwin","nodeVersion":"v0.0.0"}
(timestamp) INFO  CheerioCrawler: Using proxy: yes
(timestamp) INFO  CheerioCrawler: Starting the crawler.
(timestamp) INFO  CheerioCrawler: Looking for product detail pages
(timestamp) INFO  CheerioCrawler: Product detail page: https://warehouse-theme-metal.myshopify.com/products/sony-ps-hx500-hi-res-usb-turntable
(timestamp) INFO  CheerioCrawler: Saving a product
(timestamp) INFO  CheerioCrawler: Product detail page: https://warehouse-theme-metal.myshopify.com/products/klipsch-r-120sw-powerful-detailed-home-speaker-set-of-1
(timestamp) INFO  CheerioCrawler: Saving a product
...
```

## Congratulations!

We've reached the end of the course—congratulations! Together, we've built a program that:

- Crawls a shop and extracts product and pricing data.
- Exports the results in several formats.
- Uses a concise code, thanks to a scraping framework.
- Runs on a cloud platform with monitoring and alerts.
- Executes periodically without manual intervention, collecting data over time.
- Uses proxies to avoid being blocked.

We hope this serves as a solid foundation for your next scraping project. Perhaps you'll even [start publishing scrapers](https://docs.apify.com/platform/actors/publishing) for others to use—for a fee?
