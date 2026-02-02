import { readFile } from 'node:fs/promises';

const jsonData = await readFile('products.json', 'utf8');
const data = JSON.parse(jsonData);

data
  .filter((row) => row.minPrice > 50000)
  .forEach((row) => console.log(row));
