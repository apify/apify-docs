---
title: Generating fingerprints
description: Learn how to use two super handy NPM libraries to easily generate fingerprints and inject them into a Playwright or Puppeteer page.
menuWeight: 3
paths:
    - anti-scraping/mitigation/generating-fingerprints
---

# [](#generating-fingerprints) Generating fingerprints

With the [Fingerprint generator](https://github.com/apify/fingerprint-generator) NPM package, you can easily generate a browser fingerprint.

> It is crucial to generate fingerprints for the specific browser and operating system being used to trick the protections successfully. For example, if you are trying to overcome protection locally with Firefox on a macOS system, you should generate fingerprints for Firefox and macOS to achieve the best results.

```JavaScript
import FingerprintGenerator from 'fingerprint-generator';

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
const { fingerprint } = fingerprintGenerator.getFingerprint({
  locales: ["en-US", "en"]
});
```

## [](#injecting-fingerprints) Injecting fingerprints

Once you've generated a fingerprint, it can be injected into the browser using the [Fingerprint injector](https://github.com/apify/fingerprint-injector) package. This tool allows you to inject fingerprints to browsers automated by Playwright or Puppeteer:

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
const { fingerprint } = fingerprintGenerator.getFingerprint({
  locales: ["en-US", "en"]
});

// Create a new browser context, plugging in
// some values from the fingerprint
const context = await browser.newContext({
  userAgent: fingerprint.userAgent,
  locale: fingerprint.navigator.language,
});

// Attach the fingerprint to the newly created
// browser context
await fingerprintInjector.attachFingerprintToPlaywright(context, fingerprint);

// Create a new page and go to Google
const page = await context.newPage();
await page.goto('https://google.com');
```

> Note that [Crawlee](https://crawlee.dev) automatically applies wide variety fingerprints by default, so it is not required to do this unless you aren't using Crawlee or if you need a super specific custom fingerprint to scrape with.

## Wrap up

That's it for the **Mitigation** course for now, but be on the lookout for future lessons! We release lessons as we write them, and will be updating the Academy frequently, so be sure to check back every once in a while for new content! Alternatively, you can subscribe to our mailing list to get periodic updates on the Academy, as well as what Apify is up to.
