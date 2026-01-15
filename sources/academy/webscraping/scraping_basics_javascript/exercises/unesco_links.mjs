import * as cheerio from 'cheerio';

const listingUrl = 'https://www.unesco.org/en/countries';
const response = await fetch(listingUrl);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const html = await response.text();
const $ = cheerio.load(html);

for (const element of $('.node--type-country').toArray()) {
  const $link = $(element).find('a').first();
  const url = new URL($link.attr('href'), listingUrl).href;
  console.log(url);
}
