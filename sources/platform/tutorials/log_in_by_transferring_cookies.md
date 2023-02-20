---
title: Log in by transferring cookies
description: Learn how to transfer cookies from your web browser to your crawlers. Log into websites when web scraping or automating tasks using your existing logins.
sidebar_position: 3.7
slug: /tutorials/log-in-by-transferring-cookies
---

# Log in by transferring cookies

**Learn how to transfer cookies from your web browser to your crawlers. Log into websites when web scraping or automating tasks using your existing logins.**

---

To crawl websites that require a login, you can transfer cookies from your web browser directly into [Apify actors](../actors/index.md) such as **Web Scraper** ([apify/web-scraper](https://apify.com/apify/web-scraper)), **Puppeteer Scraper** ([apify/puppeteer-scraper](https://apify.com/apify/puppeteer-scraper)) and **Instagram Scraper** ([jaroslavhejlek/instagram-scraper](https://apify.com/jaroslavhejlek/instagram-scraper)).

This is the quickest and simplest solution, however there are others that may be more reliable. For example, you can also [fill in the login form directly in the code](./log_into_a_website_using_puppeteer.md).

## Install a cookie editor {#install-a-cookie-editor}

First, install a browser extension like [EditThisCookie](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg). After installation, go to the website you'd like to crawl and log in using your credentials.

![Inspect Facebook login with DevTools](./images/edit-this-cookie.png)

## Export your cookies {#export-your-cookies}

Click the **EditThisCookie** button next to your URL and click **Export**. Cookies will be copied to your clipboard as a **JSON array**, which is compatible with the cookie format used by [Puppeteer](https://pptr.dev)/[Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) (the headless browser we use for crawling).

![Export your cookies](./images/open-edit-this-cookie.png)

## Pass cookies to Web Scraper {#pass-cookies-to-web-scraper}

The **Initial cookies** field is in the **Proxy and browser configuration** tab in Web Scraper's **Input** section. Paste the cookies into the field.

![Web scraper input tab](./images/web-scraper-input.png)

And that's it! When you run the scraper, it will start already logged-in. Note that if the cookies are short-lived, this might not work, and you will need to [implement login in your code](./log_into_a_website_using_puppeteer.md).
