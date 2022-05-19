---
title: Fingerprinting
description: Understand browser fingerprinting, an advanced technique used by browsers to track user data and even block bots from accessing them.
menuWeight: 2
paths:
    - anti-scraping/techniques/fingerprinting
---

# [](#fingerprinting) Fingerprinting

Browser fingerprinting is a method that some websites use to collect information about a browser's type and version, as well as the operating system being used, any active plugins, the time zone and language of the machine, the screen resolution, and various other active settings. All of this information is called the **fingerprint** of the browser, and the act of collecting it is called **fingerprinting**.

Often times, websites use fingerprinting to track the online behavior of their users in order to serve hyper-personalized advertisements to them. However, in some cases, it is also used to aid in preventing bots from accessing the websites (or certain sections of it).

Here is an example of what a browser fingerprint might look like:

```JSON
{
  "userAgent": "Mozilla/5.0 (X11; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0",
  "cookiesEnabled": true,
  "timezone": "Europe/Prague",
  "timezoneOffset": -60,
  "audioCodecs": {
    "ogg": "probably",
    "mp3": "maybe",
    "wav": "probably",
    "m4a": "maybe",
    "aac": "maybe"
  },
  "videoCodecs": {
    "ogg": "probably", 
    "h264": "probably", 
    "webm": "probably"
  },
  "videoCard": [
    "Intel Open Source Technology Center",
    "Mesa DRI Intel(R) HD Graphics 4600 (HSW GT2)"
  ],
  "productSub": "20100101",
  "hardwareConcurrency": 8,
  "multimediaDevices": { 
    "speakers": 0, 
    "micros": 0, 
    "webcams": 0
  },
  "platform": "Linux x86_64",
  "pluginsSupport": true,
  "screenResolution": [ 1920, 1080 ],
  "availableScreenResolution": [ 1920, 1080 ],
  "colorDepth": 24,
  "touchSupport": { 
    "maxTouchPoints": 0, 
    "touchEvent": false, 
    "touchStart": false
  },
  "languages": [ "en-US", "en" ]
}
```

## [](#how-it-works) How it works

There are multiple levels and different approaches sites take to collect browser fingerprints; however, they all have one thing in common: they are using a script written in JavaScript to evaluate the target browser's context and collect information about it (often times also storing it in their database, or in a cookie). These scripts are often obfuscated and difficult to track down and understand, especially if they are anti-bot scripts.

There are multiple levels of script obfuscation that are used to make fingerprinting scripts unreadable and hard to find:

### Randomization

The script is modified with some random JavaScript elements. There is usually a random number of whitespaces and other strange formatting characters. Some variable and function names are also changed into somewhat cryptic strings without any readable meaning.

### Data obfuscation

There are two main data obfuscation techniques which are widely used:

1. **String splitting** uses the concatenation of multiple substrings. It is mostly used alongside an `eval()` or `document.write()`.
2. **Keyword replacement** allows the script to mask the accessed properties. This allows the script to have a random order of the substrings and makes it harder to detect.

Often times, both of these data obfuscation techniques are used together.

### Encoding

Built-in JavaScript encoding functions are used to transform the code into, for example, hexadecimal string. Or, a custom encoding function is used and a custom decoding function decodes the code as it is evaluated in the browser.

## [](#anti-bot-fingerprinting) Anti-bot fingerprinting

On websites which implement advanced fingerprinting techniques, they will tie the fingerprint and certain headers (such as the **User-Agent** header) to the IP address of the user. These sites will block a user (or scraper) if it made a request with one fingerprint and set of headers, then tries to make another request on the same proxy but with a different fingerprint.

When dealing with these cases, it's important to sync the generation of headers and fingerprints with the rotation of proxies (this is known as session rotation).

## [](#generating-fingerprints) Generating fingerprints

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

// Grab a fingerprint
const { fingerprint } = fingerprintGenerator.getFingerprint({
  locales: ["en-US", "en"]
});
```

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

## [](#next) Next up

[Next up]({{@link anti_scraping/techniques/geolocation.md}}), we'll be covering **geolocation** methods that websites use to grab the location from which a request has been made, and how they relate to anti-scraping.
