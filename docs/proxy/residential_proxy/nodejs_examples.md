---
title: NodeJS Examples
description: Documentation of Apify Proxy that enables anonymization of access to websites and IP rotation.
---

# [](#residential-proxy--nodejs-examples)NodeJS Examples

The following sections contain several examples of how to use Apify Proxy in NodeJS (used as the default language in [actors]({{@link actor/index.md}})).

## Usage in [PuppeteerCrawler](https://apify.com/docs/sdk/apify-runtime-js/latest#PuppeteerCrawler)

Use a single session with IP from the US for the whole PuppeteerCrawler run (for as long as the session lasts)

    const Apify = require('apify');

    Apify.main(async () => {
        const requestList = new Apify.RequestList({ sources: [{ url: 'http://www.example.com' }] });
        await requestList.initialize();

        const password = process.env.APIFY_PROXY_PASSWORD;
        const username = 'groups-RESIDENTIAL,session-my_session,country-US';
        const proxyUrl = `http://${username}:${password}@proxy.apify.com:8000`;

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            launchPuppeteerOptions: { proxyUrl },
            handlePageFunction: async ({ page, request }) => {
                return Apify.pushData({ title: await page.title() });
            },
            handleFailedRequestFunction: ({ request }) => {
                console.error('Request failed', request.url, request.errorMessages);
            },
        });

        await crawler.run();
    });

Create a new session with IP from GB for each browser launched during the Crawler run.

    const Apify = require('apify');

    Apify.main(async () => {
        const requestList = new Apify.RequestList({ sources: [{ url: 'http://www.example.com' }] });
        await requestList.initialize();

        const password = process.env.APIFY_PROXY_PASSWORD;

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            // The main difference from the example above
            // is that we are creating new session id for each
            // browser launched.
            launchPuppeteerFunction: () => {
                const sessionNumber = Math.floor(Math.random() * 100000);
                const username = `groups-RESIDENTIAL,session-s_${sessionNumber},country-US`;
                const proxyUrl = `http://${username}:${password}@proxy.apify.com:8000`;
                return Apify.launchPuppeteer({ proxyUrl });
            },
            handlePageFunction: async ({ page, request }) => {
                return Apify.pushData({ title: await page.title() });
            },
            handleFailedRequestFunction: ({ request }) => {
                console.error('Request failed', request.url, request.errorMessages);
            },
        });

        await crawler.run();
    });

## Usage in [Apify.launchPuppeteer()](https://apify.com/docs/sdk/apify-runtime-js/latest#module-Apify-launchPuppeteer)

Use a single IP from Germany for all requests done in the launched browser

    const Apify = require('apify');

    Apify.main(async () => {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const username = 'groups-RESIDENTIAL,session-my_session1,country-DE';
        const browser = await Apify.launchPuppeteer({
            proxyUrl: `http://${username}:${password}@proxy.apify.com:8000`,
        });

        const page = await browser.newPage();

        await page.goto('http://www.example.com');

        const html = await page.content();

        console.log('HTML:');
        console.log(html);
    });

## Usage with [request](https://www.npmjs.com/package/request) and [request-promise](https://www.npmjs.com/package/request-promise) NPM packages

Make a request with Residential Proxy using the [request](https://www.npmjs.com/package/request) NPM package

    const request = require('request');

    const password = process.env.APIFY_PROXY_PASSWORD;
    const username = 'groups-RESIDENTIAL';
    request(
        {
            url: 'http://www.example.com',
            proxy: `http://${username}:${password}@proxy.apify.com:8000`
        },
        (err, response, HTML) => {
            if (err) {
                console.error(error);
                return;
            }
            console.log(HTML);
        }
    );

Use the same IP for two requests with proxy geolocated in France using [request-promise](https://www.npmjs.com/package/request-promise) NPM package.

    const request = require('request-promise');

    async function main() {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const username = 'groups-RESIDENTIAL,session-my_session_3,country-FR';
        const proxy = `http://${username}:${password}@proxy.apify.com:8000`;
        try {
            const response1 = await request({
                url: 'https://api.apify.com/v2/browser-info',
                proxy,
            });
            const response2 = await request({
                url: 'https://api.apify.com/v2/browser-info',
                proxy,
            });
            console.log(response1.clientIp);
            console.log('should be the same as');
            console.log(response2.clientIp);
        } catch (e) {
            console.error(e);
        }
    }
    main();
