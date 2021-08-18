---
title: Naming your actor
description: Apify's standards for actor naming. Learn how to choose the right name for scraping and non-scraping actors and how to optimize your actor for search engines.
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actor/publishing/naming-your-actor
    - actors/publishing/naming-your-actor
---

# [](#naming-your-actor) Naming your actor

Naming your actor can be tricky. Especially when you've spent a long time coding and are excited to show your brand new creation to the world. To help users find your actor, we've introduced naming standards. These standards improve your actor's [search engine optimization (SEO)](https://en.wikipedia.org/wiki/Search_engine_optimization) and maintain consistency in the [Apify Store](https://apify.com/store).

> Your actor's name should be 3-63 characters long.

## [](#scrapers) Scrapers

For actors such as [YouTube Scraper](https://apify.com/bernardo/youtube-scraper) or [Amazon Scraper](https://apify.com/vaclavrut/amazon-crawler), which scrape web pages, we usually have one actor per domain. This helps with naming, as the domain name serves as your actor's name.

GOOD:

* Technical name (actor's name in the [Apify console](https://console.apify.com)): **${domain}-scraper**, e.g. **youtube-scraper**.
* Publication title for the Apify Store: **${Domain} Scraper**, e.g. **Youtube Scraper**.
* Name of the GitHub repository: **actor-${domain}-scraper**, e.g. **actor-youtube-scraper**.

AVOID:

* Technical name: **the-scraper-of-${domain}**, e.g. **the-scraper-of-youtube**.
* Publication title: **The Scraper of ${Domain}**, e.g. **The Scraper of Youtube**.
* GitHub repository: **actor-the-scraper-of-${domain}**, e.g. **actor-the-scraper-of-youtube**.

If your actor only caters to a specific service on a domain (and you don't plan on extending it), add the service to the actor's name.

For example,

* Technical name: **${domain}-${service}-scraper**, e.g. **google-search-scraper**.
* Publication title: **${Domain} ${Service} Scraper**, e.g. [**Google Search Scraper**](https://apify.com/apify/google-search-scraper).
* GitHub repository: **actor-${domain}-${service}-scraper**, e.g. **actor-google-search-scraper**.


## [](#non-scraping-actors) Non-scraping actors

Naming for non-scraping actors is more liberal. Being creative and considering SEO and user experience are good places to start. Think about what your users will type into a search engine when looking for your actor. What is your actor's function?

If you're having trouble, you can always run your ideas by the Apify team using the chat icon in the bottom-right corner.

Below are examples for the [Google Sheets](https://apify.com/lukaskrivka/google-sheets) actor.

GOOD:

* Technical name: **google-sheets**.
* Publication title: **Google Sheets Import & Export**.
* GitHub repository: **actor-google-sheets**.

AVOID:

* Technical name: **import-to-and-export-from-google-sheets**.
* Publication title: **Actor for Importing to and Exporting from Google Sheets**.
* GitHub repository: **actor-for-import-and-export-google-sheets**.

## [](#renaming-your-actor) Renaming your actor

**Warning!** Changing your actor's **technical name** may break current integrations for that actor's users. This is why some actors in the Apify Store don't have consistent naming. For the same reason, it is best to change the actor's name early, before you build a steady user base.

The **publication title**, however, can be changed without any problems.
