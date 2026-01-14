import * as cheerio from 'cheerio';

const url = 'https://www.imo.org/en/ourwork/ero/pages/memberstates.aspx';
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const html = await response.text();
const $ = cheerio.load(html);

for (const tableElement of $('.content table').toArray()) {
  const $table = $(tableElement);
  const rows = $table.find('tr');

  for (const rowElement of rows.toArray()) {
    const $row = $(rowElement);
    const cells = $row.find('td');

    if (cells.length > 0) {
      const $firstColumn = $(cells[0]);
      const text = $firstColumn.text().trim();
      if (text) {
        console.log(text);
      }
    }
  }

  for (const rowElement of rows.toArray()) {
    const $row = $(rowElement);
    const cells = $row.find('td');

    if (cells.length > 2) {
      const $thirdColumn = $(cells[2]);
      const text = $thirdColumn.text().trim();
      if (text) {
        console.log(text);
      }
    }
  }
}
