import { PuppeteerCrawler, Dataset } from 'crawlee';

const BASE_URL = 'https://demo-webstore.apify.org';

const crawler = new PuppeteerCrawler({
    requestHandler: async ({ parseWithCheerio, infiniteScroll }) => {
        // Add the utility function
        await infiniteScroll();

        const $ = await parseWithCheerio();

        const products = $('a[href*="/product/"]');

        const results = [...products].map((product) => {
            const elem = $(product);

            const title = elem.find('h3').text();
            const price = elem.find('div[class*="price"]').text();
            const image = elem.find('img[src]').attr('src');

            return {
                title,
                price,
                image: new URL(image, BASE_URL).href,
            };
        });

        // Push our results to the dataset
        await Dataset.pushData(results);
    },
});

await crawler.run([{ url: 'https://demo-webstore.apify.org/search/new-arrivals' }]);
