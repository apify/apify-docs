import { escape } from 'node:querystring';

import { CheerioCrawler, Request } from 'crawlee';

const crawler = new CheerioCrawler();

crawler.router.addDefaultHandler(async ({ $, addRequests }) => {
  const buttons = $("[data-uia='top10-table-row-title'] button").toArray().slice(0, 5);
  const requests = buttons.map((buttonElement) => {
    const name = $(buttonElement).text().trim();
    const tmdbSearchUrl = `https://www.themoviedb.org/search?query=${escape(name)}`;
    return new Request({ url: tmdbSearchUrl, label: 'TMDB_SEARCH' });
  });
  await addRequests(requests);
});

crawler.router.addHandler('TMDB_SEARCH', async ({ enqueueLinks }) => {
  await enqueueLinks({ selector: '.title a.result', label: 'TMDB', limit: 1 });
});

crawler.router.addHandler('TMDB', async ({ $, request, pushData }) => {
  const title = $('.title a').first().text().trim();
  const userScore = $('.user_score_chart').first().attr('data-percent');

  if (title && userScore) {
    await pushData({
      url: request.url,
      title,
      user_score: `${userScore}%`,
    });
  }
});

await crawler.run(['https://www.netflix.com/tudum/top10']);
await crawler.exportData('dataset.json');
