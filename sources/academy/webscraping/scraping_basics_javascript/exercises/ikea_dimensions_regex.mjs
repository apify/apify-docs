import * as cheerio from 'cheerio';

function parseDimensions(text) {
  const match = text.match(/(\d+)x(\d+)x(\d+) cm/);
  if (match) {
    return [match[1], match[2], match[3]];
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
