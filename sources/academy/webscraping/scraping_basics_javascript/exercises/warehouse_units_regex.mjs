import * as cheerio from 'cheerio';

function parseUnitsText(text) {
  const match = text.match(/\d+/);
  if (match) {
    return Number.parseInt(match[0], 10);
  }
  return 0;
}

const url = 'https://warehouse-theme-metal.myshopify.com/collections/sales';
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const html = await response.text();
const $ = cheerio.load(html);

for (const element of $('.product-item').toArray()) {
  const $productItem = $(element);

  const $title = $productItem.find('.product-item__title');
  const title = $title.text().trim();

  const unitsText = $productItem.find('.product-item__inventory').text();
  const unitsCount = parseUnitsText(unitsText);

  console.log(`${title} | ${unitsCount}`);
}
