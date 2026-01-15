import * as cheerio from 'cheerio';

const listingUrl = 'https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_Africa';
const response = await fetch(listingUrl);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const html = await response.text();
const $ = cheerio.load(html);

for (const element of $('.wikitable tr td:nth-child(3)').toArray()) {
  const $nameCell = $(element);
  const $link = $nameCell.find('a').first();
  if ($link.length) {
    const url = new URL($link.attr('href'), listingUrl).href;
    console.log(url);
  }
}
