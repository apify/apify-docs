import * as cheerio from 'cheerio';

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const html = await response.text();
  return cheerio.load(html);
}

function parseNumber(text) {
  return Number.parseInt(text.replace(/[^0-9]/g, ''), 10);
}

const listingUrl = 'https://www.npmjs.com/search?page=0&q=keywords%3Allm&sortBy=dependent_count';
const $ = await download(listingUrl);

const promises = $('section').toArray().map(async (element) => {
  const $card = $(element);
  const $link = $card.find('a').first();
  if (!$link.length) {
    return null;
  }

  const details = $card
    .children()
    .first()
    .children()
    .last()
    .text()
    .split('•')
    .map((item) => item.trim());

  const updatedText = details[2] ?? '';
  const dependentsText = details[3] ?? '';
  const dependents = parseNumber(dependentsText);

  if (updatedText.includes('years ago')) {
    const yearsAgo = parseNumber(updatedText);
    if (Number.isFinite(yearsAgo) && yearsAgo > 2) {
      return null;
    }
  }

  const name = $link.text().trim();
  const url = new URL($link.attr('href'), listingUrl).href;
  const description = $card.find('p').text().trim();

  const downloadsText = $card
    .children()
    .last()
    .text()
    .trim();
  const downloads = parseNumber(downloadsText);

  return { name, url, description, dependents, downloads };
});

const data = (await Promise.all(promises)).filter((item) => item);
console.log(data.slice(0, 5));
