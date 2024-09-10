---
title: Naming your Actor
description: Apify's standards for Actor naming. Learn how to choose the right name for scraping and non-scraping Actors and how to optimize your Actor for search engines.
sidebar_position: 1
slug: /get-most-of-actors/naming-your-actor
---

# Naming your Actor {#naming-your-actor}

**Apify's standards for Actor naming. Learn how to choose the right name for scraping and non-scraping Actors and how to optimize your Actor for search engines.**

---

Naming your Actor can be tricky. Especially when you've spent a long time coding and are excited to show your brand-new creation to the world. To help users find your Actor, we've introduced naming standards. These standards improve your Actor's [search engine optimization (SEO)](https://en.wikipedia.org/wiki/Search_engine_optimization) and maintain consistency in the [Apify Store](https://apify.com/store).

> Your Actor's name should be 3–63 characters long.

## Scrapers {#scrapers}

For Actors such as [YouTube Scraper](https://apify.com/streamers/youtube-scraper) or [Amazon Scraper](https://apify.com/junglee/amazon-crawler), which scrape web pages, we usually have one Actor per domain. This helps with naming, as the domain name serves as your Actor's name.

GOOD:

- Technical name (Actor's name in the [Apify Console](https://console.apify.com)): **$\{domain}-scraper**, e.g. **youtube-scraper**.
- Publication title for the Apify Store: **$\{Domain} Scraper**, e.g. **YouTube Scraper**.
- Name of the GitHub repository: **actor-$\{domain}-scraper**, e.g. **actor-youtube-scraper**.

AVOID:

- Technical name: **the-scraper-of-$\{domain}**, e.g. **the-scraper-of-youtube**.
- Publication title: **The Scraper of $\{Domain}**, e.g. **The Scraper of YouTube**.
- GitHub repository: **actor-the-scraper-of-$\{domain}**, e.g. **actor-the-scraper-of-youtube**.

If your Actor only caters to a specific service on a domain (and you don't plan on extending it), add the service to the Actor's name.

For example,

- Technical name: **$\{domain}-$\{service}-scraper**, e.g. **google-search-scraper**.
- Publication title: **$\{Domain} $\{Service} Scraper**, e.g. [**Google Search Scraper**](https://apify.com/apify/google-search-scraper).
- GitHub repository: **actor-$\{domain}-$\{service}-scraper**, e.g. **actor-google-search-scraper**.

## Non-scraping Actors {#non-scraping-actors}

Naming for non-scraping Actors is more liberal. Being creative and considering SEO and user experience are good places to start. Think about what your users will type into a search engine when looking for your Actor. What is your Actor's function?

If you're having trouble, you can always run your ideas by the Apify team using the chat icon in the bottom-right corner.

Below are examples for the [Google Sheets](https://apify.com/lukaskrivka/google-sheets) Actor.

GOOD:

- Technical name: **google-sheets**.
- Publication title: **Google Sheets Import & Export**.
- GitHub repository: **actor-google-sheets**.

AVOID:

- Technical name: **import-to-and-export-from-google-sheets**.
- Publication title: **Actor for Importing to and Exporting from Google Sheets**.
- GitHub repository: **actor-for-import-and-export-google-sheets**.

## Renaming your Actor {#renaming-your-actor}

**Warning!** Changing your Actor's **technical name** may break current integrations for that Actor's users. This is why some Actors in the Apify Store don't have consistent naming. For the same reason, it is best to change the Actor's name early, before you build a steady user base.

The **publication title**, however, can be changed without any problems.

## Next up {#next}

Now that your Actor is properly named and you know the differences between your Actor's technical name and publication title, it's time to take the [next step](./actor_readme.md)! into making your Actor public in Apify Store by ensuring that it has a well-structured and comprehensive README.
