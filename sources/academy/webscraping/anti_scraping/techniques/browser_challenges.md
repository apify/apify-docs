---
title: Browser challenges
description: Learn how to navigate browser challenges like Cloudflare's to effectively scrape data from protected websites.
sidebar_position: 5
slug: /anti-scraping/techniques/browser_challenges.md
---

# Browser challenges {#fingerprinting}

> Learn how to navigate browser challenges like Cloudflare's to effectively scrape data from protected websites.

## Browser challenges

Browser challenges are a type of security measure that relies on browser fingerprints. These challenges typically involve a javascript script that collects both static and dynamic browser fingerprints. Static fingerprints include attributes such as user-agent, video card, and number of CPU cores available. Dynamic fingerprints, on the other hand, might involve rendering fonts or objects in the canvas (known as a [canvas fingerprint](./fingerprinting.md#with-canvases)), or playing audio in the [AudioContext](./fingerprinting.md#from-audiocontext). We were covering the details in the previous [fingerprinting](./fingerprinting.md) lesson.

While some browser challenges are relatively straightforward - for example, just loading an image and checking if it renders correctly - others can be much more complex. One well-known example of a complex browser challenge is Cloudflare's browser screen check. In this challenge, Cloudflare visually inspects the browser screen and blocks the first request if any inconsistencies are found. This approach provides an extra layer of protection against automated attacks.

Many online protections incorporate browser challenges into their security measures, but the specific techniques used can vary.

## Cloudflare browser challenge

One of the most well-known browser challenges is the one used by Cloudflare. Cloudflare has a massive dataset of legitimate canvas fingerprints and user-agent pairs, which they use in conjunction with machine learning algorithms to detect any device property spoofing. This might include spoofed user-agents, operating systems, or GPUs.

![Cloudflare browser check](https://images.ctfassets.net/slt3lc6tev37/55EYMR81XJCIG5uxLjQQOx/252a98adf90fa0ff2f70437cc5c0a3af/under-attack-mode_enabled.gif)

When you encounter a Cloudflare browser challenge, the platform checks your canvas fingerprint against the expected value. If there is a mismatch, the request is blocked. However, if your canvas fingerprint matches the expected value, Cloudflare issues a cookie that allows you to continue scraping - even without the browser - until the cookie is invalidated.

It's worth noting that Cloudflare's protection is highly customizable, and can be adjusted to be extremely strict or relatively loose. This makes it a powerful tool for website owners who want to protect against automated traffic, while still allowing legitimate traffic to flow through.

If you want to learn how to bypass cloudflare challenge visit the [Bypassing Cloudflare challenge](../mitigation/cloudflare_challenge.md) article.

## Next up {#next}

In the [next lesson](./captchas.md), we'll be covering **captchas**, which were mentioned throughout this lesson. It's important to note that attempting to solve a captcha programmatically is the last resort - always try to avoid being presented the captcha in the first place by using the techniques mentioned in this lesson.
