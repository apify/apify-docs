import * as cheerio from 'cheerio';

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const html = await response.text();
  return cheerio.load(html);
}

const listingUrl = 'https://www.theguardian.com/sport/formulaone';
const $ = await download(listingUrl);

const promises = $('#maincontent ul li').toArray().map(async (element) => {
  const $item = $(element);
  const $link = $item.find('a').first();
  if (!$link.length) {
    return;
  }

  const articleUrl = new URL($link.attr('href'), listingUrl).href;
  const $article = await download(articleUrl);

  const title = $article('h1').text().trim();
  if (!title) {
    return;
  }

  const author = $article('a[rel="author"]').first().text().trim();
  const attribution = author || $article('aside address').first().text().trim() || 'null';

  console.log(`${attribution}: ${title}`);
});

await Promise.all(promises);
