import * as cheerio from 'cheerio';

const url = 'https://www.theguardian.com/sport/formulaone';
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const html = await response.text();
const $ = cheerio.load(html);

for (const element of $('#maincontent ul li h3').toArray()) {
  const title = $(element).text().trim();
  if (title) {
    console.log(title);
  }
}
