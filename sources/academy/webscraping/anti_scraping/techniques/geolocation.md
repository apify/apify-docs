---
title: Geolocation
description: Learn about the geolocation techniques to determine where requests are coming from, and a bit about how to avoid being blocked based on geolocation.
sidebar_position: 3
slug: /anti-scraping/techniques/geolocation
---

# Geolocation {#geolocation}

**Learn about the geolocation techniques to determine where requests are coming from, and a bit about how to avoid being blocked based on geolocation.**

---

Geolocation is yet another way websites can detect and block access or show limited data. Other than by using the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) (which requires user permission in order to receive location data), there two main ways that websites geolocate a user (or bot) visiting it.

## Cookies & headers {#cookies-headers}

Certain websites might use certain location-specific/language-specific [headers](../../../glossary/concepts/http_headers.md)/[cookies](../../../glossary/concepts/http_cookies.md) to geolocate a user. Some examples of these headers are `Accept-Language` and `CloudFront-Viewer-Country` (which is a custom HTTP header from [CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-cloudfront-headers.html)).

On targets which are just utilizing cookies and headers to identify the location from which a request is coming from, it is pretty straightforward to make requests which appear they are coming from somewhere else.

## IP address {#ip-address}

The oldest (and still most common) way of geolocating is based on the IP address used to make the request. Sometimes, country-specific sites block themselves from being accessed from any other country (some Chinese, Indian, Israeli, and Japanese websites do this).

[Proxies](../mitigation/proxies.md) can be used in a scraper to bypass restrictions for make requests from a different location. Often times, proxies need to be used in combination with location-specific [cookies](../../../glossary/concepts/http_cookies.md)/headers(../../../glossary/concepts/http_headers.md).

## Override/emulate geolocation when using a browser-based scraper {#override-emulate-geolocation}

When using [Puppeteer](https://pptr.dev/#?product=Puppeteer&show=api-pagesetgeolocationoptions), you can emulate the geolocation with the `page.setGeolocation()` function.

In [Playwright](https://playwright.dev/docs/api/class-browsercontext#browsercontextsetgeolocationgeolocation), geolocation can be emulated by using `browserContext.setGeolocation()`.

Overriding browser geolocation should be used in tandem with a proper proxy corresponding to the emulated geolocation. You would still likely get blocked if you, for example, used a German proxy with the overridden location set to Japan.
