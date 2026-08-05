import * as cheerio from 'cheerio';

function parseDimensions(text) {
  const match = text.match(/(\d+)x(\d+)x(\d+)\s*cm\s*$/);
  if (match) {
    return {
      width: parseInt(match[1], 10),
      depth: parseInt(match[2], 10),
      height: parseInt(match[3], 10),
    };
  }
  return { width: null, depth: null, height: null };
}

const url = 'https://www.ikea.com/se/en/cat/storage-solution-systems-46052/';
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const html = await response.text();
const $ = cheerio.load(html);

for (const element of $('.plp-mastercard').toArray()) {
  const $productCard = $(element);

  const $title = $productCard.find('.plp-price-module__product-name');
  const title = $title.text().trim();

  const descriptionText = $productCard.find('.plp-text').text();
  const dimensions = parseDimensions(descriptionText);

  console.log(`${title} | w ${dimensions.width} | d ${dimensions.depth} | h ${dimensions.height}`);
}
