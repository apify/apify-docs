---
title: Bypasing Cloudflare browser check
description: Learn how to bypass cloudflare browser challenge with crawlee.
sidebar_position: 3
slug: /anti-scraping/mitigation/cloudflare-challenge.md
---

# Bypassing Cloudflare browser check {#cloudflare-challenge}

**Learn how to bypass cloudflare browser challenge with crawlee.**

---

There are a few strategies that can be employed if you find yourself stuck. One key strategy is to ensure that your browser fingerprint is consistent. In some cases, the default browser fingerprint may actually be more effective than an inconsistently generated fingerprint. Additionally, it may be beneficial to avoid masking a Linux browser to look like a Windows or macOS browser, although this will depend on the specific configuration of the website you are targeting.

For those using Crawlee, the library provides out-of-the-box support for generating consistent fingerprints that are able to pass the Cloudflare challenge. However, it's important to note that in some cases, the Cloudflare challenge screen may return a 403 status code even if it is evaluating the fingerprint and the request is not blocked. This can cause the default Crawlee browser crawlers to throw an error and not wait until the challenge is submitted and the page is redirected to the target webpage.

To address this issue, it is necessary to alter the crawler configuration. For example, you might use the following code to remove default blocked status code handling from the crawler:

```javascript
const crawler = new PlaywrightCrawler({
    ...otherOptions,
    sessionPoolOptions: {
        blockedStatusCodes: [],
    },
});
```

It's important to note that by removing default blocked status code handling, you should also add custom session retire logic on blocked pages to reduce retries. Additionally, you should add waiting logic to start the automation logic only after the Cloudflare challenge is solved and the page is redirected. This can be accomplished by waiting for a common selector that is available on all pages, such as a header logo.

In some cases, the browser may not pass the check and you may be presented with a captcha, indicating that your IP address has been graylisted. If you are working with a large pool of proxies you can retire the session and use another IP. However if you have small pool of proxies you might want to whitelist the IP. To do this, you'll need to solve the captcha to improve your IP address's reputation. There are various captcha-solving services available, such as [AntiCaptcha](https://anti-captcha.com/) or [AnyCaptcha](https://anycaptcha.com/), that you can use for this purpose. For more info check the section about [Captchas](../techniques/captchas.md).

![Cloudflare captcha](https://images.ctfassets.net/slt3lc6tev37/6sN2VXiUaJpjxqVfTbZEJd/9a4e13cbf08ce29797167c133c534e1f/image1.png)

In summary, while Cloudflare's browser challenge is designed to protect websites from automated scraping, it can be bypassed by ensuring a consistent browser fingerprint and customizing your scraping strategy. Crawlee offers out-of-the-box support for generating consistent fingerprints, but you may need to adjust your crawler configuration to handle Cloudflare's response. By following these tips, you can successfully navigate Cloudflare's browser challenge and continue scraping the data you need.
