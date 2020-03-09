---
title: NodeJS Examples
description: Documentation of Apify Proxy that enables anonymization of access to websites and IP rotation.
---

# [](#nodejs-examples)NodeJS Examples

The following sections contain several examples of how to use Google SERP proxy in [actors]({{@link actor.md}}).

## Usage in [PuppeteerCrawler](https://sdk.apify.com/docs/api/puppeteer-crawler)

Get a list of results from the US for keyword `wikipedia` and parse them through cheerio

    const Apify = require('apify');

    Apify.main(async() => {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-GOOGLE_SERP:${password}@localhost:8000`;
        const url = 'http://www.google.com/search?q=wikipedia';

        const requestList = new Apify.RequestList({
            sources: [{ url }],
        });
        await requestList.initialize(); // Load requests.

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            launchPuppeteerOptions: {
                headless: true,
                proxyUrl,
            },
            gotoFunction: async({ page, request }) => {
                await page.setRequestInterception(true);
                page.on('request', request => {
                    if (request.resourceType() !== 'document') return request.abort();
                    return request.continue();
                });
                return page.goto(url, { waitUntil: 'domcontentloaded' });
            },
            handlePageFunction: async({ page, request }) => {
                await Apify.utils.puppeteer.injectJQuery(page);
                const searchResults = await page.evaluate(() => {
                    return $('[class$="list-result"] div div:nth-child(2) ').map(function() {
                        const title = $(this).find('a[jsaction="spop.c"]')[0];
                        return {
                            title: $(title).text(),
                            url: $(title).attr('href'),
                            price: $(this).find('div:nth-child(2)').text(),
                        }
                    }).toArray();
                });
                console.log(searchResults);
            },
            handleFailedRequestFunction: async({ request }) => {
                console.error(request.errorMessages);
            },
        });

        await crawler.run();
    });

Get a list of shopping results from the Czech Republic for keyword `Apple iPhone XS 64GB` and parse them through cheerio

    const Apify = require('apify');

    Apify.main(async() => {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-GOOGLE_SERP:${password}@localhost:8000`;
        const url = 'http://www.google.cz/search?q=Apple+iPhone+XS+64GB&tbm=shop';

        const requestList = new Apify.RequestList({
            sources: [{ url }],
        });
        await requestList.initialize(); // Load requests.

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            launchPuppeteerOptions: {
                headless: true,
                proxyUrl,
            },
            gotoFunction: async({ page, request }) => {
                await page.setRequestInterception(true);
                page.on('request', request => {
                    if (request.resourceType() !== 'document') return request.abort();
                    return request.continue();
                });
                return page.goto(url, { waitUntil: 'domcontentloaded' });
            },
            handlePageFunction: async({ page, request }) => {
                await Apify.utils.puppeteer.injectJQuery(page);
                const searchResults = await page.evaluate(() => {
                    return $('[class$="list-result"] > div > div:nth-child(2)').map(function() {
                        const title = $(this).find('a[jsaction="spop.c"]')[0];
                        return {
                            title: $(title).text(),
                            price: $(this).find('div:nth-child(2) > div:nth-child(1)').text(),
                        }
                    }).toArray();
                });
                console.log(searchResults);
            },
            handleFailedRequestFunction: async({ request }) => {
                console.error(request.errorMessages);
            },
        });

        await crawler.run();
    });

## Usage in [Apify.launchPuppeteer()](https://sdk.apify.com/docs/api/apify#apifylaunchpuppeteeroptions)

Get a list of results from the US for keyword `wikipedia` and parse them through cheerio

    const Apify = require('apify');

    Apify.main(async() => {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-GOOGLE_SERP:${password}@localhost:8000`;
        const url = 'http://www.google.com/search?q=wikipedia';

        try {
            const browser = await Apify.launchPuppeteer({
                headless: true,
                proxyUrl,
            });
            const page = await browser.newPage();
            await page.setRequestInterception(true);
            page.on('request', request => {
                if (request.resourceType() !== 'document') return request.abort();
                return request.continue();
            });
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            await Apify.utils.puppeteer.injectJQuery(page);
            const searchResults = await page.evaluate(() => {
                return $('[class$="list-result"] div div:nth-child(2) ').map(function() {
                    const title = $(this).find('a[jsaction="spop.c"]')[0];
                    return {
                        title: $(title).text(),
                        url: $(title).attr('href'),
                        price: $(this).find('div:nth-child(2)').text(),
                    }
                }).toArray();
            });
            console.log(searchResults);
            await page.close();
            await browser.close();
        } catch (error) {
            console.error(error.message());
        }
    });

Get a list of shopping results from the Czech Republic for keyword `Apple iPhone XS 64GB` and parse them through cheerio

    const Apify = require('apify');

    Apify.main(async() => {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-GOOGLE_SERP:${password}@localhost:8000`;
        const url = 'http://www.google.cz/search?q=Apple+iPhone+XS+64GB&tbm=shop';

        try {
            const browser = await Apify.launchPuppeteer({
                headless: true,
                proxyUrl,
            });
            const page = await browser.newPage();
            await page.setRequestInterception(true);
            page.on('request', request => {
                if (request.resourceType() !== 'document') return request.abort();
                return request.continue();
            });
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            await Apify.utils.puppeteer.injectJQuery(page);
            const searchResults = await page.evaluate(() => {
                return $('[class$="list-result"] > div > div:nth-child(2)').map(function() {
                    const title = $(this).find('a[jsaction="spop.c"]')[0];
                    return {
                        title: $(title).text(),
                        price: $(this).find('div:nth-child(2) > div:nth-child(1)').text(),
                    }
                }).toArray();
            });
            console.log(searchResults);
            await page.close();
            await browser.close();
        } catch (error) {
            console.error(error.message());
        }
    });

## Usage with [request-promise](https://www.npmjs.com/package/request-promise) and [cheerio](https://www.npmjs.com/package/cheerio) NPM packages

Get a list of results from the US for keyword `wikipedia` and parse them through cheerio

    const request = require('request-promise');
    const cheerio = require('cheerio');

    async function main() {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-GOOGLE_SERP:${password}>@proxy.apify.com:8000`;
        const html = await request({ url: 'http://www.google.com/search?q=wikipedia', proxy: proxyUrl });
        const $ = cheerio.load(html);
        const searchResults = $('#search div.g').map(function() {
            return {
                title: $($(this).find('h3')[0]).text(),
                url: $(this).find('div cite').text(),
                description: $(this).find('.s div .st').text(),
            }
        }).toArray();
        console.log(searchResults);
    }

    main();

Get a list of shopping results from the Czech Republic for query `Apple iPhone XS 64GB` and parse them through cheerio

    const request = require('request-promise');
    const cheerio = require('cheerio');

    async function main() {
        const password = process.env.APIFY_PROXY_PASSWORD;
        const proxyUrl = `http://groups-GOOGLE_SERP:${password}>@proxy.apify.com:8000`;
        const query = encodeURI('Apple iPhone XS 64GB');

        try {
            const html = await request({
                url: `http://www.google.cz/search?tbm=shop&q=${query}`,
                proxy: proxyUrl,
            });
            const $ = cheerio.load(html);
            const searchResults = $('[class$="list-result"] > div > div:nth-child(2) ').map(function() {
                const title = $(this).find('a[jsaction="spop.c"]')[0];
                return {
                    title: $(title).text(),
                    price: $(this).find('div:nth-child(2)').text(),
                }
            }).toArray();
            console.log(searchResults);
        } catch (error) {
            console.error(error.message)
        }
    }

    main();

