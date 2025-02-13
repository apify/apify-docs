---
title: Sitemaps vs search
description: Learn how to extract all of a website's listings even if they limit the number of results pages. 
sidebar_position: 1
slug: /advanced-web-scraping/crawling/sitemaps-vs-search
---

The core crawling problem comes to down to ensuring that we reliably find all detail pages on the target website or inside its categories. This is trivial for small sites. We just open the home page or category pages and paginate to the end as we did in the [Web Scraping for Beginners course](/academy/web-scraping-for-beginners).

Unfortunately, _most modern websites restrict pagination_ only to somewhere between 1 and 10,000 products. Solving this problem might seem relatively straightforward at first but there are multiple hurdles that we will explore in this lesson.

There are two main approaches to solving this problem:

- Extracting all page URLs from the website's _sitemap_.
- Using **categories, search and filters** to split the website so we get under the pagination limit.

Both of these approaches have their pros and cons so the best solution is to _use both and combine the results_. Here we will learn why.

## Pros and cons of sitemaps

Sitemap is usually a simple XML file that contains a list of all pages on the website. They are created and maintained mainly for search engines like Google to help ensure that the website gets fully indexed there. They are commonly located at URLs like `https://example.com/sitemap.xml` or `https://example.com/sitemap.xml.gz`. We will get to work with sitemaps in the next lesson.

### Pros

- _Quick to set up_ - The logic to find all sitemaps and extract all URLs is usually simple and can be done in a few lines of code.
- _Fast to run_ - You only need to run a single request for each sitemap that contains up to 50,000 URLs. This means you can get all the URLs in a matter of seconds.
- _Usually complete_ - Websites have an incentive to keep their sitemaps up to date as they are used by search engines. This means that they usually contain all pages on the website.

### Cons

- _Does not directly reflect the website_ - There is no way you can ensure that all pages on the website are in the sitemap. The sitemap also can contain pages that were already removed and will return 404s. This is a major downside of sitemaps which prevents us from using them as the only source of URLs.
- _Updated in intervals_ - Sitemaps are usually not updated in real-time. This means that you might miss some pages if you scrape them too soon after they were added to the website. Common update intervals are 1 day or 1 week.
- _Hard to find or unavailable_ - Sitemaps are not always trivial to locate. They can be deployed on a CDN with unpredictable URLs. Sometimes they are not available at all.
- _Streamed, compressed, and archived_ - Sitemaps are often streamed and archived with .tgz extensions and compressed with gzip. This means that you cannot use default HTTP client settings and must handle these cases with extra code or use a scraping framework.

## Pros and cons of categories, search, and filters

This approach means traversing the website like a normal user does by going through categories, setting up different filters, ranges, and sorting options. The goal is to ensure that we cover all categories or ranges where products can be located, and that for each of those we stay under the pagination limit.

The pros and cons of this approach are pretty much the opposite of relying on sitemaps.

### Pros

- _Directly reflects the website_ - With most scraping use-cases, we want to analyze the website as the regular users see it. By going through the intended user flow, we ensure that we are getting the same pages as the users.
- _Updated in real-time_ - The website is updated in real-time so we can be sure that we are getting all pages.
- _Often contain detailed data_ - While sitemaps are usually just a list of URLs, categories, searches and filters often contain additional data like product names, prices, categories, etc, especially if available via JSON API. This means that we can sometimes get all the data we need without going to the detail pages.

### Cons

- _Complex to set up_ - The logic to traverse the website is usually complex and can take a lot of time to get right. We will get to this in the next lessons.
- _Slow to run_ - The traversing can require a lot of requests. Some filters or categories will have products we already found.
- _Not always complete_ - Sometimes the combination of filters and categories will not allow us to ensure we have all products. This is especially painful for sites where we don't know the exact number of products we are looking for. The tools we'll build in the following lessons will help us with this.

## Do we know how many products there are?

Most websites list a total number of detail pages somewhere. It might be displayed on the home page, search results, or be provided in the API response. We just need to make sure that this number really represents the whole site or category we are looking to scrape. By knowing the total number of products, we can tell if our approach to scrape all succeeded or if we still need to refine it.

Some sites, like Amazon, do not provide exact numbers. In this case, we have to work with what they give us and put even more effort into making our scraping logic accurate. We will tackle this in the following lessons as well.

## Next up

Next, we will look into [sitemap crawling](./crawling-sitemaps.md). After that we will go through all the intricacies of the category, search and filter crawling, and build up tools implementing a generic approach that we can use on any website. At last, we will combine the results of both and set up monitoring and persistence to ensure we can run this regularly without any manual controls.
