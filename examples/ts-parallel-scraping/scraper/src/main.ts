import { Actor } from 'apify';
import { CheerioCrawler } from 'crawlee';

interface Input {
    requestQueueId: string;
    datasetId: string;
}

await Actor.init();

const {
    requestQueueId,
    datasetId,
} = await Actor.getInput<Input>() ?? {} as Input;

const requestQueue = await Actor.openRequestQueue(requestQueueId);
const dataset = await Actor.openDataset(datasetId);

const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new CheerioCrawler({
    proxyConfiguration,
    requestQueue,
    requestHandler: async ({ enqueueLinks, request, $, log }) => {
        log.info('Processing page', { url: request.url });
        const newPages = await enqueueLinks({
            selector: 'a[href]',
        });
        log.info(`Enqueued ${newPages.processedRequests.length} new pages.`);
        // If the product page is loaded, save the title and URL to the Dataset.
        if (request?.loadedUrl?.includes('/products/')) {
            const title = $('title').text();
            await dataset.pushData({ url: request.loadedUrl, title });
        }
    },
});

await crawler.run(['https://warehouse-theme-metal.myshopify.com/']);

// Gracefully exit the Actor process. It's recommended to quit all Actors with an exit()
await Actor.exit();
