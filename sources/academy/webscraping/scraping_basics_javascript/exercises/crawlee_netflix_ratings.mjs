import { escape } from 'node:querystring';

import { CheerioCrawler, Request } from 'crawlee';

const crawler = new CheerioCrawler({
  async requestHandler({ $, request, enqueueLinks, pushData, addRequests }) {
    if (request.label === 'IMDB') {
      const title = $('h1').text().trim();
      const rating = $("[data-testid='hero-rating-bar__aggregate-rating__score']").first().text().trim();
      if (title && rating) {
        await pushData({
          url: request.url,
          title,
          rating,
        });
      }
    } else if (request.label === 'IMDB_SEARCH') {
      await enqueueLinks({ selector: '.ipc-title-link-wrapper', label: 'IMDB', limit: 1 });
    } else {
      const buttons = $("[data-uia='top10-table-row-title'] button").toArray().slice(0, 5);
      const requests = buttons.map((buttonElement) => {
        const name = $(buttonElement).text().trim();
        const imdbSearchUrl = `https://www.imdb.com/find/?q=${escape(name)}&s=tt&ttype=ft`;
        return new Request({ url: imdbSearchUrl, label: 'IMDB_SEARCH' });
      });
      await addRequests(requests);
    }
  },
});

await crawler.run(['https://www.netflix.com/tudum/top10']);
await crawler.exportData('dataset.json');
