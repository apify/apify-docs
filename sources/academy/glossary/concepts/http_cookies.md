---
title: HTTP cookies
description: Learn a bit about what cookies are, and how they are utilized in scrapers to appear logged-in, view specific data, or even avoid blocking.
sidebar_position: 8.2
slug: /concepts/http-cookies
---

# HTTP cookies {#cookies}

**Learn a bit about what cookies are, and how they are utilized in scrapers to appear logged-in, view specific data, or even avoid blocking.**

---

HTTP cookies are small pieces of data sent by the server to the user's web browser, which are typically stored by the browser and used to send later requests to the same server. Cookies are usually represented as a string (if used together with a plain HTTP request) and sent with the request under the **Cookie** [header](./http_headers.md).

## Most common uses of cookies in crawlers {#uses-in-crawlers}

1. To make the website show data to you as if you were a logged-in user.
2. To make the website show location-specific data (works for websites where you could set a zip code or country directly on the page, but unfortunately doesn't work for some location-based ads).
3. To make the website less suspicious of the crawler and let the crawler's traffic blend in with regular user traffic.

For local testing, we recommend using the [**EditThisCookie**](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg?hl=en) Chrome extension.
