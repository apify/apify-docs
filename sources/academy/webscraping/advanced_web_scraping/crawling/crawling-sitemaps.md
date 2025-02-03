---
title: Crawling sitemaps
description: Learn how to extract all of a website's listings even if they limit the number of results pages. See code examples for setting up your scraper.
sidebar_position: 2
slug: /advanced-web-scraping/crawling/crawling-sitemaps
---

In the previous lesson, we learned what is the utility (and dangers) of crawling sitemaps. In this lesson, we will go in-depth to how to crawl sitemaps.

We will look at the following topics:

- How to find sitemap URLs
- How to set up HTTP requests to download sitemaps
- How to parse URLs from sitemaps
- Using Crawlee to get all URLs in a few lines of code

## How to find sitemap URLs

Sitemaps are commonly restricted to contain a maximum of 50k URLs so usually, there will be a whole list of them. There can be a master sitemap containing URLs of all other sitemaps or the sitemaps might simply be indexed in `robots.txt` and/or have auto-incremented URLs like `/sitemap1.xml`, `/sitemap2.xml`, etc.

### Google

You can try your luck on Google by searching for `site:example.com sitemap.xml` or `site:example.com sitemap.xml.gz` and see if you get any results. If you do, you can try to download the sitemap and see if it contains any useful URLs. The success of this approach depends on the website telling Google to index the sitemap file itself which is rather uncommon.

### robots.txt {#robots-txt}

If the website has a `robots.txt` file, it often contains sitemap URLs. The sitemap URLs are usually listed under `Sitemap:` directive.

### Common URL paths

You can try to iterate over common URL paths like:

- /sitemap.xml
- /product_index.xml
- /product_template.xml
- /sitemap_index.xml
- /sitemaps/sitemap_index.xml
- /sitemap/product_index.xml
- /media/sitemap.xml
- /media/sitemap/sitemap.xml
- /media/sitemap/index.xml

Make also sure you test the list with `.gz`, `.tar.gz` and `.tgz` extensions and by capitalizing the words (e.g. `/Sitemap_index.xml.tar.gz`).

Some websites also provide an HTML version, to help indexing bots find new content. Those include:

- /sitemap
- /category-sitemap
- /sitemap.html
- /sitemap_index

Apify provides the [Sitemap Sniffer](https://apify.com/vaclavrut/sitemap-sniffer), an open source actor that scans the URL variations automatically for you so that you don't have to check them manually.

## How to set up HTTP requests to download sitemaps

For most sitemaps, you can make a single HTTP request and parse the downloaded XML text. Some sitemaps are compressed and have to be streamed and decompressed. The code can get fairly complicated, but scraping frameworks, such as [Crawlee](#using-crawlee), can do this out of the box.

## How to parse URLs from sitemaps

Use your favorite XML parser to extract the URLs from inside the `<loc>` tags. Just be careful that the sitemap might contain other URLs that you don't want to crawl (e.g. `/about`, `/contact`, or various special category sections). For specific code examples, see [our Node.js guide](/academy/node-js/scraping-from-sitemaps).

## Using Crawlee

Fortunately, you don't have to worry about any of the above steps if you use [Crawlee](https://crawlee.dev), a scraping framework, which has rich traversing and parsing support for sitemap. It can traverse nested sitemaps, download, and parse compressed sitemaps, and extract URLs from them. You can get all the URLs in a few lines of code:

```js
import { RobotsFile } from 'crawlee';

const robots = await RobotsFile.find('https://www.mysite.com');

const allWebsiteUrls = await robots.parseUrlsFromSitemaps();
```

## Next up

That's all we need to know about sitemaps for now. Let's dive into a much more interesting topic - search, filters, and pagination.
