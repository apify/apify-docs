---
title: Captchas
description: Learn about the reasons a bot might be presented a captcha, the best ways to avoid captchas in the first place, and how to programmatically solve them.
sidebar_position: 5
slug: /anti-scraping/techniques/captchas
---

# Captchas {#captchas}

**Learn about the reasons a bot might be presented a captcha, the best ways to avoid captchas in the first place, and how to programmatically solve them.**

---

In general, a website will present a user (or scraper) a captcha for 2 main reasons:

1. The website always does captcha checks to access the desired content.
2. One of the website's anti-bot measures (or the [WAF](./firewalls.md)) has flagged the user as suspicious.

## Dealing with captchas {#dealing-with-captchas}

When you've hit a captcha, your first thought should not be how to programmatically solve it. Rather, you should consider the factors as to why you received the captcha in the first place: your bot didn't appear enough like a real user to avoid being presented the challenge.

Have you expended all of the possible options to make your scraper appear more human-like? Are you:

- Using [proxies](../mitigation/proxies.md)?
- Making the request with the proper [headers](../../../glossary/concepts/http_headers.md) and [cookies](../../../glossary/concepts/http_cookies.md)?
- Generating and using a custom [browser fingerprint](./fingerprinting.md)?
- Trying different general scraping methods (HTTP scraping, browser scraping)? If you are using browser scraping, have you tried using a different browser?

## Solving captchas {#solving-captchas}

If you've tried everything you can to avoid being presented the captcha and are still facing this roadblock, there are methods to programmatically solve captchas.

There are tons of different types of captchas, but one of the most popular is Google's [**reCAPTCHA**](https://www.google.com/recaptcha/about/).

![Google's reCAPTCHA](https://miro.medium.com/max/1400/1*4NhFKMxr-qXodjYpxtiE0w.gif)

**reCAPTCHA**s can be solved using the [Anti Captcha Recaptcha](https://apify.com/petr_cermak/anti-captcha-recaptcha) actor on the Apify platform (note that this method requires an account on [anti-captcha.com](https://anti-captcha.com)).

Another popular captcha is the [Geetest slider captcha](https://www.geetest.com/en/demo). You can find a guide for solving these types of captchas in Puppeteer [here](https://scraperbox.com/blog/solving-a-geetest-slider-captcha-with-puppeteer). Amazon's captcha can similarly also be solved programmatically.

## Wrap up

In this course, you've learned about some of the most common (and some of the most advanced) anti-scraping techniques. Keep in mind that as the web (and technology in general) evolves, this section of the **Anti scraping** course will evolve as well. In the [next section](../mitigation/index.md), we'll be discussing how to mitigate the anti-scraping techniques you learned about in this section.
