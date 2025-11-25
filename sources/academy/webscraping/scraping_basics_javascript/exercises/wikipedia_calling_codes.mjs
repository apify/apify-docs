import * as cheerio from 'cheerio';

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const html = await response.text();
  return cheerio.load(html);
}

const listingUrl = 'https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_Africa';
const $ = await download(listingUrl);

const cells = $('.wikitable tr td:nth-child(3)');
const promises = cells.toArray().map(async element => {
  const $nameCell = $(element);
  const $link = $nameCell.find('a').first();
  if (!$link.length) {
    return;
  }

  const countryUrl = new URL($link.attr('href'), listingUrl).href;
  const $country = await download(countryUrl);
  const $label = $country('th.infobox-label')
    .filter((_, el) => $country(el).text().trim() === 'Calling code')
    .first();

  const callingCode = $label.length
    ? $label.parent().find('td.infobox-data').first().text().trim()
    : '';

  console.log(`${countryUrl} ${callingCode || null}`);
});

await Promise.all(promises);
