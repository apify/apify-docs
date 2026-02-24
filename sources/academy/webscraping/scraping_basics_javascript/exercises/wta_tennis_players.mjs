import * as cheerio from 'cheerio';

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const html = await response.text();
  return cheerio.load(html);
}

const listingUrl = 'https://www.wtatennis.com/rankings/singles';
const $listing = await download(listingUrl);
const playerLinks = $listing('.rankings__list .player-row-drawer__link').toArray();

for (const element of playerLinks.slice(0, 5)) {
  const playerUrlRelative = $listing(element).attr('href');
  const playerUrl = new URL(playerUrlRelative, listingUrl).href;
  const $player = await download(playerUrl);

  for (const infoBlock of $player('.profile-bio__info-block').toArray()) {
    const $infoBlock = $player(infoBlock);
    const label = $infoBlock.find('h2').text().trim().toLowerCase();
    if (label === 'birthplace') {
      const birthplace = $infoBlock.find('span').text().trim();
      console.log(`${playerUrl} | ${birthplace}`);
      break;
    }
  }
}
