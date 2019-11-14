---
title: NodeJS Examples
description: Documentation of Apify Proxy that enables anonymization of access to websites and IP rotation.
---

# [](#datacenter-proxy--nodejs-examples)NodeJS Examples

The following sections contain several examples of how to use Apify Proxy in NodeJS (used as the default language in [actors]({{@link actor/index.md}})).

## Usage in [PuppeteerCrawler](/docs/sdk/apify-runtime-js/latest#PuppeteerCrawler)

Use default functionality of Apify Proxy (randomly choose a proxy server from all available)

    const Apify = require('apify');

    Apify.main(async () => {
        const requestList = new Apify.RequestList({ sources: [{ url: 'http://www.example.com' }] });
        await requestList.initialize();

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            launchPuppeteerOptions: { useApifyProxy: true },
            handlePageFunction: async ({ page, request }) => {
                return Apify.pushData({ title: await page.title() });
            },
            handleFailedRequestFunction: ({ request }) => {
                console.error('Request failed', request.url, request.errorMessages);
            },
        });

        await crawler.run();
    });

Only use proxy servers from proxy group `SHADER` during the PuppeteerCrawler run

    const Apify = require('apify');

    Apify.main(async () => {
        const requestList = new Apify.RequestList({ sources: [{ url: 'http://www.example.com' }] });
        await requestList.initialize();

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            launchPuppeteerOptions: {
                useApifyProxy: true,
                // if you need to use more then one group
                // simply add the additional ID's to the array below
                apifyProxyGroups: ['SHADER'],
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

Keep a single IP selected from `SHADER` proxy group during the whole PuppeteerCrawler run

    const Apify = require('apify');

    Apify.main(async () => {
        const requestList = new Apify.RequestList({ sources: [{ url: 'http://www.example.com' }] });
        await requestList.initialize();

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            launchPuppeteerOptions: {
                useApifyProxy: true,
                // if you need to use more then one group
                // simply add the additional ID's to the array below
                apifyProxyGroups: ['SHADER'],
                apifyProxySession: 'my_session',
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

Get a new IP selected from `SHADER` proxy group for each browser opened during the whole PuppeteerCrawler run

    const Apify = require('apify');

    Apify.main(async () => {
        const requestList = new Apify.RequestList({ sources: [{ url: 'http://www.example.com' }] });
        await requestList.initialize();

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            // Notice that now we are setting options
            // in launchPuppeteerFunction instead of launchPuppeteerOptions
            launchPuppeteerFunction: () => Apify.launchPuppeteer({
                useApifyProxy: true,
                // if you need to use more then one group
                // simply add the additional ID's to the array below
                apifyProxyGroups: ['SHADER'],
                apifyProxySession: `my_sess_${Math.floor(Math.random() * 100000)}`,
            }),
            handlePageFunction: async ({ page, request }) => {
                return Apify.pushData({ title: await page.title() });
            },
            handleFailedRequestFunction: ({ request }) => {
                console.error('Request failed', request.url, request.errorMessages);
            },
        });

        await crawler.run();
    });

## Usage in [Apify.launchPuppeteer()](/docs/sdk/apify-runtime-js/latest#module-Apify-launchPuppeteer)

Use one IP chosen from `SHADER` and `BUYPROXIES94952` proxy groups for the browser instance

    const Apify = require('apify');

    Apify.main(async () => {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const username = 'groups-SHADER+BUYPROXIES94952,session-my_session';
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

Use one randomly selected IP from all available proxy servers.

    const request = require('request');

    const password = process.env.APIFY_PROXY_PASSWORD;
    request(
        {
            url: 'http://www.example.com',
            proxy: `http://auto:${password}@proxy.apify.com:8000`
        },
        (err, response, HTML) => {
            if (err) {
                console.error(error);
                return;
            }
            console.log(HTML);
        }
    );

Use one IP selected from `SHADER` proxy group for two requests.

    const request = require('request-promise');

    async function main() {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-SHADER,session-my_session:${password}@proxy.apify.com:8000`;
        try {
            const response1 = await request({
                url: 'https://api.apify.com/v2/browser-info',
                proxy: proxyUrl,
            });
            const response2 = await request({
                url: 'https://api.apify.com/v2/browser-info',
                proxy: proxyUrl,
            });
            console.log(response1.clientIp);
            console.log('should be the same as');
            console.log(response2.clientIp);
        } catch (e) {
            console.error(e);
        }
    }
    main();

Use randomly choose IP selected from `SHADER` and `BUYPROXIES94952` proxy groups for two requests.

    const request = require('request-promise');

    async function main() {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-SHADER+BUYPROXIES94952:${password}@proxy.apify.com:8000`;
        try {
            const response1 = await request({
                url: 'https://api.apify.com/v2/browser-info',
                proxy: proxyUrl,
            });
            const response2 = await request({
                url: 'https://api.apify.com/v2/browser-info',
                proxy: proxyUrl,
            });
            console.log(response1.clientIp);
            console.log('should be different than');
            console.log(response2.clientIp);
        } catch (e) {
            console.error(e);
        }
    }
    main();
