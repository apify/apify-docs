---
title: NodeJS Examples
description: Documentation of Apify Proxy that enables anonymization of access to websites and IP rotation.
paths:
    - proxy/datacenter-proxy/nodejs-examples
---

# [](#nodejs-examples)NodeJS Examples

The following sections contain several examples of how to use Apify Proxy in NodeJS (used as the default language in [actors]({{@link actors.md}})).

## [](#usage-in-puppeteer-crawler)Usage in [PuppeteerCrawler](https://sdk.apify.com/docs/api/puppeteer-crawler)

Use default functionality of Apify Proxy (randomly choose a proxy server from all available)

    const Apify = require('apify');

    Apify.main(async () => {
        const requestList = new Apify.RequestList({ sources: [{ url: 'http://www.example.com' }] });
        await requestList.initialize();
        const proxyConfiguration = await Apify.createProxyConfiguration();

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            proxyConfiguration,
            handlePageFunction: async ({ page, request, proxyInfo }) => {
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
        const proxyConfiguration = await Apify.createProxyConfiguration({
            // if you need to use more then one group
            // simply add the additional ID's to the array below
            groups: ['SHADER'],
        });

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            proxyConfiguration,
            handlePageFunction: async ({ page, request, proxyInfo }) => {
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
        const proxyConfiguration = await Apify.createProxyConfiguration({
            // if you need to use more then one group
            // simply add the additional ID's to the array below
            groups: ['SHADER'],
        });

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            proxyConfiguration,
            useSessionPool: true,
            sessionPoolOptions: {
                sessionOptions: { maxPoolSize: 1 },
            },
            handlePageFunction: async ({ page, request, proxyInfo }) => {
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
        const proxyConfiguration = await Apify.createProxyConfiguration({
            // if you need to use more then one group
            // simply add the additional ID's to the array below
            groups: ['SHADER'],
        });

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            proxyConfiguration,
            useSessionPool: true,
            handlePageFunction: async ({ page, request, proxyInfo }) => {
                return Apify.pushData({ title: await page.title() });
            },
            handleFailedRequestFunction: ({ request }) => {
                console.error('Request failed', request.url, request.errorMessages);
            },
        });

        await crawler.run();
    });

## [](#usage-in-apify-launchPuppeteer) Usage in [Apify.launchPuppeteer()](https://sdk.apify.com/docs/api/apify#apifylaunchpuppeteeroptions)

Use one IP chosen from `SHADER` and `BUYPROXIES94952` proxy groups for the browser instance

    const Apify = require('apify');

    Apify.main(async () => {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyConfiguration = await Apify.createProxyConfiguration({
            password,
            // if you need to use more then one group
            // simply add the additional ID's to the array below
            groups: ['SHADER', 'BUYPROXIES94952'],
        });

        const browser = await Apify.launchPuppeteer({
            proxyUrl: proxyConfiguration.getUrl('my_session');
        });

        const page = await browser.newPage();

        await page.goto('http://www.example.com');

        const html = await page.content();

        console.log('HTML:');
        console.log(html);
    });

## [](#usage-with-request) Usage with our [requestAsBrowser](https://sdk.apify.com/docs/api/utils#utilsrequestasbrowseroptions)

Use one randomly selected IP from all available proxy servers.

    const Apify = require('apify');

        Apify.main(async () => {
            const password = process.env.APIFY_PROXY_PASSWORD;
            const proxyConfiguration = await Apify.createProxyConfiguration({ password });
            try {
                const { body } = await Apify.utils.requestAsBrowser({
                    url: 'https://www.example.com',
                    proxyUrl: proxyConfiguration.getUrl(),
                });
                console.log(body); // returns HTML of returned page
            } catch (e) {
                console.error(e);
            }
        });


Use one IP selected from `SHADER` proxy group for two requests.

    const Apify = require('apify');

        Apify.main(async () => {
            const password = process.env.APIFY_PROXY_PASSWORD;
            const proxyConfiguration = await Apify.createProxyConfiguration({
                password,
                groups: ['SHADER']
            });
            const proxyUrl = proxyConfiguration.getUrl('my_session');

            try {
                const response1 = await Apify.utils.requestAsBrowser({
                    url: 'https://api.apify.com/v2/browser-info',
                    proxyUrl,
                    json: true
                });
                const response2 = await Apify.utils.requestAsBrowser({
                    url: 'https://api.apify.com/v2/browser-info',
                    proxyUrl,
                    json: true
                });
                console.log(response1.body.clientIp);
                console.log('should be the same as');
                console.log(response2.body.clientIp);
            } catch (e) {
                console.error(e);
            }
        });

Use randomly choose IP selected from `SHADER` and `BUYPROXIES94952` proxy groups for two requests.

    const Apify = require('apify');

            Apify.main(async () => {
                const password = process.env.APIFY_PROXY_PASSWORD;
                const proxyConfiguration = await Apify.createProxyConfiguration({
                    password,
                    groups: ['SHADER', 'BUYPROXIES94952']
                });
                const proxyUrl = proxyConfiguration.getUrl();
                const url = 'https://api.apify.com/v2/browser-info';

                try {
                    const response1 = await Apify.utils.requestAsBrowser({
                        url,
                        proxyUrl,
                        json: true
                    });
                    const response2 = await Apify.utils.requestAsBrowser({
                        url,
                        proxyUrl,
                        json: true
                    });
                    console.log(response1.body.clientIp);
                    console.log('should be the same as');
                    console.log(response2.body.clientIp);
                } catch (e) {
                    console.error(e);
                }
            });

