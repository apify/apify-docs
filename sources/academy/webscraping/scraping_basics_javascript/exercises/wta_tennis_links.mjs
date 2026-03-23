import * as cheerio from 'cheerio';

const listingUrl = 'https://www.wtatennis.com/rankings/singles';
const response = await fetch(listingUrl);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const html = await response.text();
const $ = cheerio.load(html);

for (const element of $('.rankings__list .player-row-drawer__link').toArray()) {
  const playerUrlRelative = $(element).attr('href');
  const playerUrl = new URL(playerUrlRelative, listingUrl).href;
  console.log(playerUrl);
}
