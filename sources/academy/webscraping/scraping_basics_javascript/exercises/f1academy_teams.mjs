import * as cheerio from 'cheerio';

const url = "https://www.f1academy.com/Racing-Series/Teams";
const response = await fetch(url);

if (response.ok) {
  const html = await response.text();
  const $ = cheerio.load(html);
  console.log($(".teams-driver-item").length);
} else {
  throw new Error(`HTTP ${response.status}`);
}
