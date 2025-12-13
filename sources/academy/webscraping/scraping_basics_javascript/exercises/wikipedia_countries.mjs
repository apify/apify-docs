import * as cheerio from 'cheerio';

const url = 'https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_Africa';
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const html = await response.text();
const $ = cheerio.load(html);

for (const tableElement of $('.wikitable').toArray()) {
  const $table = $(tableElement);
  const rows = $table.find('tr');

  for (const rowElement of rows.toArray()) {
    const $row = $(rowElement);
    const cells = $row.find('td');

    if (cells.length > 0) {
      const $thirdColumn = $(cells[2]);
      const $link = $thirdColumn.find('a').first();
      if ($link.length) {
        console.log($link.text());
      }
    }
  }
}
