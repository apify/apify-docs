---
title: NodeJS Examples
description: Learn how to connect to Google SERP proxies from your application using Node.js code examples. Configure proxy locations and reduce blocking when web scraping.
paths:
    - proxy/google-serp-proxy/nodejs-examples
---

# [](#nodejs-examples)NodeJS Examples

The following sections contain several examples of how to use Google SERP proxy in [actors]({{@link actors.md}}).

## [](#usage-in-puppeteer-crawler) Usage in [PuppeteerCrawler](https://sdk.apify.com/docs/api/puppeteer-crawler)

Get a list of results from the US for keyword `wikipedia` and parse them through cheerio

    const Apify = require('apify');

    Apify.main(async() => {
        const proxyConfiguration = await Apify.createProxyConfiguration({
            groups: ['GOOGLE_SERP'],
        });
        const url = 'http://www.google.com/search?q=wikipedia';

        const requestList = await Apify.openRequestList('my-list', [url]);

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            proxyConfiguration,
            gotoFunction: async({ page, request }) => {
                await page.setRequestInterception(true);
                page.on('request', request => {
                    if (request.resourceType() !== 'document') return request.abort();
                    return request.continue();
                });
                return page.goto(url);
            },
            handlePageFunction: async({ page, request, proxyInfo }) => {
                await Apify.utils.puppeteer.injectJQuery(page);
                const searchResults = await page.evaluate(() => {
                    return $('#search div.g').map(function () {
                        return {
                            title: $($(this).find('h3')[0]).text(),
                            description: $(this).find('.s div .st').text(),
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
        const proxyConfiguration = await Apify.createProxyConfiguration({
            groups: ['GOOGLE_SERP'],
        });
        const url = 'http://www.google.cz/search?q=Apple+iPhone+XS+64GB&tbm=shop';

        const requestList = await Apify.openRequestList('my-list', [url]);

        const crawler = new Apify.PuppeteerCrawler({
            requestList,
            proxyConfiguration,
            gotoFunction: async({ page, request }) => {
                await page.setRequestInterception(true);
                page.on('request', request => {
                    if (request.resourceType() !== 'document') return request.abort();
                    return request.continue();
                });
                return page.goto(url);
            },
            handlePageFunction: async({ page, request, proxyInfo }) => {
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

## [](#usage-in-apify-launchPuppeteer) Usage in [Apify.launchPuppeteer()](https://sdk.apify.com/docs/api/apify#apifylaunchpuppeteeroptions)

Get a list of results from the US for keyword `wikipedia` and parse them through cheerio

    const Apify = require('apify');

    Apify.main(async () => {
        const proxyConfiguration = await Apify.createProxyConfiguration({
            groups: ['GOOGLE_SERP'],
        });
        const proxyUrl = proxyConfiguration.newUrl();
        const url = 'http://www.google.com/search?q=wikipedia';

        try {
            const browser = await Apify.launchPuppeteer({
                proxyUrl,
            });
            const page = await browser.newPage();
            await page.setRequestInterception(true);
            page.on('request', request => {
                if (request.resourceType() !== 'document') return request.abort();
                return request.continue();
            });
            await page.goto(url);
            await Apify.utils.puppeteer.injectJQuery(page);
            const searchResults = await page.evaluate(() => {
                return $('#search div.g').map(function () {
                    return {
                        title: $($(this).find('h3')[0]).text(),
                        description: $(this).find('.s div .st').text(),
                    }
                }).toArray();
            });
            console.log(searchResults);
            await page.close();
            await browser.close();
        } catch (error) {
            console.error(error.message);
        }
    });

Get a list of shopping results from the Czech Republic for keyword `Apple iPhone XS 64GB` and parse them through cheerio

    const Apify = require('apify');

    Apify.main(async() => {
        const proxyConfiguration = await Apify.createProxyConfiguration({
            groups: ['GOOGLE_SERP'],
        });
        const proxyUrl = proxyConfiguration.newUrl();
        const url = 'http://www.google.cz/search?q=Apple+iPhone+XS+64GB&tbm=shop';

        try {
            const browser = await Apify.launchPuppeteer({
                proxyUrl,
            });
            const page = await browser.newPage();
            await page.setRequestInterception(true);
            page.on('request', request => {
                if (request.resourceType() !== 'document') return request.abort();
                return request.continue();
            });
            await page.goto(url);
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

## [](#usage-with-request) Usage with our [requestAsBrowser](https://sdk.apify.com/docs/api/utils#utilsrequestasbrowseroptions) and [cheerio](https://www.npmjs.com/package/cheerio) NPM package

Get a list of results from the US for keyword `wikipedia` and parse them through cheerio

     const Apify = require('apify');
     const cheerio = require('cheerio');

     Apify.main(async () => {
         const proxyConfiguration = await Apify.createProxyConfiguration({
             groups: ['GOOGLE_SERP'],
         });
         const proxyUrl = proxyConfiguration.newUrl();
         const { body } = await Apify.utils.requestAsBrowser({
             url: 'http://www.google.com/search?q=wikipedia',
             proxyUrl,
         });
         const $ = cheerio.load(body);
         const searchResults = $('#search div.g').map(function() {
             return {
                 title: $($(this).find('h3')[0]).text(),
                 description: $(this).find('.s div .st').text(),
             }
         }).toArray();
         console.log(searchResults);
     });


Get a list of shopping results from the Czech Republic for query `Apple iPhone XS 64GB` and parse them through cheerio

    const Apify = require('apify');
    const cheerio = require('cheerio');

    Apify.main(async () => {
        const proxyConfiguration = await Apify.createProxyConfiguration({
            groups: ['GOOGLE_SERP'],
        });
        const proxyUrl = proxyConfiguration.newUrl();
        const query = encodeURI('Apple iPhone XS 64GB');
        try {
            const { body } = await Apify.utils.requestAsBrowser({
                url: `http://www.google.cz/search?tbm=shop&q=${query}`,
                proxyUrl,
            });
            const $ = cheerio.load(body);
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
    });



