import * as cheerio from 'cheerio';

function parseDimensions(text) {
  const words = text.trim().split(' ');
  if (words.at(-1) === 'cm') {
    const dimensions = words.at(-2).split('x');
    if (dimensions.length === 3) {
      return {
        width: dimensions[0],
        depth: dimensions[1],
        height: dimensions[2],
      };
    }
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
