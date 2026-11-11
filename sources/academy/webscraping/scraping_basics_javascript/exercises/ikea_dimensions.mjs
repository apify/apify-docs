import * as cheerio from 'cheerio';

function parseDimensions(text) {
  const words = text.trim().split(' ');
  if (words.at(-1) === 'cm') {
    const dimensions = words.at(-2).split('x');
    if (dimensions.length === 3) {
      return dimensions;
    }
  }
  return null;
}

const url = 'https://www.ikea.com/se/en/cat/jonaxel-system-45730/';
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const html = await response.text();
const $ = cheerio.load(html);

for (const element of $('.plp-mastercard').toArray()) {
  const $productCard = $(element);

  const descriptionText = $productCard.find('.plp-text').text();
  const dimensions = parseDimensions(descriptionText);
  if (dimensions) {
    const price = $productCard.find('.plp-price__integer').text().replaceAll(' ', '').trim();
    console.log(`${dimensions.join(' | ')} ... ${price} SEK`);
  }
}
