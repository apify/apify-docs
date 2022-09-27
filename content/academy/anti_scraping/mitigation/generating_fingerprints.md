---
title: Generating fingerprints
description: Learn how to use two super handy NPM libraries to easily generate fingerprints and inject them into a Playwright or Puppeteer page.
menuWeight: 3
paths:
    - anti-scraping/mitigation/generating-fingerprints
---

# [](#generating-fingerprints) Generating fingerprints

In [**Crawlee**](https://crawlee.dev), it's extremely easy to automatically generate fingerprints using the [**FingerprintOptions**](https://crawlee.dev/api/browser-pool/interface/FingerprintOptions) on a crawler.

```JavaScript
import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
    browserPoolOptions: {
        fingerprintOptions: {
            fingerprintGeneratorOptions: {
                browsers: [{ name: 'firefox', minVersion: 80 }],
                devices: ['desktop'],
                operatingSystems: ['windows'],
            },
        },
    },
});
```

> Note that Crawlee will automatically generate fingerprints for you with no configuration necessary, but the option to configure them yourself is still there within **browserPoolOptions**.

## [](#using-fingerprint-generator) Using the fingerprint-generator package

Crawlee uses the [Fingerprint generator](https://github.com/apify/fingerprint-generator) NPM package to do its fingerprint generating magic. For maximum control outside of Crawlee, you can install it on its own. With this package, you can easily generate browser fingerprints.

> It is crucial to generate fingerprints for the specific browser and operating system being used to trick the protections successfully. For example, if you are trying to overcome protection locally with Firefox on a macOS system, you should generate fingerprints for Firefox and macOS to achieve the best results.

```JavaScript
import { FingerprintGenerator } from 'fingerprint-generator';

// Instantiate the fingerprint generator with
// configuration options
const fingerprintGenerator = new FingerprintGenerator({
  browsers: [
      { name: "firefox", minVersion: 80 },
  ],
  devices: [
      "desktop"
  ],
  operatingSystems: [
      "windows"
  ]
});

// Grab a fingerprint from the fingerprint generator
const generated = fingerprintGenerator.getFingerprint({
  locales: ["en-US", "en"]
});
```

## [](#injecting-fingerprints) Injecting fingerprints

Once you've manually generated a fingerprint using the **Fingerprint generator** package, it can be injected into the browser using [**fingerprint-injector**](https://github.com/apify/fingerprint-injector). This tool allows you to inject fingerprints into browsers automated by Playwright or Puppeteer:

```JavaScript
import FingerprintGenerator from 'fingerprint-generator';
import { FingerprintInjector } from 'fingerprint-injector';
import { chromium } from 'playwright';

// Instantiate a fingerprint injector
const fingerprintInjector = new FingerprintInjector();

// Launch a browser in Playwright
const browser = await chromium.launch();

// Instantiate the fingerprint generator with
// configuration options
const fingerprintGenerator = new FingerprintGenerator({
  browsers: [
      { name: "firefox", minVersion: 80 },
  ],
  devices: [
      "desktop"
  ],
  operatingSystems: [
      "windows"
  ]
});

// Grab a fingerprint
const generated = fingerprintGenerator.getFingerprint({
  locales: ["en-US", "en"]
});

// Create a new browser context, plugging in
// some values from the fingerprint
const context = await browser.newContext({
  userAgent: generated.fingerprint.userAgent,
  locale: generated.fingerprint.navigator.language,
});

// Attach the fingerprint to the newly created
// browser context
await fingerprintInjector.attachFingerprintToPlaywright(context, generated);

// Create a new page and go to Google
const page = await context.newPage();
await page.goto('https://google.com');
```

> Note that [Crawlee](https://crawlee.dev) automatically applies wide variety of fingerprints by default, so it is not required to do this unless you aren't using Crawlee or if you need a super specific custom fingerprint to scrape with.

## Wrap up

That's it for the **Mitigation** course for now, but be on the lookout for future lessons! We release lessons as we write them, and will be updating the Academy frequently, so be sure to check back every once in a while for new content! Alternatively, you can subscribe to our mailing list to get periodic updates on the Academy, as well as what Apify is up to.

## [](#generating-headers) Generating headers

Headers are also used by websites to fingerprint users (or bots), so it might sometimes be necessary to generate some user-like headers to mitigate anti-scraping protections. Similarly with fingerprints, **Crawlee** automatically generates headers for you, but you can have full control by using the [**browser-headers-generator**](https://github.com/apify/browser-headers-generator) package.

```JavaScript
import BrowserHeadersGenerator from 'browser-headers-generator';

const browserHeadersGenerator = new BrowserHeadersGenerator({
  operatingSystems: ['windows'],
  browsers: ['chrome'],
});

await browserHeadersGenerator.initialize()

const randomBrowserHeaders = await browserHeadersGenerator.getRandomizedHeaders()
```
