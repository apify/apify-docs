import { Dataset, PuppeteerCrawler, RequestList } from 'crawlee';

const requestList = await RequestList.open(null, [{
    requestsFromUrl: 'https://www.brewbound.com/sitemap.xml',
    regex: /http(s)?:\/\/www\.brewbound\.com\/breweries\/[^/<]+\/[^/<]+/gm,
}]);

const crawler = new PuppeteerCrawler({
    requestList,
    async requestHandler({ page }) {
        const beerPage = await page.evaluate(() => {
            return document.getElementsByClassName('productreviews').length;
        });
        if (!beerPage) return;

        const data = await page.evaluate(() => {
            const title = document.getElementsByTagName('h1')[0].innerText;
            const [brewery, beer] = title.split(':');
            const description = document.getElementsByClassName('productreviews')[0].innerText;

            return { brewery, beer, description };
        });

        await Dataset.pushData(data);
    },
});

await crawler.run();
