import { PuppeteerCrawler, Dataset } from 'crawlee';

const cache = {};

const crawler = new PuppeteerCrawler({
    preNavigationHooks: [async ({ page }) => {
        await page.setRequestInterception(true);

        page.on('request', async (request) => {
            const url = request.url();
            if (cache[url] && cache[url].expires > Date.now()) {
                await request.respond(cache[url]);
                return;
            }
            request.continue();
        });

        page.on('response', async (response) => {
            const url = response.url();
            const headers = response.headers();
            const cacheControl = headers['cache-control'] || '';
            const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
            const maxAge = maxAgeMatch && maxAgeMatch.length > 1 ? parseInt(maxAgeMatch[1], 10) : 0;

            if (maxAge) {
                if (!cache[url] || cache[url].expires > Date.now()) return;

                let buffer;
                try {
                    buffer = await response.buffer();
                } catch {
                    // some responses do not contain buffer and do not need to be cached
                    return;
                }

                cache[url] = {
                    status: response.status(),
                    headers: response.headers(),
                    body: buffer,
                    expires: Date.now() + maxAge * 1000,
                };
            }
        });
    }],
    requestHandler: async ({ page, request }) => {
        await Dataset.pushData({
            title: await page.title(),
            url: request.url,
            succeeded: true,
        });
    },
});

await crawler.run(['https://apify.com/store', 'https://apify.com']);
