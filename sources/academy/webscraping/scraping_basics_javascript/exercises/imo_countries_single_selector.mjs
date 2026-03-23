import * as cheerio from 'cheerio';

const url = 'https://www.imo.org/en/ourwork/ero/pages/memberstates.aspx';
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const html = await response.text();
const $ = cheerio.load(html);

for (const element of $('.content table tr td:nth-child(odd)').toArray()) {
  const name = $(element).text().trim();
  if (name) {
    console.log(name);
  }
}
