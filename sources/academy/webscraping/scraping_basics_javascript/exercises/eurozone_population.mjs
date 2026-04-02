import * as cheerio from 'cheerio';

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const html = await response.text();
  return cheerio.load(html);
}

function parsePopulation($) {
  for (const element of $('li').toArray()) {
    const text = $(element).text();
    if (text.includes('Population')) {
      const digits = text
        .replace('Population:', '')
        .replaceAll(' ', '');
      return Number.parseInt(digits, 10);
    }
  }
  throw new Error('Population not found');
}

const listingUrl = 'https://european-union.europa.eu/institutions-law-budget/euro/countries-using-euro_en';
const $ = await download(listingUrl);

const $euroCountriesAccordion = $('.ecl-accordion__item').first();
const $countryLinks = $euroCountriesAccordion.find('li a');

const promises = $countryLinks.toArray().map(async (element) => {
  const countryUrl = new URL($(element).attr('href'), listingUrl).href;
  const $country = await download(countryUrl);
  return parsePopulation($country);
});

const populations = await Promise.all(promises);
const totalPopulation = populations
  .filter((population) => Number.isInteger(population))
  .reduce((sum, population) => sum + population, 0);

console.log(totalPopulation);
