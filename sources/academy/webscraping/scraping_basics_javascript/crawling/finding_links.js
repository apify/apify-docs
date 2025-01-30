import * as cheerio from 'cheerio';
import { gotScraping } from 'got-scraping';

const storeUrl = 'https://warehouse-theme-metal.myshopify.com/collections/sales';

const response = await gotScraping(storeUrl);
const html = response.body;

const $ = cheerio.load(html);

// ------- new code below

const links = $('a');

for (const link of links) {
    const url = $(link).attr('href');
    console.log(url);
}
