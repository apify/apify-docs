import { CheerioCrawler, ProxyConfiguration, log } from 'crawlee';
import { router } from './routes.js';
import { LABELS, BASE_URL } from './consts.js';
import { getProxyUrl } from './utils.js';

interface CrawlerState {
    export interface FilterState {
        filterCache: FilterCache;
        fullTotal: number;
    }
    
}

// TODO:
// 1. Range filters going to trap
// 2. Most are incomplete

const crawler = new CheerioCrawler({
    // Adjust the proxy settings to your needs
    proxyConfiguration: new ProxyConfiguration({ proxyUrls: [getProxyUrl()] }),
    requestHandler: router,
});

const slugsObj = await crawler.useState<Record<string, boolean>>({});
const logInterval = setInterval(() => {
    log.info(`Unique URLs: ${Object.keys(slugsObj).length}`);
}, 60_000);

// We start with top level URL that will return us all facets in full
await crawler.run([{
    url: BASE_URL,
    label: LABELS.SEARCH,
    userData: { isFirstPage: true, },
}]);

clearInterval(logInterval);
