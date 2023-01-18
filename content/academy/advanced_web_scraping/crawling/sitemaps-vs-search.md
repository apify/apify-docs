---
title: Sitemaps vs search
description: Learn how to extract all of a website's listings even if they limit the number of results pages. See code examples for setting up your scraper.
menuWeight: 1
paths:
- advanced-web-scraping/crawling/sitemaps-vs-search
---

The core crawling problem comes to down to ensuring that we reliably find all detail pages on the target website or its categories. This is trivial for small sites. We just open the home page or category pages and paginate to the end like we did in the Web Scraping for Beginners cource. 

Unfortunately, **most modern websites restrict pagination** only to somewhere between 1 and 10 thousands products. Solving this problem might seem relatively straightforward at first but there are multiple hurdless that we will explore in this lesson.

There are two main approaches to solving this problem:
- Extracting the list of all pages from the website's **sitemap**.
- Using **categories, search and filters** to ensure we get under the pagination limit.

Both of these approaches have their pros and cons so the best solution is to **use both and combine the results**. Here we will learn why.

## Pros and cons of sitemaps
Sitemap is usally a simple XML file that contains a list of all pages on the website. They are created and maintained mainly for search engines like Google to help ensure that the website gets fully indexed there. They are commonly located at URLs like `https://example.com/sitemap.xml` or `https://example.com/sitemap.xml.gz`. We will get to working with sitemaps in the next lesson.

### Pros
- **Quick to setup** - The logic to find all sitemaps and extract all URLs is usually simple and can be done in a few lines of code.
- **Fast to run** - You only need to run a single request for each sitemap which rarely is more than 100. This means you can get the URLs in a matter of seconds.
- **Usually complete** - Websites have incentive to keep their sitemaps up to date as they are used by search engines. This means that they usually contain all pages on the website.

### Cons
- **Does not directly reflect the website** - There is no way you can ensure that all pages on the website are in the sitemap. The sitemap also can contain pages that were already removed and will return 404s. This is a major downside of sitemaps which prevents us from using them as the only source of URLs.
- **Updated in intervals** - Sitemaps are usually not updated in real-time. This means that you might miss some pages if you scrape them too soon after they were added to the website. Common update intervals are 1 day or 1 week.
- **Hard to find or unavailable** - Sitemaps are not always trivial to locate. They can be deployed on a CDN with unpredictable URLs. Sometimes they are not available at all.
- **Streamed, compressed and archived** - Sitemaps are often streamed and archived with .tgz extensions and compressed with gzip. This means that you cannot use default HTTP client settings and must handle these cases with extra code. Fortunately, we will get to this in the next lesson.

## Pros and cons of categories, search and filters
This approach means traversing the website like a normal user do by going through categories, setting up different filters, ranges and sorting options. The goal is to traverse it is a way that ensures we covered all categories/ranges where products can be located and for each of those we stayed under the pagination limit.

The pros and cons of this approach are pretty much the opposite of the sitemaps approach.

### Pros
- **Directly reflects the website** - With most scraping use-cases, we want to analyze the website as the regular users see it. By going through the intended user flow, we ensure that we are getting the same pages as the users.
- **Updated in real-time** - The website is updated in real-time so we can be sure that we are getting all pages.
- **Often contain detailed data** - While sitemaps are usually just a list of URLs, categories, search and filters often contain additional data like product names, prices, categories, etc. This means that we can sometimes get all the data we need without going to the detail pages.

### Cons
- **Complex to setup** - The logic to traverse the website is usually more complex and can take a lot of time to get right. We will get to this in the next lessons.
- **Slow to run** - The traversing can require a lot of requests. Some filters or categories will have products we already found.
- **Not always complete** - Sometimes the combination of filters and categories will not allow us to ensure we got all products. This is especially painful for sites where we don't know the exact number of products we are looknig for. The framework we will build in the next lessons will help us with this.

## Do we know how many products there are?
Fortunately, most websites list a total number of details pages somewhere. It might be displayed on the home page or search results or be provided in the API response. We just need to make sure that this number really represent the whole site or category we are looking to scrape. By knowing the total number of products, we can tell if our approach to scrape all succeeded or if we still need to refine it.

Unfortunately, some sites like Amazon do not provide exact numbers. In this case, we have to work with what they give us to and out even more effort into making our scraping logic accurate. We will tackle this in the next lessons as well.

## [](#next) Next up

First we will look into the easier approach, the [sitemap crawling]({{@link crawling-sitemaps.md}}). Then we will go through all intricacies of the category, search and filter crawling and build up a generic framework that we can use on any website. At last, we will combine the results of both approaches and set up monitoring and persistence to ensure we can run this regularly without any manual controls.
