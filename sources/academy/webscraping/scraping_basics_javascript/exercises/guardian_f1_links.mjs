import * as cheerio from 'cheerio';

const listingUrl = 'https://www.theguardian.com/sport/formulaone';
const response = await fetch(listingUrl);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const html = await response.text();
const $ = cheerio.load(html);

for (const element of $('#maincontent ul li').toArray()) {
  const $item = $(element);
  const $link = $item.find('a').first();
  if ($link.length) {
    const url = new URL($link.attr('href'), listingUrl).href;
    console.log(url);
  }
}
