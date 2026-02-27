import * as cheerio from 'cheerio';

const url = 'https://www.theguardian.com/sport/formulaone';
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const html = await response.text();
const $ = cheerio.load(html);

for (const element of $('#maincontent ul li').toArray()) {
  const $article = $(element);
  const title = $article.find('h3').text().trim();
  const dateAttr = $article.find('time').attr('datetime');

  if (!title || !dateAttr) {
    continue;
  }

  const date = new Date(dateAttr.trim());
  if (Number.isNaN(date.getTime())) {
    continue;
  }

  console.log(`${title} | ${date.toDateString()}`);
}
