import { escape } from 'node:querystring';

import { CheerioCrawler, Request } from 'crawlee';

const crawler = new CheerioCrawler();

crawler.router.addDefaultHandler(async ({ $, addRequests }) => {
  const buttons = $("[data-uia='top10-table-row-title'] button").toArray().slice(0, 5);
  const requests = buttons.map((buttonElement) => {
    const name = $(buttonElement).text().trim();
    const imdbSearchUrl = `https://www.imdb.com/find/?q=${escape(name)}&s=tt&ttype=ft`;
    return new Request({ url: imdbSearchUrl, label: 'IMDB_SEARCH' });
  });
  await addRequests(requests);
});

crawler.router.addHandler('IMDB_SEARCH', async ({ enqueueLinks }) => {
  await enqueueLinks({ selector: '.ipc-title-link-wrapper', label: 'IMDB', limit: 1 });
});

crawler.router.addHandler('IMDB', async ({ $, request, pushData }) => {
  const title = $('h1').text().trim();
  const score = $("[data-testid='hero-rating-bar__aggregate-rating__score']").first().text().trim();

  if (title && score) {
    await pushData({
      url: request.url,
      title,
      rating: score,
    });
  }
});

await crawler.run(['https://www.netflix.com/tudum/top10']);
await crawler.exportData('dataset.json');
