import * as cheerio from 'cheerio';

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const html = await response.text();
  return cheerio.load(html);
}

const listingUrl = 'https://github.com/topics/llm?l=javascript&s=stars';
const $ = await download(listingUrl);

const promises = $('article').toArray().map(async (element) => {
  const $card = $(element);
  const $link = $card.find('h3 a:nth-child(1)').first();

  const url = new URL($link.attr('href'), listingUrl).href;
  const name = $link.text().trim();
  const description = $card.find('p').text().trim();

  const starsText = $card.find('#repo-stars-counter-star').first().attr("aria-label");
  const stars = parseInt(starsText.split(' ')[0], 10);

  const updatedAt = $card.find('relative-time').attr('datetime');
  const updatedOn = updatedAt.split('T')[0];

  return { name, url, description, stars, updatedOn };
});

const data = (await Promise.all(promises)).filter((item) => item);
console.log(data.slice(0, 5));
