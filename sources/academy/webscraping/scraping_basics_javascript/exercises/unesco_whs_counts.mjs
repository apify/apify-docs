import * as cheerio from 'cheerio';

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const html = await response.text();
  return cheerio.load(html);
}

function parseWhsCount($) {
  for (const element of $('.card-body').toArray()) {
    const $infoCard = $(element);
    const title = $infoCard.find('.card-title').text();

    if (title.includes('World Heritage Sites')) {
      const number = $infoCard.find('.card-number').text().trim();
      return Number.parseInt(number, 10);
    }
  }
  return 0;
}

const listingUrl = 'https://www.unesco.org/en/countries';
const $listing = await download(listingUrl);
const countries = $listing('.node--type-country').toArray();

for (const element of countries.slice(0, 10)) {
  const $countryCard = $listing(element);
  const $link = $countryCard.find('a').first();
  const href = $link.attr('href');

  if (!href) {
    continue;
  }

  const countryUrl = new URL(href, listingUrl).href;
  const $country = await download(countryUrl);
  const whsCount = parseWhsCount($country);
  console.log(`${countryUrl} ${whsCount}`);
}
