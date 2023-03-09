---
title: How to handle blocked requests in PuppeteerCrawler
description: Getting around website defense mechanisms when crawling
sidebar_position: 15.9
slug: /node-js/handle-blocked-requests-puppeteer
---

One of the main defense mechanisms websites use to ensure they are not scraped by bots is allowing only a limited number of requests from a specific IP address. That's why Apify provides a [proxy](https://www.apify.com/docs/proxy) component with intelligent rotation. With a large enough pool of proxies, you can multiply the number of allowed requests per day to easily cover your crawling needs. Let's look at how we can rotate proxies when using our [JavaScript SDK](https://github.com/apify/apify-sdk-js).

# BasicCrawler

> Getting around website defense mechanisms when crawling.

Setting proxy rotation in [BasicCrawler](https://crawlee.dev/api/basic-crawler/class/BasicCrawler) is pretty simple. When using plain HTTP requests (like with the popular '[request-promise](https://www.npmjs.com/package/request-promise)' npm package), a fresh proxy is set up on each request.

```js
const Apify = require('apify')
const requestPromise = require('request-promise')
const PROXY_PASSWORD = process.env.APIFY_PROXY_PASSWORD
const proxyUrl = `http://auto:${PROXY_PASSWORD}@proxy.apify.com`

const crawler = new Apify.BasicCrawler({
    requestList: someInitializedRequestList,
    handleRequestFunction: async ({request}) => {
        const response = await requestPromise ({
            url: request.url,
            proxy: proxyUrl
        })
   }
})
```

Each time handleRequestFunction is executed in this example, requestPromise will send a request through the least used proxy for that target domain. This way you will not easily burn you through your proxies.

# Puppeteer Crawler

With [PuppeteerCrawler](/sdk/js/docs/api/puppeteer-crawler) the situation is little more complicated. That's because you have to restart the browser to change the proxy the browser is using. By default, PuppeteerCrawler restarts the browser every 100 requests, which can lead to a number of requests being wasted because the IP address the browser is using is already blocked by the website.

The straightforward solution would be to set the 'retireInstanceAfterRequestCount' option to 1. PuppeteerCrawler would then rotate the proxies in the same way as BasicCrawler. While this approach could sometimes be useful for the toughest websites, the price you pay is in performance. Restarting the browser is an expensive operation.

That's why PuppeteerCrawler offers a utility retire() function through a PuppeteerPool class. You can access PuppeteerPool by simply passing it into the object parameter of gotoFunction or handlePageFunction.

```js
const crawler = new PuppeteerCrawler({
    requestList: someInitializedRequestList,
    launchPuppeteerOptions:{
        useApifyProxy: true
    },
    handlePageFunction: async ({request, page, puppeteerPool}) => {
         // you are on the page now
    }

})
```

It is really up to a developer to spot if something is wrong with his request. There are [many ways](https://kb.apify.com/tips-and-tricks/several-tips-how-to-bypass-website-anti-scraping-protections) a website can interfere with your crawling. Page loading can be cancelled right away, it can timeout, the page can display a captcha, some error or warning message, or the data may be just missing or corrupted. The developer can then choose if he will try to handle these problems in the code or just focus on receiving the proper data. Either way, if the request went wrong, you should throw a proper error.

Now that we know when the request is blocked, we can use the retire() function and continue crawling with a new proxy. Google is one of the most popular websites for scrapers, so let's code some simple Google search crawler. The two main blocking mechanisms used by Google is either to display their (in)famous 'sorry' captcha or to not load the page at all so we will focus on covering these.

For example, let's assume we have already initialized a requestList of Google search pages. Let's show how you can use the retire() function in both gotoFunction and handlePageFunction.

```js
const crawler = new Apify.PuppeteerCrawler({
        requestList: someInitializedRequestList,
        launchPuppeteerOptions: {
            useApifyProxy: true,
        },
        gotoFunction : async ({ request, page, puppeteerPool }) => {
            const response = page.goto(request.url).catch(() => null)
            if (!response) {
                await puppeteerPool.retire(page.browser());
                throw new Error(`Page didn't load for ${request.url}`);
            }
            return response;
        },
        handlePageFunction: async ({ request, page, puppeteerPool }) => {
            if (page.url().includes('sorry')) {
                await puppeteerPool.retire(page.browser());
                throw new Error(`We got captcha for ${request.url}`);
            }
        },
        retireInstanceAfterRequestCount:50
    });

Apify.main(async() => {
     await crawler.run();
});
```

So now we have a crawler that catches the most common blocking issues on Google. In gotoFunction we will catch if the page doesn't load and in the handlePageFunction we check if we were redirected to the 'sorry page'. In both cases we throw an error afterwards so the request is added back to the crawling queue (otherwise the crawler would think everything was okay and would treat that request as handled).
