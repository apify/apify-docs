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
  const rows = $table.find('tr').toArray();

  for (const rowElement of rows) {
    const $cells = $(rowElement).find('td');

    const $firstCell = $cells.eq(0);
    const firstCellText = $firstCell.text().trim();
    if (firstCellText) {
      console.log(firstCellText);
    }

    const $thirdCell = $cells.eq(2);
    const thirdCellText = $thirdCell.text().trim();
    if (thirdCellText) {
      console.log(thirdCellText);
    }
  }
}
