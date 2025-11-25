import * as cheerio from 'cheerio';

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const html = await response.text();
  return cheerio.load(html);
}

const listingUrl = 'https://edition.cnn.com/sport';
const $ = await download(listingUrl);

const results = await Promise.all(
  $('.layout__main .card').toArray().map(async (element) => {
    const $element = $(element);
    const $link = $element.find('a').first();
    if (!$link.length) {
      return null;
    }

    const articleUrl = new URL($link.attr('href'), listingUrl).href;
    const $article = await download(articleUrl);
    const content = $article('.article__content').text().trim();

    if (!content) {
      return null;
    }

    return { url: articleUrl, length: content.length };
  }),
);

const nonEmpty = results.filter((item) => item && item.length > 0);
nonEmpty.sort((a, b) => a.length - b.length);

if (nonEmpty.length > 0) {
  console.log(nonEmpty[0].url);
}
