---
title: VI - Using proxies
description: Understand how to use proxies in your Puppeteer and Playwright requests, as well as a couple of the most common use cases for proxies.
menuWeight: 7.6
paths:
    - puppeteer-playwright/proxies
---

# [](#using-proxies) Using proxies

[Proxies]({{@link anti_scraping/proxies.md}}) are a great way of appearing as if you are making requests from a different location. A common use case for proxies is to avoid [geolocation]({{@link concepts/geolocation.md}}) restrictions. For example your favorite TV show might not be available on Netflix in your country, but it might be available for Vietnamese Netflix watchers.

In this lesson, we'll be learning how to use proxies with Playwright and Puppeteer. This will be demonstrated with a Vietnamese proxy that we got by running [this](https://apify.com/mstephen190/proxy-scraper) proxy-scraping actor on the Apify platform.

## [](#adding-a-proxy) Adding a proxy

First, let's go ahead and create a variable called `proxy` which will point to our proxy server:

> Note that this proxy may no longer be working at the time of reading. If you don't have a proxy to use during this lesson, we recommend using Proxy Scraper for a list of free ones, or checking out [Apify proxy](https://apify.com/proxy)

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

// our proxy server
const proxy = '103.214.9.13:3128';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();
await page.goto('https://google.com');

await page.waitForTimeout(10000);
await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';

// our proxy server
const proxy = '103.214.9.13:3128';

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
await page.goto('https://google.com');

await page.waitForTimeout(10000);
await browser.close();
</marked-tab>
```

For both Puppeteer and Playwright, the proxy server's URL should be passed into the options of the `launch()` function; however, it's done a bit differently depending on which library you're using.

In Puppeteer, the server must be passed within the **--proxy-server** [Chromium command line argument](https://peter.sh/experiments/chromium-command-line-switches/), while in Playwright, it can be passed into the **proxy** option.

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const proxy = '103.214.9.13:3128';

const browser = await chromium.launch({
    headless: false,
    // Using the "proxy" option
    proxy: {
        // Pass in the server URL
        server: proxy,
        
    },
});
const page = await browser.newPage();
await page.goto('https://google.com');

await page.waitForTimeout(10000);
await browser.close();
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';

const proxy = '103.214.9.13:3128';

// Using the "args" option, which is an array of Chromium command
// line switches, we pass the server URL in with "--proxy-server"
const browser = await puppeteer.launch({ headless: false, args: [`--proxy-server=${proxy}`] });
const page = await browser.newPage();
await page.goto('https://google.com');

await page.waitForTimeout(10000);
await browser.close();
</marked-tab>
```

And that's it! Now, when we visit Google, it's in Vietnamese. Depending on the country of your proxy, the language will vary.

![Vietnamese Google]({{@asset puppeteer_playwright/images/vietnamese-google.webp}})

## [](#authenticating-a-proxy) Authenticating a proxy

The proxy in the last activity didn't require a username and password, but let's say that this one does:

```text
my.proxy.com:3001
```

One might automatically assume that this would be the solution:

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
// This code is wrong!
import { chromium } from 'playwright';

const proxy = 'my.proxy.com:3001';
const username = 'someUsername';
const password = 'password123';

const browser = await chromium.launch({
    headless: false,
    proxy: {
        server: `http://${username}:${password}@${proxy}`,
        
    },
});
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
// This code is wrong!
import puppeteer from 'puppeteer';

const proxy = 'my.proxy.com:3001';
const username = 'someUsername';
const password = 'password123';

const browser = await puppeteer.launch({
    headless: false,
    args: [`--proxy-server=http://${username}:${password}@${proxy}`],
});
</marked-tab>
```

However, authentication parameters need to be passed in separately in order to work. In Puppeteer, the username and password need to passed into thee `page.authenticate()` prior to any navigations being made, while in Playwright they just need to be passed into the **proxy** option object.

```marked-tabs
<marked-tab header="Playwright" lang="javascript">
import { chromium } from 'playwright';

const proxy = 'my.proxy.com:3001';
const username = 'someUsername';
const password = 'password123';

const browser = await chromium.launch({
    headless: false,
    proxy: {
        server: proxy,
        username,
        password,
    },
});
// Proxy will now be authenticated
</marked-tab>
<marked-tab header="Puppeteer" lang="javascript">
import puppeteer from 'puppeteer';

const proxy = 'my.proxy.com:3001';
const username = 'someUsername';
const password = 'password123';

const browser = await puppeteer.launch({
    headless: false,
    args: [`--proxy-server=${proxy}`],
});

const page = await browser.newPage();

await page.authenticate({ username, password });
// Proxy will now be authenticated
</marked-tab>
```

## Wrap up

So far in this course, you've learned how to launch a browser, open a page, run scripts on a page, collect data from a page, intercept requests made on the page, and use proxies. In future lessons, you'll be learning about managing multiple pages, browser contexts, configuring proxies, and more.

Stay tuned for new lessons!
